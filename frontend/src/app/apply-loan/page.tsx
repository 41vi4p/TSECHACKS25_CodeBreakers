"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import { MetaMaskSDK } from "@metamask/sdk";
import { DollarSign, Percent, Calendar } from "lucide-react";
import LoanManagement from "../../../../artifacts/contracts/FraudChain.sol/LoanManagement.json";

// Initialize MetaMask SDK outside component to avoid recreation on renders
const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Loan Application Dapp",
    url: window.location.href,
  }
});

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    interestRate: "",
    duration: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [account, setAccount] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      setError("");
      
      const ethereum = MMSDK.getProvider();
      if (!ethereum) {
        throw new Error("Please install MetaMask to use this application");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
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

      // Clear form after successful submission
      setFormData({
        amount: "",
        interestRate: "",
        duration: ""
      });
      
      alert("Loan application submitted successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit loan application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="w-full max-w-[95%] sm:max-w-[440px] p-4 sm:p-6 md:p-8 bg-gray-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Loan Application
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            Fill in the details to apply for your loan
          </p>
        </div>

        {!account ? (
          <button
            onClick={connectWallet}
            disabled={loading}
            className="w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Connecting..." : "Connect Wallet"}
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-xl" />
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Loan Amount (ETH)"
                  min="0.01"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg outline-none transition-all bg-gray-700/50 text-white focus:bg-gray-700/70 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-xl" />
                <input
                  type="number"
                  name="interestRate"
                  value={formData.interestRate}
                  onChange={handleChange}
                  placeholder="Interest Rate (%)"
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg outline-none transition-all bg-gray-700/50 text-white focus:bg-gray-700/70 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-xl" />
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration (months)"
                  min="1"
                  max="360"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg outline-none transition-all bg-gray-700/50 text-white focus:bg-gray-700/70 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2 p-2 bg-red-500/10 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Apply for Loan"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoanApplicationForm;