const Kelas = require("../models/Kelas");

const getAll = async (req, res) => {
  try {
    const kelasList = await Kelas.findAll();
    return res.json({ success: true, data: kelasList });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const kelas = await Kelas.findByPk(req.params.id);
    if (!kelas)
      return res
        .status(404)
        .json({ success: false, message: "Kelas tidak ditemukan" });
    res.json({ success: true, data: kelas });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { nama_kelas, tingkat, wali_kelas, kapasitas } = req.body;
    if (
      !String(nama_kelas || "").trim() ||
      tingkat === undefined ||
      tingkat === null ||
      String(tingkat).trim() === "" ||
      !String(wali_kelas || "").trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Data kelas wajib diisi",
      });
    }

    const createKelas = await Kelas.create({
      nama_kelas,
      tingkat,
      wali_kelas,
      kapasitas,
    });
    return res.status(201).json({
      success: true,
      message: "Kelas berhasil ditambahkan",
      data: createKelas,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const kelas = await Kelas.findByPk(req.params.id);
    if (!kelas)
      return res.status(404).json({
        success: false,
        message: "Kelas tidak ditemukan",
      });

    const { nama_kelas, tingkat, wali_kelas, kapasitas } = req.body;
    const updateKelas = await kelas.update({
      nama_kelas,
      tingkat,
      wali_kelas,
      kapasitas,
    });
    return res.status(200).json({
      success: true,
      message: "Kelas berhasil di update",
      data: updateKelas,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const kelas = await Kelas.findByPk(req.params.id);
    if (!kelas)
      return res.status(404).json({
        success: false,
        message: "Kelas tidak ditemukan",
      });
    await kelas.destroy();

    return res.json({
      success: true,
      message: `${kelas.nama_kelas} berhasil di hapus`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
