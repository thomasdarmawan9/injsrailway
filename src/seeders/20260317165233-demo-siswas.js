'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('siswas', [
      {
        nama: 'Budi Santoso',    nim: '2023001',
        angkatan: 2023,         jurusan_id: 1,
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        nama: 'Siti Rahayu',    nim: '2023002',
        angkatan: 2023,       jurusan_id: 2,
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        nama: 'Ahmad Rizki',    nim: '2022001',
        angkatan: 2022,       jurusan_id: 1,
        createdAt: new Date(), updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('siswas', null, {});
  },
};