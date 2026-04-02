'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('siswas', {
      id:        { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nama:      { type: Sequelize.STRING, allowNull: false },
      nim:       { type: Sequelize.STRING, allowNull: false, unique: true },
      angkatan:  { type: Sequelize.INTEGER, allowNull: false },

      // Foreign key ke tabel jurusans
      jurusan_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'jurusans', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('siswas');
  },
};
