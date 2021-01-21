module.exports = (app, User, Release, Team, ReleaseType) => {
    // create a user
  app.post('/release', (req, res) => {
    if (!req.body) return res.sendStatus(400);
  
    Release.create(req.body)
        .then(release => {
          Release.findAll({
            include: [
              {
                model: User
              },
              {
                model: Team
              },
              {
                model: ReleaseType
              }
            ]
          }).then(releases => res.json(releases))
        })
  })
  // get all kpi for current user
  app.get('/release', (req, res) => {
    Release.findAll({
        include: [
          {
            model: User
          },
          {
            model: Team
          },
          {
            model: ReleaseType
          }
        ]
      }).then(releases => res.json(releases))
  })

  app.delete('/release/:id', (req, res) => {
    Release.destroy({
        where: {
          id: req.params.id
        }
      }).then(release => {
        Release.findAll({
          include: [
            {
              model: User
            },
            {
              model: Team
            },
            {
              model: ReleaseType
            }
          ]
        }).then(releases => res.json(releases))
      })
  })

  app.put('/release/:id', (req, res) => {
    Release.update(
      {
        date: req.body.date,
        coefficient: req.body.coefficient,
        percent: req.body.percent,
        comment: req.body.comment,
        userId: req.body.userId,
        teamId: req.body.teamId,
        releaseTypeId: req.body.releaseTypeId
      },
      {where: {
        id: req.params.id
      }}
    ).then(release => {
      Release.findAll({
        include: [
          {
            model: User
          },
          {
            model: Team
          },
          {
            model: ReleaseType
          }
        ]
      }).then(releases => res.json(releases))
    })
  })
  
};