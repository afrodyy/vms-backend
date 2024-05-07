const router = require("express").Router();
const {
  getRoles,
  createRole,
  getRoleById,
  updateRole,
  deleteRole,
} = require("../controller/roleController.js");

router.get("/role", getRoles);
router.get("/role/:id", getRoleById);
router.post("/role", createRole);
router.put("/role/:id", updateRole);
router.delete("/role/:id", deleteRole);

module.exports = router;
