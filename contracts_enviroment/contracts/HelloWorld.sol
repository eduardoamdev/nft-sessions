//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract HelloWorld {
    string private sentence;

    constructor(string memory _sentence) {
        sentence = _sentence;
    }

    function getSentence() public view returns (string memory) {
        return sentence;
    }

    function setSentence(string memory _sentence) public {
        sentence = _sentence;
    }
}
