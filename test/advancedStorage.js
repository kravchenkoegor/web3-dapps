// @ts-nocheck
const AdvancedStorage = artifacts.require("./AdvancedStorage.sol");

contract("AdvancedStorage", () => {
  let advancedStorage = null;

  before(async () => {
    advancedStorage = await AdvancedStorage.deployed();
  });

  it("should add an element to the ids array", async () => {
    await advancedStorage.add(10);
    const result = await advancedStorage.getId(0);
    assert(result.toNumber() === 10);
  });

  it("should get an element from the ids array", async () => {
    await advancedStorage.add(20);
    const result = await advancedStorage.getId(1);
    assert(result.toNumber() === 20);
  });

  it("should get the ids array", async () => {
    const rawIds = await advancedStorage.getAll();
    const ids = rawIds.map(id => id.toNumber())
    assert.deepEqual(ids, [10, 20]);
  });

  it("should get the ids array length", async () => {
    const length = await advancedStorage.getIdsLength();
    assert(length.toNumber() === 2);
  });
});
