const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//todo Login endpoints
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // todo - Find the user by username
    const [admin] = await pool.query("SELECT * FROM admin WHERE username = ?", [
      username,
    ]);

    if (admin.length === 0) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // * Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, admin[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // ! Generate a JWTtoken
    const token = jwt.sign({ id: admin[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//* Endpoint to create user
const createAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // ! Check if the user already exits
    const [rows] = await pool.query("SELECT * FROM admin WHERE username = ?", [
      username,
    ]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    //? Hash the password
    const hashedPassword = await hashPassword(password);

    //todo Insert new user into the database
    await pool.query("INSERT INTO admin (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);

    return res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "server error" });
  }
};

//? Function to hash password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

module.exports = { createAdmin, login };
