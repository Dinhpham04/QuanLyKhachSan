import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
require('dotenv').config(); // dùng để chạy câu lệnh process.env.PORT 

let app = express(); // instance of express

// config app 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB(); // kết nối với database

let port = process.env.PORT || 6969;
// PORT === undefined => port = 6969; 
app.listen(port, () => {
    // callback
    console.log("backend nodejs is running on the port : " + port);
})