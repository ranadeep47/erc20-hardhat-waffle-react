import './App.css';
import Token from './artifacts/contracts/Token.sol/Token.json';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Button } from 'baseui/button';
import { Spinner } from "baseui/spinner";
import {styled, useStyletron} from 'baseui';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';

import {BlockProps} from 'baseui/block';

import TokenTransfer from './components/TransferToken'
import Allowance from './components/Allowance'
import Approval from './components/Approval'
import Balance from './components/Balance';
import TransferFrom from './components/TransferFrom';

const Container = styled('div', {
  margin: "auto",
  width: "65%",
  background: "#a7c1e4",
  padding: "4rem 2rem",
  display: "flex",
  flexDirection: "column",
})

const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const tokenDecimals = 1e+18;
const DECIMALS = 18;

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
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const contractWithSigner = contract.connect(signer);
      setContract(contractWithSigner);

      const totalSupply = parseInt(await contract.totalSupply());
      setSupply(totalSupply);
      setAccount(account);
      console.log(contract);
      setShowLoader(false);
    }
  }, [])

  const getBalance = async () => {
    const balance = await contract.balanceOf(account);
    const tokensInContract = ethers.utils.formatUnits(balance, DECIMALS)
    setBalance(tokensInContract);
  }

  const fetchBalance = async (address) => {
    const bal = await contract.balanceOf(address);
    const tokensInAccount = ethers.utils.formatUnits(bal, DECIMALS)
    setAccountBalance(tokensInAccount);
  } 

  const fetchAllowance = async (owner, spender) => {
    const allowance = await contract.allowance(owner, spender);
    const allowanceInTokens = ethers.utils.formatUnits(allowance, DECIMALS);
    setAllowance(allowanceInTokens);
  }

  const approve = async (address, amount) => {
    const amountInTokens = ethers.utils.parseUnits(amount, DECIMALS);
    const result = await contract.approve(address, amountInTokens);
  }

  const transfer = async (address, amount) => {
    const amountInTokens = ethers.utils.parseUnits(amount, "ether");
    const result = await contract.transfer(address, amountInTokens);
  }

  const transferFrom = async (owner, receiver, amount) => {
    const amountInTokens = ethers.utils.parseUnits(amount, "ether");
    const result = await contract.transferFrom(owner, receiver, amountInTokens);
  }

  return (
    <div className="App">
      <Container>                
        {showLoader ? <Spinner /> : 
          <>            
            <Button onClick={getBalance}>update balance</Button>
            <p>💰 Total Token Supply: {supply}</p>
            <p>📨 Contract Address: {contract.address}</p>
            <p>📨 User Address: {account}</p>     
            <p>💰 User Balance: {balance}</p> 
            <FlexGrid
              flexGridColumnCount={2}
              flexGridColumnGap="scale800"
              flexGridRowGap="scale800">
              <TokenTransfer onRequestTransfer={transfer}/>
              <Approval onRequestApproval={approve}/>
              <Allowance onRequestAllowance={fetchAllowance} allowance={allowance} />
              <Balance onRequestBalance={fetchBalance} balance={accountBalance}/>
              <TransferFrom onTransferFromRequest={transferFrom} />
            </FlexGrid>
          </>
        }
      </Container>
    </div>
  );
}

export default App;
