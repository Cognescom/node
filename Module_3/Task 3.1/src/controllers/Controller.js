import Service from './../services/Service';
import Users from './../models/Users';
import ErrorHandler from './../exception/ErrorHandler';

const apiService = new Service(Users);

class Controller {
    constructor(service) {
        this.service = service;
        this.getAll = this.getAll.bind(this);
        this.get = this.get.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    getAll(req, resp) {
        this.service
            .getAll()
            .then(users => {
                resp.status(200).json(users.map(user => user.toJSON()));
            })
            .catch(error => {
                resp.status(500).send(`Something went wrong: ${error.message}`);
            });
    }
    get(req, resp) {
        const id = Number(req.params.id);
        this.service
            .get(id)
            .then(user => {
                if (user === null) {
                    resp.status(404).send(`User with ${id} don't exist`);
                } else {
                    resp.status(200).json(JSON.parse(JSON.stringify(user)));
                }
            })
            .catch(error => {
                resp.status(500).send(error.message);
            });
    }
    insert(req, resp) {
        this.service
            .getUserByLogin(req.body.login)
            .then(user => {
                if (user !== null) {
                    resp.status(400).send(
                        `User with login: ${req.body.login} alredy exist!`
                    );
                } else {
                    return this.service.insert(req.body);
                }
            })
            .then(() => {
                resp.status(200).send('User added successfully');
            })
            .catch(error => {
                resp.status(500).send(error.message);
            });
    }
    update(req, resp) {
        const id = Number(req.params.id);
        this.service
            .get(id)
            .then(user => {
                if (user === null) {
                    throw new ErrorHandler(
                        400,
                        `User with id: ${id} don't find`
                    );
                } else {
                    return this.service.getUserByLogin(req.body.login);
                }
            })
            .then(user => {
                if (user !== null) {
                    throw new ErrorHandler(
                        400,
                        `User with login: ${req.body.login} alredy exist`
                    );
                } else {
                    return this.service.update(id, req.body);
                }
            })
            .then(() => {
                resp.status(200).send('User updated successfully');
            })
            .catch(error => {
                if (error instanceof ErrorHandler) {
                    resp.status(error.status).send(error.message);
                } else {
                    resp.send(500).send(error.message);
                }
            });
    }
    delete(req, resp) {
        const id = Number(req.params.id);
        this.service
            .get(id)
            .then(user => {
                if (user === null) {
                    throw new ErrorHandler(
                        404,
                        `User with id: ${id} don't find`
                    );
                } else {
                    return this.service.delete(id);
                }
            })
            .then(() => {
                resp.status(200).send('User deleted succesfully');
            })
            .catch(error => {
                if (error instanceof ErrorHandler) {
                    resp.status(error.status).send(error.message);
                } else {
                    resp.status(500).send(error.message);
                }
            });
    }
}

export default new Controller(apiService);
