'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    age: DataTypes.INTEGER, 
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate:function(user){
        console.log(user.dataValues, '<------------');
      }
    },

  });
  User.associate = function(models) {
    // associations can be defined here
    models.User.belongsToMany(models.Game, {foreignKey:'GameId', through:'Transactions'})
  };

  return User;
};