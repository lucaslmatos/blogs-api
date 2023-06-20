const category = require('../services/category.service');

const addCategory = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await category.addCategory(name);
  return res.status(type).json(message);
};

const getAllCategories = async (req, res) => {
  const { type, message } = await category.getAllCategories();
  return res.status(type).json(message);
};

module.exports = {
  addCategory,
  getAllCategories,
};