import {
  DefaultWeaponId,
  Element,
  IArtifactEquip,
  IBuild,
  ITeamChar,
  IWeapon,
  IWeaponEquip,
  WeaponType,
} from '@src/domain/constant'
import _ from 'lodash'
import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import { DefaultBuild } from './build_store'
import { findCharacter } from '@src/core/utils/finder'

enableStaticRendering(typeof window === 'undefined')

export const DefaultWeapon = (type?: WeaponType) => ({
  level: 1,
  ascension: 0,
  refinement: 1,
  wId: DefaultWeaponId[type] || '',
})

export const DefaultCharacter = {
  level: 1,
  ascension: 0,
  cons: 0,
  cId: null,
  equipments: {
    weapon: DefaultWeapon(),
    artifacts: Array(5),
  },
  i: {
    i1: false,
    i2: false,
  },
  growth: Array(8).fill(false),
  talents: {
    normal: 1,
    skill: 1,
    lib: 1,
    forte: 1,
    intro: 1,
  },
}

export interface TeamStoreType {
  characters: ITeamChar[]
  selected: number
  hydrated: boolean
  setValue: <k extends keyof this>(key: k, value: this[k]) => void
  setMember: (index: number, character: ITeamChar) => void
  setTalentLevel: (index: number, type: 'normal' | 'skill' | 'burst', level: number) => void
  setInherentSkill: (index: number, type: 'i1' | 'i2', toggle: boolean) => void
  setStatBonus: (index: number, growthIndex: number, toggle: boolean) => void
  setMemberInfo: (index: number, info: Partial<ITeamChar>) => void
  setWeapon: (index: number, info: Partial<IWeaponEquip>) => void
  setArtifact: (index: number, type: number, aId: string) => void
  unequipAll: (index: number) => void
  hydrateCharacters: (data: ITeamChar[]) => void
  hydrate: (data: TeamStoreType) => void
}

export class Team {
  characters: ITeamChar[]
  selected: number
  hydrated: boolean = false

  constructor() {
    this.characters = Array(3).fill(DefaultCharacter)
    this.selected = 0

    makeAutoObservable(this)
  }

  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value
  }

  setMember = (index: number, character: ITeamChar) => {
    if (index < 0 || index > 4) return
    this.characters[index] = character
  }

  setMemberInfo = (index: number, info: Partial<ITeamChar>) => {
    if (index < 0 || index > 4) return
    const dupeIndex = _.findIndex(this.characters, ['cId', info?.cId])
    const dupe = this.characters[dupeIndex]
    const oldData = _.cloneDeep(this.characters[index]) || null
    if (info?.equipments?.artifacts)
      _.forEach(info.equipments.artifacts, (aId) =>
        _.forEach(this.characters, (character, cI) => {
          const i = _.findIndex(character.equipments.artifacts, (item) => item === aId)
          if (i >= 0 && cI !== index) character.equipments.artifacts[i] = null
        })
      )
    if (dupeIndex >= 0 && dupeIndex !== index) {
      this.characters[index] = dupe
      this.characters[dupeIndex] = oldData
    } else {
      this.characters[index] = { ...this.characters[index], ...info }
    }
    this.characters = [...this.characters]
  }

  equipBuild = (index: number, build: IBuild) => {
    if (!build) return
    this.characters[index].equipments = { weapon: build.weapon, artifacts: build.artifacts }
    this.characters[index] = { ...this.characters[index] }
  }

  setTalentLevel = (index: number, type: 'normal' | 'skill' | 'burst', level: number) => {
    if (!type) return
    this.characters[index].talents = { ...this.characters[index].talents, [type]: level }
    this.characters[index] = { ...this.characters[index] }
  }

  setInherentSkill = (index: number, type: 'i1' | 'i2', toggle: boolean) => {
    if (!type) return
    this.characters[index].i = { ...this.characters[index].i, [type]: toggle }
    this.characters[index] = { ...this.characters[index] }
  }

  setStatBonus = (index: number, growthIndex: number, toggle: boolean) => {
    this.characters[index].growth[growthIndex] = toggle
    this.characters[index] = { ...this.characters[index] }
  }

  unequipAll = (index: number) => {
    if (index < 0 || index > 4) return
    this.characters[index].equipments = DefaultBuild(findCharacter(this.characters[index].cId)?.weapon)
    this.characters[index] = { ...this.characters[index] }
  }

  setWeapon = (index: number, info: Partial<IWeaponEquip>) => {
    if (index < 0 || index > 4) return
    this.characters[index].equipments.weapon = { ...this.characters[index].equipments.weapon, ...info }
    this.characters[index] = { ...this.characters[index] }
  }

  setArtifact = (index: number, type: number, aId: string | null) => {
    if (index < 0) return
    const replacedEcho = _.cloneDeep(this.characters[index].equipments.artifacts[type - 1]) || null
    _.forEach(this.characters, (character, i) => {
      if (_.includes(character.equipments.artifacts, aId)) {
        const oldIndex = _.findIndex(character.equipments.artifacts, (item) => item === aId)
        if (oldIndex >= 0) {
          character.equipments.artifacts[oldIndex] = replacedEcho
        }
      }
      if (i === index) {
        character.equipments.artifacts[type - 1] = aId
      }
    })
    this.characters[index] = { ...this.characters[index] }
  }

  hydrateCharacters = (data: ITeamChar[]) => {
    this.characters = data || Array(3).fill(DefaultCharacter)
  }

  hydrate = (data: TeamStoreType) => {
    if (!data) return

    this.characters = data.characters || Array(3)
  }
}
