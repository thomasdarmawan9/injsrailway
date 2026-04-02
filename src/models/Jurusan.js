const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Jurusan = sequelize.define('Jurusan', {
  id:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nama_jurusan:  { type: DataTypes.STRING, allowNull: false },
  kode_jurusan:  { type: DataTypes.STRING, allowNull: false, unique: true },
  fakultas:      { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'jurusans', timestamps: true });

module.exports = Jurusan;