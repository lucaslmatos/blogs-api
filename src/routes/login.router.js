const express = require('express');
const login = require('../controllers/login.controller');

const routers = express.Router();

routers.post('/', login.loginPost);

module.exports = routers;