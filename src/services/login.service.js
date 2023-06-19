const { checkUser, checkJWT } = require('../middlewares/validations');

const checkLogin = async (email, password) => {
  const check = await checkUser(email, password);
  if (check.type) { return check; }
  const JWT = checkJWT({ id: check.id });
  if (JWT.type) { return { type: JWT.type, message: JWT.message }; }
  return { type: null, message: JWT };
};

module.exports = {
  checkLogin,
};