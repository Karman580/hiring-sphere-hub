import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Users, 
  Calendar,
  Share2,
  Bookmark,
  ArrowLeft
} from "lucide-react";

const JobDetails = () => {
  // Mock job data
  const job = {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    description: `We are looking for a Senior Frontend Developer to join our dynamic team. You'll work on cutting-edge web applications using React, TypeScript, and modern development practices.

As a Senior Frontend Developer, you will be responsible for developing high-quality user interfaces, collaborating with designers and backend developers, and mentoring junior team members. You'll have the opportunity to work on innovative projects that impact millions of users.`,
    requirements: [
      "5+ years of experience in frontend development",
      "Expert knowledge of React and TypeScript",
      "Experience with modern build tools (Webpack, Vite)",
      "Strong understanding of responsive design",
      "Experience with state management (Redux, Zustand)",
      "Knowledge of testing frameworks (Jest, React Testing Library)",
      "Familiarity with GraphQL and REST APIs",
      "Experience with cloud platforms (AWS, Azure)",
      "Strong problem-solving and communication skills"
    ],
    responsibilities: [
      "Develop and maintain high-quality frontend applications",
      "Collaborate with UX/UI designers to implement pixel-perfect designs",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and provide constructive feedback",
      "Mentor junior developers and share knowledge",
      "Optimize application performance and user experience",
      "Stay up-to-date with latest frontend technologies and trends"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Flexible working hours and remote options",
      "Professional development budget",
      "Catered meals and snacks",
      "Gym membership reimbursement",
      "Unlimited PTO policy"
    ],
    postedDate: "2 days ago",
    applicants: 45,
    companyInfo: {
      name: "TechCorp Inc",
      size: "500-1000 employees",
      industry: "Technology",
      founded: "2015",
      website: "techcorp.com"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-foreground">
                        {job.title}
                      </CardTitle>
                      <p className="text-lg text-muted-foreground">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.postedDate}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    {job.applicants} applicants
                  </div>
                  <Badge variant={job.type === 'Full-time' ? 'default' : 'secondary'}>
                    {job.type}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {job.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-muted-foreground">{resp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card>
              <CardHeader>
                <CardTitle>Apply for this Job</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button size="lg" className="w-full">
                  Apply Now
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Save Job
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Application deadline: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {job.companyInfo.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company Size:</span>
                  <span className="font-medium">{job.companyInfo.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Industry:</span>
                  <span className="font-medium">{job.companyInfo.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Founded:</span>
                  <span className="font-medium">{job.companyInfo.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Website:</span>
                  <a href={`https://${job.companyInfo.website}`} className="text-primary hover:underline">
                    {job.companyInfo.website}
                  </a>
                </div>
                <Separator />
                <Button variant="outline" className="w-full">
                  View All Jobs at {job.companyInfo.name}
                </Button>
              </CardContent>
            </Card>

            {/* Job Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Job Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Applications:</span>
                  <span className="font-medium">{job.applicants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Views:</span>
                  <span className="font-medium">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posted:</span>
                  <span className="font-medium">{job.postedDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default JobDetails;