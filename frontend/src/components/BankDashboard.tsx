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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Line } from "react-chartjs-2";
import { ethers } from "ethers";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Adjust the import path as necessary

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BankDashboard = () => {
  const [whistleblowerReports, setWhistleblowerReports] = useState<any[]>([]);
  
  const [applicants, setApplicants] = useState<
    { id: number; name: string; loanAmount: string; status: string }[]
  >([]);
  const [selectedApplicant, setSelectedApplicant] = useState<{
    id: number;
    name: string;
    loanAmount: string;
    status: string;
  } | null>(null);
  const [approvedApplications, setApprovedApplications] = useState<
    { id: number; name: string; loanAmount: string; status: string }[]
  >([]);

  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");

  let MMSDK: any = null;

  // useEffect(() => {
  //   const initializeMetaMask = async () => {
  //     if (typeof window !== "undefined") {
  //       const { MetaMaskSDK } = await import("@metamask/sdk");
  //       MMSDK = new MetaMaskSDK({
  //         dappMetadata: {
  //           name: "Loan Application Dapp",
  //           url: window.location.href,
  //         },
  //       });
  //     }
  //   };
  //   initializeMetaMask();
  // }, []);

  useEffect(() => {
    // Fetch applicants from the database
    const fetchApplicants = async () => {
      // Replace with your database fetching logic
      const applicantsData = [
        { id: 1, name: "Alice", loanAmount: "₹1,000,000", status: "Pending" },
        { id: 2, name: "Bob", loanAmount: "₹500,000", status: "Pending" },
        // Add more applicants as needed
      ];
      setApplicants(applicantsData);
    };

    fetchApplicants();
  }, []);

  useEffect(() => {
    const fetchWhistleblowerReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'whistleblowerReports'));
        const reports = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setWhistleblowerReports(reports);
      } catch (err) {
        console.error('Error fetching whistleblower reports:', err.message);
      }
    };

    fetchWhistleblowerReports();
  }, []);

  const handleSelectApplicant = (applicant: {
    id: number;
    name: string;
    loanAmount: string;
    status: string;
  }) => {
    setSelectedApplicant(applicant);
  };

  const handleApprove = () => {
    if (selectedApplicant) {
      setApprovedApplications([
        ...approvedApplications,
        { ...selectedApplicant, status: "Approved" },
      ]);
      setSelectedApplicant(null);
    }
  };

  const handleReject = () => {
    if (selectedApplicant) {
      setSelectedApplicant(null);
    }
  };

  const sanctionedLoansData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sanctioned Loans",
        data: [1200000, 1500000, 1000000, 2000000, 2500000, 3000000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  // const connectWallet = async () => {
  //   try {
  //     setError("");
  //     if (!MMSDK) throw new Error("MetaMask SDK not initialized");
  //     const ethereum = MMSDK.getProvider();
  //     if (!ethereum) throw new Error("Please install MetaMask");
  //     const accounts = await ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     if (accounts[0]) setAccount(accounts[0]);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       setError(error.message || "Failed to connect wallet");
  //     } else {
  //       setError("Failed to connect wallet");
  //     }
  //   }
  //   setIsWalletConnected(true);
  // };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="flex h-screen">
        {/* Main Content */}
        <div className="flex w-full flex-col overflow-auto">
          {/* Header */}
          <header className="bg-gray-800/60 backdrop-blur-xl">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Welcome to the Bank Dashboard
                  </h1>
                  <p className="text-gray-400">FraudChain</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pr-4 pl-4 mb-4">
              <div className="flex items-center space-x-4">
                <Wallet className="h-8 w-8 text-gray-300" />
                <div>
                  {isWalletConnected ? (
                    <div>
                      <p className="text-sm text-gray-400">Connected Wallet</p>
                      <p className="font-mono text-sm text-gray-300">
                        {`${account.slice(0, 4)}...${account.slice(-4)}`}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400"></p>
                  )}
                </div>
              </div>
              <Button
                // onClick={connectWallet}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transform transition-all duration-200 hover:scale-[1.02]"
              >
                {isWalletConnected ? "Disconnect Wallet" : "Connect MetaMask"}
              </Button>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-6 flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Applicants List */}
              <Card className="bg-gray-800/60 backdrop-blur-xl border-gray-700 overflow-auto max-h-96">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Loan Applicants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {applicants.map((applicant) => (
                      <li
                        key={applicant.id}
                        className="cursor-pointer text-gray-300 hover:text-white"
                        onClick={() => handleSelectApplicant(applicant)}
                      >
                        {applicant.name} - {applicant.loanAmount}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Applicant Details */}
              <Card className="bg-gray-800/60 backdrop-blur-xl border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Applicant Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedApplicant ? (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name</span>
                        <span className="text-gray-300">
                          {selectedApplicant.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Loan Amount</span>
                        <span className="text-gray-300">
                          {selectedApplicant.loanAmount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status</span>
                        <span className="text-gray-300">
                          {selectedApplicant.status}
                        </span>
                      </div>
                      <div className="flex space-x-4 mt-4">
                        <Button
                          onClick={handleApprove}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={handleReject}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400">
                      Select an applicant to view details
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Approved Applications */}
              <Card className="bg-gray-800/60 backdrop-blur-xl border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Approved Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {approvedApplications.map((application) => (
                      <li key={application.id} className="text-gray-300">
                        {application.name} - {application.loanAmount}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sanctioned Loans Graph */}
            <Card className="bg-gray-800/60 flex flex-col w-full justify-center items-center backdrop-blur-xl border-gray-700">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-300">
                  Sanctioned Loans
                </CardTitle>
              </CardHeader>
              <CardContent className="min-w-[68%]  ">
                <Line data={sanctionedLoansData} />
              </CardContent>
            </Card>
                    <br></br>
            <Card className="bg-gray-800/60 flex flex-col w-full justify-center items-center backdrop-blur-xl border-gray-700">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-300">
                 Anonymous Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="min-w-[68%]  ">
                <div className="space-y-4">
                  {whistleblowerReports.map((report) => (
                    <div key={report.id} className="p-4 bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-300">{report.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{report.timestamp}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>

          {/* Footer */}
          <footer className="mt-auto p-6 bg-gray-800/60 backdrop-blur-xl border-t border-gray-700">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                © 2025 FraudChain. All rights reserved.
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

export default BankDashboard;
