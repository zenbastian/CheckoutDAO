module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const cdaoStable = "0xe11A86849d99F524cAC3E7A0Ec1241828e332C62"; //  usdc polygon mubai
  //const cdaoStable = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"; //dai polygon
  //const cdaoStable = "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1"; //dai optimism (also goerli)


  //const feeData = await ethers.provider.getFeeData();

   // get max fees from gas station
  let maxFeePerGas = ethers.BigNumber.from(50000000000) // fallback to 40 gwei
  let maxPriorityFeePerGas = ethers.BigNumber.from(50000000000) // fallback to 40 gwei
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


  const { address } = await deploy("CheckoutDao", {
    contract: "CheckoutDao",
    from: deployer,
    args: [
      cdaoStable
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
};

module.exports.tags = ["CheckoutDao"];