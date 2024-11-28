const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Return user info (Optionally, send JWT token instead of user data)
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error during login" });
  }
});

// Signup Route
app.post("/api/signup", async (req, res) => {
  const { email, password, name, role = "reader" } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    name,
    role,
  });

  try {
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error during signup" });
  }
});

// Delete User Route
app.delete("/api/users/:email", async (req, res) => {
  const { email } = req.params;
  try {
    await User.findOneAndDelete({ email });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
