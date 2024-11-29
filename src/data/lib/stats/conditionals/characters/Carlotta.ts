import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Carlotta = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconNorGun',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconKelaitaB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconKelaitaC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconKelaitaY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconKelaitaQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconKelaitaT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconKelaitaD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `N/A`,
      content: `N/A`,
      image: 'SP_IconKelaitaD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `N/A`,
      content: `N/A`,
      image: 'T_IconDevice_KelaitaM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `N/A`,
      content: `N/A`,
      image: 'T_IconDevice_KelaitaM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `N/A`,
      content: `N/A`,
      image: 'T_IconDevice_KelaitaM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `N/A`,
      content: `N/A`,
      image: 'T_IconDevice_KelaitaM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `N/A`,
      content: `N/A`,
      image: 'T_IconDevice_KelaitaM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `N/A`,
      content: `N/A`,
      image: 'T_IconDevice_KelaitaM6_UI',
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
          value: [{ scaling: calcScaling(0.272, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Basic Attack 2 DMG',
          value: [
            { scaling: calcScaling(0.1989, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.2652, normal), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Basic Attack 3 DMG',
          value: [{ scaling: calcScaling(0.3315, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Basic Attack 4 DMG',
          value: [
            { scaling: calcScaling(0.3022, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.3694, normal), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Basic Attack 5 DMG',
          value: [
            { scaling: calcScaling(0.7038, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1173, normal), multiplier: Stats.ATK, hits: 4 },
          ],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [
            { scaling: calcScaling(0.1148, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.1148, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.306, normal), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.HA,
        },
        {
          name: 'Full Charge Heavy Attack DMG',
          value: [
            { scaling: calcScaling(0.1722, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.1722, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.459, normal), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack 1 DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.527, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Mid-Air Attack 2 DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.5432, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [
            { scaling: calcScaling(0.522, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.6919, normal), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Skill 1 DMG',
          value: [{ scaling: calcScaling(0.4641, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Skill 2 DMG',
          value: [
            { scaling: calcScaling(0.363, skill), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(1.089, skill), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Liberation 1 DMG',
          value: [{ scaling: calcScaling(3.832, lib), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Liberation 2 DMG',
          value: [{ scaling: calcScaling(1.7474, lib), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Liberation 3 DMG',
          value: [{ scaling: calcScaling(0.138, lib), multiplier: Stats.ATK, hits: 4 }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Liberation 4 DMG',
          value: [{ scaling: calcScaling(6.1312, lib), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Forte DMG',
          value: [
            { scaling: calcScaling(0.3362, forte), multiplier: Stats.ATK, hits: 5 },
            { scaling: calcScaling(2.5211, forte), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.HA,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Intro DMG`,
          value: [{ scaling: calcScaling(1.4, intro), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.INTRO,
        },
      ]
      base.OUTRO_SCALING = [
        {
          name: `Outro 1 DMG`,
          value: [{ scaling: 7.2201, multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.OUTRO,
        },
        {
          name: `Outro 2 DMG`,
          value: [{ scaling: 7.7967, multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.OUTRO,
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

export default Carlotta
