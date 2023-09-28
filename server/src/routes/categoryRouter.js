const express = require('express')
const {handelCreateCategory,handleGetCategory,handleDeletedCategory,handleGetCtegories,handleUpdateCategoyr} = require('../controllers/categoryController');
const { validatoreCategory, } = require('../middleWare/categroy');
const runValidation = require('../middleWare');
const { isLoggedIn, isAdminn } = require('../middleWare/authLogin');

const categoryRouter = express.Router();
categoryRouter.post('/',validatoreCategory,runValidation,isLoggedIn,isAdminn,handelCreateCategory)
categoryRouter.get('/',handleGetCtegories)
categoryRouter.get('/:slug',handleGetCategory)
categoryRouter.put('/:slug',validatoreCategory,runValidation,isLoggedIn,isAdminn,handleUpdateCategoyr)
categoryRouter.delete('/:slug',isLoggedIn,isAdminn,handleDeletedCategory)
module.exports = categoryRouter