// In-memory database simulation
// In a real application, you would use a proper database like PostgreSQL, MongoDB, etc.

import { User, Job, Company, Application, ContactMessage } from '../types';

export class Database {
  private static instance: Database;
  
  public users: User[] = [
    {
      id: '1',
      email: 'admin@jobportal.com',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  public jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc',
      companyId: '1',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $160,000',
      description: 'We are looking for a Senior Frontend Developer to join our dynamic team.',
      requirements: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
      responsibilities: ['Develop frontend applications', 'Code reviews', 'Mentor junior developers'],
      benefits: ['Health insurance', 'Flexible hours', 'Remote work'],
      status: 'active',
      postedDate: new Date(),
      createdBy: '1',
      applicationsCount: 0
    }
  ];

  public companies: Company[] = [
    {
      id: '1',
      name: 'TechCorp Inc',
      description: 'Leading technology company focused on innovation.',
      industry: 'Technology',
      size: '500-1000 employees',
      founded: '2015',
      website: 'techcorp.com',
      location: 'San Francisco, CA',
      createdBy: '1',
      createdAt: new Date()
    }
  ];

  public applications: Application[] = [];
  public contactMessages: ContactMessage[] = [];

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  // Helper methods for CRUD operations
  public generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  public findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  public findUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  public addUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const newUser: User = {
      ...user,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  public addJob(job: Omit<Job, 'id' | 'postedDate' | 'applicationsCount'>): Job {
    const newJob: Job = {
      ...job,
      id: this.generateId(),
      postedDate: new Date(),
      applicationsCount: 0
    };
    this.jobs.push(newJob);
    return newJob;
  }

  public addCompany(company: Omit<Company, 'id' | 'createdAt'>): Company {
    const newCompany: Company = {
      ...company,
      id: this.generateId(),
      createdAt: new Date()
    };
    this.companies.push(newCompany);
    return newCompany;
  }

  public addApplication(application: Omit<Application, 'id' | 'appliedDate' | 'status'>): Application {
    const newApplication: Application = {
      ...application,
      id: this.generateId(),
      status: 'pending',
      appliedDate: new Date()
    };
    this.applications.push(newApplication);
    
    // Update job applications count
    const job = this.jobs.find(j => j.id === application.jobId);
    if (job) {
      job.applicationsCount++;
    }
    
    return newApplication;
  }

  public addContactMessage(message: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): ContactMessage {
    const newMessage: ContactMessage = {
      ...message,
      id: this.generateId(),
      status: 'new',
      createdAt: new Date()
    };
    this.contactMessages.push(newMessage);
    return newMessage;
  }
}