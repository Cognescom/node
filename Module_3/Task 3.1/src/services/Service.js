/* eslint-disable object-shorthand */
class Service {
    constructor(model) {
        this.model = model;
    }

    getAll() {
        return this.model.findAll({
            where: {
                isDeleted: false
            }
        });
    }
    get(id) {
        return this.model.findByPk(id);
    }
    insert(login, password, age) {
        return this.model.create({
            login: login,
            password: password,
            age: age
        });
    }
    update() {}
    delete() {}

    getUserByLogin(login) {
        return this.model.findOne({
            where: {
                login: login
            }
        });
    }
}

export default Service;
