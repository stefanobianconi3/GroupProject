'use strict'

const express = require('express')

const router = express.Router()

router.post('/login', async (req, res) => {
    res.send("it works")
})

router.post('/register', async (req, res) => {
    res.send("it works")
})

module.exports = router