import {ethers} from 'ethers';
// Path to the compiled ABI JSON
import contractArtifact from '../artifacts/contracts/TransactionHistory.sol/TransactionHistory.json';

// Replace with the actual deployed address from your Hardhat console
// [npx hardhat run scripts/deploy.js --network localhost]
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// (Must have Hardhat local node running for this)
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

export const getContract = async () => {
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, contractArtifact.abi, signer);
};

export const sendMetadataToContract = async (meta: {
    id: string;
    txType: any;
    amount: number;
    method: string;
    timestamp: string | number
}) => {
    const contract = await getContract();
    const tx = await contract.addTransaction(
        meta.id,
        meta.txType,
        meta.amount,
        meta.method,
        meta.timestamp
    );
    await tx.wait();
};
