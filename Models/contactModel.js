// Import the mongoose library
const mongoose = require("mongoose");

// Define a mongoose schema for the Contact model
const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Add timestamps to track creation and modification dates

// Create a Contact model based on the defined schema
module.exports = mongoose.model("Contact", contactSchema);
