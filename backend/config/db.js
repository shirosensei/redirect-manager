const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, // Add your MySQL password here
    database: process.env.DB_NAME
  });
  

  //* Export it for use in other files
  module.exports = pool.promise();