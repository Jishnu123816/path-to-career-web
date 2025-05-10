
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { getCurrentUser, isAuthenticated } from "@/utils/authUtils";
import { LinkedInProfile, connectWithLinkedIn } from "@/utils/careerApi";

interface User {
  id: string;
  name: string;
  email: string;
  profileCompleted: boolean;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [linkedInProfile, setLinkedInProfile] = useState<LinkedInProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    phone: "",
    education: "",
    experience: "",
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to view your profile",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }

    // Get current user
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setProfileForm((prev) => ({
        ...prev,
        name: currentUser.name,
        email: currentUser.email,
      }));
    }
  }, [navigate, toast]);

  const handleConnectLinkedIn = async () => {
    setIsLoading(true);
    try {
      const profile = await connectWithLinkedIn();
      setLinkedInProfile(profile);
      
      toast({
        title: "LinkedIn Connected",
        description: "Your LinkedIn profile has been connected successfully.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to LinkedIn. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (user) {
        // Update localStorage
        const updatedUser = {
          ...user,
          name: profileForm.name,
          profileCompleted: true,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
      }
      setIsLoading(false);
    }, 800);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-career-purple flex items-center justify-center mb-4">
                      <span className="text-white text-2xl font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                    
                    <Button 
                      variant={linkedInProfile?.connected ? "outline" : "default"} 
                      size="sm"
                      className="w-full"
                      onClick={handleConnectLinkedIn}
                      disabled={linkedInProfile?.connected || isLoading}
                    >
                      {linkedInProfile?.connected ? "LinkedIn Connected" : "Connect LinkedIn"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-3">Quick Links</h3>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      My Assessments
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Saved Careers
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Account Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full md:w-[400px] grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="assessments">Assessments</TabsTrigger>
                  <TabsTrigger value="careers">Saved Careers</TabsTrigger>
                </TabsList>
                
                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your profile information here.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={profileForm.name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={profileForm.email}
                              onChange={handleInputChange}
                              disabled
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              name="location"
                              placeholder="City, State/Province"
                              value={profileForm.location}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              name="phone"
                              placeholder="Your phone number"
                              value={profileForm.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            placeholder="Tell us about yourself"
                            value={profileForm.bio}
                            onChange={handleInputChange}
                            rows={3}
                          />
                        </div>
                        
                        <Button type="button" onClick={handleUpdateProfile} disabled={isLoading}>
                          {isLoading ? "Updating..." : "Update Profile"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Details</CardTitle>
                      <CardDescription>
                        Add information about your education and work experience.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="education">Education</Label>
                          <Textarea
                            id="education"
                            name="education"
                            placeholder="Your educational background"
                            value={profileForm.education}
                            onChange={handleInputChange}
                            rows={3}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="experience">Work Experience</Label>
                          <Textarea
                            id="experience"
                            name="experience"
                            placeholder="Your work experience"
                            value={profileForm.experience}
                            onChange={handleInputChange}
                            rows={3}
                          />
                        </div>
                        
                        <Button type="button" onClick={handleUpdateProfile} disabled={isLoading}>
                          {isLoading ? "Updating..." : "Save Details"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                  
                  {linkedInProfile?.connected && (
                    <Card>
                      <CardHeader>
                        <CardTitle>LinkedIn Profile</CardTitle>
                        <CardDescription>
                          Information imported from your LinkedIn profile.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-1">Profile Name</h4>
                            <p>{linkedInProfile.name}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-1">Headline</h4>
                            <p>{linkedInProfile.headline}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {linkedInProfile.skills?.map((skill, index) => (
                                <Badge key={index} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                {/* Assessments Tab */}
                <TabsContent value="assessments">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Assessments</CardTitle>
                      <CardDescription>
                        View your completed career assessments.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Career Assessment - Basic</h3>
                              <p className="text-sm text-muted-foreground">
                                Completed on May 8, 2025
                              </p>
                            </div>
                            <Button variant="outline" size="sm">View Results</Button>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="rounded-lg border p-4 opacity-70">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Personality Assessment</h3>
                              <p className="text-sm text-muted-foreground">
                                Not completed
                              </p>
                            </div>
                            <Button variant="outline" size="sm">Take Assessment</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Saved Careers Tab */}
                <TabsContent value="careers">
                  <Card>
                    <CardHeader>
                      <CardTitle>Saved Career Paths</CardTitle>
                      <CardDescription>
                        Review and manage your saved career paths.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Software Developer</h3>
                              <p className="text-sm text-muted-foreground">
                                95% Match • Saved on May 8, 2025
                              </p>
                            </div>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                        
                        <div className="rounded-lg border p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">UX/UI Designer</h3>
                              <p className="text-sm text-muted-foreground">
                                89% Match • Saved on May 8, 2025
                              </p>
                            </div>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                        
                        <div className="rounded-lg border p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Data Scientist</h3>
                              <p className="text-sm text-muted-foreground">
                                82% Match • Saved on May 8, 2025
                              </p>
                            </div>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
