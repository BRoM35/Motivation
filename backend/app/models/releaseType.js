module.exports = (sequelize, type) => {
  return sequelize.define('releaseType', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: type.STRING
  })
}