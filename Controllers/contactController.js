// Import route parameter handling (assuming it's used elsewhere, though it's not used in this file)
const { param } = require("../Routes/contactRoutes");

// Function to handle GET request for retrieving all contacts
const getcontacts = (req, res) => {
    res.status(200).json({ message: "I am a GET API to get all contacts" });
}

// Function to handle GET request for retrieving a contact by ID
const getcontact = (req, res) => {
    res.status(200).json({ message: `I am a GET API to get contact of the given ID ${req.params.id}` });
}

// Function to handle POST request for creating a new contact
const createcontact = (req, res) => { 
    res.status(200).json({ message: "I am a POST API to create contact" });
}

// Function to handle PUT request for updating a contact by ID
const updatecontact = (req, res) => {
    res.status(200).json({ message: `I am a PUT API to update contact of the given ID ${req.params.id}` });
}

// Function to handle DELETE request for deleting a contact by ID
const deletecontact = (req, res) => {
    res.status(200).json({ message: `I am a DELETE API for deleting contact of the given ID ${req.params.id}` });
}

// Export the functions for use in other parts of the application
module.exports = { getcontacts, getcontact, createcontact, updatecontact, deletecontact };
