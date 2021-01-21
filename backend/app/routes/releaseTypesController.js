
module.exports = (app, ReleaseType) => {

// get all user
app.get('/release/types', (req, res) => {
  ReleaseType.findAll().then(types => res.json(types))
})

};
