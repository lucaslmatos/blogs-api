const login = require('../services/login.service');

const loginPost = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await login.checkLogin(email, password);
  if (type === null) {
    return res.status(200).json(await message);
  } return res.status(type).json({ message });
};

module.exports = {
  loginPost,
};