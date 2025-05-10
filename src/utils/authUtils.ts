
import { signIn as firebaseSignIn, createUser, auth } from "./firebase";

interface User {
  id: string;
  name: string;
  email: string;
  profileCompleted: boolean;
}

// Mock user data for demo
const MOCK_USERS = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
    profileCompleted: true
  }
];

// Sign in function
export const signIn = async (email: string, password: string): Promise<User | null> => {
  // Support demo@example.com flow for easy testing
  if (email === "demo@example.com") {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        const user = MOCK_USERS.find(u => u.email === email && u.password === password);
        
        if (user) {
          const { password, ...userWithoutPassword } = user;
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          resolve(null);
        }
      }, 800);
    });
  }

  // Use Firebase authentication for real users
  const { user, error } = await firebaseSignIn(email, password);
  
  if (user) {
    const userData: User = {
      id: user.uid,
      name: user.displayName || email.split('@')[0],
      email: user.email || email,
      profileCompleted: !!user.displayName
    };
    
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  }
  
  return null;
};

// Sign up function
export const signUp = async (name: string, email: string, password: string): Promise<User | null> => {
  // Support demo@example.com flow
  if (email === "demo@example.com") {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        // Check if email already exists
        const existingUser = MOCK_USERS.find(u => u.email === email);
        
        if (existingUser) {
          resolve(null);
        } else {
          const newUser = {
            id: `${MOCK_USERS.length + 1}`,
            name,
            email,
            password,
            profileCompleted: false
          };
          
          MOCK_USERS.push(newUser);
          
          const { password: _, ...userWithoutPassword } = newUser;
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        }
      }, 800);
    });
  }

  // Use Firebase authentication for real users
  const { user, error } = await createUser(email, password);
  
  if (user) {
    const userData: User = {
      id: user.uid,
      name: name || email.split('@')[0],
      email: user.email || email,
      profileCompleted: false
    };
    
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  }
  
  return null;
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem("isLoggedIn") === "true";
};
