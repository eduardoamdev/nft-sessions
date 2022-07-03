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

  const contractAddress = "0x0F4a5909a186Ebdeab15081640B86544A129728E";

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

  const getContractSentence = async (_contract) => {
    const sentence = await _contract.getSentence();
    setSentence({
      sentence,
    });
  };

  const setContractSentece = async () => {
    await contract.contract.setSentence(inputSentence.sentence);
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
    if (ethereum) {
      const contract = getContract();
      getContractSentence(contract);
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
