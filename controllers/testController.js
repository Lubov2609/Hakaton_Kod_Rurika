const testModel = require('../models/testModel');

// сохранить результат
exports.saveResult = async (req, res) => {
    try {
        const userId = req.session.user.id;

        const { score, total, time } = req.body;

        await testModel.saveAttempt(userId, score, total, time);

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
};

exports.leaderboard = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;

        const users = await testModel.getLeaderboard(limit, offset);
        const total = await testModel.getLeaderboardCount();

        const totalPages = Math.ceil(total / limit);

        res.render('leaderboard', {
            title: 'Leaderboard',
            users,
            currentPage: page,
            totalPages
        });

    } catch (err) {
        console.error(err);
        res.send('Ошибка leaderboard');
    }
};