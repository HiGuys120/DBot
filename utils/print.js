module.exports = {
    objectPropertiesToMessageString: objectPropertiesToMessageString,
    strToBold: strToBold
};

function objectPropertiesToMessageString(object, propertiesToPrint) {
    let messageString = '';
    for (var i = 0; i < propertiesToPrint.length; i++) {
        property = propertiesToPrint[i];
        if (object.hasOwnProperty(property)) {
            let pascalCaseProperty = property.charAt(0).toUpperCase() + property.slice(1);
            let separator = i == propertiesToPrint.length - 1 ? '' : '\n';
            messageString += strToBold(pascalCaseProperty) + ': ' + object[property] + separator;
        }
    }
    return messageString;
}

function strToBold(str) {
    return '**' + str + '**';
}