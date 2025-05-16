
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import PageLayout from "../components/layout/PageLayout";
import { Loader2 } from "lucide-react";

const Home = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"pensioner" | "admin">("pensioner");
  const [loading, setLoading] = useState(false);
  
  const [pensionerInputs, setPensionerInputs] = useState({
    aadhaarNumber: "",
    password: "",
  });
  
  const [adminInputs, setAdminInputs] = useState({
    email: "",
    password: "",
  });

  const handlePensionerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPensionerInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handlePensionerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login({
        identifier: pensionerInputs.aadhaarNumber,
        password: pensionerInputs.password,
        role: "pensioner",
      });
      
      toast({
        title: "Login Successful",
        description: "Welcome to the Pension Verification Portal.",
      });
      
      navigate("/pensioner/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid Aadhaar number or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login({
        identifier: adminInputs.email,
        password: adminInputs.password,
        role: "admin",
      });
      
      toast({
        title: "Login Successful",
        description: "Welcome back, Administrator.",
      });
      
      navigate("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-700">Pension Verification Portal</h1>
            <p className="text-gray-600 mt-2">
              Secure verification system for pensioners using Aadhaar and face recognition
            </p>
          </div>

          <Tabs defaultValue="pensioner" className="w-full" onValueChange={(value) => setActiveTab(value as "pensioner" | "admin")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pensioner">Pensioner Login</TabsTrigger>
              <TabsTrigger value="admin">Administrator Login</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pensioner">
              <Card>
                <CardHeader>
                  <CardTitle>Pensioner Login</CardTitle>
                  <CardDescription>
                    Login with your Aadhaar number and password to access pension services.
                  </CardDescription>
                </CardHeader>
                
                <form onSubmit={handlePensionerLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                      <Input
                        id="aadhaarNumber"
                        name="aadhaarNumber"
                        placeholder="Enter your 12-digit Aadhaar number"
                        required
                        value={pensionerInputs.aadhaarNumber}
                        onChange={handlePensionerInputChange}
                        pattern="[0-9]{12}"
                        title="Aadhaar number must be 12 digits"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pensionerPassword">Password</Label>
                      <Input
                        id="pensionerPassword"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        value={pensionerInputs.password}
                        onChange={handlePensionerInputChange}
                      />
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>Administrator Login</CardTitle>
                  <CardDescription>
                    Login with your email and password to access the administrator dashboard.
                  </CardDescription>
                </CardHeader>
                
                <form onSubmit={handleAdminLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        required
                        value={adminInputs.email}
                        onChange={handleAdminInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="adminPassword">Password</Label>
                      <Input
                        id="adminPassword"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        value={adminInputs.password}
                        onChange={handleAdminInputChange}
                      />
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
