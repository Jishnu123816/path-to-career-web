
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import QuestionnaireForm from "@/components/QuestionnaireForm";
import CareerResults from "@/components/CareerResults";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CareerPath, getLinkedInProfile, LinkedInProfile } from "@/utils/careerApi";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { isAuthenticated } from "@/utils/authUtils";
import { useEffect } from "react";

const Index = () => {
  const [careerResults, setCareerResults] = useState<CareerPath[] | null>(null);
  const [linkedInProfile, setLinkedInProfile] = useState<LinkedInProfile | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check authentication status
    setIsLoggedIn(isAuthenticated());
    
    // Get LinkedIn profile
    const fetchLinkedInProfile = async () => {
      try {
        const profile = await getLinkedInProfile();
        setLinkedInProfile(profile);
      } catch (error) {
        console.error("Error fetching LinkedIn profile:", error);
      }
    };
    
    fetchLinkedInProfile();
  }, []);

  const handleQuestionnaireSubmit = (results: CareerPath[]) => {
    setCareerResults(results);
    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleReset = () => {
    setCareerResults(null);
    // Scroll to questionnaire
    setTimeout(() => {
      document.getElementById("questionnaire")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our career path recommender uses AI to analyze your skills, interests, and preferences to suggest the best career options for you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Complete Assessment",
                  description: "Answer questions about your interests, skills, and preferences.",
                  icon: "📋",
                },
                {
                  title: "AI Analysis",
                  description: "Our algorithm analyzes your responses to find matching careers.",
                  icon: "🧠",
                },
                {
                  title: "Get Recommendations",
                  description: "Review personalized career suggestions with detailed information.",
                  icon: "🚀",
                },
              ].map((feature, i) => (
                <Card key={i} className="border-border">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <CardTitle className="mb-2">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Questionnaire Section */}
        <section id="questionnaire" className="py-12 md:py-20 bg-gray-50">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            {isLoggedIn ? (
              careerResults === null ? (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-3">Career Assessment</h2>
                    <p className="text-muted-foreground">
                      Answer a few questions about yourself to get personalized career recommendations.
                    </p>
                  </div>
                  <QuestionnaireForm 
                    onSubmit={handleQuestionnaireSubmit} 
                    linkedInProfile={linkedInProfile}
                  />
                </div>
              ) : (
                <div id="results" className="pt-8">
                  <CareerResults careers={careerResults} onReset={handleReset} />
                </div>
              )
            ) : (
              <div className="text-center space-y-6 py-8">
                <h2 className="text-3xl font-bold">Sign In to Access the Career Assessment</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Create an account or sign in to take the career assessment and get personalized recommendations.
                </p>
                <div className="flex justify-center gap-4">
                  <a href="/signin" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">Sign In</a>
                  <a href="/signup" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground">Sign Up</a>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Success Stories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how CareerPath has helped others find their dream careers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "CareerPath helped me discover my passion for UX design. I've since changed careers and couldn't be happier!",
                  author: "Sarah T.",
                  role: "UX Designer"
                },
                {
                  quote: "I was lost after college, but the career assessment pointed me in the right direction. Now I'm a thriving data analyst.",
                  author: "Michael R.",
                  role: "Data Analyst"
                },
                {
                  quote: "The recommendations were spot on! I found a career that aligns with my values and skills, and I'm much more fulfilled.",
                  author: "Jessica K.",
                  role: "Marketing Manager"
                }
              ].map((testimonial, i) => (
                <Card key={i} className="border-border">
                  <CardContent className="pt-6">
                    <p className="italic mb-4">"{testimonial.quote}"</p>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
