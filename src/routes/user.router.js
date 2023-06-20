const express = require('express');
const user = require('../controllers/user.controller');
const validation = require('../middlewares/validations');

const routers = express.Router();

routers.post('/', user.addUser);
routers.get('/', validation.validateToken, user.getAllUsers);

module.exports = routers;