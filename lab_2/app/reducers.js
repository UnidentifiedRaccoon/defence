const { rules } = require('../utils/const')
const messages = require('../utils/messages')
const { commands } = require('../assets/data.json')
const { ErrorUnauthorized, ErrorUserNotExists, ErrorOperationNotFound } = require('../utils/errors')

const TYPES = {
    LOGIN: commands.login,
    LOGOUT: commands.logout,
    INFO: commands.info,
}


//
// TODO unauthorized obj
//
const login = (payload) => {
    const name = payload.name || payload.n
    const matrix = payload.sessionStore.matrix
    if (matrix.has(name)) {
        payload.sessionStore.me = {name, rules: matrix.get(name)}
        messages.login(name)
    }
    else {
        throw new ErrorUserNotExists(name)
    }
}

//
// TODO authorized obj
//
const info = (payload) => {
    const me = payload.sessionStore.me
    messages.listOfRules()
    console.table(me.rules.map(x => rules[x]))
}


const logout = (payload) => {
    messages.logout(payload.sessionStore.me.name)
    payload.sessionStore.me = null
}




module.exports = {
    TYPES,

    unauthorized({type, payload}) {
        switch(type) {
            case TYPES.LOGIN: {
                return login(payload)
            } 
            default: {
                throw new ErrorUnauthorized() 
            }
        } 
    },

    authorized({type, payload}) {
        switch(type) {
            case TYPES.INFO: {
                return info(payload)
            }
            case TYPES.LOGOUT: {
                return logout(payload)
            }
            default: {
                throw new ErrorOperationNotFound(type)
            }
        }
    }
}