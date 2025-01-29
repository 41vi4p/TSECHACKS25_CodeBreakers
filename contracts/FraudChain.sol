    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract LoanManagement {
        struct Loan {
            uint loanId;
            address borrower;
            address bank;
            uint amount;
            uint interest;
            uint duration;  // Duration in days
            uint remainingBalance;
            uint totalPaid;
            uint installments;  // Total installments
            uint remainingInstallments;  // Remaining installments
            uint lastPaymentTimestamp;
            uint lastPaidAmount; // Last payment amount
            bool isApproved;
            bool isDefaulted;
            bool isFullyPaid;
        }

        mapping(uint => Loan) public loans;
        mapping(address => bool) public defaulters;
        mapping(address => bool) public registeredBanks;
        uint public loanCounter;

        event LoanApplied(uint loanId, address borrower, uint amount);
        event LoanApproved(uint loanId, address bank);
        event LoanPaid(uint loanId, uint amount, uint remainingBalance, uint remainingInstallments);
        event LoanDefaulted(uint loanId, address borrower);
        event LoanFullyPaid(uint loanId, address borrower);

        modifier onlyBank() {
            require(registeredBanks[msg.sender], "Only registered banks can perform this action");
            _;
        }

        modifier onlyBorrower(uint loanId) {
            require(loans[loanId].borrower == msg.sender, "Only borrower can perform this action");
            _;
        }

        function registerBank(address bank) external {
            registeredBanks[bank] = true;
        }

        function applyForLoan(uint amount, uint interest, uint duration, uint installments) external {
            require(!defaulters[msg.sender], "Defaulters cannot apply for a new loan");

            loanCounter++;
            loans[loanCounter] = Loan({
                loanId: loanCounter,
                borrower: msg.sender,
                bank: address(0),
                amount: amount,
                interest: interest,
                duration: duration,
                remainingBalance: amount,
                totalPaid: 0,
                installments: installments,
                remainingInstallments: installments,
                lastPaymentTimestamp: block.timestamp,
                lastPaidAmount: 0,
                isApproved: false,
                isDefaulted: false,
                isFullyPaid: false
            });

            emit LoanApplied(loanCounter, msg.sender, amount);
        }

        function approveLoan(uint loanId, address bank) external onlyBank {
            require(loans[loanId].loanId == loanId, "Loan does not exist");
            loans[loanId].bank = bank;
            loans[loanId].isApproved = true;
            emit LoanApproved(loanId, bank);
        }

        function repayLoan(uint loanId, uint amount) external onlyBorrower(loanId) {
            require(loans[loanId].loanId == loanId, "Loan does not exist");
            require(loans[loanId].isApproved, "Loan must be approved");
            require(amount > 0, "Payment amount must be greater than 0");
            require(loans[loanId].remainingBalance >= amount, "Overpayment not allowed");

            // Update loan balance and payment details
            loans[loanId].remainingBalance -= amount;
            loans[loanId].totalPaid += amount;
            loans[loanId].remainingInstallments--;
            loans[loanId].lastPaymentTimestamp = block.timestamp;
            loans[loanId].lastPaidAmount = amount;

            // Check if loan is fully paid
            if (loans[loanId].remainingBalance == 0) {
                loans[loanId].isFullyPaid = true;
                emit LoanFullyPaid(loanId, loans[loanId].borrower);
            }

            emit LoanPaid(loanId, amount, loans[loanId].remainingBalance, loans[loanId].remainingInstallments);
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

        // Get loan details (For convenience)
        function getLoanDetails(uint loanId) external view returns (
        address borrower,
        address bank,
        uint amount,
        uint interest,
        uint duration,
        uint remainingBalance,
        uint totalPaid,
        uint installments,
        uint remainingInstallments,
        uint lastPaymentTimestamp,
        uint lastPaidAmount,
        bool isApproved,
        bool isDefaulted,
        bool isFullyPaid
    ) {
        // Return each loan detail separately to avoid stack too deep error
        borrower = loans[loanId].borrower;
        bank = loans[loanId].bank;
        amount = loans[loanId].amount;
        interest = loans[loanId].interest;
        duration = loans[loanId].duration;
        remainingBalance = loans[loanId].remainingBalance;
        totalPaid = loans[loanId].totalPaid;
        installments = loans[loanId].installments;
        remainingInstallments = loans[loanId].remainingInstallments;
        lastPaymentTimestamp = loans[loanId].lastPaymentTimestamp;
        lastPaidAmount = loans[loanId].lastPaidAmount;
        isApproved = loans[loanId].isApproved;
        isDefaulted = loans[loanId].isDefaulted;
        isFullyPaid = loans[loanId].isFullyPaid;
    }
