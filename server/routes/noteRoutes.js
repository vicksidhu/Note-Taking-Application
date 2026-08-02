const express = require("express");
const router = express.Router();

const { createNote, getNotes, updateNote, deleteNote } = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to create a new note (protected route)
router.post("/", authMiddleware, createNote);
// Route to get all notes for the authenticated user (protected route)
router.get("/", authMiddleware, getNotes);
// Route to update a note (protected route)
router.put("/:id", authMiddleware, updateNote);
// Route to delete a note (protected route)
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;
