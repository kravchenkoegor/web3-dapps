// @ts-nocheck
const SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract("SimpleStorage", () => {
  it("should store the value 89", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();
    await simpleStorageInstance.setData(89);
    const storedData = await simpleStorageInstance.getData.call();
    assert(storedData.toNumber() === 89)
  });
});
