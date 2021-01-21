
module.exports = (app, IncidentsTypes) => {

// get all user
app.get('/incidents/types', (req, res) => {
  IncidentsTypes.findAll().then(types => res.json(types))
})

};
