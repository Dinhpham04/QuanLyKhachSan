import express from "express";
import path from "path";
import bodyParser from "body-parser";  // body-parser dùng để biên dịch các phiên bản code js khác nhau 
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB"; // connect và check xem đã kết nối được với database chưa 
const nodeSassMiddleware = require('node-sass-middleware');
const session = require('express-session');
require('dotenv').config(); // dùng để chạy câu lệnh process.env.PORT 
const cors = require('cors');
let app = express(); // instance of express
app.use(cors({
    origin: 'http://localhost:3000', // Chỉ định cụ thể origin
    credentials: true // Cho phép gửi cookie
}));
// config app 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);  // config view engine 
// Cấu hình để sử dụng session 
app.use(session({
    secret: 'my-secret-key', // Dùng để mã hóa session ID (nên dùng một chuỗi dài và bảo mật)
    resave: false,             // Không lưu lại session nếu không có sự thay đổi
    saveUninitialized: true,   // Lưu session khi chưa có dữ liệu gì
    cookie: { secure: false }  // Set cookie cho session. Nếu dùng HTTPS, set secure: true
}));

initWebRoutes(app); // khởi tạo các router

connectDB(); // kết nối với database


app.use(
    nodeSassMiddleware({
        src: path.join(__dirname, 'scss'), // Thư mục chứa SCSS
        dest: path.join(__dirname, 'public/css'), // Thư mục chứa CSS biên dịch
        indentedSyntax: false,  // SCSS (false cho SASS)
        sourceMap: true,  // Tạo source map
        debug: true,  // Ghi log debug để dễ kiểm tra lỗi
        prefix: '/css', // URL prefix cho CSS (trong trình duyệt sẽ là /css/style.css)
    })
);

// Cấu hình static để sử dụng CSS
app.use(express.static(path.join(__dirname, 'public')));

let port = process.env.PORT || 6969; // Xác định port app chạy 
// PORT === undefined => port = 6969; 
app.listen(port, () => {
    // callback
    console.log("Website is running on the port : " + port);
})