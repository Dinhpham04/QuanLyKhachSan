import db from '../models/index';
import bookingService from '../services/bookingService';
exports.getAdminDatPhong = async (req, res) => {
    try {
        const datPhongList = await db.DatPhong.findAll({
            include: [
                {
                    model: db.Phong,
                    as: 'phong',
                    include: [
                        {
                            model: db.HangPhong,
                            as: 'hangPhong',
                        }
                    ]
                },
                {
                    model: db.KhachHang,
                    as: 'khachHang',
                }
            ],
            raw: false
        });



        const datPhongs = await Promise.all(datPhongList.map(async function (datPhong) {
            const Services = await db.HoaDonDichVu.findAll({
                include: [
                    {
                        model: db.KhachHang,
                        as: 'khachHang',
                        where: { id: datPhong.khachHang.id },
                    },
                    {
                        model: db.HangHoa,
                        as: 'hangHoa',
                    }
                ],
                raw: false,
            });
            let tongTienDV = 0;
            const services = Services.map(service => {
                tongTienDV += service.hangHoa.giaBan * service.soLuong;
                return {
                    maHangHoa: service.hangHoa.id,
                    tenHangHoa: service.hangHoa.tenHH,
                    donGia: service.hangHoa.giaBan,
                    soLuong: service.soLuong,
                    thanhTien: service.hangHoa.giaBan * service.soLuong
                }
            })

            let tongTienPhong = bookingService.tinhTienPhong(datPhong.hinhThuc, datPhong.tGTra, datPhong.tGNhan, datPhong.phong.hangPhong.giaGio, datPhong.phong.hangPhong.giaNgay, datPhong.phong.hangPhong.giaNgay);



            return {
                id: datPhong.id,
                tenPhong: datPhong.phong.tenPhong,
                tenKhachHang: datPhong.khachHang.tenKH,
                soCCCD: datPhong.khachHang.soCCCD,
                trangThai: datPhong.trangThai,
                hinhThuc: datPhong.hinhThuc,
                tGNhan: datPhong.tGNhan,
                tGTra: datPhong.tGTra,
                ghiChu: datPhong.ghiChu,
                tongTien: tongTienDV + tongTienPhong,
                daTT: datPhong.daTT,
                canTT: tongTienDV + tongTienPhong - datPhong.daTT,
                tongTienPhong,
                tongTienDV,
                services,
                maHangPhong: datPhong.phong.hangPhong.maHP,
                tenHangPhong: datPhong.phong.hangPhong.tenHP,
                donGia: datPhong.hinhThuc == 'gio' ? datPhong.phong.hangPhong.giaGio : datPhong.phong.hangPhong.giaNgay,
                thoiGianDat: new Date(datPhong.createdAt).toLocaleString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false, // Định dạng 24 giờ
                })
            };
        }));

        // res.json(datPhongs);
        res.render('admin/booking', { datPhongs });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn đặt phòng:', error);
        res.status(500).send('Lỗi khi lấy danh sách đơn đặt phòng');
    }
}

exports.cancelBooking = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL

        // Tìm đơn đặt phòng theo ID và cập nhật trạng thái
        const booking = await db.DatPhong.findOne({ where: { id }, raw: false });
        if (!booking) {
            return res.status(404).send('Đơn đặt phòng không tồn tại.');
        }

        booking.trangThai = 'huy';
        await booking.save();
        res.redirect('/admin-datphong'); // Điều hướng lại trang danh sách đơn đặt phòng
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi xảy ra.');
    }
};

exports.getBookingRoom = async (req, res) => {
    try {
        res.render('staff/room');
    } catch (error) {
        console.log(error);
        res.status(500).send('error: ' + error.message);
    }
}
