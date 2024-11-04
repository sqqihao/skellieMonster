// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenMonster is ERC20, ERC20Burnable, Ownable {
    // constructor() ERC20("TM", "TM", 10**10,10**18) Ownable(msg.sender){}
    // constructor()  Ownable(msg.sender){}

    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) Ownable(msg.sender){
        _mint(msg.sender, initialSupply * 10 ** decimals()); // 使用默认的小数位数
    }
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}