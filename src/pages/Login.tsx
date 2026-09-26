// src/pages/Login.tsx
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Code, MessageSquare, BarChart2 } from 'lucide-react';

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 533 544" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M533.5 278.4c0-17.5-1.5-35-4.6-51.9H272v98.1h147.5c-6.4 34.5-25.6 63.6-54.5 83.1v68.9h88c51.5-47.4 81.5-117.2 81.5-198.2z" />
      <path fill="#4285F4" d="M272 544.3c73.4 0 134.9-24.3 179.9-66.1l-88-68.9c-24.4 16.4-55.5 26-92 26-70.9 0-131-47.8-152.6-112.2H30.5v70.5c45.1 88.9 138.4 150.7 241.5 150.7z" />
      <path fill="#FBBC04" d="M119.4 322.1c-10.5-31.3-10.5-64.9 0-96.2V155.4H30.5c-41.2 80.1-41.2 174.6 0 254.7l88.9-68.9z" />
      <path fill="#34A853" d="M272 107.5c39.9-.6 78.5 15.3 107.4 43.9l80.5-80.5C430.9 24.6 353.4-2.5 272 0 168.9 0 75.6 61.8 30.5 150.7l88.9 70.5C141 155.3 201.1 107.5 272 107.5z" />
    </svg>
  );
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Please enter your email address.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      newErrors.email = 'Please enter a valid email address.';
    if (!password) newErrors.password = 'Please enter your password.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate auth call
    await new Promise((r) => setTimeout(r, 1500));
    // On success navigate to dashboard (hash based)
    window.location.hash = '#dashboard';
    setLoading(false);
  };

  const goTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle gradient shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-purple-200 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg overflow-hidden md:flex">
        {/* Left branding side */}
        <div className="hidden md:flex flex-col justify-between bg-[#E8F0FC] p-10">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">PlacementIQ</h1>
            <p className="text-xl text-gray-800 mb-6">Your Placement Journey Starts Here.</p>
            <p className="text-gray-600 mb-8">Prepare smarter. Practice consistently. Get placement‑ready.</p>
            <div className="grid gap-4">
              <FeatureCard icon={<Code className="w-6 h-6 text-primary" />} title="DSA Practice" desc="Master coding and problem solving" />
              <FeatureCard icon={<MessageSquare className="w-6 h-6 text-primary" />} title="Mock Interviews" desc="Practice real interview scenarios" />
              <FeatureCard icon={<BarChart2 className="w-6 h-6 text-primary" />} title="Career Analytics" desc="Track your preparation progress" />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-8">© 2026 PlacementIQ</div>
        </div>

        {/* Right login card */}
        <div className="flex-1 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Welcome back 👋</h2>
              <p className="text-gray-600">Continue your placement preparation</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={loading}
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    disabled={loading}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <button type="button" onClick={() => goTo('/forgot-password')} className="text-primary hover:underline">
                  Forgot password?
                </button>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-medium py-2 rounded-md hover:bg-primary/90 transition-shadow shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"></path>
                  </svg>
                ) : null}
                Login
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Google login */}
            <button
              type="button"
              onClick={() => alert('Google login not implemented')}
              className="w-full border border-primary text-primary font-medium py-2 rounded-md hover:bg-primary/10 flex items-center justify-center gap-2"
            >
              <GoogleIcon className="w-5 h-5" />
              Continue with Google
            </button>

            {/* Sign up link */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button type="button" onClick={() => goTo('/signup')} className="text-primary font-medium hover:underline">
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start space-x-3 p-3 bg-white rounded-md shadow-sm border border-gray-100">
      {icon}
      <div>
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
