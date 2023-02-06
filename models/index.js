const { Sequelize, DataTypes } = require('sequelize')
const dbConfig = require('../config/dbconfig')
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    operatorAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})
sequelize.authenticate()
    .then(() => {
        console.log("database is connected");
    })
    .catch((err) => {
        console.log("error :-" + err);
    })



const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.logins = require('./loginmodel')(sequelize, DataTypes)

db.registrations = require('./registrationmodel')(sequelize, DataTypes)



db.sequelize.sync({ force: false })
    .then(() => {
        console.log('re-sync done');
    })
// db.employees.hasOne(db.salaries, {
//     foreignKey: 'empID',
//     as: 'salaries'
// })
// db.salaries.belongsTo(db.employees, {
//     foreignKey: 'empID',
//     as: 'employees'
// })


// db.employees.hasOne(db.timestamps, {
//     foreignKey: 'empID',
//     as: 'timestamps'
// })
// db.timestamps.belongsTo(db.employees, {
//     foreignKey: 'empID',
//     as: 'employees'
// })


module.exports = db