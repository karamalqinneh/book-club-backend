"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class discussions_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  discussions_history.init(
    {
      user_id: DataTypes.INTEGER,
      message: DataTypes.STRING,
      room_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "discussions_history",
    }
  );
  return discussions_history;
};
