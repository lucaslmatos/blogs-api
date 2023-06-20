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

const checkNewUser = async (displayName = '', password = '', email = '') => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-_]+\.[A-Za-z]{2,}$/;
  const user = await User.findOne({ where: { email } });
  if (displayName.length <= 7) {
    return { type: 400, message: '"displayName" length must be at least 8 characters long' };
  }
  if (password.length <= 5) {
    return { type: 400, message: '"password" length must be at least 6 characters long' };
  }
  if (!regex.test(email)) { 
    return { type: 400, message: '"email" must be a valid email' }; 
  }
  if (user !== null) { 
    return { type: 409, message: 'User already registered' }; 
  }
  return { type: null };
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    JWT.verify(authorization, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  checkUser,
  checkJWT,
  checkNewUser,
  validateToken,
};