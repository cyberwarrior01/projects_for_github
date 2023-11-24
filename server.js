// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./Config/conndb");

// Load environment variables from the .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Connect to the database using the connectToDatabase function
connectToDatabase()
  .then(() => {
    // Middleware to parse incoming JSON requests
    app.use(express.json());

    // Routes
    // Use the contactRoutes for any requests starting with "/api/contact"
    app.use("/api/contact", require("./Routes/contactRoutes"));
    app.use("/api/user", require("./Routes/userRoutes"));

    // Start the server and listen on the specified port from environment variables
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`The server is on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Terminate the application process with an exit code of 1
  });
