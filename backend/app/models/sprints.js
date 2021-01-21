module.exports = (sequelize, type) => {
  return sequelize.define('sprints', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      dateStart: type.STRING,
      dateEnd: type.STRING,
      name: type.STRING,
      percent: type.INTEGER
  })
}
