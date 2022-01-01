import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Web3 from "web3";
import HempCoin from '../truffle_abis/HempCoin.json';
import Reward from '../truffle_abis/Reward.json';
import HempCoinBank from '../truffle_abis/HempCoinBank.json';
import Main from './Main';

class App extends Component{

    async UNSAFE_componentWillMount(){
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3(){
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert("No Ethereum Browser Detected! Check Metamask")
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({account: account[0]})
        const networkId = await web3.eth.net.getId()
    
        const hempCoinData = HempCoin.networks[networkId]
    
        if(hempCoinData){
            const hempCoin = new web3.eth.Contract(HempCoin.abi, hempCoinData.address)
            this.setState({hempCoin})
            let hempCoinBalance = await hempCoin.methods.balanceOf(this.state.account).call()
            this.setState({hempCoinBalance: hempCoinBalance.toString()})
            console.log({balance: hempCoinBalance})
        } else{
            window.alert('Error! HempCoin Contract not deployed - no detected network')
        }

        const rewardData = Reward.networks[networkId]
        if(rewardData){
            const reward = new web3.eth.Contract(Reward.abi, rewardData.address)
            this.setState({reward})
            let rewardBalance = await reward.methods.balanceOf(this.state.account).call()
            this.setState({rewardBalance: rewardBalance.toString()})
            console.log({balance: rewardBalance})
        } else{
            window.alert('Error! Reward Token Contract not deployed - no detected network')
        }

        const hempCoinBankData = HempCoinBank.networks[networkId]
        if(hempCoinBankData){
            const hempCoinBank = new web3.eth.Contract(HempCoinBank.abi, hempCoinBankData.address)
            this.setState({hempCoinBank})
            let stakingBalance = await hempCoinBank.methods.stakingBalance(this.state.account).call()
            this.setState({stakingBalance: stakingBalance.toString()})
            console.log({balance: stakingBalance})
        } else{
            window.alert('Error! HempCoinBank Contract not deployed - no detected network')
        }
      this.setState({loading: false})
    }


    stakeTokens = (amount) => {
        this.setState({loading: true})
        this.state.hempCoin.methods.approve(this.state.hempCoinBank._address, amount).send({from: this.state.account})
        .on('transactionHash', (hash) => {
        this.state.hempCoinBank.methods.depositTokens(amount).send({from: this.state.account})
        .on('transactionHash', (hash) => {
            this.setState({loading: false})
        })
    })
    }

    unstakeTokens = () => {
        this.setState({loading: true})
        this.state.hempCoinBank.methods.unstakeTokens().send({from: this.state.account})
        .on('transactionHash', (hash) => {
            this.setState({loading: false})
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            hempCoin: {},
            reward: {},
            hempCoinBank: {},
            hempCoinBalance: '0',
            rewardBalance: '0',
            stakingBalance: '0',
            loading: true
        }
    }

    render(){
        
        return( 
        <div>
            <Main
        hempCoinBalance={this.state.hempCoinBalance} rewardBalance={this.state.rewardBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
        account={this.state.account}
        />}
         </div>
        )
            
           
        
    }
}

export default App;