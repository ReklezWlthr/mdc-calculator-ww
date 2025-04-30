import { Element } from '@src/domain/constant'
import _ from 'lodash'
import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export const ExtraSkillProc = ['10000031']

export interface EnergyStoreType {
  meta: EnergyMeta[]
  fixedEnergy: IFixedEnergy[][]
  setValue: <k extends keyof this>(key: k, value: this[k]) => void
  setParticle: (type: 'particles' | 'orbs', element: Element, value: any) => void
  setMetaData: (index: number, path: _.PropertyPath, value: any) => void
  getEnergyFrom: (index: number) => number
  getTotalEnergy: (of: number) => number
  getFixedEnergy: (index: number) => number
  getRequiredER: (index: number, cost: number) => number
  hydrate: (data: EnergyStoreType) => void
}

export interface IFixedEnergy {
  name: string
  default: number
  note: string
  source: string
  type: string
  show: (c: number, i: { i1: boolean; i2: boolean }) => boolean
}

export interface SkillMeta {
  proc: number
  value: number
  name: string
}

export interface EnergyMeta {
  cId: string
  rpb: number
  skill: SkillMeta[]
  add: Record<string, number>
}

export class EnergyStore {
  meta: EnergyMeta[]
  fixedEnergy: IFixedEnergy[][]

  constructor() {
    this.meta = Array(3).fill(null)
    this.fixedEnergy = [[], [], []]

    makeAutoObservable(this)
  }

  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value
  }

  setMetaData = (index: number, path: _.PropertyPath, value: any) => {
    _.set(this.meta[index], path, value)
    this.meta = _.cloneDeep(this.meta)
  }

  getEnergyFrom = (index: number) => {
    const generator = this.meta[index]
    return _.reduce(
      generator?.skill,
      (acc, skill) => acc + (skill?.value * skill?.proc * _.max([1, generator?.rpb]) || 0),
      0
    )
  }

  getTotalEnergy = (of: number) => {
    return _.sum(
      _.map(this.meta, (item, index) => (item?.cId ? this.getEnergyFrom(index) * (index === of ? 1 : 0.5) : 0))
    )
  }

  getFixedEnergy = (index: number) => {
    return _.sum(_.map(this.meta[index]?.add, (item) => item || 0)) * _.max([this.meta[index]?.rpb, 1])
  }

  getRequiredER = (index: number, cost: number) => {
    return (cost - this.getFixedEnergy(index)) / this.getTotalEnergy(index)
  }

  hydrate = (data: EnergyStoreType) => {
    if (!data) return

    this.meta = data.meta
  }
}
