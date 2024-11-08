import { Element, IArtifactEquip, ITeamChar, Stats, TalentProperty } from '@src/domain/constant'
import { StatsObject } from '../../baseConstant'
import { formatWeaponString, getSetCount } from '@src/core/utils/data_format'
import _ from 'lodash'
import { ArtifactForm } from './artifact_form'
import { checkBuffExist, findCharacter, findEcho } from '@src/core/utils/finder'
import { Sonata } from '@src/data/db/artifacts'
import { IContent } from '@src/domain/conditional'

export const getArtifactConditionals = (id: string, artifacts: IArtifactEquip[]) => {
  const rover = ['1501', '1604']
  const setBonus = getSetCount(artifacts)
  const mainEcho = artifacts?.[0]?.setId
  const { content, teamContent, allyContent } = ArtifactForm(_.includes(rover, id))
  const set = _.findKey(setBonus, (item) => item >= 5)

  const format = (array: IContent[]) =>
    _.map(
      _.filter(array, (item) => _.includes(item.id, set) || _.includes(item.id, mainEcho)),
      (item) => ({
        ...item,
        content: formatWeaponString(item.content, findEcho(mainEcho)?.properties, artifacts?.[0]?.quality),
      })
    )
  return {
    content: format(content),
    teamContent: format(teamContent),
    allyContent: format(allyContent),
  }
}

export const calculateArtifact = (base: StatsObject, form: Record<string, any>, team: ITeamChar[], index: number) => {
  if (form[Sonata.ATK]) {
    base[Stats.ATK].push({
      name: `5 Piece`,
      source: Sonata.ATK,
      value: 0.05 * form[Sonata.ATK],
    })
  }
  if (form[Sonata.FIRE]) {
    base[Stats.FUSION_DMG].push({
      name: `5 Piece`,
      source: Sonata.FIRE,
      value: 0.3,
    })
  }
  if (form[Sonata.ICE]) {
    base[Stats.GLACIO_DMG].push({
      name: `5 Piece`,
      source: Sonata.ICE,
      value: 0.1 * form[Sonata.ICE],
    })
  }
  if (form[Sonata.WIND]) {
    base[Stats.AERO_DMG].push({
      name: `5 Piece`,
      source: Sonata.WIND,
      value: 0.3,
    })
  }
  if (form[Sonata.THUNDER]) {
    base[Stats.ELECTRO_DMG].push({
      name: `5 Piece`,
      source: Sonata.THUNDER,
      value: 0.15 * form[Sonata.THUNDER],
    })
  }
  if (form[Sonata.LIGHT]) {
    base[Stats.SPECTRO_DMG].push({
      name: `5 Piece`,
      source: Sonata.LIGHT,
      value: 0.3,
    })
  }
  if (form[Sonata.HAVOC]) {
    base[Stats.HAVOC_DMG].push({
      name: `5 Piece`,
      source: Sonata.HAVOC,
      value: 0.075 * form[Sonata.HAVOC],
    })
  }
  if (form[Sonata.HEAL]) {
    base[Stats.P_ATK].push({
      name: `5 Piece`,
      source: Sonata.HEAL,
      value: 0.15,
    })
  }
  if (form['6000060']) {
    base[Stats.SKILL_DMG].push({
      name: `Echo Skill`,
      source: 'Jué',
      value: 0.16,
    })
  }
  if (form['6000061']) {
    base[Stats.ER].push({
      name: `Echo Skill`,
      source: 'Fallacy of No Return',
      value: 0.1,
    })
    base[Stats.P_ATK].push({
      name: `Echo Skill`,
      source: 'Fallacy of No Return',
      value: 0.1,
    })
  }
  if (form['6000039']) {
    base[Stats.ELECTRO_DMG].push({
      name: `Echo Skill`,
      source: 'Tempest Mephis',
      value: 0.12,
    })
    base[Stats.HEAVY_DMG].push({
      name: `Echo Skill`,
      source: 'Tempest Mephis',
      value: 0.12,
    })
  }
  if (form['6000042']) {
    base[Stats.HAVOC_DMG].push({
      name: `Echo Skill`,
      source: 'Crownless',
      value: 0.12,
    })
    base[Stats.SKILL_DMG].push({
      name: `Echo Skill`,
      source: 'Crownless',
      value: 0.12,
    })
  }
  if (form['6000043']) {
    base[Stats.AERO_DMG].push({
      name: `Echo Skill`,
      source: 'Feilian Beringal',
      value: 0.12,
    })
    base[Stats.HEAVY_DMG].push({
      name: `Echo Skill`,
      source: 'Feilian Beringal',
      value: 0.12,
    })
  }
  if (form['6000044']) {
    base[Stats.GLACIO_DMG].push({
      name: `Echo Skill`,
      source: 'Lampylumen Myriad',
      value: 0.04 * form['6000044'],
    })
    base[Stats.SKILL_DMG].push({
      name: `Echo Skill`,
      source: 'Lampylumen Myriad',
      value: 0.12 * form['6000044'],
    })
  }
  if (form['6000045']) {
    base[Stats.SPECTRO_DMG].push({
      name: `Echo Skill`,
      source: 'Mourning Aix',
      value: 0.12,
    })
    base[Stats.LIB_DMG].push({
      name: `Echo Skill`,
      source: 'Mourning Aix',
      value: 0.12,
    })
  }
  if (form['6000048']) {
    base[Stats.P_ATK].push({
      name: `Echo Skill`,
      source: 'Mech Abomination',
      value: 0.12,
    })
  }
  if (form['390080003']) {
    base[Stats.ELECTRO_DMG].push({
      name: `Echo Skill`,
      source: 'Thundering Mephis',
      value: 0.12,
    })
    base[Stats.LIB_DMG].push({
      name: `Echo Skill`,
      source: 'Thundering Mephis',
      value: 0.12,
    })
  }
  if (form['390080005']) {
    base[Stats.ALL_DMG].push({
      name: `Echo Skill`,
      source: 'Bell-Borne Geochelone',
      value: 0.1,
    })
  }
  if (form['390080007']) {
    base[Stats.FUSION_DMG].push({
      name: `Echo Skill`,
      source: 'Inferno Rider',
      value: 0.12,
    })
    base[Stats.BASIC_DMG].push({
      name: `Echo Skill`,
      source: 'Inferno Rider',
      value: 0.12,
    })
  }
  if (form['390080007']) {
    base[Stats.FUSION_DMG].push({
      name: `Echo Skill`,
      source: 'Inferno Rider',
      value: 0.12,
    })
    base[Stats.BASIC_DMG].push({
      name: `Echo Skill`,
      source: 'Inferno Rider',
      value: 0.12,
    })
  }
  if (form['6000053']) {
    base.CALLBACK.push(function (x) {
      _.map(x.ECHO_SCALING, (item) => ({ ...item, bonus: item.bonus + 0.5 }))
    })
  }

  return base
}

export const calculateTeamArtifact = (base: StatsObject, form: Record<string, any>, index: number) => {
  if (form[Sonata.HEAL]) {
    base[Stats.P_ATK].push({
      name: `5 Piece`,
      source: Sonata.HEAL,
      value: 0.15,
    })
  }
  if (form[`${Sonata.REGEN}_${index}`]) {
    base[Stats.P_ATK].push({
      name: `5 Piece`,
      source: Sonata.REGEN,
      value: 0.225,
    })
  }
  if (form['6000061']) {
    base[Stats.P_ATK].push({
      name: `Echo Skill`,
      source: 'Fallacy of No Return',
      value: 0.1,
    })
  }
  if (form[`6000052_${index}`]) {
    base[Stats.ALL_DMG].push({
      name: `Echo Skill`,
      source: 'Impermanence Heron',
      value: 0.12,
    })
  }

  return base
}
