const jwt = require('jsonwebtoken')
const path = require('path')
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

function trimString (phrase, prefix) {
    return phrase.replace(prefix+"\\", '')
}

module.exports = {
    checkJwtValidity: function (token) {
        return jwt.verify(token, secret)
    },

    decodeJwtToken: function (token) {
        return jwt.decode(token)
    },

    readDirectory: function (id) {
        if (!fs.existsSync(dataLocation)) {
            fs.mkdirSync(dataLocation)
        }
        if (!fs.existsSync(dataLocation + id)) {
            fs.mkdirSync(dataLocation + id)
        }
        return glob.sync(dataLocation + id + '/**/*').map(function (match) {
            return path.relative(dataLocation + id, match);
        })
    },

    JsonGlobResult: function (data) {
        let pointer
        let array = {}
        for (let i = 0; i < data.length; i++) {
            if (!(data[i].indexOf(".") > -1)) {
                pointer = data[i]
                array[data[i]] = []
            } else {
                array[pointer].push(trimString(data[i], pointer))
            }
        }
        return array
    },

    createFolder: function (name, id) {
        if (!fs.existsSync(dataLocation + id + "\\" + name)) {
            fs.mkdirSync(dataLocation + id + "\\" + name)
            return true
        } else {
            return false
        }
    },
}