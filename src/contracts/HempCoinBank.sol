pragma solidity ^0.5.0;
import './Reward.sol';
import './HempCoin.sol';

contract HempCoinBank {
    string public name = 'Bank of Hemp';
    address public owner;
    HempCoin public hempCoin;
    Reward public reward;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;  

    constructor(Reward _reward, HempCoin _hempCoin) public {
        reward = _reward;
        hempCoin = _hempCoin;
        owner = msg.sender;
    }

    function depositTokens(uint _amount) public {
        require(_amount > 0, 'Amount must be greater than zero');

        hempCoin.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, 'staking balance cannot be less than zero');
        hempCoin.transfer(msg.sender, balance);
 
        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }

    function issueTokens() public {
        require(msg.sender == owner, 'sender must be the owner');
        for(uint i= 0; i<stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] / 12;
            if(balance > 0){
                hempCoin.transfer(recipient, balance);
            }
        }
    }
}