const { init, assignAdmin } = require('./utils/helpers')
const { test, start } = require("./interface/interface");
const { app } = require('./app/app.js')

// core programm
// const matrix = init(4, 4) // subjCount, objCount
const matrix = new Map()
matrix.set("Иван", [4,4,4,4])
matrix.set("Борис", [2,1,7,4])
matrix.set("Сергей", [6,2,5,3])
matrix.set("Егор", [0,1,2,1])

assignAdmin('Иван', matrix)
console.log(matrix)

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
    'exit',
]

const test_2 = [
    'login -n Иван',
    'info',
    'read -i 1',
    'read -i 0',
    'write -i 3',
    'write -i 4',
    'grant -i 0 -n Слон -t read',
    'grant -i 0 -n Егор -t login',
    'grant -i 0 -n Егор -t read',
]


// interface
test(cb, test_2)
start(cb)







