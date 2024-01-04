// routes/authRoutes.js
const express = require("express");
const { register, login } = require("../controllers/auth");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateToken, (req, res) => {
  // Access the authenticated user's information
  res.json(req.user);
});

module.exports = router;
