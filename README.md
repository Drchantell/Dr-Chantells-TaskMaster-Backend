Dr. Chantell's TaskMaster Backend

I built TaskMaster as a backend REST API using Node.js, Express, MongoDB Atlas, Mongoose, bcrypt, JSON Web Tokens, and dotenv. The application allows users to register, log in, create projects, and create tasks inside their projects.

The main files I use are server.js for starting the application, config/db.js for the MongoDB connection, the User, Project, and Task models, the user, project, and task route files, and authMiddleware.js for protecting private routes.

I used bcrypt to hash passwords before they are saved in MongoDB. I used JSON Web Tokens to protect private routes after a user logs in.

I added authorization so users can only access their own projects and tasks. The application checks project ownership before allowing a user to view, update, or delete information.

I connected the project to MongoDB Atlas with Mongoose. The application checks for MONGO_URI and JWT_SECRET before starting.

To run the project, I open it in VS Code, run npm install, create a .env file with MONGO_URI, JWT_SECRET, and PORT, and then run npm start.

I tested the API with Postman. I tested registration, login, MongoDB connectivity, protected routes, projects, and tasks.

Author: Dr. Chantell McDowell Per Scholas Student