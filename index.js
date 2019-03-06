const { decodeHtml, decodeAnswer, shuffle } = require('./utils/triviaUtils.js');
const botSettings = require('./botSettings.json');
const Discord = require('discord.js');
const request = require('request');
const bot = new Discord.Client();

var triviaIndex = 0;
var triviaCorrectAnswer = '';
var playingTrivia = 'False';
var questions = [];

bot.on('ready', () => {
	console.log('I am ready!');
});

bot.on('message', (message) => {
	if (message.content.charAt(0) == '!') {
		let command = message.content.substr(1);
		if (command.startsWith('getAnime')) {
			let animeName = command.substr(command.indexOf(' ') + 1);
			request('https://kitsu.io/api/edge/anime?filter[text]=' + animeName, { json: true, headers: { 'Accept': 'application/vnd.api+json', 'Content-type': 'application/vnd.api+json' } }, (error, response, body) => {
				if (typeof body.data[0] !== 'undefined') {
					let title = body.data[0].attributes.titles.en;
					let episodeCount = body.data[0].attributes.episodeCount;
					let startDate = body.data[0].attributes.startDate;
					let endDate = body.data[0].attributes.endDate;
					let synopsis = body.data[0].attributes.synopsis;
					let imageUrl = body.data[0].attributes.posterImage.medium;
					let fixedImageUrl = imageUrl.substr(0, imageUrl.indexOf('?'));
					message.channel.send('**Title:** ' + title + '\n'
						+ '**Episode Count:** ' + episodeCount + '\n'
						+ '**Start Date:** ' + startDate + '\n'
						+ '**End Date:** ' + endDate + '\n'
						+ '**Synopsis:**\n' + synopsis + '\n'
						+ '**Image:**',
						{ file: fixedImageUrl });
				} else {
					message.channel.send('No entries found');
				}
			});
		} else if (command.startsWith('getMovie')) {
			let movieName = command.substr(command.indexOf(' ') + 1);
			request('http://www.omdbapi.com/?t=' + movieName + '&apikey=' + botSettings.omdbpApiKey, { json: true }, (error, response, body) => {
				if (typeof body.Title !== 'undefined') {
					let title = body.Title;
					let releaseDate = body.Released;
					let runTime = body.Runtime;
					let rating = body.imdbRating;
					let genre = body.Genre;
					let synopsis = body.Plot;
					let imageUrl = body.Poster;
					message.channel.send('**Title:** ' + title + '\n'
						+ '**Release Date:** ' + releaseDate + '\n'
						+ '**Runtime:** ' + runTime + '\n'
						+ '**Rating:** ' + rating + '\n'
						+ '**Genre:** ' + genre + '\n'
						+ '**Synopsis:** ' + synopsis + '\n'
						+ '**Image:**',
						{ file: imageUrl })
				} else {
					message.channel.send('No entries found');
				}
			});
		} else if (command.startsWith('getNews')) {
			let newsSource = command.substr(command.indexOf(' ') + 1);
			request('https://newsapi.org/v2/top-headlines?sources=' + newsSource + '&apiKey=' + botSettings.newsOrgApiKey, { json: true }, (error, response, body) => {
				if (body.status == 'ok') {
					var length = Math.min(3, body.articles.length)
					var i;
					for (i = 0; i < length; i++) {
						let author = body.articles[i].author;
						let title = body.articles[i].title;
						let description = body.articles[i].description;
						let url = body.articles[i].url;
						let publishedAt = body.articles[i].publishedAt;
						message.channel.send('**Author:** ' + author + '\n'
							+ '**Title:** ' + title + '\n'
							+ '**Published at:** ' + publishedAt + '\n'
							+ '**Description:** ' + description + '\n'
							+ '**Find out more:** ' + url);
					}
				} else {
					message.channel.send('Unable to find news');
				}
			});
		} else if (command.startsWith('getWeather')) {
			let place = command.substr(command.indexOf(' ') + 1);
			request('http://api.wunderground.com/api/' + botSettings.wundergroundApiKey + '/conditions/q/ES/' + place + '.json', { json: true }, (error, response, body) => {
				if (typeof body.current_observation !== 'undefined') {
					let location = body.current_observation.display_location.full;
					let weather = body.current_observation.weather;
					let temp = body.current_observation.temp_c;
					let wind = body.current_observation.wind_kph;
					let humidity = body.current_observation.relative_humidity;
					message.channel.send('**Location:** ' + location + '\n'
						+ '**Weather:** ' + weather + '\n'
						+ '**Temperature:** ' + temp + 'C\n'
						+ '**Wind:** ' + wind + 'kph\n'
						+ '**Humidity:** ' + humidity + '\n');
				} else {
					message.channel.send('No weather info');
				}
			});
		} else if (command.startsWith('makeMeLaugh')) {
			request('https://icanhazdadjoke.com/', { json: true }, (error, response, body) => {
				if (typeof body.id !== 'undefined') {
					let joke = body.joke;
					message.channel.send(joke);
				} else {
					message.channel.send('Unable to make a joke');
				}
			});
		} else if (command.startsWith('startTrivia')) {
			if (playingTrivia === true) {
				message.channel.send('You are already playing trivia');
			} else {
				request('https://opentdb.com/api.php?amount=10', { json: true }, (error, response, body) => {
					if (typeof body.results !== 'undefined') {
						message.channel.send('Trivia Game started');
						triviaIndex = 0;
						playingTrivia = true;
						questions = body.results;
						question = questions[triviaIndex].question;
						if (questions[triviaIndex].type == 'boolean') {
							message.channel.send('**Question:** ' + decodeHtml(question) + '\n'
								+ 'True' + '\n'
								+ 'False' + '\n');
							triviaCorrectAnswer = questions[triviaIndex].correct_answer;
						} else {
							let answers = questions[triviaIndex].incorrect_answers;
							answers.push(questions[triviaIndex].correct_answer);
							let shuffledAnswers = shuffle(answers);
							message.channel.send('**Question:** ' + decodeHtml(question) + '\n'
								+ 'A. ' + decodeHtml(shuffledAnswers[0]) + '\n'
								+ 'B. ' + decodeHtml(shuffledAnswers[1]) + '\n'
								+ 'C. ' + decodeHtml(shuffledAnswers[2]) + '\n'
								+ 'D. ' + decodeHtml(shuffledAnswers[3]) + '\n');
							triviaCorrectAnswer = shuffledAnswers.indexOf(questions[triviaIndex].correct_answer).toString();
						}
					} else {
						message.channel.send('Unable to make trivia game');
					}
				});
			}
		} else if (command.startsWith('getCommands')) {
			message.channel.send('Commands you can use: ' + '\n'
				+ '!getAnime <Anime Name> -> Shows anime info' + '\n'
				+ '!getMovie <Movie Name> -> Shows movie info' + '\n'
				+ '!getNews <News source> -> Shows current news' + '\n'
				+ '!getWeather <Place> -> Shows weather info' + '\n'
				+ '!makeMeLaugh -> Shows cool jokes' + '\n'
				+ '!startTrivia -> Starts a trivia game');
		}
	} else if (playingTrivia === true && decodeAnswer(message.content.toUpperCase()) == triviaCorrectAnswer) {
		message.channel.send('Correct!');
		if (triviaIndex < questions.length - 1) {
			triviaIndex++;
			question = questions[triviaIndex].question;
			if (questions[triviaIndex].type == 'boolean') {
				message.channel.send('**Question:** ' + decodeHtml(question) + '\n'
					+ 'True' + '\n'
					+ 'False' + '\n');
				triviaCorrectAnswer = questions[triviaIndex].correct_answer;
			} else {
				let answers = questions[triviaIndex].incorrect_answers;
				answers.push(questions[triviaIndex].correct_answer);
				let shuffledAnswers = shuffle(answers);
				message.channel.send('**Question:** ' + decodeHtml(question) + '\n'
					+ 'A. ' + decodeHtml(shuffledAnswers[0]) + '\n'
					+ 'B. ' + decodeHtml(shuffledAnswers[1]) + '\n'
					+ 'C. ' + decodeHtml(shuffledAnswers[2]) + '\n'
					+ 'D. ' + decodeHtml(shuffledAnswers[3]) + '\n');
				triviaCorrectAnswer = shuffledAnswers.indexOf(questions[triviaIndex].correct_answer).toString();
			}
		} else {
			triviaIndex = 0;
			playingTrivia = false;
			questions = [];
			message.channel.send('Game over! type !startTrivia again for more');
		}
	} else if (playingTrivia === true && message.content.toUpperCase() == triviaCorrectAnswer.toUpperCase()) {
		message.channel.send('Correct!');
		if (triviaIndex < questions.length - 1) {
			triviaIndex++;
			question = questions[triviaIndex].question;
			if (questions[triviaIndex].type == 'boolean') {
				message.channel.send('**Question:** ' + decodeHtml(question) + '\n'
					+ 'True' + '\n'
					+ 'False' + '\n');
				triviaCorrectAnswer = questions[triviaIndex].correct_answer;
			} else {
				let answers = questions[triviaIndex].incorrect_answers;
				answers.push(questions[triviaIndex].correct_answer);
				let shuffledAnswers = shuffle(answers);
				message.channel.send('**Question:** ' + decodeHtml(question) + '\n'
					+ 'A. ' + decodeHtml(shuffledAnswers[0]) + '\n'
					+ 'B. ' + decodeHtml(shuffledAnswers[1]) + '\n'
					+ 'C. ' + decodeHtml(shuffledAnswers[2]) + '\n'
					+ 'D. ' + decodeHtml(shuffledAnswers[3]) + '\n');
				triviaCorrectAnswer = shuffledAnswers.indexOf(questions[triviaIndex].correct_answer).toString();
			}
		} else {
			triviaIndex = 0;
			playingTrivia = false;
			questions = [];
			message.channel.send('Game over! type !startTrivia again for more');
		}
	}
});

bot.login(botSettings.discordToken);