import { MainStatValue, QualityMultiplier } from '@src/domain/artifact'
import { Element, IArtifactEquip, ICharacter, ITeamChar, Stats } from '@src/domain/constant'
import {
  DefScaling,
  FlatScaling,
  HealScaling,
  NormalScaling,
  TalentScaling,
  WeaponScaling,
  WeaponSecondaryScaling,
} from '@src/domain/scaling'
import _ from 'lodash'
import { findCharacter } from './finder'

export const findBaseLevel = (ascension: number) => {
  if (ascension < 0 || ascension > 6) return 0
  if (ascension === 0) return 1
  if (ascension === 1) return 20
  return (ascension + 2) * 10
}

export const findMaxLevel = (ascension: number) => {
  if (ascension < 0 || ascension > 6) return 0
  if (ascension === 0) return 20
  if (ascension === 1) return 40
  return findBaseLevel(ascension) + 10
}

export const isLevelInRange = (ascension: number, level: number) => {
  const low = findBaseLevel(ascension)
  const high = findMaxLevel(ascension)
  return level >= low && level <= high
}

export const getBaseStat = (type: string, base: number, level: number = 1, ascension: number = 0) => {
  const scaling = NormalScaling
  const ascBonus =
    base * (type === Stats.ATK ? (ascension >= 5 ? 3 + (ascension - 4) / 2 : 0.75 * ascension) : (2 / 3) * ascension)
  return base * scaling[level - 1] + ascBonus
}

export const getBaseDef = (base: number, level: number = 1, ascension: number = 0) => {
  const scaling = DefScaling
  const ascBonus = base * 0.6481
  return base * scaling[level - 1] + ascBonus * ascension
}

export const getWeaponBase = (base: number, level: number = 0, ascension: number = 0) => {
  return getBaseStat(Stats.HP, base, level, ascension)
}

export const getWeaponBonus = (base: number, level: number) => {
  const index = _.floor(level / 5)
  const scaling = WeaponSecondaryScaling[index]
  return base * scaling
}

export const getMainStat = (main: Stats, quality: number, level: number, cost: number) => {
  const entry = _.find(MainStatValue, (item) => item.cost === cost && _.includes(item.stat, main))
  const actualBase = entry?.values * QualityMultiplier[quality]
  const maxValue = actualBase * 5
  const step = (maxValue - actualBase) / 25
  return actualBase + step * level
}

export const getSetCount = (artifacts: IArtifactEquip[]) => {
  const unique = _.uniqBy(artifacts, (item) => item?.setId)
  const setBonus: Record<string, number> = _.reduce(
    unique,
    (acc, curr) => {
      if (!curr) return acc
      acc[curr.sonata] ? (acc[curr.sonata] += 1) : (acc[curr.sonata] = 1)
      return acc
    },
    {}
  )
  return setBonus
}

export const getResonanceCount = (chars: ITeamChar[]) => {
  if (_.size(chars) < 4) return {}
  const charData = _.map(chars, (item) => findCharacter(item.cId))
  const setBonus: Record<string, number> = _.reduce(
    charData,
    (acc, curr) => {
      if (!curr) return acc
      acc[curr.element] ? (acc[curr.element] += 1) : (acc[curr.element] = 1)
      return acc
    },
    {}
  )
  return setBonus
}

export const calcScaling = (base: number, level: number) => {
  return base * TalentScaling[level - 1]
}

export const calcRefinement = (base: number, growth: number, refinement: number) => {
  return base + growth * (refinement - 1)
}

export const calcFlatScaling = (base: number, level: number) => {
  return base * FlatScaling[level - 1]
}

export const calcHealScaling = (base: number, level: number) => {
  return base * HealScaling[level - 1]
}

export const calcAmplifying = (em: number) => {
  return 2.78 * (em / (em + 1400))
}

export const calcAdditive = (em: number) => {
  return (em * 5) / (em + 1200)
}

export const calcTransformative = (em: number) => {
  return 16 * (em / (em + 2000))
}

export const formatWeaponString = (
  detail: string,
  properties: {
    base: number
    growth: number
  }[],
  r: number,
  showMax?: boolean
) =>
  _.reduce(
    Array.from(detail?.matchAll(/{{\d+}}\%?/g) || []),
    (acc, curr) => {
      const index = curr?.[0]?.match(/\d+/)?.[0]
      const isPercentage = !!curr?.[0]?.match(/\%$/)
      return _.replace(
        acc,
        curr[0],
        showMax
          ? `<span class="text-blue">${_.floor(properties[index].base + properties[index].growth * (r - 1), 2)}${
              isPercentage ? '%' : ''
            }</span> <span class="text-desc">(${_.floor(properties[index].base + properties[index].growth * 4, 2)}${
              isPercentage ? '%' : ''
            })</span>`
          : `<span class="text-desc">${_.floor(properties[index].base + properties[index].growth * (r - 1), 2)}${
              isPercentage ? '%' : ''
            }</span>`
      )
    },
    detail
  )

export const swapElement = (array: any[], index1: number, index2: number) => {
  ;[array[index1], array[index2]] = [array[index2], array[index1]]
  return array
}

export const padArray = (array: any[], length: number, fill: any) => {
  return length > array.length ? array.concat(Array(length - array.length).fill(fill)) : array
}

export const romanize = (num: number) => {
  if (isNaN(num)) return NaN
  var digits = String(+num).split(''),
    key = [
      '',
      'C',
      'CC',
      'CCC',
      'CD',
      'D',
      'DC',
      'DCC',
      'DCCC',
      'CM',
      '',
      'X',
      'XX',
      'XXX',
      'XL',
      'L',
      'LX',
      'LXX',
      'LXXX',
      'XC',
      '',
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
    ],
    roman = '',
    i = 3
  while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman
  return Array(+digits.join('') + 1).join('M') + roman
}
