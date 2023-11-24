const mongoose = require("mongoose");

// Define the user schema with username, email, and password fields
const Userschema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });  // Include timestamps for createdAt and updatedAt

module.exports = mongoose.model("User", Userschema);  // Export the User model
