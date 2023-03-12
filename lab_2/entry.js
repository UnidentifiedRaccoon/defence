const { init, assignAdmin } = require('./utils/helpers')
const { test, start } = require("./interface/interface");
const { app } = require('./app/app.js')

// core programm
const matrix = init(4, 4) // subjCount, objCount
assignAdmin('Иван', matrix)

const sessionStore = {
    matrix,
    me: null
}

// interacton with interface
function cb(command) {
    app(command, sessionStore)
}

const test_1 = [
    'info',
    'login -n Кон',
    'login -n Иван',
    'info',
    'test',
    'logout',
    'login -n Кон',
    'login -n Борис',
    // 'exit',
]

const test_2 = [
    'info',
    // 'login -n Кон',
    // 'login -n Иван',
    // 'info',
    // 'test'
    // 'logout',
    // 'login -n Кон',
    // 'login -n Борис',
    // 'exit',
]


// interface
test(cb, test_1)
start(cb)







