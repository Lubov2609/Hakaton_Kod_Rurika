// Middleware проверки авторизации

exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }

    // Сохраняем куда хотел попасть
    req.session.returnTo = req.originalUrl;

    // Ставим flash сообщение
    req.session.flash = {
        type: 'error',
        message: 'Сессия истекла, войдите снова'
    };

    res.redirect('/login');
};