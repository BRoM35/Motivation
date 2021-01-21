module.exports = (sequelize, type) => {
  return sequelize.define('grade', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: type.STRING
  })
}