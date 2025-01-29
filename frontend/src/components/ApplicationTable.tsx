'use client'
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust the import path as necessary
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ApplicationsTable: React.FC = () => {
  interface Applicant {
    id: string;
    name: string;
    loanType: string;
    loanAmount: string;
    duration: string;
    score: number;
    status: string;
  }

  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    // Fetch applicants from the Firestore database
    const fetchApplicants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'applications'));
        const applicantsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            loanType: data.loanType,
            loanAmount: data.loanAmount,
            duration: data.duration,
            score: data.score,
            status: data.status,
          };
        });
        console.log("Applicants data: ", applicantsData);
        setApplicants(applicantsData);
      } catch (error) {
        console.error("Error fetching applicants: ", error);
      }
    };

    fetchApplicants();
  }, []);

  const handleSelectApplicant = (applicant: Applicant) => {
    // Logic to handle selecting an applicant and redirecting to the application review tab
    console.log("Selected applicant:", applicant);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="bg-gray-800/60 backdrop-blur-xl border-gray-700 overflow-auto max-h-96 w-full">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-300">
            Loan Applicants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sr No</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type of Loan</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount Applied</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Duration</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Loan Score</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {applicants.map((applicant, index) => (
                <tr key={applicant.id}>
                  <td className="px-4 py-2 text-sm text-gray-300">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-300">{applicant.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-300">{applicant.loanType}</td>
                  <td className="px-4 py-2 text-sm text-gray-300">{applicant.loanAmount}</td>
                  <td className="px-4 py-2 text-sm text-gray-300">{applicant.duration}</td>
                  <td className="px-4 py-2 text-sm text-gray-300">{applicant.score}</td>
                  <td className="px-4 py-2 text-sm text-gray-300">{applicant.status}</td>
                  <td className="px-4 py-2 text-sm text-gray-300">
                    <Button
                      onClick={() => handleSelectApplicant(applicant)}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsTable;