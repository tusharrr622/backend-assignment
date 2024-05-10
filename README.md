Node.js Authentication API

This is a simple Node.js authentication API using Express, MongoDB, and JWT for token-based authentication. It provides endpoints for user registration, login, and logout.

Features
User registration with bcrypt hashing for passwords
User login with JWT token generation
User logout with cookie clearing
MongoDB for data storage

Prerequisites
Node.js installed on your machine
MongoDB database URL (MONGO_URL) set in a .env file
JWT secret (JWT_SECRET) set in a .env file

Installation

1. Clone the repository:
git clone https://github.com/yourusername/backend-assignment.git

2. Install dependencies:
cd backend-assignment
cd backend
npm install

3. Set up environment variables:Create a .env file in the root of the project and add the following:
MONGO_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret

4. Start the server:
npm start
