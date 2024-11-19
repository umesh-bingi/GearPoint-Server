const express = require('express');
const app = express();
// const cors = require('cors');
const port = 3000;

// Middleware
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from your frontend
 // Enable CORS for all origins (or restrict as necessary)
app.use(express.json()); // To parse JSON request bodies

// DB Connection
const db = require('./config/db'); // Ensure this connects to your MongoDB correctly

// Route imports
const Bikes = require('./routes/BikesRoute');
const Users = require('./routes/UserRoute');
const Orders = require('./routes/OrderRoute');
const Auth = require('./routes/AuthRoute');
const AccessoriesRoute = require('./routes/AccessoriesRoute');
const QueriesRoute = require('./routes/QueriesRoute'); // Import Queries route

// Test route
app.get('/', (req, res) => res.status(200).json({ message: "Welcome" }));

// Use routes
app.use('/bikes', Bikes);          // Products route
app.use('/users', Users);          // Users route
app.use('/orders', Orders);        // Orders route
app.use('/auth', Auth);            // Auth route
app.use('/accessories', AccessoriesRoute); // Accessories route
app.use('/queries', QueriesRoute); // Queries route

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`));
