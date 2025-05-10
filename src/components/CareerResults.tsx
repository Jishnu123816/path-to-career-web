
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CareerPath } from "@/utils/careerApi";

interface CareerResultsProps {
  careers: CareerPath[];
  onReset: () => void;
}

const CareerResults: React.FC<CareerResultsProps> = ({ careers, onReset }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCardExpansion = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Your Career Recommendations</h2>
        <Button variant="outline" onClick={onReset}>
          Start Over
        </Button>
      </div>

      {careers.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No career recommendations found. Please try again with different answers.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {careers.map((career) => (
            <Card 
              key={career.id} 
              className={`transition-all duration-300 ${expandedCard === career.id ? 'ring-1 ring-primary' : 'hover:border-primary/50'}`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{career.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {career.description}
                    </CardDescription>
                  </div>
                  <Badge variant={career.matchScore > 85 ? "default" : "outline"} className="bg-career-purple">
                    {career.matchScore}% Match
                  </Badge>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Match Score</span>
                    <span>{career.matchScore}%</span>
                  </div>
                  <Progress value={career.matchScore} className="h-2" />
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Average Salary</p>
                    <p className="text-career-dark-purple font-semibold">{career.averageSalary}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Growth Rate</p>
                    <p>{career.growthRate}</p>
                  </div>
                </div>
                
                {expandedCard === career.id && (
                  <div className="mt-4 animate-fade-in">
                    <Separator className="mb-4" />
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Education Required</h4>
                        <p className="text-sm">{career.educationRequired}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Key Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.keySkills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant="ghost" 
                  className="w-full text-career-purple"
                  onClick={() => toggleCardExpansion(career.id)}
                >
                  {expandedCard === career.id ? "Show Less" : "Show More"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerResults;
