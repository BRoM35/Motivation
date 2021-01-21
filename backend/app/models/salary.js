module.exports = (sequelize, type) => {
  return sequelize.define('salaries', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: type.STRING,
    summ: type.DOUBLE,
    sprint: type.DOUBLE,
    incident: type.DOUBLE,
    comment: type.STRING,
  })
}
