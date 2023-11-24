// Import route parameter handling (assuming it's used elsewhere, though it's not used in this file)
const { param } = require("../Routes/contactRoutes");
const Contact = require("../Models/contactModel");

// Function to handle GET request for retrieving all contacts
const getcontacts = async (req, res) => {
  try {
    // Retrieve all contacts from the database
    const data = await Contact.find({ user_id: req.user._id });

    // Check if any contacts were found
    if (data.length === 0) {
      // If no contacts are found, respond with a 404 status and a message
      return res.status(404).json({ message: "No contacts found" });
    }

    // If contacts are found, respond with a 200 status and the contact data
    res.status(200).json(data);
  } catch (error) {
    // Handle any potential errors during the database query
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to handle GET request for retrieving a contact by ID
const getcontact = async (req, res) => {
  try {
    // Extract contact ID from request parameters
    const contactID = req.params.id;

    // Retrieve contact from the database by ID
    const data = await Contact.findById(contactID);

    // Check if a contact with the specified ID is found
    if (!data) {
      // If no contact is found, respond with a 404 status and a corresponding message
      return res.status(404).json({ message: "Contact not found" });
    }

    // If a contact is found, respond with a 200 status and the contact data
    res.status(200).json(data);
  } catch (error) {
    // Handle any potential errors during the database query
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to handle POST request for creating a new contact
const createcontact = async (req, res) => {
  // Extracting data from the request body
  const { name, email, phone } = req.body;

  try {
    // Check if required fields are provided
    if (!name || !email || !phone) {
      // Use 400 status for bad request
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if a contact with the same email already exists
    const existingContact = await Contact.findOne({ email });

    if (existingContact) {
      // Use 409 status for conflict (resource already exists)
      return res.status(409).json({ message: "Contact email is already saved" });
    }

    // Creating a new instance of the Contact model
    const newContact = await Contact.create({ name, email, phone, user_id: req.user._id });

    // Responding with a success message and the created contact
    res.status(201).json({ message: "Contact created successfully", newContact });
  } catch (error) {
    // Handle any potential errors during the process
    console.error(error);
    // Use 500 status for internal server error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to handle PUT request for updating a contact by ID
const updatecontact = async (req, res) => {
  try {
    // Use findByIdAndUpdate to update the contact by ID with the data from the request body
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id, // Contact ID obtained from request parameters
      req.body, // Updated data obtained from request body
      { new: true } // Option to return the updated contact in the response
    );

    // If the contact is not found, respond with a 404 status and a message
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // If the contact is updated successfully, respond with a 200 status and a message
    res.status(200).json({
      message: `Contact updated successfully with ID ${req.params.id}`,
      updatedContact,
    });
  } catch (error) {
    // Handle any potential errors during the database update
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to handle DELETE request for deleting a contact by ID
const deletecontact = async (req, res) => {
  try {
    // Use findByIdAndDelete to delete the contact by ID
    const deletedContact = await Contact.findByIdAndDelete(
      req.params.id // Contact ID obtained from request parameters
    );

    // If the contact is not found, respond with a 404 status and a message
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // If the contact is deleted successfully, respond with a 200 status and a message
    res.status(200).json({
      message: `Contact deleted successfully with ID ${req.params.id}`,
      deletedContact,
    });
  } catch (error) {
    // Handle any potential errors during the database deletion
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Export the functions for use in other parts of the application
module.exports = {
  getcontacts,
  getcontact,
  createcontact,
  updatecontact,
  deletecontact,
};
