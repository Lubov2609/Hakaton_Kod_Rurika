// Контроллер (логика регистрации и авторизации)

const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

// Показ страницы регистрации
exports.getRegister = (req, res) => {
    res.render('register', {
        title: 'Регистрация',
        error: null,
        username: ''
    });
};

// Показ страницы логина (если уже залогинен — сразу на главную)
exports.getLogin = (req, res) => {
    // если уже залогинен — сразу на главную
    if (req.session.user) {
        return res.redirect('/');
    }

    res.render('login', {
        title: 'Вход',
        error: null,
        username: ''
    });
};

// Регистрация + авто-логин
exports.register = async (req, res) => {
    // Для отладки - выводим тело запроса в консоль
    console.log(req.body);
    
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.json({ success: false, message: 'Заполните все поля' });
        }

        if (password.length < 4) {
            return res.json({ success: false, message: 'Пароль слишком короткий' });
        }

        const existingUser = await userModel.findUserByUsername(username);
        if (existingUser) {
            return res.json({ success: false, message: 'Пользователь уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.createUser(username, hashedPassword);

        req.session.user = {
            id: newUser.id,
            username: newUser.username
        };

        const redirectTo = req.session.returnTo || '/';
        delete req.session.returnTo;

        res.json({
            success: true,
            message: 'Регистрация успешна',
            redirect: redirectTo
        });

    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Ошибка регистрации' });
    }
};

// Авторизация
exports.login = async (req, res) => {
    // Для отладки - выводим тело запроса в консоль
    console.log(req.body);

    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.json({
                success: false,
                message: 'Заполните все поля'
            });
        }

        const user = await userModel.findUserByUsername(username);

        if (!user) {
            return res.json({
                success: false,
                message: 'Пользователь не найден'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: 'Неверный пароль'
            });
        }

        req.session.user = {
            id: user.id,
            username: user.username
        };

        // Куда редиректить после логина
        const redirectTo = req.session.returnTo || '/';

        // Очищаем
        delete req.session.returnTo;

        res.json({
            success: true,
            message: 'Успешный вход',
            redirect: redirectTo
        });

    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            message: 'Ошибка авторизации'
        });
    }
};

// Выход
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.json({
            success: true,
            message: 'Вы вышли из системы',
            redirect: '/'
        });
    });
};

// Страница приветствия
exports.welcome = (req, res) => {
    res.render('welcome', {
        title: 'Главная',
        username: req.session.user.username
    });
};

// Страница статистики
exports.stat = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5; //количество пользователей на странице

        // защита от отрицательных значений
        const safePage = page < 1 ? 1 : page;

        const offset = (safePage - 1) * limit;

        const users = await userModel.getUsersPaginated(limit, offset);
        const totalUsers = await userModel.getUsersCount();

        const totalPages = Math.ceil(totalUsers / limit);
        
        res.render('stat', {
            title: 'Статистика',
            users,
            currentPage: safePage,
            totalPages
        });
    } catch (err) {
        console.error(err);
        res.send('Ошибка загрузки статистики');
    }
};