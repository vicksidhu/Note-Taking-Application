const mongoose = require("mongoose");

// Define the Note schema
const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Export the Note model
module.exports = mongoose.model("Note", noteSchema);