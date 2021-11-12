
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: "localhost",
  //port: 3001,
  user: "root",
  password: "Omera@1234",
  database: "employeeTrack_db",
});

connection.connect(function(err) {
  if (err) throw err;
  //employeeTrack();
});
 module.exports = connection
