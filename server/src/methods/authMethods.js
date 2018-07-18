var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

const { secret, jwtOptions } = require('../config/jwtOptions')
const { encryptionOptions } = require('../config/encryptionOptions')

module.exports = {
    deleteItemsOnJson: function(array, items) {
        for (let i = 0; i < items.length; i++) {
            delete array[items[i]]
        }
    },

    createJwtPayload: function(email, password) {
        return {
            email: email,
            password: password
        }
    },

    encryptPassword: function(password) {
        let encryptedPass = bcrypt.hashSync(password, encryptionOptions.saltRounds)
        return encryptedPass
    },

    comparePasswords: function(password, hash) {
        let result = bcrypt.compareSync(password, hash)
        return result
    },

    createJwtToken: function (payload) {
        let token = jwt.sign(payload, secret, jwtOptions)
        return token
    }
}
