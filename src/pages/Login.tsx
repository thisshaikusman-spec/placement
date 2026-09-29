// src/pages/Login.tsx
import { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Code,
  MessageSquare,
  BarChart2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { LOGO_URL } from '../data/mockData';
import { supabase } from '../lib/supabaseClient';

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

interface LoginProps {
  onLogin?: (name: string, email: string, avatarUrl?: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!password.trim()) {
      newErrors.password = 'Please enter your password.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSuccessfulEntry = (name: string, entryEmail: string, avatarUrl?: string) => {
    if (onLogin) {
      onLogin(name, entryEmail, avatarUrl);
    } else {
      window.location.hash = '#dashboard';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate auth latency
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    // Derive name from the email prefix
    const prefix = email.split('@')[0] ?? '';
    const derivedName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    handleSuccessfulEntry(derivedName, email.trim());
  };

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + window.location.pathname,
      },
    });
    // After redirect, App.tsx picks up the session via onAuthStateChange.
  };

  const handleFillDemoCredentials = () => {
    setEmail('ananya.sharma@tier1.edu');
    setPassword('Placement2026!');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-body-md text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Dynamic ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-120px] left-[-120px] w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-140px] right-[-140px] w-96 h-96 bg-secondary-fixed/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tertiary-fixed/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl border border-surface-container/60 overflow-hidden md:flex relative z-10">
        {/* Left Branding Showcase Panel */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E1B4B] text-white p-10 md:w-5/12 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <img
                src={LOGO_URL}
                alt="PlacementIQ Logo"
                className="h-10 w-auto object-contain bg-white/10 rounded-xl p-1.5 backdrop-blur-md"
              />
              <span className="text-2xl font-bold tracking-tight text-white">
                Placement<span className="text-blue-400">IQ</span>
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4 border border-blue-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered Placement Suite</span>
            </div>

            <h1 className="text-3xl font-extrabold text-white leading-tight mb-3">
              Your Placement Journey Starts Here.
            </h1>
            <p className="text-slate-300 text-sm mb-8 leading-relaxed">
              Prepare smarter with adaptive DSA practice, realistic AI video interviews, and verified skill diagnostics.
            </p>

            <div className="space-y-3.5">
              <FeatureCard
                icon={<Code className="w-5 h-5 text-blue-400" />}
                title="Adaptive DSA Practice"
                desc="Curated company tracks with real-time code runner"
              />
              <FeatureCard
                icon={<MessageSquare className="w-5 h-5 text-indigo-400" />}
                title="AI Mock Interviews"
                desc="Alex, our AI Senior Evaluator with live audio/video"
              />
              <FeatureCard
                icon={<BarChart2 className="w-5 h-5 text-emerald-400" />}
                title="Readiness Diagnostics"
                desc="Granular metrics calibrated against Tier-1 cutoffs"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Campus Verified</span>
            </div>
            <span>© 2026 PlacementIQ</span>
          </div>
        </div>

        {/* Right Form & Demo Entry Card */}
        <div className="flex-1 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            
            {/* Header */}
            <div className="mb-6">
              <div className="md:hidden flex items-center gap-2 mb-4">
                <img src={LOGO_URL} alt="PlacementIQ" className="h-8 w-auto" />
                <span className="text-xl font-bold text-slate-900">
                  Placement<span className="text-primary">IQ</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Welcome back 👋
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Log in to continue your placement preparation track.
              </p>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-xs uppercase font-medium text-slate-400 absolute">
                Or sign in with email
              </span>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700" htmlFor="login-email">
                    Email Address
                  </label>
                  <button
                    type="button"
                    onClick={handleFillDemoCredentials}
                    className="text-[11px] text-blue-600 hover:underline font-medium"
                  >
                    Use sample email
                  </button>
                </div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="you@college.edu"
                    className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      errors.email ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
                    }`}
                    disabled={loading}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="login-password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 border rounded-xl text-sm transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      errors.password ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
                    }`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500 font-medium">{errors.password}</p>}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    disabled={loading}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Remember me for 30 days</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link would be sent to your registered email.')}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-xl shadow transition-all duration-150 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>Sign In to PlacementIQ</span>
                )}
              </button>
            </form>

            {/* Google alternative */}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors text-xs cursor-pointer"
              >
                <GoogleIcon className="w-4 h-4" />
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Footer status */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Placement session active • All data encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className="p-2 rounded-lg bg-white/10 shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-sm text-white">{title}</h3>
        <p className="text-xs text-slate-300 leading-snug mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
