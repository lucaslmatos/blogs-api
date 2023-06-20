const { Category } = require('../models');

const addCategory = async (name) => {
  await Category.create({ name });
  const newCategory = await Category.findOne({ where: { name } });
  return { type: 201, message: newCategory };
};

// const getAllUsers = async () => {
//   const users = await User.findAll({ attributes: { exclude: ['password'] } });
//   return { type: 200, message: users };
// };

// const getUserById = async (id) => {
//   const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
//   console.log(user);
//   if (user === null) {
//     return { type: 404, message: 'User does not exist' };
//   }
//   return { type: 200, message: user };
// };

module.exports = {
  addCategory,
};