// db.js
const mysql = require('mysql2');

// Create connection
const connection = mysql.createConnection({
    host: 'localhost',       // your host
    user: 'root',            // your MySQL username
    password: 'password',    // your MySQL password
    database: 'ecolife'      // database name
});

// Connect to DB
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = connection;

