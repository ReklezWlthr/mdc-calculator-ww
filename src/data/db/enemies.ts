import { IEnemyGroup } from '@src/domain/conditional'
import { Element } from '@src/domain/constant'
import _ from 'lodash'

// RES are array of Physical, Pyro, Cryo, Hydro, Electro, Anemo, Geo, Dendro respectively

const ElementIndex = _.map(Element)

const mapElement = (arr: Element[]) =>
  _.map(
    _.filter(Element, (item) => _.includes(arr, item)),
    (item) => ({ name: item, value: item })
  )

const saurian = [
  { name: 'Iktomisaurus (Cryo)', value: Element.CRYO },
  { name: 'Koholasaurus (Hydro)', value: Element.HYDRO },
  { name: 'Qucusaurus (Pyro)', value: Element.PYRO },
  { name: 'Tepetlisaurus (Geo)', value: Element.GEO },
  { name: 'Yumkasaurus (Dendro)', value: Element.DENDRO },
]

export const EnemyGroups: IEnemyGroup[] = [
  {
    name: 'Common Preset (Hilichurl, Abyss Mage, Maguu Kenki, etc.)',
    img: 'hil',
    options: [],
    res: () => [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    name: 'Slime, Specter, Hypostasis',
    img: 'aslm',
    options: mapElement(_.filter(Element, (item) => item != Element.PHYSICAL)),
    res: (e) => {
      console.log(
        _.findIndex(ElementIndex, (item) => item === e),
        e
      )
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      base[_.findIndex(ElementIndex, (item) => item === e)] = Infinity
      return base
    },
  },
  {
    name: 'Mitachurl, Ruin Cruiser, and Ruin Destroyer',
    img: 'mita',
    options: [],
    res: () => [0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    name: 'Ruin Hunter, Ruin Defender, Ruin Scout',
    img: 'rhu',
    options: [],
    res: () => [0.5, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    name: 'Ruin Guard, Ruin Grader',
    img: 'rgi',
    options: [],
    res: () => [0.7, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    name: 'Normal Human (Treasure Hoarder, Nobushi, etc.)',
    img: 'thsc1',
    options: [],
    res: () => [-0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    name: 'Samachurl',
    img: 'hsc',
    options: mapElement(_.filter(Element, (item) => !_.includes([Element.PHYSICAL, Element.PYRO], item))),
    res: (e) => {
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.4
      return base
    },
  },
  {
    name: 'Lawachurl',
    img: 'slc',
    options: [
      { name: 'Frostarm (Cryo)', value: Element.CRYO },
      { name: 'Stonehide (Geo)', value: Element.GEO },
      { name: 'Thunderhelm (Electro)', value: Element.ELECTRO },
    ],

    res: (e) => {
      let base = [0.5, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.6
      return base
    },
  },
  {
    name: 'Whopperflower',
    img: 'cwp',
    options: mapElement([Element.CRYO, Element.ELECTRO, Element.PYRO]),
    res: (e, stun) => {
      let base = [0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35]
      if (stun) base = _.map(base, (item) => (item -= 0.25))
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.4
      return base
    },
    stun: 'Stunned',
  },
  {
    name: 'Fatui Skirmisher',
    img: 'fsp',
    options: [],
    res: (_e, _s, shield) => {
      let base = [-0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 1))
      return base
    },
    shield: 'Armored',
  },
  {
    name: 'Fatui Pyro Agent',
    img: 'fpa',
    options: [],
    res: () => [-0.2, 0.5, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    name: 'Fatui Cicin Mage',
    img: 'fecm',
    options: mapElement([Element.CRYO, Element.ELECTRO]),
    res: (e) => {
      let base = [-0.2, 0.5, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.4
      return base
    },
  },
  {
    name: 'Geovishap Hatching',
    img: 'gvh',
    options: [],
    res: () => [0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.5, 0.1],
  },
  {
    name: 'Geovishap',
    img: 'gv',
    options: mapElement([Element.PYRO, Element.HYDRO, Element.CRYO, Element.ELECTRO]),
    res: (e, _s, shield) => {
      let base = [0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.5, 0.1]
      if (shield) base[_.findIndex(ElementIndex, (item) => item === e)] += 0.2
      return base
    },
    shield: 'Infused',
  },
  {
    name: 'Eye of the Storm',
    img: 'eos',
    options: [],
    res: () => [0.1, 0.1, 0.1, 0.1, 0.1, Infinity, 0.1, 0.1],
  },
  {
    name: 'Cicin',
    img: 'hcic',
    options: mapElement([Element.CRYO, Element.ELECTRO, Element.HYDRO]),
    res: (e) => {
      let base = [-0.5, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.4
      return base
    },
  },
  {
    name: 'Hydro Mimic',
    img: 'hm',
    options: [
      { name: 'Boar/Squirrel', value: Element.PYRO },
      { name: 'Crane/Raptor', value: Element.ELECTRO },
      { name: 'Crab/Mallard', value: Element.CRYO },
      { name: 'Finch/Frog', value: Element.GEO },
    ],

    res: (e) => {
      let base = [0.15, 0.15, 0.15, Infinity, 0.15, 0.15, 0.15, 0.15]
      base[_.findIndex(ElementIndex, (item) => item === e)] -= 0.55
      return base
    },
  },
  {
    name: 'Cryo Regisvine',
    img: 'cr',
    options: [],
    res: (_e, _s, shield) => {
      let base = [0.3, 0.1, 0.7, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 1))
      return base
    },
    shield: 'Shielded',
  },
  {
    name: 'Pyro Regisvine',
    img: 'pr',
    options: [],
    res: (_e, _s, shield) => {
      let base = [0.3, 0.7, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 1))
      return base
    },
    shield: 'Shielded',
  },
  {
    name: 'Electro Regisvine',
    img: 'er',
    options: [],
    res: (_e, _s, shield) => {
      let base = [0.3, 0.1, 0.1, 0.1, 0.7, 0.1, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 3))
      return base
    },
    shield: 'Shielded',
  },
  {
    name: 'Primo Geovishap',
    img: 'pg',
    options: mapElement([Element.PYRO, Element.HYDRO, Element.CRYO, Element.ELECTRO]),
    res: (e, stun, shield) => {
      let base = [0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.5, 0.1]
      if (shield) base[_.findIndex(ElementIndex, (item) => item === e)] += 0.2
      if (stun) base = _.map(base, (item) => (item -= 0.5))
      return base
    },
    shield: 'Infused',
    stun: 'Countered',
  },
  {
    name: 'Andrius',
    img: 'and',
    options: [],
    res: () => [0.1, 0.1, Infinity, 0.1, 0.1, Infinity, 0.1, 0.1],
  },
  {
    name: 'Childe (Phase 1)',
    img: 'chi1',
    options: [],
    res: (e, stun) => {
      let base = [0, 0, 0, 0.5, 0, 0, 0, 0]
      if (stun) base = _.map(base, (item) => (item -= 0.3))
      return base
    },
    stun: 'Stunned',
  },
  {
    name: 'Childe (Phase 2)',
    img: 'chi2',
    options: [],
    res: (e, stun) => {
      let base = [0, 0, 0, 0, 0.5, 0, 0, 0]
      if (stun) base = _.map(base, (item) => (item -= 0.5))
      return base
    },
    stun: 'Stunned',
  },
  {
    name: 'Childe (Phase 3)',
    img: 'chi3',
    options: [],
    res: () => [0, 0, 0, 0.7, 0.7, 0, 0, 0],
  },
  {
    name: 'Azhdaha',
    img: 'azh',
    options: [
      { name: 'Pyro/Electro', value: `${Element.PYRO}_${Element.ELECTRO}` },
      { name: 'Pyro/Cryo', value: `${Element.PYRO}_${Element.CRYO}` },
      { name: 'Hydro/Electro', value: `${Element.HYDRO}_${Element.ELECTRO}` },
      { name: 'Hydro/Cryo', value: `${Element.HYDRO}_${Element.CRYO}` },
    ],
    res: (e, stun, shield) => {
      const [first, second] = e.split('_')
      let base = [0.4, 0.1, 0.1, 0.1, 0.1, 0.1, 0.7, 0.1]
      if (stun) base[_.findIndex(ElementIndex, (item) => item === first)] += 0.6
      if (shield) base[_.findIndex(ElementIndex, (item) => item === second)] += 0.5
      return base
    },
    stun: 'First Infusion',
    shield: 'Second Infusion',
  },
  {
    name: 'Perpetual Mechanical Array',
    img: 'pma',
    options: [],
    res: (_e, stun) => {
      let base = [0.7, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (stun) base = _.map(base, (item) => (item -= 0.5))
      return base
    },
    stun: 'Stunned',
  },
  {
    name: 'Mirror Maiden',
    img: 'fmm',
    options: [],
    res: () => [-0.2, 0.1, 0.1, 0.5, 0.1, 0.1, 0.1, 0.1],
  },
  {
    name: 'Thunder Manifestation',
    img: 'tm',
    options: [],
    res: () => [0.1, 0.1, 0.1, 0.1, Infinity, 0.1, 0.1, 0.1],
  },
  {
    name: 'La Signora (Phase 1)',
    img: 'las2',
    options: [],
    res: () => [0.1, 0.1, 0.5, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    name: 'La Signora (Phase 2)',
    img: 'las2',
    options: [],
    res: () => [0.1, 0.7, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    name: 'Rifthound Whelp',
    img: 'rrhw',
    options: mapElement([Element.ELECTRO, Element.GEO]),
    res: (e, stun) => {
      let base = [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2]
      if (stun) base[_.findIndex(ElementIndex, (item) => item === e)] -= 0.3
      return base
    },
    stun: 'Elemental Devourer',
  },
  {
    name: 'Rifthound',
    img: 'rrh',
    options: mapElement([Element.ELECTRO, Element.GEO]),
    res: (e, stun) => {
      let base = [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25]
      if (stun) base[_.findIndex(ElementIndex, (item) => item === e)] -= 0.65
      return base
    },
    stun: 'Elemental Devourer',
  },
  {
    name: 'Golden Wolflord',
    img: 'gw',
    options: [],
    res: (_e, stun) => {
      let base = [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25]
      if (stun) base[_.findIndex(ElementIndex, (item) => item === Element.GEO)] -= 0.45
      return base
    },
    stun: 'Elemental Devourer',
  },
  {
    name: 'Bathysmal Vishap Hatchling',
    img: 'pbv',
    options: [
      { name: 'Primordial', value: Element.HYDRO },
      { name: 'Bolteater', value: Element.ELECTRO },
      { name: 'Rimebiter', value: Element.CRYO },
    ],

    res: (e) => {
      let base = [0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.1
      return base
    },
  },
  {
    name: 'Bathysmal Vishap',
    img: 'pbv',
    options: [
      { name: 'Primordial', value: Element.HYDRO },
      { name: 'Bolteater (Coral Defenders)', value: Element.ELECTRO },
      { name: 'Rimebiter (Coral Defenders)', value: Element.CRYO },
    ],

    res: (e) => {
      let base = [0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.2
      return base
    },
  },
  {
    name: 'Magatsu Mitake Narukami no Mikoto',
    img: 'mag',
    options: [],
    res: (_e, stun, shield) => {
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (stun) base = _.map(base, (item) => (item -= 0.6))
      if (shield) base = _.map(base, (item) => (item += 2))
      return base
    },
    stun: 'Stunned',
    shield: 'Baleful Shadowlord',
  },
  {
    name: 'Shadowy Husk',
    img: 'shsb',
    options: [
      { name: 'Defender (Cryo)', value: Element.CRYO },
      { name: 'Linebreaker (Hydro)', value: Element.HYDRO },
      { name: 'Standard Bearer (Pyro)', value: Element.PYRO },
    ],

    res: (e) => {
      let base = [0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.2
      return base
    },
  },
  {
    name: 'Black Serpent Knight: Windcutter',
    img: 'bskw',
    options: [],
    res: () => [0.3, 0.1, 0.1, 0.1, 0.1, 0.5, 0.1, 0.1],
  },
  {
    name: 'Black Serpent Knight: Rockbreaker Ax',
    img: 'bskr',
    options: [],
    res: (_e, _stun, shield) => {
      let base = [0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.5, 0.1]
      if (shield) base = _.map(base, (item) => (item += 0.5))
      return base
    },
    shield: 'Rampage',
  },
  {
    name: 'Small Fungus',
    img: 'fdf',
    options: mapElement(_.filter(Element, (item) => item != Element.PHYSICAL)),
    res: (e) => {
      if (e === Element.DENDRO) return [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.25]
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.1
      return base
    },
  },
  {
    name: 'Large Fungus',
    img: 'wds',
    options: mapElement(_.filter(Element, (item) => !_.includes([Element.PHYSICAL, Element.ELECTRO], item))),
    res: (e) => {
      if (e === Element.DENDRO) return [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.4]
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.3]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.2
      return base
    },
  },
  {
    name: 'Ruin Serpent',
    img: 'rs',
    options: [],
    res: (_e, _s, shield) => {
      let base = [0.7, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 3))
      return base
    },
    shield: 'Charging',
  },
  {
    name: 'Mid-Tier Eremites',
    img: 'emsf',
    options: [
      { name: 'Daythunder (Electro)', value: Element.ELECTRO },
      { name: 'Sunfrost (Electro)', value: Element.CRYO },
      { name: 'Desert Clearwater (Electro)', value: Element.HYDRO },
    ],
    res: (e, stun) => {
      let base = [-0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (stun) base[_.findIndex(ElementIndex, (item) => item === e)] -= 0.6
      return base
    },
    stun: 'Stunned',
  },
  {
    name: 'High-Tier Eremites',
    img: 'emse',
    options: [
      { name: 'Stone Enchanter (Geo)', value: Element.GEO },
      { name: 'Galehunter (Anemo)', value: Element.ANEMO },
      { name: 'Floral-Ring Dancer (Dendro)', value: Element.DENDRO },
      { name: 'Scorching Loremaster (Pyro)', value: Element.PYRO },
    ],
    res: (e, stun, shield) => {
      let base = [-0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 0.5))
      if (stun) base[_.findIndex(ElementIndex, (item) => item === e)] -= 0.6
      return base
    },
    shield: 'Enhanced',
    stun: 'Stunned',
  },
  {
    name: 'Ruin Drake',
    img: 'rd',
    options: mapElement(_.filter(Element, (item) => item !== Element.PHYSICAL)),
    res: (e, _s, shield) => {
      let base = [0.5, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (shield) base[_.findIndex(ElementIndex, (item) => item === e)] += 0.4
      return base
    },
    shield: 'Absorbed',
  },
  {
    name: 'Aeonblight Drake',
    img: 'abd',
    options: mapElement(_.filter(Element, (item) => item !== Element.PHYSICAL)),
    res: (e, _s, shield) => {
      let base = [0.7, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (shield) base[_.findIndex(ElementIndex, (item) => item === e)] += 0.6
      return base
    },
    shield: 'Absorbed',
  },
  {
    name: 'Jadeplume Terrorshroom',
    img: 'jpt',
    options: [],
    res: (e, stun) => {
      let base = [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.8]
      if (stun) base = _.map(base, (item) => (item -= 0.25))
      return base
    },
    stun: 'Stunned',
  },
  {
    name: 'Primal Construct',
    img: 'pc',
    options: [],
    res: (_e, _s, shield) => {
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 0.5))
      return base
    },
    shield: 'Invisible',
  },
  {
    name: 'ASIMON',
    img: 'spcm',
    options: [],
    res: (_e, _s, shield) => {
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 2))
      return base
    },
    shield: 'Invisible',
  },
  {
    name: 'Everlasting Lord of Arcane Wisdom (Phase 1)',
    img: 'nad',
    options: [],
    res: () => [0.1, 0.1, 0.1, 0.1, 0.5, 0.1, 0.1, 0.1],
  },
  {
    name: 'Everlasting Lord of Arcane Wisdom (Phase 2)',
    img: 'nad',
    options: [],
    res: (_e, stun, shield) => {
      let base = [0.3, 0.3, 0.3, 0.3, 0.9, 0.3, 0.3, 0.3]
      if (shield) base = _.map(base, (item) => (item += 2))
      if (stun) base = _.map(base, (item) => (item -= 1.7))
      return base
    },
    shield: 'Shielded',
    stun: 'Stunned',
  },
  {
    name: 'Consecrated Beast',
    img: 'cshc',
    options: [
      { name: 'Fanged Beast (Dendro)', value: Element.DENDRO },
      { name: 'Flying Serpent (Anemo)', value: Element.ANEMO },
      { name: 'Horned Crocodile (Hydro)', value: Element.HYDRO },
      { name: 'Red Vulture (Pyro)', value: Element.PYRO },
      { name: 'Scorpion (Electro)', value: Element.ELECTRO },
    ],
    res: (e, stun) => {
      let base = [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4]
      if (!stun) base[_.findIndex(ElementIndex, (item) => item === e)] += 0.3
      if (stun) base = _.map(base, (item) => (item -= 0.3))

      return base
    },
    stun: 'Stunned',
  },
  {
    name: 'Setekh Wenut',
    img: 'sw',
    options: mapElement([Element.PYRO, Element.HYDRO, Element.CRYO, Element.ELECTRO]),
    res: (e, stun) => {
      let base = [0.25, 0.25, 0.25, 0.25, 0.25, 0.6, 0.25, 0.25]
      if (stun) base[_.findIndex(ElementIndex, (item) => item === e)] -= 0.45

      return base
    },
    stun: 'Stunned',
  },
  {
    name: 'Hilichurl Rogue',
    img: 'ahilr',
    options: mapElement([Element.ANEMO, Element.HYDRO]),
    res: (e) => {
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.4
      return base
    },
  },
  {
    name: `Guardian of Apep's Oasis`,
    img: 'ap',
    options: [],
    res: () => [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.7],
  },
  {
    name: 'Fontemer Abberant',
    img: 'UI_MonsterIcon_HermitCrab_Mature',
    options: [],
    res: (e, _s, shield) => {
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 0.6))
      return base
    },
    shield: 'Shielded',
  },
  {
    name: `Tainted Hydro Phantasm`,
    img: 'UI_MonsterIcon_Necalevia_Normal',
    options: [],
    res: () => [0.1, 0.1, 0.1, Infinity, 0.1, 0.1, 0.1, 0.1],
  },
  {
    name: 'Small Breacher Primus',
    img: 'UI_MonsterIcon_Ovacua_Order_02',
    options: [
      { name: 'Overgrown (Dendro)', value: Element.DENDRO },
      { name: 'Shatterstone (Geo)', value: Element.GEO },
    ],
    res: (e) => {
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.2
      return base
    },
  },
  {
    name: 'Large Breacher Primus',
    img: 'UI_MonsterIcon_Ovacua_Order_01',
    options: [
      { name: 'Overgrown (Dendro)', value: Element.DENDRO },
      { name: 'Shatterstone (Geo)', value: Element.GEO },
    ],
    res: (e) => {
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.4
      return base
    },
  },
  {
    name: 'Emperor of Fire and Iron',
    img: 'UI_MonsterIcon_HermitCrab_Primo',
    options: mapElement([Element.PYRO, Element.HYDRO, Element.CRYO, Element.ELECTRO]),
    res: (e, _s, shield) => {
      let base = [0.1, 0.6, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 0.6))
      return base
    },
    shield: 'Shielded',
  },
  {
    name: 'Icewind Suite',
    img: 'UI_MonsterIcon_MachinaIustitia_Nutcracker',
    options: mapElement([Element.PYRO, Element.HYDRO, Element.CRYO, Element.ELECTRO]),
    res: (_e, _s, shield) => {
      let base = [0.1, 0.1, 0.7, 0.1, 0.1, 0.7, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 0.25))
      return base
    },
    shield: `Coppelia's Climax`,
  },
  {
    name: 'Fatui Operative',
    img: 'UI_MonsterIcon_Fatuus_Escadron_Ice',
    options: [
      { name: 'Frost Operative', value: Element.CRYO },
      { name: 'Wind Operative', value: Element.ANEMO },
    ],
    res: (e) => {
      let base = [-0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.4
      return base
    },
  },
  {
    name: 'Millennial Pearl Seahorse',
    img: 'UI_MonsterIcon_SeaHorse_Primo_Electric',
    options: mapElement([Element.PYRO, Element.HYDRO, Element.CRYO, Element.ELECTRO]),
    res: (_e, _s, shield) => {
      let base = [0.1, 0.1, 0.1, 0.1, 0.6, 0.1, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 0.6))
      return base
    },
    shield: `Shielded`,
  },
  {
    name: `Experimental Field Generator`,
    img: 'UI_MonsterIcon_MachinaIustitia_Gravitas',
    options: [],
    res: () => [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.7, 0.1],
  },
  {
    name: `Cinease (Local Legend)`,
    img: 'pbv',
    options: [],
    res: (_e, _s, shield) => {
      let base = [0.3, 0.1, 0.1, 0.7, 0.1, 0.1, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 0.8))
      return base
    },
    shield: `Shielded`,
  },
  {
    name: `Hydro Tulpa`,
    img: 'UI_MonsterIcon_Narcissusborn_Normal_01',
    options: [],
    res: (_e, _s, shield) => {
      let base = [0.1, 0.1, 0.1, Infinity, 0.1, 0.1, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 0.45))
      return base
    },
    shield: `Rage`,
  },
  {
    name: `All-Devouring Narwhal`,
    img: 'UI_MonsterIcon_Ptahur_Devourer',
    options: [],
    res: () => [0.1, 0.1, 0.1, 0.7, 0.1, 0.1, 0.1, 0.1],
  },
  {
    name: `All-Devouring Narwhal (Phantom)`,
    img: 'UI_MonsterIcon_Ptahur_Devourer',
    options: [],
    res: () => [0.1, 0.1, 0.1, 0.1, 0.7, 0.1, 0.1, 0.1],
  },
  {
    name: `Xuanwen Beast`,
    img: 'UI_MonsterIcon_Striped',
    options: [],
    res: () => [0.1, 0.1, 0.1, 0.5, 0.1, 0.5, 0.1, 0.1],
  },
  {
    name: `Solitary Suanni`,
    img: 'UI_MonsterIcon_Hermit',
    options: [],
    res: (_e, _s, shield) => {
      let base = [0.1, 0.1, 0.1, 0.7, 0.1, 0.7, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 2))
      return base
    },
    shield: `Gathering Energy`,
  },
  {
    name: `Praetorian Golem`,
    img: 'moxiang2',
    options: [],
    res: (_e, _s, shield) => {
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 0.5))
      return base
    },
    shield: `Sheilded`,
  },
  {
    name: `The Knave`,
    img: 'laopu',
    options: [],
    res: () => [0.1, 0.7, 0.1, 0.5, 0.1, 0.1, 0.1, 0.1],
  },
  {
    name: `"Statue of Marble and Brass"`,
    img: 'moxiang1',
    options: [],
    res: (_e, stun, shield) => {
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (shield) base = _.map(base, (item) => (item += 0.6))
      if (stun) base = _.map(base, (item) => (item -= 0.8))
      return base
    },
    shield: `Shielded`,
    stun: `Paralyzed`,
  },
  {
    name: 'Saurian Whelp',
    img: 'UI_MonsterIcon_Natsaurus_Drillhead_Small',
    options: saurian,
    res: (e) => {
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.2
      return base
    },
  },
  {
    name: 'Saurian Adult',
    img: 'UI_MonsterIcon_Natsaurus_Drillhead_Normal',
    options: saurian,
    res: (e) => {
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.4
      return base
    },
  },
  {
    name: `Goldflame Qucusaur Tyrant`,
    img: 'UI_MonsterIcon_Natsaurus_Flamingo_Primo',
    options: [],
    res: () => [0.1, 0.7, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    name: `Gluttonous Yumkasaur Mountain King`,
    img: 'UI_MonsterIcon_Natsaurus_Hookwalker_Primo',
    options: [],
    res: () => [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.7],
  },
  {
    name: `Fluid Avatar of Lava`,
    img: 'UI_MonsterIcon_Lava_Liquid',
    options: [],
    res: () => [0.1, 0.7, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    name: `Secret Source Automaton: Hunter-Seeker`,
    img: 'UI_MonsterIcon_ToothTrap',
    options: [],
    res: (_e, stun) => {
      let base = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
      if (stun) base = _.map(base, (item) => (item -= 0.4))
      return base
    },
    stun: `Weakened/Laser`,
  },
  {
    name: 'Wayob Manifestation',
    img: 'UI_MonsterIcon_Wayob_Drillhead',
    options: [
      { name: 'Biting-Cold (Cryo)', value: Element.CRYO },
      { name: 'Burning-Aflame (Pyro)', value: Element.PYRO },
      { name: 'Flow-Inverted (Hydro)', value: Element.HYDRO },
      { name: 'Follar-Swift (Dendro)', value: Element.DENDRO },
      { name: 'Rock-Cavernous (Geo)', value: Element.GEO },
    ],

    res: (e) => {
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      base[_.findIndex(ElementIndex, (item) => item === e)] += 0.4
      return base
    },
  },
  {
    name: `Secret Source Automaton: Configuration Device`,
    img: 'UI_MonsterIcon_DragonClaw',
    options: [],
    res: (_e, stun) => {
      let base = [0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6]
      if (stun) base = _.map(base, (item) => (item -= 0.9))
      return base
    },
    stun: `Weakened`,
  },
  {
    name: `Tenebrous Papilla`,
    img: 'UI_MonsterIcon_TheAbyss_Dendrite',
    options: [],
    res: (_e, stun) => {
      let base = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      if (stun) base = _.map(base, (item) => (item -= 0.7))
      return base
    },
    stun: `Stunned`,
  },
]
