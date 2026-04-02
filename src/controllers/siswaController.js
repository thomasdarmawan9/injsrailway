const Siswa      = require('../models/Siswa');
const Jurusan    = require('../models/Jurusan');
const MataKuliah = require('../models/MataKuliah');
const { createSiswaSchema, updateSiswaSchema } = require('../validators');

// ── GET semua siswa (dengan relasi jurusan) ───────────────────────────
const getAll = async (req, res, next) => {
  try {
    const siswaList = await Siswa.findAll({
      // include relasi jurusan (belongsTo) agar data jurusan ikut diambil
      // jika include tidak ditulis, hasil hanya tabel Siswa tanpa data relasi
      include: [{ model: Jurusan, as: 'jurusan', attributes: ['id', 'nama_jurusan', 'kode_jurusan'] }],
      order:   [['nama', 'ASC']],
    });
    res.json({ success: true, count: siswaList.length, data: siswaList });
  } catch (err) { next(err); }
};

// ── GET siswa by ID (dengan jurusan + mata kuliah) ────────────────────
const getById = async (req, res, next) => {
  try {
    const siswa = await Siswa.findByPk(req.params.id, {
      include: [
        // include jurusan dan matakuliah agar response lengkap (relasi 1:N dan N:M)
        // tanpa include, hanya data Siswa saja tanpa relasi terkait
        { model: Jurusan,    as: 'jurusan',    attributes: ['id', 'nama_jurusan', 'kode_jurusan', 'fakultas'] },
        { model: MataKuliah, as: 'matakuliah', attributes: ['id', 'nama_mk', 'kode_mk', 'sks'] },
      ],
    });
    if (!siswa) return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan' });
    res.json({ success: true, data: siswa });
  } catch (err) { next(err); }
};

// ── POST tambah siswa baru ────────────────────────────────────────────
const create = async (req, res, next) => {
  // validasi body request sebelum insert
  const { error, value } = createSiswaSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ success: false, errors: error.details.map(d => d.message) });

  try {
    // Cek jurusan ada (foreign key)
    const jurusan = await Jurusan.findByPk(value.jurusan_id);
    if (!jurusan) return res.status(404).json({ success: false, message: 'Jurusan tidak ditemukan' });

    const siswa = await Siswa.create(value);
    const result = await Siswa.findByPk(siswa.id, {
      // include jurusan supaya response menampilkan data jurusan setelah create
      include: [{ model: Jurusan, as: 'jurusan', attributes: ['id', 'nama_jurusan'] }],
    });
    res.status(201).json({ success: true, message: 'Siswa berhasil ditambahkan', data: result });
  } catch (err) { next(err); }
};

// ── PUT update siswa ──────────────────────────────────────────────────
const update = async (req, res, next) => {
  // validasi payload update (minimal 1 field)
  const { error, value } = updateSiswaSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ success: false, errors: error.details.map(d => d.message) });

  try {
    const siswa = await Siswa.findByPk(req.params.id);
    if (!siswa) return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan' });

    if (value.jurusan_id) {
      // jika jurusan_id diganti, pastikan jurusan baru ada
      const jurusan = await Jurusan.findByPk(value.jurusan_id);
      if (!jurusan) return res.status(404).json({ success: false, message: 'Jurusan tidak ditemukan' });
    }

    await siswa.update(value);
    res.json({ success: true, message: 'Data siswa berhasil diupdate', data: siswa });
  } catch (err) { next(err); }
};

// ── DELETE siswa ──────────────────────────────────────────────────────
const remove = async (req, res, next) => {
  try {
    const siswa = await Siswa.findByPk(req.params.id);
    if (!siswa) return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan' });
    await siswa.destroy();
    res.json({ success: true, message: Siswa `${siswa.nama}`});
  } catch (err) { next(err); }
};

// ── POST daftarkan siswa ke mata kuliah (N:M) ─────────────────────────
const enrollMataKuliah = async (req, res, next) => {
  try {
    const { matakuliah_id } = req.body;
    if (!matakuliah_id) return res.status(400).json({ success: false, message: 'matakuliah_id wajib diisi' });

    const siswa = await Siswa.findByPk(req.params.id);
    if (!siswa) return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan' });

    const mk = await MataKuliah.findByPk(matakuliah_id);
    if (!mk) return res.status(404).json({ success: false, message: 'Mata kuliah tidak ditemukan' });

    // addMatakuliah berasal dari relasi belongsToMany
    await siswa.addMatakuliah(mk);
    res.json({ success: true, message: Siswa `${siswa.nama}" berhasil didaftarkan ke "${mk.nama_mk}` });
  } catch (err) { next(err); }
};

// ── DELETE batalkan enrollment siswa dari mata kuliah ─────────────────
const unenrollMataKuliah = async (req, res, next) => {
  try {
    const siswa = await Siswa.findByPk(req.params.id);
    if (!siswa) return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan' });

    const mk = await MataKuliah.findByPk(req.params.mk_id);
    if (!mk) return res.status(404).json({ success: false, message: 'Mata kuliah tidak ditemukan' });

    // removeMatakuliah juga berasal dari relasi belongsToMany
    await siswa.removeMatakuliah(mk);
    res.json({ success: true, message: Siswa `${siswa.nama}" berhasil dibatalkan dari "${mk.nama_mk}` });
  } catch (err) { next(err); }
};

const getJurusanAll = async (req, res) => {
  try {
    const jurusanDenganSiswa = await Jurusan.findAll({
      include: [{ model: Siswa, as: 'siswa' }],
    });
    res.json({
      success: true,
      data: jurusanDenganSiswa,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove, enrollMataKuliah, unenrollMataKuliah, getJurusanAll };