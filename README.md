# Note-Taking Application

A full-stack note-taking application that allows users to create, view, edit, and delete personal notes.

This application was created using Node.js, Express.js, RESTful APIs, MongoDB, JWT authentication, and full-stack communication between the frontend and backend.

Users can register, log in, and manage their own notes. JWT authentication ensures that users can only access and modify their personal note collection.

---

# Technologies Used

## Frontend

- HTML
- CSS
- JavaScript

## Backend

- Node.js
- Express.js
- Mongoose
- MongoDB
- bcrypt
- JSON Web Tokens (JWT)

---

# Installation Instructions

## Requirements

Before running this application, install:

- Node.js
- MongoDB
- Git

---

# Clone Git Repository

Clone the repository:

Navigate into the server folder:
- cd note-taking-app/server

---

# Install Dependencies

Install all required packages:
- in the server folder open terminal and enter npm install

This will automatically install the dependencies:

- Express.js
- Mongoose
- bcrypt
- jsonwebtoken
- dotenv
- cors

---

# Environment Variables

Create a file named:

```
.env
```

inside the `server` folder.

Add the following:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/noteapp
JWT_SECRET=(enter your secret value here)
```

---

# Run the Application

The application will run at:

```
http://localhost:5000
```

---

# Front-End Pages

| Page | URL |
|---|---|
| Login | http://localhost:5000/index.html |
| Register | http://localhost:5000/register.html |
| Notes Dashboard | http://localhost:5000/notes.html |

---

# API Endpoints

## Authentication Routes

All authentication routes begin with:

```
/api/auth
```

---

## Register User

**POST**

```
/api/auth/register
```

Request body:

```json
{
  "username": "example",
  "email": "example@email.com",
  "password": "password123"
}
```

Creates a new user account.

---

## Login User

**POST**

```
/api/auth/login
```

Request body:

```json
{
  "email": "example@email.com",
  "password": "password123"
}
```

Returns a JWT token used for accessing protected routes.

---

# Notes Routes

All note routes require authentication.

Include the JWT token in the request header:

```
Authorization: Bearer TOKEN
```

---

## Get Notes

**GET**

```
/api/notes
```

Returns all notes belonging to the logged-in user.

---

## Create Note

**POST**

```
/api/notes
```

Request body:

```json
{
  "title": "My Note",
  "content": "This is my note content"
}
```

Creates a new note for the logged-in user.

---

## Update Note

**PUT**

```
/api/notes/:id
```

Request body:

```json
{
  "title": "Updated Title",
  "content": "Updated content"
}
```

Updates an existing note.

---

## Delete Note

**DELETE**

```
/api/notes/:id
```

Deletes a note belonging to the logged-in user.

---

# Learning & Difficulties

Developing this project helped me understand how the different parts of a full-stack application communicate. I learned how frontend applications send HTTP requests to backend APIs and how the server processes requests before interacting with a database.

Some challenges I encountered included implementing JWT authentication, understanding how tokens are stored and used locally, connecting MongoDB with Mongoose, and debugging issues between the frontend and backend.

I spent time testing API requests using the Thunder Client extension to troubleshoot why data was not being saved correctly to the database. I also learned the importance of consistency with naming conventions because case sensitivity caused issues that required adjustments to file names, routes, and functions.

I learned the importance of organizing backend code using models, controllers, routes, and middleware. Building the backend first and creating each operation step by step helped me understand how each part of the application worked and made debugging easier.

Implementing note editing was another challenge because it required connecting the frontend interface with the backend update route. Troubleshooting this process improved my understanding of how frontend components communicate with RESTful APIs.

This project improved my confidence working with Node.js, Express.js, MongoDB, JWT authentication, and RESTful API development.

Future improvements could include adding note categories, search functionality, note timestamps, profile management, and additional user interface improvements.

---
