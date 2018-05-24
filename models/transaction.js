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

  Transaction.hook('afterCreate',function(GameBought, options){
    console.log('woiiii dari after ini')  
    //console.log(GameBought.dataValues.GameId)
    let GameId = GameBought.dataValues.GameId
    let Game = sequelize.models.Game
    Game
    .findById(GameId)
    .then(function(game){
        let pervsTot = game.dataValues.total_purchase
        let newTot_Purch = pervsTot + 1
        Game
          .update(
              {total_purchase: newTot_Purch,
              updatedAt : new Date()},
        {where:{
          id : GameId,
        } 
      }) 
      // .then(function(game){
      //   console.log(game, 'sukses update')
      // })
      .catch(function(err){
        console.log(err.message)
         })
      })
    })


  return Transaction;
};