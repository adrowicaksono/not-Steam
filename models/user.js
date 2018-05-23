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
          .then((notAvailable)=>{
            if(notAvailable == undefined){
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
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};