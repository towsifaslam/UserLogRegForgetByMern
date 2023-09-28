const express = require('express');
const upload = require('../middleWare/uploadFile');
const runValidation = require('../middleWare/index');
const { handelCreateCategory } = require('../controllers/categoryController');
const productRouter = express.Router();

productRouter.post('/',upload.single('image'),handelCreateCategory)

module.exports = productRouter;