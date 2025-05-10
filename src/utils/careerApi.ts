
// Career path data types
export interface CareerPath {
  id: string;
  title: string;
  description: string;
  averageSalary: string;
  growthRate: string;
  educationRequired: string;
  keySkills: string[];
  matchScore: number;
}

interface QuestionnaireAnswers {
  interests: string[];
  skills: string[];
  values: string[];
  workEnvironment: string;
  educationLevel: string;
  experienceYears: number;
}

// Mock API for career recommendations
export const getCareerRecommendations = (
  answers: QuestionnaireAnswers
): Promise<CareerPath[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // This is where you would normally make an API call to get real recommendations
      // based on the questionnaire answers

      // Mock career paths based on user interests and skills
      const careerPaths: CareerPath[] = [
        {
          id: "1",
          title: "Software Developer",
          description: "Develop and maintain software applications for various platforms.",
          averageSalary: "$105,000",
          growthRate: "22% (Much faster than average)",
          educationRequired: "Bachelor's degree in Computer Science or related field",
          keySkills: ["JavaScript", "Python", "Problem Solving", "Teamwork"],
          matchScore: calculateMatchScore(answers, ["technology", "problem solving", "programming"]),
        },
        {
          id: "2",
          title: "UX/UI Designer",
          description: "Design user interfaces and experiences for digital products.",
          averageSalary: "$85,000",
          growthRate: "13% (Faster than average)",
          educationRequired: "Bachelor's degree in Design or related field",
          keySkills: ["User Research", "Wireframing", "Visual Design", "Prototyping"],
          matchScore: calculateMatchScore(answers, ["design", "creativity", "technology"]),
        },
        {
          id: "3",
          title: "Data Scientist",
          description: "Analyze and interpret complex data to help organizations make better decisions.",
          averageSalary: "$122,000",
          growthRate: "36% (Much faster than average)",
          educationRequired: "Master's degree in Statistics, Computer Science, or related field",
          keySkills: ["Python", "R", "Machine Learning", "Statistics", "Big Data"],
          matchScore: calculateMatchScore(answers, ["mathematics", "technology", "analytics"]),
        },
        {
          id: "4",
          title: "Marketing Manager",
          description: "Plan and oversee marketing campaigns to promote products or services.",
          averageSalary: "$93,000",
          growthRate: "10% (Faster than average)",
          educationRequired: "Bachelor's degree in Marketing or related field",
          keySkills: ["Communication", "Creativity", "Strategy", "Social Media"],
          matchScore: calculateMatchScore(answers, ["communication", "marketing", "creativity"]),
        },
        {
          id: "5",
          title: "Financial Analyst",
          description: "Evaluate financial data and make recommendations for businesses.",
          averageSalary: "$83,000",
          growthRate: "9% (As fast as average)",
          educationRequired: "Bachelor's degree in Finance or related field",
          keySkills: ["Financial Modeling", "Excel", "Data Analysis", "Attention to Detail"],
          matchScore: calculateMatchScore(answers, ["finance", "mathematics", "analytics"]),
        },
      ];

      // Sort by match score
      const sortedCareers = careerPaths.sort((a, b) => b.matchScore - a.matchScore);
      
      resolve(sortedCareers);
    }, 1500);
  });
};

// Calculate a match score based on user answers and career keywords
const calculateMatchScore = (answers: QuestionnaireAnswers, careerKeywords: string[]): number => {
  let score = 70; // Base score
  
  // Check if user interests match career keywords
  answers.interests.forEach(interest => {
    if (careerKeywords.some(keyword => interest.toLowerCase().includes(keyword))) {
      score += 5;
    }
  });
  
  // Check if user skills match career keywords
  answers.skills.forEach(skill => {
    if (careerKeywords.some(keyword => skill.toLowerCase().includes(keyword))) {
      score += 5;
    }
  });
  
  // Add some randomness (in a real app this would be more sophisticated)
  score += Math.floor(Math.random() * 10);
  
  // Cap score at 100
  return Math.min(score, 100);
};

// Mock LinkedIn profile data
export interface LinkedInProfile {
  connected: boolean;
  name?: string;
  headline?: string;
  skills?: string[];
}

// Mock function to get LinkedIn profile
export const getLinkedInProfile = (): Promise<LinkedInProfile> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // In a real app, this would connect to the LinkedIn API
      resolve({
        connected: false
      });
    }, 800);
  });
};

// Mock function to connect with LinkedIn
export const connectWithLinkedIn = (): Promise<LinkedInProfile> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Mock LinkedIn profile data
      resolve({
        connected: true,
        name: "Alex Johnson",
        headline: "Software Engineer at Tech Company",
        skills: ["JavaScript", "React", "Node.js", "Problem Solving"]
      });
    }, 1200);
  });
};
