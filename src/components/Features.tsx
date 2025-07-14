import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Users, Shield, Clock, Star, TrendingUp } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Job Search",
      description: "Advanced filters and AI-powered matching to find the perfect job opportunities for your skills and preferences."
    },
    {
      icon: Users,
      title: "Top Companies",
      description: "Access to exclusive job postings from leading companies across various industries and locations."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security. Apply to jobs with confidence."
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Get instant notifications about new job postings and application status updates."
    },
    {
      icon: Star,
      title: "Career Insights",
      description: "Access salary information, company reviews, and career advice from industry experts."
    },
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Find roles that offer career advancement and professional development in your field."
    }
  ];

  return (
    <section className="py-20 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose JobPortal?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We make job searching simple, efficient, and successful for both job seekers and employers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;