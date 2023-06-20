const { Category } = require('../models');

const addCategory = async (name) => {
  await Category.create({ name });
  const newCategory = await Category.findOne({ where: { name } });
  return { type: 201, message: newCategory };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return { type: 200, message: categories };
};

module.exports = {
  addCategory,
  getAllCategories,
};