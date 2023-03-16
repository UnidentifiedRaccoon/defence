const { registratedUsers, attrs } = require('./const')
const messages = require('./messages')

const randomInRange = (min, max) => {
    return Math.floor((max-min+1) * Math.random()) + min
}

const randomRule = () => {
    return randomInRange(0, 7)
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
    onExit,
    extractAttributeValue,


    init(subjCount, objCount) {
        const subj = registratedUsers.slice(0, subjCount).map(x => ({name: x, access: randomInRange(0,2)}))
        const obj =  [...new Array(objCount)].map(() => randomInRange(0,2))
        return  [subj, obj]
    },

    getUser: (users, name) => users.find((x) => x.name === name),
    hasObj: (objs, obj) => objs.length > obj
}