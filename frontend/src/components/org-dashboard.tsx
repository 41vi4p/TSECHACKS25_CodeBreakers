'use client';
import React, { useState, useEffect } from 'react';
import {
  Home,
  CreditCard,
  DollarSign,
  FileText,
  Settings,
  User,
  BarChart2,
  Wallet,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OrgDashboard = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const orgData = {
    name: 'TechCorp',
    totalRevenue: '₦50,000,000',
    totalExpenses: '₦30,000,000',
    netProfit: '₦20,000,000',
    revenueGrowth: '15%',
  };

  const graphData = [
    { month: 'Jan', revenue: 4000, expenses: 2400 },
    { month: 'Feb', revenue: 3000, expenses: 1398 },
    { month: 'Mar', revenue: 2000, expenses: 9800 },
    { month: 'Apr', revenue: 2780, expenses: 3908 },
    { month: 'May', revenue: 1890, expenses: 4800 },
    { month: 'Jun', revenue: 2390, expenses: 3800 },
    { month: 'Jul', revenue: 3490, expenses: 4300 },
  ];

  const connectWallet = async () => {
    // Implement wallet connection logic here
    setIsWalletConnected(true);
    setWalletAddress('0x1234...abcd');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-20 bg-gray-800/60 backdrop-blur-xl border-r border-gray-700">
          <div className="flex flex-col items-center h-full py-4">
            <div className="mb-8">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/m.png" />
                <AvatarFallback>TC</AvatarFallback>
              </Avatar>
            </div>

            <nav className="flex-col flex justify-center space-y-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 text-gray-300 hover:bg-gray-700/50"
              >
                <Home className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 text-gray-300 hover:bg-gray-700/50"
              >
                <CreditCard className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 text-gray-300 hover:bg-gray-700/50"
              >
                <DollarSign className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 text-gray-300 hover:bg-gray-700/50"
              >
                <FileText className="h-6 w-6" />
              </Button>
            </nav>

            <div className="mt-auto flex flex-col space-y-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 text-gray-300 hover:bg-gray-700/50"
              >
                <Settings className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 text-gray-300 hover:bg-gray-700/50"
              >
                <User className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex w-full flex-col overflow-auto">
          {/* Header */}
          <header className="bg-gray-800/60 backdrop-blur-xl">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Welcome back, {orgData.name}
                  </h1>
                  <p className="text-gray-400">Organization Dashboard</p>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-6 flex-grow">
            {/* MetaMask Integration */}
            <Card className="mb-6 bg-gray-800/60 backdrop-blur-xl border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-300">
                  Wallet Connection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Wallet className="h-8 w-8 text-gray-300" />
                    <div>
                      {isWalletConnected ? (
                        <div>
                          <p className="text-sm text-gray-400">
                            Connected Wallet
                          </p>
                          <p className="font-mono text-sm text-gray-300">
                            {`${walletAddress.slice(
                              0,
                              6
                            )}...${walletAddress.slice(-4)}`}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400">
                          Connect your wallet to manage funds
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={connectWallet}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transform transition-all duration-200 hover:scale-[1.02]"
                  >
                    {isWalletConnected
                      ? 'Disconnect Wallet'
                      : 'Connect MetaMask'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Organization Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-gray-800/60 backdrop-blur-xl border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Financial Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Revenue</span>
                      <span className="text-gray-300">{orgData.totalRevenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Expenses</span>
                      <span className="text-gray-300">{orgData.totalExpenses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Net Profit</span>
                      <span className="text-gray-300">{orgData.netProfit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Revenue Growth</span>
                      <span className="text-gray-300">{orgData.revenueGrowth}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue vs Expenses Graph */}
            <Card className="bg-gray-800/60 backdrop-blur-xl border-gray-700">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-300">
                  Revenue vs Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                    <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </main>

          {/* Footer */}
          <footer className="mt-auto p-6 bg-gray-800/60 backdrop-blur-xl border-t border-gray-700">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                © 2025 TechCorp. All rights reserved.
              </div>
              <div className="flex space-x-4">
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-gray-300"
                >
                  Support
                </Button>
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-gray-300"
                >
                  Documentation
                </Button>
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-gray-300"
                >
                  Terms
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default OrgDashboard;
