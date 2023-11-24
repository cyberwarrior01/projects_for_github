const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../Models/userModel")

// Route for register
//  METHOD POST
// Controller for user registration
const regsterUser = async (req, res) => {
  // Extracting user information from the request body
  const { username, email, password, cpassword } = req.body;

  try {
    // Checking if mandatory fields are provided
    if (!username || !email || !password || !cpassword) {
      res.status(400).json({ message: "All the fields are mandatory" });
    } else {
      // Checking if the entered passwords match
      if (password !== cpassword) {
        res.status(400).json({ message: "Passwords do not match" });
      } else {
        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Checking if the user with the provided email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          res.status(400).json({ message: "User already registered" });
        } else {
          // Creating a new user in the database
          const createdUser = await User.create({
            username,
            email,
            password: hashedPassword,
          });

          res.status(200).json({ message: "User created successfully", createdUser });
        }
      }
    }
  } catch (error) {
    // Handling server errors
    res.status(500).json({ message: "Server error" });
  }
};




// Route for login
// METHOD POST
const loginUser = async (req, res) => {
  // Extracting user login information from the request body
  const { email, password } = req.body;

  try {
    // Checking if mandatory fields are provided
    if (!email || !password) {
      res.status(400).json({ message: "All the fields are mandatory" });
    } else {
      // Finding the user with the provided email in the database
      const user = await User.findOne({ email });

      // Checking if the user exists
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        // Comparing the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Checking if the passwords match
        if (passwordMatch) {
          // Retrieving the JWT secret key from environment variables
          const secretKey = process.env.Secret_key;

          // Generating a JWT token
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            secretKey, // Replace with a secure secret key
            { expiresIn: '1h' } // Token expiration time
          );

          // If passwords match, returning user information and the generated token
          res.status(200).json({ user: { _id: user._id, username: user.username, email: user.email }, token });
        } else {
          // If passwords do not match, returning an error message
          res.status(401).json({ message: "Invalid credentials" });
        }
      }
    }
  } catch (error) {
    // Handling server errors
    console.error('Error during user login:', error);
    res.status(500).json({ message: "Server error" });
  }
};







// Route for currentuser
// METHOD GET
const currentUser = async (req, res) => {
  res.status(200).json({ message: "i am current_user api" });
};
 
module.exports = { regsterUser, loginUser, currentUser };
