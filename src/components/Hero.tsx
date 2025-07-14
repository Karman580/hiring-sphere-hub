import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Building } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover thousands of job opportunities with companies you love. 
            Take the next step in your career journey.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Job title, keywords..."
                  className="pl-10 h-12 border-0 focus:ring-primary"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  className="pl-10 h-12 border-0 focus:ring-primary"
                />
              </div>
              <Button size="lg" className="h-12 bg-primary hover:bg-primary-dark">
                Search Jobs
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1,200+</div>
              <div className="text-white/80">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-white/80">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10,000+</div>
              <div className="text-white/80">Job Seekers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;