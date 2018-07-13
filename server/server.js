const https = require('https')
const fs = require('fs')

const {app} = require('./src/app')
const port = 8443

const sslOptions = {
	key: fs.readFileSync('./certificate/key.pem'),
	cert: fs.readFileSync('./certificate/cert.pem')
}

let httpsServer = https.createServer(sslOptions, app)
httpsServer.listen(port, () => console.log(`HTTP server at localhost: `+port+"\n"))
