const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeUsersPassword,
} = require("../controller/userController");

router.get("/user", getUsers);
router.get("/user/:id", getUserById);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.put("/user/:id/change-password", changeUsersPassword);

module.exports = router;
