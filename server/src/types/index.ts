export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'employer' | 'jobseeker';
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  status: 'active' | 'paused' | 'closed';
  postedDate: Date;
  applicationDeadline?: Date;
  createdBy: string;
  applicationsCount: number;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  size: string;
  founded: string;
  website: string;
  location: string;
  logo?: string;
  createdBy: string;
  createdAt: Date;
}

export interface Application {
  id: string;
  jobId: string;
  applicantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  coverLetter: string;
  resumeUrl: string;
  portfolio?: string;
  linkedin?: string;
  availability: string;
  status: 'pending' | 'reviewed' | 'interview' | 'rejected' | 'accepted';
  appliedDate: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

export interface AuthRequest extends Request {
  user?: User;
}