var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'bd6f2e74653a28',
    password: 'dad2e11d',
    database: 'heroku_3247b32ce65e6ce'
});

const dbConnect = async () => {
    try {
        connection.connect()
    } catch (e) {
        throw new Error('******** ERROR: Could not connect to the database ********')
    }
}

module.exports = { dbConnect, connection }
