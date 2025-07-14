import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of professionals who have found their dream jobs through our platform. 
            Whether you're a job seeker or employer, we're here to help you succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl" 
              className="bg-white text-primary hover:bg-white/90 shadow-lg"
            >
              <Users className="h-5 w-5 mr-2" />
              Find Your Dream Job
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="xl"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              <Briefcase className="h-5 w-5 mr-2" />
              Post a Job
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">For Job Seekers</h3>
              <p className="text-white/80">
                Browse thousands of opportunities and apply with one click
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">For Employers</h3>
              <p className="text-white/80">
                Find the right talent quickly and efficiently
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Get Started</h3>
              <p className="text-white/80">
                Join our community and start your journey today
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;