const mysql = require('mysql2');

require('dotenv').config();

// create connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_tracker.db'
});

module.exports = db;

