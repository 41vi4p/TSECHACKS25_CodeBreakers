import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ethers } from "ethers";
import { MetaMaskSDK } from "@metamask/sdk";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoanManagement from "../../../artifacts/contracts/FraudChain.sol/LoanManagement.json";

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

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ApplicationReview = () => {
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(true);

  // Initialize MetaMask SDK only after component mounts
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
        setIsClient(false);
      }
    };

    initializeMetaMask();
  });

  let MMSDK: any = null;

  const connectWallet = async () => {
    try {
      setLoading(true);
      setError("");

      if (!MMSDK) {
        throw new Error("MetaMask SDK not initialized");
      }

      const ethereum = MMSDK.getProvider();
      if (!ethereum) {
        throw new Error("Please install MetaMask to use this application");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    } finally {
      setIsClient(true);
      setLoading(false);
    }
  };

  const id = sessionStorage.getItem("selectedApplicant");
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metamask, setMetamask] = useState<any>(null);

  useEffect(() => {
    const fetchApplicant = async () => {
      if (!id) {
        setError("No applicant ID found");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const docRef = doc(db, "applications", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setApplicant({ id: docSnap.id, ...docSnap.data() } as Applicant);
        } else {
          setError("Application not found");
        }
      } catch (error) {
        console.error("Error fetching applicant:", error);
        setError("Failed to fetch application details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicant();
  }, [id]);

  const updateApplicationStatus = async (status: "Approved" | "Rejected") => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const docRef = doc(db, "applications", id);
      await updateDoc(docRef, { status });
      setApplicant((prev) => (prev ? { ...prev, status } : null));
    } catch (error) {
      console.error(`Error ${status.toLowerCase()}ing application:`, error);
      setError(`Failed to ${status.toLowerCase()} application`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setLoading(true);
      setError("");

      if (!MMSDK) {
        throw new Error("MetaMask SDK not initialized");
      }

      const ethereum = MMSDK.getProvider();
      if (!ethereum) {
        throw new Error("MetaMask not found");
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        LoanManagement.abi,
        signer
      );

      const tx = await contract.approveLoan(await signer.getAddress());
      await tx.wait();

      alert("Loan application Approved successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit loan application"
      );
    } finally {
      setLoading(false);
    }

    try {
      if (!metamask) {
        throw new Error("MetaMask not initialized");
      }
      await updateApplicationStatus("Approved");
    } catch (error) {
      console.error("Error approving loan:", error);
      setError("Failed to approve loan on blockchain");
    }
  };

  const handleReject = () => updateApplicationStatus("Rejected");


  if (error) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6 flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6 flex items-center justify-center">
        <p className="text-gray-300">No application data found</p>
      </div>
    );
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
            {[
              { label: "Name", value: applicant.name },
              { label: "Loan Type", value: applicant.loanType },
              { label: "Loan Amount", value: applicant.loanAmount },
              { label: "Duration", value: `${applicant.duration} months` },
              { label: "Score", value: applicant.score },
              { label: "Status", value: applicant.status },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-gray-400">{label}</span>
                <span className="text-gray-300">{value}</span>
              </div>
            ))}

            <div>
              <span className="text-gray-400">Documents</span>
              <ul className="list-disc list-inside text-gray-300 mt-2">
                {applicant.documents?.length > 0 ? (
                  applicant.documents.map((doc, index) => (
                    <li key={index}>
                      <a
                        href={doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
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
              <Button
                onClick={handleApprove}
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Approve"}
              </Button>
              <Button
                onClick={handleReject}
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Reject"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationReview;
