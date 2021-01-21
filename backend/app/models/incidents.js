module.exports = (sequelize, type) => {
  return sequelize.define('incidents', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date: type.DATE,
      description: type.STRING,
      cause: type.STRING,
      decision: type.STRING,
      status: type.BOOLEAN,
      percent: type.INTEGER
  })
}
