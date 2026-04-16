const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const testModel = require('../models/testModel');

// GET /profile
exports.getProfile = async (req, res) => {
    const user = await userModel.findUserByUsername(req.session.user.username);
    const crypto = require('crypto');
    const stats = await testModel.getStats(user.id);

    let avatar = null;

    if (user.email) {
        const hash = crypto
            .createHash('md5')
            .update(user.email.trim().toLowerCase())
            .digest('hex');

        avatar = `https://www.gravatar.com/avatar/${hash}?d=identicon`;
    }

    res.render('profile', {
        title: 'Профиль',
        user,
        avatar,
        stats
    });
};

// POST /profile
exports.updateProfile = async (req, res) => {
    const userId = req.session.user.id;

    const {
        first_name,
        last_name,
        middle_name,
        email,
        password,
        password2
    } = req.body;

    try {
        // 🔐 смена пароля
        if (password) {
            if (password.length < 4) {
                return res.json({ success: false, message: 'Пароль слишком короткий' });
            }

            if (password !== password2) {
                return res.json({ success: false, message: 'Пароли не совпадают' });
            }

            const hash = await bcrypt.hash(password, 10);
            await userModel.updatePassword(userId, hash);
        }

        // 👤 обновление профиля
        await userModel.updateProfile(userId, {
            first_name,
            last_name,
            middle_name,
            email
        });

        res.json({
            success: true,
            message: 'Изменения сохранены'
        });

    // } catch (err) {
    //     console.error(err);
    //     res.json({ success: false, message: 'Ошибка сохранения' });
    // }

    } catch (err) {
    console.error('PROFILE ERROR:', err); // 🔥

    res.json({
        success: false,
        message: err.message // 🔥 покажет реальную ошибку
    });
}
};