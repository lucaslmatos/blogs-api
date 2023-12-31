const { checkUser, checkJWT } = require('../middlewares/validations');

const checkLogin = async (email, password) => {
  const check = await checkUser(email, password);
  if (check.type) { return check; }
  console.log(check.user);
  const JWT = checkJWT({ uId: check.user.id });
  if (JWT.type) { return { type: JWT.type, message: JWT.message }; }
  return { type: null, message: JWT };
};

module.exports = {
  checkLogin,
};