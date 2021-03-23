const mysql = require('mysql2');

// create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passwordSha1: 'ArcticMonkey01',
    database: 'test'
});


