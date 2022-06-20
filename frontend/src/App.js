import "./App.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const abi = [
  "function getSentence() public view returns (string memory)",
  "function setSentence(string memory sentence) public",
];

const address = "0x6E5e9A0Af782E3B5657Dfd00887CBCF4513D7261";

const signer = provider.getSigner();

const helloWorld = new ethers.Contract(address, abi, signer);

function App() {
  const [sentence, setSentence] = useState({
    sentence: "",
  });

  const [newSentence, setNewSentence] = useState({
    sentence: "",
  });

  const getAccount = async () => {
    const account = await signer.getAddress();

    console.log(account);
  };

  const getContractSentence = async () => {
    const sentence = await helloWorld.functions.getSentence();

    setSentence({
      sentence,
    });
  };

  const setContractSentence = async () => {
    await helloWorld.functions.setSentence(newSentence.sentence);

    getContractSentence();
  };

  const handleChange = (event) => {
    event.preventDefault();
    setNewSentence({
      sentence: event.target.value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    setContractSentence();
  };

  useEffect(() => {
    getAccount();
    getContractSentence();
  }, []);

  return (
    <div className="App">
      <h1>This is the contract sentence</h1>
      {sentence.sentence === "" ? (
        <h3>Loading</h3>
      ) : (
        <div>
          <h2>{sentence.sentence}</h2>
          <h3>Change sentence</h3>
          <input onChange={handleChange}></input>
          <button onClick={handleClick}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default App;
