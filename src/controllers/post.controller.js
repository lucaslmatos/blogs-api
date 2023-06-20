const post = require('../services/post.service');

const addBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  // const { authorization } = req.headers;
  // const userId = await getIdWithToken(authorization);
  const { type, message } = await post.addBlogPost({ title, content, categoryIds });
  if (type === null) {
    return res.status(201).json(await message);
  } return res.status(type).json({ message });
};

module.exports = {
  addBlogPost,
};