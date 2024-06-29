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
