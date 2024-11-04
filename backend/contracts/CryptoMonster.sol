// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';
import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import './TokenMonster.sol';

//麻了哦，这个居然要继承ERC1155Holder，调试半天
contract CryptoMonster is ERC1155Holder{
    TokenMonster private  token;
    IERC1155 private nfts;
    //149物种
    enum Species {         DRYAD,         HAMADRYAD,         LESHY,         SANTELMO,         CERBERUS,         EFREET,         FASTITOCALON,         ASPIDOCHELONE,         ZARATAN,         ARACHNE,         JOROGUMO,         TSUCHIGUMO,         PABILSAG,         GIRTABLILU,         SELKET,         TSIKAVATS,         MUNNIN,         HUGINN,         AZEBAN,         RATATOSKR,         STRATIM,         NAVKA,         APEP,         NIDHOGGR,         RAIJU,         RAIJIN,         AMPHIVENA,         BASILISK,         WOLPERTINGER,         RAMIDREJU,         ECHINEMON,         MUJINA,         KAMAITACHI,         LAVELLAN,         VILA,         HULDRA,         CHIMERA,         KYUUBI,         NIXIE,         TUATHAN,         MINYADES,         CAMAZOTZ,         CURUPIRA,         PENGHOU,         GHILLIE_DHU,         MYRMECOLEON,         MYRMIDON,         MOTHMAN,         MOTH_KING,         GROOTSLANG,         YAOGUAI,         CAIT_SIDHE,         CATH_BALUG,         NAKKI,         KAPPA,         SATORI,         SHOJO,         SKOHL,         HAET,         VODYANOY,         UNDINE,         MELUSINE,         VUKODLAK,         CHERNOBOG,         DJINN,         BAUK,         TROLL,         JOTUN,         SPRIGGAN,         JUBOKKO,         KODAMA,         BUKAVAK,         KRAKEN,         CLAYBOY,         MET,         EMET,         SLEIPNIR,         TODORATS,         SCYLLA,         CHARYBDIS,         BRONTES,         ARGES,         HRAESVELGR,         BERUNDA,         COCKATRICE,         SELKIE,         RUSALKA,         TARASQUE,         MERETSEGER,         CARBUNCLE,         SHEN,         BOOGEYMAN,         BANSHEE,         MARE,         DILONG,         INCUBUS,         SUCCUBUS,         CANCER,         KARKINOS,         DRUK,         SHENLONG,         GAN_CEANN,         ONI,         TAIRANOHONE,         GASHADOKURO,         YEREN,         YETI,         YOWIE,         NEZHIT,         CHUMA,         SIGBIN,         GARGOYLE,         CALADRIUS,         UMIBOZU,         CALLISTO,         KELPIE,         MAKARA,         MORGEN,         MERROW,         NAIAD,         NEREID,         PIXIU,         KHEPRI,         LIKHO,         KITSUNE,         CAORTHANNACH,         KAGGEN,         AUDUMBLA,         LOCHNESS,         JORMUNGANDR,         LEVIATHAN,         DOPPELGANGER,         SKVADER,         FOSSEGRIM,         VALKYRIE,         BASAN,         TSUKUMOGAMI,         LUSKA,         HYDRA,         AFANC,         CETUS,         VEDFOLNIR,         BAKU,         ALKONOST,         QUETZALCOATL,         ANZU,         ZMEY,         AZHDAYA,         FAFNIR,         BABA_YAGA,         BABA_ROGA     }
    //151
    //0(plant), 1(fire), 2(water), 3(bug), 4(normal), 5(poison), 6(thunder), 7(earth), 8(psychic), 9(ditto), 10(eevee)
    uint8[151] private monsterTypes = [         0,         0,         0,         1,         1,         1,         2,         2,         2,         3,         3,         3,         3,         3,         3,         4,         4,         4,         4,         4,         4,         4,         5,         5,         6,         6,         7,         7,         4,         4,         4,         4,         4,         4,         4,         4,         1,         1,         4,         4,         5,         5,         0,         0,         0,         3,         3,         3,         3,         7,         7,         4,         4,         2,         2,         4,         4,         1,         1,         2,         2,         2,         8,         8,         8,         4,         4,         4,         0,         0,         0,         2,         2,         7,         7,         7,         1,         1,         2,         2,         6,         6,         4,         4,         4,         2,         2,         5,         5,         2,         2,         8,         8,         8,         7,         8,         8,         2,         2,         6,         6,         8,         8,         7,         7,         4,         4,         4,         5,         5,         7,         7,         4,         0,         4,         2,         2,         2,         2,         2,         2,         4,         3,         8,         6,         1,         3,         4,         2,         2,         2,         9,         10,         2,         6,         1,         4,         2,         2,         2,         2,         4,         4,         2,         6,         1,         8,         8,         8,         8,         8     ];
    //是否可进化
    bool[151] private evolves = [         true,         true,         false,         true,         true,         false,         true,         true,         false,         true,         true,         false,         true,         true,         false,         true,         true,         false,         true,         false,         true,         false,         true,         false,         true,         false,         true,         false,         true,         true,         false,         true,         true,         false,         true,         false,         true,         false,         true,         false,         true,         false,         true,         true,         false,         true,         false,         true,         false,         true,         false,         true,         false,         true,         false,         true,         false,         true,         false,         true,         true,         false,         true,         true,         false,         true,         true,         false,         true,         true,         false,         true,         false,         true,         true,         false,         true,         false,         true,         false,         true,         false,         false,         true,         false,         true,         false,         true,         false,         true,         false,         true,         true,         false,         false,         true,         false,         true,         false,         true,         false,         true,         false,         true,         false,         true,         false,         false,         true,         false,         true,         false,         false,         false,         false,         true,         false,         true,         false,         true,         false,         false,         false,         false,         false,         false,         false,         false,         true,         false,         false,         false,         false,         false,         false,         false,         false,         true,         false,         true,         false,         false,         false,         false,         false,         false,         true,         true,         false,         true,         false     ];

    event CreateMonster(uint monstId);
    event FightResult(address indexed addr,uint256 _winerId);
    event Rewards( uint256 _rewards, address addr);
    event BuyItem(address addr, uint256 _itemNumber, uint256 _uints );
    event BurnItem(address addr, uint256 _itemNumber, uint256 _uints );

    struct Monster{
        uint256 id;
        address payable owner;
        Species species;
        uint256 price;
        bool sale;
        uint8 monsterType;//怪物类型
        bool evolve;//怪物是否能进化
        uint256 hp;
        uint256 atk;
        uint256 def;
        uint256 speed;
        address sharedTo;
    }

    address public manager;
    mapping(uint256=>Monster) public mons;
    uint256 public totalMonster = 0;
    uint256 public MAX = 2**256-1;
    uint256 private nonce = 0;
    uint256 public EQUITMENTSPRICE = 500000; //
    uint256 public POTIONSPRICE = 10000; //
    uint256 public REWARDAMOUNT = 10000; 
    uint256 public EVOAMOUNT = 100000; //

    constructor(TokenMonster _erc20, IERC1155 _ierc1155){
        token = _erc20;
        nfts = _ierc1155;
        manager = msg.sender;

        createMonster(0, 0, false);
        createMonster(1, 0, false);
        createMonster(2, 0, false);
        createMonster(3, 0, false);
    }
    modifier  isOwner(){
        require(msg.sender == manager , "not owner!");
        _;
    }

    function setItemPrices(uint256 _potionsPrice, uint256 _equipmentsPrice) public isOwner {
        POTIONSPRICE = _potionsPrice;
        EQUITMENTSPRICE = _equipmentsPrice;
    }

    function createMonster(uint8 _spIndex, uint256 _price, bool _sale) public isOwner {
        require(totalMonster<MAX, "totalMonster biger then max");
        Species _spec = Species(_spIndex);
        Monster memory mon;
        mon.id = totalMonster;
        mon.owner = payable (msg.sender);
        mon.species = _spec;
        mon.monsterType = monsterTypes[uint8(_spIndex)];
        mon.evolve = evolves[uint8(_spIndex)];
        mon.price = _price;
        mon.sale = _sale;
        mon.sharedTo = msg.sender;

        mon.hp =  100+randomGen(41);
        mon.atk =  100+randomGen(41);
        mon.def =  100+randomGen(41);
        mon.speed =  100+randomGen(41);
        
        mons[totalMonster] = mon;

        totalMonster++;

        emit CreateMonster(mon.id);
    }
    function buyMonster(uint256 _id) public  {
        Monster storage mon = mons[_id];
        uint256 tokenBal = token.balanceOf(msg.sender);

        require(tokenBal>mon.price,"no enougth token to buy monster");
        require(mon.sale == true, "no in sell");
        address seller = mon.owner;

        mon.owner = payable(msg.sender);
        mon.sharedTo = msg.sender;
        mon.sale = false;

        token.transferFrom(msg.sender, seller, mon.price);
        //payable(seller).transfer(msg.value);
    }
    function addSale(uint256 _id, uint256 _price) public {
        Monster storage mon = mons[_id];
        require(mon.sale==false,"is sale");
        require(mon.owner==msg.sender,"no monster owner");
        mon.sale = true;
        mon.price = _price;
        mon.sharedTo = msg.sender;//停止分享
    }
    function removeSale(uint256 _id) public {
        Monster storage mon = mons[_id];
        require(mon.sale==true,"not sale");
        require(mon.owner==msg.sender,"no monster owner");
        mon.sale = false;
    }
    function breedMonster(uint256 _id1 ,uint256 _id2) public {
        require(totalMonster<MAX,"monster biger the max");
        require(mons[_id1].owner == msg.sender, "not owner");
        require(mons[_id2].owner == msg.sender, "not owner");
        Species s = findEggSpecies(_id1, _id2);
        createMonster(uint8(s),0,false);
    }
    //根据父母的类型计算怪物类型
    function findEggSpecies(uint256 id1, uint256 id2) private returns (Species) {
        uint8[5] memory plant = [0, 42, 59, 68, 113];
        uint8[6] memory fire = [3, 36, 57, 76, 125, 145];
        uint8[16] memory water = [6, 53, 59, 71, 78, 85, 89, 97, 115, 117, 119, 128, 130, 137, 139, 143];
        uint8[6] memory bug = [9, 12, 45, 47, 122, 126];
        uint8[19] memory normal = [15, 18, 20, 28, 31, 34, 38, 51, 55, 65, 82, 83, 105, 107, 112, 127, 136, 141, 142];
        uint8[4] memory poison = [22, 40, 87, 108];
        uint8[5] memory thunder = [24, 80, 99, 124, 144];
        uint8[7] memory earth = [26, 49, 73, 94, 103, 110, 114];
        uint8[8] memory psychic = [62, 91, 95, 101, 121, 123, 146, 149];

        Species s;
        if (mons[id2].monsterType == 9) {
            s = mons[id1].species; 
        } else if (mons[id1].monsterType == 9) {
            s = mons[id2].species; 
        } else if (mons[id1].monsterType == 10) {
            if (mons[id2].monsterType == 1) {
                s = Species(135); 
            } else if (mons[id2].monsterType == 2) {
                s = Species(133); 
            } else if (mons[id2].monsterType == 6) {
                s = Species(134); 
            } else {
                s = Species(132); 
            }
        } else if (mons[id2].monsterType == 10) {
            if (mons[id1].monsterType == 1) {
                s = Species(135);
            } else if (mons[id1].monsterType == 2) {
                s = Species(133); 
            } else if (mons[id1].monsterType == 6) {
                s = Species(134);
            } else {
                s = Species(132); 
            }
        } else if (mons[id1].monsterType == mons[id2].monsterType) {
            if (mons[id1].species == mons[id2].species) {
                if (mons[id1].evolve) {
                    s = Species(uint256(mons[id1].species) + 1); 
                } else {
                    s = mons[id1].species; 
                }
            } else {
                if (mons[id1].monsterType == 0) s = Species(plant[randomGen(5)]);
                else if (mons[id1].monsterType == 1) s = Species(fire[randomGen(6)]);
                else if (mons[id1].monsterType == 2) s = Species(water[randomGen(16)]);
                else if (mons[id1].monsterType == 3) s = Species(bug[randomGen(6)]);
                else if (mons[id1].monsterType == 4) s = Species(normal[randomGen(19)]);
                else if (mons[id1].monsterType == 5) s = Species(poison[randomGen(4)]);
                else if (mons[id1].monsterType == 6) s = Species(thunder[randomGen(5)]);
                else if (mons[id1].monsterType == 7) s = Species(earth[randomGen(7)]);
                else if (mons[id1].monsterType == 8) s = Species(psychic[randomGen(8)]);
            }
        } else {
            s = Species(128); 
        }
        return s;
    }
    function fight(uint256 _id1, uint256 _id2) public {
        //可以添加条件，怪物必须大于20天才能战斗，一天只能战斗5次
        uint hp1 = mons[_id1].hp;
        uint hp2 = mons[_id2].hp;
        uint256 winnerId = 0;

        if(mons[_id1].speed>mons[_id2].speed) {
            if(hp2<damage(_id1, _id2)) {
                winnerId = _id1;
            }else if(hp1<damage(_id2, _id1)){
                winnerId = _id2;
            }else{
                winnerId = _id1;
            }
        }else{
            if(hp1<damage(_id2, _id1)) {
                winnerId = _id2;
            }else if(hp2<damage(_id1, _id2)) {
                winnerId = _id1;
            }else {
                winnerId = _id2;
            }
        }
        if(mons[winnerId].owner == msg.sender) {
            uint256 rewardMoney = REWARDAMOUNT/(randomGen(100)+1);
            reward(rewardMoney,msg.sender);
            emit Rewards(rewardMoney, msg.sender);
        }
        emit FightResult(msg.sender, winnerId);
    }
    function damage(uint256 id1, uint256 id2) private view returns (uint8) {
        return (mons[id1].atk > mons[id2].def) ? 10 : 5;
    }
    function reward(uint256 _amount, address _addr) private   {
        uint256 tokenBal = token.balanceOf(address(this));
        require(tokenBal>_amount,"no enougth money send to msg");
        // token.approve(address(this), _amount);
        token.transfer(_addr, _amount);
    }
    function envMater(uint256 _id) public {
        //可以添加一下升级条件：必须怪物生成时间大于10天才能升级
        Monster storage mon = mons[_id];
        uint newIndex = uint256(mon.species)+1;
        mon.species = Species(newIndex);
        //允许当前合约管理token
        // token.approve(msg.sender, EVOAMOUNT);
        token.transferFrom(msg.sender, address(this), EVOAMOUNT);
    }

    //共享怪物
    function startSharing(uint256 _id, address _addr) public {
        require(mons[_id].owner==msg.sender,"not owner. can't start sharing");
        Monster storage mon = mons[_id];
        mon.sharedTo = _addr;
    }
    function stopSharing(uint256 _id) public {
        //mons[id].owner == msg.sender || mons[id].sharedTo == msg.sender
        require(mons[_id].owner==msg.sender  || mons[_id].sharedTo == msg.sender,"not owner. can't stop sharing");
        Monster storage mon = mons[_id];
        mon.sharedTo = msg.sender;
    }

    //测试用，用户可以直接mintERC20代币
    function mintToken(uint256 _amount) public{
        TokenMonster(token).mint(msg.sender, _amount);
    }
    //装备数据
    function buyItem(uint256 _itemNumber, uint256 _uints) public {
        uint256 bal = token.balanceOf(msg.sender);
        uint256 payment = EQUITMENTSPRICE*_uints;

        // token.approve(msg.sender, payment);
        token.transferFrom(msg.sender, address(this), payment);

        nfts.safeTransferFrom(address(this), msg.sender,_itemNumber,_uints,"");

        emit BuyItem(msg.sender, _itemNumber, _uints);
    }
    
    function burnItem(uint256 _itemNumber, uint256 _uints) public{
        uint256 payment = _uints*EQUITMENTSPRICE;
        // 如果是对钱包用户的转账使用transferFrom, 这种需要钱包用户授权合约权限
        // token.transferFrom(address(this), msg.sender, payment);
        // token.transfer是合约内部自解转账，不需要授权
        token.transfer(msg.sender, payment);
        // 设置允许对所有的nft操作

        //nfts.setApprovalForAll(address(this),true);
        nfts.safeTransferFrom(msg.sender, address(this),_itemNumber,_uints,"");

        emit BurnItem(msg.sender, _itemNumber, _uints);
    }
    function deposit(uint256 _amount) public isOwner {
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= _amount, 'Check your token allowance');
        token.transferFrom(msg.sender, address(this), _amount);
    }
    function withdraw(uint256 _amount) public isOwner {
        uint256 balance = token.balanceOf(address(this));
        require(_amount <= balance, 'Not enough tokens in the reserve');
        token.transfer(msg.sender, _amount);
    }
    // function that generates pseudorandom numbers
    function randomGen(uint256 i) public returns (uint8) {
        uint8 x = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))) % i);
        nonce++;
        return x;
    }
}

//测试 sellMonster buyMonster 
//breedMonster需要owner权限，其他用户如何breed？
//测试 evo
//测试 fight
//测试 buyItem burnItem