const express = require('express');


const { getUsers,getUserById,handleUpdatePassword,handleForgetPass, deleteUserId,handleBanUserById,updateUser,activateUserAccount, proccessRegister, handleUnBanUserById } = require('../controllers/userController');
const upload = require('../middleWare/uploadFile');
const userRouter = express.Router();
const {valildationUserRegistration,UserPasswordValidatorUser} = require('../middleWare/auth');
const runValidation = require('../middleWare');
const { isLoggedIn, isLoggedOut, isAdminn } = require('../middleWare/authLogin');
 userRouter.get('/',isLoggedIn,isAdminn,getUsers)
userRouter.get('/:id',isLoggedIn,getUserById)
userRouter.delete('/:id',isLoggedIn,isAdminn,deleteUserId)
userRouter.post('/procces-register',isLoggedOut,upload.single('image'),valildationUserRegistration,runValidation,proccessRegister)
userRouter.post('/verify',isLoggedOut,activateUserAccount)
userRouter.put('/:id',isLoggedIn,updateUser)
userRouter.put('/ban_user/:id',isLoggedIn,isAdminn,handleBanUserById)
userRouter.put('/unban_user/:id',isLoggedIn,isAdminn,handleUnBanUserById)
userRouter.put('/update_password/:id',isLoggedIn,handleUpdatePassword)
userRouter.post('/forget_password',handleForgetPass)

module.exports = userRouter