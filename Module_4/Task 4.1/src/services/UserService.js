import UsersData from './../data-access/UsersData';
import ErrorHandler from './../exception/ErrorHandler';

class UserService {
    constructor(store) {
        this.store = store;
    }

    getAll() {
        return this.store.getAll().then(users => {
            return users.map(user => user.toJSON());
        });
    }
    get(id) {
        return this.store.get(id).then(user => {
            if (user === null) {
                throw new ErrorHandler(400, `User with ${id} don't exist`);
            } else {
                return user;
            }
        });
    }
    insert(data) {
        return this.store.getUserByLogin(data.login).then(user => {
            if (user !== null) {
                throw new ErrorHandler(
                    400,
                    `User with login: ${data.login} alredy exist`
                );
            } else {
                return this.store.insert(data);
            }
        });
    }
    update(id, data) {
        return this.store
            .get(id)
            .then(user => {
                if (user === null) {
                    throw new ErrorHandler(
                        400,
                        `User with id: ${id} don't find`
                    );
                } else {
                    return this.store.getUserByLogin(data.login);
                }
            })
            .then(user => {
                if (user !== null) {
                    throw new ErrorHandler(
                        400,
                        `User with login: ${data.login} alredy exist`
                    );
                } else {
                    return this.store.update(id, data);
                }
            });
    }
    delete(id) {
        return this.store.get(id).then(user => {
            if (user === null) {
                throw new ErrorHandler(404, `User with id: ${id} don't find`);
            } else {
                return this.store.delete(id);
            }
        });
    }
}

export default new UserService(UsersData);
