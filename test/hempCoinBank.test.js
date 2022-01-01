const HempCoin = artifacts.require('HempCoin');
const Reward = artifacts.require('Reward');
const HempCoinBank = artifacts.require('HempCoinBank');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('HempCoinBank', ([owner, customer]) =>{
    let hempCoin, reward, hempCoinBank

    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        hempCoin = await HempCoin.new()
        reward = await Reward.new()
        hempCoinBank = await HempCoinBank.new(reward.address, hempCoin.address)

        await reward.transfer(hempCoinBank.address, tokens('1000000'))

        await hempCoin.transfer(customer, tokens('100'), {from: owner})
    })

    describe('Hemp Coin Deployment', async () => {
        it('matches name successfully', async () =>{
            const name = await hempCoin.name()
            assert.equal(name, 'Hempcoin')
        })
    })

    describe('Reward Coin Deployment', async () => {
        it('matches name successfully', async () =>{
            const name = await reward.name()
            assert.equal(name, 'Reward')
        })
    })

    describe('HempCoin Bank Deployment', async () => {
        it('matches name successfully', async () =>{
            const name = await hempCoinBank.name()
            assert.equal(name, 'Bank of Hemp')
        })

        it('contract has tokens', async() => {
            balance = await reward.balanceOf(hempCoinBank.address)
            assert.equal(balance, tokens('1000000'))
        })

    describe('Yield Farming', async() => {
        it('rewards tokens for staking', async() => {
            let result;

            result = await hempCoin.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer hempcoin wallet balance before staking')
       
            await hempCoin.approve(hempCoinBank.address, tokens('100'), {from: customer})
        await hempCoinBank.depositTokens(tokens('100'), {from: customer})

        result = await hempCoin.balanceOf(customer)
        assert.equal(result.toString(), tokens('0'), 'customer hempcoin wallet balance after staking')

        result = await hempCoin.balanceOf(hempCoinBank.address)
        assert.equal(result.toString(), tokens('100'), 'hempCoinBank wallet balance after staking from customer')
     
        result = await hempCoinBank.isStaking(customer);
        assert.equal(result.toString(), 'true', 'Customer Staking Status after Staking')
            
        await hempCoinBank.issueTokens({from: owner})

        await hempCoinBank.issueTokens({from: customer}).should.be.rejected;

        await hempCoinBank.unstakeTokens({from: customer})

        result = await hempCoin.balanceOf(customer)
        assert.equal(result.toString(), tokens('100'), 'customer hempcoin wallet balance after unstaking')

        result = await hempCoin.balanceOf(hempCoinBank.address)
        assert.equal(result.toString(), tokens('0'), 'hempCoinBank wallet balance after unstaking from customer')
     
        result = await hempCoinBank.isStaking(customer);
        assert.equal(result.toString(), 'false', 'Customer Is No Longer Staking Status after unStaking')
    })
    })      
})
})