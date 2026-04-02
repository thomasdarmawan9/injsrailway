const express = require('express')
const routerJurusan = express.Router()
const siswaController = require('../controllers/siswaController')

routerJurusan.get('/', siswaController.getJurusanAll)

module.exports = routerJurusan;