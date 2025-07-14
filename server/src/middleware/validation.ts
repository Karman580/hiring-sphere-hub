import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

export const validateRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').trim().isLength({ min: 1 }).withMessage('First name is required'),
  body('lastName').trim().isLength({ min: 1 }).withMessage('Last name is required'),
  body('role').isIn(['admin', 'employer', 'jobseeker']).withMessage('Invalid role'),
  handleValidationErrors
];

export const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors
];

export const validateJobPost = [
  body('title').trim().isLength({ min: 1 }).withMessage('Job title is required'),
  body('company').trim().isLength({ min: 1 }).withMessage('Company name is required'),
  body('location').trim().isLength({ min: 1 }).withMessage('Location is required'),
  body('type').isIn(['Full-time', 'Part-time', 'Contract', 'Internship']).withMessage('Invalid job type'),
  body('salary').trim().isLength({ min: 1 }).withMessage('Salary is required'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('requirements').isArray({ min: 1 }).withMessage('At least one requirement is needed'),
  handleValidationErrors
];

export const validateApplication = [
  body('firstName').trim().isLength({ min: 1 }).withMessage('First name is required'),
  body('lastName').trim().isLength({ min: 1 }).withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail(),
  body('phone').trim().isLength({ min: 1 }).withMessage('Phone number is required'),
  body('location').trim().isLength({ min: 1 }).withMessage('Location is required'),
  body('experience').trim().isLength({ min: 1 }).withMessage('Experience is required'),
  body('availability').trim().isLength({ min: 1 }).withMessage('Availability is required'),
  handleValidationErrors
];

export const validateContact = [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('email').isEmail().normalizeEmail(),
  body('subject').trim().isLength({ min: 1 }).withMessage('Subject is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  handleValidationErrors
];

export const validateCompany = [
  body('name').trim().isLength({ min: 1 }).withMessage('Company name is required'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('industry').trim().isLength({ min: 1 }).withMessage('Industry is required'),
  body('size').trim().isLength({ min: 1 }).withMessage('Company size is required'),
  body('website').trim().isLength({ min: 1 }).withMessage('Website is required'),
  body('location').trim().isLength({ min: 1 }).withMessage('Location is required'),
  handleValidationErrors
];