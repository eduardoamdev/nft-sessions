import "./App.css";
import { useMetaMask } from "metamask-react";
import contractAbi from "./abis/session.json";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

const App = () => {
  const { status, connect, account, chainId } = useMetaMask();

  const [contractName, setContractName] = useState({
    name: "",
  });

  const [contract, setContract] = useState({
    contract: {},
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

  const getContractName = async () => {
    const name = await contract.contract.name();
    setContractName({
      name,
    });
  };



  const handleGetNameClick = (event) => {
    event.preventDefault();
    getContractName();
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
          <div>
            Account {account} connected on chain ID {chainId}
          </div>
          <button onClick={handleGetNameClick}>Get contract name</button>
          <div>{contractName.name}</div>
        </div>
      ) : (
        <div>There is an error. Try again.</div>
      )}
    </div>
  );
};

export default App;
