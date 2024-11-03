import { Element, IArtifactEquip, ITeamChar, Stats, TalentProperty } from '@src/domain/constant'
import { StatsObject } from '../../baseConstant'
import { getSetCount } from '@src/core/utils/data_format'
import _ from 'lodash'
import { ArtifactForm } from './artifact_form'
import { checkBuffExist, findCharacter } from '@src/core/utils/finder'

export const getArtifactConditionals = (artifacts: IArtifactEquip[]) => {
  const setBonus = getSetCount(artifacts)
  const { content, teamContent, halfContent } = ArtifactForm()
  const set = _.findKey(setBonus, (item) => item >= 4)
  const halfSet = _.findKey(setBonus, (item) => item >= 2)

  return {
    content: [
      ..._.filter(content, (item) => _.includes(item.id, set)),
      ..._.filter(halfContent, (item) => _.includes(item.id, halfSet)),
    ],
    teamContent: _.filter(teamContent, (item) => _.includes(item.id, set)),
  }
}

export const calculateArtifact = (base: StatsObject, form: Record<string, any>, team: ITeamChar[], index: number) => {
  if (form['1751039235']) base.BURST_DMG.push({ value: 0.2, name: '4-Piece', source: `Noblesse Oblige` })
  if (form['1541919827']) base.CHARGE_DMG.push({ value: 0.5, name: '4-Piece', source: `Bloodstained Chivalry` })
  if (form['83115355']) base[Stats.I_HEALING].push({ value: 0.2, name: '4-Piece', source: `Maiden Beloved` })
  if (form['1562601179'])
    base[`${form['1562601179'].toUpperCase()}_RES_PEN`].push({
      value: 0.4,
      name: '4-Piece',
      source: `Viridescent Venerer`,
    })
  if (form['2040573235'])
    base[Stats[`${form['2040573235'].toUpperCase()}_DMG`]].push({
      value: 0.35,
      name: '4-Piece',
      source: `Archaic Petra`,
    })
  if (form['1438974835']) {
    base.BASIC_DMG.push({ value: 0.4, name: '4-Piece', source: `Retracing Bolide` })
    base.CHARGE_DMG.push({ value: 0.4, name: '4-Piece', source: `Retracing Bolide` })
  }
  if (form['1873342283']) base[Stats.ALL_DMG].push({ value: 0.35, name: '4-Piece', source: `Thundersoother` })
  if (form['1632377563']) base[Stats.ALL_DMG].push({ value: 0.35, name: '4-Piece', source: `Lavawalker` })
  if (form['1524173875']) {
    const crimsonT = 0.2 * form['1524173875']
    const crimsonA = 0.075 * form['1524173875']

    base.OVERLOAD_DMG.push({ value: crimsonT, name: '4-Piece', source: 'Crimson Witch of Flames' })
    base.BURNING_DMG.push({ value: crimsonT, name: '4-Piece', source: 'Crimson Witch of Flames' })
    base.BURGEON_DMG.push({ value: crimsonT, name: '4-Piece', source: 'Crimson Witch of Flames' })
    base.VAPE_DMG.push({ value: crimsonA, name: '4-Piece', source: 'Crimson Witch of Flames' })
    base.MELT_DMG.push({ value: crimsonA, name: '4-Piece', source: 'Crimson Witch of Flames' })
  }
  if (form['933076627'])
    base[Stats.CRIT_RATE].push({ value: 0.2 * form['933076627'], name: '4-Piece', source: `Blizzard Strayer` })
  if (form['156294403']) {
    base.BASIC_DMG.push({ value: 0.3, name: '4-Piece', source: `Heart of Depth` })
    base.CHARGE_DMG.push({ value: 0.3, name: '4-Piece', source: `Heart of Depth` })
  }
  if (form['1337666507']) {
    base[Stats.P_ATK].push({ value: 0.2, name: '4-Piece', source: `Tenacity of the Millelith` })
    base[Stats.SHIELD].push({ value: 0.3, name: '4-Piece', source: `Tenacity of the Millelith` })
  }
  if (form['862591315'])
    base[Stats.P_ATK].push({ value: 0.09 * form['862591315'], name: '4-Piece', source: `Pale Flame` })
  if (form['4144069251']) {
    base.BASIC_DMG.push({ value: 0.5, name: '4-Piece', source: `Shimenawa's Reminiscence` })
    base.CHARGE_DMG.push({ value: 0.5, name: '4-Piece', source: `Shimenawa's Reminiscence` })
    base.PLUNGE_DMG.push({ value: 0.5, name: '4-Piece', source: `Shimenawa's Reminiscence` })
  }
  if (form['2546254811']) {
    base[Stats.P_DEF].push({ value: 0.06 * form['2546254811'], name: 'Curiosity', source: `Husk of Opulent Dreams` })
    base[Stats.GEO_DMG].push({ value: 0.06 * form['2546254811'], name: 'Curiosity', source: `Husk of Opulent Dreams` })
  }
  if (form['1756609915']) {
    base.CALLBACK.push((x: StatsObject) => {
      x.SKILL_SCALING.push({
        name: 'Sea-Dyed Foam DMG',
        element: Element.PHYSICAL,
        property: TalentProperty.STATIC,
        value: [{ multiplier: Stats.HEAL, scaling: 0.9, override: parseFloat(form['1756609915']) }],
      })
      return x
    })
  }
  if (form['1558036915']) {
    base[Stats.P_ATK].push({ value: 0.08, name: 'Nascent Light', source: `Vermillion Hereafter` })
    if (form['1558036915_2'])
      base[Stats.P_ATK].push({
        value: 0.1 * form['1558036915_2'],
        name: 'Nascent Light',
        source: `Vermillion Hereafter`,
      })
  }
  if (form['3626268211'])
    base.BASIC_F_DMG.push({ value: 0.7 * base.getAtk(), name: 'Valley Rite', source: `Echoes of an Offering` })
  if (form['1675079283']) {
    if (!checkBuffExist(base.DENDRO_RES_PEN, { source: 'Deepwood Memories' }))
      base.DENDRO_RES_PEN.push({ value: 0.3, name: '4-Piece', source: `Deepwood Memories` })
  }
  if (form['4145306051']) {
    const teamElement = _.map(team, (item) => findCharacter(item.cId)?.element)
    const wearer = teamElement[index]
    const sameCount = _.filter(teamElement, (item) => item === wearer).length - 1
    const diffCount = _.filter(teamElement, (item) => item !== wearer).length

    base[Stats.P_ATK].push({ value: 0.14 * sameCount, name: '4-Piece', source: `Gilded Dreams` })
    base[Stats.EM].push({ value: 50 * diffCount, name: '4-Piece', source: `Gilded Dreams` })
  }
  if (form['2538235187']) {
    base.ATK_SPD.push({ value: 0.1, name: '4-Piece', source: `Desert Pavilion Chronicle` })
    base.BASIC_DMG.push({ value: 0.4, name: '4-Piece', source: `Desert Pavilion Chronicle` })
    base.CHARGE_DMG.push({ value: 0.4, name: '4-Piece', source: `Desert Pavilion Chronicle` })
    base.PLUNGE_DMG.push({ value: 0.4, name: '4-Piece', source: `Desert Pavilion Chronicle` })
  }
  if (form['3094139291']) {
    base.BLOOM_DMG.push({ value: form['3094139291'] * 0.1, name: '4-Piece', source: `Flower of Paradise Lost` })
    base.HYPERBLOOM_DMG.push({ value: form['3094139291'] * 0.1, name: '4-Piece', source: `Flower of Paradise Lost` })
    base.BURGEON_DMG.push({ value: form['3094139291'] * 0.1, name: '4-Piece', source: `Flower of Paradise Lost` })
  }
  if (form['1925210475'] === 1) {
    base[Stats.P_ATK].push({ value: 0.07, name: '4-Piece', source: `Nymph's Dream` })
    base[Stats.HYDRO_DMG].push({ value: 0.04, name: '4-Piece', source: `Nymph's Dream` })
  }
  if (form['1925210475'] === 2) {
    base[Stats.P_ATK].push({ value: 0.16, name: '4-Piece', source: `Nymph's Dream` })
    base[Stats.HYDRO_DMG].push({ value: 0.09, name: '4-Piece', source: `Nymph's Dream` })
  }
  if (form['1925210475'] === 3) {
    base[Stats.P_ATK].push({ value: 0.25, name: '4-Piece', source: `Nymph's Dream` })
    base[Stats.HYDRO_DMG].push({ value: 0.15, name: '4-Piece', source: `Nymph's Dream` })
  }
  if (form['235897163']) {
    base.SKILL_DMG.push({ value: 0.08 * form['235897163'], name: '4-Piece', source: `Vourukasha's Glow` })
    base.BURST_DMG.push({ value: 0.08 * form['235897163'], name: '4-Piece', source: `Vourukasha's Glow` })
  }
  if (form['1249831867'])
    base[Stats.CRIT_RATE].push({ value: form['1249831867'] * 0.12, name: '4-Piece', source: `Marechaussee Hunter` })
  if (form['3410220315']) base.SKILL_DMG.push({ value: 0.25, name: '4-Piece', source: `Golden Troupe` })
  if (form['2803305851']) {
    base.BASIC_F_DMG.push({ value: form['2803305851'] * 0.08, name: '4-Piece', source: `Song of Days Past` })
    base.CHARGE_F_DMG.push({ value: form['2803305851'] * 0.08, name: '4-Piece', source: `Song of Days Past` })
    base.PLUNGE_F_DMG.push({ value: form['2803305851'] * 0.08, name: '4-Piece', source: `Song of Days Past` })
    base.SKILL_F_DMG.push({ value: form['2803305851'] * 0.08, name: '4-Piece', source: `Song of Days Past` })
    base.BURST_F_DMG.push({ value: form['2803305851'] * 0.08, name: '4-Piece', source: `Song of Days Past` })
  }
  if (form['279470883']) {
    base[Stats.GEO_DMG].push({ value: 0.2, name: '4-Piece', source: `Nighttime Whispers in the Echoing Woods` })
    if (form['279470883_2'])
      base[Stats.GEO_DMG].push({ value: 0.3, name: '4-Piece', source: `Nighttime Whispers in the Echoing Woods` })
  }
  if (form['1492570003'])
    base[Stats.ALL_DMG].push({
      value: form['1492570003'] * 0.18,
      name: '4-Piece',
      source: `Fragment of Harmonic Whimsy`,
    })
  if (form['352459163'])
    base[Stats.ALL_DMG].push({ value: form['352459163'] * 0.1, name: '4-Piece', source: `Unfinished Reverie` })

  if (form['1383639611'])
    base[`${form['1383639611'].toUpperCase()}_RES`].push({ value: 0.3, name: '4-Piece', source: `Tiny Miracle` })
  if (form['855894507']) base[Stats.CRIT_RATE].push({ value: 0.24, name: '4-Piece', source: `Berserker` })
  if (form['3890292467']) base[Stats.EM].push({ value: 120, name: '4-Piece', source: `Instructor` })
  if (form['3535784755']) base[Stats.ALL_DMG].push({ value: 0.3, name: '4-Piece', source: `Brave Heart` })
  if (form['2890909531']) {
    base.BASIC_DMG.push({ value: 0.25, name: '4-Piece', source: `Martial Artist` })
    base.CHARGE_DMG.push({ value: 0.25, name: '4-Piece', source: `Martial Artist` })
  }
  if (form['1774579403']) base[Stats.ALL_DMG].push({ value: 0.15, name: '2-Piece', source: `Obsidian Codex` })
  if (form['1774579403_2']) base[Stats.CRIT_RATE].push({ value: 0.4, name: '4-Piece', source: `Obsidian Codex` })
  if (form['2949388203']) {
    _.forEach(form['2949388203'], (e) => {
      base[`${e} DMG%`].push({
        value: 0.12 + (form['2949388203_2'] ? 0.28 : 0),
        name: '4-Piece',
        source: `Scroll of the Hero of Cinder City`,
      })
    })
  }

  return base
}

export const calculateTeamArtifact = (base: StatsObject, form: Record<string, any>) => {
  if (form['1751039235']) base.BURST_DMG.push({ value: 0.2, name: '4-Piece', source: `Noblesse Oblige` })
  if (form['83115355']) base[Stats.I_HEALING].push({ value: 0.2, name: '4-Piece', source: `Maiden Beloved` })
  if (form['1562601179'])
    base[`${form['1562601179'].toUpperCase()}_RES_PEN`].push({
      value: 0.4,
      name: '4-Piece',
      source: `Viridescent Venerer`,
    })
  if (form['2040573235'])
    base[Stats[`${form['2040573235'].toUpperCase()}_DMG`]].push({
      value: 0.35,
      name: '4-Piece',
      source: `Archaic Petra`,
    })
  if (form['1337666507']) {
    base[Stats.P_ATK].push({ value: 0.2, name: '4-Piece', source: `Tenacity of the Millelith` })
    base[Stats.SHIELD].push({ value: 0.3, name: '4-Piece', source: `Tenacity of the Millelith` })
  }
  if (form['1756609915']) {
    base.SKILL_SCALING.push({
      name: 'Sea-Dyed Foam DMG',
      element: Element.PHYSICAL,
      property: TalentProperty.STATIC,
      value: [{ multiplier: Stats.ATK, scaling: 0 }],
      flat: parseFloat(form['2546254811']) * 0.9,
    })
  }
  if (form['1675079283']) {
    if (!checkBuffExist(base.DENDRO_RES_PEN, { source: 'Deepwood Memories' }))
      base.DENDRO_RES_PEN.push({ value: 0.3, name: '4-Piece', source: `Deepwood Memories` })
  }
  if (form['2803305851']) {
    base.BASIC_F_DMG.push({ value: form['2803305851'] * 0.08, name: '4-Piece', source: `Song of Days Past` })
    base.CHARGE_F_DMG.push({ value: form['2803305851'] * 0.08, name: '4-Piece', source: `Song of Days Past` })
    base.PLUNGE_F_DMG.push({ value: form['2803305851'] * 0.08, name: '4-Piece', source: `Song of Days Past` })
    base.SKILL_F_DMG.push({ value: form['2803305851'] * 0.08, name: '4-Piece', source: `Song of Days Past` })
    base.BURST_F_DMG.push({ value: form['2803305851'] * 0.08, name: '4-Piece', source: `Song of Days Past` })
  }
  if (form['3890292467']) base[Stats.EM].push({ value: 120, name: '4-Piece', source: `Instructor` })
  if (form['2949388203']) {
    _.forEach(form['2949388203'], (e) => {
      base[`${e} DMG%`].push({
        value: 0.12 + (form['2949388203_2'] ? 0.28 : 0),
        name: '4-Piece',
        source: `Scroll of the Hero of Cinder City`,
      })
    })
  }

  return base
}
