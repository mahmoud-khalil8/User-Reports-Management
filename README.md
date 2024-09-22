

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# NestJS API with User Management and Reports 

This project is a NestJS API that includes user authentication, session management with cookies, and a reports system. The application uses SQLite as the database and demonstrates the use of modules, validation pipes, guards,interceptors and middleware for managing users and reports.

## Features

- **User Authentication**: Users can sign up, sign in, and sign out.
- **Session Management**: Uses cookie-based sessions to track logged-in users.
- **Reports Module**: Authenticated users can create reports, and admin users can approve them.
- **Validation**: Global request validation is enforced using pipes.
- **Testing**: Unit tests for authentication and user-related features.

## Technologies

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **SQLite**: Lightweight database used for persistence.
- **TypeORM**: An ORM for managing entities and database interactions.
- **Cookie Session**: Used to manage user sessions.
- **TypeScript**: For type-safe development.
- **Jest**: Used for unit testing.

## Installation

### Prerequisites

- Node.js (>= 16.x)
- NPM or Yarn
- SQLite

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/nestjs-auth-reports.git
   cd nestjs-auth-reports

    Install the dependencies:

    bash

npm install

Set up environment variables by creating .env.development and .env.test files. Add the following keys:

makefile

DB_NAME=db.sqlite
COOKIE_KEY=<your-cookie-key>

Run database migrations (optional if you use SQLite):

bash

npm run migration:run

Start the development server:

bash

    npm run start:dev

Endpoints
Authentication Routes

    POST /auth/signup: Sign up a new user.
    POST /auth/signin: Log in an existing user.
    POST /auth/signout: Log out a user.
    GET /auth/whoami: Get the details of the currently logged-in user.

User Management Routes

    GET /auth/:id: Get user by ID.
    GET /auth?email={email}: Get users by email.
    PATCH /auth/:id: Update user details.
    DELETE /auth/:id: Delete a user.

Reports Routes

    POST /reports: Create a report (requires authentication).
    GET /reports: Get a price estimate based on report parameters.
    PATCH /reports/:id: Approve a report (requires admin access).

Unit Testing

Run the unit tests using:

bash

npm run test

The application includes tests for authentication services, user management, and reports.
Project Structure

bash

src
├── app.module.ts         # Main app module
├── app.controller.ts     # Main app controller
├── users                 # Users module, controller, services, and tests
├── reports               # Reports module, controller, services, and tests
├── guards                # Guards for authentication and admin protection
├── interceptors          # Custom serialization interceptor
├── middlewares           # Middleware for setting current user from session
└── dtos                  # Data transfer objects for validation

  
