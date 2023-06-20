const express = require('express');
const user = require('../controllers/user.controller');

const routers = express.Router();

routers.post('/', user.addUser);

module.exports = routers;