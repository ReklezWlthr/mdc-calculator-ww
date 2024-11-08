import { Stats } from './constant'

export const SubStatQuality = {
  1: 0.7,
  2: 0.8,
  3: 0.9,
  4: 1,
}

export const MainStat = {
  1: [Stats.P_HP, Stats.P_ATK, Stats.P_DEF],
  3: [
    Stats.P_HP,
    Stats.P_ATK,
    Stats.P_DEF,
    Stats.ER,
    Stats.FUSION_DMG,
    Stats.GLACIO_DMG,
    Stats.ELECTRO_DMG,
    Stats.AERO_DMG,
    Stats.SPECTRO_DMG,
    Stats.HAVOC_DMG,
  ],
  4: [Stats.P_HP, Stats.P_ATK, Stats.P_DEF, Stats.CRIT_RATE, Stats.CRIT_DMG, Stats.HEAL],
}

export const QualityMultiplier = {
  5: 1,
  4: 0.75,
  3: 2 / 3,
  2: 0.6,
}

export const MainStatValue = [
  // Rank 5
  {
    stat: [Stats.HP],
    rarity: 5,
    cost: 1,
    values: 456,
  },
  {
    stat: [Stats.ATK],
    rarity: 5,
    cost: 3,
    values: 20,
  },
  {
    stat: [Stats.ATK],
    rarity: 5,
    cost: 4,
    values: 30,
  },
  {
    stat: [Stats.P_HP, Stats.P_ATK],
    rarity: 5,
    cost: 4,
    values: 0.066,
  },
  {
    stat: [Stats.P_DEF],
    rarity: 5,
    cost: 4,
    values: 0.083,
  },
  {
    stat: [Stats.CRIT_RATE],
    rarity: 5,
    cost: 4,
    values: 0.044,
  },
  {
    stat: [Stats.CRIT_DMG],
    rarity: 5,
    cost: 4,
    values: 0.088,
  },
  {
    stat: [Stats.HEAL],
    rarity: 5,
    cost: 4,
    values: 0.0528,
  },
  {
    stat: [
      Stats.P_HP,
      Stats.P_ATK,
      Stats.FUSION_DMG,
      Stats.AERO_DMG,
      Stats.GLACIO_DMG,
      Stats.ELECTRO_DMG,
      Stats.SPECTRO_DMG,
      Stats.HAVOC_DMG,
    ],
    rarity: 5,
    cost: 3,
    values: 0.06,
  },
  {
    stat: [Stats.P_DEF],
    rarity: 5,
    cost: 3,
    values: 0.076,
  },
  {
    stat: [Stats.ER],
    rarity: 5,
    cost: 3,
    values: 0.064,
  },
  {
    stat: [Stats.P_HP],
    rarity: 5,
    cost: 1,
    values: 0.0456,
  },
  {
    stat: [Stats.P_ATK, Stats.P_DEF],
    rarity: 5,
    cost: 1,
    values: 0.036,
  },
]

export const SubStatRange = {
  [Stats.CRIT_RATE]: [0.063, 0.069, 0.075, 0.081, 0.087, 0.093, 0.099, 0.105],
  [Stats.CRIT_DMG]: [0.126, 0.138, 0.15, 0.162, 0.174, 0.186, 0.198, 0.21],
  [Stats.HP]: [320, 360, 390, 430, 470, 510, 540, 580],
  [Stats.ATK]: [30, 40, 50, 60],
  [Stats.DEF]: [40, 50, 60, 70],
  [Stats.P_DEF]: [0.081, 0.09, 0.1, 0.109, 0.118, 0.128, 0.138, 0.147],
  [Stats.P_ATK]: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116],
  [Stats.P_HP]: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116],
  [Stats.LIB_DMG]: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116],
  [Stats.HEAVY_DMG]: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116],
  [Stats.SKILL_DMG]: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116],
  [Stats.BASIC_DMG]: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116],
  [Stats.ER]: [0.068, 0.076, 0.084, 0.092, 0.1, 0.108, 0.116, 0.124],
}

export const SubStat = [
  Stats.HP,
  Stats.P_HP,
  Stats.ATK,
  Stats.P_ATK,
  Stats.DEF,
  Stats.P_DEF,
  Stats.CRIT_RATE,
  Stats.CRIT_DMG,
  Stats.ER,
  Stats.BASIC_DMG,
  Stats.HEAVY_DMG,
  Stats.SKILL_DMG,
  Stats.LIB_DMG,
]
