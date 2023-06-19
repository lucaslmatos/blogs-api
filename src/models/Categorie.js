module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Categorie', {
    name: DataTypes.STRING
  }, {
    tableName: 'categories',
    underscored: true,
    timestamps: false
  });
};