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

// const getUserById = async (req, res) => {
//   const { id } = req.params;
//   const { type, message } = await user.getUserById(id);
//   if (type === 200) {
//     return res.status(200).json(message);
//   } return res.status(type).json({ message });
// };

module.exports = {
  addCategory,
  getAllCategories,
};