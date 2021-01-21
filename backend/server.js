const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const cors = require('cors');
app.use(cors());
app.options('*', cors());
const {
  User,
  City,
  Departament,
  Grade,
  Kpi,
  Position,
  Team,
  Type,
  Release,
  ReleaseType,
  Incidents,
  IncidentsTypes,
  Sprints,
  Salaries,
  Rates
} = require('./sequelize')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(
  app,
  User,
  City,
  Departament,
  Grade,
  Kpi,
  Position,
  Team,
  Type,
  Release,
  ReleaseType,
  Incidents,
  IncidentsTypes,
  Sprints,
  Salaries,
  Rates
);

const port = 3001;

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
});
