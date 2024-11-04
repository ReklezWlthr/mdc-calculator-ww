import { getBaseDef, getBaseStat, getMainStat, getSetCount, getWeaponBase, getWeaponBonus } from '../utils/data_format'
import _ from 'lodash'
import { Element, IArtifactEquip, ITeamChar, IWeaponEquip, Stats, WeaponType } from '@src/domain/constant'
import { findCharacter, findWeapon } from '../utils/finder'
import { Echoes } from '@src/data/db/artifacts'
import { baseStatsObject, StatsObject } from '@src/data/lib/stats/baseConstant'
import WeaponBonus from '@src/data/lib/stats/conditionals/weapons/weapon_bonus'

export const calculateOutOfCombat = (
  conditionals: StatsObject,
  selected: number,
  team: ITeamChar[],
  artifacts: IArtifactEquip[],
  applyResonance: boolean,
  includeTeam: boolean
) => {
  if (!_.size(team) || !team?.[selected]) return conditionals
  const base = calculateBase(conditionals, team[selected], team[selected]?.equipments?.weapon, includeTeam ? team : [])
  const final = addArtifactStats(base, artifacts)

  return final
}

export const calculateFinal = (conditionals: StatsObject) => {
  const cb = conditionals.CALLBACK
  let x = conditionals
  _.forEach(cb, (item) => {
    x = item(x, [])
  })
  return x
}

export const calculateBase = (conditionals: StatsObject, char: ITeamChar, weapon: IWeaponEquip, team: ITeamChar[]) => {
  const character = findCharacter(char?.cId)
  const weaponData = findWeapon(weapon?.wId)

  const charBaseAtk = getBaseStat(Stats.ATK, character?.stat?.baseAtk, char?.level, char?.ascension)
  const weaponBaseAtk = getWeaponBase(weaponData?.baseAtk, weapon?.level, weapon?.ascension)
  const weaponSecondary = getWeaponBonus(weaponData?.baseStat, weapon?.level)
  const weaponBonus = _.find(WeaponBonus, (item) => item.id === weapon?.wId)

  conditionals.NAME = character?.name?.replaceAll(/\(\w+\)/g, '')?.trim()
  conditionals.ELEMENT = character?.element
  conditionals.WEAPON = character?.weapon
  conditionals.MAX_ENERGY = 0

  // Get Base
  conditionals.BASE_ATK = charBaseAtk + weaponBaseAtk
  conditionals.BASE_ATK_C = charBaseAtk
  conditionals.BASE_ATK_L = weaponBaseAtk
  conditionals.BASE_HP = getBaseStat(Stats.HP, character?.stat?.baseHp, char?.level, char?.ascension)
  conditionals.BASE_DEF = getBaseDef(character?.stat?.baseDef, char?.level, char?.ascension, character?.rarity)

  // Get Ascension
  conditionals[weaponData?.ascStat]?.push({
    value: weaponSecondary,
    source: weaponData?.name,
    name: 'Secondary Stat',
  })

  conditionals = weaponBonus?.scaling(conditionals, weapon?.refinement, team) || conditionals

  return conditionals
}

export const addArtifactStats = (conditionals: StatsObject, artifacts: IArtifactEquip[]) => {
  const setBonus = getSetCount(artifacts)
  const main = _.reduce(
    artifacts,
    (acc, curr) => {
      if (!acc[curr?.main]) acc[curr?.main] = 0
      acc[curr?.main] += getMainStat(curr.main, curr.quality, curr.level, curr.cost)
      return acc
    },
    {} as Record<Stats, number>
  )
  _.forEach(main, (item, key) => {
    conditionals[key]?.push({
      name: `Main Stat`,
      source: 'Artifact',
      value: item,
    })
  })
  const sub = _.reduce(
    _.flatMap(artifacts, (item) => item.subList),
    (acc, curr) => {
      if (!acc[curr?.stat]) acc[curr?.stat] = 0
      acc[curr?.stat] += curr.value / (_.includes([Stats.ATK, Stats.HP], curr?.stat) ? 1 : 100)
      return acc
    },
    {} as Record<Stats, number>
  )
  _.forEach(sub, (item, key) => {
    conditionals[key]?.push({
      name: `Sub Stat`,
      source: 'Artifact',
      value: item,
    })
  })

  return conditionals
}

export const getTeamOutOfCombat = (chars: ITeamChar[], artifacts: IArtifactEquip[]) => {
  const applyRes = _.size(_.filter(chars, (item) => !!item.cId)) >= 4
  return _.map(Array(4), (_v, i) =>
    calculateOutOfCombat(
      _.cloneDeep(baseStatsObject),
      i,
      chars,
      _.filter(artifacts, (item) => _.includes(chars?.[i]?.equipments?.artifacts, item.id)),
      applyRes,
      true
    )
  )
}
