const { onExit } = require('../utils/helpers')
const { error } = require('../interface/beautify')
const { unauthorized, authorized } = require('./reducers')

const isAuth = (sessionStore) => {
    return sessionStore.me !== null
}

module.exports = {
    app(command, sessionStore) {
        // stop running app if 'exit' commmand come
        onExit(...command)

        // form a request object for the app
        const action = {
            type: command[0],
            payload: {...Object.fromEntries(command[1]), sessionStore}
        }

        // try to execute app with a request object
        try { 
            if(isAuth(sessionStore)) authorized(action)
            else unauthorized(action)
        } catch (e) {
            console.log(error(e.message))
        }

    }
}