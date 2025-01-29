"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
// import { FiDollarSign, FiPercent, FiCalendar } from 'lucide-react';
import { MetaMaskSDK } from "@metamask/sdk";
import LoanManagement from "../../../../artifacts/contracts/FraudChain.sol/LoanManagement.json";

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Example JavaScript Dapp",
    url: window.location.href,
  },
  infuraAPIKey: process.env.INFURA_API_KEY,
});

const LoanApplicationForm = () => {
  const ethereum: undefined | any = MMSDK.getProvider();
  const ABI = LoanManagement.abi;
  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const walletProvider = new ethers.JsonRpcProvider(
    ethereum
  )


  const [formData, setFormData] = useState({
    amount: "",
    interestRate: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const ConnectClick = async () => {
    const accounts = await MMSDK.connect();

    // Make requests
    const result = await ethereum.request({
      method: "eth_accounts",
      params: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contract =  new ethers.Contract(
        address,
        ABI,
        walletProvider,
    )
    const tx = await contract.applyForLoan(formData.amount, formData.interestRate, formData.duration); 
    console.log(tx);
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

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <button onClick={ConnectClick}>connect</button>
          <div className="space-y-3 sm:space-y-4">
            {/* Amount Input */}
            <div className="relative">
              {/* <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-xl" /> */}
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Loan Amount"
                min="1000"
                step="100"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg outline-none transition-all bg-gray-700/50 text-white focus:bg-gray-700/70 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Interest Rate Input */}
            <div className="relative">
              {/* <FiPercent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-xl" /> */}
              <input
                type="number"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleChange}
                placeholder="Interest Rate"
                min="0"
                max="100"
                step="0.1"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg outline-none transition-all bg-gray-700/50 text-white focus:bg-gray-700/70 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Duration Input */}
            <div className="relative">
              {/* <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-xl" /> */}
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

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transform transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Apply for Loan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanApplicationForm;
