# MetaMask Integration with React App

Step-by-step guide to set up a basic React application using Create React App and integrate MetaMask using the Web3.js library.

## Prerequisites

- [Node.js](https://nodejs.org/) (includes npm)

## Step 1: Set Up Your Development Environment

1. **Create a New React Project**

   Open your terminal and run the following commands:

   ```bash
   npx create-react-app metamask-integration
   cd metamask-integration
   ```

   This will create a new directory called `metamask-integration` with a basic React project set up.

## Step 2: Install Web3.js Library

1. **Install Web3**

   While in the `metamask-integration` directory, run the following command to install the `web3` library:

   ```bash
   npm install web3
   ```

## Step 3: Create a MetaMask Integration Component

1. **Navigate to the `src` Directory**

   Your project structure should look like this:

   ```
   metamask-integration/
   ├── node_modules/
   ├── public/
   │   ├── favicon.ico
   │   ├── index.html
   │   └── manifest.json
   ├── src/
   │   ├── App.css
   │   ├── App.js
   │   ├── App.test.js
   │   ├── index.css
   │   ├── index.js
   │   ├── logo.svg
   │   ├── reportWebVitals.js
   ├── .gitignore
   ├── package.json
   ├── README.md
   ├── yarn.lock
   └── package-lock.json
   ```

2. **Create a New Component File**

   In the `src` directory, create a new file named `MetaMaskButton.js`:

   ```bash
   touch src/MetaMaskButton.js
   ```

3. **Add MetaMask Integration Code**

   Open `MetaMaskButton.js` in a code editor and add the following code:

   ```javascript
   // src/MetaMaskButton.js
   import React from 'react';
   import Web3 from 'web3';

   const MetaMaskButton = () => {
     const connectMetaMask = async () => {
       if (window.ethereum) {
         try {
           await window.ethereum.request({ method: 'eth_requestAccounts' });
           const web3 = new Web3(window.ethereum);
           const accounts = await web3.eth.getAccounts();
           console.log('Connected account:', accounts[0]);
           alert(`Connected account: ${accounts[0]}`);
         } catch (error) {
           console.error('User denied account access', error);
         }
       } else {
         alert('Please install MetaMask!');
       }
     };

     return (
       <button onClick={connectMetaMask}>Connect MetaMask</button>
     );
   };

   export default MetaMaskButton;
   ```

## Step 4: Update the App Component

1. **Modify `src/App.js`**

   Open `App.js` and update it to include the `MetaMaskButton` component:

   ```javascript
   // src/App.js
   import React from 'react';
   import MetaMaskButton from './MetaMaskButton';
   import './App.css';

   function App() {
     return (
       <div className="App">
         <header className="App-header">
           <h1>MetaMask Integration</h1>
           <MetaMaskButton />
         </header>
       </div>
     );
   }

   export default App;
   ```

2. **Style your app**

   The default styling in `App.css` is sufficient, but you can add your custom styles if needed. Here’s an example:

   ```css
   /* src/App.css */
   .App {
     text-align: center;
   }

   .App-header {
     background-color: #282c34;
     min-height: 100vh;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     font-size: calc(10px + 2vmin);
     color: white;
   }

   button {
     padding: 10px 20px;
     font-size: 16px;
     cursor: pointer;
   }
   ```

## Step 5: Run Your Project

1. **Start the Development Server**

   In your terminal, while inside the `metamask-integration` directory, start the development server by running:

   ```bash
   npm start
   ```

   This command will open your default web browser and navigate to `http://localhost:3000`.

## Full Project Structure

After completing these steps, your project structure should look like this:

```
metamask-integration/
├── node_modules/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── MetaMaskButton.js
│   └── reportWebVitals.js
├── .gitignore
├── package.json
├── README.md
├── yarn.lock
└── package-lock.json
```


