const express = require('express');
const category = require('../controllers/category.controller');
const validation = require('../middlewares/validations');

const routers = express.Router();

routers.post('/', validation.validateToken, validation.checkCategoryName, category.addCategory);
routers.get('/', validation.validateToken, category.getAllCategories);

module.exports = routers;