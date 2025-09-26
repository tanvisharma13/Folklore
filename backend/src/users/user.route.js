const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// LOGIN Route (User + Admin)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Authentication successful",
      token: token,
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Failed to login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Admin Login Route (Updated to Use bcrypt.compare and Role Check)
router.post("/admin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await User.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    // Check if the user has the 'admin' role
    if (admin.role !== 'admin') {
      return res.status(403).json({ message: "You are not authorized to login as admin!" });
    }

    // Compare hashed passwords for admin login
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    // Generate JWT Token for admin
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Authentication successful",
      token: token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Failed to login as admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
