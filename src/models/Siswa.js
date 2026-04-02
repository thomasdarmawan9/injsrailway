const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Siswa = sequelize.define('Siswa', {
  id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nama:     { type: DataTypes.STRING, allowNull: false },
  nim:      { type: DataTypes.STRING, allowNull: false, unique: true },
  angkatan: { type: DataTypes.INTEGER, allowNull: false },

  // Foreign key ke tabel jurusans
  jurusan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'jurusans', // nama tabel (bukan model)
      key: 'id',
    },
  },
}, { tableName: 'siswas', timestamps: true });

module.exports = Siswa;