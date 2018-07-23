var jwt = require('jsonwebtoken')
const fs = require('fs')
const glob = require('glob')

const { secret } = require('../config/jwtOptions')

const dataLocation = defineDataLocation(__dirname)

function defineDataLocation (dirname) {
    let x = dirname.replace('routes', '')
    let y = x.substr(0, x.length - 1)
    let location = y.replace('src', 'user_data')
    return location.replace('method','')
}

module.exports = {
    checkJwtValidity: function (token) {
        return jwt.verify(token, secret)
    },

    decodeJwtToken: function (token) {
        return jwt.decode(token)
    },

    readDirectory: function (id) {
        if (!fs.existsSync(dataLocation + id)) {
            fs.mkdirSync(dataLocation + id)
            return fs.readdirSync(dataLocation + id)
        } else {
            return glob.sync(dataLocation + id + '/**/*')
        }
    }
}