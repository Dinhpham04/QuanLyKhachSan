exports.requireRole = (role) => {
    return (req, res, next) => {
        if (req.session.user && req.session.user.role === role) {
            return next();
        }
        res.status(403).send('Forbidden'); // Không có quyền truy cập
    };
};

// const authMiddleware = require('../middlewares/authMiddleware');

// router.get('/admin/dashboard', authMiddleware.requireRole('admin'), adminController.dashboard);