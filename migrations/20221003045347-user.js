"use strict";

const { sequelize } = require("../app/models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    // return queryInterface.createTable('users', { id: Sequelize.INTEGER , username: Sequelize.STRING, email: Sequelize.STRING});
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        field: "email",
        unique: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        field: "username",
        unique: true,
        allowNull: false,
      },
      encryptedPassword: {
        type: Sequelize.STRING,
        field: "password",
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "createdAt",
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updatedAt",
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
