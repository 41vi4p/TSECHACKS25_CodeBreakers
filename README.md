# TSECHACKS25_CodeBreakers

# Fraud-Chain

## User Registration & Authentication
1. User chooses login method:
   - **Option 1:** Traditional signup (email/password stored in DB)
   - **Option 2:** Metamask login (Web3 authentication)
2. If traditional login, user binds a **Metamask wallet** for blockchain interactions.
3. **Role-Based Access:** Users (borrowers), Banks (lenders), Admins (platform control).

## Loan Application Process
1. User applies for a loan by selecting a bank.
2. Loan details (amount, interest, duration) are **encrypted** using **AES + RSA/ECC**.
   - **User encrypts loan details** with their key.
   - **Bank & app hold the decryption key** for access.
3. The encrypted loan request is **written to the blockchain** as a new block.
4. The bank **reviews & approves/rejects** via a smart contract.
   - If **approved**, funds are released to the borrower.
   - If **rejected**, the block is updated with rejection status.

## Loan Repayment & Tracking
1. Each **installment payment** is recorded on the blockchain as a transaction within the same block.
2. User makes a **monthly repayment** using Metamask (crypto) or fiat via an off-chain bridge.
3. Smart contract:
   - Updates **remaining loan balance**.
   - Calculates **penalties for late payments**.
   - Checks if the borrower has defaulted.

## Default Prevention & Risk Registry
1. If a borrower **misses multiple payments**, their block is updated with a **defaulter flag**.
2. Defaulter’s wallet address is **added to the risk registry**.
3. Smart contract automatically **blocks defaulters from applying for new loans** at any bank.

## Data Privacy & Security
- **All loan details are encrypted** before writing to the blockchain.
- **Only banks & authorized entities** can decrypt loan data.
- **Zero-Knowledge Proofs (ZKPs)** allow banks to verify risk status **without exposing full details**.

## Regulatory Compliance & Auditing
1. Regulators can request **decryption access** via a **multi-signature approval** mechanism.
2. Every action (loan approval, payment, default) has an **immutable audit trail**.

---

This markdown file describes the entire process of a **blockchain-based loan management system** with encryption, authentication, and defaulter tracking.
