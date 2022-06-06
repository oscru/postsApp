'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('posts', [
      {
        userId: 1,
        title: 'Post 1',
        content:
          'This is post 1, it is very long and it is very important, so you should read it',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: 'Post 2',
        content:
          'Some description about post 2, it is very long and it is very important, so you should read it',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: 'Post 3',
        content:
          'This is post 3, it is very long and it is very important, so you should read it, but you should not',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('posts', null, {});
  },
};
