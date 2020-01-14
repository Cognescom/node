import UserService from '../services/UserService';
import ErrorHandler from '../exception/ErrorHandler';

class UserController {
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
                resp.status(200).json(users);
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
                resp.status(200).json(JSON.parse(JSON.stringify(user)));
            })
            .catch(error => {
                if (error instanceof ErrorHandler) {
                    resp.status(error.status).send(error.message);
                } else {
                    resp.status(500).send(error.message);
                }
            });
    }
    insert(req, resp) {
        this.service
            .insert(req.body)
            .then(() => {
                resp.status(200).send('User added successfully');
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
            .update(id, req.body)
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
            .delete(id)
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

export default new UserController(UserService);
