module.exports = (app, Team, Sprints) => {
  app.post('/sprints', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    Sprints.create(req.body)
        .then(sprints => {
          Sprints.findAll({
            include: [
              {
                model: Team
              }
            ]
          }).then(sprints => res.json(sprints))
        })
  })

  app.get('/sprints', (req, res) => {
    Sprints.findAll({
        include: [
          {
            model: Team
          }
        ]
      }).then(sprints => res.json(sprints))
  })

  app.delete('/sprints/:id', (req, res) => {
    Sprints.destroy({
        where: {
          id: req.params.id
        }
      }).then(sprints => {
      Sprints.findAll({
        include: [
          {
            model: Team
          }
        ]
      }).then(sprints => res.json(sprints))
      })
  })

  app.put('/sprints/:id', (req, res) => {
    Sprints.update(
      {
        ...req.body
      },
      {where: {
        id: req.params.id
      }}
    ).then(sprints => {
      Sprints.findAll({
        include: [
          {
            model: Team
          }
        ]
      }).then(sprints => res.json(sprints))
    })
  })

};
