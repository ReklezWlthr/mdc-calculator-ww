import { IEnemyGroup } from '@src/domain/conditional'
import { Element } from '@src/domain/constant'
import _ from 'lodash'

// RES are array of Physical, Glacio, Fusion, Electro, Aero, Spectro, Havoc respectively

const ElementIndex = _.map(Element)

export const EnemyGroups: IEnemyGroup[] = [
  {
    id: '310000010',
    name: 'Vanguard Junrock',
    icon: 'T_IconMonsterGoods_011_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000251',
    name: 'Hooscamp',
    icon: 'T_IconMonsterGoods_988_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.4, 0.1, 0.1],
  },
  {
    id: '330000010',
    name: 'Tempest Mephis',
    icon: 'T_IconMonsterGoods_221_UI',
    res: [0.1, 0.1, 0.1, 0.4, 0.1, 0.1, 0.1],
  },
  {
    id: '320000111',
    name: 'Hoochief',
    icon: 'T_IconMonsterGoods_989_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.4, 0.1, 0.1],
  },
  {
    id: '310000260',
    name: 'Diamondclaw',
    icon: 'T_IconMonsterGoods_987_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '340000010',
    name: 'Crownless',
    icon: 'T_IconMonsterGoods_9991_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.4],
  },
  {
    id: '310000020',
    name: 'Fission Junrock',
    icon: 'T_IconMonsterGoods_021_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000030',
    name: 'Electro Predator',
    icon: 'T_IconMonsterGoods_031_UI',
    res: [0.1, 0.1, 0.1, 0.4, 0.1, 0.1, 0.1],
  },
  {
    id: '310000040',
    name: 'Glacio Predator',
    icon: 'T_IconMonsterGoods_101_UI',
    res: [0.1, 0.4, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000050',
    name: 'Aero Predator',
    icon: 'T_IconMonsterGoods_231_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.4, 0.1, 0.1],
  },
  {
    id: '310000060',
    name: 'Fusion Predator',
    icon: 'T_IconMonsterGoods_041_UI',
    res: [0.1, 0.1, 0.4, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000070',
    name: 'Havoc Warrior',
    icon: 'T_IconMonsterGoods_051_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.4],
  },
  {
    id: '310000080',
    name: 'Snip Snap',
    icon: 'T_IconMonsterGoods_061_UI',
    res: [0.1, 0.1, 0.4, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000090',
    name: 'Zig Zag',
    icon: 'T_IconMonsterGoods_071_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.4, 0.1],
  },
  {
    id: '310000100',
    name: 'Whiff Whaff',
    icon: 'T_IconMonsterGoods_081_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.4, 0.1, 0.1],
  },
  {
    id: '310000110',
    name: 'Tick Tack',
    icon: 'T_IconMonsterGoods_091_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.4],
  },
  {
    id: '310000120',
    name: 'Gulpuff',
    icon: 'T_IconMonsterGoods_111_UI',
    res: [0.1, 0.4, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000130',
    name: 'Chirpuff',
    icon: 'T_IconMonsterGoods_971_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.4, 0.1, 0.1],
  },
  {
    id: '310000140',
    name: 'Glacio Prism',
    icon: 'T_IconMonsterGoods_141_UI',
    res: [0.1, 1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000150',
    name: 'Fusion Prism',
    icon: 'T_IconMonsterGoods_151_UI',
    res: [0.1, 0.1, 1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000160',
    name: 'Spectro Prism',
    icon: 'T_IconMonsterGoods_161_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 1, 0.1],
  },
  {
    id: '310000170',
    name: 'Havoc Prism',
    icon: 'T_IconMonsterGoods_171_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 1],
  },
  {
    id: '310000180',
    name: 'Cruisewing',
    icon: 'T_IconMonsterGoods_251_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.4, 0.1],
  },
  {
    id: '310000190',
    name: 'Sabyr Boar',
    icon: 'T_IconMonsterGoods_261_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000200',
    name: 'Excarat',
    icon: 'T_IconMonsterGoods_271_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.4],
  },
  {
    id: '310000210',
    name: 'Baby Viridblaze Saurian',
    icon: 'T_IconMonsterGoods_281_UI',
    res: [0.1, 0.1, 0.4, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000220',
    name: 'Young Roseshroom',
    icon: 'T_IconMonsterGoods_301_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.4],
  },
  {
    id: '310000230',
    name: 'Exile',
    icon: 'T_IconMonsterHead_977_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000270',
    name: 'Hoartoise',
    icon: 'T_IconMonsterGoods_969_UI',
    res: [0.1, 0.4, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000280',
    name: 'Fusion Dreadmane',
    icon: 'T_IconMonsterGoods_980_UI',
    res: [0.1, 0.1, 0.4, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000290',
    name: 'Fractsidus Thruster',
    icon: 'T_IconMonsterHead_972_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000300',
    name: 'Hooscamp Clapperclaw',
    icon: 'T_IconMonsterHead_1005_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.4, 0.1, 0.1],
  },
  {
    id: '310000310',
    name: 'Fractsidus Cannoneer',
    icon: 'T_IconMonsterHead_974_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000320',
    name: 'Fractsidus Gunmaster',
    icon: 'T_IconMonsterHead_973_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000330',
    name: 'Traffic Illuminator',
    icon: 'T_IconMonsterHead_1000_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.4, 0.1],
  },
  {
    id: '310000340',
    name: 'Clang Bang',
    icon: 'T_IconMonsterHead_1001_UI',
    res: [0.1, 0.4, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000350',
    name: 'Lava Larva',
    icon: 'T_IconMonsterHead_326_UI',
    res: [0.1, 0.1, 0.4, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '310000360',
    name: 'Dwarf Cassowary',
    icon: 'T_IconMonsterHead_330_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '320000010',
    name: 'Stonewall Bracer',
    icon: 'T_IconMonsterGoods_181_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
  {
    id: '320000020',
    name: 'Violet-Feathered Heron',
    icon: 'T_IconMonsterGoods_121_UI',
    res: [0.1, 0.1, 0.1, 0.4, 0.1, 0.1, 0.1],
  },
  {
    id: '320000030',
    name: 'Cyan-Feathered Heron',
    icon: 'T_IconMonsterGoods_131_UI',
    res: [0.1, 0.1, 0.1, 0.1, 0.4, 0.1, 0.1],
  },
]
