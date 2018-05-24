'use strict';
module.exports = (sequelize, DataTypes) => {
  var Game = sequelize.define('Game', {
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    price: DataTypes.INTEGER,
    total_purchase: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate:function(Game, option){
        if(!Game.total_purchase){
            Game.total_purchase = 0;
        }
      }
    }
  });
  Game.associate = function(models) {
    // associations can be defined here
    models.Game.belongsToMany(models.User, {foreignKey :'UserId', through:'Transaction'});
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