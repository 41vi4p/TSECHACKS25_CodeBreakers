// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LoanManagement is Ownable(address(this)), ReentrancyGuard {
    struct Loan {
        uint256 loanId;
        address borrower;
        uint256 amount;
        uint256 interestRate;
        uint256 duration;
        string purpose;
        string collateral;
        uint256 income;
        string employmentStatus;
        bool approved;
        bool active;
        uint256 timestamp;
    }
    
    mapping(address => Loan[]) public userLoans;
    mapping(uint256 => address) public loanIdToBorrower;
    mapping(address => bool) public blacklistedUsers;
    
    uint256 public totalLoans;
    uint256 private nextLoanId = 1;
    
    event LoanApplied(
        uint256 indexed loanId,
        address indexed borrower,
        uint256 amount,
        uint256 interestRate,
        uint256 duration,
        string purpose,
        string collateral,
        uint256 income,
        string employmentStatus,
        uint256 timestamp
    );

    event LoanApproved(uint256 indexed loanId, address indexed borrower);
    event LoanRejected(uint256 indexed loanId, address indexed borrower);
    event LoanRepaid(uint256 indexed loanId, address indexed borrower, uint256 amount);
    event UserBlacklisted(address indexed user);
    
    function applyForLoan(
        uint256 _amount,
        uint256 _interestRate,
        uint256 _duration,
        string memory _purpose,
        string memory _collateral,
        uint256 _income,
        string memory _employmentStatus
    ) external nonReentrant returns (uint256) {
        require(!blacklistedUsers[msg.sender], "User is blacklisted");
        
        uint256 currentLoanId = nextLoanId;
        nextLoanId++;
        
        Loan memory newLoan = Loan({
            loanId: currentLoanId,
            borrower: msg.sender,
            amount: _amount,
            interestRate: _interestRate,
            duration: _duration,
            purpose: _purpose,
            collateral: _collateral,
            income: _income,
            employmentStatus: _employmentStatus,
            approved: false,
            active: false,
            timestamp: block.timestamp
        });
        
        userLoans[msg.sender].push(newLoan);
        loanIdToBorrower[currentLoanId] = msg.sender;
        totalLoans++;
        
        emit LoanApplied(
            currentLoanId,
            msg.sender,
            _amount,
            _interestRate,
            _duration,
            _purpose,
            _collateral,
            _income,
            _employmentStatus,
            block.timestamp
        );
        
        return currentLoanId;
    }
    
    function getLoanByLoanId(uint256 _loanId) public view returns (Loan memory) {
        address borrower = loanIdToBorrower[_loanId];
        require(borrower != address(0), "Loan ID does not exist");
        
        Loan[] memory loans = userLoans[borrower];
        for(uint i = 0; i < loans.length; i++) {
            if(loans[i].loanId == _loanId) {
                return loans[i];
            }
        }
        revert("Loan not found");
    }
    
    function approveLoan(uint256 _loanId) external onlyOwner {
        address borrower = loanIdToBorrower[_loanId];
        require(borrower != address(0), "Loan ID does not exist");
        
        Loan[] storage loans = userLoans[borrower];
        for(uint i = 0; i < loans.length; i++) {
            if(loans[i].loanId == _loanId) {
                require(!loans[i].approved, "Loan already approved");
                loans[i].approved = true;
                loans[i].active = true;
                emit LoanApproved(_loanId, borrower);
                return;
            }
        }
        revert("Loan not found");
    }
    
    function rejectLoan(uint256 _loanId) external onlyOwner {
        address borrower = loanIdToBorrower[_loanId];
        require(borrower != address(0), "Loan ID does not exist");
        
        Loan[] storage loans = userLoans[borrower];
        for(uint i = 0; i < loans.length; i++) {
            if(loans[i].loanId == _loanId) {
                require(!loans[i].approved, "Loan already approved");
                loans[i].active = false;
                emit LoanRejected(_loanId, borrower);
                return;
            }
        }
        revert("Loan not found");
    }
    
    function repayLoan(uint256 _loanId) external payable nonReentrant {
        Loan memory loan = getLoanByLoanId(_loanId);
        require(msg.sender == loan.borrower, "Not the loan borrower");
        require(loan.approved && loan.active, "Loan not active");
        require(msg.value >= loan.amount, "Insufficient repayment amount");
        
        // Update loan status
        Loan[] storage loans = userLoans[msg.sender];
        for(uint i = 0; i < loans.length; i++) {
            if(loans[i].loanId == _loanId) {
                loans[i].active = false;
                break;
            }
        }
        
        emit LoanRepaid(_loanId, msg.sender, msg.value);
    }
    
    function blacklistUser(address _user) external onlyOwner {
        blacklistedUsers[_user] = true;
        emit UserBlacklisted(_user);
    }
    
    function getUserLoans(address _user) external view returns (Loan[] memory) {
        return userLoans[_user];
    }
}