# 🔐 CryptPe - Decentralized Hybrid Payment Gateway System

CryptPe is a decentralized payment gateway that bridges the gap between traditional UPI payments and blockchain-based cryptocurrency transfers. It leverages Ethereum smart contracts to record transactions securely while providing a React Native + Expo-based frontend that mimics the user-friendly flow of UPI apps.

---

## 📁 Project Structure
```
CryptPe/
├── app/
│ ├── (tabs)/
│ │ ├── _layout.tsx
│ │ ├── crypto.tsx
│ │ ├── index.tsx
│ │ ├── profile.tsx
│ │ └── upi.tsx
│ ├── _layout.tsx
│ └── globals.css
├── assets/
├── cache/
├── constants/
├── context/
│ └── TransactionContext.tsx
├── contracts/
│ └── TransactionHistory.sol
├── interfaces/
│ ├── interfaces.d.ts
│ └── Transaction.ts
├── node_modules/
├── scripts/
│ └── deploy.js
├── utils/
│ └── contract.ts
├── .env
├── app.json
```
---

## 🚀 Features

- 💳 Dual-mode payments (UPI and Crypto)
- 🔗 Ethereum-based smart contract transaction logging
- 📱 React Native + Expo frontend
- 📊 Transaction history pulled from blockchain
- ⚙️ Easy deployment and integration

---

## 🛠 Prerequisites

- Node.js & npm
- Hardhat (for smart contract deployment)
- Expo CLI (`npm install -g expo-cli`)
- Android emulator or Expo Go on mobile
- Metamask (for interacting with smart contracts)
- Ganache (or Hardhat node) for local blockchain

---

## 🧑‍💻 Setup Instructions

### 1. Clone the Repository

   ```bash
   git clone https://github.com/gitgyana/CryptPe.git
   cd CryptPe
   ```

### 2. Install Dependencies

   ```bash
   npm install
   ```

⚙️ Blockchain Setup (Hardhat)

### 3. Run Local Hardhat Node

   ```bash
   npx hardhat node
   ```

### 4. Compile the Contract

   ```bash
   npx hardhat compile
   ```

### 5. Deploy the Contract

   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

- Note: Copy the deployed contract address to .env file like this:
- NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress

📲 Running the App (Mobile)
### 6. Start the Expo App

   ```bash
   npx expo start
   ```

- Scan the QR Code using Expo Go app on your Android device.
- Make sure your development machine and phone are on the same network.

---

## 🔗 How It Works
- `upi.tsx` and `crypto.tsx` send transaction metadata (amount, type, method) to `TransactionContext.tsx`
- The `TransactionContext.tsx` handles in-app state and can push to the blockchain via smart contracts.
- `profile.tsx` retrieves the transaction history directly from the smart contract (`contract.ts`) and displays it.

---

## 📜 Smart Contract
- Located in:
    - `contracts/TransactionHistory.sol`


- Handles:
    - Storing transaction metadata
    - Retrieving transaction count 
    - Returning transaction data to the frontend

---

## 🧪 Testing
- Use Ganache or Hardhat node for local blockchain testing.
- Use Metamask with localhost chain ID 1337.

---

## 📌 Future Enhancements
- Real wallet integration (MetaMask/WalletConnect)
- NFT-based transaction receipts
- Push notifications for successful payments
- AR-based location tagging for real-world payments

---

## 🧑‍💼 Contributors
- #### Gyana Priyadarshi
- #### Abhisekh Padhiary 
- #### Satyaranjan Mishra 
- #### Balabhadra Behera 
