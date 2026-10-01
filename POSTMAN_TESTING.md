TaskMaster Postman Testing Steps

1. Start the server

npm install
npm start

2. Register User A

POST http://localhost:3000/api/users/register

Body -> raw -> JSON

{
  "username": "UserA",
  "email": "usera@example.com",
  "password": "Password123"
}

3. Login User A

POST http://localhost:3000/api/users/login

{
  "email": "usera@example.com",
  "password": "Password123"
}

Copy the token from the response.

4. Create a Project

POST http://localhost:3000/api/projects

Authorization -> Bearer Token -> paste User A token

{
  "name": "Backend Capstone",
  "description": "My TaskMaster backend project"
}

Copy the project _id.

5. Get All Projects

GET http://localhost:3000/api/projects

Use User A Bearer token.

6. Get One Project

GET http://localhost:3000/api/projects/PROJECT_ID

Use User A Bearer token.

7. Update a Project

PUT http://localhost:3000/api/projects/PROJECT_ID

{
  "name": "Updated Backend Capstone",
  "description": "Updated project description"
}

8. Create a Task

POST http://localhost:3000/api/projects/PROJECT_ID/tasks

{
  "title": "Finish TaskMaster API",
  "description": "Complete all routes and testing",
  "status": "In Progress"
}

Copy the task _id.

9. Get All Tasks for the Project

GET http://localhost:3000/api/projects/PROJECT_ID/tasks

10. Update a Task

PUT http://localhost:3000/api/tasks/TASK_ID

{
  "status": "Done"
}

11. Delete a Task

DELETE http://localhost:3000/api/tasks/TASK_ID

12. Authorization Test

Register and log in as User B.

Try to access User A's project using User B's token:

GET http://localhost:3000/api/projects/USER_A_PROJECT_ID

Expected result: 403 Forbidden.

13. No Token Test

Try:

GET http://localhost:3000/api/projects

without a Bearer token.

Expected result: 401 Unauthorized.
