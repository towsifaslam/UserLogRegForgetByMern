const express = require('express');
const seedRouter = express.Router()
const {seedGetAllUser,seedProducts} = require('../controllers/seedUser')

seedRouter.get('/users',seedGetAllUser)
seedRouter.get('/products',seedProducts)

module.exports = seedRouter; 