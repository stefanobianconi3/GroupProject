'use strict'

const express = require('express')
const fs = require('fs')

const router = express.Router()

const dataMethods = require('../methods/dataMethods')

const dataLocation = dataMethods.defineDataLocation(__dirname)

router.get('/', async (req, res) => {
    res.send(dataLocation)
})

module.exports = router