import db from '../models/index';
import bcrypt from 'bcryptjs';
import userService from '../services/userService';
import { Op } from 'sequelize';
import Sequelize from 'sequelize';
const getDanhSachNhanVien = async (req, res) => {
    try {
        // Lấy danh sách nhân viên từ database
        const nhanViens = await db.NhanVien.findAll();

        // res.json(danhSachNhanVien);
        res.render('admin/staff', { nhanViens, error: null });
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi xảy ra khi lấy danh sách nhân viên.');
    }
};


let createNhanVien = async (req, res) => {
    try {
        const { tenNhanVien, soDienThoai, hinhAnh, gioiTinh, soCCCD, ngaySinh, email, matKhau } = req.body;
        const existingUser = await db.NhanVien.findOne({ where: { email } });
        if (existingUser) {
            const nhanViens = await db.NhanVien.findAll();
            res.render('admin/staff', { nhanViens, error: { message: 'Email đã tồn tại vui lòng nhập email khác' } })
        } else {
            const hashedPassword = await bcrypt.hashSync(matKhau, 10);
            const nhanvien = await db.NhanVien.create({
                email: email,
                matKhau: hashedPassword,
                tenNV: tenNhanVien,
                chucDanh: 'nhanvien',
                soDT: soDienThoai,
                anh: hinhAnh,
                soCCCD: soCCCD,
                ngaySinh: ngaySinh,
                gioiTinh: gioiTinh
            });

            await nhanvien.update({ maCC: "CC0" + nhanvien.id });
            res.redirect('/nhanvien'); // Chuyển hướng về trang danh sách hạng phòng
        }


    } catch (error) {
        console.error('Error creating HangPhong:', error);
        res.status(500).send('Internal Server Error');
    }
};

let deleteNhanVien = async (req, res) => {
    try {
        const id = req.params.id;
        await db.NhanVien.destroy({ where: { id } });
        res.redirect('/nhanvien');
    } catch (error) {
        console.error('Error deleting HangPhong:', error);
        res.status(500).send('Internal Server Error');
    }
}

let getNhanVienById = async (req, res) => {
    try {
        const id = req.params.id;
        const nhanvien = await db.NhanVien.findByPk(id);

        res.json(nhanvien);
    } catch (error) {
        console.error('Error fetching nhanvien:', error);
        res.status(500).send('Internal Server Error');
    }

}


let updateNhanVien = async (req, res) => {
    try {
        const id = req.params.id;
        const { tenNhanVien, soDienThoai, hinhAnh, gioiTinh, soCCCD, ngaySinh, matKhau } = req.body;
        const nhanvien = await db.NhanVien.findOne({ where: { id }, raw: false });
        const hashedPassword = await bcrypt.hashSync(matKhau, 10);
        nhanvien.update({
            matKhau: hashedPassword,
            tenNV: tenNhanVien,
            soDT: soDienThoai,
            anh: hinhAnh,
            soCCCD: soCCCD,
            ngaySinh: ngaySinh,
            gioiTinh: gioiTinh
        });
        res.redirect('/nhanvien');

    } catch (error) {
        console.error('Error update nhân viên:', error);
        res.status(500).send('Internal Server Error');
    }
};

let getCalamviec = async (req, res) => {
    try {
        const week = req.query.week || 0;
        const employees = await db.NhanVien.findAll();
        const shifts = await db.CaLamViec.findAll();
        const schedule = await db.LichLamViec.findAll({
            include: [
                { model: db.NhanVien, as: 'nhanVien' },
                { model: db.CaLamViec, as: 'caLamViec' }
            ],
            raw: false
        });
        const formattedSchedule = schedule.map((entry) => ({
            maLichLV: entry.id,
            maNhanVien: entry.maNhanVien,
            ngayLamViec: entry.thoiGian,
            tenCa: entry.caLamViec.tenCaLV,
        }));

        let date = new Date();
        let currentDate = new Date();
        if (week) {
            currentDate.setDate(currentDate.getDate() + parseInt(week) * 7);
        }
        const weekDates = userService.getWeekDates(currentDate);

        res.render('admin/schedule1', {
            employees,
            shifts,
            schedule: formattedSchedule,
            days: weekDates,
            currentMonth: currentDate.getMonth() + 1,
            currentYear: currentDate.getFullYear(),
        });


    } catch (error) {
        console.error('Error update nhân viên:', error);
        res.status(500).send('Internal Server Error');
    }
}

let getCaLamViecByUserId = async (req, res) => {
    const { employeeId, date } = req.query;
    try {
        // Lấy tất cả ca làm việc
        const allShifts = await db.CaLamViec.findAll();
        // Lấy các ca làm việc đã có của nhân viên cho ngày đó
        const assignedShifts = await db.LichLamViec.findAll({

            where: {
                maNhanVien: employeeId,
                [Sequelize.Op.and]: Sequelize.where(
                    Sequelize.fn('DATE', Sequelize.col('thoiGian')),
                    date
                )
            },
            attributes: ['maCaLamViec']
        });


        // Lọc các ca chưa được sử dụng
        const assignedShiftIds = assignedShifts.map(s => s.maCaLamViec);
        const availableShifts = allShifts.filter(
            shift => !assignedShiftIds.includes(shift.id)
        );

        res.status(200).json(availableShifts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi lấy danh sách ca làm việc khả dụng');
    }
}

let createLichLamViec = async (req, res) => {

    try {
        const { employeeId, shift, date, note, week } = req.body;
        if (!shift) {
            res.redirect(`/lichlamviec?week=${week}`);
        } else {
            await db.LichLamViec.create({
                maNhanVien: employeeId,
                maCaLamViec: shift,
                thoiGian: new Date(date),
                ghiChu: note
            })
            res.redirect(`/lichlamviec?week=${week}`);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi lấy danh sách ca làm việc khả dụng');
    }
}

let deleteLichLamViec = async (req, res) => {
    try {
        const { id } = req.params;
        const { week } = req.body;
        await db.LichLamViec.destroy({ where: { id } });
        res.redirect(`/lichlamviec?week=${week}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('lỗi xảy ra khi xóa lịch làm việc');
    }
}


module.exports = {
    getDanhSachNhanVien,
    createNhanVien,
    deleteNhanVien,
    getNhanVienById,
    updateNhanVien,
    getCalamviec,
    getCaLamViecByUserId,
    createLichLamViec,
    deleteLichLamViec
}