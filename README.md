# Task Management System

This is a backend for a Task Management System built with Node.js, Express.js, and Sequelize.

## Features

- Email-based OTP Authentication (OTP returned in response for demo purposes)
- CRUD operations for Tasks
- Rate Limiting
- Activity Logging
- Swagger API Documentation

## Hosted Backend URL

The backend is deployed on Render: [https://regrip.onrender.com](https://regrip.onrender.com)

## API Documentation Link

The API documentation is available here: https://regrip.onrender.com/api-docs/
Locally, it is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Steps to run the project locally

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add the following environment variables:
    ```
    DB_HOST=your_neon_host
    DB_USER=your_neon_user
    DB_PASSWORD=your_neon_password
    DB_NAME=neondb
    PORT=3000
    JWT_SECRET=a-very-secret-key
    ```
4.  No email configuration is required.
5.  Start the server:
    ```bash
    npm start
    ```

## Deployment to Render

1.  Push your code to a GitHub repository.
2.  Log in to Render and click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  Use the following settings:
    *   **Runtime**: Node
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
5.  Scroll down to **Environment Variables** and add the keys from your `.env` file:
    *   `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (From Neon DB)
    *   `JWT_SECRET`
    *   `SERVER_URL`: Set this to your Render app URL (e.g., `https://your-app-name.onrender.com`)

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
-   **Email Delivery**: Due to cloud platform restrictions on SMTP ports (Render Free Tier), real email delivery is disabled for this demo. Instead, the **OTP is returned directly in the API response** when you call the `/send-otp` endpoint. This allows full testing of the authentication flow without external dependencies.
-   The JWT secret is a simple string. For production, it is recommended to use a more complex and long secret, and store it securely.
-   The rate limiting is basic. For production, you might want to use a more robust solution with a persistent store like Redis.
-   The activity logging is also basic. For production, you might want to use a dedicated logging service or a more structured logging format.
-   The database sync option is set to `{ alter: true }`. This will automatically add new columns to the tables, but it will not remove any columns. For production, it is recommended to use migrations to manage database schema changes.
