'use client';

import React, { useState } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const SignInForm: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br 
      ${darkMode 
        ? 'from-gray-900 via-blue-900 to-gray-900' 
        : 'from-blue-50 via-white to-blue-50'}`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className={`relative w-full max-w-md p-8 rounded-2xl overflow-hidden shadow-xl
        ${darkMode 
          ? 'bg-gray-800/60 backdrop-blur-xl' 
          : 'bg-white/80 backdrop-blur-xl'}`}>
        
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        
        <div className="space-y-6">
          <div className="text-center">
            <h1 className={`text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent`}>
              NextGen Banking
            </h1>
            <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Secure Access to Your Future
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <FiUser className={`absolute left-3 top-1/2 -translate-y-1/2 
                  ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all
                    ${darkMode 
                      ? 'bg-gray-700/50 text-white focus:bg-gray-700/70' 
                      : 'bg-gray-50 text-gray-900 focus:bg-white'} 
                    border ${darkMode ? 'border-gray-600' : 'border-gray-200'}
                    focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div className="relative">
                <FiLock className={`absolute left-3 top-1/2 -translate-y-1/2 
                  ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full pl-10 pr-12 py-3 rounded-lg outline-none transition-all
                    ${darkMode 
                      ? 'bg-gray-700/50 text-white focus:bg-gray-700/70' 
                      : 'bg-gray-50 text-gray-900 focus:bg-white'}
                    border ${darkMode ? 'border-gray-600' : 'border-gray-200'}
                    focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Remember me
                </span>
              </label>
              <a href="#" className="text-blue-500 hover:text-blue-600">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium
                ${loading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'}
                transition-all duration-200 transform hover:scale-[1.02]`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              Switch to {darkMode ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;