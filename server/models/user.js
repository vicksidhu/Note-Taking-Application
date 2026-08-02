const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Export the User model
module.exports = mongoose.model("User", userSchema);