'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    UserId: DataTypes.INTEGER,
    GameId: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    // Transaction.hasMany(models.Game);
    // Transaction.hasMany(models.User);
  };
  return Transaction;
};