module.exports = {
  host: "containers-us-west-80.railway.app",
  username: "postgres",
  password: "dIoZwlyuHiVVbT9vABVe",
  database: "railway",
  port: "5583",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
