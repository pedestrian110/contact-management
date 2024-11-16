import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.model.js";

export default async function authMiddleware(req, res, next) {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    // If no token is provided, respond with a 401 error
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
      });
    }

    // Verify and decode the token
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    // Extract userId from the decoded token
    const { userId } = decoded;

    // Fetch the user from the database
    const user = await User.findById(userId);

    // If no user is found, respond with a 404 error
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Attach the user object to the request
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error) {
    // Log the error for debugging
    console.error("Authentication error:", error);

    // Handle different types of errors from jsonwebtoken
    if (error instanceof jsonwebtoken.TokenExpiredError) {
      return res.status(401).json({
        message: "Unauthorized: Token expired",
      });
    } else if (error instanceof jsonwebtoken.JsonWebTokenError) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token",
      });
    }

    // Fallback for any other unexpected errors
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
