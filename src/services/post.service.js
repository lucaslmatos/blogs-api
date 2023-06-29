const { Op } = require('sequelize');
const { checkInfoForEdit, checkInfoForDelete } = require('../middlewares/validations');
const { BlogPost, User, Category } = require('../models');
const { addPostCategory } = require('./post.category.service');

const addBlogPost = async ({ title, content, categoryIds, uId }) => {
  if (!title || !content || !categoryIds) {
    return { type: 400, message: 'Some required fields are missing' };
  }
  const newBlogPost = await BlogPost.create({ 
    title, content, userId: +uId, published: new Date(), updated: new Date() });
    (await Promise.all(categoryIds.map(async (e) => { 
      await addPostCategory(newBlogPost.id, e);
    })));
    return { type: null, message: newBlogPost };
};

const getAllBlogPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return { type: null, message: allPosts };
};

const getBlogPostById = async (id) => {
  const post = await BlogPost.findOne({ where: { id }, 
    include: [
      { model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
});
  if (post === null) {
    return { type: 404, message: 'Post does not exist' };
  } return { type: null, message: post };
};

const editBlogPostById = async (id, uId, info) => {
  const { type, message } = await checkInfoForEdit(id, uId, info);
  if (type) {
    return { type, message };
  }
  await BlogPost.update(info, { where: { id } });
  const editedBlogPost = await BlogPost.findOne({
    where: { id },
    attributes: [
      'id', 'title', 'content', 'published', 'updated', ['user_id', 'userId']],
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { 
      model: Category, as: 'categories', through: { attributes: [] } }],
  }); 
  return { type: null, message: editedBlogPost };
};

const deleteBlogPostById = async (id, uId) => {
  const { type, message } = await checkInfoForDelete(id, uId);
  if (type) {
    return { type, message };
  }
  await BlogPost.destroy({ where: { id: +id } });
  return { type: null };
};

const searchPosts = async (searchParam) => {
  const posts = await BlogPost.findAll({ where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchParam}%` } },
        { content: { [Op.like]: `%${searchParam}%` } }] },
        attributes: ['id', 'title', 'content', 'published', 'updated', 'user_id'],
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ] });
  return { type: null, message: posts };
};

module.exports = {
  addBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  editBlogPostById,
  deleteBlogPostById,
  searchPosts,
};