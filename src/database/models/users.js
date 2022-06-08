"use strict";

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const API_SECRET = process.env.API_SECRET;
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      full_name: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM("admin", "fan"),
        defaultValue: "fan",
      },
      token: {
        type: DataTypes.VIRTUAL,
      },
      actions: {
        type: DataTypes.VIRTUAL,
        get() {
          const acl = {
            fan: ["view", "join", "reading-list", "suggest"],
            admin: [
              "view",
              "join",
              "reading-list",
              "suggest",
              "library",
              "discussion",
              "readings",
            ],
          };
          return acl[this.role];
        },
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  users.authenticateBasic = async function (email, password) {
    const user = await this.findOne({ where: { email } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      let newToken = jwt.sign({ email: user.email }, API_SECRET);
      user.token = newToken;
      return user;
    } else {
      throw new Error("Invalid User");
    }
  };

  users.authenticateBearer = async function (token) {
    const parsedToken = jwt.verify(token, API_SECRET);
    const user = await this.findOne({
      where: { email: parsedToken.email },
    });
    if (user) {
      return user;
    } else {
      throw new Error("Invalid Token");
    }
  };
  return users;
};
