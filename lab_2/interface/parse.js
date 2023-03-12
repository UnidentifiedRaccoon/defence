class ErrorInvalidAttributes extends Error {
    constructor() {
        super('there is unknown error in attrs` record');
    }
}

const parseAttrs = (attrs) => {
    return attrs.split('-')
    .map(x => x.trim())
    .map(x => x.split(' '))
    .map(arr => arr.map(x=>x.trim()))
    .map((arr) => arr.filter(Boolean))
    .filter(arr => arr.length > 0)
}

const parseCommand = (commandStr) => {
    const commandEndIndex = commandStr.indexOf(' ') !== -1 ? commandStr.indexOf(' ') : commandStr.length
    const command = commandStr.slice(0, commandEndIndex)
    const attrs = parseAttrs(commandStr.slice(commandEndIndex+1))
    return [command, attrs] 
}


module.exports = {
    parse(commandStr) {
        try {
            const [command, args] = parseCommand(commandStr)
            return [command, args]
        } catch (error) {
            console.error('\x1b[31m%s\x1b[0m', error.message)
        }
    }
}