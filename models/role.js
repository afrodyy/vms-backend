"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, { foreignKey: "role_id" });
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Role name must be unique",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Role name cannot be empty",
          },
          notNull: {
            args: true,
            msg: "Role name cannot be null",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Role description cannot be empty",
          },
          notNull: {
            args: true,
            msg: "Role description cannot be null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
