module.exports = (sequelize, type) => {
  return sequelize.define('user', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fio: type.STRING,
      phone: type.STRING,
      bday: type.DATE,
      employmentDate: {
        type: type.DATE,
        defaultValue: sequelize.fn('NOW')
      },
      countVacationDays: type.INTEGER
  })
}