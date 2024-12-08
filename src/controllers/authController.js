import authService from "../services/authService";

let getLoginPage = (req, res) => {
    res.render('base/login', { error: null });
}

let postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.authenticateUser(email, password);
        if (!req.session) {
            req.session = {};
        }
        if (user) {
            req.session.user = user; // Lưu thông tin user vào session
            req.session.save();
            // Chuyển hướng dựa trên role
            if (user.role === 'admin') {
                res.redirect('/admin/homePage');
            } else if (user.role === 'staff') {
                res.redirect('/nhanvien');
            } else if (user.role === 'customer') {
                res.redirect('/crud');
            }
        } else {
            res.render('base/login', { error: 'Invalid email or password' }); // Hiển thị lại form với lỗi
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}



// Hiển thị trang đăng ký
let getRegisterPage = (req, res) => {
    res.render('base/register', { error: null }); // Truyền error nếu có lỗi
};

// Xử lý đăng ký
let postRegister = async (req, res) => {
    const { email, password, name, role } = req.body;

    try {
        const result = await authService.registerUser({ email, password, name, role });
        if (result.success) {
            res.redirect('login'); // Chuyển hướng đến trang login sau khi đăng ký thành công
        } else {
            res.render('base/register', { error: result.message }); // Hiển thị lỗi nếu không thành công
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
module.exports = {
    getLoginPage,
    postLogin,
    getRegisterPage,
    postRegister,
}