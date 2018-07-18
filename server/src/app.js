'use strict'

const express = require('express')
const path = require('path')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const {dbConnect} = require('./db')

/* SERVER & PARAMETERS */
const app = express()

/* SECURITY */
app.use(helmet())

/* LOGGING */
app.use(morgan('combined'))

/* MISCELLANEOUS */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({'extended': true}))

/* DATABASE */
dbConnect().catch((e) => {
  console.log(e.message)
  process.exit(1)
})

/* ROUTES */

const authRoute = require("./routes/auth")

// Routers
// Auth API
app.use('/api/auth', authRoute)

module.exports = {app}
