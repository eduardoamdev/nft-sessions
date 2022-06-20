//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract HelloWorld {
    string private sentence;

    constructor(string memory _sentence) {
        console.log("Deploying a Greeter with sentence:", _sentence);
        sentence = _sentence;
    }

    function getSentence() public view returns (string memory) {
        return sentence;
    }

    function setSentece(string memory _sentence) public {
        console.log("Changing greeting from '%s' to '%s'", sentence, _sentence);
        sentence = _sentence;
    }
}
