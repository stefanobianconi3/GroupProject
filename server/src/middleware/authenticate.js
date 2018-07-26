'use strict'

const jwt = require('jsonwebtoken')

const { secret } = require('../config/jwtOptions')

const authenticate = async (req, res, next) => {
    if (req.headers.token) {
        try {
            if (jwt.verify(req.headers.token, secret)) {
                return next()
            } else {
                res.send({
                    success: false,
                    error: 'Not a valid token provided'
                })
            }
        }
        catch (err) {
            res.send({
                success: false,
                error: 'Not a valid token provided'
            })
        }
    } else {
        res.send({
            success: false,
            error: 'No token provided'
        })
    }
}

module.exports = { authenticate }