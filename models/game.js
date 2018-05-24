'use strict';
module.exports = (sequelize, DataTypes) => {
  var Game = sequelize.define('Game', {
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    price: DataTypes.INTEGER,
    total_purchase: DataTypes.INTEGER
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
    Game.belongsToMany(models.User,{ through : 'Transaction'})
  };
  //class method
  Game.getByGenre = function(){
    return Game
    .findAll({
      attributes:['genre'],
      group : 'genre',
    })  
  }
  return Game;
};