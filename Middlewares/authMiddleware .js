const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    // Extracting the JWT token from the request header
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verifying and decoding the JWT token
    const decoded = jwt.verify(token, process.env.Secret_key);

    // Assuming the decoded token contains user information
    const { userId, email } = decoded;

    // Adding user information to the request object
    req.user = { _id: userId, email };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handling token verification errors
    console.error('Error during authentication:', error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
