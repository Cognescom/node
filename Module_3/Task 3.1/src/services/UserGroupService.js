import UserGroupData from './../data-access/UserGroupData';

class UserGroupService {
    constructor(store) {
        this.store = store;
    }
    addUsersToGroup(groupId, userIds) {
        const data = [];
        for (let i = 0; i < userIds.length; i++) {
            if (!Array.isArray(userIds[i])) {
                data.push({
                    idUser: userIds[i],
                    idGroup: groupId
                });
            } else {
                userIds[i].forEach(userId => {
                    data.push({
                        idUser: userId,
                        idGroup: groupId
                    });
                });
            }
        }
        return this.store.create(data);
    }
}

export default new UserGroupService(UserGroupData);
