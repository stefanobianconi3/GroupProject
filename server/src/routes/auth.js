'use strict'

const express = require('express')

const router = express.Router()

router.get('/login', async (req, res) => {
    res.send("it works")
})

module.exports = router