'use strict'

var bcrypt = require('bcrypt')
const express = require('express')

const router = express.Router()

const { encryptionOptions } = require('../config/encryptionOptions')
const { connection } = require('../db')

router.post('/login', async (req, res) => {
    connection.query("select * from users where email = ? ;", [req.body.email], function (err, results, fields) {
        if (err) {
            res.send({
                success: false,
                error: err
            })
        } else {
            if (results.length === 0) {
                res.send({
                    success: false,
                    error: "No user found with this email"
                })
            } else {
                let correctPass = comparePasswords(req.body.password, results[0].pass)
                if (correctPass) {
                    res.send({
                        success: true,
                        data: results
                    })
                } else {
                    res.send({
                        success: false,
                        error: "The passwords don't match"
                    })
                }
            }
        }
    })
})

router.post('/register', async (req, res) => {
    if (req.body.password.length >= 6) {
        let userPass = encryptPassword(req.body.password)
        connection.query("insert into users (id, email, pass) values (NULL,?,?);", [req.body.email, userPass], function (err, results, fields) {
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

function comparePasswords(password, hash) {
    let result = bcrypt.compareSync(password, hash)
    return result
}

module.exports = router
