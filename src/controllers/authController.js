const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { registerSchema, loginSchema } = require('../validators');

// Helper untuk membuat JWT (payload minimum: id + email)
const signToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const err = new Error('JWT_SECRET belum diset di environment');
    err.status = 500;
    throw err;
  }
  return jwt.sign(
    // payload yang akan masuk ke token
    { id: user.id, email: user.email },
    secret,
    // expired token dapat diatur lewat env
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
};

// ── POST /api/auth/register ──────────────────────────────────────────
const register = async (req, res, next) => {
  // validasi input register
  const { error, value } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ success: false, errors: error.details.map(d => d.message) });

  try {
    // cek apakah email sudah terdaftar
    const existing = await User.findOne({ where: { email: value.email } });
    if (existing) return res.status(409).json({ success: false, message: 'Email sudah terdaftar' });

    // hash password sebelum simpan ke DB
    const hashed = await bcrypt.hash(value.password, 10);
    const user = await User.create({ name: value.name, email: value.email, password: hashed });

    // buat token JWT untuk user baru
    const token = signToken(user);
    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      data: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) { next(err); }
};

// ── POST /api/auth/login ─────────────────────────────────────────────
const login = async (req, res, next) => {
  // validasi input login
  const { error, value } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ success: false, errors: error.details.map(d => d.message) });

  try {
    // cari user berdasarkan email
    const user = await User.findOne({ where: { email: value.email } });
    if (!user) return res.status(401).json({ success: false, message: 'Email atau password salah' });

    // bandingkan password plaintext vs hash
    const ok = await bcrypt.compare(value.password, user.password);
    if (!ok) return res.status(401).json({ success: false, message: 'Email atau password salah' });

    // buat token JWT jika login valid
    const token = signToken(user);
    res.json({
      success: true,
      message: 'Login berhasil',
      data: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) { next(err); }
};

// ── GET /api/auth/me ────────────────────────────────────────────────
const me = async (req, res, next) => {
  try {
    // req.user diisi oleh middleware auth setelah token diverifikasi
    const user = await User.findByPk(req.user.id, { attributes: ['id', 'name', 'email'] });
    if (!user) return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
};

module.exports = { register, login, me };