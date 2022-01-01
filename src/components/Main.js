import React, {Component} from 'react';
import './Main.css';
import Airdrop from './Airdrop';


class Main extends Component{
    render(){
        return(
           
<main className="main-card">
<div className="yield-farming-box">
    <div className="coin-card">
        <div className="stake-balance">
            <p>Staking Balance: {window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')}</p>
          </div>
          <div className="reward-balance">
           <p>Reward Balance: {window.web3.utils.fromWei(this.props.rewardBalance, 'Ether')}</p>
       </div>
    </div>
   <div className="stake-tokens">
    <h3>Stake Tokens</h3>
    <div className="account-card">
        <p>From: {this.props.account}</p>
    </div>
    <div className="account-card">
        <p>Account Balance: {window.web3.utils.fromWei(this.props.hempCoinBalance, 'Ether')}</p>
    </div>
    <div className="form-group">
        <form onSubmit={(event) => {
                        event.preventDefault()
                        let amount
                        amount = this.input.value.toString()
                        amount = window.web3.utils.toWei(amount, 'Ether')
                        this.props.stakeTokens(amount)
                    }}>
            <label>Stake Amount</label><br/><br/>
            <input ref={(input) => {this.input = input}} className="stake-input" placeholder="0" type="text"/>
            <div className="cta" style={{marginBottom: '20px'}}>
            <button className="btn-submit form-control"  type="submit">Deposit</button>
            </div>
        </form>
        <div className="cta" style={{marginBottom: '20px'}}>
        <button className="btn-withdraw form-control" onClick={(event) =>{
                        event.preventDefault(
                        this.props.unstakeTokens()
                        )}} type="submit">Withdraw</button>
       </div>
       <div className="cta" >
       <p style={{marginRight: '10px'}}>Airdrop:</p>   <Airdrop stakingBalance={this.props.stakingBalance} />
       </div>
    </div>
   </div>
</div>
</main>
            
            )
    }
}

export default Main;