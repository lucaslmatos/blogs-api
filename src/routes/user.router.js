const express = require('express');
const user = require('../controllers/user.controller');
const validation = require('../middlewares/validations');

const routers = express.Router();

routers.post('/', user.addUser);
routers.get('/', validation.validateToken, user.getAllUsers);
routers.get('/:id', validation.validateToken, user.getUserById);
routers.delete('/me', validation.validateToken, user.deleteUser);

module.exports = routers;