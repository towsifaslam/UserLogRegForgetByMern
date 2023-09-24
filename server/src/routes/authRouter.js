const express = require('express');
const { userLoging,userLogout } = require('../controllers/authController');
const { isLoggedOut, isLoggedIn } = require('../middleWare/authLogin');
const { ValidatorUser } = require('../middleWare/auth');
const runValidation = require('../middleWare');
const authRouters = express.Router()


authRouters.post('/login',ValidatorUser,runValidation,isLoggedOut,userLoging)
authRouters.post('/logOut',isLoggedIn,userLogout)


module.exports = authRouters;