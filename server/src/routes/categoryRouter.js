const express = require('express')
const {handelCreateCategory} = require('../controllers/categoryController');
const { validatoreCategory } = require('../middleWare/categroy');
const runValidation = require('../middleWare');
const { isLoggedIn, isAdminn } = require('../middleWare/authLogin');

const categoryRouter = express.Router();
categoryRouter.post('/',validatoreCategory,runValidation,isLoggedIn,isAdminn,handelCreateCategory)
module.exports = categoryRouter