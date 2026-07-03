// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract NFTMonster is ERC1155,Ownable{
    uint256 public constant HEALING_POTION = 0;
    uint256 public constant MANA_POTION = 1;
    uint256 public constant MAGIC_POTION = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;
    uint256 public constant LOKIS_HAMMER = 5;
    constructor() ERC1155("") Ownable(msg.sender){
        // [S10 修复] 部署时把 NFT mint 给合约自己（不是 deployer），
        // 这样 transferToken / buyItem 才能从合约 transferFrom 出去。
        _mint(address(this), HEALING_POTION, 10**27, "");
        _mint(address(this), MANA_POTION, 10**27, "");
        _mint(address(this), MAGIC_POTION, 10**27, "");
        _mint(address(this), SWORD, 10**27, "");
        _mint(address(this), SHIELD, 10**27, "");
        _mint(address(this), LOKIS_HAMMER, 10**27, "");
    }
    function transferToken(address to, uint256 id, uint256 amount) public onlyOwner {
        // [S10 修复] from 应该是合约自己（持有 NFT 的地方）而不是 msg.sender
        safeTransferFrom(address(this), to, id, amount, "");
    }
}