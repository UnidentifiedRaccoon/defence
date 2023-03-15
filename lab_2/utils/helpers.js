const { registratedUsers, attrs } = require('./const')
const messages = require('./messages')

const randomInRange = (min, max) => {
    return Math.floor((max-min+1) * Math.random()) + min
}

const randomRule = () => {
    return randomInRange(0, 7)
}

const assignAdmin = (name, matrix) => {
    matrix.set(name, matrix.get(name).map(() => 7))
}

const isExit = (command) => {
    return command === 'exit'
}

const onExit = (command) => {
    if (isExit(command)) {
        messages.exit()
        process.exit(0)
    }
}

const stringifyRule = (rule) => {
    let str = new Number(rule).toString(2)
    while (str.length < 3) {
        str = '0' + str
    }
    return str
}

const mergeRules = (x, y) => {
    return parseInt(x,2) + parseInt(y,2)
}

const extractAttributeValue = (obj, attrName, cb = (x) => x) => {
    // obj - object, where we want to find value derivated of attrName 
    // attrName - is field's name of attributes object from data.js file
    // cb - function for moification of returned value
    let value = ''
    for (const key of attrs[attrName]) {
        if (obj[key]) return cb(obj[key])
    }
}

module.exports = {
    randomInRange,
    randomRule,
    assignAdmin,
    onExit,
    stringifyRule,
    mergeRules,
    extractAttributeValue,


    init(subjCount, objCount) {
        const subj = registratedUsers.slice(0, subjCount)
        const matrix = new Map(subj.map(x => [x, [...new Array(objCount)].map(() => randomRule())]))
        return  matrix
    },

    hasReadAccess: (rule) => stringifyRule(rule)[0] === '1',
    hasWriteAccess: (rule) =>  stringifyRule(rule)[1] === '1',
    hasGrantAccess: (rule) => stringifyRule(rule)[2] === '1',
    hasUser: (matrix, user) => matrix.has(user),
    hasObj: (matrix, obj) => [...matrix.values()].map(x => x.length)[0] > obj
}