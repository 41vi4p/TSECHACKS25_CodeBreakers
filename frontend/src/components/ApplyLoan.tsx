"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { DollarSign, Percent, Calendar } from "lucide-react";
import LoanManagement from "../../../artifacts/contracts/FraudChain.sol/LoanManagement.json";

let MMSDK = null;

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
  const [txHash, setTxHash] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      setError("");
      if (!MMSDK) throw new Error("MetaMask SDK not initialized");
      const ethereum = MMSDK.getProvider();
      if (!ethereum) throw new Error("Please install MetaMask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts[0]) setAccount(accounts[0]);
    } catch (err) {
      setError(err.message || "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      if (!account) throw new Error("Please connect your wallet first");
      if (!MMSDK) throw new Error("MetaMask SDK not initialized");

      const ethereum = MMSDK.getProvider();
      if (!ethereum) throw new Error("MetaMask not found");

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
        LoanManagement.abi,
        signer
      );

      const amount = ethers.parseEther(formData.amount);
      const interestRate = Math.floor(parseFloat(formData.interestRate) * 100);
      const duration = parseInt(formData.duration);

      const tx = await contract.applyForLoan(amount, interestRate, duration);
      await tx.wait();
      setTxHash(tx.hash);

      // const block = await provider.getBlockNumber();
      // const filter = contract.filters.LoanApplied();
      // const loanApplied = await contract.queryFilter(
      //   filter,
      //   block - 20,
      //   block
      // );
      // await console.log(loanApplied);
      // Clear form after successful submission

      setFormData({ amount: "", interestRate: "", duration: "" });
      alert("Loan application submitted successfully!");
    } catch (err) {
      setError(err.message || "Failed to submit loan application");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center">
          Loan Application
        </h1>
        {!account ? (
          <button
            onClick={connectWallet}
            disabled={loading}
            className="mt-4 w-full bg-blue-500 text-white p-3 rounded"
          >
            {loading ? "Connecting..." : "Connect Wallet"}
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Loan Amount (ETH)"
              required
              className="w-full p-3 bg-gray-700 text-white rounded"
            />
            <input
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              placeholder="Interest Rate (%)"
              required
              className="w-full p-3 bg-gray-700 text-white rounded"
            />
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration (months)"
              required
              className="w-full p-3 bg-gray-700 text-white rounded"
            />
            {error && <div className="text-red-500">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white p-3 rounded"
            >
              {loading ? "Processing..." : "Apply for Loan"}
            </button>
          </form>
        )}
        {txHash && (
          <div className="text-green-400 text-sm mt-2">
            Transaction Hash: {txHash}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanApplicationForm;
