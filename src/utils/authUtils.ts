
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
export const signIn = (email: string, password: string): Promise<User | null> => {
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
};

// Sign up function
export const signUp = (name: string, email: string, password: string): Promise<User | null> => {
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
