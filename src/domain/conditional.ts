import { StatsObject } from '@src/data/lib/stats/baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty } from './constant'

export interface IScaling {
  name: string
  scale?: Stats
  value: { scaling: number; multiplier: Stats; override?: number; hits?: number }[]
  element: Element | TalentProperty
  property: TalentProperty
  multiplier?: number
  flat?: number
  bonus?: number //Bonus dmg for each component
  cr?: number //Bonus crit rate for each component
  cd?: number //Bonus crit dmg for each component
  defPen?: number //Only used by Yae
  self?: boolean //Define if self-heal
  sum?: number
  hit?: number
  coord?: boolean
  atkBonus?: number
}

export interface IEnemyGroup {
  id: string
  name: string
  res: number[]
  icon: string
}

export interface IWeaponContent {
  type?: 'toggle' | 'number' | 'element' | 'multiple'
  id: string
  default?: number | boolean | Element | []
  max?: number
  min?: number
  debuff?: boolean
}

export interface IContent {
  type?: 'toggle' | 'number' | 'element' | 'multiple'
  trace?: string
  level?: number
  id: string
  text: string
  title: string
  content: string
  show: boolean
  default?: string | number | boolean | []
  max?: number
  min?: number
  debuff?: boolean
  options?: { name: string; value: string }[]
  sync?: boolean
  single?: boolean
}

export interface IWeaponContent {
  type?: 'toggle' | 'number' | 'element' | 'multiple'
  id: string
  text: string
  show: boolean
  default?: number | boolean | Element | []
  max?: number
  min?: number
  debuff?: boolean
  options?: { name: string; value: string }[]
  scaling: (
    base: StatsObject, // Stats of the character
    form: Record<string, any>,
    r: number,
    extra: { team: ITeamChar[]; element: Element; own: StatsObject; totalEnergy: number; index: number; owner?: number }
    //"element" is the element of the wearer
    // "own" is the stat of the wearer
  ) => StatsObject
}

export interface ITalentDisplay {
  title: string
  content: string
  upgrade?: string[]
  value?: { name: string; value: { stat: Stats; scaling: (v: number) => number | string } }[]
  trace: string
  level?: number
  image?: string
  tag?: string
}

export interface ITalent {
  [key: string]: ITalentDisplay
}

export interface IConditional {
  talents: ITalent
  content: IContent[]
  teammateContent: IContent[]
  preCompute: (form: Record<string, any>) => StatsObject
  preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>) => StatsObject
  postCompute: (base: StatsObject, form: Record<string, any>) => StatsObject
}

export type ConditionalFunction = (c: number, a: number, t: ITalentLevel, team?: ITeamChar[]) => IConditional
