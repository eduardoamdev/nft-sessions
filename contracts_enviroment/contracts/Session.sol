//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./ERC721.sol";
import "./Ownable.sol";

contract Session is ERC721 {
    constructor() ERC721("Session", "SNFT") {
    }
}
