import express from 'express';
import { Database } from '../config/database';
import { authenticateToken, requireRole } from '../middleware/auth';
import { validateJobPost } from '../middleware/validation';

const router = express.Router();
const db = Database.getInstance();

// Get all jobs with filtering and pagination
router.get('/', (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      location, 
      type, 
      company,
      status = 'active'
    } = req.query;

    let filteredJobs = db.jobs.filter(job => job.status === status);

    // Apply filters
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.requirements.some(req => req.toLowerCase().includes(searchTerm))
      );
    }

    if (location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes((location as string).toLowerCase())
      );
    }

    if (type) {
      filteredJobs = filteredJobs.filter(job => job.type === type);
    }

    if (company) {
      filteredJobs = filteredJobs.filter(job => 
        job.company.toLowerCase().includes((company as string).toLowerCase())
      );
    }

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    res.json({
      jobs: paginatedJobs,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(filteredJobs.length / Number(limit)),
        totalJobs: filteredJobs.length,
        hasNext: endIndex < filteredJobs.length,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get job by ID
router.get('/:id', (req, res) => {
  try {
    const job = db.jobs.find(j => j.id === req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Get company details
    const company = db.companies.find(c => c.id === job.companyId);

    res.json({
      ...job,
      companyDetails: company
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new job (admin/employer only)
router.post('/', authenticateToken, requireRole(['admin', 'employer']), validateJobPost, (req: any, res) => {
  try {
    const jobData = {
      ...req.body,
      createdBy: req.user.id,
      status: 'active' as const
    };

    const job = db.addJob(jobData);
    res.status(201).json({
      message: 'Job posted successfully',
      job
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update job (admin/employer only)
router.put('/:id', authenticateToken, requireRole(['admin', 'employer']), (req: any, res) => {
  try {
    const jobIndex = db.jobs.findIndex(j => j.id === req.params.id);
    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const job = db.jobs[jobIndex];
    
    // Check if user owns this job or is admin
    if (job.createdBy !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this job' });
    }

    // Update job
    db.jobs[jobIndex] = {
      ...job,
      ...req.body,
      id: job.id, // Preserve ID
      createdBy: job.createdBy, // Preserve creator
      postedDate: job.postedDate, // Preserve posted date
      applicationsCount: job.applicationsCount // Preserve applications count
    };

    res.json({
      message: 'Job updated successfully',
      job: db.jobs[jobIndex]
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete job (admin/employer only)
router.delete('/:id', authenticateToken, requireRole(['admin', 'employer']), (req: any, res) => {
  try {
    const jobIndex = db.jobs.findIndex(j => j.id === req.params.id);
    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const job = db.jobs[jobIndex];
    
    // Check if user owns this job or is admin
    if (job.createdBy !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this job' });
    }

    db.jobs.splice(jobIndex, 1);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get jobs by current user (employer)
router.get('/my/jobs', authenticateToken, requireRole(['admin', 'employer']), (req: any, res) => {
  try {
    const userJobs = db.jobs.filter(job => job.createdBy === req.user.id);
    res.json({ jobs: userJobs });
  } catch (error) {
    console.error('Error fetching user jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;