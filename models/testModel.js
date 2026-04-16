const db = require('../config/db');

// сохранить попытку
const saveAttempt = async (userId, score, total, time) => {
    await db.query(
        `INSERT INTO test_attempts (user_id, score, total, time_seconds)
         VALUES ($1, $2, $3, $4)`,
        [userId, score, total, time]
    );
};

// получить статистику
const getStats = async (userId) => {
    const attempts = await db.query(
        'SELECT * FROM test_attempts WHERE user_id=$1',
        [userId]
    );

    const best = await db.query(
        `SELECT * FROM test_attempts 
         WHERE user_id=$1 
         ORDER BY score DESC, time_seconds ASC 
         LIMIT 1`,
        [userId]
    );

    return {
        attempts: attempts.rows.length,
        best: best.rows[0] || null
    };
};

// leaderboard с пагинацией
const getLeaderboard = async (limit, offset) => {
    const result = await db.query(
        `
        SELECT 
            u.id,
            u.username,

            COUNT(t.id) AS attempts,

            MAX(t.score) AS best_score,

            -- лучшее время среди лучших попыток
            MIN(t.time_seconds) FILTER (
                WHERE t.score = (
                    SELECT MAX(t2.score)
                    FROM test_attempts t2
                    WHERE t2.user_id = u.id
                )
            ) AS best_time

        FROM users u
        LEFT JOIN test_attempts t ON t.user_id = u.id

        GROUP BY u.id
        ORDER BY best_score DESC NULLS LAST, best_time ASC NULLS LAST
        LIMIT $1 OFFSET $2
        `,
        [limit, offset]
    );

    return result.rows;
};

// количество пользователей (для пагинации)
const getLeaderboardCount = async () => {
    const result = await db.query(`SELECT COUNT(*) FROM users`);
    return parseInt(result.rows[0].count, 10);
};

module.exports = {
    saveAttempt,
    getStats,
    getLeaderboard,
    getLeaderboardCount
};