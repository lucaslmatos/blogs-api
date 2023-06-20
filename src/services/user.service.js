const { checkNewUser, checkJWT } = require('../middlewares/validations');
const { User } = require('../models');

const addUser = async ({ displayName, email, password, image = '' }) => {
  const newUserCheck = await checkNewUser(displayName, password, email);
  if (newUserCheck.type) { return newUserCheck; }
  await User.create({ displayName, email, password, image });
  const addedUser = await User.findOne({ where: { email } });
  const JWT = checkJWT({ id: addedUser.id });
  if (JWT.type) { return { type: JWT.type, message: JWT.message }; }
  return { type: null, message: JWT };
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { type: 200, message: users };
};

module.exports = {
  addUser,
  getAllUsers,
};