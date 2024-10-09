import db from "../models/index";
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

module.exports = {
    getHomePage,
    getAboutMe
}