import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth';
import jobRoutes from './routes/jobs';
import companyRoutes from './routes/companies';
import applicationRoutes from './routes/applications';
import contactRoutes from './routes/contact';
import aboutRoutes from './routes/about';

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/about', aboutRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'JobPortal API',
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Register a new user',
        'POST /api/auth/login': 'Login user',
        'GET /api/auth/me': 'Get current user (requires auth)',
        'POST /api/auth/logout': 'Logout user (requires auth)'
      },
      jobs: {
        'GET /api/jobs': 'Get all jobs with filtering and pagination',
        'GET /api/jobs/:id': 'Get job by ID',
        'POST /api/jobs': 'Create new job (admin/employer only)',
        'PUT /api/jobs/:id': 'Update job (admin/employer only)',
        'DELETE /api/jobs/:id': 'Delete job (admin/employer only)',
        'GET /api/jobs/my/jobs': 'Get jobs by current user (employer)'
      },
      companies: {
        'GET /api/companies': 'Get all companies with filtering and pagination',
        'GET /api/companies/:id': 'Get company by ID',
        'POST /api/companies': 'Create new company (admin/employer only)',
        'PUT /api/companies/:id': 'Update company (admin/employer only)',
        'DELETE /api/companies/:id': 'Delete company (admin/employer only)',
        'GET /api/companies/my/companies': 'Get companies by current user (employer)'
      },
      applications: {
        'POST /api/applications/:jobId': 'Submit job application',
        'GET /api/applications': 'Get all applications (admin only)',
        'GET /api/applications/my-jobs': 'Get applications for user\'s jobs (employer)',
        'GET /api/applications/:id': 'Get application by ID (admin/employer)',
        'PATCH /api/applications/:id/status': 'Update application status (admin/employer)',
        'GET /api/applications/stats/overview': 'Get application statistics'
      },
      contact: {
        'POST /api/contact': 'Submit contact form',
        'GET /api/contact': 'Get all contact messages (admin only)',
        'GET /api/contact/:id': 'Get contact message by ID (admin only)',
        'PATCH /api/contact/:id/status': 'Update message status (admin only)',
        'DELETE /api/contact/:id': 'Delete contact message (admin only)',
        'GET /api/contact/stats/overview': 'Get contact statistics (admin only)'
      },
      about: {
        'GET /api/about': 'Get about us information',
        'GET /api/about/stats': 'Get company statistics',
        'GET /api/about/team': 'Get team information'
      }
    }
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large' });
  }
  
  if (err.message && err.message.includes('Invalid file type')) {
    return res.status(400).json({ error: err.message });
  }
  
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API documentation available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;