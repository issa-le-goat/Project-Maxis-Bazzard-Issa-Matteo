const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Par défaut sur MAMP (ou vide '' parfois)
  database: 'maxibazard',
  port: 3306 // Port MySQL par défaut de MAMP
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base MySQL de MAMP !');
});

module.exports = connection;