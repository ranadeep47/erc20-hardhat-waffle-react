import './App.css';
import Token from './artifacts/contracts/Token.sol/Token.json';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { StyledSpinnerNext as Spinner } from "baseui/spinner";
import {styled, useStyletron} from 'baseui';
import { Button } from "baseui/button";

import TokenTransfer from './components/TransferToken'
import Allowance from './components/Allowance'
import Approval from './components/Approval'
import Balance from './components/Balance';
import TransferFrom from './components/TransferFrom';

const Container = styled('div', {
  margin: "auto",
  padding: "4rem 2rem",
  display: "flex",
  flexDirection: "column",
  width: "50%"
})

const tokenAddress = "0xCB1B15E3d881E7F9Bc05a7eFc61efE9661C112cb"
const DECIMALS = 18;
const NETWORK = 'rinkeby';

const formatEther = ethers.utils.formatEther;
const parseEther = ethers.utils.parseEther;

function App(props) {
  const [css, theme] = useStyletron();
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState();
  const [account, setAccount] = useState(null);
  const [supply, setSupply] = useState(0);

  const [accountBalance, setAccountBalance] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(async () => {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      if(network.name !== NETWORK) {
        return alert("Connect to rinkeby test net to connect to the contract");
      }

      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const contractWithSigner = contract.connect(signer);
      setContract(contractWithSigner);
      const totalSupply = await contract.totalSupply();
      setSupply(formatEther(totalSupply));
      setAccount(account);
      setShowLoader(false);
    }
  }, [])

  const getBalance = async () => {
    const balance = await contract.balanceOf(account);
    const tokensInContract = formatEther(balance)
    setBalance(tokensInContract);
  }

  const fetchBalance = async (address) => {
    const bal = await contract.balanceOf(address);
    const tokensInAccount = formatEther(bal);
    setAccountBalance(tokensInAccount);
  } 

  const fetchAllowance = async (owner, spender) => {
    const allowance = await contract.allowance(owner, spender);
    const allowanceInTokens = formatEther(allowance);
    setAllowance(allowanceInTokens);
  }

  const approve = async (address, amount) => {
    const amountInTokens = parseEther(amount)
    const result = await contract.approve(address, amountInTokens);
  }

  const transfer = async (address, amount) => {
    const amountInTokens = parseEther(amount)
    const result = await contract.transfer(address, amountInTokens);
  }

  const transferFrom = async (owner, receiver, amount) => {
    const amountInTokens = parseEther(amount);
    const result = await contract.transferFrom(owner, receiver, amountInTokens);
  }

  return (
    <div className={["App", css({backgroundColor: "#f9e47d"})].join(' ')}>
      <Container>    
        <h1>Yoga Coin</h1>            
        {showLoader ? <Spinner /> : 
          <>                        
            <p>💰 Total Token Supply: {supply}</p>
            <p>📨 Contract Address: {contract.address}</p>
            <p>📨 User Address: {account}</p>     
            <div className={css({display: "flex", flexDirection: "column"})}>
              <p>💰 User Balance: {balance}</p>
              <Button onClick={getBalance}>Get Balance</Button>
            </div> 
            <div>
              <TokenTransfer onRequestTransfer={transfer}/>
              <Approval onRequestApproval={approve}/>
              <Allowance onRequestAllowance={fetchAllowance} allowance={allowance} />
              <Balance onRequestBalance={fetchBalance} balance={accountBalance}/>
              <TransferFrom onTransferFromRequest={transferFrom} />
            </div>
          </>
        }
      </Container>
    </div>
  );
}

export default App;
