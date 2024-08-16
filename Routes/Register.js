// Main express route handlers
const express = require("express");
const router = express.Router();

// Controllers
const controllers = require("../Controllers");

// Route handler
router.post("/register", controllers.registerController.registerUser);

module.exports = router;