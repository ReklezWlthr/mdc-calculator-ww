import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Roccia = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconNorFist',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconLuokekeB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconLuokekeC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconLuokekeY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconLuokekeQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconLuokekeT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconLuokekeD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconLuokekeD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `N/A`,
      content: `N/A`,
      image: 'T_IconDevice_LuokekeM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `N/A`,
      content: `N/A`,
      image: 'T_IconDevice_LuokekeM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `N/A`,
      content: `N/A`,
      image: 'T_IconDevice_LuokekeM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `N/A`,
      content: `N/A`,
      image: 'T_IconDevice_LuokekeM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `N/A`,
      content: `N/A`,
      image: 'T_IconDevice_LuokekeM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `N/A`,
      content: `N/A`,
      image: 'T_IconDevice_LuokekeM6_UI',
    },
  }

  const content: IContent[] = []

  const teammateContent: IContent[] = []

  return {
    talents,
    content,
    teammateContent,
    allyContent: [],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.BASIC_SCALING = [
        {
          name: 'Basic Attack 1 DMG',
          value: [{ scaling: calcScaling(0.3681, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Basic Attack 2 DMG',
          value: [{ scaling: calcScaling(0.1919, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Basic Attack 3 DMG',
          value: [
            { scaling: calcScaling(0.17, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.51, normal), multiplier: Stats.ATK },
          ],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Basic Attack 4 DMG',
          value: [{ scaling: calcScaling(0.5141, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.85, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.527, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.3466, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Skill DMG',
          value: [{ scaling: calcScaling(0.3092, skill), multiplier: Stats.ATK, hits: 8 }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Liberation DMG',
          value: [{ scaling: calcScaling(1.4, lib), multiplier: Stats.ATK, hits: 3 }],
          element: Element.HAVOC,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Forte 1 DMG',
          value: [{ scaling: calcScaling(1.62, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Forte 2 DMG',
          value: [{ scaling: calcScaling(1.71, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Forte 3 DMG',
          value: [{ scaling: calcScaling(1.862, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Intro DMG`,
          value: [{ scaling: calcScaling(0.85, intro), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.INTRO,
        },
      ]

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      return base
    },
    postCompute: (
      base: StatsObject,
      form: Record<string, any>,
      allBase: StatsObject[],
      allForm: Record<string, any>[]
    ) => {
      return base
    },
  }
}

export default Roccia
