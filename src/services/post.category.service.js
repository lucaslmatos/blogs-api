const { PostCategory } = require('../models');

const addPostCategory = async (postId, categoryId) => {
  await PostCategory.create({ postId, categoryId });
};

module.exports = {
  addPostCategory,
};