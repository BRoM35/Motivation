const Sequelize = require('sequelize');
const UserModel = require('./app/models/user');
const CityModel = require('./app/models/city');
const DepartamentModel = require('./app/models/departament');
const GradeModel = require('./app/models/grade');
const KpiModel = require('./app/models/kpi');
const PositionModel = require('./app/models/position');
const TeamModel = require('./app/models/team');
const TypeModel = require('./app/models/type');
const ReleaseModel = require('./app/models/release');
const ReleaseTypeModel = require('./app/models/releaseType');
const IncidentsModel = require('./app/models/incidents');
const SprintsModel = require('./app/models/sprints');
const SalariesModel = require('./app/models/salary');
const RatesModel = require('./app/models/rates');
const IncidentsTypesModel = require('./app/models/incidentTypes');
const config = require('./config/db');

const sequelize = new Sequelize(config.db, config.user, config.pass, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
})

const User = UserModel(sequelize, Sequelize);
const City = CityModel(sequelize, Sequelize);
const Departament = DepartamentModel(sequelize, Sequelize);
const Grade = GradeModel(sequelize, Sequelize);
const Kpi = KpiModel(sequelize, Sequelize);
const Position = PositionModel(sequelize, Sequelize);
const Team = TeamModel(sequelize, Sequelize);
const Type = TypeModel(sequelize, Sequelize);
const Release = ReleaseModel(sequelize, Sequelize);
const ReleaseType = ReleaseTypeModel(sequelize, Sequelize);
const Incidents = IncidentsModel(sequelize, Sequelize);
const Sprints = SprintsModel(sequelize, Sequelize);
const IncidentsTypes = IncidentsTypesModel(sequelize, Sequelize);
const Salaries = SalariesModel(sequelize, Sequelize);
const Rates = RatesModel(sequelize, Sequelize);

const UserTeam = sequelize.define('user_team', {})

User.belongsToMany(Team, { through: UserTeam, unique: false })
Team.belongsToMany(User, { through: UserTeam, unique: false })

User.belongsTo(City);
User.belongsTo(Departament);
User.belongsTo(Grade);
User.belongsTo(Position);
User.belongsTo(Team);

Kpi.belongsTo(Type);
Kpi.belongsTo(User);

Release.belongsTo(User);
Release.belongsTo(Team);
Release.belongsTo(ReleaseType);

Incidents.belongsTo(Team);
Incidents.belongsTo(IncidentsTypes);

Sprints.belongsTo(Team);

Salaries.belongsTo(User);
Rates.belongsTo(Grade);

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
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
}
