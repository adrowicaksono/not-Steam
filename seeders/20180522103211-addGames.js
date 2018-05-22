'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Games', [{
        title : "Death Wing",
        genre : "action",
        price : 263200,
      },{
        title : "Next Day",
        genre : "action",
        price : 84991,
      },{
        title : "Untouchable",
        genre : "adventure",
        price : 329999,
      },{
        title : "The Mercury Man",
        genre : "adventure",
        price : 62999,
      },{
        title : "Baby Car Driver",
        genre : "casual",
        price : 5949,
      },{
        title : "Retro Maze",
        genre : "casual",
        price : 7349,
      },{
        title : "Prime Mover",
        genre : "indie",
        price : 95944,
      },{
        title : "Natural Calls",
        genre : "indie",
        price : 47699,
      },{
        title : "The Elder Scrolls Online : Somerset",
        genre : "masivelly Multiplayer",
        price : 266000,
      },{
        title : "Wrecked",
        genre : "masivelly Multiplayer",
        price : 13000,
      },{
        title : "Trailblazer",
        genre : "racing",
        price : 133999,
      },{
        title : "Primitive Race",
        genre : "racing",
        price : 8499,
      },{
        title : "President Pig",
        genre : "RPG",
        price : 3849,
      },{
        title : "Seek Etyliv",
        genre : "RPG",
        price : 31500,
      },{
        title : "Flight Simulator",
        genre : "simulation",
        price : 269999,
      },{
        title : "Truck Simulator",
        genre : "simulation",
        price : 152900,
      },{
        title : "Free Style 2",
        genre : "sports",
        price : 32999,
      },{
        title : "FIFA 2012",
        genre : "sports",
        price : 48999,
      },{
        title : "Eden Rising : Supermacy",
        genre : "strategy",
        price : 64999,
      },{
        title : "Strombound",
        genre : "strategy",
        price : 115999,
      }],{})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
