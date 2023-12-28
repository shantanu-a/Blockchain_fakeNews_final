import React, { useEffect, useState } from 'react';
import abi from './contractJSON/fakeNews.json';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers'; 
import './App.css';
import AddNews from './components/AddNews'; 
import GetNews from './components/GetNews'; 
import Evaluate from './components/Evaluate';
import UpVote from './components/UpVote';
import DownVote from './components/DownVote';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState('Not Connected');

  useEffect(() => {
    const template = async () => {
      const { ethereum } = window;

      if (!ethereum) {
        console.error('MetaMask not detected. Please install MetaMask extension.');
        return;
      }

      if (!ethereum.isConnected()) {
        console.error('MetaMask is not connected.');
        return;
      }

      const contractAddress = "0x0f6885d58D196bD7f89Cd7B8b2f69Dbf1C258E70";
      const contractABI = abi.abi;

      try {
        const account = await ethereum.request({
          method: 'eth_requestAccounts',
        });

        //to display change when account is changed
        window.ethereum.on("accountsChanged" , ()=>{
          window.location.reload()
        })

        setAccount(account[0]);

        const provider = new Web3Provider(ethereum); // reading the blockchain
        const signer = provider.getSigner(); // writing the blockchain

        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setState({ provider, signer, contract });
        console.log(contract);
      } 
      catch (error) {
        alert(error);
      }
    };

    template();
  }, []);

  return (
    <div className='App'>
      <h1>Fake News Detector</h1>
      <div style={{margin:'5px'}}>
        Connected account: {account}
      </div>

      {/* AddNews component */}
      <AddNews contract={state.contract} account={account} />

      {/* GetNews component */}
      <GetNews contract={state.contract} />

      <Evaluate contract={state.contract} />

      {/* UpVote component */}
      <UpVote contract={state.contract} account={account} />

      {/* DownVote component */}
      <DownVote contract={state.contract} account={account} />

    </div>
  );
}

export default App;