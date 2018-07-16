'use strict'

const express = require('express')

const router = express.Router()

const { connection } = require('../db')

router.post('/login', async (req, res) => {
    res.send(connection.state)
})

router.post('/register', async (req, res) => {
    let userEmail = req.body.email
    let userPass = req.body.password
    connection.query("insert into users (id, email, password) values (NULL,?,?);", [userEmail, userPass], function (err, results, fields) {
        if (err) {
            throw err
        } else {
            res.send(results)
        }
    })
})

module.exports = router