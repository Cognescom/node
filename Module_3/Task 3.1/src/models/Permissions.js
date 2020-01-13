import db from './../config/database';

const Permissions = db.sequelize.define(
    'permissions',
    {
        id: {
            type: db.Sequelize.INTEGER,
            primaryKey: true
        },
        name: db.Sequelize.STRING
    },
    {
        timestamp: false
    }
);

export default Permissions;
