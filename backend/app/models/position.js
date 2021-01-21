module.exports = (sequelize, type) => {
  return sequelize.define('position', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: type.STRING
  })
}