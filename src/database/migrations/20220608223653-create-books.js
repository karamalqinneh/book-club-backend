"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("books", {
      book_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      introduction: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      img_url: {
        type: Sequelize.STRING,
      },
      book_url: {
        type: Sequelize.STRING,
      },
      publish_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("books");
  },
};
