import db from './../config/database';

const Users = db.sequelize.define(
    'users',
    {
        id: {
            type: db.Sequelize.INTEGER,
            primaryKey: true
        },
        login: db.Sequelize.STRING,
        password: db.Sequelize.STRING,
        age: db.Sequelize.INTEGER,
        isDeleted: db.Sequelize.BOOLEAN
    },
    {
        timestamps: false
    }
);

export default Users;
