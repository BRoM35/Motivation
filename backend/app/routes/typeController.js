module.exports = (app, Type) => {
  app.get('/types', (req, res) => {
    Type.findAll().then(type => res.json(type))
  })
  
};