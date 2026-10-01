Dr. Chantell's TaskMaster Backend

Project Overview

In this project, I built the backend for TaskMaster using Node.js, Express, MongoDB Atlas, Mongoose, bcrypt, JSON Web Tokens, and dotenv.

The API allows users to register, log in, create their own projects, and create tasks inside those projects. I also added security so users cannot access another user's projects or tasks.

What I Practiced

- Node.js and Express
- MongoDB Atlas and Mongoose
- RESTful API routes
- User registration and login
- Password hashing with bcrypt
- JWT authentication
- Authorization and ownership checks
- CRUD operations
- Mongoose model relationships
- Environment variables

Project Structure

Dr_Chantell's_TaskMaster_Backend/
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
  README.md
  POSTMAN_TESTING.md
  package-lock.json
  server.js

How to Set Up the Project

1. Open this folder in VS Code.
2. Open the terminal.
3. Run:

npm install

4. Create a `.env` file in the project root.
5. Set `MONGO_URI` to your MongoDB connection string.
6. Set `JWT_SECRET` to a long, random secret.
7. Set `PORT=3000`.
8. Start the server with:

npm start

If everything is working, the terminal should show:

MongoDB connected successfully!
Server is running on port 3000

API Endpoints

User Routes

POST /api/users/register
Registers a new user.

Example JSON:

{
  "username": "chantell",
  "email": "chantell@example.com",
  "password": "Password123"
}

POST /api/users/login
Logs in a user and returns a JWT token.

Example JSON:

{
  "email": "chantell@example.com",
  "password": "Password123"
}

Project Routes

These routes require a Bearer token.

POST /api/projects
Creates a project.

GET /api/projects
Gets all projects owned by the logged-in user.

GET /api/projects/:id
Gets one project if the logged-in user owns it.

PUT /api/projects/:id
Updates a project if the logged-in user owns it.

DELETE /api/projects/:id
Deletes a project if the logged-in user owns it.

Task Routes

These routes require a Bearer token.

POST /api/projects/:projectId/tasks
Creates a task inside a project owned by the logged-in user.

GET /api/projects/:projectId/tasks
Gets all tasks from a project owned by the logged-in user.

PUT /api/tasks/:taskId
Updates a task only if the logged-in user owns the task's parent project.

DELETE /api/tasks/:taskId
Deletes a task only if the logged-in user owns the task's parent project.

How to Use the JWT Token in Postman

1. Log in using POST /api/users/login.
2. Copy the token from the response.
3. Open the Authorization tab in Postman.
4. Choose Bearer Token.
5. Paste the token.
6. Test the protected project and task routes.

Security Testing

I should test these situations:

- Try a protected route without a token. It should return 401.
- Log in as User A and create a project.
- Log in as User B and try to access User A's project. It should return 403.
- Try to update or delete another user's task. It should return 403.
- Make sure .env is not pushed to GitHub.

Challenge

The most challenging part for me was understanding the authorization checks. Authentication proves that a user is logged in, but authorization makes sure that the user only works with data they actually own. I handled this by checking the logged-in user's ID against the owner of each project before allowing project or task changes.

Author:
Dr. Chantell McDowell
Per Scholas Student
