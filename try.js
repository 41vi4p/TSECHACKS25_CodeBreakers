const { Web3 } = require('web3');
const neo4j = require('neo4j-driver');

// Connect to Ganache RPC
const web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.0.158:8545"));

// Neo4j Connection
const driver = neo4j.driver(
    "neo4j://localhost:7687",
    neo4j.auth.basic("neo4j", "admin@123")
);

const session = driver.session();

const addressToCheck = "0xAbF816fF212A61BC2F8d3E1E78Ed4b9381aC8F09";

// **🔹 Paste Your Smart Contract ABI Here**
const contractABI = [
    {
        "inputs": [{"internalType": "address","name": "user","type": "address"}],
        "name": "mintIdentityNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address","name": "user","type": "address"}],
        "name": "flagDefaulter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contractInterface = new web3.eth.Contract(contractABI);

// **🔹 Function to Decode Transaction Data**
function decodeFunctionData(inputData) {
    if (!inputData || inputData === "0x") return { functionName: "Unknown", parameters: {} };

    const functionSignature = inputData.slice(0, 10); // First 4 bytes
    const functionAbi = contractABI.find(f => web3.eth.abi.encodeFunctionSignature(f) === functionSignature);

    if (functionAbi) {
        const decodedParams = web3.eth.abi.decodeParameters(functionAbi.inputs, inputData.slice(10));
        return { functionName: functionAbi.name, parameters: decodedParams };
    } else {
        return { functionName: "Unknown", parameters: {} };
    }
}

// **🔹 Fetch Blocks & Store in Neo4j**
async function processBlocks(startBlock, endBlock) {
    for (let i = startBlock; i <= endBlock; i++) {
        try {
            let block = await web3.eth.getBlock(i, true);

            if (block) {
                console.log(`Processing Block: ${block.number}`);

                // Store Block in Neo4j
                await session.run(
                    `MERGE (b:Block {number: $number, hash: $hash, prevHash: $prevHash, timestamp: $timestamp})`,
                    {
                        number: block.number,
                        hash: block.hash,
                        prevHash: block.parentHash,
                        timestamp: block.timestamp
                    }
                );

                // Connect Blocks
                if (block.parentHash !== "0x0000000000000000000000000000000000000000000000000000000000000000") {
                    await session.run(
                        `MATCH (b1:Block {hash: $prevHash}), (b2:Block {hash: $hash})
                        MERGE (b1)-[:NEXT_BLOCK]->(b2)`,
                        {
                            prevHash: block.parentHash,
                            hash: block.hash
                        }
                    );
                }

                // Process Transactions
                if (block.transactions.length > 0) {
                    for (let tx of block.transactions) {
                        if (
                            tx.from.toLowerCase() === addressToCheck.toLowerCase() ||
                            (tx.to && tx.to.toLowerCase() === addressToCheck.toLowerCase())
                        ) {
                            // Decode function name & parameters
                            const { functionName, parameters } = decodeFunctionData(tx.input);

                            // Store Transaction in Neo4j
                            await session.run(
                                `MERGE (t:Transaction {hash: $txHash, from: $from, to: $to, value: $value, function: $functionName})
                                 MERGE (b:Block {number: $blockNumber})
                                 MERGE (b)-[:CONTAINS]->(t)
                                 MERGE (s:Address {address: $from})
                                 MERGE (r:Address {address: $to})
                                 MERGE (s)-[:SENT]->(t)
                                 MERGE (t)-[:RECEIVED]->(r)
                                 MERGE (t)-[:CALLS_FUNCTION]->(:Function {name: $functionName, parameters: $parameters})`,
                                {
                                    txHash: tx.hash,
                                    from: tx.from,
                                    to: tx.to || "0x0000000000000000000000000000000000000000",
                                    value: web3.utils.fromWei(tx.value, "ether"),
                                    blockNumber: block.number,
                                    functionName: functionName,
                                    parameters: JSON.stringify(parameters)
                                }
                            );
                        }
                    }
                }
            }
        } catch (error) {
            console.error(`Error fetching block ${i}:`, error.message);
        }
    }

    console.log("✅ Data Inserted into Neo4j!");
}

// **Execute the function**
(async () => {
    try {
        const latestBlock = await web3.eth.getBlockNumber();
        console.log(`Scanning blocks from 0 to ${latestBlock}...`);

        await processBlocks(0, latestBlock);
    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await session.close();
        await driver.close();
    }
})();
