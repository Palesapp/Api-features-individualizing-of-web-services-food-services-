// Import required modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Log environment variables to debug issues
console.log('Environment Variables:');
console.log('MongoDB URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

// Get MongoDB URI from environment variables
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('MongoDB URI is not defined. Please check your .env file.');
  process.exit(1); // Exit the application if the MongoDB URI is not defined
}

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the application if there is an error connecting to MongoDB
  });

// Middleware
app.use(express.json());

// Routes
const usersRouter = require('./routes/users');
const sampleRouter = require('./routes/sampleRoute');
const ordersRouter = require('./routes/orders');

app.use('/api/users', usersRouter);
app.use('/api/samples', sampleRouter);
app.use('/api/orders', ordersRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
