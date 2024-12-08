import db from '../models/index';
let getHangPhong = async (req, res) => {
    try {
        const hangPhongs = await db.HangPhong.findAll(); // Lấy danh sách hạng phòng từ cơ sở dữ liệu
        res.render('admin/roomClass', { hangPhongs }); // Render view và truyền dữ liệu
    } catch (error) {
        console.error('Error fetching HangPhong:', error);
        res.status(500).send('Internal Server Error');
    }
}

let deleteHangPhong = async (req, res) => {
    try {
        const id = req.params.id; // Lấy ID từ URL
        await db.HangPhong.destroy({ where: { id } }); // Xóa hạng phòng theo ID
        res.redirect('/hangphong'); // Chuyển hướng về trang danh sách
    } catch (error) {
        console.error('Error deleting HangPhong:', error);
        res.status(500).send('Internal Server Error');
    }
}


let getHangPhongById = async (req, res) => {
    try {
        const id = req.params.id;
        const hangPhong = await db.HangPhong.findByPk(id);
        if (!hangPhong) {
            return res.status(404).send('Hạng phòng không tồn tại');
        }
        res.json(hangPhong); // Trả về thông tin dưới dạng JSON
    } catch (error) {
        console.error('Error fetching HangPhong:', error);
        res.status(500).send('Internal Server Error');
    }
}

let updateHangPhong = async (req, res) => {
    try {
        const id = req.params.id;
        const { maHangPhong, tenHangPhong, giaGio, giaNgay, giaDem, hinhAnh } = req.body;

        const hangPhong = await db.HangPhong.findOne({
            where: { id },
            raw: false,
        })
        if (!hangPhong) {
            return res.status(404).send('Hạng phòng không tồn tại');
        }
        // Cập nhật thông tin
        await hangPhong.update({ maHP: maHangPhong, tenHP: tenHangPhong, giaGio, giaNgay, giaDem, anh: hinhAnh });

        res.redirect('/hangphong'); // Chuyển hướng về trang danh sách
    } catch (error) {
        console.error('Error updating HangPhong:', error);
        res.status(500).send('Internal Server Error');
    }
}

let createHangPhong = async (req, res) => {
    try {
        const { maHangPhong, tenHangPhong, giaGio, giaNgay, giaDem, hinhAnh } = req.body;

        // Tạo mới hạng phòng
        await db.HangPhong.create({
            maHP: maHangPhong,
            tenHP: tenHangPhong,
            giaGio,
            giaNgay,
            giaDem,
            anh: hinhAnh
        });

        res.redirect('/hangphong'); // Chuyển hướng về trang danh sách hạng phòng
    } catch (error) {
        console.error('Error creating HangPhong:', error);
        res.status(500).send('Internal Server Error');
    }
};





let getPhong = async (req, res) => {
    try {
        const phonglists = await db.Phong.findAll({
            attributes: ['tenPhong', 'id'], // Chỉ lấy tên phòng
            include: [
                {
                    model: db.HangPhong,
                    attributes: ['id', 'tenHP', 'giaGio', 'giaNgay', 'giaDem'],
                    as: 'hangPhong',
                },
                {
                    model: db.Anh,
                    attributes: ['url'], // Lấy URL hình ảnh
                    as: 'anhs'
                }
            ],
            raw: false,
        }); // Lấy danh sách hạng phòng từ cơ sở dữ liệu
        const phongs = phonglists.map(phonglist => {
            return {
                id: phonglist.id,
                tenPhong: phonglist.tenPhong,
                hangPhong: phonglist.hangPhong.tenHP,
                giaGio: phonglist.hangPhong.giaGio,
                giaNgay: phonglist.hangPhong.giaNgay,
                giaDem: phonglist.hangPhong.giaDem,
                anhs: phonglist.anhs[0].url,
            }
        })


        const hangPhongList = await db.HangPhong.findAll({
            attributes: ['id', 'tenHP']
        });

        res.render('admin/room', { phongs, hangPhongList }); // Render view và truyền dữ liệu
    } catch (error) {
        console.error('Error fetching Phong:', error);
        res.status(500).send('Internal Server Error');
    }
}

let deletePhong = async (req, res) => {
    try {
        const id = req.params.id; // Lấy ID từ URL
        await db.Phong.destroy({ where: { id } }); // Xóa hạng phòng theo ID
        res.redirect('/phong'); // Chuyển hướng về trang danh sách
    } catch (error) {
        console.error('Error deleting Phong:', error);
        res.status(500).send('Internal Server Error');
    }
}


let getPhongById = async (req, res) => {
    try {
        const id = req.params.id;
        const phongInfo = await db.Phong.findOne({
            where: { id },
            attributes: ['tenPhong', 'id'], // Chỉ lấy tên phòng
            include: [
                {
                    model: db.HangPhong,
                    attributes: ['id', 'tenHP', 'giaGio', 'giaNgay', 'giaDem'],
                    as: 'hangPhong',
                },
                {
                    model: db.Anh,
                    attributes: ['url'], // Lấy URL hình ảnh
                    as: 'anhs'
                }
            ],
            raw: false,
        }); // Lấy danh sách hạng phòng từ cơ sở dữ liệu
        const phong = {
            id: phongInfo.id,
            tenPhong: phongInfo.tenPhong,
            hangPhongId: phongInfo.hangPhong.id,
            anhs: phongInfo.anhs[0].url,
        }
        if (!phong) {
            return res.status(404).send('phòng không tồn tại');
        }
        res.json(phong); // Trả về thông tin dưới dạng JSON
    } catch (error) {
        console.error('Error fetching phong:', error);
        res.status(500).send('Internal Server Error');
    }
}

let updatePhong = async (req, res) => {
    try {
        const id = req.params.id;
        const { tenPhong, hangPhongId, hinhAnh } = req.body;
        const phong = await db.Phong.findOne({
            where: { id },
            raw: false,
        })
        if (!phong) {
            return res.status(404).send('Phòng không tồn tại');
        }

        // Cập nhật thông tin
        await phong.update({ tenPhong, maHangPhong: hangPhongId });
        const anh = await db.Anh.findOne({
            where: { maPhong: phong.id }, raw: false,
        })
        await anh.update({ url: hinhAnh });
        res.redirect('/phong'); // Chuyển hướng về trang danh sách
    } catch (error) {
        console.error('Error updating HangPhong:', error);
        res.status(500).send('Internal Server Error');
    }
}

let createPhong = async (req, res) => {
    const { tenPhong, hangPhongId, hinhAnh } = req.body;
    try {
        const phong = await db.Phong.create({
            tenPhong,
            maHangPhong: hangPhongId,
        });

        await db.Anh.create({
            maPhong: phong.id,
            url: hinhAnh,
        })

        // Quay lại trang danh sách phòng
        res.redirect('/phong');
    } catch (error) {
        console.error('Error adding phong:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getHangPhong,
    deleteHangPhong,
    getHangPhongById,
    updateHangPhong,
    createHangPhong,

    getPhong,
    deletePhong,
    getPhongById,
    updatePhong,
    createPhong,
}