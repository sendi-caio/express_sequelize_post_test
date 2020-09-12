const bcrypt = require('bcrypt')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
         name: 'ricky',
         email: 'ricky03senju@gmail.com',
         password: bcrypt.hashSync('admin123', 10),
         birth_date: '2001-07-03',
         avatar: '',
         createdAt: Sequelize.fn('NOW'),
         updatedAt: Sequelize.fn('NOW')
       }], {});
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('Users', null, {});
  }
};
