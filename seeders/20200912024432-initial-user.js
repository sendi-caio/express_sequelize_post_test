'use strict';
  const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', [{
      username: 'akmal',
      email: 'akmal@email.io',
      password: bcrypt.hashSync('password', 10),
      avatar: '',
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW')
   },
   {
      username: 'dicky',
      email: 'dicky@email.io',
      password: bcrypt.hashSync('password', 10),
      avatar: '',
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW')
   },
  ], {})
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {});
  }
};
