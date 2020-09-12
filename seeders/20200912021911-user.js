'use strict';
const bycrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'disa',
        email: 'disa@email.io',
        password: bycrypt.hashSync('password', 10),
        avatar: '',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        username: 'dicky',
        email: 'dicky@email.io',
        password: bycrypt.hashSync('password', 10),
        avatar: '',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        username: 'ricky',
        email: 'ricky@email.io',
        password: bycrypt.hashSync('password', 10),
        avatar: '',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        username: 'akmal',
        email: 'akmal@email.io',
        password: bycrypt.hashSync('password', 10),
        avatar: '',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        username: 'sandi',
        email: 'sandi@email.io',
        password: bycrypt.hashSync('password', 10),
        avatar: '',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
  ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
};
