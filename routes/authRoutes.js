// Маршруты

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const testController = require('../controllers/testController');

const { isAuthenticated } = require('../middleware/authMiddleware');


// Главная страница и Сцена 1 (доступна всем)
router.get('/', (req, res) => {
    res.render('main', {
        title: 'Код Рюрика'
    });
});

// Сцена 2 (доступна всем)
router.get('/scene2', (req, res) => {
    res.render('scene2', {
        title: 'Код Рюрика: Сцена 2'
    });
});

// Портал в 862 год (доступна только после сцены авторизации)
router.get('/862', isAuthenticated, (req, res) => {
    res.render('862', {
        title: 'Код Рюрика: Портал в 862 год'
    });
});

// Сцена 3 (доступна только после авторизации)
router.get('/scene3', isAuthenticated, (req, res) => {
    res.render('scene3', {
        title: 'Код Рюрика: Сцена 3'
    });
});

// Квест 1 (доступна только после авторизации)
router.get('/quest1', isAuthenticated, (req, res) => {
    res.render('quest1', {
        title: 'Код Рюрика: Квест 1'
    });
});

// Квест 2 (доступна только после авторизации)
router.get('/quest2', isAuthenticated, (req, res) => {
    res.render('quest2', {
        title: 'Код Рюрика: Квест 2'
    });
});

// Квест 3 (доступна только после авторизации)
router.get('/quest3', isAuthenticated, (req, res) => {
    res.render('quest3', {
        title: 'Код Рюрика: Квест 3'
    });
});

// Квест 4 (доступна только после авторизации)
router.get('/quest4', isAuthenticated, (req, res) => {
    res.render('quest4', {
        title: 'Код Рюрика: Квест 4'
    });
});

// Квест 5 (доступна только после авторизации)
router.get('/quest5', isAuthenticated, (req, res) => {
    res.render('quest5', {
        title: 'Код Рюрика: Квест 5'
    });
});

// Сцена 4 (доступна только после авторизации)
router.get('/scene4', isAuthenticated, (req, res) => {
    res.render('scene4', {
        title: 'Код Рюрика: Сцена 4'
    });
});

// Сцена 5 (доступна только после авторизации)
router.get('/scene5', isAuthenticated, (req, res) => {
    res.render('scene5', {
        title: 'Код Рюрика: Сцена 5'
    });
});

// Квест 6 (доступна только после авторизации)
router.get('/quest6', isAuthenticated, (req, res) => {
    res.render('quest6', {
        title: 'Код Рюрика: Квест 6'
    });
});

// Финальный тест (доступна только после авторизации)
router.get('/final-test', isAuthenticated, (req, res) => {
    res.render('final-test', {
        title: 'Код Рюрика: Финальный тест'
    });
});

// Регистрация
router.get('/register', authController.getRegister);
router.post('/register', authController.register);

// Логин
router.get('/login', authController.getLogin);
router.post('/login', authController.login);

// Защищенная страница
router.get('/welcome', isAuthenticated, authController.welcome);

// Защищенная страница, со списком пользователей
router.get('/stat', isAuthenticated, authController.stat);

// Выход
router.get('/logout', authController.logout);

// Профиль
router.get('/profile', isAuthenticated, profileController.getProfile);
router.post('/profile', isAuthenticated, profileController.updateProfile);

// Сохранение результата финального теста
router.post('/api/test-result', isAuthenticated, testController.saveResult);

// Лидерборд
router.get('/leaderboard', testController.leaderboard);

module.exports = router;