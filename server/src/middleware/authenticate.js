'use strict'

const jwt = require('jsonwebtoken')

const { secret } = require('../config/jwtOptions')

const authenticate = async (req, res, next) => {
    if (req.headers.token) {
        try {
            let verification = jwt.verify(req.headers.token, secret)
            if (verification) {
                let id = verification['id']
                if(id == req.headers.id){
                    return next()
                } else {
                    res.send({
                        success: false,
                        error: 'The signed token does not belong to the provided id'
                    })
                }
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