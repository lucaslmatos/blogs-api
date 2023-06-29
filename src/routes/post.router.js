const express = require('express');
const post = require('../controllers/post.controller');
const validation = require('../middlewares/validations');

const routers = express.Router();

routers.post('/', validation.validateToken, validation.validateCategoryIds, post.addBlogPost);
routers.get('/', validation.validateToken, post.getAllBlogPosts);
routers.get('/search', validation.validateToken, post.searchPosts);
routers.get('/:id', validation.validateToken, post.getBlogPostById);
routers.put('/:id', validation.validateToken, post.editBlogPostById);
routers.delete('/:id', validation.validateToken, post.deleteBlogPostById);

module.exports = routers;