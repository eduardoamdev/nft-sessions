import "./App.css";
import { useMetaMask } from "metamask-react";
import contractAbi from "./abis/session.json";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

const App = () => {
  const { status, connect, account, chainId } = useMetaMask();

  const [contract, setContract] = useState({
    contract: {},
  });

  const [sessions, setSessions] = useState({
    sessions: [],
  });

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const { ethereum } = window;

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = provider.getSigner();

    const helloWorldContract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    return helloWorldContract;
  };

  const getSessions = async () => {
    const sessions = await contract.contract.functions.getSessions();
    setSessions({
      sessions,
    });
  };

  const mintToken = async () => {
    console.log(account, sessions.sessions[0][0][0]._hex);
    console.log(account, sessions.sessions[0][1][0]._hex);
    /* await contract.contract.mintToken(account, sessions.sessions[0][0][0]._hex) */
    await contract.contract.mintToken(account, sessions.sessions[0][1][0]._hex)
  }

  const handleGetSessionsClick = (event) => {
    event.preventDefault();
    getSessions();
  };

  const handleMintTokenClick = (event) => {
    event.preventDefault();
    mintToken();
  }

  useEffect(() => {
    if (ethereum) {
      const contract = getContract();
      setContract({
        contract,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!ethereum ? (
        <div>Install Metamask</div>
      ) : status === "initializing" ? (
        <div>Synchronisation with MetaMask ongoing</div>
      ) : status === "unavailable" ? (
        <div>MetaMask not available</div>
      ) : status === "notConnected" ? (
        <button onClick={connect}>Connect to MetaMask</button>
      ) : status === "connecting" ? (
        <div>Connecting...</div>
      ) : status === "connected" ? (
        <div>
          {console.log(sessions.sessions)}
          <div>
            Account {account} connected on chain ID {chainId}
          </div>
          <button onClick={handleGetSessionsClick}>Get sessions</button>
          <button onClick={handleMintTokenClick}>Mint</button>
        </div>
      ) : (
        <div>There is an error. Try again.</div>
      )}
    </div>
  );
};

export default App;
