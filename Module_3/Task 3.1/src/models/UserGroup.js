import db from './../config/database';

const UserGroup = db.sequelize.define(
    'user_group',
    {
        idUser: db.Sequelize.INTEGER,
        idGroup: db.Sequelize.INTEGER
    },
    {
        timestamps: false,
        freezeTableName: true,
        defaultPrimaryKey: false
    }
);
UserGroup.removeAttribute('id');

export default UserGroup;
