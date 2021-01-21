module.exports = (sequelize, type) => {
  return sequelize.define('release', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date: type.STRING,
      coefficient: type.STRING,
      percent: type.STRING,
      comment: type.STRING
  })
}