export default (req, res, next) => {
    // Lưu lại phương thức render gốc
    const originalRender = res.render;
    let role;
    if (req.session.user) {
        role = req.session.user.role;
    }
    res.render = function (view, options = {}, callback) {
        let layoutName = 'layouts/blankPage'; // Mặc định là layout chung
        if (role) {
            if (role === 'admin') {
                layoutName = 'layouts/admin'; // Dành cho admin
            } else if (role === 'staff') {
                layoutName = 'layouts/admin'; // Dành cho lễ tân
            } else if (role === 'customer') {
                layoutName = 'layouts/admin'; // Dành cho khách hàng
            }
        }
        // Gọi render của view với options ban đầu
        originalRender.call(res, view, options, (err, content) => {
            if (err) console.log(err);
            options.content = content;
            originalRender.call(res, layoutName, options, callback);
        });
    };
    next();
};