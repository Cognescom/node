import Service from '../services/Service';
import Users from '../models/Users';

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
        const { login, password, age } = req.body;
        this.service.getUserByLogin(login)
            .then(user => {
                if (user !== null) {
                    resp.status(400).send(
                        `User with login: ${login} alredy exist!`
                    );
                } else {
                    return this.service.insert(login, password, age);
                }
            })
            .then(addedUser => {
                console.log(`user add: ${addedUser}`); //! TODO
                if (addedUser !== null) {
                    resp.status(200).send('User added successfully');
                } else {
                    throw new Error("Can't add user to DB");
                }
            })
            .catch(error => {
                resp.status(500).send(error.message);
            });
    }
    update(req, resp) {}
    delete(req, resp) {}
}

export default new Controller(apiService);
