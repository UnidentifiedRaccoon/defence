const { init } = require('./utils/helpers')
const { test, start } = require("./interface/interface");
const { app } = require('./app/app.js')
const { accessRules } = require('./utils/const.js')

// core programm
const [users, objects] = init(4, 4) // subjCount, objCount


console.log("users", users)
console.log("objects", objects)
console.log("accessRules", accessRules)

const sessionStore = {
    users,
    objects,
    me: null
}

// interacton with interface
function cb(command) {
    app(command, sessionStore)
}

const testing = [
    'login -n Иван',
    'info',
    'request -i 0',
    "logout",
    // 'logout'
]


// interface
test(cb, testing)
start(cb)







