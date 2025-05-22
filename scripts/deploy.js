async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contract with the account:", deployer.address);

    const TransactionHistory = await ethers.getContractFactory("TransactionHistory");
    const contract = await TransactionHistory.deploy();  // <- No .deployed()

    console.log("Contract deployed at:", contract.target);  // For newer Hardhat, use .target not .address
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
