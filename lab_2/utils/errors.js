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
    ErrorOperationNotFound: class extends Error {
        constructor(operation) {
            super()
            this.message = parseJSONTemplate(errors.operationNotFound, {operation})
        }
    },
}