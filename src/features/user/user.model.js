import { getDb } from "../../config/mongodb.js";
import ApplicationError from "../../Error Handers/applicationErrors.js";

export default class UserModel {
  constructor(name, email, password, type, id) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  static getAll() {
    return users;
  }

  static validateUser(id) {
    const user = users.find((u) => {
      return u.id == id;
    });
    return user;
  }
}

const users = [
  {
    id: 1,
    name: "Clark Kent",
    email: "clark@gmail.com",
    password: "superman",
    type: "customer",
  },

  {
    id: 2,
    name: "Bruce Wayne",
    email: "bruce@gmail.com",
    password: "batman",
    type: "seller",
  },

  {
    id: 3,
    name: "Diana Prince",
    email: "diana@gmail.com",
    password: "wonderwoman",
    type: "customer",
  },

  {
    name: "Barry Allen",
    email: "barry@gmail.com",
    password: "theflash",
    type: "customer",
  },
];
