# Node Backend Project

This project is a Node.js backend application that connects to a MongoDB Atlas database. It provides a RESTful API for user management, including creating and retrieving user information.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd node-backend-project
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   ```

2. Start the server:
   ```
   npm start
   ```

3. The server will run on `http://localhost:3000`.

## API Endpoints

- **POST /users**: Create a new user.
- **GET /users/:id**: Retrieve a user by ID.

## Environment Variables

- `MONGODB_URI`: The connection string for your MongoDB Atlas database.

## License

This project is licensed under the MIT License.