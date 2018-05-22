'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return [queryInterface.changeColumn('Games', 'createdAt', {type: Sequelize.DATE, defaultValue:new Date()},{}),
   queryInterface.changeColumn('Games', 'updatedAt', {type: Sequelize.DATE, defaultValue:new Date()},{}),
   queryInterface.changeColumn('Users', 'createdAt', {type: Sequelize.DATE, defaultValue:new Date()},{}),
   queryInterface.changeColumn('Users', 'updatedAt', {type: Sequelize.DATE, defaultValue:new Date()},{}),
   queryInterface.changeColumn('Transactions', 'createdAt', {type: Sequelize.DATE, defaultValue:new Date()},{}),
   queryInterface.changeColumn('Transactions', 'updatedAt', {type: Sequelize.DATE, defaultValue:new Date()},{}),
  ]},

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
