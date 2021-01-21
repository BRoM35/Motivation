module.exports = (sequelize, type) => {
  return sequelize.define('city', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: type.STRING
  })
}