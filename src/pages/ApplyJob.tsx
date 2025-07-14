import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Upload, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";

const ApplyJob = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    coverLetter: "",
    portfolio: "",
    linkedin: "",
    availability: "",
    agreeToTerms: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center">
            <CardContent className="pt-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Application Submitted Successfully!
              </h2>
              <p className="text-muted-foreground mb-8">
                Thank you for your interest in the Senior Frontend Developer position at TechCorp Inc. 
                We have received your application and will review it shortly. You should expect to hear 
                from us within 1-2 business days.
              </p>
              <div className="space-y-4">
                <Button size="lg" className="w-full sm:w-auto">
                  View My Applications
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Browse More Jobs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Job Details
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Apply for Senior Frontend Developer</CardTitle>
                <p className="text-muted-foreground">TechCorp Inc • San Francisco, CA</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">Current Location *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="City, State"
                        required
                      />
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Professional Information</h3>
                    <div>
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Select 
                        value={formData.experience} 
                        onValueChange={(value) => handleInputChange("experience", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="2-3">2-3 years</SelectItem>
                          <SelectItem value="4-5">4-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange("linkedin", e.target.value)}
                        placeholder="https://linkedin.com/in/your-profile"
                      />
                    </div>
                    <div>
                      <Label htmlFor="portfolio">Portfolio/Website</Label>
                      <Input
                        id="portfolio"
                        value={formData.portfolio}
                        onChange={(e) => handleInputChange("portfolio", e.target.value)}
                        placeholder="https://your-portfolio.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="availability">Availability *</Label>
                      <Select 
                        value={formData.availability} 
                        onValueChange={(value) => handleInputChange("availability", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="When can you start?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediately">Immediately</SelectItem>
                          <SelectItem value="2-weeks">2 weeks notice</SelectItem>
                          <SelectItem value="1-month">1 month notice</SelectItem>
                          <SelectItem value="2-months">2+ months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Cover Letter</h3>
                    <div>
                      <Label htmlFor="coverLetter">Tell us why you're interested in this role</Label>
                      <Textarea
                        id="coverLetter"
                        value={formData.coverLetter}
                        onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                        placeholder="Share your motivation, relevant experience, and what you can bring to the team..."
                        rows={6}
                      />
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Resume & Documents</h3>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOC, or DOCX (max 5MB)
                      </p>
                      <Button variant="outline" className="mt-4">
                        Choose File
                      </Button>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex space-x-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="flex-1"
                      disabled={!formData.agreeToTerms}
                    >
                      Submit Application
                    </Button>
                    <Button type="button" variant="outline" size="lg">
                      Save as Draft
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Job Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Position</p>
                  <p className="font-medium">Senior Frontend Developer</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium">TechCorp Inc</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">San Francisco, CA</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Salary</p>
                  <p className="font-medium">$120K - $160K</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">Full-time</p>
                </div>
              </CardContent>
            </Card>

            {/* Application Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Application Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Tailor your resume</p>
                    <p className="text-xs text-muted-foreground">
                      Highlight relevant skills and experience
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Write a compelling cover letter</p>
                    <p className="text-xs text-muted-foreground">
                      Show your enthusiasm and fit for the role
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Include a portfolio</p>
                    <p className="text-xs text-muted-foreground">
                      Showcase your best work and projects
                    </p>
                  </div>
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

export default ApplyJob;