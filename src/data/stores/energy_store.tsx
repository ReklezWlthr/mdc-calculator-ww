import { Element } from '@src/domain/constant'
import _ from 'lodash'
import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

const VarianceMultiplier = {
  average: 0,
  low: 0.5,
  worst: 1,
}

const OffFieldMultiplier = [0, 0.8, 0.7, 0.6]

export const ExtraSkillProc = ['10000031']

export interface EnergyStoreType {
  meta: EnergyMeta[]
  mode: string
  particleMode: string
  electroInterval: number
  clearTime: number
  particles: Record<Element, number>
  orbs: Record<Element, number>
  fixedEnergy: IFixedEnergy[]
  setValue: <k extends keyof this>(key: k, value: this[k]) => void
  setParticle: (type: 'particles' | 'orbs', element: Element, value: any) => void
  setMetaData: (index: number, path: _.PropertyPath, value: any) => void
  getEnergyFrom: (from: number, to: number) => number
  getTotalEnergy: (from: number) => number
  getFixedEnergy: (index: number) => number
  getAdditionalPersonal: (to: number) => { additional: number; electro: number }
  getAdditionalEnergy: (element: Element) => number
  hydrate: (data: EnergyStoreType) => void
}

export interface IFixedEnergy {
  generator: string
  receiver: string
  name: string
  value: number
}

export interface SkillMeta {
  proc: number
  value: number
  feed: string
  percentage: number
  pps?: number
  variance: number
  duration?: number
  ratio: number[]
  override: boolean
}

export interface EnergyMeta {
  cId: string
  fieldTime: number
  rpb: number
  skill: SkillMeta[]
  favProc: number
  feedFav: string
  add: Record<string, number>
  element: Element
}

export class EnergyStore {
  meta: EnergyMeta[]
  mode: string
  particleMode: string
  clearTime: number
  electroInterval: number
  particles: Record<Element, number>
  orbs: Record<Element, number>
  fixedEnergy: IFixedEnergy[]

  constructor() {
    this.meta = Array(4).fill(null)
    this.mode = 'average'
    this.particleMode = 'chamber'
    this.clearTime = 90
    this.electroInterval = 5
    this.particles = _.reduce(
      Element,
      (acc, curr) => {
        acc[curr] = 0
        return acc
      },
      {} as Record<Element, number>
    )
    this.orbs = _.reduce(
      Element,
      (acc, curr) => {
        acc[curr] = curr === Element.PHYSICAL ? 2 : 0
        return acc
      },
      {} as Record<Element, number>
    )
    this.fixedEnergy = []

    makeAutoObservable(this)
  }

  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value
  }

  setMetaData = (index: number, path: _.PropertyPath, value: any) => {
    _.set(this.meta[index], path, value)
    this.meta = _.cloneDeep(this.meta)
  }

  setParticle = (type: 'particles' | 'orbs', element: Element, value: any) => {
    this[type][element] = value
  }

  getEnergyFrom = (from: number, to: number) => {
    const varMultiplier = VarianceMultiplier[this.mode]
    const totalRotation = _.sumBy(this.meta, (item) => item.fieldTime)
    const generator = this.meta[from]
    const receiver = this.meta[to]

    const offFieldMultiplier = OffFieldMultiplier[_.size(_.filter(this.meta, (item) => !!item.cId)) - 1]

    let energy = 0
    _.forEach(generator?.skill, (skill) => {
      const receiverFieldTime = skill.override ? skill.ratio[to] / 100 : receiver?.fieldTime / totalRotation
      const elementMultiplier = receiver?.element === generator?.element ? 3 : 1

      //Check if the receiver is fed energy to or actually the generator
      const onFieldMultiplier =
        receiver?.cId === skill?.feed
          ? skill?.percentage / 100 + (1 - skill?.percentage / 100) * offFieldMultiplier
          : receiver?.cId === generator?.cId
          ? 1 - skill?.percentage / 100 + (skill?.percentage / 100) * offFieldMultiplier
          : offFieldMultiplier
      //Divide total particle that can be gained per burst use by seconds
      const particlePerSec = ((skill?.value * skill?.proc) / totalRotation) * (1 - skill?.variance * varMultiplier)

      const normalTotal = totalRotation * (onFieldMultiplier * (particlePerSec * elementMultiplier))

      //Fischl gains 1 extra proc per Burst which dilutes Particle distribution when RPB goes up
      const turretUptimePerBurst = _.min([
        skill?.duration *
          (skill?.proc * _.max([1, generator?.rpb]) + (_.includes(ExtraSkillProc, generator?.cId) ? 1 : 0)),
        totalRotation * _.max([1, generator?.rpb]),
      ])
      //Dilute total Particle gain during Uptime over total rotation length
      //Return the same PPS value if the turret has 100% Uptime
      const turretParticlePerSec = (skill?.pps * turretUptimePerBurst) / (totalRotation * _.max([1, generator?.rpb]))
      //Use diluted PPS to find how much Particle the receiver will receive during their normal rotation
      //Less than 100% uptime will result in lower PPS
      const turretTotal =
        turretParticlePerSec *
        totalRotation *
        (receiverFieldTime + (1 - receiverFieldTime) * offFieldMultiplier) *
        elementMultiplier *
        (1 - skill?.variance * varMultiplier)

      energy += (skill?.value ? normalTotal : turretTotal) * _.max([1, receiver?.rpb]) || 0
    })

    if (generator?.favProc) {
      //Fav gives 3 Clear Particles which equate to 6 Energy
      energy +=
        generator?.favProc *
          6 *
          (generator?.feedFav === receiver?.cId ? 1 : offFieldMultiplier) *
          _.max([1, receiver?.rpb]) || 0
    }

    const fixed = _.sumBy(this.fixedEnergy, (item) =>
      item.generator === generator.cId && item.receiver === receiver.cId ? item.value : 0
    )
    energy += fixed

    return energy
  }

  getTotalEnergy = (to: number) => {
    const { additional, electro } = this.getAdditionalPersonal(to)

    return (
      _.sum(_.map(this.meta, (item, index) => (item?.cId ? this.getEnergyFrom(index, to) : 0))) + additional + electro
    )
  }

  getFixedEnergy = (index: number) => {
    return _.sum(_.map(this.meta[index]?.add, (item) => item || 0)) * _.max([this.meta[index]?.rpb, 1])
  }

  getAdditionalEnergy = (element: Element) => {
    const clearParticle = (this.particles[Element.PHYSICAL] || 0) * 2
    const onParticle = (this.particles[element] || 0) * 3
    const offParticle = _.sumBy(
      _.filter(Element, (item) => !_.includes([Element.PHYSICAL, element], item)),
      (item) => this.particles[item]
    )

    const clearOrb = (this.orbs[Element.PHYSICAL] || 0) * 6
    const onOrb = (this.orbs[element] || 0) * 9
    const offOrb = _.sumBy(
      _.filter(Element, (item) => !_.includes([Element.PHYSICAL, element], item)),
      (item) => this.orbs[item] * 3
    )

    return _.sum([clearParticle, onParticle, offParticle, clearOrb, onOrb, offOrb])
  }

  getAdditionalPersonal = (to: number) => {
    const totalRotation = _.sumBy(this.meta, (item) => item.fieldTime)
    const receiver = this.meta[to]
    const receiverFieldTime = receiver?.fieldTime / totalRotation

    const offFieldMultiplier = OffFieldMultiplier[_.size(_.filter(this.meta, (item) => !!item.cId)) - 1]
    const onFieldMultiplier = receiverFieldTime + (1 - receiverFieldTime) * offFieldMultiplier

    const rawParticle = this.getAdditionalEnergy(receiver.element) * onFieldMultiplier * _.max([1, receiver?.rpb])
    const addParticle = this.particleMode === 'chamber' ? (rawParticle / this.clearTime) * totalRotation : rawParticle

    const electro = _.size(_.filter(this.meta, (item) => item?.element === Element.ELECTRO)) >= 2
    const totalElectro =
      (totalRotation / this.electroInterval) *
      onFieldMultiplier *
      (receiver.element === Element.ELECTRO ? 3 : 1) *
      +electro *
      _.max([1, receiver?.rpb])

    return {
      additional: addParticle,
      electro: totalElectro,
    }
  }

  hydrate = (data: EnergyStoreType) => {
    if (!data) return

    this.meta = data.meta
    this.mode = data.mode
    this.particleMode = data.particleMode
    this.clearTime = data.clearTime
    this.electroInterval = data.electroInterval
    this.particles = data.particles
    this.orbs = data.orbs
  }
}
