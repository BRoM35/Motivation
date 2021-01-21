module.exports = (sequelize, type) => {
  return sequelize.define('departament', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: type.STRING
  })
}