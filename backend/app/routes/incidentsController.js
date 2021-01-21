module.exports = (app, Team, Incidents, IncidentsTypes) => {
  app.post('/incidents', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    Incidents.create(req.body)
        .then(incidents => {
          Incidents.findAll({
            include: [
              {
                model: Team
              },
              {
                model: IncidentsTypes
              }
            ]
          }).then(incidents => res.json(incidents))
        })
  })
  // get all incidents for current user
  app.get('/incidents', (req, res) => {
    Incidents.findAll({
        include: [
          {
            model: Team
          },
          {
            model: IncidentsTypes
          }
        ]
      }).then(incidents => res.json(incidents))
  })

  app.delete('/incidents/:id', (req, res) => {
    Incidents.destroy({
        where: {
          id: req.params.id
        }
      }).then(incidents => {
      Incidents.findAll({
        include: [
          {
            model: Team
          },
          {
            model: IncidentsTypes
          }
        ]
      }).then(incidents => res.json(incidents))
      })
  })

  app.put('/incidents/:id', (req, res) => {
    Incidents.update(
      {
        ...req.body
      },
      {where: {
        id: req.params.id
      }}
    ).then(incidents => {
      Incidents.findAll({
        include: [
          {
            model: Team
          },
          {
            model: IncidentsTypes
          }
        ]
      }).then(incidents => res.json(incidents))
    })
  })

};
