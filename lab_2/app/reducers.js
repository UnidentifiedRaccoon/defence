const { rules, commands, commandsToRules, ruleToNumber } = require('../utils/const')
const messages = require('../utils/messages')
const { ErrorUnauthorized, ErrorUserNotExists, ErrorOperationNotFound, ErrorAccessDenied, ErrorGrantDenied, ErrorObjectNotExists } = require('../utils/errors')
const { stringifyRule, mergeRules, hasReadAccess, hasWriteAccess, hasGrantAccess, hasUser, hasObj, extractAttributeValue} = require('../utils/helpers')

const TYPES = {
    LOGIN: commands.login,
    LOGOUT: commands.logout,
    INFO: commands.info,
    READ: commands.read,
    WRITE: commands.write,
    GRANT: commands.grant,
}

//
// TODO unauthorized obj
//
const login = (payload) => {
    const name = extractAttributeValue(payload, 'name')
    const matrix = payload.sessionStore.matrix
    if (!hasUser(matrix, name)) throw new ErrorUserNotExists(name)
    payload.sessionStore.me = {name, rules: matrix.get(name)}
    messages.login(name)
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

const read = (payload) => {
    const me = payload.sessionStore.me
    const matrix = payload.sessionStore.matrix
    const index = extractAttributeValue(payload, 'index', parseInt)
    if (!hasObj(matrix, index)) throw new ErrorObjectNotExists(index)
    const requestedObjectRule = me.rules[index]
    if (!hasReadAccess(requestedObjectRule)) throw new ErrorAccessDenied()
    messages.successOperation()
}

const write = (payload) => {
    const me = payload.sessionStore.me
    const matrix = payload.sessionStore.matrix
    const index = extractAttributeValue(payload, 'index', parseInt)
    if (!hasObj(matrix, index)) throw new ErrorObjectNotExists(index)
    const requestedObjectRule = me.rules[index]
    if (!hasWriteAccess(requestedObjectRule)) throw new ErrorAccessDenied()
    messages.successOperation()
}

const grant = (payload) => {
    const me = payload.sessionStore.me
    const matrix = payload.sessionStore.matrix
    const index = extractAttributeValue(payload, 'index', parseInt)
    if (!hasObj(matrix, index)) throw new ErrorObjectNotExists(index)
    const requestedObjectRule = me.rules[index]
    if (!hasGrantAccess(requestedObjectRule)) throw new ErrorAccessDenied()
    const type = extractAttributeValue(payload, 'type')
    if (!commandsToRules.hasOwnProperty(type)) throw new ErrorGrantDenied(me.name, type, index)
    const user = extractAttributeValue(payload, 'name')
    if (!hasUser(matrix, user)) throw new ErrorUserNotExists(user)
    messages.successOperation()
    // set grantRule to user
    const currentRule = stringifyRule(parseInt(matrix.get(user)[index]))
    const grantRule = ruleToNumber[commandsToRules[type]]
    matrix.get(user)[index] = mergeRules(currentRule, grantRule)
    console.log(matrix.get(user))
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
            case TYPES.READ: {
                return read(payload)
            }
            case TYPES.WRITE: {
                return write(payload)
            }
            case TYPES.GRANT: {
                return grant(payload)
            }
            default: {
                throw new ErrorOperationNotFound(type)
            }
        }
    }
}