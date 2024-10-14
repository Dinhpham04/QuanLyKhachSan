import userService from '../services/userService'
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;



    // return userInfor 
    // access token jwt 

    // check email exist 
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'email or password is empty!'
        })
    }
    // compare password 
    let userData = await userService.handleUserLogin(email, password);
    res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let userId = req.query.id; // ALL, id 
    if (!userId) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'id missing',
            users: []
        })
    }
    let users = await userService.getAllUsers(userId);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users: users
    })
}


module.exports = {
    handleLogin,
    handleGetAllUsers
}