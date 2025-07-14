import express from 'express';
import { Database } from '../config/database';
import { authenticateToken, requireRole } from '../middleware/auth';
import { validateCompany } from '../middleware/validation';
import { upload } from '../middleware/upload';

const router = express.Router();
const db = Database.getInstance();

// Get all companies
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10, search, industry } = req.query;

    let filteredCompanies = [...db.companies];

    // Apply filters
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredCompanies = filteredCompanies.filter(company => 
        company.name.toLowerCase().includes(searchTerm) ||
        company.description.toLowerCase().includes(searchTerm)
      );
    }

    if (industry) {
      filteredCompanies = filteredCompanies.filter(company => 
        company.industry.toLowerCase().includes((industry as string).toLowerCase())
      );
    }

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

    // Add job count for each company
    const companiesWithJobCount = paginatedCompanies.map(company => ({
      ...company,
      jobCount: db.jobs.filter(job => job.companyId === company.id && job.status === 'active').length
    }));

    res.json({
      companies: companiesWithJobCount,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(filteredCompanies.length / Number(limit)),
        totalCompanies: filteredCompanies.length,
        hasNext: endIndex < filteredCompanies.length,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get company by ID
router.get('/:id', (req, res) => {
  try {
    const company = db.companies.find(c => c.id === req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Get active jobs for this company
    const companyJobs = db.jobs.filter(job => 
      job.companyId === company.id && job.status === 'active'
    );

    res.json({
      ...company,
      jobs: companyJobs,
      jobCount: companyJobs.length
    });
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new company (admin/employer only)
router.post('/', 
  authenticateToken, 
  requireRole(['admin', 'employer']), 
  upload.single('logo'),
  validateCompany, 
  (req: any, res) => {
    try {
      const companyData = {
        ...req.body,
        createdBy: req.user.id,
        logo: req.file ? `/uploads/${req.file.filename}` : undefined
      };

      const company = db.addCompany(companyData);
      res.status(201).json({
        message: 'Company created successfully',
        company
      });
    } catch (error) {
      console.error('Error creating company:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Update company (admin/employer only)
router.put('/:id', 
  authenticateToken, 
  requireRole(['admin', 'employer']), 
  upload.single('logo'),
  (req: any, res) => {
    try {
      const companyIndex = db.companies.findIndex(c => c.id === req.params.id);
      if (companyIndex === -1) {
        return res.status(404).json({ error: 'Company not found' });
      }

      const company = db.companies[companyIndex];
      
      // Check if user owns this company or is admin
      if (company.createdBy !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized to update this company' });
      }

      // Update company
      const updatedData = {
        ...req.body,
        logo: req.file ? `/uploads/${req.file.filename}` : company.logo
      };

      db.companies[companyIndex] = {
        ...company,
        ...updatedData,
        id: company.id, // Preserve ID
        createdBy: company.createdBy, // Preserve creator
        createdAt: company.createdAt // Preserve creation date
      };

      res.json({
        message: 'Company updated successfully',
        company: db.companies[companyIndex]
      });
    } catch (error) {
      console.error('Error updating company:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Delete company (admin/employer only)
router.delete('/:id', authenticateToken, requireRole(['admin', 'employer']), (req: any, res) => {
  try {
    const companyIndex = db.companies.findIndex(c => c.id === req.params.id);
    if (companyIndex === -1) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const company = db.companies[companyIndex];
    
    // Check if user owns this company or is admin
    if (company.createdBy !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this company' });
    }

    // Check if company has active jobs
    const hasActiveJobs = db.jobs.some(job => job.companyId === company.id && job.status === 'active');
    if (hasActiveJobs) {
      return res.status(400).json({ 
        error: 'Cannot delete company with active job postings. Please close all jobs first.' 
      });
    }

    db.companies.splice(companyIndex, 1);
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get companies by current user (employer)
router.get('/my/companies', authenticateToken, requireRole(['admin', 'employer']), (req: any, res) => {
  try {
    const userCompanies = db.companies.filter(company => company.createdBy === req.user.id);
    
    // Add job count for each company
    const companiesWithJobCount = userCompanies.map(company => ({
      ...company,
      jobCount: db.jobs.filter(job => job.companyId === company.id).length
    }));

    res.json({ companies: companiesWithJobCount });
  } catch (error) {
    console.error('Error fetching user companies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;