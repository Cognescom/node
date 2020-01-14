import GroupService from './../services/GroupService';
import ErrorHandler from './../exception/ErrorHandler';

class GroupController {
    constructor(service) {
        this.service = service;
        this.getAll = this.getAll.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.addUsersToGroup = this.addUsersToGroup.bind(this);
    }

    getAll(req, resp) {
        this.service
            .getAll()
            .then(groups => {
                resp.status(200).json(groups);
            })
            .catch(error => {
                resp.status(500).send(error.message);
            });
    }
    get(req, resp) {
        const id = Number(req.params.id);
        this.service
            .get(id)
            .then(group => {
                resp.status(200).send(JSON.parse(JSON.stringify(group)));
            })
            .catch(error => {
                if (error instanceof ErrorHandler) {
                    resp.status(error.status).send(error.message);
                } else {
                    resp.status(500).send(error.message);
                }
            });
    }
    create(req, resp) {
        this.service
            .create(req.body.name)
            .then(() => {
                resp.status(200).send(
                    `Group with name: ${req.body.name} added successfully`
                );
            })
            .catch(error => {
                if (error instanceof ErrorHandler) {
                    resp.status(error.status).send(error.message);
                } else {
                    resp.status(500).send(error.message);
                }
            });
    }
    update(req, resp) {
        const id = Number(req.params.id);
        this.service
            .update(id, req.body.name)
            .then(() => {
                resp.status(200).send('Group updated successfully');
            })
            .catch(error => {
                if (error instanceof ErrorHandler) {
                    resp.status(error.status).send(error.message);
                } else {
                    resp.status(500).send(error.message);
                }
            });
    }
    delete(req, resp) {
        const id = Number(req.params.id);
        this.service
            .delete(id)
            .then(() => {
                resp.status(200).send(
                    `Group with id: ${id} deleted succesfully`
                );
            })
            .catch(error => {
                if (error instanceof ErrorHandler) {
                    resp.status(error.status).send(error.message);
                } else {
                    resp.status(500).send(error.message);
                }
            });
    }
    addUsersToGroup(req, resp) {
        const id = req.params.id;
        const data = req.body.usersIds;
        this.service
            .addUsersToGroup(id, data)
            .then(() => {
                resp.status(200).send(
                    'Users added in group. Transaction complited'
                );
            })
            .catch(error => {
                if (error instanceof ErrorHandler) {
                    resp.status(error.status).send(error.message);
                } else {
                    resp.status(500).send(
                        `Transaction wasn't executed: cause - ${error.message}`
                    );
                }
            });
    }
}

export default new GroupController(GroupService);
