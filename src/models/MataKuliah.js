const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const MataKuliah = sequelize.define('MataKuliah', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nama_mk: { type: DataTypes.STRING, allowNull: false },
    kode_mk: { type: DataTypes.STRING, allowNull: false, unique: true },
    sks: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'matakuliahs', timestamps: true })

module.exports = MataKuliah