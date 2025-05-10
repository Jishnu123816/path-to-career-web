
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  // Check if user is logged in from localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center min-h-[600px] justify-center py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-career-soft-purple/20 via-background to-career-soft-purple/20 z-[-1]" />
        <div
          className="absolute w-[300px] h-[300px] rounded-full bg-career-purple/20 blur-[120px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[-1]"
        />
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 animate-fade-in">
          Discover Your <span className="text-career-purple">Perfect Career</span> Path
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-[800px] mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Answer a few questions about your skills and preferences, and we'll help you find your ideal career path with AI-powered recommendations.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {isLoggedIn ? (
            <Link to="/#questionnaire" className="w-full sm:w-auto">
              <Button size="lg" className="w-full px-8">
                Take the Assessment
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full px-8">
                  Get Started
                </Button>
              </Link>
              <Link to="/signin" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full px-8">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
        
        <div className="mt-16 w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
            {[
              { count: "50+", label: "Career Paths" },
              { count: "100k+", label: "Users Helped" },
              { count: "98%", label: "Accuracy" },
              { count: "24/7", label: "Support" }
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-lg bg-white shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-career-purple">{stat.count}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
