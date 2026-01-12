import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LovableLogo from "./LovableLogo";
import GoogleIcon from "./GoogleIcon";
import GitHubIcon from "./GitHubIcon";
import ShieldIcon from "./ShieldIcon";

const LoginForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with email:", email);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <LovableLogo className="w-10 h-10 mb-8" />
      
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Log in</h1>
      
      <div className="space-y-3 mb-6">
        <Button 
          variant="outline" 
          className="w-full h-11 justify-center gap-3 font-normal text-sm"
        >
          <GoogleIcon className="w-5 h-5" />
          Continue with Google
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full h-11 justify-center gap-3 font-normal text-sm"
        >
          <GitHubIcon className="w-5 h-5" />
          Continue with GitHub
        </Button>
      </div>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground tracking-wider">Or</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
          />
        </div>
        
        <Button type="submit" className="w-full h-11 font-medium">
          Continue
        </Button>
      </form>
      
      <p className="text-center text-sm text-muted-foreground mt-6">
        Don't have an account?{" "}
        <a 
          href="#" 
          className="text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors"
        >
          Create your account
        </a>
      </p>
      
      <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
        <ShieldIcon className="w-4 h-4" />
        <span>
          SSO available on{" "}
          <a 
            href="#" 
            className="text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors"
          >
            Business and Enterprise
          </a>{" "}
          plans
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
