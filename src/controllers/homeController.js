
let getHomePage = (req, res) => {
    return res.render('homePage.ejs');
}

let getAboutMe = (req, res) => {
    return res.render('test/about.ejs');
}

module.exports = {
    getHomePage,
    getAboutMe
}