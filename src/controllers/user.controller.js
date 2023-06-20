const user = require('../services/user.service');

const addUser = async (req, res) => {
  const newUser = req.body;
  const { type, message } = await user.addUser(newUser);
  if (type === null) {
    return res.status(201).json(await message);
  } return res.status(type).json({ message });
};

const getAllUsers = async (req, res) => {
  const { type, message } = await user.getAllUsers();
  return res.status(type).json(message);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await user.getUserById(id);
  if (type === 200) {
    return res.status(200).json(message);
  } return res.status(type).json({ message });
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
};