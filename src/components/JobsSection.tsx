import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import JobCard from "./JobCard";
import { Search, Filter } from "lucide-react";
import { api, Job } from "@/lib/api";

const JobsSection = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.getJobs({ limit: 6 });
      setJobs(response.jobs);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      // Fallback to mock data if API fails
      setJobs(mockJobs);
    } finally {
      setLoading(false);
    }
  };

  // Mock job data as fallback - properly typed as Job[]
  const mockJobs: Job[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc",
      companyId: "1",
      location: "San Francisco, CA",
      type: "Full-time" as const,
      salary: "$120K - $160K",
      description: "We are looking for a Senior Frontend Developer to join our dynamic team. You'll work on cutting-edge web applications using React, TypeScript, and modern development practices.",
      requirements: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      responsibilities: ["Develop frontend applications", "Code reviews", "Mentor junior developers"],
      benefits: ["Health insurance", "Flexible hours", "Remote work"],
      status: "active" as const,
      postedDate: new Date().toISOString(),
      createdBy: "1",
      applicationsCount: 5
    },
    {
      id: "2",
      title: "Product Manager",
      company: "InnovateLabs",
      companyId: "2",
      location: "New York, NY",
      type: "Full-time" as const,
      salary: "$140K - $180K",
      description: "Lead product strategy and development for our AI-powered platform. Work with cross-functional teams to deliver exceptional user experiences.",
      requirements: ["Product Strategy", "Agile", "SQL", "Analytics", "Leadership"],
      responsibilities: ["Product strategy", "Team coordination", "Market analysis"],
      benefits: ["Stock options", "Health insurance", "Vacation time"],
      status: "active" as const,
      postedDate: new Date().toISOString(),
      createdBy: "1",
      applicationsCount: 8
    }
  ];

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading jobs...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest Job Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your next career move from our curated selection of top job openings.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="sf">San Francisco</SelectItem>
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="fulltime">Full-time</SelectItem>
                <SelectItem value="parttime">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
            <Button className="h-10">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;