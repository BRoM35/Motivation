const user = require('./userController');
const kpi = require('./kpiController');
const types = require('./typeController');
const release = require('./releaseController');
const teams = require('./teamController');
const releaseTypes = require('./releaseTypesController');
const incidents = require('./incidentsController');
const incidentsTypes = require('./incidentsTypesController');
const sprints = require('./sprintsController');
const salaries = require('./salariesController')

module.exports = function(
  app, User, City, Departament,
  Grade, Kpi, Position, Team,
  Type, Release, ReleaseType,
  Incidents, IncidentsTypes, Sprints,
  Salaries, Rates
  ) {
  user(app, User, City, Departament, Grade, Position);
  kpi(app, Kpi, Type);
  types(app, Type);
  release(app, User, Release, Team, ReleaseType);
  teams(app, Team);
  releaseTypes(app, ReleaseType);
  incidents(app, Team, Incidents, IncidentsTypes);
  incidentsTypes(app, IncidentsTypes);
  sprints(app, Team, Sprints);
  salaries(app, Salaries, Rates, User, Grade, Incidents, Team, Sprints)
};
