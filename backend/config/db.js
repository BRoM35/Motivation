module.exports = {
  host: "localhost",
  user: "roman",
  pass: "qwer1234",
  db: "motivation",
  dialect: "postgres",
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};