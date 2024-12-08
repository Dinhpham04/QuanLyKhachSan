import db from '../models/index';


function getWeekDates(date) {
    const weekDates = [];
    const currentDay = date.getDay(); // 0 = Chủ Nhật, 1 = Thứ 2, ..., 6 = Thứ 7
    const firstDayOfWeek = new Date(date);
    // Điều chỉnh firstDayOfWeek cho Thứ 2
    firstDayOfWeek.setDate(date.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    const days = ['Chủ Nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    for (let i = 1; i < 7; i++) {
        // Tạo bản sao của firstDayOfWeek để tránh thay đổi original
        const day = new Date(firstDayOfWeek.getTime());
        day.setDate(firstDayOfWeek.getDate() + i - 1);

        weekDates.push({
            day: days[i],
            fullDate: day.toISOString().split('T')[0], // Định dạng YYYY-MM-DD
        });
    }
    const day = new Date(firstDayOfWeek.getTime());
    day.setDate(firstDayOfWeek.getDate() + 6);

    weekDates.push({
        day: days[0],
        fullDate: day.toISOString().split('T')[0], // Định dạng YYYY-MM-DD
    });


    return weekDates;
}


module.exports = {
    getWeekDates,
}