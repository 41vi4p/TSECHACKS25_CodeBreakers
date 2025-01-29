const { Web3 } = require('web3');

// Connect to Ganache RPC
const web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.0.158:8545"));

const addressToCheck = "0xAbF816fF212A61BC2F8d3E1E78Ed4b9381aC8F09";

async function getTransactionsByAddress(address, startBlock, endBlock) {
    let transactions = [];

    for (let i = startBlock; i <= endBlock; i++) {
        try {
            let block = await web3.eth.getBlock(i, true); // Fetch full block data

            if (block && block.transactions) {
                block.transactions.forEach(tx => {
                    if (tx.from.toLowerCase() === address.toLowerCase() || 
                        (tx.to && tx.to.toLowerCase() === address.toLowerCase())) {
                        transactions.push(tx);
                    }
                });
            }
        } catch (error) {
            console.error(`Error fetching block ${i}:`, error.message);
        }
    }

    return transactions;
}

(async () => {
    try {
        const latestBlock = await web3.eth.getBlockNumber(); // Get latest block number
        console.log(`Scanning blocks from 0 to ${latestBlock}...`);

        const transactions = await getTransactionsByAddress(addressToCheck, 0, latestBlock);

        if (transactions.length > 0) {
            console.log("Transactions involving the address:");
            console.log(transactions);
        } else {
            console.log("No transactions found for this address.");
        }
    } catch (err) {
        console.error("Error:", err.message);
    }
})();
