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

module.exports = router