const { expect } = require("chai");
const {network, ethers, getNamedAccounts} = require("hardhat");
const { setBalance, setBalanceWithAmount } = require("./helper/index");

describe("Test", () => {
  let deployer
  let owner;
  let sig1;
  let sig2;
  let sig3;
  let sig4;
  let sig5;
  let accounts;
  let signers;

  let checkoutDao;
  let checkoutHub;
  let daiAddress;

  before(async () => {
    // get signers and accounts of them
    [deployer,owner,sig1,sig2,sig3,sig4,sig5] = await ethers.getSigners();
    signers = [owner,sig1,sig2,sig3,sig4,sig5];
    accounts = [owner.address,sig1.address,sig2.address,sig3.address,sig4.address,sig5.address];

    // deploy contracts
    daiAddress = "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1"
    baseCurrency = await ethers.getContractAt("ERC20", daiAddress);
    console.log(await ethers.provider.getCode(baseCurrency.address));
    console.log(baseCurrency.address);

    await deployments.fixture([
      "CheckoutDao",
      "CheckoutHub",
    ]);

    checkoutDao = await ethers.getContract("CheckoutDao");
    checkoutHub = await ethers.getContract("CheckoutHub");

    // Mint baseCurrency Tokens to first 5 accounts
    await setBalance(baseCurrency, 2, accounts);

  });

  describe("Deployment", () => {
    it("Should deploy checkoutdao/hub", async () => {
      expect(checkoutDao.address).to.exist;
      expect(checkoutHub.address).to.exist;
    });
    it.skip("should have some BaseCurrency in first 5 accounts", async () => {
      for (let i = 0; i < 5; i++) {
        const balance = await baseCurrency.balanceOf(accounts[i]);
        expect(balance.isZero(), "Balance is 0").to.be.false;
      }
    });
  });
  describe("Checkout", () => {
    it("Should send correct amounts", async () => {
      const merchantAddress = sig2.address;
      const listingId = 1;
      const dateFrom = Date.now();
      const dateTo = Date.now();
      const price = 100;
      checkoutHub.connect(sig1).checkout(merchantAddress, listingId, dateFrom, dateTo, price, daiAddress);
    });
  });
});