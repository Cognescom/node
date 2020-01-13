/* eslint-disable object-shorthand */
import Groups from './../models/Groups';

class GroupsData {
    constructor(model) {
        this.model = model;
    }

    getAll() {
        return this.model.findAll();
    }

    get(id) {
        return this.model.findByPk(id);
    }

    create(name) {
        return this.model.create({
            name: name
        });
    }

    update(id, name) {
        return this.model.update(
            {
                name: name
            },
            {
                where: { id: id }
            }
        );
    }

    delete(id) {
        return this.model.destroy({
            where: { id: id }
        });
    }

    getGroupByName(name) {
        return this.model.findOne({
            where: { name: name }
        });
    }
}

export default new GroupsData(Groups);
