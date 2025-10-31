'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Leaf, Camera, MapPin, Eye, EyeOff } from 'lucide-react';
import { mockCredentials } from '@/lib/mock-data';
import { Aladin } from 'next/font/google';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  // const [name, setName] = useState('');
// const [phone, setPhone] = useState('');
// const [location, setLocation] = useState('');
// const [password, setPassword] = useState('');
// const [confirmPassword, setConfirmPassword] = useState('');
// const [showPassword, setShowPassword] = useState(false);
// const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// const [error, setError] = useState('');

  const BASE_URL = "http://localhost:8000/transcript";  // Change if needed
  const handleSignup = async () => {
    setError('');

    if (!name || !phone || !password || !location) {
      alert('Please fill all fields');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          mobile: phone,
          location,
          password,
          // confirm_password: confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || 'Signup failed');
        return;
      }

      // Save token
      localStorage.setItem('token', data.access_token);

      alert('Signup successful!');
      setActiveTab('signin'); // switch to signin after signup
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }
  };

  const handleLogin = async () => {
    setError('');

    if (!phone || !password) {
      setError('Please enter phone and password');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: phone,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || 'Invalid credentials');
        return;
      }

      // Save token and auth flag
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('plantcare_authenticated', 'true');

      alert('Login successful!');
      router.push('/dashboard'); // redirect after login
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mocked auth using original demo creds for convenience
    if (activeTab === 'signin') {
      if ((phone === '+91 9999999999' || phone === mockCredentials.number) && password === mockCredentials.password) {
        localStorage.setItem('plantcare_authenticated', 'true');
        localStorage.removeItem('token'); // Clear any existing token
        window.location.href = '/dashboard';
      } else {
        setError('Invalid credentials. Try: +91 9999999999 / demo123');
      }
    } else {
      if (name && phone && password) {
        localStorage.setItem('plantcare_authenticated', 'true');
        localStorage.removeItem('token'); // Clear any existing token
        window.location.href = '/dashboard';
      } else {
        setError('Please fill in all fields');
      }
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(() => {
      setLocation('Detected location');
    }, () => {
      setLocation('');
    });
  };

  return (
    <div className="min-h-screen bg-neutral-light flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Hero (desktop), stacked above form on mobile */}
        <div>
          {/* Logo (mobile) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center mb-6 lg:justify-start"
          >
            <Leaf className="w-8 h-8 text-primary mr-2" />
            <span className="text-xl font-bold text-neutral-darker">PlantCare AI</span>
          </motion.div>

          {/* Hero copy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left mb-6"
          >
            <h1 className="text-3xl lg:text-5xl font-bold text-neutral-darker">Diagnose your plants in seconds</h1>
            <p className="text-neutral-muted mt-2 text-base lg:text-lg">Use AI to identify diseases, get 7-day care plans, and find supplies at local nurseries.</p>
          </motion.div>

          {/* Floating image stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative h-56 lg:h-96"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1618375569909-3c8616cf7de3?w=400&h=300&fit=crop"
              alt="App screenshot 1"
              className="absolute right-6 top-0 w-40 h-28 lg:w-64 lg:h-40 rounded-xl object-cover shadow-soft-lg"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop"
              alt="App screenshot 2"
              className="absolute left-4 top-10 w-48 h-32 lg:w-72 lg:h-44 rounded-xl object-cover shadow-soft-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop"
              alt="App screenshot 3"
              className="absolute left-24 bottom-0 w-44 h-28 lg:w-64 lg:h-40 rounded-xl object-cover shadow-soft-lg"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        {/* Right: Card with tabs and forms */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-soft-lg p-6 border border-neutral"
        >
          {/* Tabs */}
          <div className="flex w-full rounded-xl bg-neutral-light p-1 mb-6">
            {(['signin', 'signup'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === tab ? 'bg-white text-primary shadow-soft' : 'text-neutral-muted hover:text-neutral-dark'}`}
              >
                {tab === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Forms */}
                <form
        onSubmit={(e) => {
          e.preventDefault();
          if (activeTab === 'signup') {
            handleSignup();
          } else {
            handleLogin();
          }
        }}
        className="space-y-4"
      >
        {/* Full Name (Signup only) */}
        {activeTab === 'signup' && (
          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        )}

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-2">Mobile Number</label>
          <div className="flex items-center gap-2">
            <span className="px-3 py-3 rounded-lg border border-neutral bg-neutral-light text-neutral-darker select-none">+91</span>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Location (Signup only) */}
        {activeTab === 'signup' && (
          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-2">Location (Farm/Garden)</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={detectLocation}
                className="px-4 py-3 rounded-lg border border-neutral bg-neutral-light text-neutral-darker hover:bg-neutral"
              >
                Detect
              </button>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter Zip/City"
                className="w-full px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 pr-12 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-muted hover:text-neutral-dark"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {activeTab === 'signin' && (
            <button type="button" className="mt-2 text-sm text-neutral-muted hover:text-neutral-dark">
              Forgot Password?
            </button>
          )}
        </div>

        {/* Confirm Password (Signup only) */}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-2"
        >
          {activeTab === 'signin' ? (
            <>
              <Camera className="w-5 h-5" /> Sign In
            </>
          ) : (
            <>
              <Camera className="w-5 h-5" /> Create Account
            </>
          )}
        </button>
      </form> 

        </motion.div>
      </div>
    </div>
  );
}
