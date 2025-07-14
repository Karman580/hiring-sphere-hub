import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import JobCard from "./JobCard";
import { Search, Filter } from "lucide-react";

const JobsSection = () => {
  // Mock job data
  const jobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120K - $160K",
      description: "We are looking for a Senior Frontend Developer to join our dynamic team. You'll work on cutting-edge web applications using React, TypeScript, and modern development practices.",
      requirements: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      postedDate: "2 days ago"
    },
    {
      id: "2",
      title: "Product Manager",
      company: "InnovateLabs",
      location: "New York, NY",
      type: "Full-time",
      salary: "$140K - $180K",
      description: "Lead product strategy and development for our AI-powered platform. Work with cross-functional teams to deliver exceptional user experiences.",
      requirements: ["Product Strategy", "Agile", "SQL", "Analytics", "Leadership"],
      postedDate: "1 day ago"
    },
    {
      id: "3",
      title: "UX Designer",
      company: "DesignStudio",
      location: "Remote",
      type: "Contract",
      salary: "$80K - $100K",
      description: "Create intuitive and beautiful user experiences for our mobile and web applications. Collaborate with product and engineering teams.",
      requirements: ["Figma", "User Research", "Prototyping", "Design Systems", "Mobile Design"],
      postedDate: "3 days ago"
    },
    {
      id: "4",
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110K - $140K",
      description: "Build and maintain scalable cloud infrastructure. Implement CI/CD pipelines and ensure high availability of our services.",
      requirements: ["AWS", "Kubernetes", "Docker", "Terraform", "Python"],
      postedDate: "1 week ago"
    },
    {
      id: "5",
      title: "Data Scientist",
      company: "AI Innovations",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$130K - $170K",
      description: "Develop machine learning models and extract insights from large datasets. Work on cutting-edge AI projects.",
      requirements: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics"],
      postedDate: "4 days ago"
    },
    {
      id: "6",
      title: "Backend Developer",
      company: "StartupXYZ",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$100K - $130K",
      description: "Build robust APIs and microservices. Work with modern technologies in a fast-paced startup environment.",
      requirements: ["Node.js", "MongoDB", "Express", "REST APIs", "Microservices"],
      postedDate: "5 days ago"
    }
  ];

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