import { ArtifactSets } from '@src/data/db/artifacts'
import { Characters as GIChar } from '@src/data/db/characters'
import { EnemyGroups } from '@src/data/db/enemies'
import { Weapons } from '@src/data/db/weapons'
import { StatsArray } from '@src/data/lib/stats/baseConstant'
import _ from 'lodash'

export const findWeapon = (wId: string) => _.find(Weapons, (item) => item.id === wId)

export const findCharacter = (cId: string) => _.find(GIChar, (item) => item.id === cId)

export const findArtifactSet = (id: string) => _.find(ArtifactSets, (item) => item.id === id)

export const findEnemy = (name: string) => _.find(EnemyGroups, (item) => item.name === name)

export const findContentById = (content: any[], id: string) => _.find(content, ['id', id])

export const isSubsetOf = (a: any[], b: any[]) => _.every(a, (item) => _.includes(b, item))

export const checkBuffExist = (array: StatsArray[], predicate: Partial<StatsArray>) =>
  _.size(_.filter(array, (item) => _.every(predicate, (value, key) => item[key] === value))) >= 1

export const compareWeight = (a: string, b: string) => {
  const aWeight = a ? Number(a.replaceAll('P', '').replaceAll('N', '-')) : 0
  const bWeight = b ? Number(b.replaceAll('P', '').replaceAll('N', '-')) : 0

  return aWeight - bWeight
}

export const findValidName = (names: string[], name: string, count: number = 0) => {
  if (_.some(names, (n) => (count > 0 ? n === `${name} (${count})` : n === name))) {
    return findValidName(names, name, count + 1)
  } else {
    return count > 0 ? `${name} (${count})` : name
  }
}

export const checkInclusiveKey = (form: Record<string, any>, id: string) =>
  _.some(form, (value, key) => !!value && _.startsWith(key, id))
