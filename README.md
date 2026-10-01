Dr. Chantell's TaskMaster Backend

Project Overview

In this project, I built the backend for TaskMaster using Node.js, Express, MongoDB Atlas, Mongoose, bcrypt, JSON Web Tokens, and dotenv.

The API allows users to register, log in, create their own projects, and create tasks inside those projects. I also added security so users cannot access another user's projects or tasks.

Technologies Used

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- bcrypt
- JSON Web Tokens
- dotenv

Project Structure

Dr-Chantells-TaskMaster-Backend/
  config/
    db.js
  models/
    User.js
    Project.js
    Task.js
  routes/
    api/
      userRoutes.js
      projectRoutes.js
      taskRoutes.js
  utils/
    authMiddleware.js
  .gitignore
  package.json
  package-lock.json
  README.md
  Reflection.MD
  server.js

Setup

1. Open the project in VS Code.
2. Run npm install.
3. Create a .env file in the project root.
4. Add your MONGO_URI, JWT_SECRET, and PORT.
5. Run npm start.

Example .env values:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000

API Endpoints

User Routes

POST /api/users/register
POST /api/users/login

Project Routes

POST /api/projects
GET /api/projects
GET /api/projects/:id
PUT /api/projects/:id
DELETE /api/projects/:id

Task Routes

POST /api/projects/:projectId/tasks
GET /api/projects/:projectId/tasks
PUT /api/tasks/:taskId
DELETE /api/tasks/:taskId

Security

Passwords are hashed with bcrypt before they are saved.

JWT tokens protect private routes.

Users can only access projects they own.

Task authorization checks the owner of the parent project before allowing changes.

Testing

I tested the API endpoints using Postman. Protected routes require a valid Bearer token. I also tested that one user cannot access, update, or delete another user's projects or tasks.

Author:
Dr. Chantell McDowell
Per Scholas Student
