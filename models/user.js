'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type : DataTypes.STRING,
      validate: {
        isUnique: function(email,next) {
          User.findOne({where:{email:email}})
          .then((user)=>{
            if(user){
             next('username already Used')
            }
            else{
              next()
            }
          })
        }
      }
    } ,
    age: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
         isUnique: function(email,next) {
          User.findOne({where:{email:email}})
          .then((user)=>{
            if(user){
              //throw new Error('email used');
              next();
            }
            else{
              next()
            }
          })
        }
      }
    },
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(user,option){
        const bcrypt = require('bcrypt')
        const garem = bcrypt.genSaltSync(8)
        const hash = bcrypt.hashSync(user.password,garem)
        user.salt = garem
        user.password = hash
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Game,{through: 'Transaction'})
  };
  return User;
};