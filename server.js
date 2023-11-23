// Import required modules
const express = require("express");
const dotenv = require("dotenv").config();

// Import the connectToDatabase function from the specified file
const connectToDatabase = require("./Config/conndb");

// Create an instance of the Express application
const app = express();

// Connect to the database using the connectToDatabase function
connectToDatabase();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Routes
// Use the contactRoutes for any requests starting with "/api/contact"
app.use("/api/contact", require("./Routes/contactRoutes"));

// Start the server and listen on the specified port from environment variables
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`The server is on port ${port}`);
});
