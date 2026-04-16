// Основной сервер

const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
require('dotenv').config();

const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// Подключаем middleware для flash-сообщений
const flashMiddleware = require('./middleware/flashMiddleware');

const app = express();

// livereload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname + "/public");
liveReloadServer.watch(__dirname + "/views");

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

// Подключаем middleware для livereload
app.use(connectLivereload());

// Настройка шаблонизатора
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Парсинг JSON данных
app.use(express.json());

// Парсинг POST данных
app.use(express.urlencoded({ extended: true }));

// Настройка сессий
app.use(session({
    store: new pgSession({
        pool: db, // используем PostgreSQL для хранения сессий
        tableName: 'session',
        createTableIfMissing: true // Авто-создание таблицы сессий
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true, // Обновляет сессию при каждом запросе
    cookie: {
        maxAge: 1000 * 60 * 60 // 60 минут
    }
}));

// Настройка шаблонизатора
app.set('view engine', 'ejs');

// Подключаем middleware для layouts
app.use(expressLayouts);

// Указываем layout по умолчанию
app.set('layout', 'layout');

// Подключаем middleware для flash-сообщений
app.use(flashMiddleware);

// Подключаем статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Глобальная переменная для текущего пользователя
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Подключаем роуты
app.use('/', authRoutes);

// Глобальная переменная для заголовка
app.use((req, res, next) => {
    res.locals.title = 'Auth App';
    next();
});

// Старт сервера
app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
});