// @ts-nocheck
const Crud = artifacts.require("./Crud.sol");

contract("Crud", () => {
  let crud = null;

  before(async () => {
    crud = await Crud.deployed();
  });

  it("should create an user", async () => {
    await crud.createUser('Egor');
    const user = await crud.getUser(1);
    assert(user[0].toNumber() === 1);
    assert(user[1] === 'Egor');
  });

  it("should update the user", async () => {
    await crud.updateUser(1, 'Egor Kravchenko');
    const user = await crud.getUser(1);
    assert(user[0].toNumber() === 1);
    assert(user[1] === 'Egor Kravchenko');
  });

  it("should NOT update non-existent user", async () => {
    try {
      await crud.updateUser(2, 'Egor Kravchenko');
    } catch (error) {
      assert(error.message.includes("User doesn't exist"))
      return;
    }

    assert(false);
  });

  it("should delete the user", async () => {
    await crud.createUser('test');
    await crud.deleteUser(2);

    try {
      await crud.getUser(2);
    } catch (error) {
      assert(error.message.includes("User doesn't exist"))
      return;
    }
    
    assert(false);
  });

  it("should NOT delete non-existent user", async () => {
    try {
      await crud.deleteUser(3);
    } catch (error) {
      assert(error.message.includes("User doesn't exist"))
      return;
    }
    
    assert(false);
  });
});
