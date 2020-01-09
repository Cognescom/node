import server from './config/server';
import './config/database';
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

/* eslint-disable object-shorthand */
// const express = require('express');
// const app = express();
// const router = express.Router();
// const Joi = require('joi');
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('ngmp', 'root', 'root', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// app.listen(3000, () => {
//     console.log('Server started on 3000');
// });

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

// app.use(express.json());
// app.use('/', router);

// const userSchema = Joi.object().keys({
//     id: Joi.number()
//         .integer()
//         .min(0),
//     login: Joi.string()
//         .alphanum()
//         .min(4)
//         .max(15)
//         .required(),
//     password: Joi.string()
//         .regex(/^[a-zA-Z0-9]{4,15}$/)
//         .required(),
//     age: Joi.number()
//         .min(4)
//         .max(130)
//         .required(),
//     isDeleted: Joi.boolean()
// });

// const Users = sequelize.define(
//     'users',
//     {
//         id: {
//             type: Sequelize.INTEGER,
//             primaryKey: true
//         },
//         login: Sequelize.STRING,
//         password: Sequelize.STRING,
//         age: Sequelize.INTEGER,
//         isDeleted: Sequelize.BOOLEAN
//     },
//     {
//         timestamps: false
//     }
// );

// router.get('/users/:id', (req, resp) => {
//     const id = Number(req.params.id);
//     getUserById(id)
//         .then(user => {
//             if (user === null) {
//                 resp.status(404).send(`User with ${id} don't exist`);
//             } else {
//                 resp.status(200).json(JSON.parse(JSON.stringify(user)));
//             }
//         })
//         .catch(error => {
//             resp.status(500).send(error.message);
//         });
// });

// router.post('/users/add', validateSchema(userSchema), (req, resp) => {
//     const { login, password, age } = req.body;
//     getUserByLogin(login)
//         .then(user => {
//             if (user !== null) {
//                 resp.status(400).send(
//                     `User with login: ${login} alredy exist!`
//                 );
//             } else {
//                 return addUser(login, password, age);
//             }
//         })
//         .then(addedUser => {
//             console.log(`user add: ${addedUser}`); //! TODO
//             if (addedUser !== null) {
//                 resp.status(200).send('User added successfully');
//             } else {
//                 throw new Error("Can't add user to DB");
//             }
//         })
//         .catch(error => {
//             resp.status(500).send(error.message);
//         });
// });

// router.delete('/users/:id/delete', (req, resp) => {
//     const id = Number(req.params.id);
//     getUserById(id)
//         .then(user => {
//             if (user === null) {
//                 throw new ErrorHandler(400, `User with id: ${id} don't find`);
//             } else {
//                 return deleteUserById(id);
//             }
//         })
//         .then(() => {
//             resp.status(200).send('User deleted succesfully');
//         })
//         .catch(error => {
//             if (error instanceof ErrorHandler) {
//                 resp.status(error.status).send(error.message);
//             } else {
//                 resp.status(500).send(error.message);
//             }
//         });
// });

// router.put('/users/:id/update', validateSchema(userSchema), (req, resp) => {
//     const id = Number(req.params.id);
//     const { login, password, age } = req.body;
//     getUserById(id)
//         .then(user => {
//             if (user === null) {
//                 throw new ErrorHandler(400, `User with id: ${id} don't find`);
//             } else {
//                 return getUserByLogin(login);
//             }
//         })
//         .then(user => {
//             if (user !== null) {
//                 throw new ErrorHandler(
//                     400,
//                     `User with login: ${login} alredy exist!`
//                 );
//             } else {
//                 return updateUserById(id, login, password, age);
//             }
//         })
//         .then(() => {
//             resp.status(200).send('User updated succesfully');
//         })
//         .catch(error => {
//             if (error instanceof ErrorHandler) {
//                 resp.status(error.status).send(error.message);
//             } else {
//                 resp.status(500).send(error.message);
//             }
//         });
// });

// class ErrorHandler extends Error {
//     constructor(status = 500, ...params) {
//         super(...params);
//         if (Error.captureStackTrace) {
//             Error.captureStackTrace(this, ErrorHandler);
//         }
//         this.status = status;
//     }
// }

// function addUser(login, password, age) {
//     return Users.create({
//         login: login,
//         password: password,
//         age: age
//     });
// }

// function getUserById(id) {
//     return Users.findByPk(id);
// }

// function getUserByLogin(login) {
//     return Users.findOne({
//         where: {
//             login: login
//         }
//     });
// }

// function deleteUserById(id) {
//     return Users.update(
//         {
//             isDeleted: true
//         },
//         {
//             where: { id: id }
//         }
//     );
// }

// function updateUserById(id, login, password, age) {
//     return Users.update(
//         {
//             login: login,
//             password: password,
//             age: age
//         },
//         {
//             where: { id: id }
//         }
//     );
// }

// function errorResponse(schemaError) {
//     const errors = schemaError.map(error => {
//         const { path, message } = error;
//         return { path, message };
//     });
//     return {
//         status: 'failed',
//         errors
//     };
// }

// function validateSchema(schema) {
//     return (req, resp, next) => {
//         const { error } = schema.validate(req.body, {
//             abortEarly: false,
//             allowUnknown: false
//         });
//         if (error !== null) {
//             resp.status(400).json(errorResponse(error.details));
//         } else {
//             // eslint-disable-next-line callback-return
//             next();
//         }
//     };
// }

// router.get('/users', (req, resp) => {
//     Users.findAll({
//         where: {
//             isDeleted: false
//         }
//     })
//         .then(users => {
//             resp.status(200).json(users.map(user => user.toJSON()));
//         })
//         .catch(error => {
//             resp.status(500).send(`Something went wrong: ${error.message}`);
//         });
// });
