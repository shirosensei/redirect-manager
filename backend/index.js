require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const redirectRoutes = require('./routes/redirectRoutes');
const app = express();
const path = require('path');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));


// //? Protected admin route (example: redirection management)

  

//* admin routes
app.use('/admin', authRoutes);

// * Redirection routes
app.use('/dashboard', redirectRoutes);




// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
