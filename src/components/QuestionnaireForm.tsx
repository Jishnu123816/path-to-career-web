import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { getCareerRecommendations, LinkedInProfile, connectWithLinkedIn } from "@/utils/careerApi";

// Defining the schema for our form
const formSchema = z.object({
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  otherInterests: z.string().optional(),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  otherSkills: z.string().optional(),
  values: z.array(z.string()).min(1, "Please select at least one value"),
  workEnvironment: z.string({
    required_error: "Please select your preferred work environment",
  }),
  educationLevel: z.string({
    required_error: "Please select your education level",
  }),
  experienceYears: z.string().transform((val) => parseInt(val, 10)),
});

type QuestionnaireFormValues = z.infer<typeof formSchema>;

interface QuestionnaireFormProps {
  onSubmit: (answers: any) => void;
  linkedInProfile?: LinkedInProfile;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ onSubmit, linkedInProfile }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [linkedIn, setLinkedIn] = useState<LinkedInProfile | undefined>(linkedInProfile);

  const form = useForm<QuestionnaireFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: [],
      otherInterests: "",
      skills: linkedIn?.skills || [],
      otherSkills: "",
      values: [],
      workEnvironment: "",
      educationLevel: "",
      experienceYears: "0",
    },
  });

  const handleConnectLinkedIn = async () => {
    try {
      const profile = await connectWithLinkedIn();
      setLinkedIn(profile);
      
      if (profile.skills) {
        const currentSkills = form.getValues("skills");
        const combinedSkills = [...new Set([...currentSkills, ...profile.skills])];
        form.setValue("skills", combinedSkills);
      }
      
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
    }
  };

  const handleFormSubmit = async (values: QuestionnaireFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Process form values
      const formData = {
        ...values,
        // Add any additional processing here
        interests: [
          ...values.interests,
          ...(values.otherInterests ? [values.otherInterests] : []),
        ],
        skills: [
          ...values.skills,
          ...(values.otherSkills ? [values.otherSkills] : []),
        ],
      };
      
      // Get career recommendations
      const recommendations = await getCareerRecommendations(formData);
      
      // Call onSubmit with recommendations
      onSubmit(recommendations);
      
      toast({
        title: "Assessment Complete",
        description: "Your career recommendations are ready!",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was a problem processing your assessment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="mb-6 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Career Assessment Questionnaire</h3>
          <Button
            type="button"
            variant={linkedIn?.connected ? "outline" : "default"}
            onClick={handleConnectLinkedIn}
            disabled={linkedIn?.connected}
          >
            {linkedIn?.connected ? "LinkedIn Connected" : "Connect LinkedIn"}
          </Button>
        </div>

        {linkedIn?.connected && (
          <div className="bg-career-soft-purple p-4 mb-6 rounded-md">
            <p className="font-medium">LinkedIn Profile Connected</p>
            <p className="text-sm text-muted-foreground">
              We've pre-filled some fields based on your LinkedIn profile.
            </p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Interests Section */}
            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <FormLabel>What are your interests?</FormLabel>
                  <FormDescription>
                    Select all areas that interest you.
                  </FormDescription>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {[
                      { id: "technology", label: "Technology" },
                      { id: "science", label: "Science" },
                      { id: "arts", label: "Arts & Design" },
                      { id: "business", label: "Business & Finance" },
                      { id: "healthcare", label: "Healthcare" },
                      { id: "education", label: "Education" },
                      { id: "engineering", label: "Engineering" },
                      { id: "marketing", label: "Marketing" },
                      { id: "media", label: "Media & Communication" },
                    ].map((interest) => (
                      <FormField
                        key={interest.id}
                        control={form.control}
                        name="interests"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(interest.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, interest.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== interest.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {interest.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Other Interests */}
            <FormField
              control={form.control}
              name="otherInterests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other interests (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., photography, cooking, traveling" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Skills Section */}
            <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem>
                  <FormLabel>What skills do you have?</FormLabel>
                  <FormDescription>
                    Select all skills that apply to you.
                  </FormDescription>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {[
                      { id: "programming", label: "Programming" },
                      { id: "writing", label: "Writing" },
                      { id: "analysis", label: "Data Analysis" },
                      { id: "design", label: "Design" },
                      { id: "communication", label: "Communication" },
                      { id: "management", label: "Management" },
                      { id: "problem-solving", label: "Problem Solving" },
                      { id: "teamwork", label: "Teamwork" },
                      { id: "leadership", label: "Leadership" },
                    ].map((skill) => (
                      <FormField
                        key={skill.id}
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(skill.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, skill.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== skill.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {skill.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Other Skills */}
            <FormField
              control={form.control}
              name="otherSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other skills (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., public speaking, social media marketing" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Values Section */}
            <FormField
              control={form.control}
              name="values"
              render={() => (
                <FormItem>
                  <FormLabel>What work values are important to you?</FormLabel>
                  <FormDescription>
                    Select all values that matter to you in a job.
                  </FormDescription>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {[
                      { id: "work-life-balance", label: "Work-Life Balance" },
                      { id: "salary", label: "High Salary" },
                      { id: "creativity", label: "Creativity" },
                      { id: "independence", label: "Independence" },
                      { id: "challenge", label: "Intellectual Challenge" },
                      { id: "helping", label: "Helping Others" },
                      { id: "recognition", label: "Recognition" },
                      { id: "security", label: "Job Security" },
                      { id: "growth", label: "Growth Opportunities" },
                    ].map((value) => (
                      <FormField
                        key={value.id}
                        control={form.control}
                        name="values"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(value.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, value.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (val) => val !== value.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {value.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Work Environment */}
            <FormField
              control={form.control}
              name="workEnvironment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred work environment</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select work environment" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="office">Traditional Office</SelectItem>
                      <SelectItem value="remote">Remote Work</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="outdoors">Outdoors</SelectItem>
                      <SelectItem value="travel">Frequent Travel</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Education Level */}
            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your highest level of education?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="high-school">High School / GED</SelectItem>
                      <SelectItem value="associate">Associate's Degree</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="doctorate">Doctorate / PhD</SelectItem>
                      <SelectItem value="vocational">Vocational / Trade School</SelectItem>
                      <SelectItem value="self-taught">Self-Taught</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Experience Years */}
            <FormField
              control={form.control}
              name="experienceYears"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of work experience</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select years of experience" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">No experience</SelectItem>
                      <SelectItem value="1">Less than 1 year</SelectItem>
                      <SelectItem value="2">1-2 years</SelectItem>
                      <SelectItem value="5">3-5 years</SelectItem>
                      <SelectItem value="10">6-10 years</SelectItem>
                      <SelectItem value="15">More than 10 years</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Get Career Recommendations"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuestionnaireForm;
