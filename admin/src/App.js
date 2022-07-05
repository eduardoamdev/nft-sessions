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

  const createSession = async () => {
    await contract.contract.functions.createSession("2022-08-09");
  };

  const getSessions = async () => {
    const sessions = await contract.contract.functions.getSessions();
    setSessions({
      sessions,
    });
  };

  const handleNewSessionClick = (event) => {
    event.preventDefault();
    createSession();
  };

  const handleGetSessionsClick = (event) => {
    event.preventDefault();
    getSessions();
  };

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
          <button onClick={handleNewSessionClick}>New session</button>
          <button onClick={handleGetSessionsClick}>Get sessions</button>
        </div>
      ) : (
        <div>There is an error. Try again.</div>
      )}
    </div>
  );
};

export default App;
