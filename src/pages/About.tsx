
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-r from-career-soft-purple to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">About CareerPath</h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                We're on a mission to help people discover and pursue fulfilling career paths that match their skills, interests, and values.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4">
                  <p>
                    CareerPath was founded in 2023 by a team of career counselors, HR professionals, and AI specialists who recognized a common problem: too many people feel lost or unsatisfied in their career journeys.
                  </p>
                  <p>
                    We noticed that traditional career guidance often fails to account for the whole person—their unique combination of skills, interests, values, and circumstances. That's why we built CareerPath, an AI-powered platform that provides personalized career recommendations based on a comprehensive assessment.
                  </p>
                  <p>
                    Our goal is to help every individual find not just a job, but a fulfilling career path that aligns with who they are and who they want to become.
                  </p>
                </div>
              </div>
              <div className="bg-career-soft-purple p-8 rounded-lg">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <blockquote className="text-lg italic">
                    "The future belongs to those who believe in the beauty of their dreams."
                  </blockquote>
                  <p className="text-right mt-4">- Eleanor Roosevelt</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl">
                To empower individuals to make informed career decisions by providing personalized guidance and resources.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Personalization",
                  description: "We believe that career guidance should be as unique as the individuals seeking it.",
                  icon: "🎯",
                },
                {
                  title: "Accessibility",
                  description: "Career guidance should be accessible to everyone, regardless of background or location.",
                  icon: "🌍",
                },
                {
                  title: "Empowerment",
                  description: "We aim to give people the tools and confidence to take control of their career journeys.",
                  icon: "💪",
                },
              ].map((value, i) => (
                <Card key={i} className="text-center">
                  <CardContent className="pt-8">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're a diverse team of career specialists, AI experts, and passionate individuals committed to helping you find your path.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Rivera",
                  role: "Founder & CEO",
                  bio: "Former career counselor with 15+ years of experience helping people find their path.",
                },
                {
                  name: "Jordan Chen",
                  role: "Chief AI Officer",
                  bio: "AI specialist with a background in machine learning and career analytics.",
                },
                {
                  name: "Taylor Kim",
                  role: "Head of Career Research",
                  bio: "PhD in Organizational Psychology with expertise in workforce development.",
                },
              ].map((member, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-career-purple flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{member.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <h3 className="text-xl font-bold text-center">{member.name}</h3>
                    <p className="text-career-purple text-center mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-center">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-career-purple text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Path?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Take our career assessment today and discover career paths that align with your skills, interests, and values.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#questionnaire">
                <Button size="lg" variant="default" className="bg-white text-career-purple hover:bg-gray-100">
                  Take Assessment
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
