const HempCoinBank = artifacts.require('HempCoinBank');

module.exports = async function issueRewards(callback){
    let hempCoinBank = await HempCoinBank.deployed();
    await hempCoinBank.issueTokens();
    console.log('Tokens Issued');
    callback();
}