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
    if (dataMethods.createFolder(req.body.folderName, req.headers.id)) {
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

router.delete('/folder', async (req, res) => {
    if (dataMethods.deleteFolder(req.body.folderName, req.headers.id)) {
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
    if (dataMethods.updateFolder(req.body.folderName, req.headers.id, req.body.folderNewName)) {
        res.send({
            success: true,
            data: dataMethods.readDirectory(req.headers.id)
        })
    } else {
        res.send({
            success: false,
            error: "There is a problem"
        })
    }
})

router.post('/model', async (req, res) => {
    if (dataMethods.createModel(req.body.modelName, req.headers.id)) {
        res.send({
            success: true,
            data: dataMethods.readDirectory(req.headers.id)
        })
    } else {
        res.send({
            success: false,
            error: "There is a problem"
        })
    }
})

router.put('/model', async (req, res) => {
    if (dataMethods.updateModel(req.body.modelName, req.headers.id, req.body.newModelName)) {
        res.send({
            success: true,
            data: dataMethods.readDirectory(req.headers.id)
        })
    } else {
        res.send({
            success: false,
            error: "There is a problem"
        })
    }
})

router.delete('/model', async (req, res) => {
    if (dataMethods.deleteModel(req.body.modelName, req.headers.id)) {
        res.send({
            success: true,
            data: dataMethods.readDirectory(req.headers.id)
        })
    } else {
        res.send({
            success: false,
            error: "There is a problem"
        })
    }
})

router.post('/model/open', async (req, res) => {
    if (dataMethods.existsModel(req.body.modelName, req.headers.id)) {
        res.send({
            success: true,
            data: dataMethods.openModel(req.body.modelName, req.headers.id, req.body.version)
        })
    } else {
        res.send({
            success: false,
            error: "There is a problem"
        })
    }
})

router.post('/model/save', async (req, res) => {
    if (dataMethods.saveModel(req.body.modelName, req.headers.id, req.body.content, req.body.version)) {
        res.send({
            success: true,
            data: 'Model saved correctly'
        })
    } else {
        res.send({
            success: false,
            error: "There is a problem"
        })
    }
})

module.exports = router