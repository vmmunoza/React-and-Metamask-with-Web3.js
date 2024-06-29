### Homework Assignment: Deploy a Simple Smart Contract on Metis and Create a dApp

#### Objective:
Deploy a simple smart contract on the Metis network and create a dApp that interacts with the contract using Web3.js, React, and MetaMask.

### Part 1: Setting Up the Development Environment

1. **Install Node.js and npm**:
   - Download and install Node.js from the [official website](https://nodejs.org/).

2. **Install Hardhat**:
   - Open your terminal and run:
     ```bash
     npm install --save-dev hardhat
     ```
   - Initialize a new Hardhat project:
     ```bash
     npx hardhat
     ```
   - Choose "Create a basic sample project" and follow the instructions.

3. **Install Additional Dependencies**:
   - In your project directory, install the following:
     ```bash
     npm install @metis.io/api
     npm install web3
     npm install dotenv
     ```

4. **Create a `.env` file** in the root of your Hardhat project to securely store your private key:
   ```bash
   touch .env
   ```
   - Add the following line to your `.env` file, replacing `YOUR_PRIVATE_KEY` with your actual private key:
     ```
     METIS_PRIVATE_KEY=YOUR_PRIVATE_KEY
     ```

### Part 2: Writing and Deploying the Smart Contract

1. **Write the Smart Contract**:
   - In the `contracts` directory, create a new file called `SimpleStorage.sol` with the following content:
     ```solidity
     // contracts/SimpleStorage.sol
     // SPDX-License-Identifier: MIT
     pragma solidity ^0.8.0;

     contract SimpleStorage {
         uint256 public storedData;

         function set(uint256 x) public {
             storedData = x;
         }

         function get() public view returns (uint256) {
             return storedData;
         }
     }
     ```

2. **Configure Hardhat**:
   - Update `hardhat.config.js` to include the Metis network configuration:
     ```javascript
     require("@nomiclabs/hardhat-waffle");
     require("dotenv").config();

     module.exports = {
       solidity: "0.8.0",
       networks: {
         metis: {
           url: "https://stardust.metis.io/?owner=YOUR_OWNER_ID", // Replace with the actual Metis network RPC URL
           accounts: [`0x${process.env.METIS_PRIVATE_KEY}`]
         }
       }
     };
     ```

3. **Deploy the Smart Contract**:
   - Create a new script in the `scripts` directory called `deploy.js`:
     ```javascript
     // scripts/deploy.js
     async function main() {
       const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
       const simpleStorage = await SimpleStorage.deploy();
       await simpleStorage.deployed();
       console.log("SimpleStorage deployed to:", simpleStorage.address);
     }

     main()
       .then(() => process.exit(0))
       .catch((error) => {
         console.error(error);
         process.exit(1);
       });
     ```
   - Deploy the contract:
     ```bash
     npx hardhat run scripts/deploy.js --network metis
     ```

### Part 3: Creating the React dApp

1. **Set Up React Project**:
   - In a new terminal window, create a React app:
     ```bash
     npx create-react-app simple-storage-dapp
     cd simple-storage-dapp
     ```

2. **Install Web3.js**:
   - Inside your React project directory, install Web3.js:
     ```bash
     npm install web3
     ```

3. **Create MetaMask Integration**:
   - Create a new file called `MetaMaskIntegration.js` in the `src` directory with the following content:
     ```javascript
     // src/MetaMaskIntegration.js
     import React, { useState, useEffect } from 'react';
     import Web3 from 'web3';

     const MetaMaskIntegration = () => {
       const [account, setAccount] = useState('');
       const [storageValue, setStorageValue] = useState('');
       const [newStorageValue, setNewStorageValue] = useState('');
       const [contract, setContract] = useState(null);

       const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your deployed contract address
       const contractABI = [ /* Add your contract's ABI here */ ];

       useEffect(() => {
         if (window.ethereum) {
           const web3 = new Web3(window.ethereum);
           window.ethereum.enable().then((accounts) => {
             setAccount(accounts[0]);
             const simpleStorageContract = new web3.eth.Contract(contractABI, contractAddress);
             setContract(simpleStorageContract);
           });
         } else {
           alert('Please install MetaMask!');
         }
       }, []);

       const getStorageValue = async () => {
         const value = await contract.methods.get().call();
         setStorageValue(value);
       };

       const setStorage = async () => {
         await contract.methods.set(newStorageValue).send({ from: account });
         getStorageValue();
       };

       return (
         <div>
           <h2>MetaMask Integration</h2>
           <p>Connected account: {account}</p>
           <div>
             <button onClick={getStorageValue}>Get Stored Value</button>
             <p>Stored Value: {storageValue}</p>
           </div>
           <div>
             <input
               type="text"
               value={newStorageValue}
               onChange={(e) => setNewStorageValue(e.target.value)}
             />
             <button onClick={setStorage}>Set Storage Value</button>
           </div>
         </div>
       );
     };

     export default MetaMaskIntegration;
     ```

4. **Update App Component**:
   - Update `src/App.js` to include the `MetaMaskIntegration` component:
     ```javascript
     // src/App.js
     import React from 'react';
     import MetaMaskIntegration from './MetaMaskIntegration';
     import './App.css';

     function App() {
       return (
         <div className="App">
           <header className="App-header">
             <h1>Simple Storage DApp</h1>
             <MetaMaskIntegration />
           </header>
         </div>
       );
     }

     export default App;
     ```

### Part 4: Running the dApp

1. **Start the React Application**:
   - In your terminal, run:
     ```bash
     npm start
     ```
   - This command will open your default web browser and navigate to `http://localhost:3000`.

### High-Level Steps to Follow:

1. **Set Up Development Environment**: Install Node.js, npm, Hardhat, and create a new React project.
2. **Write and Deploy Smart Contract**: Create a simple storage contract, configure Hardhat for Metis, and deploy the contract.
3. **Create React dApp**: Set up MetaMask integration, use Web3.js to interact with the smart contract, and build a simple UI.
4. **Run and Test the dApp**: Start the React application and test the contract interaction.
