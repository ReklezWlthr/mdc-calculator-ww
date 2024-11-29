import { Element, Stats, Tags, WeaponType } from '@src/domain/constant'

export const Characters = [
  {
    id: '1102',
    name: 'Sanhua',
    stat: {
      baseAtk: 22,
      baseHp: 805,
      baseDef: 77,
    },
    rarity: 4,
    weapon: WeaponType.SWORD,
    element: Element.GLACIO,
    codeName: 'shanhua',
    order: '7',
    tags: [Tags.CONCERTO, Tags.BA_AMP],
    growth: [Stats.P_ATK, Stats.GLACIO_DMG],
    beta: false,
  },
  {
    id: '1103',
    name: 'Baizhi',
    stat: {
      baseAtk: 17,
      baseHp: 1025,
      baseDef: 82,
    },
    rarity: 4,
    weapon: WeaponType.RECTIFIER,
    element: Element.GLACIO,
    codeName: 'bailian',
    order: '6',
    tags: [Tags.SUPPORT, Tags.COORD, Tags.AMP],
    growth: [Stats.P_HP, Stats.HEAL],
    beta: false,
  },
  {
    id: '1104',
    name: 'Lingyang',
    stat: {
      baseAtk: 35,
      baseHp: 831,
      baseDef: 99,
    },
    rarity: 5,
    weapon: WeaponType.GAUNTLET,
    element: Element.GLACIO,
    codeName: 'lingyang',
    order: '14',
    tags: [Tags.MAIN_DPS],
    growth: [Stats.P_ATK, Stats.GLACIO_DMG],
    beta: false,
  },
  {
    id: '1105',
    name: 'Zhezhi',
    stat: {
      baseAtk: 30,
      baseHp: 980,
      baseDef: 98,
    },
    rarity: 5,
    weapon: WeaponType.RECTIFIER,
    element: Element.GLACIO,
    codeName: 'zhezhi',
    order: '27',
    tags: [Tags.CONCERTO, Tags.BA, Tags.COORD, Tags.REGEN, Tags.GLACIO_AMP, Tags.LIB_AMP],
    growth: [Stats.P_ATK, Stats.CRIT_RATE],
    beta: false,
  },
  {
    id: '1106',
    name: 'Youhu',
    stat: {
      baseAtk: 21,
      baseHp: 798,
      baseDef: 86,
    },
    rarity: 4,
    weapon: WeaponType.GAUNTLET,
    element: Element.GLACIO,
    codeName: 'youhu',
    order: '31',
    tags: [Tags.SUPPORT, Tags.SKILL, Tags.VIBRATION, Tags.COORD_AMP],
    avatarAdjust: 'object-[0_80%]',
    growth: [Stats.P_ATK, Stats.CRIT_RATE],
    beta: false,
  },
  {
    id: '1107',
    name: 'Carlotta',
    stat: {
      baseAtk: 37,
      baseHp: 996,
      baseDef: 98,
    },
    rarity: 5,
    weapon: WeaponType.PISTOLS,
    element: Element.GLACIO,
    codeName: 'kelaita',
    order: '32',
    tags: [Tags.MAIN_DPS, Tags.SKILL],
    avatarAdjust: 'object-[0_80%]',
    growth: [],
    beta: true,
  },
  {
    id: '1202',
    name: 'Chixia',
    stat: {
      baseAtk: 24,
      baseHp: 727,
      baseDef: 78,
    },
    rarity: 4,
    weapon: WeaponType.PISTOLS,
    element: Element.FUSION,
    codeName: 'maxiaofang',
    order: '2',
    tags: [Tags.MAIN_DPS],
    growth: [Stats.P_ATK, Stats.FUSION_DMG],
    beta: false,
  },
  {
    id: '1203',
    name: 'Encore',
    stat: {
      baseAtk: 34,
      baseHp: 841,
      baseDef: 102,
    },
    rarity: 5,
    weapon: WeaponType.RECTIFIER,
    element: Element.FUSION,
    codeName: 'anke',
    order: '8',
    tags: [Tags.MAIN_DPS, Tags.BA],
    avatarAdjust: 'object-[0_80%]',
    growth: [Stats.P_ATK, Stats.FUSION_DMG],
    beta: false,
  },
  {
    id: '1204',
    name: 'Mortefi',
    stat: {
      baseAtk: 20,
      baseHp: 802,
      baseDef: 93,
    },
    rarity: 4,
    weapon: WeaponType.PISTOLS,
    element: Element.FUSION,
    codeName: 'baer',
    order: '13',
    tags: [Tags.CONCERTO, Tags.LIB, Tags.COORD, Tags.HA_AMP],
    avatarAdjust: 'object-[0_45%]',
    growth: [Stats.P_ATK, Stats.FUSION_DMG],
    beta: false,
  },
  {
    id: '1205',
    name: 'Changli',
    stat: {
      baseAtk: 37,
      baseHp: 831,
      baseDef: 90,
    },
    rarity: 5,
    weapon: WeaponType.SWORD,
    element: Element.FUSION,
    codeName: 'changli',
    order: '26',
    tags: [Tags.MAIN_DPS, Tags.SKILL, Tags.FUSION_AMP, Tags.LIB_AMP],
    growth: [Stats.P_ATK, Stats.CRIT_RATE],
    beta: false,
  },
  {
    id: '1301',
    name: 'Calcharo',
    stat: {
      baseAtk: 35,
      baseHp: 840,
      baseDef: 97,
    },
    rarity: 5,
    weapon: WeaponType.BROADBLADE,
    element: Element.ELECTRO,
    codeName: 'kakaluo',
    order: '18',
    tags: [Tags.MAIN_DPS, Tags.LIB],
    avatarAdjust: 'object-[0_45%]',
    growth: [Stats.P_ATK, Stats.CRIT_DMG],
    beta: false,
  },
  {
    id: '1302',
    name: 'Yinlin',
    stat: {
      baseAtk: 32,
      baseHp: 880,
      baseDef: 105,
    },
    rarity: 5,
    weapon: WeaponType.RECTIFIER,
    element: Element.ELECTRO,
    codeName: 'yinlin',
    order: '17',
    tags: [Tags.CONCERTO, Tags.SKILL, Tags.COORD, Tags.ELECTRO_AMP, Tags.LIB_AMP],
    growth: [Stats.P_ATK, Stats.CRIT_RATE],
    beta: false,
  },
  {
    id: '1303',
    name: 'Yuanwu',
    stat: {
      baseAtk: 18,
      baseHp: 682,
      baseDef: 134,
    },
    rarity: 4,
    weapon: WeaponType.GAUNTLET,
    element: Element.ELECTRO,
    codeName: 'yuanwu',
    order: '15',
    tags: [Tags.CONCERTO, Tags.COORD, Tags.VIBRATION, Tags.INTERRUPT],
    avatarAdjust: 'object-[0_45%]',
    growth: [Stats.P_DEF, Stats.ELECTRO_DMG],
    beta: false,
  },
  {
    id: '1304',
    name: 'Jinhsi',
    stat: {
      baseAtk: 33,
      baseHp: 866,
      baseDef: 103,
    },
    rarity: 5,
    weapon: WeaponType.BROADBLADE,
    element: Element.SPECTRO,
    codeName: 'jinxi',
    order: '24',
    tags: [Tags.MAIN_DPS, Tags.SKILL],
    growth: [Stats.P_ATK, Stats.CRIT_RATE],
    beta: false,
  },
  {
    id: '1305',
    name: 'Xiangli Yao',
    stat: {
      baseAtk: 34,
      baseHp: 850,
      baseDef: 100,
    },
    rarity: 5,
    weapon: WeaponType.GAUNTLET,
    element: Element.ELECTRO,
    codeName: 'xiangliyao',
    order: '25',
    tags: [Tags.MAIN_DPS, Tags.LIB],
    avatarAdjust: 'object-[0_45%]',
    growth: [Stats.P_ATK, Stats.CRIT_DMG],
    beta: false,
  },
  {
    id: '1402',
    name: 'Yangyang',
    stat: {
      baseAtk: 20,
      baseHp: 816,
      baseDef: 90,
    },
    rarity: 4,
    weapon: WeaponType.SWORD,
    element: Element.AERO,
    codeName: 'yangyang',
    order: '1',
    tags: [Tags.CONCERTO, Tags.TRACTION, Tags.REGEN],
    growth: [Stats.P_ATK, Stats.AERO_DMG],
    beta: false,
  },
  {
    id: '1403',
    name: 'Aalto',
    stat: {
      baseAtk: 21,
      baseHp: 788,
      baseDef: 88,
    },
    rarity: 4,
    weapon: WeaponType.PISTOLS,
    element: Element.AERO,
    codeName: 'qiushui',
    order: '12',
    tags: [Tags.CONCERTO, Tags.AERO_AMP],
    avatarAdjust: 'object-[0_45%]',
    growth: [Stats.P_ATK, Stats.AERO_DMG],
    beta: false,
  },
  {
    id: '1404',
    name: 'Jiyan',
    stat: {
      baseAtk: 35,
      baseHp: 839,
      baseDef: 97,
    },
    rarity: 5,
    weapon: WeaponType.BROADBLADE,
    element: Element.AERO,
    codeName: 'jiyan',
    order: '11',
    tags: [Tags.MAIN_DPS, Tags.HA, Tags.TRACTION],
    avatarAdjust: 'object-[0_45%]',
    growth: [Stats.P_ATK, Stats.CRIT_RATE],
    beta: false,
  },
  {
    id: '1405',
    name: 'Jianxin',
    stat: {
      baseAtk: 27,
      baseHp: 1129,
      baseDef: 92,
    },
    rarity: 5,
    weapon: WeaponType.GAUNTLET,
    element: Element.AERO,
    codeName: 'jiexin',
    order: '23',
    tags: [Tags.SUPPORT, Tags.HA, Tags.TRACTION, Tags.LIB_AMP],
    growth: [Stats.P_ATK, Stats.CRIT_RATE],
    beta: false,
  },
  {
    id: '1503',
    name: 'Verina',
    stat: {
      baseAtk: 27,
      baseHp: 1139,
      baseDef: 90,
    },
    rarity: 5,
    weapon: WeaponType.RECTIFIER,
    element: Element.SPECTRO,
    codeName: 'jueyuan',
    order: '3',
    tags: [Tags.SUPPORT, Tags.COORD, Tags.AMP],
    avatarAdjust: 'object-[0_80%]',
    growth: [Stats.P_ATK, Stats.HEAL],
    beta: false,
  },
  {
    id: '1504',
    name: 'Lumi',
    stat: {
      baseAtk: 27,
      baseHp: 680,
      baseDef: 72,
    },
    rarity: 4,
    weapon: WeaponType.BROADBLADE,
    element: Element.ELECTRO,
    codeName: 'dengdeng',
    order: '30',
    tags: [Tags.MAIN_DPS, Tags.BA, Tags.SKILL_AMP],
    growth: [Stats.P_ATK, Stats.CRIT_RATE],
    beta: false,
  },
  {
    id: '1505',
    name: 'Shorekeeper',
    stat: {
      baseAtk: 23,
      baseHp: 1337,
      baseDef: 90,
    },
    rarity: 5,
    weapon: WeaponType.RECTIFIER,
    element: Element.SPECTRO,
    codeName: 'shouanren',
    order: '28',
    tags: [Tags.SUPPORT, Tags.TRACTION, Tags.AMP],
    growth: [Stats.P_HP, Stats.HEAL],
    beta: false,
  },
  {
    id: '1601',
    name: 'Taoqi',
    stat: {
      baseAtk: 18,
      baseHp: 716,
      baseDef: 128,
    },
    rarity: 4,
    weapon: WeaponType.BROADBLADE,
    element: Element.HAVOC,
    codeName: 'taohua',
    order: '9',
    tags: [Tags.SUPPORT, Tags.LIB, Tags.SKILL_AMP],
    growth: [Stats.P_DEF, Stats.HAVOC_DMG],
    beta: false,
  },
  {
    id: '1602',
    name: 'Danjin',
    stat: {
      baseAtk: 21,
      baseHp: 755,
      baseDef: 94,
    },
    rarity: 4,
    weapon: WeaponType.SWORD,
    element: Element.HAVOC,
    codeName: 'micai',
    order: '10',
    tags: [Tags.CONCERTO, Tags.HAVOC_AMP],
    growth: [Stats.P_ATK, Stats.HAVOC_DMG],
    beta: false,
  },
  {
    id: '1603',
    name: 'Camellya',
    stat: {
      baseAtk: 36,
      baseHp: 826,
      baseDef: 95,
    },
    rarity: 5,
    weapon: WeaponType.SWORD,
    element: Element.HAVOC,
    codeName: 'chun',
    order: '29',
    tags: [Tags.MAIN_DPS, Tags.CONCERTO, Tags.BA],
    growth: [Stats.P_ATK, Stats.CRIT_DMG],
    beta: false,
  },
  {
    id: '1606',
    name: 'Roccia',
    stat: {
      baseAtk: 30,
      baseHp: 980,
      baseDef: 98,
    },
    rarity: 5,
    weapon: WeaponType.GAUNTLET,
    element: Element.HAVOC,
    codeName: 'luokeke',
    order: '33',
    tags: [Tags.CONCERTO, Tags.SKILL, Tags.TRACTION, Tags.HAVOC_AMP, Tags.BA_AMP],
    avatarAdjust: 'object-[0_80%]',
    growth: [],
    beta: true,
  },

  // The counterpart will have id + 1
  // order for male is 4, female 5
  {
    id: '1501',
    name: 'Rover (Spectro)',
    stat: {
      baseAtk: 30,
      baseHp: 912,
      baseDef: 112,
    },
    rarity: 5,
    weapon: WeaponType.SWORD,
    element: Element.SPECTRO,
    codeName: 'rover',
    order: '4',
    tags: [Tags.CONCERTO, Tags.STAGNATE],
    growth: [Stats.P_ATK, Stats.SPECTRO_DMG],
    beta: false,
  },
  {
    id: '1604',
    name: 'Rover (Havoc)',
    stat: {
      baseAtk: 33,
      baseHp: 866,
      baseDef: 103,
    },
    rarity: 5,
    weapon: WeaponType.SWORD,
    element: Element.HAVOC,
    codeName: 'rover',
    order: '4',
    tags: [Tags.MAIN_DPS],
    growth: [Stats.P_ATK, Stats.HAVOC_DMG],
    beta: false,
  },
]
