const { Role, User } = require("../models");

const getRoles = async (req, res, next) => {
  try {
    const roles = await Role.findAll();

    if (roles.length > 0) {
      return res.status(200).json({
        message: "Menampilkan seluruh role user",
        data: roles,
      });
    }

    return res.status(404).json({
      message: "Tidak ada data role user",
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const getRoleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (role) {
      return res.status(200).json({
        message: "Menampilkan role user berdasarkan id",
        data: role,
      });
    }

    return res.status(404).json({
      message: "Role user tidak ditemukan",
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const createRole = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const newRole = await Role.create({
      name: name,
      description: description,
    });

    if (newRole) {
      return res.status(201).json({
        message: "Role created successfully",
        data: newRole,
      });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (role) {
      const { name, description } = req.body;

      role.name = name;
      role.description = description;
      await role.validate();
      await role.save();

      return res.status(200).json({
        message: "Role updated successfully",
        data: role,
      });
    }

    return res.status(404).json({
      message: "Role user tidak ditemukan",
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (role) {
      await role.destroy();

      return res.status(201).json({
        message: "Data role user berhasil dihapus",
      });
    }

    return res.status(404).json({
      message: "Role user tidak ditemukan",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
