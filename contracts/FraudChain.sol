// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LoanManagement is Ownable(address(this)), ReentrancyGuard {
    struct Loan {
        address borrower;
        uint256 amount;
        uint256 interestRate;
        uint256 duration;
        bool approved;
    }
    
    mapping(address => Loan) public loans;
    
    event LoanApplied(
        address indexed borrower,
        uint256 amount,
        uint256 interestRate,
        uint256 duration,
        string transactionHash
    );

    event LoanApproved(address indexed borrower, uint256 amount);
    event LoanRepaid(address indexed borrower, uint256 amount);
    
    function applyForLoan(uint256 _amount, uint256 _interestRate, uint256 _duration) external nonReentrant {
        require(loans[msg.sender].amount == 0, "Loan already exists");
        loans[msg.sender] = Loan(msg.sender, _amount, _interestRate, _duration, false);
        emit LoanApplied(msg.sender, _amount, _interestRate, _duration, "Pending Hash");
    }
    
    function approveLoan(address _borrower) external onlyOwner {
        require(loans[_borrower].amount > 0, "No loan found");
        loans[_borrower].approved = true;
        emit LoanApproved(_borrower, loans[_borrower].amount);
    }
    
    function repayLoan(uint256 _ammount) external payable nonReentrant {
        require(loans[msg.sender].amount > 0, "No loan to repay");
        require(msg.value >= loans[msg.sender].amount, "Insufficient repayment amount");
        delete loans[msg.sender];
        emit LoanRepaid(msg.sender, msg.value);
    }
}

 