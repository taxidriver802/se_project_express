# [WTWR (What to Wear?) backend]

## Link to frontend Repository

https://github.com/taxidriver802/se_project_react

# [Domain (https://www.wearwithweather.jumpingcrab.com/)]

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization. WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Project Description

WTWR (What to Wear?) is an application designed to help users decide what to wear based on the weather. The back-end server provides the necessary API endpoints for user authentication, clothing item management, and weather-based recommendations. The server is built using Node.js and Express, with MongoDB as the database.

## Technologies and Techniques Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing user data and clothing items.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **ESLint**: A tool for identifying and fixing linting issues in JavaScript code.
- **Prettier**: A code formatter to ensure consistent code style.
- **GitHub Actions**: For continuous integration and deployment.

## API Endpoints

The server provides the following API endpoints:

- **User Routes**:

  - `POST /signup` — Register a new user
  - `POST /signin` — Authenticate a user and return a JWT
  - `GET /users/me` — Get the current authenticated user
  - `PATCH /users/me` — Update the current authenticated user

- **Clothing Item Routes**:
  - `POST /items` — Add a new clothing item (protected)
  - `GET /items` — Get a list of all clothing items
  - `DELETE /items/:id` — Delete a clothing item by ID (protected)
  - `PUT /items/:itemId/likes` — Like a clothing item (protected)
  - `DELETE /items/:itemId/likes` — Unlike a clothing item (protected)
