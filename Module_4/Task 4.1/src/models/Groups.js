import db from './../config/database';

const Groups = db.sequelize.define(
    'groups',
    {
        id: {
            type: db.Sequelize.INTEGER,
            primaryKey: true
        },
        name: db.Sequelize.STRING
    },
    {
        timestamps: false
    }
);

export default Groups;
