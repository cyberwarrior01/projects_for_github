// Import the Express.js module
const express = require("express");

// Import the controller functions for handling contact-related operations
const { getcontacts, getcontact, createcontact, updatecontact, deletecontact } = require("../Controllers/contactController");
const authMiddleware = require("../Middlewares/authMiddleware ");

// Create an instance of the Express Router
const router = express.Router();

// Apply authentication middleware for all routes in this router
router.use(authMiddleware);

// Define routes for handling various HTTP methods on the "/api/contact" endpoint
router.route("/")
  .get(getcontacts)   // GET /api/contact - Retrieve all contacts
  .post(createcontact);  // POST /api/contact - Create a new contact

router.route("/:id")
  .get(getcontact)   // GET /api/contact/:id - Retrieve a contact by ID
  .put(updatecontact)  // PUT /api/contact/:id - Update a contact by ID
  .delete(deletecontact);  // DELETE /api/contact/:id - Delete a contact by ID

// Export the router for use in other parts of the application
module.exports = router;
