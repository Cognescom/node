import GroupsData from './../data-access/GroupsData';
import ErrorHandler from './../exception/ErrorHandler';

class GroupService {
    constructor(store) {
        this.store = store;
    }

    getAll() {
        return this.store.getAll().then(groups => {
            return groups.map(group => group.toJSON());
        });
    }
    get(id) {
        return this.store.get(id).then(group => {
            if (group === null) {
                throw new ErrorHandler(400, `Group with id: ${id} don't exist`);
            } else {
                return group;
            }
        });
    }
    create(name) {
        return this.store.getGroupByName(name).then(group => {
            if (group !== null) {
                throw new ErrorHandler(
                    400,
                    `Group with name: ${name} alredy exist`
                );
            } else {
                return this.store.create(name);
            }
        });
    }
    update(id, name) {
        return this.store
            .get(id)
            .then(group => {
                if (group === null) {
                    throw new ErrorHandler(
                        400,
                        `Group with id: ${id} don't find`
                    );
                } else {
                    return this.store.getGroupByName(name);
                }
            })
            .then(group => {
                if (group !== null) {
                    throw new ErrorHandler(
                        400,
                        `Group with name: ${name} alredy exist`
                    );
                } else {
                    return this.store.update(id, name);
                }
            });
    }
    delete(id) {
        return this.store.get(id).then(group => {
            if (group === null) {
                throw new ErrorHandler(404, `Group with id: ${id} don't find`);
            } else {
                return this.store.delete(id);
            }
        });
    }
}

export default new GroupService(GroupsData);
