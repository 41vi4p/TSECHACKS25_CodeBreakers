const { ethers } = require("ethers");

// Set up provider (for example, using the default provider)
const provider = new ethers.JsonRpcProvider("http://192.168.0.158:8545");

// Smart contract address and ABI
const contractAddress = "0xAbF816fF212A61BC2F8d3E1E78Ed4b9381aC8F09";
const contractABI = [
    // ABI of the event you want to filter (example)
    "event LoanApproved(address indexed borrower, uint256 loanAmount)"
];

// Create contract instance
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Set up the filter for the event
const filter = contract.filters.LoanApproved(null, null); // You can pass specific values for indexing to filter results

// Listen for the event
contract.on(filter, (borrower, loanAmount, event) => {
    console.log(`Loan approved for borrower: ${borrower} with loan amount: ${loanAmount}`);
    // You can process event details here
});

// You can also fetch past events
async function getPastEvents() {
    const pastEvents = await contract.queryFilter(filter, 0, "latest");
    pastEvents.forEach(event => {
        console.log(event.args.borrower, event.args.loanAmount);
    });
}

getPastEvents();
