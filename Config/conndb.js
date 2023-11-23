// Import the mongoose library
const mongoose = require("mongoose");

// Asynchronous function to connect to the MongoDB database
const connectToDatabase = async () => {
    try {
        // Attempt to establish a connection to the database using the connection string from the environment variables
        const conn = await mongoose.connect(process.env.Con_String);
        
        // Log a success message with the connected host
        console.log(`The connection is successful. Connected to MongoDB on host: ${conn.connection.host}`);
    } catch (error) {
        // Log any errors that occur during the connection attempt
        console.log(error.message);
        
        // Terminate the application process with an exit code of 1 if an error occurs
        process.exit(1);
    }
}

// Export the connectToDatabase function for use in other parts of the application
module.exports = connectToDatabase;
