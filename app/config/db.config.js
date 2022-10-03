module.exports = {
  host: "localhost",
  username: "postgres",
  password: "123456",
  database: "injsdb",
  port: "5433",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
