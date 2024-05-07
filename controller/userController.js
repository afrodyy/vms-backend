const { User, Role } = require("../models");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });

    if (users.length > 0) {
      return res.status(200).json({
        message: "Menampilkan seluruh data pengguna",
        data: users,
      });
    }

    return res.status(404).json({
      message: "Data pengguna tidak ditemukan",
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });

    if (user) {
      return res.status(200).json({
        message: "Menampilkan data pengguna",
        data: user,
      });
    }

    return res.status(404).json({
      message: "Data pengguna tidak ditemukan",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, username, email, password, role_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
      role_id: role_id,
    });

    if (user) {
      return res.status(201).json({
        message: "Berhasil input data pengguna",
        data: user,
      });
    }
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Data pengguna tidak ditemukan",
      });
    }

    const { name, username, email, role_id } = req.body;

    user.name = name;
    user.username = username;
    user.email = email;
    user.role_id = role_id;
    await user.validate();
    await user.save();

    return res.status(201).json({
      message: "Berhasil memperbarui data pengguna",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "Data pengguna tidak ditemukan",
      });
    }

    if (await user.destroy()) {
      return res.status(201).json({
        message: "Berhasil menghapus data pengguna",
      });
    }
  } catch (error) {
    return next(error);
  }
};

const changeUsersPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Data pengguna tidak ditemukan",
      });
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.validate();
    await user.save();

    return res.status(201).json({
      message: "Berhasil memperbarui data pengguna",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeUsersPassword,
};
