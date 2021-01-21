module.exports = (app, Kpi, Type) => {
    // create a user
  app.post('/kpi/:id', (req, res) => {
    if (!req.body) return res.sendStatus(400);
  
    Kpi.create(req.body)
        .then(kpi => {
          Kpi.findAll({
            where: {
              userId: req.params.id
            },
            include: [{
              model: Type
            }]
          }).then(kpi => res.json(kpi))
        })
  })
  // get all kpi for current user
  app.get('/kpi/:id', (req, res) => {
    Kpi.findAll({
        where: {
          userId: req.params.id
        },
        include: [{
          model: Type
        }]
      }).then(kpi => res.json(kpi))
  })

  app.delete('/kpi/:id', (req, res) => {
    Kpi.destroy({
        where: {
          id: req.body.deleteId
        }
      }).then(kpi => {
        Kpi.findAll({
          where: {
            userId: req.params.id
          },
          include: [{
            model: Type
          }]
        }).then(kpi => res.json(kpi))
      })
  })

  app.put('/kpi/:id', (req, res) => {
    console.log(req.body)
    Kpi.update(
      {
        typeId: req.body.typeId,
        period: req.body.period,
        result: req.body.result,
        target: req.body.target
      },
      {where: {
        id: req.body.id
      }}
    ).then(kpi => {
      Kpi.findAll({
        where: {
          userId: req.params.id
        },
        include: [{
          model: Type
        }]
      }).then(kpi => res.json(kpi))
    })
  })
  
};