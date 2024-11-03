import { IArtifact, Stats } from './constant'

export const SubStatMap = {
  0: { stat: Stats.ATK, min: 13.62, bonus: 1.95 },
  1: { stat: Stats.HP, min: 209.13, bonus: 29.875 },
  2: { stat: Stats.DEF, min: 16.2, bonus: 2.315 },
  3: { stat: Stats.P_ATK, min: 0.0408, bonus: 0.00584 },
  4: { stat: Stats.P_HP, min: 0.0408, bonus: 0.00584 },
  5: { stat: Stats.P_DEF, min: 0.051, bonus: 0.00729 },
  6: { stat: Stats.CRIT_RATE, min: 0.0272, bonus: 0.00389 },
  7: { stat: Stats.CRIT_DMG, min: 0.0544, bonus: 0.00777 },
  8: { stat: Stats.EM, min: 16.32, bonus: 2.33 },
  9: { stat: Stats.ER, min: 0.0453, bonus: 0.0065 },
}

export const SubStatQuality = {
  1: 0.7,
  2: 0.8,
  3: 0.9,
  4: 1,
}

export const MainStat = {
  1: [
    Stats.P_HP,
    Stats.P_ATK,
    Stats.P_DEF,
    Stats.EM,
    Stats.PHYSICAL_DMG,
    Stats.PYRO_DMG,
    Stats.HYDRO_DMG,
    Stats.ELECTRO_DMG,
    Stats.CRYO_DMG,
    Stats.ANEMO_DMG,
    Stats.GEO_DMG,
    Stats.DENDRO_DMG,
  ],
  2: [Stats.ATK],
  3: [Stats.P_HP, Stats.P_ATK, Stats.P_DEF, Stats.CRIT_RATE, Stats.CRIT_DMG, Stats.EM, Stats.HEAL],
  4: [Stats.HP],
  5: [Stats.P_HP, Stats.P_ATK, Stats.P_DEF, Stats.EM, Stats.ER],
}

export const MainStatValue = [
  {
    stat: [Stats.HP],
    rarity: 5,
    values: [
      717.0, 920.0, 1123.0, 1326.0, 1530.0, 1733.0, 1936.0, 2139.0, 2342.0, 2545.0, 2749.0, 2952.0, 3155.0, 3358.0,
      3561.0, 3764.0, 3967.0, 4171.0, 4374.0, 4577.0, 4780.0,
    ],
  },
  {
    stat: [Stats.ATK],
    rarity: 5,
    values: [
      47.0, 60.0, 73.0, 86.0, 100.0, 113.0, 126.0, 139.0, 152.0, 166.0, 179.0, 192.0, 205.0, 219.0, 232.0, 245.0, 258.0,
      272.0, 285.0, 298.0, 311.0,
    ],
  },
  {
    stat: [
      Stats.P_HP,
      Stats.P_ATK,
      Stats.ANEMO_DMG,
      Stats.PYRO_DMG,
      Stats.HYDRO_DMG,
      Stats.ELECTRO_DMG,
      Stats.CRYO_DMG,
      Stats.GEO_DMG,
      Stats.DENDRO_DMG,
    ],
    rarity: 5,
    values: [
      0.07, 0.09, 0.11, 0.129, 0.149, 0.169, 0.189, 0.209, 0.228, 0.248, 0.268, 0.288, 0.308, 0.328, 0.347, 0.367,
      0.387, 0.407, 0.427, 0.446, 0.466,
    ],
  },
  {
    stat: [Stats.P_DEF, Stats.PHYSICAL_DMG],
    rarity: 5,
    values: [
      0.087, 0.112, 0.137, 0.162, 0.186, 0.211, 0.236, 0.261, 0.286, 0.31, 0.335, 0.36, 0.385, 0.409, 0.434, 0.459,
      0.484, 0.508, 0.533, 0.558, 0.583,
    ],
  },
  {
    stat: [Stats.EM],
    rarity: 5,
    values: [
      28.0, 35.9, 43.8, 51.8, 59.7, 67.6, 75.5, 83.5, 91.4, 99.3, 107.2, 115.2, 123.1, 131.0, 138.9, 146.9, 154.8,
      162.7, 170.6, 178.6, 186.5,
    ],
  },
  {
    stat: [Stats.ER],
    rarity: 5,
    values: [
      0.078, 0.1, 0.122, 0.144, 0.166, 0.188, 0.21, 0.232, 0.254, 0.276, 0.298, 0.32, 0.342, 0.364, 0.386, 0.408, 0.43,
      0.452, 0.474, 0.496, 0.518,
    ],
  },
  {
    stat: [Stats.CRIT_RATE],
    rarity: 5,
    values: [
      0.047, 0.06, 0.073, 0.086, 0.099, 0.113, 0.126, 0.139, 0.152, 0.166, 0.179, 0.192, 0.205, 0.218, 0.232, 0.245,
      0.258, 0.271, 0.284, 0.298, 0.311,
    ],
  },
  {
    stat: [Stats.CRIT_DMG],
    rarity: 5,
    values: [
      0.093, 0.12, 0.146, 0.173, 0.199, 0.225, 0.252, 0.278, 0.305, 0.331, 0.357, 0.384, 0.41, 0.437, 0.463, 0.49,
      0.516, 0.542, 0.569, 0.595, 0.622,
    ],
  },
  {
    stat: [Stats.HEAL],
    rarity: 5,
    values: [
      0.054, 0.069, 0.084, 0.1, 0.115, 0.13, 0.145, 0.161, 0.176, 0.191, 0.206, 0.221, 0.237, 0.252, 0.267, 0.282,
      0.298, 0.313, 0.328, 0.343, 0.359,
    ],
  },
  {
    stat: [Stats.HP],
    rarity: 4,
    values: [
      645.0, 828.0, 1011.0, 1194.0, 1377.0, 1559.0, 1742.0, 1925.0, 2108.0, 2291.0, 2474.0, 2657.0, 2839.0, 3022.0,
      3205.0, 3388.0, 3571.0,
    ],
  },
  {
    stat: [Stats.ATK],
    rarity: 4,
    values: [
      42.0, 54.0, 66.0, 78.0, 90.0, 102.0, 113.0, 125.0, 137.0, 149.0, 161.0, 173.0, 185.0, 197.0, 209.0, 221.0, 232.0,
    ],
  },
  {
    stat: [
      Stats.P_HP,
      Stats.P_ATK,
      Stats.ANEMO_DMG,
      Stats.PYRO_DMG,
      Stats.HYDRO_DMG,
      Stats.ELECTRO_DMG,
      Stats.CRYO_DMG,
      Stats.GEO_DMG,
      Stats.DENDRO_DMG,
    ],
    rarity: 4,
    values: [
      0.063, 0.081, 0.099, 0.116, 0.134, 0.152, 0.17, 0.188, 0.206, 0.223, 0.241, 0.259, 0.277, 0.295, 0.313, 0.33,
      0.348,
    ],
  },
  {
    stat: [Stats.P_DEF, Stats.PHYSICAL_DMG],
    rarity: 4,
    values: [
      0.079, 0.101, 0.123, 0.146, 0.168, 0.19, 0.212, 0.235, 0.257, 0.279, 0.302, 0.324, 0.346, 0.368, 0.391, 0.413,
      0.435,
    ],
  },
  {
    stat: [Stats.EM],
    rarity: 4,
    values: [
      25.2, 32.3, 39.4, 46.6, 53.7, 60.8, 68.0, 75.1, 82.2, 89.4, 96.5, 103.6, 110.8, 117.9, 125.0, 132.2, 139.3,
    ],
  },
  {
    stat: [Stats.ER],
    rarity: 4,
    values: [
      0.07, 0.09, 0.11, 0.129, 0.149, 0.169, 0.189, 0.209, 0.228, 0.248, 0.268, 0.288, 0.308, 0.328, 0.347, 0.367,
      0.387,
    ],
  },
  {
    stat: [Stats.CRIT_RATE],
    rarity: 4,
    values: [
      0.042, 0.054, 0.066, 0.078, 0.09, 0.101, 0.113, 0.125, 0.137, 0.149, 0.161, 0.173, 0.185, 0.197, 0.208, 0.22,
      0.232,
    ],
  },
  {
    stat: [Stats.CRIT_DMG],
    rarity: 4,
    values: [
      0.084, 0.108, 0.131, 0.155, 0.179, 0.203, 0.227, 0.25, 0.274, 0.298, 0.322, 0.345, 0.369, 0.393, 0.417, 0.441,
      0.464,
    ],
  },
  {
    stat: [Stats.HEAL],
    rarity: 4,
    values: [
      0.048, 0.062, 0.076, 0.09, 0.103, 0.117, 0.131, 0.144, 0.158, 0.172, 0.186, 0.199, 0.213, 0.227, 0.24, 0.254,
      0.268,
    ],
  },
  {
    stat: [Stats.HP],
    rarity: 3,
    values: [430.0, 552.0, 674.0, 796.0, 918.0, 1040.0, 1162.0, 1283.0, 1405.0, 1527.0, 1649.0, 1771.0, 1893.0],
  },
  {
    stat: [Stats.ATK],
    rarity: 3,
    values: [28.0, 36.0, 44.0, 52.0, 60.0, 68.0, 76.0, 84.0, 91.0, 99.0, 107.0, 115.0, 123.0],
  },
  {
    stat: [
      Stats.P_HP,
      Stats.P_ATK,
      Stats.ANEMO_DMG,
      Stats.PYRO_DMG,
      Stats.HYDRO_DMG,
      Stats.ELECTRO_DMG,
      Stats.CRYO_DMG,
      Stats.GEO_DMG,
      Stats.DENDRO_DMG,
    ],
    rarity: 3,
    values: [0.052, 0.067, 0.082, 0.097, 0.112, 0.127, 0.142, 0.156, 0.171, 0.186, 0.201, 0.216, 0.231],
  },
  {
    stat: [Stats.P_DEF, Stats.PHYSICAL_DMG],
    rarity: 3,
    values: [0.066, 0.084, 0.103, 0.121, 0.14, 0.158, 0.177, 0.196, 0.214, 0.233, 0.251, 0.27, 0.288],
  },
  {
    stat: [Stats.EM],
    rarity: 3,
    values: [21.0, 26.9, 32.9, 38.8, 44.8, 50.7, 56.7, 62.6, 68.5, 74.5, 80.4, 86.4, 92.3],
  },
  {
    stat: [Stats.ER],
    rarity: 3,
    values: [0.058, 0.075, 0.091, 0.108, 0.124, 0.141, 0.157, 0.174, 0.19, 0.207, 0.223, 0.24, 0.256],
  },
  {
    stat: [Stats.CRIT_RATE],
    rarity: 3,
    values: [0.035, 0.045, 0.055, 0.065, 0.075, 0.084, 0.094, 0.104, 0.114, 0.124, 0.134, 0.144, 0.154],
  },
  {
    stat: [Stats.CRIT_DMG],
    rarity: 3,
    values: [0.07, 0.09, 0.11, 0.129, 0.149, 0.169, 0.189, 0.209, 0.228, 0.248, 0.268, 0.288, 0.308],
  },
  {
    stat: [Stats.HEAL],
    rarity: 3,
    values: [0.04, 0.052, 0.063, 0.075, 0.086, 0.098, 0.109, 0.12, 0.132, 0.143, 0.155, 0.166, 0.178],
  },
]

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
  Stats.EM,
]
