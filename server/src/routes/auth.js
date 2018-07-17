'use strict'

var bcrypt = require('bcrypt')
const express = require('express')

const router = express.Router()

const { encryptionOptions } = require('../config/encryptionOptions')
const { connection } = require('../db')

router.post('/login', async (req, res) => {
    let userEmail = req.body.email
    let userPass = req.body.password
    connection.query("select * from users where email = ? ;", [userEmail], function (err, results, fields) {
        if (err) {
            res.send({
                success: false,
                error: err
            })
        } else {
            let correctPass = bcrypt.compareSync(userPass, results[0].pass)
            if (correctPass) {
                res.send({
                    success: true,
                    data: results
                })
            } else {
                res.send({
                    success: false,
                    error: "The passwords doesn't match"
                })
            }
        }
    })
})

router.post('/register', async (req, res) => {
    let userEmail = req.body.email
    if (req.body.password.length >= 6) {
        let userPass = encryptPassword(req.body.password)
        connection.query("insert into users (id, email, pass) values (NULL,?,?);", [userEmail, userPass], function (err, results, fields) {
            if (err) {
                res.send({
                    success: false,
                    error: err
                })
            } else {
                res.send({
                    success: true,
                    data: results
                })
            }
        })
    } else {
        res.send({
            success: false,
            error: "The required password length is at least 6 characters"
        })
    }
})

function encryptPassword(password) {
    let encryptedPass = bcrypt.hashSync(password, encryptionOptions.saltRounds)
    return encryptedPass
}

module.exports = router
