'use strict'

const express = require('express')

const router = express.Router()

const dataMethods = require('../methods/dataMethods')

router.get('/', async (req, res) => {
    if (dataMethods.checkJwtValidity(req.headers.token)) {
        res.send({
            success: true,
            data: dataMethods.JsonGlobResult(dataMethods.readDirectory(req.headers.id))
        })
    } else {
        res.send({
            success: false,
            error: 'Not a valid token provided'
        })
    }
})

router.post('/folder/new', async (req, res) => {
    if (dataMethods.checkJwtValidity(req.headers.token)) {
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
    } else {
        res.send({
            success: false,
            error: 'Not a valid token provided'
        })
    }
})

router.post('/folder/delete', async (req, res) => {
    if (dataMethods.checkJwtValidity(req.headers.token)) {
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
    } else {
        res.send({
            success: false,
            error: 'Not a valid token provided'
        })
    }
})

module.exports = router