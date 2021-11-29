// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "./Ownable.sol";
import "./Olegka311.sol";

contract OlegkaContract is Ownable {
    Olegka311 public token;

    constructor(address _tokenAdress) {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        token = Olegka311(_tokenAdress);
    }

    function buyTokens() public payable {
        token.transfer(msg.sender, 1000000000000000000);
    }
}