const express = require('express');
const router = express.Router();
const { login, createAdmin } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware'); // Import the JWT middleware

//* Route to create a new admin
router.post('/create', createAdmin);

// ! Route to login as admin
router.post('/login', login);

//* Protected route JWT authentication
router.get('/dashboard', verifyToken, (req, res) => {
    // res.render('adminDashboard');
    res.status(200).json({ mesage : 'Welcome to the admin dashboard!'});
})

module.exports = router;
