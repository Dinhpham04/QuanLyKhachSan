import db from '../models/index';
import bcrypt from 'bcryptjs';
let handleUserLogin = async (email, password) => {
    try {
        let userData = {};
        let isExist = await checkUserEmail(email);
        if (isExist) { // email tồn tại => lấy password để so sánh 
            // compare password 
            let user = await db.User.findOne({
                where: {
                    email: email
                },
                raw: true,
                attributes: ['email', 'roleId', 'password']
            });
            if (user) {
                let check = await bcrypt.compareSync(password, user.password);
                if (check) {
                    userData.errCode = 0;
                    userData.errMessage = 'Login successful';
                    const { password, ...userInfo } = user
                    userData.user = userInfo;
                } else {
                    userData.errCode = 3;
                    userData.errMessage = 'Password is incorrect';
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your email isn't exist in your system. please try other email`
            }
        } else {
            userData.errCode = 1;
            userData.errMessage = `Your email isn't exist in your system. please try other email`
        }
        return userData;
    } catch (error) {
        throw error;
    }
}

let checkUserEmail = async (userEmail) => {
    try {
        let user = await db.User.findOne(
            {
                where: {
                    email: userEmail
                }
            }
        )
        if (user) {
            return true;
        } return false;
    } catch (error) {
        throw error;
    }
}

let getAllUsers = async (userId) => {
    try {
        console.log(userId);
        let users = '';
        if (userId === 'ALL') {
            users = await db.User.findAll({
                attributes: { exclude: ['password'] },
            });
        } else if (userId) {
            users = await db.User.findOne({
                where: {
                    id: userId
                },
                attributes: { exclude: ['password'] },
            });
        };
        return users;
    } catch (e) {
        throw e
    }
}



module.exports = {
    handleUserLogin,
    checkUserEmail,
    getAllUsers,
}