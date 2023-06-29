const post = require('../services/post.service');

const addBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { type, message } = await post.addBlogPost({ title, content, categoryIds });
  if (type === null) {
    return res.status(201).json(await message);
  } return res.status(type).json({ message });
};

const getAllBlogPosts = async (req, res) => {
  const { type, message } = await post.getAllBlogPosts();
  return res.status(type || 200).json(message);
};

const getBlogPostById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await post.getBlogPostById(id);
  if (type === null) {
    return res.status(200).json(message);
  } return res.status(type).json({ message });
};

module.exports = {
  addBlogPost,
  getAllBlogPosts,
  getBlogPostById,
};