
module.exports = (app, User, City, Departament, Grade, Position) => {
  // create a user
app.post('/users', (req, res) => {
  if (!req.body) return res.sendStatus(400);

  User.create(req.body)
      .then(user => res.json(user))
})
// get user
app.get('/users/:id', (req, res) => {
  User.findAll({
    where: {
      id: req.params.id
    },
    include: [{
      model: City
    },
    {
      model: Departament
    },
    {
      model: Grade
    },
    {
      model: Position
    }],
  }).then(users => res.json(users))
})

// get all user
app.get('/users', (req, res) => {
  User.findAll({
    include: [{
      model: City
    },
    {
      model: Departament
    },
    {
      model: Grade
    },
    {
      model: Position
    }],
  }).then(users => res.json(users))
})

};
