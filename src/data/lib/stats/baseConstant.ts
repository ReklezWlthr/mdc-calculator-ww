import { calcScaling } from '@src/core/utils/data_format'
import { IScaling } from '@src/domain/conditional'
import { Element, Stats, TalentProperty, WeaponType } from '@src/domain/constant'
import _ from 'lodash'

export interface StatsArray {
  name: string
  source: string
  value: number
  base?: string | number
  multiplier?: string | number
  flat?: number | string
}

export const baseStatsObject = {
  // Base Stats
  BASE_ATK_C: 0,
  BASE_ATK_L: 0,
  BASE_ATK: 0,
  BASE_HP: 0,
  BASE_DEF: 0,

  // Meta
  MAX_ENERGY: 0,
  NAME: '',
  WEAPON: null as WeaponType,
  ELEMENT: null as Element,

  // Basic Stats
  [Stats.ATK]: [] as StatsArray[],
  [Stats.HP]: [] as StatsArray[],
  [Stats.DEF]: [] as StatsArray[],
  [Stats.P_ATK]: [] as StatsArray[],
  [Stats.P_HP]: [] as StatsArray[],
  [Stats.P_DEF]: [] as StatsArray[],
  [Stats.CRIT_RATE]: [{ name: 'Base Value', source: 'Self', value: 0.05 }] as StatsArray[],
  [Stats.CRIT_DMG]: [{ name: 'Base Value', source: 'Self', value: 1.5 }] as StatsArray[],
  [Stats.ER]: [{ name: 'Base Value', source: 'Self', value: 1 }] as StatsArray[],
  [Stats.HEAL]: [] as StatsArray[],

  I_HEAL: [] as StatsArray[],

  X_EM: [] as StatsArray[],

  // DMG Bonuses
  [Stats.FUSION_DMG]: [] as StatsArray[],
  [Stats.GLACIO_DMG]: [] as StatsArray[],
  [Stats.ELECTRO_DMG]: [] as StatsArray[],
  [Stats.AERO_DMG]: [] as StatsArray[],
  [Stats.SPECTRO_DMG]: [] as StatsArray[],
  [Stats.HAVOC_DMG]: [] as StatsArray[],
  [Stats.ALL_DMG]: [] as StatsArray[],
  [Stats.ATTR_DMG]: [] as StatsArray[],

  AMP: [] as StatsArray[],
  FUSION_AMP: [] as StatsArray[],
  GLACIO_AMP: [] as StatsArray[],
  AERO_AMP: [] as StatsArray[],
  ELECTRO_AMP: [] as StatsArray[],
  SPECTRO_AMP: [] as StatsArray[],
  HAVOC_AMP: [] as StatsArray[],

  FUSION_CD: [] as StatsArray[],
  GLACIO_CD: [] as StatsArray[],
  AERO_CD: [] as StatsArray[],
  ELECTRO_CD: [] as StatsArray[],
  SPECTRO_CD: [] as StatsArray[],
  HAVOC_CD: [] as StatsArray[],

  FUSION_F_DMG: [] as StatsArray[],
  GLACIO_F_DMG: [] as StatsArray[],
  AERO_F_DMG: [] as StatsArray[],
  ELECTRO_F_DMG: [] as StatsArray[],
  SPECTRO_F_DMG: [] as StatsArray[],
  HAVOC_F_DMG: [] as StatsArray[],

  // Hidden Stats
  DEF_PEN: [] as StatsArray[],
  DEF_REDUCTION: [] as StatsArray[],
  BASIC_DEF_PEN: [] as StatsArray[],
  HEAVY_DEF_PEN: [] as StatsArray[],
  SKILL_DEF_PEN: [] as StatsArray[],
  LIB_DEF_PEN: [] as StatsArray[],

  // RES PEN
  ALL_TYPE_RES_PEN: [] as StatsArray[],
  FUSION_RES_PEN: [] as StatsArray[],
  GLACIO_RES_PEN: [] as StatsArray[],
  AERO_RES_PEN: [] as StatsArray[],
  ELECTRO_RES_PEN: [] as StatsArray[],
  SPECTRO_RES_PEN: [] as StatsArray[],
  HAVOC_RES_PEN: [] as StatsArray[],

  // RES
  ALL_TYPE_RES: [] as StatsArray[],
  FUSION_RES: [] as StatsArray[],
  GLACIO_RES: [] as StatsArray[],
  AERO_RES: [] as StatsArray[],
  ELECTRO_RES: [] as StatsArray[],
  SPECTRO_RES: [] as StatsArray[],
  HAVOC_RES: [] as StatsArray[],

  // Talent Boosts
  [Stats.BASIC_DMG]: [] as StatsArray[],
  [Stats.HEAVY_DMG]: [] as StatsArray[],
  [Stats.SKILL_DMG]: [] as StatsArray[],
  [Stats.LIB_DMG]: [] as StatsArray[],
  [Stats.DODGE_DMG]: [] as StatsArray[],
  [Stats.OUTRO_DMG]: [] as StatsArray[],
  [Stats.COORD_DMG]: [] as StatsArray[],

  BASIC_MULT: [] as StatsArray[],
  HEAVY_MULT: [] as StatsArray[],
  SKILL_MULT: [] as StatsArray[],
  LIB_MULT: [] as StatsArray[],

  BASIC_AMP: [] as StatsArray[],
  HEAVY_AMP: [] as StatsArray[],
  SKILL_AMP: [] as StatsArray[],
  LIB_AMP: [] as StatsArray[],
  COORD_AMP: [] as StatsArray[],

  BASIC_F_DMG: [] as StatsArray[],
  HEAVY_F_DMG: [] as StatsArray[],
  SKILL_F_DMG: [] as StatsArray[],
  LIB_F_DMG: [] as StatsArray[],

  BASIC_CR: [] as StatsArray[],
  HEAVY_CR: [] as StatsArray[],
  SKILL_CR: [] as StatsArray[],
  LIB_CR: [] as StatsArray[],

  BASIC_CD: [] as StatsArray[],
  HEAVY_CD: [] as StatsArray[],
  SKILL_CD: [] as StatsArray[],
  LIB_CD: [] as StatsArray[],

  // Mitigation
  DMG_REDUCTION: [] as StatsArray[],
  ATK_REDUCTION: [] as StatsArray[],

  // Multipliers
  BASIC_SCALING: [] as IScaling[],
  HEAVY_SCALING: [] as IScaling[],
  MID_AIR_SCALING: [] as IScaling[],
  DODGE_SCALING: [] as IScaling[],
  SKILL_SCALING: [] as IScaling[],
  LIB_SCALING: [] as IScaling[],
  FORTE_SCALING: [] as IScaling[],
  INTRO_SCALING: [] as IScaling[],
  OUTRO_SCALING: [] as IScaling[],
  ECHO_SCALING: [] as IScaling[],

  // DoTs
  DoT: false,

  FRAZZLE_AMP: [] as StatsArray[],
  EROSION_AMP: [] as StatsArray[],

  getAtk: function (statBonus?: number) {
    return (
      _.floor(this.BASE_ATK * (1 + _.sumBy(this[Stats.P_ATK], 'value') + (statBonus || 0))) +
      _.sumBy(this[Stats.ATK], 'value')
    )
  },
  getHP: function (exclude?: boolean) {
    return (
      _.floor(this.BASE_HP * (1 + _.sumBy(this[Stats.P_HP], 'value'))) +
      _.sumBy(this[Stats.HP], 'value') +
      (exclude ? 0 : this.getValue('X_HP'))
    )
  },
  getDef: function () {
    return _.floor(this.BASE_DEF * (1 + _.sumBy(this[Stats.P_DEF], 'value'))) + _.sumBy(this[Stats.DEF], 'value')
  },
  getValue: function (key: string, exclude?: StatsArray[]) {
    return (
      _.sumBy(
        _.size(exclude)
          ? _.filter(this[key], (item) => _.every(exclude, (e) => !(e.source === item.source && e.name === item.name)))
          : this[key],
        'value'
      ) || 0
    )
  },

  CALLBACK: [] as ((base: any, all: any[]) => any)[],

  //util
}

export const TalentStatMap = {
  [TalentProperty.BA]: 'BASIC',
  [TalentProperty.HA]: 'HEAVY',
  [TalentProperty.SKILL]: 'SKILL',
  [TalentProperty.LIB]: 'LIB',
}

export type StatsObject = typeof baseStatsObject
export type StatsObjectKeysT = keyof typeof baseStatsObject

export const StatsObjectKeys = _.mapValues(baseStatsObject, (_, key) => key)
