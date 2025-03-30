import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const HRover = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Tuneslayer`,
      content: `<b>Basic Attack</b>
      <br />Rover performs up to 5 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Rover consumes STA to attack, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />Use Basic Attack after casting Heavy Attack to cast Basic Attack 4.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Rover consumes STA to cast a Mid-Air Plunging Attack, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.`,
      image: 'SP_IconNorKnife',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Wingblade`,
      content: `Transform sound into feathers, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.`,
      image: 'SP_IconZhujueDarkB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Deadening Abyss`,
      content: `Rover gathers resonating sounds to attack a target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.`,
      image: 'SP_IconZhujueDarkC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Umbra Eclipse`,
      content: `<b>Devastation</b>
      <br />When <b class="text-wuwa-havoc">Umbra</b> is full, hold Basic Attack to cast <b>Devastation</b> to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>, considered as Heavy Attack DMG.
      <br />
      <br /><b class="text-wuwa-havoc">Dark Surge</b>
      <br />After casting <b>Devastation</b>, Rover enters the <b class="text-wuwa-havoc">Dark Surge</b> state. In this state:
      <br />-Basic Attack is replaced with Enhanced Basic Attack, which performs up to 5 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />-Heavy Attack is replaced with Enhanced Heavy Attack;
      <br />-Use Basic Attack after casting Enhanced Heavy Attack to cast Heavy Attack <b>Thwackblade</b> to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>, considered as Heavy Attack DMG.
      <br />-Use Basic Attack after casting Heavy Attack <b>Thwackblade</b> to cast Enhanced Basic Attack 3 to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>;
      <br />-Resonance Skill <b>Wingblade</b> is replaced with Resonance Skill <b>Lifetaker</b>, transforming sounds into blades to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b class="text-wuwa-havoc">Umbra</b>
      <br />Rover can hold up to <span class="text-desc">100</span> points of <b class="text-wuwa-havoc">Umbra</b>.
      <br />Normal Attack <b>Tuneslayer</b> recovers <b class="text-wuwa-havoc">Umbra</b> on hit.
      <br />Resonance Skill <b>Wingblade</b> recovers <b class="text-wuwa-havoc">Umbra</b> when cast.
      <br />Resonance Skill <b>Lifetaker</b> recovers <b class="text-wuwa-havoc">Umbra</b> when cast.
      <br />Intro Skill <b>Instant of Annihilation</b> recovers <b class="text-wuwa-havoc">Umbra</b> when cast.`,
      image: 'SP_IconZhujueDarkY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Instant of Annihilation`,
      content: `Attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.`,
      image: 'SP_IconZhujueDarkQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Soundweaver`,
      content: `Rover summons a Havoc Field, dealing <b class="text-wuwa-havoc">Havoc DMG</b> of <span class="text-desc">143.3%</span> of Rover's ATK to all targets within the range every <span class="text-desc">2</span>s for <span class="text-desc">6</span>s.`,
      image: 'SP_IconZhujueDarkT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Metamorph`,
      content: `In the Dark Surge state, <b class="text-wuwa-havoc">Havoc DMG Bonus</b> is increased by <span class="text-desc">20%</span>.`,
      image: 'SP_IconZhujueDarkD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Bleak Crescendo`,
      content: `While in the <b class="text-wuwa-havoc">Dark Surge</b> state, Basic Attack recovers <span class="text-desc">1</span> extra Resonance Energy when it hits a target. This effect can be triggered <span class="text-desc">1</span> time per second.`,
      image: 'SP_IconZhujueDarkD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Cryptic Insight`,
      content: `Resonance Skill DMG Bonus is increased by <span class="text-desc">30%</span>.`,
      image: 'T_IconDevice_ZhujueDarkM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Waning Crescent`,
      content: `Reset Resonance Skill's Cooldown when Rover enters the <b class="text-wuwa-havoc">Dark Surge</b> state by casting Heavy Attack <b>Devastation</b>.`,
      image: 'T_IconDevice_ZhujueDarkM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Surging Resonance`,
      content: `In the Dark Surge state, Basic Attack 5 restores HP equal to <span class="text-desc">10%</span> of total HP lost on hit.`,
      image: 'T_IconDevice_ZhujueDarkM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Annihilated Silence`,
      content: `Heavy Attack <b>Devastation</b> and Resonance Liberation <b>Deadening Abyss</b> reduces enemy <b class="text-wuwa-havoc">Havoc RES</b> by <span class="text-desc">10%</span> for <span class="text-desc">20</span>s on hit.`,
      image: 'T_IconDevice_ZhujueDarkM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Aeon Symphony`,
      content: `In the <b class="text-wuwa-havoc">Dark Surge</b> state, Basic Attack 5 deals an additional <b class="text-wuwa-havoc">Havoc DMG</b> equal to <span class="text-desc">50%</span> of Basic Attack 5 DMG.`,
      image: 'T_IconDevice_ZhujueDarkM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Ebbing Undercurrent`,
      content: `In the <b class="text-wuwa-havoc">Dark Surge</b> state, Rover's Crit. Rate is increased by <span class="text-desc">25%</span>.`,
      image: 'T_IconDevice_ZhujueDarkM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'dark_surge',
      text: `Dark Surge`,
      ...talents.forte,
      show: true,
      default: true,
      sync: true,
    },
    {
      type: 'toggle',
      id: 'hmc_c5',
      text: `S5 Havoc RES Shred`,
      ...talents.c5,
      show: c >= 5,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'hmc_c5')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.BASIC_SCALING = [
        {
          name: 'Stage 1 DMG',
          value: [{ scaling: calcScaling(0.285, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.285, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.4275, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(0.2027, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 5 DMG',
          value: [{ scaling: calcScaling(0.475, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.48, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          value: [{ scaling: calcScaling(0.589, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = form.dark_surge
        ? [
            {
              name: 'Umbra: Dodge Counter DMG',
              value: [{ scaling: calcScaling(1.593, forte), multiplier: Stats.ATK }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
            },
          ]
        : [
            {
              name: 'Dodge Counter DMG',
              value: [{ scaling: calcScaling(0.9025, normal), multiplier: Stats.ATK }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
            },
          ]
      base.SKILL_SCALING = [
        {
          name: 'Wingblade DMG',
          value: [{ scaling: calcScaling(0.144, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Deadening Abyss DMG',
          value: [{ scaling: calcScaling(7.65, lib), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Devastation DMG',
          value: [{ scaling: calcScaling(1.1475, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
        },
        {
          name: 'Umbra: Basic Attack Stage 1 DMG',
          value: [{ scaling: calcScaling(0.2835, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Umbra: Basic Attack Stage 2 DMG',
          value: [{ scaling: calcScaling(0.4725, forte), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Umbra: Basic Attack Stage 3 DMG',
          value: [{ scaling: calcScaling(0.783, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Umbra: Basic Attack Stage 4 DMG',
          value: [
            { scaling: calcScaling(0.1868, forte), multiplier: Stats.ATK, hits: 3 },
            { scaling: calcScaling(0.5603, forte), multiplier: Stats.ATK },
          ],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Umbra: Basic Attack Stage 5 DMG',
          value: [
            { scaling: calcScaling(0.1435, forte), multiplier: Stats.ATK, hits: 4 },
            { scaling: calcScaling(0.5738, forte), multiplier: Stats.ATK },
          ],
          element: Element.HAVOC,
          property: TalentProperty.BA,
          multiplier: c >= 5 ? 1.5 : 1,
        },
        {
          name: 'Thwackblade DMG',
          value: [
            { scaling: calcScaling(0.637, forte), multiplier: Stats.ATK },
            { scaling: calcScaling(0.05, forte), multiplier: Stats.ATK, hits: 4 },
          ],
          element: Element.HAVOC,
          property: TalentProperty.HA,
        },
        {
          name: 'Umbra: Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.648, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
        },
        {
          name: 'Umbra: Plunging Attack DMG',
          value: [{ scaling: calcScaling(0.62, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Lifetaker DMG',
          value: [
            { scaling: calcScaling(1.39, forte), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.05, forte), multiplier: Stats.ATK, hits: 4 },
          ],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Instant of Annihilation DMG`,
          value: [{ scaling: calcScaling(1, intro), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.INTRO,
        },
      ]
      base.OUTRO_SCALING = [
        {
          name: `Soundweaver DMG`,
          value: [{ scaling: calcScaling(1.433, intro), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.OUTRO,
        },
      ]

      if (i.i1 && form.dark_surge) {
        base[Stats.HAVOC_DMG].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (c >= 1) {
        base[Stats.SKILL_DMG].push({
          name: `Sequence Node 1`,
          source: 'Self',
          value: 0.3,
        })
      }
      if (form.dark_surge && c >= 6) {
        base[Stats.CRIT_RATE].push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.25,
        })
      }
      if (form.hmc_c5) {
        base.HAVOC_RES_PEN.push({
          name: `Sequence Node 5`,
          source: 'Self',
          value: 0.1,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.hmc_c5) {
        base.HAVOC_RES_PEN.push({
          name: `Sequence Node 5`,
          source: 'Rover (Havoc)',
          value: 0.1,
        })
      }

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

export default HRover
