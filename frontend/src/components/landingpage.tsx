import React from "react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="w-full max-w-[95%] sm:max-w-[600px] p-4 sm:p-6 md:p-8 bg-gray-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl">
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Welcome to FraudChain
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-400">
            Experience the future of banking with our secure and innovative
            platform
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Organization Section */}
          <div className="p-6 sm:p-8 border border-gray-700 rounded-lg hover:border-blue-500 transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              Organization Access
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mb-6">
              Manage your organization's banking needs with advanced tools and
              controls
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Link href={"/org-login"}>
                <button className="py-3 sm:py-4 px-4 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transform transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-blue-400">
                  Organization Login
                </button>
              </Link>
              <Link href={"/org-signup"}>
                <button className="py-3 sm:py-4 px-4 text-sm sm:text-base border border-blue-500 hover:border-purple-500 text-white font-medium rounded-lg transform transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-blue-400 hover:bg-gray-700/50">
                  Organization Signup
                </button>
              </Link>
            </div>
          </div>

          {/* User Section */}
          <div className="p-6 sm:p-8 border border-gray-700 rounded-lg hover:border-purple-500 transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              Personal Banking
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mb-6">
              Access your personal accounts and manage your finances seamlessly
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Link href={"/user-login"}>
                <button className="py-3 sm:py-4 px-4 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-lg transform transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-purple-400">
                  User Login
                </button>
              </Link>
              <Link href={"/user-signup"}>
                <button className="py-3 sm:py-4 px-4 text-sm sm:text-base border border-purple-500 hover:border-blue-500 text-white font-medium rounded-lg transform transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-purple-400 hover:bg-gray-700/50">
                  User Signup
                </button>
              </Link> 
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Need help?{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
