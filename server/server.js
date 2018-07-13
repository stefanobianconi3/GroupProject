const https = require('https')
const fs = require('fs')

const {app} = require('./src/app')
const port = 8443

const sslOptions = {
	key: fs.readFileSync(),
	cert: fs.readFileSync()
}

let httpsServer = https.createServer(sslOptions, app)
httpsServer.listen(port, () => console.log('HTTPS server at localhost: '+port+'\n'))