const { Sequelize } = require("sequelize");
require("dotenv").config();

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
const useSsl =
  process.env.DB_SSL === "true" ||
  process.env.DATABASE_SSL === "true" ||
  process.env.PGSSLMODE === "require" ||
  (process.env.NODE_ENV === "production" && hasDatabaseUrl);

const baseOptions = {
  dialect: "postgres",
  logging: false,
  ...(useSsl
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {}),
};

const sequelize = hasDatabaseUrl
  ? new Sequelize(process.env.DATABASE_URL, baseOptions)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        ...baseOptions,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
      },
    );

module.exports = sequelize;
