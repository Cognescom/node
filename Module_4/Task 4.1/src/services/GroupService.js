import GroupsData from './../data-access/GroupsData';
import UserGroupData from './../data-access/UserGroupData';
import ErrorHandler from './../exception/ErrorHandler';

class GroupService {
    constructor(groups, usersAndGroups) {
        this.groups = groups;
        this.usersAndGroups = usersAndGroups;
    }

    getAll() {
        return this.groups.getAll().then(groups => {
            return groups.map(group => group.toJSON());
        });
    }
    get(id) {
        return this.groups.get(id).then(group => {
            if (group === null) {
                throw new ErrorHandler(400, `Group with id: ${id} don't exist`);
            } else {
                return group;
            }
        });
    }
    create(name) {
        return this.groups.getGroupByName(name).then(group => {
            if (group !== null) {
                throw new ErrorHandler(
                    400,
                    `Group with name: ${name} alredy exist`
                );
            } else {
                return this.groups.create(name);
            }
        });
    }
    update(id, name) {
        return this.groups
            .get(id)
            .then(group => {
                if (group === null) {
                    throw new ErrorHandler(
                        400,
                        `Group with id: ${id} don't find`
                    );
                } else {
                    return this.groups.getGroupByName(name);
                }
            })
            .then(group => {
                if (group !== null) {
                    throw new ErrorHandler(
                        400,
                        `Group with name: ${name} alredy exist`
                    );
                } else {
                    return this.groups.update(id, name);
                }
            });
    }
    delete(id) {
        return this.groups.get(id).then(group => {
            if (group === null) {
                throw new ErrorHandler(404, `Group with id: ${id} don't find`);
            } else {
                return this.groups.delete(id);
            }
        });
    }
    addUsersToGroup(groupId, userIds) {
        return this.groups.get(groupId).then(group => {
            if (group === null) {
                throw new ErrorHandler(
                    404,
                    `Group with id: ${groupId} don't find`
                );
            } else {
                const data = prepereData(groupId, userIds);
                return this.usersAndGroups.create(data);
            }
        });
    }
}

function prepereData(groupId, userIds) {
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
    return data;
}

export default new GroupService(GroupsData, UserGroupData);
