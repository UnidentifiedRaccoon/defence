const { errors } = require('../assets/data.json')
const { parseJSONTemplate } = require('./messages.js')

module.exports = {
    ErrorUnauthorized: class extends Error {
        constructor() {
            super()
            this.message = errors.unauthorized
        }
    },
    ErrorUserNotExists: class extends Error {
        constructor(name) {
            super()
            this.message = parseJSONTemplate(errors.userNotExists, {name})
        }
    },
    ErrorObjectNotExists: class extends Error {
        constructor(obj) {
            super()
            this.message = parseJSONTemplate(errors.objectNotExists, {obj})
        }
    },
    ErrorOperationNotFound: class extends Error {
        constructor(operation) {
            super()
            this.message = parseJSONTemplate(errors.operationNotFound, {operation})
        }
    },
    ErrorAccessDenied: class extends Error {
        constructor(operation) {
            super()
            this.message = errors.accessDenied
        }
    },
    ErrorGrantDenied: class extends Error {
        constructor(username, rule, obj) {
            super()
            this.message = parseJSONTemplate(errors.grantDenied, {username, rule, obj})
        }
    },
}