import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Mail, Phone } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!identifier.trim() || !password) {
      setError("Please enter your email/phone and password");
      return;
    }
    
    // Format the identifier based on input type
    let formattedIdentifier = identifier.trim();
    
    if (!isEmailLogin) {
      // Remove all non-numeric characters for phone number
      formattedIdentifier = formattedIdentifier.replace(/\D/g, '');
      
      // Basic phone number validation
      if (formattedIdentifier.length < 10 || formattedIdentifier.length > 15) {
        setError("Please enter a valid phone number (10-15 digits)");
        return;
      }
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formattedIdentifier)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(formattedIdentifier, password);
      
      // Show success toast
      toast({
        title: "Login successful",
        description: "Welcome back to gBay!",
        variant: "default",
      });
      
      // Redirect to home page or intended URL
      const searchParams = new URLSearchParams(window.location.search);
      const redirectTo = searchParams.get('redirectTo') || "/";
      navigate(redirectTo);
      
    } catch (err: any) {
      console.error("Login error:", err);
      const message = typeof err === "string" ? err : err?.message ?? "An error occurred during login. Please try again later.";
      
      // More specific error messages
      if (message.includes("Invalid login credentials")) {
        setError("Incorrect email/phone or password. Please try again.");
      } else if (message.includes("Email not confirmed")) {
        setError("Please verify your email before logging in.");
      } else if (message.includes("Invalid phone number")) {
        setError("Please enter a valid phone number.");
      } else {
        setError(message);
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Log in to your gBay account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="identifier">
                  {isEmailLogin ? "Email Address" : "Phone Number"}
                </Label>
                <button
                  type="button"
                  onClick={() => {
                    setIdentifier("");
                    setError("");
                    setIsEmailLogin(!isEmailLogin);
                  }}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {isEmailLogin ? "Use phone number" : "Use email"}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {isEmailLogin ? (
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <Input
                  id="identifier"
                  type={isEmailLogin ? "email" : "tel"}
                  placeholder={
                    isEmailLogin 
                      ? "Enter your email address" 
                      : "Enter your phone number"
                  }
                  value={identifier}
                  onChange={(e) => 
                    isEmailLogin
                      ? setIdentifier(e.target.value)
                      : setIdentifier(e.target.value.replace(/\D/g, ''))
                  }
                  className={`pl-10`}
                  autoComplete={isEmailLogin ? "email" : "tel"}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="text-primary hover:underline"
              tabIndex={-1}
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
