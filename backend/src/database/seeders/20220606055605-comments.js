'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('comments', [
      {
        userId: 1,
        postId: 1,
        comment: 'This is a comment for the post 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        postId: 2,
        comment: 'This is a comment for the post 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        postId: 3,
        comment: 'This is a comment for the post 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('comments', null, {});
  },
};
