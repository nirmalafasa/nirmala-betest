# ms-nirmala-betest

## Project Description
This project is a backend test implementation using Node.js and Express. The project includes features for user authentication, data management with MongoDB, caching with Redis, and JWT-based authorization.

## Features
- Account Login and User Info management
- JWT-based authentication
- Redis caching for User Info
- MongoDB for data storage
- Unit tests using Jest and Supertest
- Dockerized for easy deployment

## Requirements
- Node.js
- MongoDB
- Redis
- Docker (optional)

## Project Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ms-nirmala-betest.git
    cd ms-nirmala-betest
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Setup environment variables:
    - Create a `.env` file in the root directory.
    - Add the following environment variables:
        ```
        PORT=3030
        MONGODB_URI=mongodb://localhost:27017/db_nirmala_betest
        JWT_SECRET=your_jwt_secret_key
        REDIS_HOST=redis
        REDIS_PORT=6379
        ```

4. Start MongoDB and Redis:
    - Make sure MongoDB and Redis are running on your local machine.

5. Run the application:
    ```bash
    npm start
    ```

## Running Tests
To run unit tests:
```bash
npm test
