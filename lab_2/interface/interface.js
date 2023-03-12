const { parse } = require('./parse')
const messages = require('../utils/messages')
const {messages: dataMessages} = require('../assets/data.json')

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const start = async (cb) => {
    let commandLine = ''
    while (true) {
        commandLine = await prompt(`${dataMessages.enterCommand} `)
        cb(parse(commandLine))
    }
}

const test = (cb, testCommands = []) => {
    let commandLine = ''
    for (const commandLine of testCommands) {
        messages.enterCommand({args: [commandLine]})
        cb(parse(commandLine))
    }
}

module.exports = {
    test,
    start,
}


