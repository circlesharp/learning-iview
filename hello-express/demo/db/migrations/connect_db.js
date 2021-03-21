var mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'trz',
  password: '123',
  database: 'express_demo',
  charset: 'utf8mb4'
});

connection.query(
  'show tables',
  function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);
