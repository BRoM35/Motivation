
module.exports = (app, Team) => {

// get all user
app.get('/teams', (req, res) => {
  Team.findAll().then(teams => res.json(teams))
})

};
