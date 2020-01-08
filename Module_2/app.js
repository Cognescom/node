const express = require("express");
const app = express();
const router = express.Router();
const Joi = require("joi");

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

let users = new Map([
  [1, new User(1, "Alex", "alex", 21)],
  [2, new User(2, "Sam", "sam", 25)],
  [3, new User(3, "Kira", "kira", 34)],
  [4, new User(4, "Alexandra", "alexandra", 28)],
  [5, new User(5, "Patrik", "patrik", 27)]
]);

router.get("/users/:id", (req, resp) => {
  let id = Number(req.params.id);
  if (!users.has(id)) sendError(resp);
  resp.end(JSON.stringify(users.get(id)));
});

router.delete("/users/:id/delete", (req, resp) => {
  let id = Number(req.params.id);
  if (!users.has(id)) sendError(resp);
  users.get(id).isDeleted = true;
  resp.sendStatus(200);
  console.log(users);
});

router.put("/users/:id/update", (req, resp) => {
  let id = Number(req.params.id);
  let { login, password, age } = req.body;
  try {
    updateUser(id, login, password, age);
    resp.status(200).send("User updated successfully");
  } catch (error) {
    resp.status(404).send(error.message);
  }
});

router.post("/users/add", validateSchema(userSchema), (req, resp) => {
  console.log(req.body);
  let { login, password, age } = req.body;
  try {
    addUser(login, password, age);
    resp.status(200).send("User added successfully");
  } catch (error) {
    resp.status(404).send(error.message);
  }
});

function sendError(resp) {
  resp.end("Resource didn't find");
}

function addUser(login, password, age) {
  users.forEach(user => {
    if (user.login === login) throw new Error("User alredy exist");
  });
  let size = users.size + 1;
  users.set(size, new User(size, login, password, age));
  console.log("Users:");
  console.log(users);
}

function updateUser(id, login, password, age) {
  if (!users.has(id)) throw new Error("User didn't find");
  let user = users.get(id);
  user.login = login;
  user.password = password;
  user.age = age;
  console.log("Users after update:");
  console.log(users);
}

function getAutoSuggestUsers(loginSubstring, limit) {
  let listUsers = [];
  let inc = 0;
  users.forEach(user => {
    if (user.login.includes(loginSubstring) && inc < limit) {
      listUsers.push(user);
      inc++;
    }
  });
  return listUsers;
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
