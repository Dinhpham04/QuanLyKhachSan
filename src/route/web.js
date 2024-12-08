import express from "express";
import layoutMiddleware from '../middlewares/layout';  // Import middleware
import authController from "../controllers/authController";
import roomController from "../controllers/roomController";
import goodsServiceController from "../controllers/goodsServiceController";
import bookingController from "../controllers/bookingController";
import usersController from "../controllers/usersController";
let router = express.Router();
router.use(layoutMiddleware);
let initWebRoutes = (app) => {  // khởi tạo các router 
    // login 
    router.get('/login', authController.getLoginPage);
    router.post('/login', authController.postLogin);
    // register 
    // Route hiển thị form đăng ký
    router.get('/register', authController.getRegisterPage);
    // Route xử lý đăng ký
    router.post('/register', authController.postRegister);

    // room-category
    router.get('/hangphong', roomController.getHangPhong);
    router.post('/hangphong/:id/delete', roomController.deleteHangPhong);
    // Lấy thông tin hạng phòng theo ID
    router.get('/hangphong/:id', roomController.getHangPhongById);
    // Cập nhật hạng phòng
    router.post('/hangphong/:id/update', roomController.updateHangPhong);
    router.post('/hangphong/create', roomController.createHangPhong);
    // room 
    router.get('/phong', roomController.getPhong);
    router.post('/phong/:id/delete', roomController.deletePhong);
    // Lấy thông tin hạng phòng theo ID
    router.get('/phong/:id', roomController.getPhongById);
    router.post('/phong/:id/update', roomController.updatePhong);
    router.post('/phong/create', roomController.createPhong);
    // rest api 
    router.get('/hanghoa/:id', goodsServiceController.getHangHoaById);
    router.get('/hanghoa', goodsServiceController.getDanhSachHangHoa);
    router.post('/hanghoa/create', goodsServiceController.createHangHoa);
    router.post('/hanghoa/:id/update', goodsServiceController.updateHangHoa);
    router.post('/hanghoa/:id/delete', goodsServiceController.deleteHangHoa);

    router.get('/admin-datphong', bookingController.getAdminDatPhong)
    router.post('/cancel-datphong/:id', bookingController.cancelBooking);

    router.get('/nhanvien', usersController.getDanhSachNhanVien);
    router.post('/nhanvien/create', usersController.createNhanVien)
    router.post('/nhanvien/:id/delete', usersController.deleteNhanVien);
    router.get('/nhanvien/:id', usersController.getNhanVienById);
    router.post('/nhanvien/:id/update', usersController.updateNhanVien);
    router.get('/lichlamviec', usersController.getCalamviec);
    router.get('/calamvieckhadung', usersController.getCaLamViecByUserId);
    router.post('/lichlamviec/create', usersController.createLichLamViec);
    router.post('/lichlamviec/:id/delete', usersController.deleteLichLamViec);
    router.get('/staff-room', bookingController.getBookingRoom);
    return app.use("/", router);
}

module.exports = initWebRoutes;