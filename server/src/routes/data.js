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
        data: dataMethods.JsonGlobResult(dataMethods.readDirectory(req.headers.id))
    })
})

router.post('/folder/new', async (req, res) => {
    if (dataMethods.createFolder(req.body.folderName, req.headers.id)) {
        res.send({
            success: true,
            data: dataMethods.JsonGlobResult(dataMethods.readDirectory(req.headers.id))
        })
    } else {
        res.send({
            success: false,
            error: "Folder with the same name already exists"
        })
    }
})

router.post('/folder/delete', async (req, res) => {
    if (dataMethods.deleteFolder(req.body.folderName, req.headers.id)) {
        res.send({
            success: true,
            data: dataMethods.JsonGlobResult(dataMethods.readDirectory(req.headers.id))
        })
    } else {
        res.send({
            success: false,
            error: "No folder found with this name"
        })
    }
})

router.put('/folder/modify', async (req, res) => {
    if (dataMethods.updateFolder(req.body.folderName, req.headers.id, req.body.folderNewName)) {
        res.send({
            success: true,
            data: dataMethods.JsonGlobResult(dataMethods.readDirectory(req.headers.id))
        })
    } else {
        res.send({
            success: false,
            error: "There is a problem"
        })
    }
})

module.exports = router