// Load all the background images for the 10 different Cryptomon types
import bg0 from '../../sprites/background/0.png'
import bg1 from '../../sprites/background/1.png'
import bg2 from '../../sprites/background/2.png'
import bg3 from '../../sprites/background/3.png'
import bg4 from '../../sprites/background/4.png'
import bg5 from '../../sprites/background/5.png'
import bg6 from '../../sprites/background/6.png'
import bg7 from '../../sprites/background/7.png'
import bg8 from '../../sprites/background/8.png'
import bg9 from '../../sprites/background/9.png'
import bg10 from '../../sprites/background/10.png'

import MonImages from '../../sprites'
import StatBar from './StartBar'
import Spinner from './Spinner'
// import  formatUnits from '@ethersproject/units';
import React from 'react'
// import { Lokimon } from '../../../models'
import './common/common.css'
// import { BigNumber,formatUnits } from 'ethers'
import { ethers,
formatUnits } from 'ethers'
// console.log(ethers.BigNumber);
// Add all 151 Cryptomon names in an array
export const names = [
  'Dryad',
  'Hamadryad',
  'Leshy',
  'Santelmo',
  'Cerberus',
  'Efreet',
  'Fastitocalon',
  'Aspidochelone',
  'Zaratan',
  'Arachne',
  'Jorogumo',
  'Tsuchigumo',
  'Pabilsag',
  'Girtablilu',
  'Selket',
  'Tsikavats',
  'Munnin',
  'Huginn',
  'Azeban',
  'Ratatoskr',
  'Stratim',
  'Navka',
  'Apep',
  'Nidhoggr',
  'Raiju',
  'Raijin',
  'Amphivena',
  'Basilisk',
  'Wolpertinger',
  'Ramidreju',
  'Echinemon',
  'Mujina',
  'Kamaitachi',
  'Lavellan',
  'Vila',
  'Huldra',
  'Chimera',
  'Kyuubi',
  'Nixie',
  'Tuathan',
  'Minyades',
  'Camazotz',
  'Curupira',
  'Penghou',
  'Ghillie_Dhu',
  'Myrmecoleon',
  'Myrmidon',
  'Mothman',
  'Moth_King',
  'Grootslang',
  'Yaoguai',
  'Cait_Sidhe',
  'Cath_Balug',
  'Nakki',
  'Kappa',
  'Satori',
  'Shojo',
  'Skohl',
  'Haet',
  'Vodyanoy',
  'Undine',
  'Melusine',
  'Vukodlak',
  'Chernobog',
  'Djinn',
  'Bauk',
  'Troll',
  'Jotun',
  'Spriggan',
  'Jubokko',
  'Kodama',
  'Bukavak',
  'Kraken',
  'Clayboy',
  'Met',
  'Emet',
  'Sleipnir',
  'Todorats',
  'Scylla',
  'Charybdis',
  'Brontes',
  'Arges',
  'Hraesvelgr',
  'Berunda',
  'Cockatrice',
  'Selkie',
  'Rusalka',
  'Tarasque',
  'Meretseger',
  'Carbuncle',
  'Shen',
  'Boogeyman',
  'Banshee',
  'Mare',
  'Dilong',
  'Incubus',
  'Succubus',
  'Cancer',
  'Karkinos',
  'Druk',
  'Shenlong',
  'Gan_Ceann',
  'Oni',
  'Tairanohone',
  'Gashadokuro',
  'Yeren',
  'Yeti',
  'Yowie',
  'Nezhit',
  'Chuma',
  'Sigbin',
  'Gargoyle',
  'Caladrius',
  'Umibozu',
  'Callisto',
  'Kelpie',
  'Makara',
  'Morgen',
  'Merrow',
  'Naiad',
  'Nereid',
  'Pixiu',
  'Khepri',
  'Likho',
  'kitsune',
  'Caorthannach',
  'Kaggen',
  'Audumbla',
  'Lochness',
  'Jormungandr',
  'Leviathan',
  'Doppelganger',
  'Skvader',
  'Fossegrim',
  'Valkyrie',
  'Basan',
  'Tsukumogami',
  'Luska',
  'Hydra',
  'Afanc',
  'Cetus',
  'Vedfolnir',
  'Baku',
  'Alkonost',
  'Quetzalcoatl',
  'Anzu',
  'Zmey',
  'Azhdaya',
  'Fafnir',
  'Baba_Yaga',
  'Baba_Roga',
]

// Add background images in an array for easy access
const bg = [bg0, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10]

export const monName = (specie) => names[specie]

export const nameDiv = (mon) => {
  return (
    <div>
      <label className="monName">{names[mon.species]}</label>
      <label className="" style={{ float: 'right' }}>
        {'#' + mon.id}
      </label>
    </div>
  )
}

//
export const bgStyle = (Type) => ({
  backgroundImage: 'url(' + bg[Type] + ')',
  backgroundSize: '210px 240px',
})

export const imgDiv = (mon) => {
  return (
    <div className="monBox monBox-320-scrn" style={bgStyle(mon.monType)}>
      <img
        className="monImg"
        src={MonImages[`${parseInt(mon.species.toString()) + 1}`]}
        alt={mon.species.toString()}
        height="32"
        width="32"
      />
    </div>
  )
}

//
export const statDiv = (mon) => {
  return (
    <div className="stat-area">
      <div className="stat-line">
        <label className="stat-label">Hp: </label>
        <StatBar percentage={(mon.hp * 100) / 160} />
      </div>
      <div className="stat-line">
        <label className="stat-label">Attack: </label>
        <StatBar percentage={(mon.atk * 100) / 160} />
      </div>
      <div className="stat-line">
        <label className="stat-label">Defense: </label>
        <StatBar percentage={(mon.def * 100) / 160} />
      </div>
      <div className="stat-line">
        <label className="stat-label">Speed: </label>
        <StatBar percentage={(mon.speed * 100) / 160} />
      </div>
    </div>
  )
}

// Create the div with add for sale button
export const addForSaleDiv = (mon, price, handleChangePrice, isAddForSaleLoading, addForSale) => {
  return (
    <div></div>
  )
}

// Create the div with remove from sale button
export const removeFromSaleDiv = (mon, isRemoveFromSaleLoading, removeFromSale) => {
  return (
    <div></div>
  )
}

// Create the div with buy button
export const buyDiv = (mon, isBuyMonLoading, buyMon) => {
  return (
    <div></div>
  )
}

// Create the div with breed choice 1, choice 2 buttons
export const breedDiv = (mon, setBreedChoice1Func, setBreedChoice2Func) => {
  return (
    <div className="breed-choice-div">
      <button
        className="br-Choice-btn rpgui-button"
        type="button"
        style={{ float: 'right' }}
        onClick={() => {
          setBreedChoice1Func(mon.id)
        }}
      >
        Choice 1
      </button>
      <button
        className="br-Choice-btn rpgui-button"
        type="button"
        style={{ float: 'right' }}
        onClick={() => {
          setBreedChoice2Func(mon.id)
        }}
      >
        Choice 2
      </button>
    </div>
  )
}
//
export const breedOption = (breedchoice,  lokimons ,onClick) => {
  if (breedchoice === null) {
    return (
      <div className="mon mon-320-scrn" onClick={onClick}>
        <figure className="my-figure my-figure-320-scrn">
          <figcaption>
            <div className="monBox monBox-320-scrn">
              {' '}
              <img className="monImg" src={MonImages['0']} alt={'empty'} />
            </div>
          </figcaption>
        </figure>
      </div>
    )
  } else {
    return lokimons
      .filter((mon) => mon.id === breedchoice)
      .map((mon) => (
        <React.Fragment key={mon.id}>
          <div className="mon mon-320-scrn" onClick={onClick}>
            <figure className="my-figure my-figure-320-scrn">
              {imgDiv(mon)}
              <figcaption></figcaption>
            </figure>
          </div>
        </React.Fragment>
      ))
  }
}

export const fightOption = (fightchoice, lokimons,onClick ) => {
  if (fightchoice === null) {
    return (
      <div className="mon mon-320-scrn"  onClick={onClick}>
        <figure className="my-figure my-figure-320-scrn">
          <figcaption>
            <div className="monBox monBox-320-scrn">
              {' '}
              <img className="monImg" src={MonImages['0']} alt={'empty'} />
            </div>
          </figcaption>
        </figure>
      </div>
    )
  } else {
    return lokimons
      .filter((mon) => mon.id === fightchoice)
      .map((mon) => (
        <React.Fragment key={mon.id}>
          <div className="mon mon-320-scrn" onClick={onClick}>
            <figure className="my-figure my-figure-320-scrn">
              {imgDiv(mon)}
              <figcaption></figcaption>
            </figure>
          </div>
        </React.Fragment>
      ))
  }
}


export const  getMonsOrder = (_orderBy, _mons) => {
  if (!_orderBy) return

  const newMons = _mons

  switch (_orderBy) {
    case 'nameZA':
      _mons.sort((a, b) => {
        const speciesA1 = monName(a.species).toLowerCase()
        const speciesB1 = monName(b.species).toLowerCase()
        if (speciesA1 == speciesB1) return 0
        return speciesA1[0] <speciesB1[0] ?  -1 : 1
      })
      break
    case 'nameAZ':
      _mons.sort((a, b) => {
        const speciesA2 = monName(a.species).toLowerCase()
        const speciesB2 = monName(b.species).toLowerCase()
        if (speciesA2 == speciesB2) return 0
        return speciesB2[0] < speciesA2[0] ? -1 : 1
      })
      break
    case 'idDesc':
      _mons.sort((a, b) => b.id - a.id)
      break
    case 'idAsc':
      _mons.sort((a, b) => a.id - b.id)
      break
    case 'priceDesc':
      _mons.sort((a, b) => parseFloat(formatUnits(b.price, 18)) - parseFloat(formatUnits(a.price, 18)))
      break
    case 'priceAsc':
      _mons.sort((a, b) => parseFloat(formatUnits(a.price, 18)) - parseFloat(formatUnits(b.price, 18)))
      break
    default:
      _mons.sort((a, b) => {
        const speciesA3 = monName(a.species).toLowerCase()
        const speciesB3 = monName(b.species).toLowerCase()
        if (speciesA3 == speciesB3) return 0
        return speciesA3 < speciesB3 ? -1 : 1
      })
      break
  }

  return newMons
}