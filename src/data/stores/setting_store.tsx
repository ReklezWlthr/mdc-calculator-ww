import { Element, ICharStore } from '@src/domain/constant'
import _ from 'lodash'
import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import { StatsObject } from '../lib/stats/baseConstant'

enableStaticRendering(typeof window === 'undefined')

interface ISetting {
  defaultEnemyLevel: number
  travelerGender: 'zhujuenan' | 'zhujue'
  storeData: boolean
}

const defaultSetting: ISetting = {
  defaultEnemyLevel: 1,
  travelerGender: 'zhujuenan',
  storeData: false,
}

export interface SettingStoreType {
  settings: ISetting
  setValue: <k extends keyof this>(key: k, value: this[k]) => void
  setSettingValue: (setting: Partial<ISetting>) => void
  hydrate: (data: SettingStoreType) => void
}

export class SettingStore {
  settings: ISetting

  constructor() {
    this.settings = defaultSetting

    makeAutoObservable(this)
  }

  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value
  }

  setSettingValue = (setting: Partial<ISetting>) => {
    this.settings = { ...this.settings, ...setting }
  }

  hydrate = (data: SettingStoreType) => {
    if (!data) return

    this.settings = data.settings || defaultSetting
  }
}
