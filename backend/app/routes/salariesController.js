const moment = require('moment');
module.exports = (app, Salaries, Rates, User, Grade, Incidents, Team, Sprints) => {
  const getUser = async (userId) => {
    return await User.findAll({
      include: [
        {
          model: Grade
        }
      ],
      where: {
        id: userId
      }
    })
  }

  const getRate = async (id) => {
    return await Rates.findAll({
      where: {
        gradeId: id
      }
    })
  }

  const getIncidents = async (id) => {
    return await Incidents.findAll({
      where: {
        teamId: id
      }
    })
  }

  const getSprints = async (id) => {
    return await Sprints.findAll({
      where: {
        teamId: id
      }
    })
  }

  const salaryTest = async (userId, res) => {
  //получаем данные юзера, достаем айди грейда и команды 
    getUser(userId).then(user => {
      const data = user[0].dataValues
      const gradeId = data.gradeId;
      const teamId = data.teamId;
      //получаем инциденты и спринты по айди команды
      getIncidents(teamId).then(incidents => {
        getSprints(teamId).then(sprints => {
          //получаем по айди грейда данные по ставке
          getRate(gradeId).then(rates => {
            let currentIncident = 0;
            let currentSprint = 0;
            let sprintCount = 0;
            const currentDate = moment().format('YYYY-MM')
            //подсчет инцидентов за указанный месяц
            incidents.forEach(incident => {
              const incidentData = incident.toJSON();
              const date = moment(incidentData.date).format('YYYY-MM');

              if (date === currentDate) {
                const percent = incidentData.percent === null ? 0 : +incidentData.percent;
                currentIncident += percent;
              }
            })
          //подсчет спринтов за указанный месяц
            sprints.forEach(sprint => {
              const sprintData = sprint.toJSON();
              const date = moment(sprintData.dateEnd).format('YYYY-MM');

              if (date === currentDate) {
                const percent = sprintData.percent === null ? 0 : +sprintData.percent;
                currentSprint += percent;
                sprintCount++;
              }
            })
            //подсчет коэф инцидентов по формуле 100% - И1 - Иn / 100
            const rateSettings = rates[0].dataValues;
            const incident = rateSettings.incident;
            const sprint = rateSettings.sprint;
            const rate = rateSettings.rate;
            const incidentDiff = (100 - currentIncident) / 100;

            //подсчет коэф спринта по формуле ((К_спр1 + К_спр2) / Кол-во_спр) / 100 
            sprintCount = sprintCount === 0 ? 1 : sprintCount;

            const sprintDiff = (currentSprint / sprintCount) / 100;
            //ЗП = Ставка + Спр + Инц
            const sum = rate + sprint * sprintDiff + incident * incidentDiff;
            const result = {
              sum,
              sprintDiff,
              incidentDiff,
              sprint,
              rate,
              incident
            }

            res.json({result});
          })
        })

      })
    })
  }

  app.get('/salary/:id', (req, res) => {
    salaryTest(req.params.id, res).then()
  })

  app.get('/salaries/:id', (req, res) => {
    Salaries.findAll({
      include: [
        {
          model: User
        }
      ],
      where: {
        userId: req.params.id
      },
      order: [['createdAt', 'DESC']]
    }).then(sprints => res.json(sprints))
  })
};
