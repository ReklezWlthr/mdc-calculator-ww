import { IArtifactEquip, ITeamChar } from '@src/domain/constant'
import _ from 'lodash'
import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export interface ImportStoreType {
  characters: ITeamChar[]
  artifacts: IArtifactEquip[]
  setValue: <k extends keyof this>(key: k, value: this[k]) => void
  hydrate: (data: ImportStoreType) => void
}

export class ImportStore {
  characters: ITeamChar[]
  artifacts: IArtifactEquip[]

  constructor() {
    this.characters = []
    this.artifacts = []

    makeAutoObservable(this)
  }

  setValue = <k extends keyof this>(key: k, value: this[k]) => {
    this[key] = value
  }

  hydrate = (data: ImportStoreType) => {
    if (!data) return

    this.characters = data.characters || Array(4)
  }
}
