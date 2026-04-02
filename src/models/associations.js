const Jurusan    = require('./Jurusan');
const Siswa      = require('./Siswa');
const MataKuliah = require('./MataKuliah');

// ── Relasi 1:N ──────────────────────────────
// Jurusan memiliki banyak Siswa
Jurusan.hasMany(Siswa, {
  foreignKey: 'jurusan_id',
  as: 'siswa',              // alias saat query
  onDelete: 'CASCADE',       // hapus siswa jika jurusan dihapus
});

// Siswa dimiliki oleh satu Jurusan
Siswa.belongsTo(Jurusan, {
  foreignKey: 'jurusan_id',
  as: 'jurusan',             // alias saat query
});

// ── Relasi N:M ──────────────────────────────
// Siswa bisa ikut banyak MataKuliah
Siswa.belongsToMany(MataKuliah, {
  through: 'siswa_matakuliah', // nama tabel pivot (otomatis dibuat)
  foreignKey: 'siswa_id',
  otherKey: 'matakuliah_id',
  as: 'matakuliah',
});

// MataKuliah diikuti oleh banyak Siswa
MataKuliah.belongsToMany(Siswa, {
  through: 'siswa_matakuliah',
  foreignKey: 'matakuliah_id',
  otherKey: 'siswa_id',
  as: 'siswa',
});