const express = require('express')
const router = express.Router()
const kelasController = require('../controllers/kelasController')

router.get('/', kelasController.getAll)

router.get('/:id', kelasController.getById)

router.post('/', kelasController.create)

router.put('/:id', kelasController.update)

router.delete('/:id', kelasController.remove)

module.exports = router