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
    insert(data) {
        const { login, password, age } = data;
        return this.model.create({
            login: login,
            password: password,
            age: age
        });
    }
    update(id, data) {
        const { login, password, age } = data;
        return this.model.update(
            {
                login: login,
                password: password,
                age: age
            },
            {
                where: {
                    id: id
                }
            }
        );
    }
    delete(id) {
        return this.model.update(
            {
                isDeleted: true
            },
            {
                where: {
                    id: id
                }
            }
        );
    }

    getUserByLogin(login) {
        return this.model.findOne({
            where: {
                login: login
            }
        });
    }
}

export default Service;
