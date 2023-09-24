const express = require('express');
const seedRouter = express.Router()
const {seedGetAllUser} = require('../controllers/seedUser')

seedRouter.get('/',seedGetAllUser)

module.exports = seedRouter;