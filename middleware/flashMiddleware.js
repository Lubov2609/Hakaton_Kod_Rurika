// Простая реализация flash-сообщений через сессии

module.exports = (req, res, next) => {
    // Передаем flash в шаблоны
    res.locals.flash = req.session.flash;

    // Очищаем после одного использования
    delete req.session.flash;

    next();
};