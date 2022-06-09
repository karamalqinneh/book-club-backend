"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  books.init(
    {
      book_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      genre: {
        type: DataTypes.ENUM(
          "Self-help",
          "Cookbooks",
          "poetry",
          "fitness",
          "novel",
          "short stories",
          "Science",
          "Art"
        ),
      },
      introduction: DataTypes.STRING,
      name: DataTypes.STRING,
      suggestion: DataTypes.BOOLEAN,
      img_url: DataTypes.STRING,
      book_url: DataTypes.STRING,
      publish_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "books",
    }
  );
  return books;
};
