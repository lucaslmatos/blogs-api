module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Category', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    tableName: 'categories',
    underscored: true,
    timestamps: false
  });
};