const express = require("express");
const app = express();
const router = express.Router();
const Joi = require("joi");
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'root',
  database : 'ngmp'
});

app.listen(3000, () => {
  console.log("Server started on 3000");
});

app.use(express.json());
app.use("/", router);

const userSchema = Joi.object().keys({
  id: Joi.number()
    .integer()
    .min(0),
  login: Joi.string()
    .alphanum()
    .min(4)
    .max(15)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{4,15}$/)
    .required(),
  age: Joi.number()
    .min(4)
    .max(130)
    .required(),
  isDeleted: Joi.boolean()
});

class User {
  constructor(id, login, password, age, isDeleted = false) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = isDeleted;
  }
}

router.get("/users/:id", (req, resp) => {
  let id = Number(req.params.id);
  let user = getUserAccountById(id);
  user
    .then( user => {
      if(Object.keys(user).length == 0){
        resp.status(200).send("User don't exist in DB");  
      }else{
        resp.status(200).json(JSON.parse(JSON.stringify(user)));    
      }
    })
    .catch( error => {
      resp.status(500).send(error.message);
    });
});

router.post("/users/add", validateSchema(userSchema), (req, resp) => {
  console.log(req.body);
  let { login, password, age } = req.body;
  getUserAccountByLogin(login).then( user =>{
      if(Object.keys(user).length == 0){
        return addUser(login, password, age)    
      }else{
        throw new Error('User alredy exist!');
      }
    })
    .then( addedUser =>{
      if(Object.keys(addedUser).length != 0){
        resp.status(200).send('User added successfully');
      }else{
        throw new Error('Can\'t add user to DB');
      }
    })
    .catch( error =>{
      resp.status(500).send(error.message);
    });
});

router.delete("/users/:id/delete", (req, resp) => {
  let id = Number(req.params.id);
  let deletedUser = deleteUserById(id);
  deletedUser
    .then( user =>{
      resp.status(200).send('User deleted succesfully');
    })
    .catch( error => {
      resp.status(500).send(error.message);
    });
});

router.put("/users/:id/update", validateSchema(userSchema),(req, resp) => {
  let id = Number(req.params.id);
  let { login, password, age } = req.body;
  let update = updateUserById(id, login, password, age);
  update
    .then(update => {
      resp.status(200).send("User updated succesfully");
    })
    .catch( error => {
      resp.status(500).send(error.message);
    });
});

function addUser(login, password, age) {
  let insertUser = 'INSERT INTO USERS(login, password, age) values(?, ?, ?)';
  let values = [login, password, age];
  let user = new Promise((resolve, reject) => {
    connection.query(insertUser, values, (error, result) =>{
      if(error) reject(error);
      resolve(result);                                 // !! result???
    });
  });
  return user;
}

function getUserAccountById(id){
  let query = 'SELECT * FROM users WHERE id = ?';
  let user = new Promise( (resolve, reject) => {
    connection.query( query, id, (error, result) => {
      if(error) reject(error);
      resolve(result);
    });
  });
  return user;
}

function getUserAccountByLogin(login){
  let query = 'SELECT * FROM users WHERE login = ?';
  let user = new Promise( (resolve, reject) => {
    connection.query( query, login, (error, result) => {
      if(error) reject(error);
      resolve(result);
    });
  });
  return user;
}

function deleteUserById(id){
  let updateDelete = 'UPDATE users SET isDeleted = ? WHERE id = ?';
  let values = [true, id];
  let deletedUser = new Promise( (resolve, reject) => {
    connection.query(updateDelete, values, (error, result) => {
      if(error) reject(error);
      resolve(result);
    });
  });
  return deletedUser;
}

function updateUserById(id, login, password, age) {
  let updateUser = 'Update users SET login = ?, password = ?, age = ? WHERE id = ?'
  let values = [login, password, age, id];
  let result = new Promise( (resolve, reject) => {
    connection.query(updateUser, values, (error, result) => {
      if(error) reject(error);
      resolve(result);
    });
  });
  return result;
}

function errorResponse(schemaError) {
  let errors = schemaError.map(error => {
    let { path, message } = error;
    return { path, message };
  });
  return {
    status: "failed",
    errors
  };
}

function validateSchema(schema) {
  return (req, resp, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });
    if (error != null) {
      resp.status(400).json(errorResponse(error.details));
    } else {
      next();
    }
  };
}

router.get('/users', (req, resp) => {
  let users = new Promise((resolve, reject) => {
    connection.query('Select * from users', (error, result) => {
      if(error) reject(error);
      console.log(result.length);
      console.log(result);
      resolve(result);
    });
  });
  users
    .then( users => {
      resp.status(200).json(JSON.parse(JSON.stringify(users)));
    })
    .catch( error => {
      resp.status(500).send(error.message);
    });
  
});