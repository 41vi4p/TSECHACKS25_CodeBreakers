// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoanManagement {
    struct Loan {
        uint loanId;
        address borrower;
        address bank;
        uint amount;
        uint interest;
        uint duration;
        uint remainingBalance;
        bool isApproved;
        bool isDefaulted;
        uint lastPaymentTimestamp;
    }

    mapping(uint => Loan) public loans;
    mapping(address => bool) public defaulters;
    mapping(address => bool) public registeredBanks;
    uint public loanCounter;

    event LoanApplied(uint loanId, address borrower, uint amount);
    event LoanApproved(uint loanId, address bank);
    event LoanPaid(uint loanId, uint amount);
    event LoanDefaulted(uint loanId, address borrower);

    modifier onlyBank() {
        require(registeredBanks[msg.sender], "Only registered banks can perform this action");
        _;
    }

    function registerBank(address bank) external {
        registeredBanks[bank] = true;
    }

    function applyForLoan(uint amount, uint interest, uint duration) external {
        require(!defaulters[msg.sender], "Defaulters cannot apply for a new loan");

        loanCounter++;
        loans[loanCounter] = Loan(loanCounter, msg.sender, address(0), amount, interest, duration, amount, false, false, block.timestamp);

        emit LoanApplied(loanCounter, msg.sender, amount);
    }

    function approveLoan(uint loanId, address bank) external onlyBank {
        require(loans[loanId].loanId == loanId, "Loan does not exist");
        loans[loanId].bank = bank;
        loans[loanId].isApproved = true;
        emit LoanApproved(loanId, bank);
    }

    function repayLoan(uint loanId, uint amount) external {
        require(loans[loanId].loanId == loanId, "Loan does not exist");
        require(loans[loanId].borrower == msg.sender, "Only borrower can repay");
        require(loans[loanId].isApproved, "Loan must be approved");
        require(loans[loanId].remainingBalance >= amount, "Overpayment not allowed");

        loans[loanId].remainingBalance -= amount;
        loans[loanId].lastPaymentTimestamp = block.timestamp;

        emit LoanPaid(loanId, amount);
    }

    function checkForDefaulters(uint loanId) external onlyBank {
        require(loans[loanId].loanId == loanId, "Loan does not exist");
        require(block.timestamp > loans[loanId].lastPaymentTimestamp + 30 days, "Loan is not yet in default");
        
        loans[loanId].isDefaulted = true;
        defaulters[loans[loanId].borrower] = true;

        emit LoanDefaulted(loanId, loans[loanId].borrower);
    }

    function isDefaulter(address user) external view returns (bool) {
        return defaulters[user];
    }
}