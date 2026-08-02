const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // Get the Authorization header
    const authHeader = req.header("Authorization");
    // Check if header exists
    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Remove "Bearer " from the token
        const token = authHeader.replace("Bearer ", "");
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Store the user ID in the request object for later use
        req.user = decoded;
        // Continue to next function
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token." });
    }
};

module.exports = authMiddleware;