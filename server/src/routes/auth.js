'use strict'

const express = require('express')

const router = express.Router()

const { connection } = require('../db')

router.post('/login', async (req, res) => {
    let userEmail = req.body.email
    let userPass = req.body.password
    connection.query("select * from users where email = ? and pass = ?;", [userEmail, userPass], function (err, results, fields) {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(results)
        }
    })
})

router.post('/register', async (req, res) => {
    let userEmail = req.body.email
    let userPass = req.body.password
    connection.query("insert into users (id, email, pass) values (NULL,?,?);", [userEmail, userPass], function (err, results, fields) {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(results)
        }
    })
})

module.exports = router