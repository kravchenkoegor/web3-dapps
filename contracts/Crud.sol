// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Crud {
  struct User {
    uint256 id;
    string name;
  }

  User[] users;

  uint256 public nextId = 1;

  function getAllUsers() public view returns (User[] memory) {
    return users;
  }

  function findUserPosition(uint256 id) internal view returns (uint256 index) {
    for (uint256 i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        return i;
      }
    }

    revert("User doesn't exist");
  }

  function createUser(string memory name) public {
    uint256 id = nextId;
    users.push(User(id, name));
    nextId++;
  }

  function getUser(uint256 id) public view returns (uint256, string memory) {
    uint256 i = findUserPosition(id);
    return (users[i].id, users[i].name);
  }

  function updateUser(uint256 id, string memory name) public {
    users[findUserPosition(id)].name = name;
  }

  function deleteUser(uint256 id) public {
    delete users[findUserPosition(id)];
  }
}
