import LoginForm from "@/components/LoginForm";
import PromptInput from "@/components/PromptInput";

const Index = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <LoginForm />
      </div>
      
      {/* Right Panel - Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 login-gradient m-3 rounded-2xl items-center justify-center relative overflow-hidden">
        <PromptInput />
      </div>
    </div>
  );
};

export default Index;
