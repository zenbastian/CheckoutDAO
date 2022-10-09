const {network, ethers, deployments, } = require("hardhat");

const toBytes32 = (bn) => {
  return ethers.utils.hexlify(ethers.utils.zeroPad(bn.toHexString(), 32));
};

const setStorageAt = async (address, index, value) => {
  await ethers.provider.send("hardhat_setStorageAt", [address, index, value]);
  await ethers.provider.send("evm_mine", []); // Just mines to the next block
};

async function setBalance(erc20Contract, slot, accounts) {
  const locallyManipulatedBalance = ethers.utils.parseEther("100000000");
  setBalanceWithAmount(erc20Contract, slot, accounts, locallyManipulatedBalance);
}

async function setBalanceWithAmount(erc20Contract, slot, accounts, amount) {
  const newFormatedBalance = toBytes32(amount).toString();

  for (let i = 0; i < accounts.length; i++) {
    // Get storage slot index
    const index = ethers.utils.solidityKeccak256(
      ["uint256", "uint256"],
      [accounts[i], slot] // key, slot
    );

    // Manipulate local balance (needs to be bytes32 string)
    await setStorageAt(
      erc20Contract.address,
      index.toString(),
      newFormatedBalance
    );
    //console.log("account %s %s %s", accounts[i], await erc20Contract.symbol(), await erc20Contract.balanceOf(accounts[i]));
  }
};

async function sendEther(signer, to, amount) {
  const tx = await signer.sendTransaction({
    to: to,
    value: ethers.utils.parseEther(amount)
  });
  return await tx.wait();
}

async function setBalances(accounts, daiContract) {
    // Set (manipulate local) DAI balance for first 5 accounts
    await setBalance(daiContract, 2, accounts);
}


//export * from "./time"

module.exports = { setBalance, sendEther, setBalances, setBalanceWithAmount};
