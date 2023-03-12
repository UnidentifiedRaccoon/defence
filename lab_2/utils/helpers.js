const { registratedUsers } = require('./const')
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

module.exports = {
    randomInRange,
    randomRule,
    assignAdmin,
    onExit,


    init(subjCount, objCount) {
        const subj = registratedUsers.slice(0, subjCount)
        const matrix = new Map(subj.map(x => [x, [...new Array(objCount)].map(() => randomRule())]))
        return  matrix
    }
}