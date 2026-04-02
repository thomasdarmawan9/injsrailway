const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Kelas = sequelize.define('Kelas', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nama_kelas: { type: DataTypes.STRING, allowNull: false },
    tingkat: { type: DataTypes.INTEGER, allowNull: false, validate: {isIn: [[10, 11, 12]]} },
    wali_kelas: { type: DataTypes.STRING, allowNull: false },
    kapasitas: { type: DataTypes.INTEGER, defaultValue: 30 }
}, { tableName: 'kelas', timestamps: true } )

module.exports = Kelas;