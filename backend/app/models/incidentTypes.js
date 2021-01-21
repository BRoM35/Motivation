module.exports = (sequelize, type) => {
  return sequelize.define('incidentTypes', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: type.STRING,
  })
}