// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract AdvancedStorage {
  uint256[] ids;

  function add(uint256 id) public {
    ids.push(id);
  }

  function getId(uint256 index) public view returns (uint256) {
    return ids[index];
  }

  function getAll() public view returns (uint256[] memory) {
    return ids;
  }

  function getIdsLength() public view returns (uint256) {
    return ids.length;
  }
}
