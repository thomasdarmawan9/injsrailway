'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('jurusans', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nama_jurusan: { type: Sequelize.STRING, allowNull: false },
      kode_jurusan: { type: Sequelize.STRING, allowNull: false, unique: true },
      fakultas:     { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  // DOWN: dijalankan saat migration di-rollback
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jurusans');
  },
};
