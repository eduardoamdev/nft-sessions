import "./App.css";
import { useMetaMask } from "metamask-react";
import contractAbi from "./abis/helloWorld.json";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

const App = () => {
  const { status, connect, account, chainId } = useMetaMask();

  const [sentence, setSentence] = useState({
    sentence: "",
  });

  const [inputSentence, setInputSentence] = useState({
    sentence: "",
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

  const getContractSentence = async () => {
    const sentence = await contract.contract.getSentence();
    setSentence({
      sentence,
    });
  };

  const setContractSentence = async () => {
    await contract.contract.setSentence(inputSentence.sentence);
  };

  const handleGetClick = (event) => {
    event.preventDefault();
    getContractSentence();
  };


  const handleSetClick = (event) => {
    event.preventDefault();
    setContractSentence();
  };

  const handleChange = (event) => {
    setInputSentence({
      sentence: event.target.value,
    });
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
          <button onClick={handleGetClick}>Get sentece</button>
          <div>{sentence.sentence}</div>
          <input onChange={handleChange}></input>
          <button onClick={handleSetClick}>Set sentece</button>
        </div>
      ) : (
        <div>There is an error. Try again.</div>
      )}
    </div>
  );
};

export default App;
