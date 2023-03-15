const { messages } = require("../assets/data.json")

const parseJSONTemplate = (expression, valueObj) => {
    const templateMatcher = /{\s?\w+\s?}/g;
    let text = expression.replace(templateMatcher, (substring) => {
        const sub = substring.slice(1, -1).trim()
        return valueObj[sub];
    });
    return text
}


module.exports = {
    enterCommand: ({args}) => console.log(messages.enterCommand, ...args),
    login: (username) => console.log(parseJSONTemplate(messages.login, {username})),
    listOfRules: () => console.log(messages.listOfRules),
    logout: (username) => console.log(parseJSONTemplate(messages.logout, {username})),
    successOperation: () => console.log(messages.successOperation),
    exit: () => console.log(messages.exit),
    parseJSONTemplate
}