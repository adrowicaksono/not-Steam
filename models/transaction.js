'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    UserId: DataTypes.INTEGER,
    GameId: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.Game)
    Transaction.belongsTo(models.User)
  };
  return Transaction;
};