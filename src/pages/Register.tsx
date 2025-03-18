import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Register() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto my-10">
          <h1 className="text-2xl font-bold text-center mb-6">Create a Cricket Express Account</h1>
          <RegisterForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
