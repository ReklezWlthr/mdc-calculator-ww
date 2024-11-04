import { Sonata } from '@src/data/db/artifacts'
import { StatsObject, StatsObjectKeys } from '@src/data/lib/stats/baseConstant'

export enum GenshinPage {
  TEAM = 'team',
  DMG = 'dmg',
  ER = 'er',
  IMPORT = 'import',
  BUILD = 'build',
  INVENTORY = 'inventory',
  CHAR = 'char',
  COMPARE = 'compare',
}

export enum Tags {
  SUPPORT = 'Support and Healer',
  MAIN_DPS = 'Main Damage Dealer',
  CONCERTO = 'Concerto Efficiency',
  BA = 'Basic Attack DMG',
  HA = 'Heavy Attack DMG',
  SKILL = 'Resonance Skill DMG',
  LIB = 'Resonance Liberation DMG',
  TRACTION = 'Traction',
  COORD = 'Coordinated Attack',
  STAGNATE = 'Stagnation',
  REGEN = 'Resonance Liberation Regeneration',
  VIBRATION = 'Vibration Strength Reduction',
  INTERRUPT = 'Interruption Resistance Boost',
  AMP = 'DMG Amplification',
  HAVOC_AMP = 'Havoc DMG Amplification',
  AERO_AMP = 'Aero DMG Amplification',
  ELECTRO_AMP = 'Electro DMG Amplification',
  FUSION_AMP = 'Fusion DMG Amplification',
  GLACIO_AMP = 'Glacio DMG Amplification',
  SPECTRO_AMP = 'Spectro DMG Amplification',
  BA_AMP = 'Basic Attack DMG Amplification',
  HA_AMP = 'Heavy Attack DMG Amplification',
  SKILL_AMP = 'Resonance Skill DMG Amplification',
  LIB_AMP = 'Resonance Liberation DMG Amplification',
  COORD_AMP = 'Coordinated Attack DMG Amplification',
}

export interface ICharacterStats {
  baseAtk: number
  baseHp: number
  baseDef: number
  ascAtk: number
  ascHp: number
  ascDef: number
  ascStat: string
}

export interface ICharacter {
  name: string
  weapon: WeaponType
  element: Element
  rarity: number
  stat: ICharacterStats
  codeName: string
}

export interface ITalentLevel {
  normal: number
  skill: number
  lib: number
  forte: number
  intro: number
}

export interface ICharStoreBase {
  level: number
  ascension: number
  cons: number
  cId: string
  talents: ITalentLevel
  i: { i1: boolean; i2: boolean }
}

export interface ICharStore extends ICharStoreBase {
  // id: string
}

export interface ITeamChar extends ICharStoreBase {
  equipments: { weapon: IWeaponEquip; artifacts: string[] }
}

export interface IBuild {
  id: string
  name: string
  cId: string
  isDefault: boolean
  weapon: IWeaponEquip
  artifacts: string[]
  note?: string
}

export interface IArtifact {
  id: string
  icon: string,
  name: string
  sonata: Sonata[]
  desc: string
  properties: { base: number; growth: number }[]
  bonus?: (conditionals: StatsObject, rarity: number) => StatsObject
  cost: number
}

export interface IArtifactEquip {
  id: string
  setId: string
  level: number
  cost: number
  main: Stats
  quality: number
  subList: { stat: Stats; value: number }[]
}

export interface IWeapon {
  name: string
  rarity: number
  tier: number
  ascStat: string
  baseStat: number
  icon: string
  type: string
}

export interface IWeaponEquip {
  level: number
  ascension: number
  refinement: number
  wId: string
}

export enum WeaponType {
  SWORD = 'Sword',
  PISTOLS = 'Pistols',
  RECTIFIER = 'Rectifier',
  GAUNTLET = 'Gauntlets',
  BROADBLADE = 'Broadblade',
}

export const WeaponIcon = {
  [WeaponType.SWORD]: '/SP_IconNorKnife.webp',
  [WeaponType.BROADBLADE]: '/SP_IconNorSword.webp',
  [WeaponType.GAUNTLET]: '/SP_IconNorFist.webp',
  [WeaponType.PISTOLS]: '/SP_IconNorGun.webp',
  [WeaponType.RECTIFIER]: '/SP_IconNorMagic.webp',
}

export const DefaultWeaponImage = {
  [WeaponType.SWORD]: 'T_IconWeapon21020011_UI',
  [WeaponType.BROADBLADE]: 'T_IconWeapon21010011_UI',
  [WeaponType.GAUNTLET]: 'T_IconWeapon21040011_UI',
  [WeaponType.PISTOLS]: 'T_IconWeapon21030011_UI',
  [WeaponType.RECTIFIER]: 'T_IconWeapon21050011_UI',
}

export const DefaultWeaponId = {
  [WeaponType.SWORD]: '21020011',
  [WeaponType.BROADBLADE]: '21010011',
  [WeaponType.GAUNTLET]: '21040011',
  [WeaponType.PISTOLS]: '21030011',
  [WeaponType.RECTIFIER]: '21050011',
}

export const DefaultWeaponName = {
  [WeaponType.SWORD]: 'Training Sword',
  [WeaponType.BROADBLADE]: 'Training Broadblade',
  [WeaponType.GAUNTLET]: 'Training Gauntlets',
  [WeaponType.PISTOLS]: 'Training Pistols',
  [WeaponType.RECTIFIER]: 'Training Rectifier',
}

export enum TalentProperty {
  BA = 'Basic Attack',
  HA = 'Heavy Attack',
  SKILL = 'Resonance Skill',
  LIB = 'Res. Liberation',
  INTRO = 'Intro Skill',
  OUTRO = 'Outro Skill',
  HEAL = 'Heal',
  SHIELD = 'Shield',
  COORD = 'Coordinated Attack',
  ECHO = 'Echo Attack'
}

export enum Element {
  FUSION = 'Fusion',
  GLACIO = 'Glacio',
  ELECTRO = 'Electro',
  AERO = 'Aero',
  SPECTRO = 'Spectro',
  HAVOC = 'Havoc',
}

export const ElementIcon = {
  [Element.FUSION]: '/T_IconElementFire.webp',
  [Element.GLACIO]: '/T_IconElementIce.webp',
  [Element.ELECTRO]: '/T_IconElementThunder.webp',
  [Element.AERO]: '/T_IconElementWind.webp',
  [Element.SPECTRO]: '/T_IconElementLight.webp',
  [Element.HAVOC]: '/T_IconElementDark.webp',
}

export enum Stats {
  HP = 'HP',
  ATK = 'ATK',
  DEF = 'DEF',
  P_HP = 'HP%',
  P_ATK = 'ATK%',
  P_DEF = 'DEF%',
  CRIT_RATE = 'Crit. Rate',
  CRIT_DMG = 'Crit. DMG',
  ER = 'Energy Recharge',
  FUSION_DMG = 'Fusion DMG%',
  GLACIO_DMG = 'Glacio DMG%',
  ELECTRO_DMG = 'Electro DMG%',
  AERO_DMG = 'Dendro DMG%',
  SPECTRO_DMG = 'Spectro DMG%',
  HAVOC_DMG = 'Havoc DMG%',
  HEAL = 'Healing Bonus',
  ALL_DMG = 'DMG%',
  BASIC_DMG = 'Basic Attack DMG%',
  HEAVY_DMG = 'Heavy Attack DMG%',
  SKILL_DMG = 'Res. Skill DMG%',
  LIB_DMG = 'Res. Liberation DMG%',
}

export const StatIcons = {
  [Stats.P_HP]: 'stat_p_hp.png',
  [Stats.P_ATK]: 'stat_p_atk.png',
  [Stats.P_DEF]: 'stat_p_def.png',
  [Stats.ATK]: 'stat_atk.png',
  [Stats.HP]: 'stat_hp.png',
  [Stats.DEF]: 'stat_def.png',
  [Stats.CRIT_RATE]: 'stat_crit_rate.png',
  [Stats.CRIT_DMG]: 'stat_crit_dmg.png',
  [Stats.HEAL]: 'stat_heal.png',
  [Stats.ER]: 'stat_er.png',
}

export const Region = Object.freeze({
  1: 'Monstadt',
  2: 'Liyue',
  3: 'Inazuma',
  4: 'Sumeru',
  5: 'Fontaine',
  6: 'Natlan',
  7: 'Scheznaya',
})

export const ArtifactPiece = Object.freeze({
  1: 'Goblet of Eonothem',
  2: 'Plume of Death',
  3: 'Circlet of Logos',
  4: 'Flower of Life',
  5: 'Sands of Eon',
})

export const AscensionOptions = [
  { name: 'A0', value: '0' },
  { name: 'A1', value: '1' },
  { name: 'A2', value: '2' },
  { name: 'A3', value: '3' },
  { name: 'A4', value: '4' },
  { name: 'A5', value: '5' },
  { name: 'A6', value: '6' },
].reverse()

export const SequenceOptions = [
  { name: 'S0', value: '0' },
  { name: 'S1', value: '1' },
  { name: 'S2', value: '2' },
  { name: 'S3', value: '3' },
  { name: 'S4', value: '4' },
  { name: 'S5', value: '5' },
  { name: 'S6', value: '6' },
]

export const RefinementOptions = [
  { name: 'R1', value: '1' },
  { name: 'R2', value: '2' },
  { name: 'R3', value: '3' },
  { name: 'R4', value: '4' },
  { name: 'R5', value: '5' },
]

export const MainStatOptions = [
  { name: Stats.ATK, value: Stats.ATK, img: '/asset/icons/stat_atk.png' },
  { name: Stats.HP, value: Stats.HP, img: '/asset/icons/stat_hp.png' },
  { name: Stats.P_ATK, value: Stats.P_ATK, img: '/asset/icons/stat_p_atk.png' },
  { name: Stats.P_HP, value: Stats.P_HP, img: '/asset/icons/stat_p_hp.png' },
  { name: Stats.P_DEF, value: Stats.P_DEF, img: '/asset/icons/stat_p_def.png' },
  { name: Stats.EM, value: Stats.EM, img: '/asset/icons/stat_em.png' },
  { name: Stats.ER, value: Stats.ER, img: '/asset/icons/stat_er.png' },
  { name: Stats.CRIT_RATE, value: Stats.CRIT_RATE, img: '/asset/icons/stat_crit_rate.png' },
  { name: Stats.CRIT_DMG, value: Stats.CRIT_DMG, img: '/asset/icons/stat_crit_dmg.png' },
  { name: Stats.HEAL, value: Stats.HEAL, img: '/asset/icons/stat_heal.png' },
  { name: Stats.PHYSICAL_DMG, value: Stats.PHYSICAL_DMG, img: '/asset/icons/stat_physical.png' },
  {
    name: Stats.ANEMO_DMG,
    value: Stats.ANEMO_DMG,
    img: 'https://cdn.wanderer.moe/genshin-impact/elements/anemo.png',
  },
  {
    name: Stats.PYRO_DMG,
    value: Stats.PYRO_DMG,
    img: 'https://cdn.wanderer.moe/genshin-impact/elements/pyro.png',
  },
  {
    name: Stats.HYDRO_DMG,
    value: Stats.HYDRO_DMG,
    img: 'https://cdn.wanderer.moe/genshin-impact/elements/hydro.png',
  },
  {
    name: Stats.CRYO_DMG,
    value: Stats.CRYO_DMG,
    img: 'https://cdn.wanderer.moe/genshin-impact/elements/cryo.png',
  },
  {
    name: Stats.ELECTRO_DMG,
    value: Stats.ELECTRO_DMG,
    img: 'https://cdn.wanderer.moe/genshin-impact/elements/electro.png',
  },
  {
    name: Stats.GEO_DMG,
    value: Stats.GEO_DMG,
    img: 'https://cdn.wanderer.moe/genshin-impact/elements/geo.png',
  },
  {
    name: Stats.DENDRO_DMG,
    value: Stats.DENDRO_DMG,
    img: 'https://cdn.wanderer.moe/genshin-impact/elements/dendro.png',
  },
]

export const SubStatOptions = [
  { name: Stats.ATK, value: Stats.ATK, img: '/asset/icons/stat_atk.png' },
  { name: Stats.HP, value: Stats.HP, img: '/asset/icons/stat_hp.png' },
  { name: Stats.DEF, value: Stats.DEF, img: '/asset/icons/stat_def.png' },
  { name: Stats.P_ATK, value: Stats.P_ATK, img: '/asset/icons/stat_p_atk.png' },
  { name: Stats.P_HP, value: Stats.P_HP, img: '/asset/icons/stat_p_hp.png' },
  { name: Stats.P_DEF, value: Stats.P_DEF, img: '/asset/icons/stat_p_def.png' },
  { name: Stats.EM, value: Stats.EM, img: '/asset/icons/stat_em.png' },
  { name: Stats.ER, value: Stats.ER, img: '/asset/icons/stat_er.png' },
  { name: Stats.CRIT_RATE, value: Stats.CRIT_RATE, img: '/asset/icons/stat_crit_rate.png' },
  { name: Stats.CRIT_DMG, value: Stats.CRIT_DMG, img: '/asset/icons/stat_crit_dmg.png' },
]

export const PropMap = {
  level: 4001,
  ascension: 1002,
}

export const EnkaStatsMap = {
  FIGHT_PROP_HP: Stats.HP,
  FIGHT_PROP_ATTACK: Stats.ATK,
  FIGHT_PROP_DEFENSE: Stats.DEF,
  FIGHT_PROP_HP_PERCENT: Stats.P_HP,
  FIGHT_PROP_ATTACK_PERCENT: Stats.P_ATK,
  FIGHT_PROP_DEFENSE_PERCENT: Stats.P_DEF,
  FIGHT_PROP_CRITICAL: Stats.CRIT_RATE,
  FIGHT_PROP_CRITICAL_HURT: Stats.CRIT_DMG,
  FIGHT_PROP_CHARGE_EFFICIENCY: Stats.ER,
  FIGHT_PROP_HEAL_ADD: Stats.HEAL,
  FIGHT_PROP_ELEMENT_MASTERY: Stats.EM,
  FIGHT_PROP_PHYSICAL_ADD_HURT: Stats.PHYSICAL_DMG,
  FIGHT_PROP_FIRE_ADD_HURT: Stats.PYRO_DMG,
  FIGHT_PROP_ELEC_ADD_HURT: Stats.ELECTRO_DMG,
  FIGHT_PROP_WATER_ADD_HURT: Stats.HYDRO_DMG,
  FIGHT_PROP_WIND_ADD_HURT: Stats.ANEMO_DMG,
  FIGHT_PROP_ICE_ADD_HURT: Stats.CRYO_DMG,
  FIGHT_PROP_ROCK_ADD_HURT: Stats.GEO_DMG,
  FIGHT_PROP_GRASS_ADD_HURT: Stats.DENDRO_DMG,
}

export const EnkaArtifactTypeMap = {
  EQUIP_BRACER: 4,
  EQUIP_NECKLACE: 2,
  EQUIP_SHOES: 5,
  EQUIP_RING: 1,
  EQUIP_DRESS: 3,
}

export const ScannerStatsMap = {
  hp: Stats.HP,
  atk: Stats.ATK,
  def: Stats.DEF,
  hp_: Stats.P_HP,
  atk_: Stats.P_ATK,
  def_: Stats.P_DEF,
  critRate_: Stats.CRIT_RATE,
  critDMG_: Stats.CRIT_DMG,
  enerRech_: Stats.ER,
  heal_: Stats.HEAL,
  eleMas: Stats.EM,
  physical_dmg_: Stats.PHYSICAL_DMG,
  anemo_dmg_: Stats.ANEMO_DMG,
  geo_dmg_: Stats.GEO_DMG,
  electro_dmg_: Stats.ELECTRO_DMG,
  hydro_dmg_: Stats.HYDRO_DMG,
  pyro_dmg_: Stats.PYRO_DMG,
  cryo_dmg_: Stats.CRYO_DMG,
  dendro_dmg_: Stats.DENDRO_DMG,
}

export const ScannerArtifactTypeMap = {
  flower: 4,
  plume: 2,
  sands: 5,
  goblet: 1,
  circlet: 3,
}

export const CustomConditionalMap = {
  MELT_DMG: 'Melt DMG%',
  VAPE_DMG: 'Vaporize DMG%',
  BURNING_DMG: 'Burning DMG%',
  BLOOM_DMG: 'Melt DMG%',
  HYPERBLOOM_DMG: 'Hyperbloom DMG%',
  BURGEON_DMG: 'Burgeon DMG%',
  SPREAD_DMG: 'Spread DMG%',
  AGGRAVATE_DMG: 'Aggravate DMG%',
  TASER_DMG: 'Electro-Charged DMG%',
  OVERLOAD_DMG: 'Overloaded DMG%',
  SHATTER_DMG: 'Shattered DMG%',
  SWIRL_DMG: 'Swirl DMG%',
  SUPERCONDUCT_DMG: 'Superconduct DMG%',
  PYRO_F_DMG: 'Pyro Flat DMG',
  CRYO_F_DMG: 'Cryo Flat DMG',
  HYDRO_F_DMG: 'Hydro Flat DMG',
  ELECTRO_F_DMG: 'Electro Flat DMG',
  ANEMO_F_DMG: 'Anemo Flat DMG',
  GEO_F_DMG: 'Geo Flat DMG',
  DENDRO_F_DMG: 'Dendro Flat DMG',
  BASIC_F_DMG: 'Normal Attack Flat DMG',
  CHARGE_F_DMG: 'Charged Attack Flat DMG',
  PLUNGE_F_DMG: 'Plunging Attack Flat DMG',
  SKILL_F_DMG: 'Elemental Skill Flat DMG',
  BURST_F_DMG: 'Elemental Burst Flat DMG',
  BASIC_CR: 'Normal Attack CRIT Rate',
  CHARGE_CR: 'Charged Attack CRIT Rate',
  PLUNGE_CR: 'Plunging Attack CRIT Rate',
  SKILL_CR: 'Elemental Skill CRIT Rate',
  BURST_CR: 'Elemental Burst CRIT Rate',
  BASIC_CD: 'Normal Attack CRIT DMG',
  CHARGE_CD: 'Charged Attack CRIT DMG',
  PLUNGE_CD: 'Plunging Attack CRIT DMG',
  SKILL_CD: 'Elemental Skill CRIT DMG',
  BURST_CD: 'Elemental Burst CRIT DMG',
  DEF_REDUCTION: 'DEF Reduction (%)',
  ALL_TYPE_RES_PEN: 'All Type RES Reduction',
  PHYSICAL_RES_PEN: 'Physical RES Reduction',
  PYRO_RES_PEN: 'Pyro RES Reduction',
  HYDRO_RES_PEN: 'Hydro RES Reduction',
  CRYO_RES_PEN: 'Cryo RES Reduction',
  ELECTRO_RES_PEN: 'Electro RES Reduction',
  ANEMO_RES_PEN: 'Anemo RES Reduction',
  GEO_RES_PEN: 'Geo RES Reduction',
  DENDRO_RES_PEN: 'Dendro RES Reduction',
}
