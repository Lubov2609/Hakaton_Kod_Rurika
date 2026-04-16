// Подключение к PostgreSQL
const { Pool } = require('pg');
require('dotenv').config();

// Создаем пул подключений
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Проверка подключения с retry
async function connectWithRetry() {
    while (true) {
        try {
            await pool.query('SELECT 1');
            console.log('PostgreSQL connected');
            break;
        } catch (err) {
            console.log('Waiting for PostgreSQL...');
            await new Promise(res => setTimeout(res, 2000));
        }
    }
}

connectWithRetry();

// Экспортируем для использования в моделях
module.exports = pool;