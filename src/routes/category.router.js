const express = require('express');
const category = require('../controllers/category.controller');
const validation = require('../middlewares/validations');

const routers = express.Router();

routers.post('/', validation.checkCategoryName, category.addCategory);

module.exports = routers;