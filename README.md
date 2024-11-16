# Contact Management Application

## Overview

A full-stack application for managing contacts, built with **Node.js**, **Express.js**, **MongoDB**, and **React.js**. The application allows users to register, authenticate, and perform CRUD operations on their personal contact list. The project includes protected routes using JWT for secure user authentication.

---

## Features

- **User Authentication**: Secure registration and login with hashed passwords.
- **CRUD Operations**: Users can create, read, update, and delete contacts.
- **Protected API Routes**: Only logged-in users can access their data.
- **Responsive UI**: Built with React.js to ensure a seamless user experience.

---

## Project Structure

### Backend

- **`controllers/`**  
  Contains logic for user authentication and contact management:
  - `auth.controller.js`: Handles user registration, login, and fetching logged-in user details.
  - `contact.controller.js`: Manages CRUD operations for contacts.

- **`models/`**  
  Defines MongoDB schemas:
  - `user.model.js`: Schema for storing user credentials.
  - `contact.model.js`: Schema for storing contact details.

- **`middleware/`**  
  Middleware for authentication:
  - `auth-middleware.js`: Validates JWT tokens and authenticates users.

- **`lib/`**  
  Helper for database connection:
  - `connect.js`: Establishes connection with MongoDB.

- **`routes/`**  
  API route definitions:
  - `auth.route.js`: Routes for authentication.
  - `contact.route.js`: Routes for managing contacts.

- **`index.js`**  
  Entry point for the backend server.

### Frontend

- **`components/`**  
  Reusable React components:
  - `Contact.js`: Component for displaying and managing contacts.
  - `Login.js`: Component for user login.
  - `Register.js`: Component for user registration.
  - `ProtectedRoute.js`: Higher-order component for protected routes.

- **`hooks/`**  
  - `useAuth.js`: Custom hook for managing user authentication state.

- **`pages/`**  
  Application pages:
  - `NotFound.js`: Displays a 404 error for invalid routes.

- **`styles/`**  
  - `App.css`: CSS styles for the frontend.

- **`App.js`**  
  Main application component for routing and layout.

- **`Router.jsx`**  
  Sets up React Router for navigation.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) installed.
- [MongoDB](https://www.mongodb.com/) installed and running locally or using a cloud database like MongoDB Atlas.

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in the backend directory with the following variables:
   MONGODB_URI=mongodb://localhost:27017/contact-manager
   JWT_SECRET=your_secret_key
   PORT=8000
4. Start the backend server:
   ```bash
   npm start 

### Frontend Setup  

1. Navigate to the frontend directory:
   ```bash
   cd frontend
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in the frontend directory with the following variable:
   REACT_APP_API_BASE_URL=http://localhost:8000/api
4. Start the React development server:
   ```bash
   npm start


# API Endpoints 

## Authentication Endpoints

| **Endpoint**            | **Method** | **Description**                                    | **Request Body**                                                                                                                                     | **Response**                                                                                                                                                                   |
|-------------------------|------------|----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/api/auth/register`    | `POST`     | Registers a new user and returns a JWT token.      | ```json { "email": "user@example.com", "password": "password123" } ```                                                                              | **Success** (200): ```json { "message": "Registration successful", "token": "jwt_token_here" }``` <br> **Error** (400): Invalid details. <br> **Error** (500): Internal error. |
| `/api/auth/login`       | `POST`     | Logs in an existing user and returns a JWT token.  | ```json { "email": "user@example.com", "password": "password123" } ```                                                                              | **Success** (200): ```json { "message": "Login successful", "token": "jwt_token_here" }``` <br> **Error** (401): Invalid credentials. <br> **Error** (500): Internal error.     |
| `/api/auth/user`        | `GET`      | Fetches the details of the logged-in user.         | **Headers**: ```json { "Authorization": "Bearer jwt_token_here" }```                                                                                 | **Success** (200): ```json { "userId": "user_id_here", "email": "user@example.com" }``` <br> **Error** (401): Unauthorized access. <br> **Error** (500): Internal error.    |

---

## Contact Management Endpoints

| **Endpoint**              | **Method** | **Description**                                        | **Request Body**                                                                                                                                           | **Response**                                                                                                                                                                         |
|---------------------------|------------|--------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/api/contacts/create`    | `POST`     | Creates a new contact for the logged-in user.          | **Headers**: ```json { "Authorization": "Bearer jwt_token_here" }``` <br> ```json { "name": "John Doe", "email": "john@example.com", "phone": "1234567890", "company": "Example Corp", "jobTitle": "Software Engineer" } ``` | **Success** (201): ```json { "message": "Contact created successfully", "contact": { "name": "John Doe", "email": "john@example.com", "phone": "1234567890", "company": "Example Corp", "jobTitle": "Software Engineer" } }``` <br> **Error** (400): Missing required fields. <br> **Error** (500): Internal error. |
| `/api/contacts`           | `GET`      | Fetches all contacts for the logged-in user.           | **Headers**: ```json { "Authorization": "Bearer jwt_token_here" }```                                                                                     | **Success** (200): ```json [{ "name": "John Doe", "email": "john@example.com", "phone": "1234567890", "company": "Example Corp", "jobTitle": "Software Engineer", "userId": "user_id_here" }]``` <br> **Error** (500): Internal error. |
| `/api/contacts/contact/:id` | `GET`    | Fetches a single contact by ID for the logged-in user. | **Headers**: ```json { "Authorization": "Bearer jwt_token_here" }```                                                                                     | **Success** (200): ```json { "name": "John Doe", "email": "john@example.com", "phone": "1234567890", "company": "Example Corp", "jobTitle": "Software Engineer", "userId": "user_id_here" }``` <br> **Error** (404): Contact not found. <br> **Error** (500): Internal error. |
| `/api/contacts/update/:id` | `PUT`     | Updates a contact by ID for the logged-in user.       | **Headers**: ```json { "Authorization": "Bearer jwt_token_here" }``` <br> ```json { "name": "Jane Doe", "email": "jane@example.com", "phone": "0987654321", "company": "Another Corp", "jobTitle": "Product Manager" }``` | **Success** (200): ```json { "message": "Contact updated successfully", "updatedContact": { "name": "Jane Doe", "email": "jane@example.com", "phone": "0987654321", "company": "Another Corp", "jobTitle": "Product Manager" } }``` <br> **Error** (404): Contact not found. <br> **Error** (500): Internal error. |
| `/api/contacts/delete/:id` | `DELETE`  | Deletes a contact by ID for the logged-in user.       | **Headers**: ```json { "Authorization": "Bearer jwt_token_here" }```                                                                                     | **Success** (200): ```json { "message": "Contact deleted successfully" }``` <br> **Error** (404): Contact not found. <br> **Error** (500): Internal error. |

---

## Usage

### Register
Create an account using the registration form. You will need to provide a valid email and password.

### Login
Access your account using valid credentials. After logging in, you will receive a JWT token that you can use to authenticate and access your contacts.

### Manage Contacts
- **Add new contacts**: Add new contacts with details such as name, email, phone, company, and job title.
- **View your contact list**: See all the contacts associated with your account.
- **Edit or delete existing contacts**: Update or remove contacts from your list.

### Secure Routes
All contact-related operations are protected and require authentication. A valid JWT token must be included in the authorization header to access these endpoints.

---

## Technology Stack

- **Frontend**: React.js, React Router, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

---

## Future Improvements

- **Add search and filter functionalities**: Allow users to search and filter contacts by various criteria like name, email, or company.
- **Deploy the application**: Deploy the application on platforms like Heroku or Vercel to make it publicly accessible.

---

