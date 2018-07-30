const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')

const dataLocation = defineDataLocation(__dirname)

function defineDataLocation (dirname) {
    let x = dirname.replace('routes', '')
    let y = x.substr(0, x.length - 1)
    let location = y.replace('src', 'user_data')
    return location.replace('method','')
}

function dirTree(filename) {
    var stats = fs.lstatSync(filename),
        info = {
            name: path.basename(filename)
        }
    if (stats.isDirectory()) {
        info.type = 'dir'
        info.children = fs.readdirSync(filename).map(function (child) {
            return dirTree(filename + '/' + child)
        })
        if (info.children.length > 0) {
            if (info.children[0]['type'] == 'file') {
                info.type = 'model'
            }
        }
    } else {
        info.type = 'file'
    }
    return info;
}

module.exports = {

    readDirectory: function (id) {
        if (!fs.existsSync(dataLocation)) {
            fs.mkdirSync(dataLocation)
        }
        if (!fs.existsSync(dataLocation + id)) {
            fs.mkdirSync(dataLocation + id)
        }
        return dirTree(dataLocation + id)['children']
    },

    createFolder: function (name, id) {
        if (!fs.existsSync(dataLocation + id + "\\" + name)) {
            fs.mkdirSync(dataLocation + id + "\\" + name)
            return true
        } else {
            return false
        }
    },

    deleteFolder: function (name, id) {
        if (fs.existsSync(dataLocation + id + "\\" + name)) {
            rimraf.sync(dataLocation + id + "\\" + name)
            return true
        } else {
            return false
        }
    },

    updateFolder: function (name, id, newName) {
        try {
            if (fs.existsSync(dataLocation + id + "\\" + name)) {
                fs.renameSync(dataLocation + id + "\\" + name, dataLocation + id + "\\" + newName)
                return true
            } else {
                return false
            }
        }
        catch (err) {
            return false
        }
    }
}