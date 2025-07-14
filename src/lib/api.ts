const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'employer' | 'jobseeker';
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'employer' | 'jobseeker';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Job types
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
  postedDate: string;
  applicationDeadline?: string;
  createdBy: string;
  applicationsCount: number;
}

// API functions
class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(credentials: LoginCredentials) {
    const response = await this.request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async register(data: RegisterData) {
    const response = await this.request<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async getCurrentUser() {
    return this.request<{ user: User }>('/auth/me');
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.removeToken();
    }
  }

  // Job methods
  async getJobs(params?: {
    page?: number;
    limit?: number;
    search?: string;
    location?: string;
    type?: string;
    company?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const query = searchParams.toString();
    return this.request<{
      jobs: Job[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalJobs: number;
        hasNext: boolean;
        hasPrev: boolean;
      };
    }>(`/jobs${query ? `?${query}` : ''}`);
  }

  async getJob(id: string) {
    return this.request<Job>(`/jobs/${id}`);
  }

  async createJob(jobData: Omit<Job, 'id' | 'postedDate' | 'applicationsCount' | 'createdBy' | 'status'>) {
    return this.request<{ job: Job }>('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  // Application methods
  async submitApplication(jobId: string, formData: FormData) {
    return this.request<{ message: string; application: any }>(`/applications/${jobId}`, {
      method: 'POST',
      headers: {
        // Remove Content-Type to let browser set it with boundary for FormData
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    });
  }

  // Contact methods
  async submitContact(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    return this.request<{ message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Company methods
  async getCompanies(params?: {
    page?: number;
    limit?: number;
    search?: string;
    industry?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const query = searchParams.toString();
    return this.request<{
      companies: any[];
      pagination: any;
    }>(`/companies${query ? `?${query}` : ''}`);
  }

  async getCompany(id: string) {
    return this.request<any>(`/companies/${id}`);
  }

  // About methods
  async getAbout() {
    return this.request<any>('/about');
  }

  async getAboutStats() {
    return this.request<any>('/about/stats');
  }

  async getTeam() {
    return this.request<any>('/about/team');
  }
}

export const api = new ApiClient();
export default api;