const HempCoin = artifacts.require('HempCoin');
const Reward = artifacts.require('Reward');
const HempCoinBank = artifacts.require('HempCoinBank');

module.exports = async function(deployer, network, accounts) {

  await deployer.deploy(HempCoin);
  const hempCoin = await HempCoin.deployed();

  await deployer.deploy(Reward);
  const reward = await Reward.deployed();

  await deployer.deploy(HempCoinBank, reward.address, hempCoin.address);
  const hempCoinBank = await HempCoinBank.deployed();

  await reward.transfer(hempCoinBank.address, '1000000000000000000000000');
 
  await hempCoin.transfer(accounts[1], '100000000000000000000')

};

