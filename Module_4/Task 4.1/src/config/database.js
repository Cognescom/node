import Sequelize from 'sequelize';
const dbName = 'ngmp';
const dbUser = 'root';
const dbPassword = 'root';
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: 'localhost',
    dialect: 'mysql'
});

const db = {};

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
