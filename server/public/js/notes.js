// Get the token from local storage
const token = localStorage.getItem("token");

// If no token is found, redirect to the login page
if (!token) {
    window.location.href = "index.html";
}

// load notes when the page loads
loadNotes();

async function loadNotes() {
    const response = await fetch("/api/notes", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const notes = await response.json();
    displayNotes(notes);
}

// Function to display notes on the page
function displayNotes(notes) {
    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";

    notes.forEach(note => {
        const noteElement = document.createElement("div");

        noteElement.innerHTML = `
        <div id="view-${note._id}">
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button onclick="showEditForm('${note._id}')">Edit</button>
            <button onclick="deleteNote('${note._id}')">Delete</button>
        </div>
        <div id="edit-${note._id}" style="display: none;">
        <input id="editTitle-${note._id}" value="${note.title}">
        <textarea id="editContent-${note._id}">${note.content}</textarea>
        <button onclick="saveEdit('${note._id}')">Save</button>
        <button onclick="cancelEdit('${note._id}')">Cancel</button>
        </div>
            `;

        notesContainer.appendChild(noteElement);
    });
}

const noteForm = document.getElementById("noteForm");

// Handle form submission for creating a new note
if (noteForm) {
    noteForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;

        const response = await fetch("/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, content })
        });

        const newNote = await response.json();

        if (response.ok) {
            // Clear the form fields
            document.getElementById("title").value = "";
            document.getElementById("content").value = "";
            // Reload the notes to include the new note
            loadNotes();
        } else {
            document.getElementById("message").textContent = newNote.message || "An error occurred. Please try again.";
        }
    });
}

// Function to delete a note
async function deleteNote(id) {
    const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (response.ok) {
        // Reload the notes after deletion
        loadNotes();
    }
}

// Function to show the edit form for a note
function showEditForm(id) {
    document.getElementById(`view-${id}`).style.display = "none";
    document.getElementById(`edit-${id}`).style.display = "block";
}

// Function to cancel the edit form for a note
function cancelEdit(id) {
    document.getElementById(`view-${id}`).style.display = "block";
    document.getElementById(`edit-${id}`).style.display = "none";
}

// Function to save the edited note
async function saveEdit(id) {
    const title = document.getElementById(`editTitle-${id}`).value;
    const content = document.getElementById(`editContent-${id}`).value;

    const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
    });

    const updatedNote = await response.json();

    if (response.ok) {
        // Reload the notes after saving the edit
        loadNotes();
    } else {
        document.getElementById("message").textContent = updatedNote.message || "An error occurred. Please try again.";
    }
}

// Handle logout
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        // Clear the token from local storage
        localStorage.removeItem("token");
        // Redirect to the login page
        window.location.href = "index.html";
    });
}