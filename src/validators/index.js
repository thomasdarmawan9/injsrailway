const Joi = require('joi');

// ── Jurusan validators ────────────────────────────────────────────────
// Joi dipakai untuk validasi payload request sebelum masuk ke database
const createJurusanSchema = Joi.object({
  // nama_jurusan wajib, minimal 3 karakter
  nama_jurusan: Joi.string().min(3).max(100).required().messages({
    'string.empty':  'Nama jurusan tidak boleh kosong',
    'string.min':    'Nama jurusan minimal 3 karakter',
    'any.required':  'Nama jurusan wajib diisi',
  }),
  // kode_jurusan hanya alfanumerik
  kode_jurusan: Joi.string().alphanum().min(2).max(10).required().messages({
    'string.alphanum': 'Kode jurusan hanya boleh huruf dan angka',
    'any.required':    'Kode jurusan wajib diisi',
  }),
  // fakultas wajib diisi
  fakultas: Joi.string().min(3).max(150).required().messages({
    'any.required': 'Fakultas wajib diisi',
  }),
});

const updateJurusanSchema = Joi.object({
  nama_jurusan: Joi.string().min(3).max(100),
  kode_jurusan: Joi.string().alphanum().min(2).max(10),
  fakultas:     Joi.string().min(3).max(150),
}).min(1).messages({ 'object.min': 'Minimal satu field harus diisi' });

// ── Siswa validators ──────────────────────────────────────────────────
const createSiswaSchema = Joi.object({
  // nama siswa wajib
  nama: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Nama tidak boleh kosong',
    'any.required': 'Nama wajib diisi',
  }),
  // NIM hanya alfanumerik
  nim: Joi.string().alphanum().min(5).max(20).required().messages({
    'string.alphanum': 'NIM hanya boleh huruf dan angka',
    'any.required':    'NIM wajib diisi',
  }),
  // email optional, tapi jika diisi harus valid
  email: Joi.string().email().optional().allow('').messages({
    'string.email': 'Format email tidak valid',
  }),
  // angkatan dibatasi rentang tahun
  angkatan: Joi.number().integer().min(2000).max(2099).required().messages({
    'number.base':  'Angkatan harus berupa angka',
    'number.min':   'Angkatan minimal tahun 2000',
    'any.required': 'Angkatan wajib diisi',
  }),
  // jurusan_id wajib untuk relasi ke tabel jurusans
  jurusan_id: Joi.number().integer().positive().required().messages({
    'any.required': 'Jurusan wajib dipilih',
  }),
});

const updateSiswaSchema = Joi.object({
  nama:       Joi.string().min(3).max(100),
  email:      Joi.string().email().allow(''),
  angkatan:   Joi.number().integer().min(2000).max(2099),
  jurusan_id: Joi.number().integer().positive(),
}).min(1).messages({ 'object.min': 'Minimal satu field harus diisi' });

// ── MataKuliah validators ─────────────────────────────────────────────
const createMataKuliahSchema = Joi.object({
  // nama mata kuliah wajib
  nama_mk: Joi.string().min(3).max(150).required().messages({
    'any.required': 'Nama mata kuliah wajib diisi',
  }),
  // kode mata kuliah wajib
  kode_mk: Joi.string().min(2).max(10).required().messages({
    'any.required': 'Kode mata kuliah wajib diisi',
  }),
  // jumlah SKS harus 1-6
  sks: Joi.number().integer().min(1).max(6).required().messages({
    'number.min':   'SKS minimal 1',
    'number.max':   'SKS maksimal 6',
    'any.required': 'SKS wajib diisi',
  }),
  // semester optional
  semester: Joi.number().integer().min(1).max(8).optional(),
});

const updateMataKuliahSchema = Joi.object({
  nama_mk:  Joi.string().min(3).max(150),
  kode_mk:  Joi.string().min(2).max(10),
  sks:      Joi.number().integer().min(1).max(6),
  semester: Joi.number().integer().min(1).max(8),
}).min(1);

// ── Auth validators ──────────────────────────────────────────────────
const registerSchema = Joi.object({
  // nama user wajib
  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Nama tidak boleh kosong',
    'any.required': 'Nama wajib diisi',
  }),
  // email wajib dan harus valid
  email: Joi.string().email().required().messages({
    'string.email': 'Format email tidak valid',
    'any.required': 'Email wajib diisi',
  }),
  // password minimal 6 karakter
  password: Joi.string().min(6).max(100).required().messages({
    'string.min': 'Password minimal 6 karakter',
    'any.required': 'Password wajib diisi',
  }),
});

const loginSchema = Joi.object({
  // email wajib
  email: Joi.string().email().required().messages({
    'string.email': 'Format email tidak valid',
    'any.required': 'Email wajib diisi',
  }),
  // password wajib
  password: Joi.string().required().messages({
    'any.required': 'Password wajib diisi',
  }),
});

module.exports = {
  createJurusanSchema,
  updateJurusanSchema,
  createSiswaSchema,
  updateSiswaSchema,
  createMataKuliahSchema,
  updateMataKuliahSchema,
  registerSchema,
  loginSchema,
};