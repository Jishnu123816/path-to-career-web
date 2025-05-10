
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { List } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if user is logged in from localStorage
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account.",
    });
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    ...(isLoggedIn ? [{ name: "Profile", path: "/profile" }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-career-purple flex items-center justify-center">
              <span className="text-white font-bold">CP</span>
            </div>
            <span className="font-bold text-xl">CareerPath</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium hover-underline ${
                isActive(item.path) ? "text-primary font-semibold" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons or Account Menu */}
        <div className="hidden md:flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <Link to="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : (
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <List className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium hover:text-primary transition-colors ${
                    isActive(item.path) ? "text-primary font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {!isLoggedIn ? (
                <>
                  <Link to="/signin" className="w-full">
                    <Button variant="outline" className="w-full mt-2">Sign In</Button>
                  </Link>
                  <Link to="/signup" className="w-full">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              ) : (
                <Button variant="outline" onClick={handleSignOut} className="w-full mt-2">
                  Sign Out
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
