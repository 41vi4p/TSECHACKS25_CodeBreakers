"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  CreditCard,
  DollarSign,
  FileText,
  Settings,
  User,
  Wallet,
  IndianRupee,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ethers } from "ethers";
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase'; // Adjust the import path as necessary
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const initializeMetaMask = async () => {
      if (typeof window !== "undefined") {
        const { MetaMaskSDK } = await import("@metamask/sdk");
        MMSDK = new MetaMaskSDK({
          dappMetadata: {
            name: "Loan Application Dapp",
            url: window.location.href,
          },
        });
      }
    };

    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const querySnapshot = await getDocs(collection(db, 'users'));
          const userDocs = querySnapshot.docs.map((doc) => doc.data());
          const userIndex = userDocs.findIndex(user => user.email === auth.currentUser.email);
          if (userIndex !== -1) {
            console.log('User data fetched:', userDocs[userIndex]);
            setUserData(userDocs[userIndex]);
          } else {
            router.push('/user-login'); // Redirect to login if not authenticated
          }
        } catch (err) {
          console.error('Error fetching user data:', err.message);
        }
      } else {
        router.push('/user-login'); // Redirect to login if not authenticated
      }
      setLoading(false);
    };

    initializeMetaMask();
    fetchUserData();
  }, [router]);

  let MMSDK: null = null;

  const connectWallet = async () => {
    const ethereum = MMSDK.getProvider();
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    setIsWalletConnected(true);
    setWalletAddress((await signer.getAddress()).toString());
  };

  const handlePayNow = async () => {
    try {
      const timestamp = new Date().toISOString();
      await addDoc(collection(db, 'transactions'), {
        userId: auth.currentUser?.uid,
        userName: userData.name,
        loanId: userData.loanId,
        amountPaid: userData.nextPayment,
        timestamp,
      });
      console.log('Transaction added:', { userId: auth.currentUser?.uid, timestamp });
      setSuccessMessage("Transaction successful! Next payment due in 30 days.");
      setTimeout(() => setSuccessMessage(""), 5000); // Clear message after 5 seconds
      // Reset the timer to 30 days
      const nextDueDate = new Date();
      nextDueDate.setDate(nextDueDate.getDate() + 30);
      setUserData({
        ...userData,
        dueDate: nextDueDate.toDateString(),
        nextPayment: " ₹0",
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
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
        <div className=" flex w-full flex-col overflow-auto">
          {/* Header */}
          <header className="bg-gray-800/60 backdrop-blur-xl">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Welcome back, {userData.name}
                  </h1>
                  <p className="text-gray-400">{userData.bankName}</p>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-6 flex-grow">
            {successMessage && (
              <div className="mb-4 p-4 text-center text-sm font-medium text-green-500 bg-green-100 rounded-lg">
                {successMessage}
              </div>
            )}
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
                      ? "Disconnect Wallet"
                      : "Connect MetaMask"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Loan Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-gray-800/60 backdrop-blur-xl border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Loan Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Loan ID</span>
                      <span className="text-gray-300">{userData.loanId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Amount</span>
                      <span className="text-gray-300">
                        {userData.totalLoanAmount}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/60 backdrop-blur-xl border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Next Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount Due</span>
                      <span className="text-gray-300">
                        {userData.nextPayment}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Due Date</span>
                      <span className="text-gray-300">{userData.dueDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/60 backdrop-blur-xl border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-bold">Loan Score</span>
                      <Badge className="bg-blue-500/20 text-green-400">
                        {userData.score}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        Pending Installments
                      </span>
                      <span className="text-gray-300">
                        {userData.pendingInstallments}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 mb-6 mb-full grid-flow-row auto-rows-max md:auto-rows-min"> 
              <Card className="bg-gray-800/60 backdrop-blur-xl border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Loan Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">Repayment Progress</span>
                      <span className="text-gray-300">55%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 
                          rounded-full transition-all duration-1000 ease-in-out"
                        style={{ width: '55%' }}
                      >
                        <div className="animate-pulse-light"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6 bg-gray-800/60 backdrop-blur-xl border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-300">
                    Pay Installment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <IndianRupee className="h-8 w-8 text-gray-300 ml-5" />
                      <div>
                        <div>
                          <p className="h-8 w-8 text-gray-300 text-2xl font-extrabold">5600 </p>
                          <p className="text-sm text-gray-400">
                            {/* Removed "Due in 10 Days" */}
                          </p>
                          <p className="font-mono text-sm text-gray-300">
                            { }
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handlePayNow}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transform transition-all duration-200 hover:scale-[1.02]"
                    >
                      Pay Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>

          {/* Footer */}
          <footer className="mt-auto p-6 bg-gray-800/60 backdrop-blur-xl border-t border-gray-700">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                © 2025 FraudChain by CodeBreakers. All rights reserved.
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

export default Dashboard;
