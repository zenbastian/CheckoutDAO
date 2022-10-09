module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  const deployerSigner = await ethers.getSigner(deployer);

  const checkoutDao = await deployments.get("CheckoutDao");


  //const feeData = await ethers.provider.getFeeData();

   // get max fees from gas station
  let maxFeePerGas = ethers.BigNumber.from(45000000000) // fallback to 40 gwei
  let maxPriorityFeePerGas = ethers.BigNumber.from(45000000000) // fallback to 40 gwei
  try {
    const { data } = await axios({
        method: 'get',
        url: 'https://gasstation-mainnet.matic.network/v2'
    })
    maxFeePerGas = ethers.utils.parseUnits(
        Math.ceil(data.fast.maxFee) + '',
        'gwei'
    )
    maxPriorityFeePerGas = ethers.utils.parseUnits(
        Math.ceil(data.fast.maxPriorityFee) + '',
        'gwei'
    )
  } catch {
    // ignore
  }


  const { address } = await deploy("CheckoutHub", {
    contract: "CheckoutHub",
    from: deployer,
    args: [
      checkoutDao.address,
      deployer
    ],
    log: true,
    maxPriorityFeePerGas: maxPriorityFeePerGas,
    maxFeePerGas: maxFeePerGas,
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