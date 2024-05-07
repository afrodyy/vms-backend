"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: "role_id" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name tidak boleh kosong",
          },
          notNull: {
            args: true,
            msg: "Name tidak boleh kosong",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username sudah terdaftar, silahkan menggunakan username lain",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Username tidak boleh kosong",
          },
          notNull: {
            args: true,
            msg: "Username tidak boleh kosong",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email sudah terdaftar, silahkan gunakan alamat email lain",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Email tidak boleh kosong",
          },
          notNull: {
            args: true,
            msg: "Email tidak boleh kosong",
          },
          isEmail: {
            args: true,
            msg: "Alamat email tidak valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password tidak boleh kosong",
          },
          notNull: {
            args: true,
            msg: "Password tidak boleh kosong",
          },
        },
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
