const express = require('express');
const router = express.Router();
const { getRedirections, updateRedirection } = require('../controllers/redirectionController');
const verifyToken = require('../middlewares/authMiddleware'); // Import the JWT middleware

// Route to fetch all redirection scenarios
router.get('/redirections', verifyToken, getRedirections);

// Route to update a redirection scenario
router.post('/redirections', verifyToken, updateRedirection);

module.exports = router;
