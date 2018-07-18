'use strict'

const express = require('express')

const router = express.Router()

const authMethods = require('../methods/authMethods')

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
                if (authMethods.comparePasswords(req.body.password, results[0].pass)) {
                    authMethods.deleteItemsOnJson(results[0], ["id", "pass"])
                    res.send({
                        success: true,
                        data: results,
                        token: authMethods.createJwtToken(authMethods.createJwtPayload(results[0].email, results[0].pass))
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
        let userPass = authMethods.encryptPassword(req.body.password)
        connection.query("insert into users (id, email, pass) values (NULL,?,?);", [req.body.email, userPass], function (err, results, fields) {
            if (err) {
                res.send({
                    success: false,
                    error: err.sqlMessage
                })
            } else {
                res.send({
                    success: true,
                    data: [{
                        email: req.body.email
                    }],
                    token: authMethods.createJwtToken(authMethods.createJwtPayload(req.body.email, userPass))
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

module.exports = router
