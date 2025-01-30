import React, { useEffect, useState } from "react";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Applicant {
  id: string;
  name: string;
  loanType: string;
  loanAmount: string;
  duration: string;
  score: number;
  status: string;
  documents: string[];
}

const ApplicationReview = () => {
  const id = sessionStorage.getItem("selectedApplicant");
  const [applicant, setApplicant] = useState<Applicant | null>(null);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        if (!id) {
          console.error("No applicant ID found in session storage");
          return;
        }
        const docRef = doc(db, "applications", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setApplicant({ id: docSnap.id, ...docSnap.data() } as Applicant);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching applicant:", error);
      }
    };

    fetchApplicant();
  }, [id]);

  const handleApprove = async () => {
    if (!id) return;

    try {
      const docRef = doc(db, "applications", id);
      await updateDoc(docRef, { status: "Approved" });
      setApplicant((prev) => prev ? { ...prev, status: "Approved" } : null);
      console.log("Application approved");
    } catch (error) {
      console.error("Error approving application:", error);
    }
  };

  const handleReject = async () => {
    if (!id) return;

    try {
      const docRef = doc(db, "applications", id);
      await updateDoc(docRef, { status: "Rejected" });
      setApplicant((prev) => prev ? { ...prev, status: "Rejected" } : null);
      console.log("Application rejected");
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  if (!applicant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6">
      <Card className="bg-gray-800/60 backdrop-blur-xl border-gray-700 max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-300">
            Application Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Name</span>
              <span className="text-gray-300">{applicant.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Loan Type</span>
              <span className="text-gray-300">{applicant.loanType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Loan Amount</span>
              <span className="text-gray-300">{applicant.loanAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Duration</span>
              <span className="text-gray-300">{applicant.duration} months</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Score</span>
              <span className="text-gray-300">{applicant.score}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className="text-gray-300">{applicant.status}</span>
            </div>
            <div>
              <span className="text-gray-400">Documents</span>
              <ul className="list-disc list-inside text-gray-300 mt-2">
              {applicant.documents && applicant.documents.length > 0 ? (
                  applicant.documents.map((doc, index) => (
                    <li key={index}>
                      <a href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        Document {index + 1}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No documents available</li>
                )}
              </ul>
            </div>
            <div className="flex space-x-4 mt-4">
              <Button onClick={handleApprove} className="bg-green-500 hover:bg-green-600 text-white">
                Approve
              </Button>
              <Button onClick={handleReject} className="bg-red-500 hover:bg-red-600 text-white">
                Reject
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationReview;