module.exports = (sequelize, type) => {
  return sequelize.define('kpi', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      target: type.STRING,
      dateCreate: {
        type: type.DATE,
        defaultValue: sequelize.fn('NOW')
      },
      result: type.STRING,
      period: type.STRING
  })
}