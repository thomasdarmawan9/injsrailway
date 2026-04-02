const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Ambil token dari header Authorization: Bearer <token>
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ success: false, message: "Token tidak ditemukan" });
  }

  // Secret untuk verifikasi JWT harus ada di environment
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res
      .status(500)
      .json({
        success: false,
        message: "JWT_SECRET belum diset di environment",
      });
  }

  try {
    // Verifikasi token dan simpan payload ke req.user
    const payload = jwt.verify(token, secret);
    req.user = payload;
    // next() dipanggil agar request lanjut ke middleware/handler berikutnya
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Token tidak valid atau kadaluarsa" });
  }
};
