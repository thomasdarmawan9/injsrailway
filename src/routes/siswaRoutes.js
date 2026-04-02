const express = require('express');
const router = express.Router();
const siswaController = require('../controllers/siswaController');

// GET semua siswa
router.get('/', siswaController.getAll);

// GET satu siswa by ID
router.get('/:id', siswaController.getById);

// POST tambah siswa baru
router.post('/', siswaController.create);

// PUT update siswa by ID
router.put('/:id', siswaController.update);

// POST daftarkan siswa ke mata kuliah
// Menghubungkan siswa ke mata kuliah lewat relasi N:M
router.post('/:id/matakuliah', siswaController.enrollMataKuliah);

// DELETE batalkan enrollment siswa dari mata kuliah
// Melepas relasi N:M antara siswa dan mata kuliah
router.delete('/:id/matakuliah/:mk_id', siswaController.unenrollMataKuliah);

// DELETE hapus siswa by ID
router.delete('/:id', siswaController.remove);

module.exports = router;