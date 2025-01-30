"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BankDashboard from '@/components/BankDashboard';
import ApplicationsTable from '@/components/ApplicationTable';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CreditCard,  FileText, Home, Settings, User, MessagesSquare } from "lucide-react";
import ApplicationReview from '@/components/ApplicationReview';
import Discussion from '@/components/discussion';
const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`?tab=${tab}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <BankDashboard />;
      case 'applications':
        return <ApplicationsTable />;
      case 'credit':
        return <ApplicationReview />;
      case 'forum':
        return <Discussion />;
      default:
        return <BankDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="w-20 bg-gray-800/60 backdrop-blur-xl border-r border-gray-700">
        <div className="flex flex-col items-center h-full py-4">
          <div className="mb-8">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/m.png" />
              <AvatarFallback>NB</AvatarFallback>
            </Avatar>
          </div>

          <nav className="flex-col flex justify-center space-y-4">
            <Button
              variant="ghost"
              size="icon"
              className={`w-12 h-12 text-gray-300 hover:bg-gray-700/50 ${activeTab === 'home' ? 'bg-gray-700/50' : ''}`}
              onClick={() => handleTabChange('home')}
            >
              <Home className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`w-12 h-12 text-gray-300 hover:bg-gray-700/50 ${activeTab === 'applications' ? 'bg-gray-700/50' : ''}`}
              onClick={() => handleTabChange('applications')}
            >
              <FileText className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`w-12 h-12 text-gray-300 hover:bg-gray-700/50 ${activeTab === 'credit' ? 'bg-gray-700/50' : ''}`}
              onClick={() => handleTabChange('credit')}
            >
              <CreditCard className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`w-12 h-12 text-gray-300 hover:bg-gray-700/50 ${activeTab === 'forum' ? 'bg-gray-700/50' : ''}`}
              onClick={() => handleTabChange('forum')}
            >
              <MessagesSquare className="h-6 w-6" />
          </Button>
          </nav>
          

          <div className="mt-auto flex flex-col space-y-4">
            <Button
              variant="ghost"
              size="icon"
              className={`w-12 h-12 text-gray-300 hover:bg-gray-700/50 ${activeTab === 'settings' ? 'bg-gray-700/50' : ''}`}
              onClick={() => handleTabChange('settings')}
            >
              <Settings className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`w-12 h-12 text-gray-300 hover:bg-gray-700/50 ${activeTab === 'user' ? 'bg-gray-700/50' : ''}`}
              onClick={() => handleTabChange('user')}
            >
              <User className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-grow">
        {renderContent()}
      </div>
    </div>
  );
};

export default Page;