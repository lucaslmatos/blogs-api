const JWT = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const post = require('../services/post.service');

const addBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;
  const { uId } = JWT.verify(authorization, JWT_SECRET);
  const { type, message } = await post.addBlogPost({ title, content, categoryIds, uId });
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

const editBlogPostById = async (req, res) => {
  const { id } = req.params;
  const info = req.body;
  const { authorization } = req.headers;
  const { uId } = JWT.verify(authorization, JWT_SECRET);
  const { type, message } = await post.editBlogPostById(+id, uId, info);
  if (type === null) {
    return res.status(200).json(message);
  } return res.status(type).json({ message });
};

const deleteBlogPostById = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { uId } = JWT.verify(authorization, JWT_SECRET);
  const { type, message } = await post.deleteBlogPostById(+id, +uId);
  if (type === null) {
    return res.status(204).json();
  } return res.status(type).json({ message });
};

module.exports = {
  addBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  editBlogPostById,
  deleteBlogPostById,
};