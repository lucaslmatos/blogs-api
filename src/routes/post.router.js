const express = require('express');
const post = require('../controllers/post.controller');
const validation = require('../middlewares/validations');

const routers = express.Router();

routers.post('/', validation.validateToken, validation.validateCategoryIds, post.addBlogPost);
routers.get('/', validation.validateToken, post.getAllBlogPosts);

module.exports = routers;