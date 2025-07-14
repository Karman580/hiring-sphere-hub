import { Button } from "@/components/ui/button";
import { Menu, X, User, Briefcase } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-foreground">JobPortal</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Jobs
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Companies
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button variant="cta" size="sm">
              Post Job
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">
                Jobs
              </a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">
                Companies
              </a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">
                About
              </a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">
                Contact
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-border">
              <div className="flex items-center px-2 space-x-3">
                <Button variant="ghost" size="sm" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button variant="cta" size="sm" className="w-full">
                  Post Job
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;