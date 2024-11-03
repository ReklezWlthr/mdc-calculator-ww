import {
  EnkaArtifactTypeMap,
  EnkaStatsMap,
  IArtifactEquip,
  IBuild,
  ICharStore,
  ITeamChar,
  PropMap,
  ScannerArtifactTypeMap,
  ScannerStatsMap,
  Stats,
} from '@src/domain/constant'
import _ from 'lodash'
import { findCharacter } from './finder'
import { CharacterKeyMap } from '@src/domain/scanner'
import { ArtifactSets } from '@src/data/db/artifacts'
import { Weapons } from '@src/data/db/weapons'

const travelerId = [503, 504, 506, 507, 508, 703, 704, 706, 707, 708]

export const toPercentage = (value: number, precision: number = 1) => {
  return _.floor(value * 100, precision).toLocaleString() + '%'
}

export const toLocalStructure = (rawData: Record<string, any>) => {
  if (!rawData) return null
  const displayChars = rawData.avatarInfoList
  const charData: ITeamChar[] = _.map<any, ITeamChar>(displayChars, (item) => {
    const weapon = _.find(item.equipList, 'weapon')
    const weaponId = weapon?.itemId?.toString()
    const talents = _.map<number>(item.skillLevelMap)
    const artifacts = _.map(_.filter(item.equipList, 'reliquary'), (a) => (a ? crypto.randomUUID() : null))
    return {
      level: parseInt(item.propMap[PropMap.level].val),
      ascension: parseInt(item.propMap[PropMap.ascension].val),
      cons: _.size(item.talentIdList || []),
      cId: _.includes(travelerId, item.skillDepotId)
        ? item.skillDepotId > 700
          ? `${item.avatarId - 2}-${item.skillDepotId - 200}`
          : `${item.avatarId}-${item.skillDepotId}`
        : item.avatarId.toString(),
      equipments: {
        weapon: {
          wId: weaponId,
          refinement: parseInt(weapon?.weapon?.affixMap?.['1' + weaponId]) + 1,
          ascension: parseInt(weapon?.weapon?.promoteLevel) || 0,
          level: parseInt(weapon?.weapon?.level),
        },
        artifacts,
      },
      talents: {
        normal: talents[0],
        skill: talents[1],
        burst: talents[2],
      },
    }
  })
  const artifactData: IArtifactEquip[] = _.flatMap<any, IArtifactEquip>(displayChars, (item, i: number) =>
    _.map<any, IArtifactEquip>(_.filter(item.equipList, 'reliquary'), (artifact, aI) => {
      return {
        id: charData[i]?.equipments?.artifacts?.[aI],
        setId: artifact.flat.setNameTextMapHash,
        level: artifact.reliquary.level - 1,
        type: EnkaArtifactTypeMap[artifact.flat.equipType],
        main: EnkaStatsMap[artifact.flat.reliquaryMainstat.mainPropId],
        quality: artifact.flat.rankLevel,
        subList: _.map(artifact.flat.reliquarySubstats, (sub) => ({
          stat: EnkaStatsMap[sub.appendPropId],
          value: sub.statValue,
        })),
      }
    })
  )
  return { charData, artifactData }
}

export const fromScanner = (rawData: Record<string, any>) => {
  if (!rawData || rawData.format !== 'GOOD') return null
  const displayChars = rawData.characters
  const weapons = rawData.weapons
  const relics = _.map(rawData.artifacts, (r) => ({ ...r, id: crypto.randomUUID() }))
  const charData: ICharStore[] = _.map<any, ICharStore>(displayChars, (item) => {
    const cId = _.find(CharacterKeyMap, (c) => c.key === item.key)?.id
    return {
      level: item.level,
      ascension: item.ascension,
      cons: item.constellation,
      cId,
      talents: item.talent,
    }
  })
  const artifactData: IArtifactEquip[] = _.map<any, IArtifactEquip>(relics, (r) => {
    const set = _.find(ArtifactSets, (item) => item.name.replaceAll(/\W/g, '') === r.setKey)
    return {
      id: r.id,
      setId: set?.id,
      level: r.level,
      type: ScannerArtifactTypeMap[r.slotKey],
      main: ScannerStatsMap[r.mainStatKey],
      quality: r.rarity,
      subList: _.map(r.substats, (sub) => ({
        stat: ScannerStatsMap[sub.key],
        value: _.round(sub.value, 1),
      })),
    }
  })
  const buildData: IBuild[] = _.map<any, IBuild>(displayChars, (item) => {
    const cId = _.find(CharacterKeyMap, (c) => c.key === item.key)?.id
    const equippedWeapon = _.find(weapons, (l) => l.location === item.key)
    const weaponData = _.find(Weapons, (item) => item.name.replaceAll(/\W/, '') === equippedWeapon?.key)
    const equipped = _.filter(relics, (r) => r.location === item.id).sort(
      (a, b) => ScannerArtifactTypeMap[a.slotKey] - ScannerArtifactTypeMap[b.slotKey]
    )
    return equippedWeapon && weaponData
      ? {
          id: crypto.randomUUID(),
          cId,
          name: findCharacter(cId)?.name + "'s Build",
          isDefault: true,
          artifacts: _.map(
            Array(6),
            (_v, i) => _.find(equipped, (item) => ScannerArtifactTypeMap[item.slotKey] === i + 1)?.id || null
          ),
          weapon: {
            wId: weaponData.id,
            ascension: equippedWeapon.ascension,
            refinement: equippedWeapon.refinement,
            level: equippedWeapon.level,
          },
        }
      : null
  }).filter((value) => !!value)

  return { charData, artifactData, buildData }
}
