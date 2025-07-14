# JobPortal Backend API

A comprehensive REST API for the JobPortal job search platform built with Node.js, Express, and TypeScript.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Job Management**: CRUD operations for job postings with filtering and pagination
- **Company Management**: Company profiles and information management
- **Application System**: Job application submission and tracking
- **Contact System**: Contact form handling and management
- **File Upload**: Resume and company logo upload functionality
- **Email Notifications**: Automated email notifications for applications and contact forms
- **Rate Limiting**: API rate limiting for security
- **Input Validation**: Comprehensive input validation and sanitization

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator
- **Database**: In-memory (easily replaceable with PostgreSQL, MongoDB, etc.)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FRONTEND_URL=http://localhost:8080
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/logout` - Logout user (requires auth)

### Job Endpoints

- `GET /api/jobs` - Get all jobs with filtering and pagination
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job (admin/employer only)
- `PUT /api/jobs/:id` - Update job (admin/employer only)
- `DELETE /api/jobs/:id` - Delete job (admin/employer only)
- `GET /api/jobs/my/jobs` - Get jobs by current user (employer)

### Company Endpoints

- `GET /api/companies` - Get all companies with filtering and pagination
- `GET /api/companies/:id` - Get company by ID
- `POST /api/companies` - Create new company (admin/employer only)
- `PUT /api/companies/:id` - Update company (admin/employer only)
- `DELETE /api/companies/:id` - Delete company (admin/employer only)
- `GET /api/companies/my/companies` - Get companies by current user (employer)

### Application Endpoints

- `POST /api/applications/:jobId` - Submit job application
- `GET /api/applications` - Get all applications (admin only)
- `GET /api/applications/my-jobs` - Get applications for user's jobs (employer)
- `GET /api/applications/:id` - Get application by ID (admin/employer)
- `PATCH /api/applications/:id/status` - Update application status (admin/employer)
- `GET /api/applications/stats/overview` - Get application statistics

### Contact Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (admin only)
- `GET /api/contact/:id` - Get contact message by ID (admin only)
- `PATCH /api/contact/:id/status` - Update message status (admin only)
- `DELETE /api/contact/:id` - Delete contact message (admin only)
- `GET /api/contact/stats/overview` - Get contact statistics (admin only)

### About Endpoints

- `GET /api/about` - Get about us information
- `GET /api/about/stats` - Get company statistics
- `GET /api/about/team` - Get team information

## User Roles

- **Admin**: Full access to all endpoints and data
- **Employer**: Can create/manage jobs and companies, view applications for their jobs
- **Job Seeker**: Can apply for jobs and view public information

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## File Uploads

The API supports file uploads for:
- Resume files (PDF, DOC, DOCX) - max 5MB
- Company logos (JPG, JPEG, PNG) - max 5MB

Files are stored in the `/uploads` directory and served statically.

## Email Configuration

To enable email notifications, configure your SMTP settings in the `.env` file:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

For Gmail, you'll need to use an App Password instead of your regular password.

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "details": [] // Optional validation details
}
```

## Rate Limiting

API requests are rate-limited to prevent abuse:
- 100 requests per 15 minutes per IP address
- Configurable via environment variables

## Development

### Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

### Project Structure

```
server/
├── src/
│   ├── config/          # Database and configuration
│   ├── middleware/      # Express middleware
│   ├── routes/          # API route handlers
│   ├── services/        # Business logic services
│   ├── types/           # TypeScript type definitions
│   └── server.ts        # Main server file
├── uploads/             # File upload directory
├── .env                 # Environment variables
└── package.json
```

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Set production environment variables
3. Start the production server:
```bash
npm start
```

## Database Integration

The current implementation uses an in-memory database for simplicity. To integrate with a real database:

1. Install your preferred database driver (e.g., `pg` for PostgreSQL, `mongoose` for MongoDB)
2. Replace the `Database` class in `src/config/database.ts`
3. Update the data access patterns in the route handlers

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS protection
- Security headers with Helmet
- File upload restrictions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.