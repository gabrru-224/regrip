# Task Management System

This is a backend for a Task Management System built with Node.js, Express.js, and Sequelize.

## Features

- Email-based OTP Authentication with JWT
- CRUD operations for Tasks
- Rate Limiting
- Activity Logging
- Swagger API Documentation

## Hosted Backend URL

The backend is not deployed yet. You need to deploy it to a hosting platform like Render, Railway, AWS, or Heroku.

## API Documentation Link

The API documentation is available at `/api-docs` on the hosted backend URL.
Locally, it is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Steps to run the project locally

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add the following environment variables:
    ```
    DB_HOST=ep-late-water-aie2tdbi-pooler.c-4.us-east-1.aws.neon.tech
    DB_USER=neondb_owner
    DB_PASSWORD=npg_jAwfIl7P1HQO
    DB_NAME=neondb
    PORT=3000
    JWT_SECRET=a-very-secret-key
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-password
    ```
4.  Configure your email transporter in `src/services/auth.service.js`.
5.  Start the server:
    ```bash
    npm start
    ```

## Design Decisions & Architecture

The project follows a standard layered architecture with a clear separation of concerns:

-   **`config`**: Contains configuration files for the database, swagger, etc.
-   **`controllers`**: Handles the incoming requests, calls the appropriate services, and sends the response.
-   **`middlewares`**: Contains middleware functions for authentication, authorization, rate limiting, error handling, and activity logging.
-   **`models`**: Defines the database schemas using Sequelize.
-   **`routes`**: Defines the API endpoints and maps them to the controllers.
-   **`services`**: Contains the business logic of the application.

### Assumptions

-   A PostgreSQL database (Neon DB) is used.
-   The email service is not configured. You need to configure it with your own credentials in `src/services/auth.service.js`. I have used `nodemailer` for this, and you can use any email service provider like Gmail, SendGrid, etc.
-   The JWT secret is a simple string. For production, it is recommended to use a more complex and long secret, and store it securely.
-   The rate limiting is basic. For production, you might want to use a more robust solution with a persistent store like Redis.
-   The activity logging is also basic. For production, you might want to use a dedicated logging service or a more structured logging format.
-   The database sync option is set to `{ alter: true }`. This will automatically add new columns to the tables, but it will not remove any columns. For production, it is recommended to use migrations to manage database schema changes.
