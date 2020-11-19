'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dataSeed = require('../json_data/product_seed.json')
    await queryInterface.bulkInsert('Products', dataSeed, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
