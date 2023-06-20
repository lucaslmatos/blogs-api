const { BlogPost } = require('../models');
const { addPostCategory } = require('./post.category.service');

const addBlogPost = async ({ title, content, categoryIds }) => {
  if (!title || !content || !categoryIds) {
    return { type: 400, message: 'Some required fields are missing' };
  }
  const newBlogPost = await BlogPost.create({ 
    title, content, userId: 1, published: new Date(), updated: new Date() });
    (await Promise.all(categoryIds.map(async (e) => { 
      await addPostCategory(newBlogPost.id, e);
    })));
    return { type: null, message: newBlogPost };
};

module.exports = {
  addBlogPost,
};