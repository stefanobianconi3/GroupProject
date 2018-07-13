var mysql = require('mysql');

const dbConnect = async () => {
    try {
        var connection = mysql.createConnection({
            host: 'sql7.freemysqlhosting.net',
            user: 'sql7247495',
            password: 'nZcB2fCzNY'
        });
        connection.connect()
    } catch (e) {
        throw new Error('******** ERROR: Could not connect to the database ********')
    }
}

module.exports = {dbConnect}
