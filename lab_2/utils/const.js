const { registratedUsers, rules, commands, attributes } = require('../assets/data.json')

module.exports = {
    rules,
    registratedUsers,
    commandsToRules: {
        [commands.grant]: rules['1'],
        [commands.write]: rules['2'],
        [commands.read]: rules['4'],
    },
    ruleToNumber: {
        [rules['1']]: '001',
        [rules['2']]: '010',
        [rules['4']]: '100',
    },
    commands,
    attrs: attributes
}