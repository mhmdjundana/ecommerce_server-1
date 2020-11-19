'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dataSeed = require('../json_data/user_seed.json')
    dataSeed.forEach(user => {
      // hashing password
      user.password = require('../helpers/bcrypt').hashPassword(user.password)
      
      user.createdAt = new Date()
      user.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Users', dataSeed, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
