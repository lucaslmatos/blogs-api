module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Category', {
    id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING
  }, {
    tableName: 'categories',
    underscored: true,
    timestamps: false
  });
};