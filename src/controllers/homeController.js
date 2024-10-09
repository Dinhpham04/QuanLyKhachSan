import db from "../models/index";
import CRUDService from "../services/CRUDService";
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
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message); 
    res.send(message);
}

module.exports = {
    getHomePage,
    getAboutMe,
    getCRUD, 
    postCRUD,
}