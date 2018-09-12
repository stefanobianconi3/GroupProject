'use strict'

const express = require('express')

const router = express.Router()

const dataMethods = require('../methods/dataMethods')
const { authenticate } = require('../middleware/authenticate')

/* Middleware per l'autenticazione */
router.use(authenticate)

router.get('/', async (req, res) => {
    res.send({
        success: true,
        data: dataMethods.readDirectory(req.headers.id)
    })
})

router.post('/folder', async (req, res) => {
    if (dataMethods.createFolder(dataMethods.recalcPath(req.body.folderName), req.headers.id)) {
        res.send({
            success: true,
            data: dataMethods.readDirectory(req.headers.id)
        })
    } else {
        res.send({
            success: false,
            error: "Folder with the same name already exists"
        })
    }
})

router.post('/folder/delete', async (req, res) => {
    if (dataMethods.deleteFolder(dataMethods.recalcPath(req.body.folderName), req.headers.id)) {
        res.send({
            success: true,
            data: dataMethods.readDirectory(req.headers.id)
        })
    } else {
        res.send({
            success: false,
            error: "No folder found with this name"
        })
    }
})

router.put('/folder', async (req, res) => {
    if (dataMethods.updateFolder(dataMethods.recalcPath(req.body.folderName), req.headers.id, dataMethods.recalcPath(req.body.folderNewName))) {
        res.send({
            success: true,
            data: dataMethods.readDirectory(req.headers.id)
        })
    } else {
        res.send({
            success: false,
            error: "There is no such folder with that name"
        })
    }
})

router.post('/model', async (req, res) => {
    if (dataMethods.createModel(dataMethods.recalcPath(req.body.modelName), req.headers.id)) {
        res.send({
            success: true,
            data: dataMethods.readDirectory(req.headers.id)
        })
    } else {
        res.send({
            success: false,
            error: "There is a problem during the creation of the model. Please try again!"
        })
    }
})

router.put('/model', async (req, res) => {
    if (dataMethods.updateModel(dataMethods.recalcPath(req.body.modelName), req.headers.id, dataMethods.recalcPath(req.body.newModelName))) {
        res.send({
            success: true,
            data: dataMethods.readDirectory(req.headers.id)
        })
    } else {
        res.send({
            success: false,
            error: "There is no such model with that name"
        })
    }
})

router.post('/model/delete', async (req, res) => {
    if (dataMethods.deleteModel(dataMethods.recalcPath(req.body.modelName), req.headers.id)) {
        res.send({
            success: true,
            data: dataMethods.readDirectory(req.headers.id)
        })
    } else {
        res.send({
            success: false,
            error: "There is no such model with that name"
        })
    }
})

router.post('/model/open', async (req, res) => {
    if (dataMethods.existsModel(dataMethods.recalcPath(req.body.modelName), req.headers.id)) {
        res.send({
            success: true,
            data: dataMethods.openModel(dataMethods.recalcPath(req.body.modelName), req.headers.id, req.body.version)
        })
    } else {
        res.send({
            success: false,
            error: "There is no such model"
        })
    }
})

router.post('/model/save', async (req, res) => {
    if (dataMethods.saveModel(dataMethods.recalcPath(req.body.modelName), req.headers.id, req.body.content, req.body.version)) {
        res.send({
            success: true,
            data: 'Model saved correctly'
        })
    } else {
        res.send({
            success: false,
            error: "There is an error"
        })
    }
})

module.exports = router