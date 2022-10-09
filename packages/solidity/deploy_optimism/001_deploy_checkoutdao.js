module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const cdaoStable = "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1"; //dai optimism (also goerli)

  const feeData = await ethers.provider.getFeeData();

  const { address } = await deploy("CheckoutDao", {
    contract: "CheckoutDao",
    from: deployer,
    args: [
      cdaoStable
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
};

module.exports.tags = ["CheckoutDao"];