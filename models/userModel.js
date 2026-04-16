// Модель пользователя (работа с БД)
const db = require('../config/db');

// Создание пользователя
const createUser = async (username, hashedPassword) => {
    const result = await db.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, hashedPassword]
    );

    return result.rows[0];
};

// Найти пользователя по username
const findUserByUsername = async (username) => {
    const result = await db.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
    );

    return result.rows[0];
};

// Получить всех пользователей
const getAllUsers = async () => {
    const result = await db.query(
        'SELECT id, username FROM users ORDER BY id ASC'
    );

    return result.rows;
};

// Пагинация пользователей
const getUsersPaginated = async (limit, offset) => {
    const result = await db.query(
        'SELECT id, username FROM users ORDER BY id ASC LIMIT $1 OFFSET $2',
        [limit, offset]
    );

    return result.rows;
};

//  Общее количество пользователей
const getUsersCount = async () => {
    const result = await db.query(
        'SELECT COUNT(*) FROM users'
    );

    return parseInt(result.rows[0].count, 10);
};

// Обновление профиля пользователя
const updateProfile = async (id, data) => {
    const { first_name, last_name, middle_name, email } = data;

    const result = await db.query(
        `UPDATE users 
         SET first_name=$1, last_name=$2, middle_name=$3, email=$4
         WHERE id=$5
         RETURNING *`,
        [first_name, last_name, middle_name, email, id]
    );

    return result.rows[0];
};

// Смена пароля 
const updatePassword = async (id, hashedPassword) => {
    await db.query(
        'UPDATE users SET password=$1 WHERE id=$2',
        [hashedPassword, id]
    );
};

// Экспорт всех функций
module.exports = {
    createUser,
    findUserByUsername,
    getAllUsers,
    getUsersPaginated,
    getUsersCount,
    updateProfile,
    updatePassword
};