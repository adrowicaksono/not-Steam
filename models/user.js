'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
         isUnique: function(email,next) {
          User.findOne({where:{email:email}})
          .then((user)=>{
            console.log('------------->', user)
            if(user){

            // console.log('------------->1' )
             next('Email already Used')
            }
            else{
              // console.log('------------->2' )
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
      beforeCreate: (user,option)=>{
        if (!user.role) {
          user.role = 'user'
        }
      },
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
  };
  return User;
};