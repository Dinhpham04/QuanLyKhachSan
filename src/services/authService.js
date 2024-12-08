import db from '../models/index';
import bcrypt from 'bcryptjs';

let authenticateUser = async (email, password) => {
    try {
        // Tìm trong bảng NhanVien trước
        let user = await db.NhanVien.findOne({ where: { email } });
        if (user) {
            const isPasswordValid = await bcrypt.compareSync(password, user.matKhau);
            if (isPasswordValid) {
                return { ...user, role: user.chucDanh === 'admin' ? 'admin' : 'staff' }; // Xác định role
            }
        }

        // Nếu không phải nhân viên, kiểm tra trong bảng KhachHang
        user = await db.KhachHang.findOne({ where: { email }, raw: true });
        if (user) {
            const isPasswordValid = await bcrypt.compareSync(password, user.matKhau);
            if (isPasswordValid) {
                return { ...user, role: 'customer' }; // Gán role là customer
            }
        }

        return null; // Không tìm thấy user hợp lệ
    } catch (error) {
        throw error; // Xử lý lỗi
    }
}

// Hàm đăng ký người dùng
let registerUser = async ({ email, password, name, role = "" }) => {
    try {
        // Kiểm tra vai trò
        if (role === 'admin' || role === 'staff') {
            // Lưu vào bảng NhanVien
            const existingUser = await db.NhanVien.findOne({ where: { email } });
            if (existingUser) {
                return { success: false, message: 'Email already exists' };
            }

            const hashedPassword = await bcrypt.hashSync(password, 10);
            await db.NhanVien.create({ email: email, matKhau: hashedPassword, tenNV: name, chucDanh: role });
        } else {
            // Lưu vào bảng KhachHang
            const existingUser = await db.KhachHang.findOne({ where: { email } });
            if (existingUser) {
                return { success: false, message: 'Email already exists' };
            }

            const hashedPassword = await bcrypt.hashSync(password, 10);
            await db.KhachHang.create({ email, matKhau: hashedPassword, tenKH: name });
        }

        return { success: true };
    } catch (error) {
        throw error; // Xử lý lỗi nếu có
    }
};

module.exports = {
    authenticateUser,
    registerUser
}