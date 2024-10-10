import db from "../models/index"; // Lấy database 
import CRUDService from "../services/CRUDService"; // service là nơi đẩy dữ liệu vào để xử lý dữ liệu
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll(); // lấy bảng user 
        res.render('homePage.ejs', {
             data: JSON.stringify(data),
         }); // truyền data vào view
    } catch (error) {
        console.log(error);
    }
}

let getAboutMe = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = async (req, res) => {
    return res.render('crud.ejs') // render ra giạo diện crud bằng cách chạy file crud.ejs 
}

let postCRUD = async (req, res) => { // đẩy dữ liệu vào service để sử lý 
    let message = await CRUDService.createNewUser(req.body);
    console.log(message); 
    res.send(message);
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers(); 
    res.render('displayCRUD.ejs', {
        dataTable: data,
    }); 
}

module.exports = {
    getHomePage,
    getAboutMe,
    getCRUD, 
    postCRUD,
    displayGetCRUD,
}