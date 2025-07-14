import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Building } from "lucide-react";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    postedDate: string;
    logo?: string;
  };
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {job.logo ? (
              <img 
                src={job.logo} 
                alt={`${job.company} logo`} 
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-primary" />
              </div>
            )}
            <div>
              <CardTitle className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer">
                {job.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
          </div>
          <Badge variant={job.type === 'Full-time' ? 'default' : 'secondary'}>
            {job.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {job.location}
          </div>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            {job.salary}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {job.postedDate}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {job.requirements.slice(0, 3).map((req, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {req}
            </Badge>
          ))}
          {job.requirements.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.requirements.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          <Button size="sm" className="flex-1">
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;