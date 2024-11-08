import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Zhezhi = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Dimming Brush`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 3 consecutive attacks, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Consume STA to perform an attack, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />Heavy Attack does not reset the Basic Attack cycle.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Consume STA to perform up to 2 consecutive attacks while in mid-air, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.`,
      image: 'SP_IconNorMagic',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Manifestation`,
      content: `Deal <b class="text-wuwa-glacio">Glacio DMG</b>. If <b class="text-blue">Afflatus</b> is no less than <span class="text-desc">60</span>, consume <span class="text-desc">60</span> <b class="text-blue">Afflatus</b> to summon <b>Phantasmic Imprint - Left</b> and <b>Phantasmic Imprint - Right</b>.
      <br />-Press the button on the ground to summon the <b>Phantasmic Imprints</b> on the ground.
      <br />-Hold the button on the ground or press the button in mid-air to summon the <b>Phantasmic Imprints</b> in mid-air.`,
      image: 'SP_IconZhezhiB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Living Canvas`,
      content: `Summon <b class="text-cyan-500">Inklit Spirit</b> for assistance.
      <br />Can be cast in mid-air.
      <br />
      <br /><b class="text-cyan-500">Inklit Spirit</b>
      <br />When the active Resonator deals DMG, an <b class="text-cyan-500">Inklit Spirit</b> will be summoned to perform a Coordinated Attack, dealing <b class="text-wuwa-glacio">Glacio DMG</b>, considered as Basic Attack DMG.
      <br />-For <span class="text-desc">3</span>s after dealing DMG, <span class="text-desc">1</span> <b class="text-cyan-500">Inklit Spirit</b> is summoned per second. This effect can trigger once per second. Damage dealt by an <b class="text-cyan-500">Inklit Spirit</b> does not trigger this effect.
      <br />-Up to <span class="text-desc">1</span> <b class="text-cyan-500">Inklit Spirit</b> can be summoned every second, and up to <span class="text-desc">21</span> in total.
      <br />-This effect lasts for <span class="text-desc">30</span>s, or until max <b class="text-cyan-500">Inklit Spirit</b> are summoned.`,
      image: 'SP_IconZhezhiC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Ink and Wash`,
      content: `<b>Phantasmic Imprint</b>
      <br />Zhezhi may summon <b>Phantasmic Imprints</b> at the cost of Afflatus when casting Resonance Skill <b>Manifestation</b> or Heavy Attack <b>Conjuration</b>.
      <br />Up to <span class="text-desc">1</span> of each of <b>Phantasmic Imprint - Left</b>, <b>Phantasmic Imprint - Middle</b>, and <b>Phantasmic Imprint - Right</b> can exist at the same time, each lasting for <span class="text-desc">15</span>s.
      <br />
      <br /><b>Heavy Attack - Conjuration</b>
      <br />The 5 moves below consume STA to perform <b>Conjuration</b> to attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />-Hold the Normal Attack button shortly after Basic Attack Stage 3.
      <br />-Press the Normal Attack button shortly after casting Resonance Skill <b>Manifestation</b>.
      <br />-Hold the Normal Attack button shortly after casting Resonance Skill <b>Stroke of Genius</b> or Resonance Skill <b>Creation's Zenith</b>.
      <br />-Hold the Normal Attack button while in mid-air.
      <br />-Hold the Normal Attack button after a successful Dodge.
      <br />If Zhezhi has at least <span class="text-desc">30</span> <b class="text-blue">Afflatus</b> when performing any of these, consume <span class="text-desc">30</span> <b class="text-blue">Afflatus</b> to summon a <b>Phantasmic Imprint - Middle</b>.
      <br />
      <br /><b>Resonance Skill - Stroke of Genius</b>
      <br />When a <b>Phantasmic Imprint</b> is nearby, the Resonance Skill is replaced with <b>Stroke of Genius</b>, which can be cast while in mid-air. When it is cast, Zhezhi will:
      <br />-Move to the location of the <b>Phantasmic Imprint</b>, remove it, and then summon an <b>Ivory Herald</b> to attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b>, considered as Basic Attack DMG. Refresh the mid-air Dodge attempts if the target <b>Phantasmic Imprint</b> is in mid-air.
      <br />-Gain <span class="text-desc">1</span> stack of <b class="text-desc">Painter's Delight</b>, lasting for <span class="text-desc">8</span>s and stacking up to <span class="text-desc">2</span> times.
      <br />
      <br /><b>Resonance Skill - Creation's Zenith</b>
      <br />When a <b>Phantasmic Imprint</b> is nearby and there are <span class="text-desc">2</span> stacks of <b class="text-desc">Painter's Delight</b>, <b>Stroke of Genius</b> is replaced with <b>Creation's Zenith</b>, which can be cast while in mid-air. When it is cast, Zhezhi will:
      <br />-Lose all stacks of <b class="text-desc">Painter's Delight</b>
      <br />-Move to the location of the <b>Phantasmic Imprint</b>, remove it, and then summon an <b>Ivory Herald</b> to attack the target, dealing greater <b class="text-wuwa-glacio">Glacio DMG</b>, considered as Basic Attack DMG, additionally increasing the Basic Attack DMG Bonus by <span class="text-desc">18%</span> for <span class="text-desc">27</span>s. Refresh the mid-air Dodge attempts if the target <b>Phantasmic Imprint</b> is in mid-air.
      <br />
      <br /><b class="text-blue">Afflatus</b>
      <br />Zhezhi can hold up to <span class="text-desc">90</span> <b class="text-blue">Afflatus</b>.
      <br />Normal Attacks grant <b class="text-blue">Afflatus</b> on hit.
      <br />Casting Intro Skill grants <b class="text-blue">Afflatus</b>.`,
      image: 'SP_IconZhezhiY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Radiant Ruin`,
      content: `Attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.`,
      image: 'SP_IconZhezhiQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Carve and Draw`,
      content: `The incoming Resonator has their <b class="text-wuwa-glacio">Glacio DMG Amplified</b> by <span class="text-desc">20%</span> and Resonance Skill DMG Amplified by <span class="text-desc">25%</span> for <span class="text-desc">14</span>s or until they are switched out.`,
      image: 'SP_IconZhezhiT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Calligrapher's Touch`,
      content: `When casting Resonance Skill <b>Stroke of Genius</b> or Resonance Skill <b>Creation's Zenith</b>, ATK is increased by <span class="text-desc">6%</span> for <span class="text-desc">27</span>s. This can be stacked up to <span class="text-desc">3</span> time(s).`,
      image: 'SP_IconZhezhiD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Flourish`,
      content: `After Outro Skill is cast, restore <span class="text-desc">15</span> Resonance Energy for the incoming Resonator.`,
      image: 'SP_IconZhezhiD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Brushwork's Finish`,
      content: `Casting Resonance Skill <b>Creation's Zenith</b> restores <span class="text-desc">15</span> Resonance Energy and increases Crit. Rate by <span class="text-desc">10%</span> for <span class="text-desc">27</span>s.`,
      image: 'T_IconDevice_ZhezhiM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Vivid Strokes`,
      content: `Max <b class="text-cyan-500">Inklit Spirits</b> summoned by Resonance Liberation <b>Living Canvas</b> increases by <span class="text-desc">6</span>.`,
      image: 'T_IconDevice_ZhezhiM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Reflection's Grace`,
      content: `Casting Resonance Skill <b>Manifestation</b>, Resonance Skill <b>Stroke of Genius</b>, or Resonance Skill <b>Creation's Zenith</b> increases ATK by <span class="text-desc">15%</span> for <span class="text-desc">27</span>s, stacking up to span class="text-desc">3</span> time(s).`,
      image: 'T_IconDevice_ZhezhiM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Hue's Spectrum`,
      content: `Casting Resonance Liberation <b>Living Canvas</b> increases ATK of Resonators on the team <span class="text-desc">20%</span> for <span class="text-desc">30</span>s.`,
      image: 'T_IconDevice_ZhezhiM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Composition's Clue`,
      content: `For every <span class="text-desc">3</span> <b class="text-cyan-500">Inklit Spirits</b> summoned by Resonance Liberation <b>Living Canvas</b>, <span class="text-desc">1</span> extra <b class="text-cyan-500">Inklit Spirit</b> is summoned to perform a Coordinated Attack, dealing DMG equal to <span class="text-desc">140%</span> of <b class="text-cyan-500">Inklit Spirit</b>'s DMG, considered as Basic Attack DMG. This damage dealt will not further summon <b class="text-cyan-500">Inklit Spirit</b>.`,
      image: 'T_IconDevice_ZhezhiM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Infinite Legacy`,
      content: `Casting Resonance Skill <b>Stroke of Genius</b> or Resonance Skill <b>Creation's Zenith</b> summons an extra <b>Ivory Herald</b> to deal DMG equal to <span class="text-desc">120%</span> of Resonance Skill <b>Stroke of Genius</b>'s DMG, considered as Basic Attack DMG.`,
      image: 'T_IconDevice_ZhezhiM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'number',
      id: 'zhezhi_i1',
      text: `I1 ATK Bonus`,
      ...talents.i1,
      show: i.i1,
      default: 3,
      min: 0,
      max: 3,
    },
    {
      type: 'toggle',
      id: 'zhezhi_c1',
      text: `S1 Crit Rate Bonus`,
      ...talents.c1,
      show: c >= 1,
      default: true,
    },
    {
      type: 'number',
      id: 'zhezhi_c3',
      text: `S3 ATK Bonus`,
      ...talents.c3,
      show: c >= 3,
      default: 3,
      min: 0,
      max: 3,
    },
    {
      type: 'toggle',
      id: 'zhezhi_c4',
      text: `S4 Team ATK Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'zhezhi_c4')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'zhezhi_outro',
        text: `Outro: Carve and Draw`,
        ...talents.outro,
        show: true,
        default: false,
      },
    ],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.BASIC_SCALING = [
        {
          name: 'Stage 1 DMG',
          value: [{ scaling: calcScaling(0.21, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.1034, normal), multiplier: Stats.ATK, hits: 5 }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.672, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.567, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          value: [
            { scaling: calcScaling(0.1255, normal), multiplier: Stats.ATK, hits: 5 },
            { scaling: calcScaling(0.527, normal), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          value: [{ scaling: calcScaling(0.1462, normal), multiplier: Stats.ATK, hits: 5 }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Manifestation DMG',
          value: [{ scaling: calcScaling(0.495, skill), multiplier: Stats.ATK, hits: 3 }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Inklit Spirit DMG',
          value: [{ scaling: calcScaling(0.328, lib), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
          coord: true
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Conjuration DMG',
          value: [{ scaling: calcScaling(0.4175, forte), multiplier: Stats.ATK, hits: 3 }],
          element: Element.GLACIO,
          property: TalentProperty.HA,
        },
        {
          name: 'Stroke of Genius DMG',
          value: [{ scaling: calcScaling(1.5, forte), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: `Creation's Zenith DMG`,
          value: [{ scaling: calcScaling(0.6, forte), multiplier: Stats.ATK, hits: 3 }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Radiant Ruin DMG`,
          value: [{ scaling: calcScaling(0.4334, intro), multiplier: Stats.ATK, hits: 3 }],
          element: Element.GLACIO,
          property: TalentProperty.INTRO,
        },
      ]

      if (form.zhezhi_i1) {
        base[Stats.P_ATK].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.06 * form.zhezhi_i1,
        })
      }
      if (form.zhezhi_c1) {
        base[Stats.CRIT_RATE].push({
          name: `Sequence Node 1`,
          source: 'Self',
          value: 0.1,
        })
      }
      if (form.zhezhi_c3) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.15 * form.zhezhi_c3,
        })
      }
      if (form.zhezhi_c4) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (c >= 5) {
        base.LIB_SCALING.push({
          name: 'S5 Inklit Spirit DMG',
          value: [{ scaling: calcScaling(0.328, lib), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
          multiplier: 1.4,
        })
      }
      if (c >= 6) {
        base.FORTE_SCALING.push({
          name: `S6 Ivory Herald DMG`,
          value: [{ scaling: calcScaling(1.5, forte), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
          multiplier: 1.2,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.zhezhi_outro) {
        base.GLACIO_AMP.push({
          name: `Outro Skill`,
          source: 'Zhezhi',
          value: 0.2,
        })
        base.SKILL_AMP.push({
          name: `Outro Skill`,
          source: 'Zhezhi',
          value: 0.25,
        })
      }
      if (form.zhezhi_c4) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 4`,
          source: 'Zhezhi',
          value: 0.2,
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

export default Zhezhi
