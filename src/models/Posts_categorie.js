module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Posts_categorie', {
    
  }, {
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false
  });
};