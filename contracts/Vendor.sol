//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.10;

import "./TestToken.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface Students {
  function getStudentsList() external view returns (string[] memory);
}

contract Vendor is Ownable {
  // aggregator - 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e;
  // students_home - 0x0E822C71e628b20a35F8bCAbe8c11F274246e64D;

  TestToken public token;
  Students public students;
  AggregatorV3Interface public priceFeed;
  uint256 public deployedTimestamp = block.timestamp;

  event Bought(address payer, uint256 value);
  event BoughtFailed(address payer, uint256 value, string reason);
  event Success(address owner);

  constructor(address _tokenAddress, address _aggregator, address _students) {
    token = TestToken(_tokenAddress);
    students = Students(_students);
    priceFeed = AggregatorV3Interface(_aggregator);
  }

  function getLatestPrice() public view returns (uint256) {
        (,int price,,,) = priceFeed.latestRoundData();
        return uint256(price);
  }

  function buyTokens() public payable {
    require(msg.value > 0, "Send ETH to buy some tokens");

    uint256 amountToBuy = msg.value * (getLatestPrice() / getStudentsLength()) / (10 ** priceFeed.decimals());

    try token.transfer(msg.sender, amountToBuy) {
      emit Bought(msg.sender, msg.value);
    } catch Error(string memory reason) {
        emit BoughtFailed(msg.sender, msg.value, reason);
        (bool success,) = msg.sender.call{ value: msg.value }(bytes(reason));
        require(success, "External call failed"); 
    } catch (bytes memory reason) {
        (bool success,) = msg.sender.call{value: msg.value}(reason);
        require(success, "External call failed");
    } 

  }

  function adminFeature() public onlyOwner {
      require(block.timestamp > deployedTimestamp + 1 weeks, "You will not pass!!!");
      emit Success(msg.sender);
  }

  function getStudentsLength() public view returns (uint256) {
      return students.getStudentsList().length;
  }
}