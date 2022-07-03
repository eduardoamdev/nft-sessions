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

  const [inputSentece, setInputSentence] = useState({
    sentence: "",
  });

  const contractAddress = "0x0F4a5909a186Ebdeab15081640B86544A129728E";

  const { ethereum } = window;

  const provider = new ethers.providers.Web3Provider(ethereum);

  const signer = provider.getSigner();

  const helloWorldContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  const getContractSentence = async () => {
    const sentence = await helloWorldContract.getSentence();
    setSentence({
      sentence,
    });
  };

  const setContractSentece = async () => {
    await helloWorldContract.setSentence(inputSentece.sentence);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setContractSentece();
  };

  const handleChange = (event) => {
    setInputSentence({
      sentence: event.target.value,
    });
  };

  useEffect(() => {
    getContractSentence();
  }, []);

  return (
    <div>
      {status === "initializing" ? (
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
            Connected account {account} on chain ID {chainId}
          </div>
          <div>{sentence.sentence}</div>
          <div>Write a new sentence</div>
          <input onChange={handleChange}></input>
          <button onClick={handleClick}>Set sentece</button>
        </div>
      ) : (
        <div>There is an error. Try again.</div>
      )}
    </div>
  );
};

export default App;
