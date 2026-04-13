// =========================================================
// MAXIBAZARD — Connexion MySQL (pool de connexions)
// =========================================================
const mysql  = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     process.env.DB_PORT     || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME     || 'maxibazard',
  waitForConnections: true,
  connectionLimit:    10,
  charset: 'utf8mb4'
});

// Test de connexion au démarrage
pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL connecté — base :', process.env.DB_NAME || 'maxibazard');
    conn.release();
  })
  .catch(err => console.error('❌ Erreur MySQL :', err.message));

module.exports = pool;
