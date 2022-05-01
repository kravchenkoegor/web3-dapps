// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract SimpleStorage {
  uint256 data;

  function setData(uint256 _data) public {
    data = _data;
  }

  function getTwentyPercentOfData() public view returns (uint256) {
    return (data * 5) / 100;
  }

  function getData() public view returns (uint256) {
    return data;
  }
}
