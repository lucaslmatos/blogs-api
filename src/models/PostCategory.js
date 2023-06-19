module.exports = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false
  });

  PostCategoryTable.associate = ({ BlogPost, Category }) => {
    Category.belongsToMany(BlogPost, {
      through: PostCategoryTable,
      foreignKey: 'postId',
      as:'blogPost'
    });
    BlogPost.belongsToMany(Category, {
      through: PostCategoryTable,
      foreignKey: 'categoryId',
      as:'categories'
    });
  }

  return PostCategoryTable;
};