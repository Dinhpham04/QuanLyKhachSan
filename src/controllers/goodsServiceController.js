import db from '../models/index'

exports.getDanhSachHangHoa = async (req, res) => {
    try {
        const danhSachHangHoa = await db.HangHoa.findAll();

        res.render('admin/goodsService', {
            hangHoas: danhSachHangHoa,
        });
    } catch (error) {
        console.error('Error fetching danh sách hàng hóa:', error);
        res.status(500).send('Lỗi khi lấy danh sách hàng hóa');
    }
};

exports.createHangHoa = async (req, res) => {
    const { tenHangHoa, giaBan, giaVon, tonKho, hinhAnh } = req.body;
    try {
        await db.HangHoa.create({
            tenHH: tenHangHoa,
            giaBan,
            giaVon,
            tonKho,
            anh: hinhAnh,
        });
        res.redirect('/hanghoa');
    } catch (error) {
        console.error('Error creating hangHoa:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi thêm mới hàng hóa' });
    }
};

exports.updateHangHoa = async (req, res) => {
    const { id } = req.params;
    const { tenHangHoa, giaBan, giaVon, tonKho, hinhAnh } = req.body;
    try {
        const hangHoa = await db.HangHoa.findOne({ where: { id }, raw: false });
        if (!hangHoa) {
            return res.status(404).json({ success: false, message: 'Hàng hóa không tồn tại' });
        }
        await hangHoa.update({ tenHH: tenHangHoa, giaBan, giaVon, tonKho, anh: hinhAnh });
        res.redirect('/hanghoa');
    } catch (error) {
        console.error('Error updating hangHoa:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi cập nhật hàng hóa' });
    }
};



exports.getHangHoaById = async (req, res) => {
    try {
        const id = req.params.id;
        const hangHoa = await db.HangHoa.findByPk(id);
        if (!hangHoa) {
            return res.status(404).send('Hạng phòng không tồn tại');
        }
        res.json(hangHoa); // Trả về thông tin dưới dạng JSON
    } catch (error) {
        console.error('Error fetching hàng hóa:', error);
        res.status(500).send('Internal Server Error');
    }
}


exports.deleteHangHoa = async (req, res) => {
    const { id } = req.params;
    try {
        const hangHoa = await db.HangHoa.destroy({ where: { id } });
        res.redirect('/hanghoa');
    } catch (error) {
        console.error('Error deleting hangHoa:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi xóa hàng hóa' });
    }
};