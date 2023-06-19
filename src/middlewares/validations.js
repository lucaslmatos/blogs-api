const JWT = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const checkUser = async (email, pas) => {
  if (!email || !pas) {
    return { type: 400, message: 'Some required fields are missing' };
  }
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== pas) {
    return { type: 400, message: 'Invalid fields' };
  } 
  return { user };
};

const checkJWT = async (payload) => {
  const token = JWT.sign(payload, JWT_SECRET, { expiresIn: '15m' });
  try {
    JWT.verify(token, JWT_SECRET); return { token };
  } catch (error) {
    return { type: 403, message: 'invalid Token' };
  }
};

module.exports = {
  checkUser,
  checkJWT,
};