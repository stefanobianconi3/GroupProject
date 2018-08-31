const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')

const dataLocation = defineDataLocation(__dirname)

function defineDataLocation(dirname) {
    let x = dirname.replace('routes', '')
    let y = x.substr(0, x.length - 1)
    let location = y.replace('src', 'user_data')
    return location.replace('method', '')
}

function removeIdFromPath(id, file) {
    return file.slice(2)
}

function dirTree(filename, id) {
    var stats = fs.lstatSync(filename),
        info = {
            name: path.basename(filename),
            path: removeIdFromPath(id, path.relative(dataLocation, filename))
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

function createFile(path, name, content) {
    try {
        if(content){
            fs.writeFileSync(path + name, content)
            return true
        } else {
            fs.writeFileSync(path + name, 
                '<?xml version="1.0" encoding="UTF-8"?>' +
                    '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                                        'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                                        'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
                                        'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
                                        'targetNamespace="http://bpmn.io/schema/bpmn" ' +
                                        'id="Definitions_1">' +
                        '<bpmn:process id="Process_1" isExecutable="false">' +
                        '<bpmn:startEvent id="StartEvent_1"/>' +
                        '</bpmn:process>' +
                        '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
                        '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
                            '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">' +
                            '<dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/>' +
                            '</bpmndi:BPMNShape>' +
                        '</bpmndi:BPMNPlane>' +
                        '</bpmndi:BPMNDiagram>' +
                    '</bpmn:definitions>'
            )
            return true
        }
    } catch (err) {
        return false
    }
}



module.exports = {

    recalcPath: function(path){
        return path.replace(/\\/g,"/");
    },

    readDirectory: function (id) {
        if (!fs.existsSync(dataLocation)) {
            fs.mkdirSync(dataLocation)
        }
        if (!fs.existsSync(dataLocation + id)) {
            fs.mkdirSync(dataLocation + id)
        }
        return dirTree(dataLocation + id, id)['children']
    },

    createFolder: function (name, id) {
        console.log(dataLocation + id)
        if (!fs.existsSync(dataLocation + id + "//" + name)) {
            fs.mkdirSync(dataLocation + id + "//" + name)
            return true
        } else {
            return false
        }
    },

    deleteFolder: function (name, id) {
        if (fs.existsSync(dataLocation + id + "//" + name)) {
            rimraf.sync(dataLocation + id + "//" + name)
            return true
        } else {
            return false
        }
    },

    updateFolder: function (name, id, newName) {
        try {
            if (fs.existsSync(dataLocation + id + "//" + name)) {
                fs.renameSync(dataLocation + id + "//" + name, dataLocation + id + "//" + newName)
                return true
            } else {
                return false
            }
        }
        catch (err) {
            return false
        }
    },

    createModel: function (path, id) {
        if (!fs.existsSync(dataLocation + id + "//" + path)) {
            fs.mkdirSync(dataLocation + id + "//" + path)
            return createFile(dataLocation + id + "//" + path + "//", "0.xml", undefined)
        } else {
            return false
        }
    },

    updateModel: function (path, id, newPath) {
        try {
            if (fs.existsSync(dataLocation + id + "//" + path)) {
                fs.renameSync(dataLocation + id + "//" + path, dataLocation + id + "//" + newPath)
                return true
            } else {
                return false
            }
        }
        catch (err) {
            return false
        }
    },

    deleteModel: function (path, id) {
        if (fs.existsSync(dataLocation + id + "//" + path)) {
            rimraf.sync(dataLocation + id + "//" + path)
            return true
        } else {
            return false
        }
    },

    existsModel: function (path, id) {
        if (fs.existsSync(dataLocation + id + "//" + path)) {
            return true
        } else {
            return false
        }
    },

    openModel: function (path, id, version) {
        if (version) {
            return fs.readFileSync(dataLocation + id + "//" + path + "//" + version+".xml", { encoding: 'utf-8' })
        } else {
            //Assumo che debba aprire la prima versione del modello
            return fs.readFileSync(dataLocation + id + "//" + path + "//" + "0.xml", { encoding: 'utf-8' })
        }
    },

    saveModel: function (path, id, content, version){
        return createFile(dataLocation + id + "//" + path + "//", version+".xml", content)
    }
    
}