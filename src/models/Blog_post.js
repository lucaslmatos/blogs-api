module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Blog_post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
    tableName: 'blog_posts',
    underscored: true,
    timestamps: false
  });
};