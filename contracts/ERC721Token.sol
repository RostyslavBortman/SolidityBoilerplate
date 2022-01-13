//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract ERC721Token is ERC721 {

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        //silence
    }

}