"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { DollarSign, Percent, Calendar } from "lucide-react";
import LoanManagement from "../../../../artifacts/contracts/FraudChain.sol/LoanManagement.json";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

// We'll initialize MetaMask SDK only on the client side
let MMSDK: any = null;

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    interestRate: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [account, setAccount] = useState("");
  const [isClient, setIsClient] = useState(false);

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
        setIsClient(true);
      }
    };

    initializeMetaMask();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

      if (accounts && accounts[0]) {
        setAccount(accounts[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (!account) {
        throw new Error("Please connect your wallet first");
      }

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

      // Convert values to appropriate format for smart contract
      const amount = ethers.parseEther(formData.amount);
      const interestRate = Math.floor(parseFloat(formData.interestRate) * 100); // Convert to basis points
      const duration = parseInt(formData.duration);

      const tx = await contract.applyForLoan(amount, interestRate, duration);
      await tx.wait(); // Wait for transaction to be mined

      // Save form data to Firestore
      await addDoc(collection(db, "applications"), {
        amount: formData.amount,
        interestRate: formData.interestRate,
        duration: formData.duration,
        account,
        timestamp: new Date(),
      });

      // Clear form after successful submission
      setFormData({
        amount: "",
        interestRate: "",
        duration: "",
      });

      alert("Loan application submitted successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit loan application"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="w-full max-w-[95%] sm:max-w-[440px] p-4 sm:p-6 md:p-8 bg-gray-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl">
          <div className="text-center text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <LoanApplicationForm />
    </div>
  );
};

export default LoanApplicationForm;