import { Element, ICharStore } from '@src/domain/constant'
import _ from 'lodash'
import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import { StatsObject, StatsObjectKeysT } from '../lib/stats/baseConstant'

enableStaticRendering(typeof window === 'undefined')

export interface CalculatorStoreType {
  form: Record<string, any>[]
  computedStats: StatsObject[]
  selected: number
  res: Record<Element, number>
  level: number
  variant: string
  superconduct: boolean
  stun: boolean
  shielded: boolean
  dmgMode: string
  custom: { name: StatsObjectKeysT; value: number; debuff: boolean }[][]
  setValue: <k extends keyof this>(key: k, value: this[k]) => void
  initForm: (initData: Record<string, any>[]) => void
  setFormValue: (index: number, key: string, value: any) => void
  setCustomValue: (index: number, key: StatsObjectKeysT, value: any) => void
  removeCustomValue: (index: number, innerIndex: number) => void
  setRes: (element: Element, value: number) => void
  hydrate: (data: CalculatorStoreType) => void
}

export class CalculatorStore {
  form: Record<string, any>[]
  enemy: string
  variant: string
  stun: boolean
  shielded: boolean
  dmgMode: string
  computedStats: StatsObject[]
  res: Record<Element, number>
  level: number | string
  superconduct: boolean
  selected: number
  custom: { name: StatsObjectKeysT; value: number; debuff: boolean; toggled: boolean }[][]

  constructor() {
    this.form = Array(4)
    this.enemy = ''
    this.variant = ''
    this.stun = false
    this.shielded = false
    this.computedStats = Array(4)
    this.dmgMode = 'total'
    this.selected = 0
    this.level = 1
    this.res = {
      [Element.FUSION]: 10,
      [Element.GLACIO]: 10,
      [Element.ELECTRO]: 10,
      [Element.AERO]: 10,
      [Element.SPECTRO]: 10,
      [Element.HAVOC]: 10,
    }
    this.custom = Array(4)
    this.superconduct = false

    makeAutoObservable(this)
  }

  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value
  }

  initForm = (initData: Record<string, any>[]) => {
    const mergedData = _.map(initData, (item, index) =>
      _.mapValues(item, (value, key) => {
        const old = this.form[index]?.[key]
        return _.isUndefined(old) ? value : old
      })
    )
    this.form = _.cloneDeep(mergedData)
  }

  setFormValue = (index: number, key: string, value: any) => {
    this.form[index][key] = value
    this.form = _.cloneDeep(this.form)
  }

  setCustomValue = (
    innerIndex: number,
    key: StatsObjectKeysT,
    value: any,
    toggled: boolean,
    debuff: boolean = false
  ) => {
    const index = this.selected
    if (innerIndex < 0) {
      this.custom[index] = [...(this.custom[index] || []), { name: key, value, debuff, toggled }]
    } else {
      this.custom[index].splice(innerIndex, 1, { name: key, value, debuff, toggled })
    }
    this.custom = _.cloneDeep(this.custom)
  }

  removeCustomValue = (index: number, innerIndex: number) => {
    this.custom[index].splice(innerIndex, 1)
    this.custom = _.cloneDeep(this.custom)
  }

  setRes = (element: Element, value: number) => {
    this.res[element] = value
  }

  getDefMult = (level: number, defPen: number = 0, defRed: number = 0) => {
    const def = (8 * +this.level + 792) * (1 - defRed)
    return _.min([(level * 8 + 800) / (level * 8 + 800 + def * (1 - defPen)), 2])
  }

  getResMult = (element: Element, resPen: number) => {
    const res = this.res[element] / 100 - (resPen)
    if (res < 0) return 1 - res / 2
    if (res >= 0.8) return 1 / (5 * res + 1)
    return 1 - res
  }

  hydrate = (data: CalculatorStoreType) => {
    if (!data) return

    this.form = data.form || []
  }
}
