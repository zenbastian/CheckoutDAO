module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  const deployerSigner = await ethers.getSigner(deployer);

  const checkoutDao = await deployments.get("CheckoutDao");

  const feeData = await ethers.provider.getFeeData();

  const { address } = await deploy("CheckoutHub", {
    contract: "CheckoutHub",
    from: deployer,
    args: [
      checkoutDao.address,
      deployer
    ],
    log: true,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    maxFeePerGas: feeData.maxFeePerGas,
  });


  if (network.name != "hardhat") {
    // auto verify on etherscan
    await hre.run("etherscan-verify", {
    });
  }

  // set the hub in the cdao token
  checkoutDaoContract = await ethers.getContract("CheckoutDao");
  checkoutDaoContract.connect(deployerSigner).changeCheckoutHub(address);
};

module.exports.tags = ["CheckoutHub"]
module.exports.dependencies = ["CheckoutDao"];