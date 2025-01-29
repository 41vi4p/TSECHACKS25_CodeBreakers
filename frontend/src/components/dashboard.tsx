'use client';
import React, { useState } from 'react';
import { Sun, Moon, Home, CreditCard, DollarSign, FileText, Settings, User, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  // Sample user data
  const userData = {
    name: "John Doe",
    bankName: "NextGen Banking",
    loanId: "LOAN-2024-0123",
    accountType: "Premium",
    pendingInstallments: 3,
    totalLoanAmount: "₦2,500,000",
    nextPayment: "₦125,000",
    dueDate: "Feb 15, 2025"
  };

  const connectWallet = async () => {
    const conn = true;
    if (conn == true) {
      alert("Wallet connected successfully!");
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
        {/* Sidebar */}
        <div className="w-20 bg-white  border-r border-gray-200 dark:bg-gray-300">
          <div className="flex flex-col items-center h-full py-4">
            <div className="mb-8">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/m.png" />
                <AvatarFallback>NB</AvatarFallback>
              </Avatar>
            </div>
            
            <nav className="flex-col justify-center" >
              <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-600 dark:text-gray-300">
                <Home className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-600 dark:text-gray-300">
                <CreditCard className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-600 dark:text-gray-300">
                <DollarSign className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-600 dark:text-gray-300">
                <FileText className="h-6 w-6" />
              </Button>
            </nav>

            <div className="mt-auto">
              <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-600 dark:text-gray-300">
                <Settings className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-600 dark:text-gray-300">
                <User className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white dark:bg-[#242639] shadow-sm">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-[#8b8dba]">
                    Welcome back, {userData.name}
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400">{userData.bankName}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="border-gray-200 dark:border-gray-700"
                  >
                    {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-6 flex-grow">
            {/* MetaMask Integration */}
            <Card className="mb-6 dark:bg-[#242639] dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-[#8b8dba]">Wallet Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Wallet className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                    <div>
                      {isWalletConnected ? (
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Connected Wallet</p>
                          <p className="font-mono text-sm dark:text-[#8b8dba]">
                            {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No wallet connected</p>
                      )}
                    </div>
                  </div>
                  <Button 
                    onClick={connectWallet}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    {isWalletConnected ? 'Disconnect Wallet' : 'Connect MetaMask'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Loan Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="dark:bg-[#242639] dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-900 dark:text-[#8b8dba]">
                    Loan Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Loan ID</span>
                      <span className="dark:text-[#8b8dba]">{userData.loanId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Total Amount</span>
                      <span className="dark:text-[#8b8dba]">{userData.totalLoanAmount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-[#242639] dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-900 dark:text-[#8b8dba]">
                    Next Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Amount Due</span>
                      <span className="dark:text-[#8b8dba]">{userData.nextPayment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Due Date</span>
                      <span className="dark:text-[#8b8dba]">{userData.dueDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-[#242639] dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-900 dark:text-[#8b8dba]">
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Type</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {userData.accountType}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Pending Installments</span>
                      <span className="dark:text-[#8b8dba]">{userData.pendingInstallments}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>

          {/* Footer */}
          <footer className="mt-auto p-6 bg-white dark:bg-[#242639] border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                © 2025 NextGen Banking. All rights reserved.
              </div>
              <div className="flex space-x-4">
                <Button variant="link" className="text-gray-500 dark:text-gray-400">Support</Button>
                <Button variant="link" className="text-gray-500 dark:text-gray-400">Documentation</Button>
                <Button variant="link" className="text-gray-500 dark:text-gray-400">Terms</Button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;