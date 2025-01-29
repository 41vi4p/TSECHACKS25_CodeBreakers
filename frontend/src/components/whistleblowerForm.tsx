'use client';

import React, { useState } from 'react';
import { User, Mail, MessageSquare } from 'lucide-react';
import { db } from '@/lib/firebase'; // Adjust the import path as necessary
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const WhistleblowerForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.message) {
      setError('Please fill in the message field');
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, 'whistleblowerReports'), {
        ...formData,
        timestamp: new Date()
      });
      console.log('Whistleblower report submitted:', formData);
      router.push('/thankYou'); // Replace '/thankYou' with the actual path of the thank you page
    } catch (err: any) {
      setError(`Submission failed: ${err.message}`);
      console.error('Error during submission:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 
      bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      
      <div className="w-full max-w-[95%] sm:max-w-[440px] p-4 sm:p-6 md:p-8 
        bg-gray-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl">
        
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold 
            bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Whistleblower Report
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            Submit your report anonymously
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 
                text-gray-400 text-lg sm:text-xl" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name (optional)"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base
                  rounded-lg outline-none transition-all
                  bg-gray-700/50 text-white focus:bg-gray-700/70
                  border border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 
                text-gray-400 text-lg sm:text-xl" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (optional)"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base
                  rounded-lg outline-none transition-all
                  bg-gray-700/50 text-white focus:bg-gray-700/70
                  border border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 
                text-gray-400 text-lg sm:text-xl" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base
                  rounded-lg outline-none transition-all
                  bg-gray-700/50 text-white focus:bg-gray-700/70
                  border border-gray-600 focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base
              bg-gradient-to-r from-blue-500 to-purple-500
              hover:from-blue-600 hover:to-purple-600
              text-white font-medium rounded-lg
              transform transition-all duration-200
              hover:scale-[1.02] focus:ring-2 focus:ring-blue-400
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhistleblowerForm;
