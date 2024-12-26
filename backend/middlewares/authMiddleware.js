const jwt = require('jsonwebtoken');

//! Middleware to protect routes
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).send('Token is required');
  }

  const token = authHeader.split(' ')[1]; //* Extract token from "Bearer <token>"

  if (!token) {
    return res.status(403).send('Token is required');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    req.userId = decoded.id; // Attach the decoded user ID to the request object
    next(); //todo Proceed to the next middleware or controller
  });
};

module.exports = verifyToken;