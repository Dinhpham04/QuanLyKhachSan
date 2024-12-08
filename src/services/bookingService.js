import db from '../models/index';

let tinhTienPhong = (hinhThuc, tGNhan, tGTra, giaGio, giaNgay, giaDem) => {
    // Chuyển thời gian nhận và trả sang đối tượng Date
    const nhan = new Date(tGNhan);
    const tra = new Date(tGTra);
    // Tính tổng số giờ
    const totalHours = Math.abs((tra - nhan) / (1000 * 60 * 60)); // Tổng số giờ

    let tongTien = 0;

    // Thuê đêm (22h hôm trước - 11h hôm sau)
    const gioBatDauDem = 22;
    const gioKetThucDem = 11;

    // Thuê ngày (14h hôm trước - 12h hôm sau)
    const gioBatDauNgay = 14;
    const gioKetThucNgay = 12;

    // Lấy giờ nhận và giờ trả
    const gioNhan = nhan.getHours();
    const gioTra = tra.getHours();

    // Kiểm tra điều kiện thuê đêm
    if (
        hinhThuc == 'dem' &&
        gioNhan >= gioBatDauDem || // Nhận phòng sau 22h
        (gioNhan < gioKetThucDem && tra.getDate() > nhan.getDate()) // Qua ngày mới và trả phòng trước 11h
    ) {
        tongTien += giaDem * (tra.getDate() - nhan.getDate());
    }
    // Kiểm tra điều kiện thuê ngày
    else if (
        hinhThuc == 'ngay' &&
        gioNhan >= gioBatDauNgay &&
        (gioTra <= gioKetThucNgay || tra.getDate() > nhan.getDate())
    ) {
        tongTien += giaNgay * (tra.getDate() - nhan.getDate());
    }
    // Nếu không thỏa mãn thuê ngày hoặc đêm => Thuê giờ
    else {
        tongTien += totalHours * giaGio; // Giá theo giờ
    }

    return tongTien;
}

module.exports = {
    tinhTienPhong
}