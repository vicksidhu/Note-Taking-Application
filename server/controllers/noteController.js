const Note = require("../models/Note");

// Create a new note
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        // Basic validation
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required." });
        }

        // Create the note
        const newNote = await Note.create({
            title,
            content,
            user: req.user.id
        });

        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({
            message: "Error creating note.",
            error: error.message
        });
    }
};

// Get all notes for the authenticated user
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching notes.",
            error: error.message
        });
    }
};

//Update a note
const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.findOne({ _id: req.params.id, user: req.user.id });

        if (!note) {
            return res.status(404).json({ message: "Note not found." });
        }

        // Update the note fields
        note.title = title || note.title;
        note.content = content || note.content;

        await note.save();
        res.status(200).json(note);

    } catch (error) {
        res.status(500).json({
            message: "Error updating note.",
            error: error.message
        });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
        if (!note) {
            return res.status(404).json({ message: "Note not found." });
        }

        await note.deleteOne();
        res.status(200).json({ message: "Note deleted successfully." });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting note.",
            error: error.message
        });
    }
};


module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote
};