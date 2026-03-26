import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Loader2 } from "lucide-react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", { email, password, role });
      login(res.data.user);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-gray-900 bg-gray-50 flex-col lg:flex-row -mt-20">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
          alt="Travel view" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h1 className="text-5xl font-bold mb-4">Discover the world</h1>
            <p className="text-xl">Join Wanderlust to unlock extraordinary experiences.</p>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white min-h-screen pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white border border-gray-100 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-500">Sign in to continue your journey</p>
          </div>

          <div className="flex p-1 bg-gray-100 rounded-lg mb-8">
            <button 
              onClick={() => setRole("user")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === "user" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
            >
              Tourist
            </button>
            <button 
              onClick={() => setRole("admin")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === "admin" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all focus:bg-white"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-500 hover:text-red-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
