const { rules, commands } = require('../utils/const')
const messages = require('../utils/messages')
const { ErrorUnauthorized, ErrorUserNotExists, ErrorOperationNotFound, ErrorObjectNotExists, ErrorAccessDenied } = require('../utils/errors')
const { getUser, hasObj,  extractAttributeValue} = require('../utils/helpers')

const TYPES = {
    LOGIN: commands.login,
    LOGOUT: commands.logout,
    INFO: commands.info,
    REQUEST: commands.request,
}

//
// TODO unauthorized obj
//
const login = (payload) => {
    const name = extractAttributeValue(payload, 'name')
    const users = payload.sessionStore.users
    const user = getUser(users, name)
    if (!user) throw new ErrorUserNotExists(name)
    payload.sessionStore.me = user
    messages.login(name)
}

//
// TODO authorized obj
//
const info = (payload) => {
    const me = payload.sessionStore.me
    const accessedObjs = payload.sessionStore.objects.map((x, i) => [x, i]).filter(([x]) => x <= me.access).map(([_,i]) => i)
    messages.levelOffAccess(me.access)
    messages.accessedObjects(accessedObjs)

}

const logout = (payload) => {
    messages.logout(payload.sessionStore.me.name)
    payload.sessionStore.me = null
}

const request = (payload) => {
    const me = payload.sessionStore.me
    const objs = payload.sessionStore.objects
    const index = extractAttributeValue(payload, 'index', parseInt)
    if (!hasObj(objs, index)) throw new ErrorObjectNotExists(index)
    const obj = objs[index]
    if (obj > me.access) throw new ErrorAccessDenied()
    messages.successOperation()
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
            case TYPES.REQUEST: {
                return request(payload)
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