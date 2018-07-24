'use strict'

const express = require('express')

const router = express.Router()

const dataMethods = require('../methods/dataMethods')

router.get('/', async (req, res) => {
    if (dataMethods.checkJwtValidity(req.headers.token)) {
        let ff = dataMethods.readDirectory(req.headers.id)
        res.send({
            success: true,
            data: dataMethods.JsonGlobResult(ff)
        })
    } else {
        res.send({
            success: false,
            error: 'Not a valid token provided'
        })
    }
})

module.exports = router