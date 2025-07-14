import express from 'express';
import { Database } from '../config/database';
import { authenticateToken, requireRole } from '../middleware/auth';
import { validateApplication } from '../middleware/validation';
import { upload } from '../middleware/upload';
import emailService from '../services/emailService';

const router = express.Router();
const db = Database.getInstance();

// Submit job application
router.post('/:jobId', upload.single('resume'), validateApplication, async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // Check if job exists
    const job = db.jobs.find(j => j.id === jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.status !== 'active') {
      return res.status(400).json({ error: 'This job is no longer accepting applications' });
    }

    // Check if resume was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    const applicationData = {
      ...req.body,
      jobId,
      resumeUrl: `/uploads/${req.file.filename}`
    };

    const application = db.addApplication(applicationData);

    // Send confirmation email to applicant
    await emailService.sendApplicationConfirmation(
      application.email,
      job.title,
      job.company
    );

    // Send notification to admin/employer
    const jobCreator = db.findUserById(job.createdBy);
    if (jobCreator) {
      await emailService.sendNewApplicationNotification(
        jobCreator.email,
        `${application.firstName} ${application.lastName}`,
        job.title
      );
    }

    res.status(201).json({
      message: 'Application submitted successfully',
      application: {
        id: application.id,
        status: application.status,
        appliedDate: application.appliedDate
      }
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all applications (admin only)
router.get('/', authenticateToken, requireRole(['admin']), (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      jobId,
      search 
    } = req.query;

    let filteredApplications = [...db.applications];

    // Apply filters
    if (status) {
      filteredApplications = filteredApplications.filter(app => app.status === status);
    }

    if (jobId) {
      filteredApplications = filteredApplications.filter(app => app.jobId === jobId);
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredApplications = filteredApplications.filter(app => 
        app.firstName.toLowerCase().includes(searchTerm) ||
        app.lastName.toLowerCase().includes(searchTerm) ||
        app.email.toLowerCase().includes(searchTerm)
      );
    }

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedApplications = filteredApplications.slice(startIndex, endIndex);

    // Add job details to each application
    const applicationsWithJobDetails = paginatedApplications.map(app => {
      const job = db.jobs.find(j => j.id === app.jobId);
      return {
        ...app,
        jobTitle: job?.title,
        companyName: job?.company
      };
    });

    res.json({
      applications: applicationsWithJobDetails,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(filteredApplications.length / Number(limit)),
        totalApplications: filteredApplications.length,
        hasNext: endIndex < filteredApplications.length,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get applications for jobs created by current user (employer)
router.get('/my-jobs', authenticateToken, requireRole(['admin', 'employer']), (req: any, res) => {
  try {
    const { page = 1, limit = 10, status, jobId } = req.query;

    // Get jobs created by current user
    const userJobs = db.jobs.filter(job => job.createdBy === req.user.id);
    const userJobIds = userJobs.map(job => job.id);

    // Get applications for these jobs
    let filteredApplications = db.applications.filter(app => 
      userJobIds.includes(app.jobId)
    );

    // Apply filters
    if (status) {
      filteredApplications = filteredApplications.filter(app => app.status === status);
    }

    if (jobId) {
      filteredApplications = filteredApplications.filter(app => app.jobId === jobId);
    }

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedApplications = filteredApplications.slice(startIndex, endIndex);

    // Add job details to each application
    const applicationsWithJobDetails = paginatedApplications.map(app => {
      const job = db.jobs.find(j => j.id === app.jobId);
      return {
        ...app,
        jobTitle: job?.title,
        companyName: job?.company
      };
    });

    res.json({
      applications: applicationsWithJobDetails,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(filteredApplications.length / Number(limit)),
        totalApplications: filteredApplications.length,
        hasNext: endIndex < filteredApplications.length,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get application by ID
router.get('/:id', authenticateToken, requireRole(['admin', 'employer']), (req: any, res) => {
  try {
    const application = db.applications.find(app => app.id === req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check if user has permission to view this application
    if (req.user.role === 'employer') {
      const job = db.jobs.find(j => j.id === application.jobId);
      if (!job || job.createdBy !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized to view this application' });
      }
    }

    // Add job details
    const job = db.jobs.find(j => j.id === application.jobId);
    
    res.json({
      ...application,
      jobTitle: job?.title,
      companyName: job?.company
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update application status
router.patch('/:id/status', authenticateToken, requireRole(['admin', 'employer']), (req: any, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'reviewed', 'interview', 'rejected', 'accepted'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const applicationIndex = db.applications.findIndex(app => app.id === req.params.id);
    if (applicationIndex === -1) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const application = db.applications[applicationIndex];

    // Check if user has permission to update this application
    if (req.user.role === 'employer') {
      const job = db.jobs.find(j => j.id === application.jobId);
      if (!job || job.createdBy !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized to update this application' });
      }
    }

    // Update status
    db.applications[applicationIndex] = {
      ...application,
      status
    };

    res.json({
      message: 'Application status updated successfully',
      application: db.applications[applicationIndex]
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get application statistics
router.get('/stats/overview', authenticateToken, requireRole(['admin', 'employer']), (req: any, res) => {
  try {
    let applications = db.applications;

    // Filter by user's jobs if employer
    if (req.user.role === 'employer') {
      const userJobs = db.jobs.filter(job => job.createdBy === req.user.id);
      const userJobIds = userJobs.map(job => job.id);
      applications = applications.filter(app => userJobIds.includes(app.jobId));
    }

    const stats = {
      total: applications.length,
      pending: applications.filter(app => app.status === 'pending').length,
      reviewed: applications.filter(app => app.status === 'reviewed').length,
      interview: applications.filter(app => app.status === 'interview').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
      accepted: applications.filter(app => app.status === 'accepted').length
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching application stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;