'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('jurusans', [
      {
        nama_jurusan: 'Teknik Informatika',
        kode_jurusan: 'TI',
        fakultas:     'Fakultas Teknologi Informasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_jurusan: 'Sistem Informasi',
        kode_jurusan: 'SI',
        fakultas:     'Fakultas Teknologi Informasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_jurusan: 'Teknik Elektro',
        kode_jurusan: 'TE',
        fakultas:     'Fakultas Teknik',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Rollback: hapus semua data jurusan
    await queryInterface.bulkDelete('jurusans', null, {});
  },
};