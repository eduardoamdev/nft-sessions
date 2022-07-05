//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./ERC721.sol";
import "./Ownable.sol";

contract SessionToken is ERC721, Ownable {
    struct Session {
        uint256 key;
        string date;
        bool available;
    }

    Session[] public sessionsList;

    uint256 public nextSessionIndex;

    constructor() ERC721("SessionToken", "SNFT") {
        nextSessionIndex = 0;
    }

    function createSession(string memory _date) public payable onlyOwner {
        sessionsList.push(
            Session({key: nextSessionIndex, date: _date, available: true})
        );

        nextSessionIndex++;
    }

    function getSessions() public view returns (Session[] memory) {
        return sessionsList;
    }

    function mintToken(address _to, uint256 _tokenId) public payable {
        _mint(_to, _tokenId);
    }
}
