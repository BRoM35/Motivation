module.exports = (sequelize, type) => {
  return sequelize.define('rates', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sprint: type.INTEGER,
    incident: type.INTEGER,
    rate: type.INTEGER,
  })
}
