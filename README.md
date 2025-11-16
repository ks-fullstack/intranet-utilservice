# Intranet Util Service

A Node.js microservice providing email and email template management utilities for the Intranet application. Built with Express, TypeScript, MongoDB, and Nodemailer.

## Features

### 📧 Email Management
- **Send Single Email**: Send individual emails with custom content
- **Send Bulk Emails**: Send emails to multiple recipients in batch
- **Internal & External Endpoints**: Support for both internal service-to-service communication and authenticated external requests
- **Error Handling**: Comprehensive error handling with detailed logging

### 📋 Email Template Management
- **Template CRUD Operations**: Create, read, update, and delete email templates
- **Template Listing**: Retrieve all templates with pagination support
- **Template Search**: Advanced search functionality for finding templates
- **Template Count**: Get total count of available templates
- **MongoDB Integration**: Persistent storage of templates with audit trail support

### 🔐 Health & Security
- **Health Check Endpoint**: Monitor service uptime and status
- **JWT Authentication**: Token-based authentication for protected endpoints
- **Request Validation**: Input validation for all API requests
- **Error Interceptors**: Centralized error handling and response formatting

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ORM
- **Email Service**: Nodemailer
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet.js for HTTP headers
- **Build Tool**: TypeScript Compiler (tsc)
- **Development**: Nodemon for hot-reloading

## Project Structure

```
src/
├── main.ts                      # Application entry point
├── controllers/                 # Request handlers
│   ├── email.controller.ts
│   ├── email-template.controller.ts
│   └── health.controller.ts
├── services/                    # Business logic
│   ├── email.service.ts
│   ├── email-template.service.ts
│   └── validation.service.ts
├── routers/                     # API route definitions
│   ├── email.router.ts
│   ├── email-template.router.ts
│   ├── health.router.ts
│   └── router.ts
├── repos/                       # Data access layer
│   └── email-template.repo.ts
├── models/                      # Database models
│   └── email-template.model.ts
├── interface/                   # TypeScript interfaces
├── constants/                   # App constants and enums
├── utils/                       # Utility functions
│   ├── express-app.ts
│   ├── config.ts
│   ├── error.interceptor.ts
│   ├── response.interceptor.ts
│   └── security.ts
├── middlewares/                 # Request middlewares
│   ├── access-control.middleware.ts
│   └── auth.middleware.ts
├── audit/                       # Audit logging
└── db/                          # Database connection
```

## API Endpoints

### Health Check
- `GET /` - Check service health and uptime

### Email Operations
- `POST /api/v1/email/send` - Send single email (authenticated)
- `POST /api/v1/email/send-bulk` - Send bulk emails (authenticated)
- `POST /api/v1/email/internal/send` - Send single email (internal)
- `POST /api/v1/email/internal/send-bulk` - Send bulk emails (internal)

### Email Template Management
- `GET /api/v1/email-template/get/list` - Get all templates (authenticated)
- `GET /api/v1/email-template/get/count` - Get template count (authenticated)
- `GET /api/v1/email-template/get/:id` - Get specific template (authenticated)
- `POST /api/v1/email-template/create` - Create new template (authenticated)
- `PUT /api/v1/email-template/update` - Update template (authenticated)
- `DELETE /api/v1/email-template/delete` - Delete template (authenticated)
- `POST /api/v1/email-template/search` - Search templates (authenticated)
- `POST /api/v1/email-template/search/all` - Search all templates (authenticated)

## Installation

```bash
# Install dependencies
npm install

# Install dev dependencies
npm install --save-dev
```

## Configuration

### Environment Variables

Create a `.env` file in the `env/` directory with the following variables:

```env
# Server Configuration
PORT=5002
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/intranet

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRY=24h

# Service Name
SERVICE_NAME=intranet-utilservice
```

### Configuration Files

- `config/dev.config.json` - Development configuration
- `config/uat.config.json` - UAT configuration
- `config/prod.config.json` - Production configuration

## Scripts

```bash
# Development - Run with hot-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Run linter with auto-fix
npm lint

# Run unit tests
npm test

# Generate code coverage report
npm run coverage

# Clean build artifacts
npm run clean
```

## Development

### Running Locally

```bash
# Start development server
npm run dev

# Server will run on http://localhost:5002
```

### Building

```bash
# Build TypeScript
npm run build

# Output goes to ./dist directory
```

### Testing

```bash
# Run unit tests
npm test

# With coverage report
npm run coverage
```

## Error Handling

The service includes comprehensive error handling with:
- Centralized error interceptor
- Custom error classes
- Detailed error logging
- Graceful error responses
- Exception handling for uncaught errors and unhandled rejections

## Security Features

- JWT-based authentication for protected routes
- Request validation and sanitization
- Helmet.js for HTTP header security
- CORS configuration
- Body parser limits
- Input validation service

## Access Control Middleware

The project exposes middleware to handle authentication and role-based access control:

- **`src/middlewares/auth.middleware.ts` (`validateRequest`)**: Verifies the incoming JWT access token, populates `req.user` with the decoded user payload, and rejects unauthorized requests with HTTP `401` or `403` using the project's `CustomError` class.

- **`src/middlewares/access-control.middleware.ts` (`authorizeRoles`)**: A small role-authorisation helper that checks `req.user.role` against an allowed list of roles and throws a `403 Forbidden` if the current user does not match any allowed role.

Usage example (routes):

```ts
import { validateRequest } from './middlewares/auth.middleware';
import { authorizeRoles } from './middlewares/access-control.middleware';

// Example: only users with the 'admin' role can access this endpoint
router.post('/admin-only', validateRequest, authorizeRoles('admin'), adminController.action);
```

Notes:

- `authorizeRoles` expects `req.user` to be set by the authentication middleware (`validateRequest`).
- Both middlewares throw `CustomError` instances that are handled by the application's centralized error interceptor.
- Ensure your JWT payload includes a `role` field when issuing tokens so that role checks work correctly.

## Audit Trail

The service includes audit logging functionality to track:
- Email sending operations
- Template modifications
- User actions

## Database

Uses MongoDB with Mongoose for schema validation and data persistence. Supports:
- Email template storage
- Audit trail recording
- Query optimization with indexing

## License

ISC

## Repository

[GitHub Repository](https://github.com/ks-fullstack/intranet-utilservice)