const https = require('https')
const fs = require('fs')

const sslOptions = {
	key: fs.readFileSync(),
	cert: fs.readFileSync()
}

let httpsServer = https.createServer(sslOptions, app)
httpsServer.listen(443, () => console.log(`HTTP server at localhost: 3001\n`))