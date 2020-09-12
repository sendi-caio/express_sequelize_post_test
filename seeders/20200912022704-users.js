'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        username: 'disa',
        email: 'disa@email.io',
        password: bcrypt.hashSync('password', 20),
        avatar: '',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        username: 'dicky',
        email: 'dicky@email.io',
        password: bcrypt.hashSync('password', 20),
        avatar: '',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        username: 'ricky',
        email: 'ricky@email.io',
        password: bcrypt.hashSync('password', 20),
        avatar: '',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        username: 'akmal',
        email: 'akmal@email.io',
        password: bcrypt.hashSync('password', 20),
        avatar: '',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        username: 'sandi',
        email: 'sandi@email.io',
        password: bcrypt.hashSync('password', 20),
        avatar: '',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
