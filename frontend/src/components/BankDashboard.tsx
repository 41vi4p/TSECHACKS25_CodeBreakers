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
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BankDashboard = () => {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [approvedApplications, setApprovedApplications] = useState([]);

  useEffect(() => {
    // Fetch applicants from the database
    const fetchApplicants = async () => {
      // Replace with your database fetching logic
      const applicantsData = [
        { id: 1, name: "Alice", loanAmount: "₦1,000,000", status: "Pending" },
        { id: 2, name: "Bob", loanAmount: "₦500,000", status: "Pending" },
        // Add more applicants as needed
      ];
      setApplicants(applicantsData);
    };

    fetchApplicants();
  }, []);

  const handleSelectApplicant = (applicant) => {
    setSelectedApplicant(applicant);
  };

  const handleApprove = () => {
    if (selectedApplicant) {
      setApprovedApplications([...approvedApplications, { ...selectedApplicant, status: "Approved" }]);
      setSelectedApplicant(null);
    }
  };

  const handleReject = () => {
    if (selectedApplicant) {
      setSelectedApplicant(null);
    }
  };

  const sanctionedLoansData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sanctioned Loans',
        data: [1200000, 1500000, 1000000, 2000000, 2500000, 3000000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
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
        <div className="flex w-full flex-col overflow-auto">
          {/* Header */}
          <header className="bg-gray-800/60 backdrop-blur-xl">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Welcome to the Bank Dashboard
                  </h1>
                  <p className="text-gray-400">NextGen Banking</p>
                </div>
              </div>
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
                        <span className="text-gray-300">{selectedApplicant.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Loan Amount</span>
                        <span className="text-gray-300">{selectedApplicant.loanAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status</span>
                        <span className="text-gray-300">{selectedApplicant.status}</span>
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
                    <p className="text-gray-400">Select an applicant to view details</p>
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
            <Card className="bg-gray-800/60 backdrop-blur-xl border-gray-700">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-300">
                  Sanctioned Loans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Line data={sanctionedLoansData} />
              </CardContent>
            </Card>
          </main>

          {/* Footer */}
          <footer className="mt-auto p-6 bg-gray-800/60 backdrop-blur-xl border-t border-gray-700">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                © 2025 NextGen Banking. All rights reserved.
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

export default BankDashboard;