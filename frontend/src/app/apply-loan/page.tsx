"use client";
import LoanApplicationForm from "@/components/ApplyLoan";

import React, { useState } from "react";

const page = () => {
  const loans = [
    {
      bankName: "Global Trust Bank",
      loanName: "Home Sweet Home Loan",
      interestRate: "6.75%",
      description:
        "Make your dream home a reality with our competitive home loan rates and flexible repayment options.",
      terms: [
        "Loan amount up to $1.5M",
        "Tenure up to 30 years",
        "Zero pre-payment penalties",
        "Quick approval within 72 hours",
      ],
    },
    {
      bankName: "Future Finance Bank",
      loanName: "Business Growth Loan",
      interestRate: "8.25%",
      description:
        "Fuel your business growth with our tailored business loans designed for entrepreneurs and SMEs.",
      terms: [
        "Loan amount up to $500K",
        "Flexible tenure of 5-10 years",
        "Minimal documentation",
        "Line of credit option available",
      ],
    },
    {
      bankName: "Secure National Bank",
      loanName: "Education Excellence Loan",
      interestRate: "5.50%",
      description:
        "Invest in your future with our education loan that covers both domestic and international studies.",
      terms: [
        "100% education cost coverage",
        "1-year post-study repayment grace period",
        "Interest subsidy for merit students",
        "No collateral up to $50K",
      ],
    },
  ];

  const [isLoanSelected, setIsLoanSelected] = useState(false);
  return (
    <div>
      {isLoanSelected ? (
        <LoanApplicationForm />
      ) : (
        <div className="min-h-screen w-full p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Available Loan Options
              </h1>
              <p className="mt-4 text-sm sm:text-base text-gray-400">
                Compare and choose from our partner banks' best loan offerings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {loans.map((loan, index) => (
                <div
                  key={index}
                  className="bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-xl"
                >
                  {/* Bank Name and Interest Rate */}
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-white">
                      {loan.bankName}
                    </h2>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-blue-400">
                        {loan.interestRate}
                      </span>
                      <p className="text-sm text-gray-400">Interest p.a.</p>
                    </div>
                  </div>

                  {/* Loan Name */}
                  <h3 className="text-lg font-medium text-purple-400 mb-3">
                    {loan.loanName}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4">
                    {loan.description}
                  </p>

                  {/* Terms and Conditions */}
                  <div className="space-y-2 mb-6">
                    <h4 className="text-sm font-medium text-gray-400">
                      Terms & Conditions:
                    </h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {loan.terms.map((term, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {term}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <button onClick={() => setIsLoanSelected(true)} className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transform transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-blue-400">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                Need assistance?{" "}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Contact our loan experts
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
