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
  growth: boolean[]
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
  icon: string
  skill: string
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
  sonata: Sonata
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
  ECHO = 'Echo Skill',
}

export enum Element {
  PHYSICAL = 'Physical',
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

export const TagsImage = {
  [Tags.SUPPORT]: '/SP_RoleLabelA1',
  [Tags.MAIN_DPS]: '/SP_RoleLabelA2',
  [Tags.CONCERTO]: '/SP_RoleLabelA3',
  [Tags.BA]: '/SP_RoleLabelB1',
  [Tags.HA]: '/SP_RoleLabelB2',
  [Tags.SKILL]: '/SP_RoleLabelB3',
  [Tags.LIB]: '/SP_RoleLabelB4',
  [Tags.TRACTION]: '/SP_RoleLabelC1',
  [Tags.COORD]: '/SP_RoleLabelC2',
  [Tags.STAGNATE]: '/SP_RoleLabelC3',
  [Tags.REGEN]: '/SP_RoleLabelC4',
  [Tags.VIBRATION]: '/SP_RoleLabelC5',
  [Tags.INTERRUPT]: '/SP_RoleLabelC6',
  [Tags.AMP]: '/SP_RoleLabelC7',
  [Tags.AERO_AMP]: '/SP_RoleLabelD1',
  [Tags.ELECTRO_AMP]: '/SP_RoleLabelD2',
  [Tags.GLACIO_AMP]: '/SP_RoleLabelD3',
  [Tags.HAVOC_AMP]: '/SP_RoleLabelD4',
  [Tags.SPECTRO_AMP]: '/SP_RoleLabelD5',
  [Tags.FUSION_AMP]: '/SP_RoleLabelD6',
  [Tags.BA_AMP]: '/SP_RoleLabelD7',
  [Tags.HA_AMP]: '/SP_RoleLabelD8',
  [Tags.SKILL_AMP]: '/SP_RoleLabelD9',
  [Tags.LIB_AMP]: '/SP_RoleLabelD10',
  [Tags.COORD_AMP]: '/SP_RoleLabelD11',
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
  ER = 'Energy Regen',
  FUSION_DMG = 'Fusion DMG%',
  GLACIO_DMG = 'Glacio DMG%',
  ELECTRO_DMG = 'Electro DMG%',
  AERO_DMG = 'Aero DMG%',
  SPECTRO_DMG = 'Spectro DMG%',
  HAVOC_DMG = 'Havoc DMG%',
  HEAL = 'Healing Bonus',
  ALL_DMG = 'DMG%',
  BASIC_DMG = 'Basic Attack DMG%',
  HEAVY_DMG = 'Heavy Attack DMG%',
  SKILL_DMG = 'Res. Skill DMG%',
  LIB_DMG = 'Res. Liberation DMG%',
  DODGE_DMG = 'Dodge Counter DMG%',
  ATTR_DMG = 'Attribute DMG%',
  OUTRO_DMG = 'Outro DMG%',
}

export const StatIcons = {
  [Stats.P_HP]: '/asset/icons/T_Iconpropertygreenlife_UI.webp',
  [Stats.P_ATK]: '/asset/icons/T_Iconpropertyredattack_UI.webp',
  [Stats.P_DEF]: '/asset/icons/T_Iconpropertygreendefense_UI.webp',
  [Stats.ATK]: '/asset/icons/T_Iconpropertyredattack_UI.webp',
  [Stats.HP]: '/asset/icons/T_Iconpropertygreenlife_UI.webp',
  [Stats.DEF]: '/asset/icons/T_Iconpropertygreendefense_UI.webp',
  [Stats.CRIT_RATE]: '/asset/icons/T_Iconpropertyredbaoji_UI.webp',
  [Stats.CRIT_DMG]: '/asset/icons/T_Iconpropertyredcrit_UI.webp',
  [Stats.HEAL]: '/asset/icons/T_Iconpropertygreencure_UI.webp',
  [Stats.ER]: '/asset/icons/T_Iconpropertyenergy_UI.webp',
  [Stats.FUSION_DMG]: '/asset/icons/T_Iconpropertyredhot_UI.webp',
  [Stats.GLACIO_DMG]: '/asset/icons/T_Iconpropertyredice_UI.webp',
  [Stats.ELECTRO_DMG]: '/asset/icons/T_Iconpropertyredmine_UI.webp',
  [Stats.AERO_DMG]: '/asset/icons/T_Iconpropertyredwind_UI.webp',
  [Stats.SPECTRO_DMG]: '/asset/icons/T_Iconpropertyredlight_UI.webp',
  [Stats.HAVOC_DMG]: '/asset/icons/T_Iconpropertyreddark_UI.webp',
  [Stats.BASIC_DMG]: '/asset/icons/SP_RoleLabelD7.webp',
  [Stats.HEAVY_DMG]: '/asset/icons/SP_RoleLabelD8.webp',
  [Stats.SKILL_DMG]: '/asset/icons/SP_RoleLabelD9.webp',
  [Stats.LIB_DMG]: '/asset/icons/SP_RoleLabelD10.webp',
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
  { name: Stats.P_HP, value: Stats.P_HP, img: StatIcons[Stats.P_HP] },
  { name: Stats.P_ATK, value: Stats.P_ATK, img: StatIcons[Stats.P_ATK] },
  { name: Stats.P_DEF, value: Stats.P_DEF, img: StatIcons[Stats.P_DEF] },
  { name: Stats.ER, value: Stats.ER, img: StatIcons[Stats.ER] },
  { name: Stats.CRIT_RATE, value: Stats.CRIT_RATE, img: StatIcons[Stats.CRIT_RATE] },
  { name: Stats.CRIT_DMG, value: Stats.CRIT_DMG, img: StatIcons[Stats.CRIT_DMG] },
  { name: Stats.HEAL, value: Stats.HEAL, img: StatIcons[Stats.HEAL] },
  { name: Stats.FUSION_DMG, value: Stats.FUSION_DMG, img: StatIcons[Stats.FUSION_DMG] },
  { name: Stats.GLACIO_DMG, value: Stats.GLACIO_DMG, img: StatIcons[Stats.GLACIO_DMG] },
  { name: Stats.ELECTRO_DMG, value: Stats.ELECTRO_DMG, img: StatIcons[Stats.ELECTRO_DMG] },
  { name: Stats.AERO_DMG, value: Stats.AERO_DMG, img: StatIcons[Stats.AERO_DMG] },
  { name: Stats.SPECTRO_DMG, value: Stats.SPECTRO_DMG, img: StatIcons[Stats.SPECTRO_DMG] },
  { name: Stats.HAVOC_DMG, value: Stats.HAVOC_DMG, img: StatIcons[Stats.HAVOC_DMG] },
]

export const SubStatOptions = [
  { name: Stats.HP, value: Stats.HP, img: StatIcons[Stats.HP] },
  { name: Stats.ATK, value: Stats.ATK, img: StatIcons[Stats.ATK] },
  { name: Stats.DEF, value: Stats.DEF, img: StatIcons[Stats.DEF] },
  { name: Stats.P_HP, value: Stats.P_HP, img: StatIcons[Stats.P_HP] },
  { name: Stats.P_ATK, value: Stats.P_ATK, img: StatIcons[Stats.P_ATK] },
  { name: Stats.P_DEF, value: Stats.P_DEF, img: StatIcons[Stats.P_DEF] },
  { name: Stats.ER, value: Stats.ER, img: StatIcons[Stats.ER] },
  { name: Stats.CRIT_RATE, value: Stats.CRIT_RATE, img: StatIcons[Stats.CRIT_RATE] },
  { name: Stats.CRIT_DMG, value: Stats.CRIT_DMG, img: StatIcons[Stats.CRIT_DMG] },
  { name: Stats.BASIC_DMG, value: Stats.BASIC_DMG, img: StatIcons[Stats.BASIC_DMG] },
  { name: Stats.HEAVY_DMG, value: Stats.HEAVY_DMG, img: StatIcons[Stats.HEAVY_DMG] },
  { name: Stats.SKILL_DMG, value: Stats.SKILL_DMG, img: StatIcons[Stats.SKILL_DMG] },
  { name: Stats.LIB_DMG, value: Stats.LIB_DMG, img: StatIcons[Stats.LIB_DMG] },
]

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
