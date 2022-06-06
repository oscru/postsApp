'use strict';
const bcrypt = require('bcrypt');

const password = bcrypt.hashSync('password', 10);
const password2 = bcrypt.hashSync('siR!S#_!5wSde4(', 10);

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        lastname: 'Root',
        email: 'root@posts-app.com',
        password: password,
        role: 'admin',
        canEditPosts: true,
        canDeleteComments: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kahli',
        lastname: 'Garcia',
        email: 'kahli@posts-app.com',
        password: password2,
        role: 'user',
        canEditPosts: true,
        canDeleteComments: false,
        canCreatePosts: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
