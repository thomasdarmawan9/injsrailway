require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database');
const siswaRoutes = require('./src/routes/siswaRoutes');
const routerJurusan = require('./src/routes/jurusanRoutes');
const authRoutes = require('./src/routes/authRoutes')
const kelasRoutes = require('./src/routes/kelasRoutes')
const authMiddleware = require('./src/middleware/auth')

require('./src/models/Siswa');
require('./src/models/user');
require('./src/models/associations');
require('./src/models/Kelas')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use ('/siswa', siswaRoutes);
app.use('/auth', authRoutes)
app.use('/jurusan', routerJurusan);
app.use('/kelas', kelasRoutes)

const startServer = async() => {
    try {
    await sequelize.authenticate();
    console.log('Koneksi database berhasil!')

    await sequelize.sync({ alter: true });
    console.log('Database tersinkronisasi!');

    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost${PORT}`);
    });
    } catch (error) {
        console.error('Gagal konek database:', error)
        process.exit(1);
    }
}

startServer()