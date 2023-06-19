module.exports = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false
  })

  UserTable.associate = ({BlogPost}) => {
    UserTable.hasMany(BlogPost,{
      foreignKey:'id',as:'BlogPost'
    });
  }

  return UserTable;
};