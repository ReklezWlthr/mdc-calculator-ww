import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const XLY = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Probe`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 5 consecutive attacks, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Perform a charged attack at the cost of STA, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Perform a Plunging Attack from mid-air at the cost of STA, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-electro">Electro DMG</b>.`,
      image: 'SP_IconNorFist',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Deduction`,
      content: `Attack the target, dealing <b class="text-wuwa-electro">Electro DMG</b>.`,
      image: 'SP_IconXiangliyaoB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Cogitation Model`,
      content: `Attack the target, dealing <b class="text-wuwa-electro">Electro DMG</b>. Enter <b class="text-violet-300">Intuition</b>.
      <br />When in <b class="text-violet-300">Intuition</b>:
      <br />-Obtain <span class="text-desc">3</span> <b class="text-indigo-400">Hypercube(s)</b>. Each time Resonance Skill <b>Law of Reigns</b> is cast, consume <span class="text-desc">1</span> <b class="text-indigo-400">Hypercube(s)</b>. <b class="text-violet-300">Intuition</b> ends once all <b class="text-indigo-400">Hypercubes</b> are consumed.
      <br />-Basic Attack and Heavy Attack are replaced with Basic Attack <b>Pivot - Impale</b>, which performs up to 3 consecutive attacks, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />-Resonance Skill <b>Deduction</b> is replaced with Resonance Skill <b>Divergence</b>, which deals <b class="text-wuwa-electro">Electro DMG</b>.
      <br />-Dodge Counter is replaced with Dodge Counter <b>Unfathomed</b>, considered as Resonance Liberation DMG.`,
      image: 'SP_IconXiangliyaoC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Forever Seeking`,
      content: `<b>Resonance Skill - Decipher</b>
      <br />When <b class="text-wuwa-electro">Capacity</b> reaches <span class="text-desc">100</span>, Resonance Skill <b>Deduction</b> is replaced by Resonance Skill <b>Decipher</b>.
      <br />Consume <span class="text-desc">100</span> Capacity to cast Resonance Skill Decipher, dealing <b class="text-wuwa-electro">Electro DMG</b>, considered as Resonance Liberation DMG.
      <br />
      <br /><b>Resonance Skill - Law of Reigns</b>
      <br />When <b class="text-violet-400">Performance Capacity</b> reaches <span class="text-desc">5</span> in <b class="text-violet-300">Intuition</b> state, Resonance Skill <b>Divergence</b> is replaced by Resonance Skill <b>Law of Reigns</b>.
      <br />Consume <span class="text-desc">5</span> <b class="text-violet-400">Performance Capacity</b> to cast Resonance Skill <b>Law of Reigns</b>, dealing <b class="text-wuwa-electro">Electro DMG</b>, considered as Resonance Liberation DMG.
      <br />
      <br /><b>Mid-Air Attack - Revamp</b>
      <br />Shortly after casting Resonance Skill <b>Decipher</b> or Resonance Skill <b>Divergence</b>, use Basic Attack to perform Mid-Air Attack <b>Revamp</b> at the cost of STA, dealing <b class="text-wuwa-electro">Electro DMG</b>, considered as Resonance Liberation DMG.
      <br />
      <br /><b class="text-wuwa-electro">Capacity</b>
      <br />Xiangli Yao can hold up to <span class="text-desc">100</span> <b class="text-wuwa-electro">Capacity</b>.
      <br />Every Normal Attack Probe on hit grants <b class="text-wuwa-electro">Capacity</b>.
      <br />Every Resonance Skill Deduction on hit grants <b class="text-wuwa-electro">Capacity</b>.
      <br />
      <br /><b class="text-violet-400">Performance Capacity</b>
      <br />Xiangli Yao can hold up to <span class="text-desc">5</span> <b class="text-violet-400">Performance Capacity</b>.
      <br />When in <b class="text-violet-300">Intuition</b> triggered by Resonance Liberation:
      <br />Obtain <span class="text-desc">1</span> <b class="text-violet-400">Performance Capacity</b> when Stage 1 of Basic Attack <b>Pivot - Impale</b> hits a target.
      <br />Obtain <span class="text-desc">2</span> <b class="text-violet-400">Performance Capacity</b> when Stage 2 or 3 of Basic Attack <b>Pivot - Impale</b> hits a target.
      <br />Obtain <span class="text-desc">2</span> <b class="text-violet-400">Performance Capacity</b> for every Resonance Skill <b>Divergence</b> on hit.
      <br />Obtain <span class="text-desc">3</span> <b class="text-violet-400">Performance Capacity</b> for every Mid-Air Attack <b>Revamp</b> on hit.
      <br />Obtain <span class="text-desc">2</span> <b class="text-violet-400">Performance Capacity</b> for every Dodge Counter <b>Unfathomed</b> on hit.`,
      image: 'SP_IconXiangliyaoY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Principle`,
      content: `Attack the target, dealing <b class="text-wuwa-electro">Electro DMG</b>.`,
      image: 'SP_IconXiangliyaoQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Chain Rule`,
      content: `Xiangli Yao will call down a laser beam upon the first target the incoming Resonator's Basic Attack hits, dealing <b class="text-wuwa-electro">Electro DMG</b> equal to <span class="text-desc">237.63%</span> of Xiangli Yao's ATK to an area. This effect lasts for <span class="text-desc">8</span>s and can be triggered once every <span class="text-desc">2</span>s, up to <span class="text-desc">3</span> times.`,
      image: 'SP_IconXiangliyaoT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Knowing`,
      content: `Gain 5% <b class="text-wuwa-electro">Electro DMG Bonus</b> after casting Resonance Skill for <span class="text-desc">8</span>s, stackable for up to <span class="text-desc">4</span> times.`,
      image: 'SP_IconXiangliyaoD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Focus`,
      content: `When in <b class="text-violet-300">Intuition</b> triggered by Resonance Liberation, Xiangli Yao's resistance to interruption is enhanced.`,
      image: 'SP_IconXiangliyaoD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Prodigy of Protégés`,
      content: `Resonance Skill <b>Law of Reigns</b> additionally launches 6 <b>Convolution Matrices</b> at enemies, each dealing Resonance Liberation DMG equal to <span class="text-desc">8%</span> of the skill's DMG Multiplier.`,
      image: 'T_IconDevice_XiangliyaoM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Traces of Predecessors`,
      content: `Casting Resonance Skill or Resonance Liberation <b>Cogitation Model</b> increases Crit. DMG by <span class="text-desc">30%</span> for <span class="text-desc">8</span>s.`,
      image: 'T_IconDevice_XiangliyaoM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Ruins of Ancient`,
      content: `Casting Resonance Liberation <b>Cogitation Model</b> increases the DMG of the following Resonance Skill moves by <span class="text-desc">63%</span> for 24s:
      <br /><b>Decipher</b>, <b>Deduction</b>, <b>Divergence</b>, and <b>Law of Reigns</b>.
      <br />This effect can be triggered up to <span class="text-desc">5</span> times.`,
      image: 'T_IconDevice_XiangliyaoM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Vessel of Rebirth`,
      content: `Casting Resonance Liberation <b>Cogitation Model</b> grants a <span class="text-desc">25%</span> DMG Bonus to all team members' Resonance Liberation for <span class="text-desc">30</span>s.`,
      image: 'T_IconDevice_XiangliyaoM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `End of Stars`,
      content: `The DMG Multiplier of Outro Skill <b>Chain Rule</b> is increased by <span class="text-desc">222%</span>. The DMG Multiplier of Resonance Liberation <b>Cogitation Model</b> is increased by <span class="text-desc">100%</span>.`,
      image: 'T_IconDevice_XiangliyaoM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Solace of the Ordinary`,
      content: `The <b class="text-indigo-400">Hypercubes</b> obtained from Resonance Liberation <b>Cogitation Model</b> are enhanced, increasing the DMG Multiplier of Resonance Skill <b>Law of Reigns</b> by <span class="text-desc">76%</span>.`,
      image: 'T_IconDevice_XiangliyaoM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'intuition',
      text: `Intuition`,
      ...talents.lib,
      show: true,
      default: true,
      sync: true,
    },
    {
      type: 'number',
      id: 'xly_i1',
      text: `I1 Electro DMG Bonus`,
      ...talents.i1,
      show: i.i1,
      default: 4,
      min: 0,
      max: 4,
    },
    {
      type: 'toggle',
      id: 'xly_c2',
      text: `S2 Crit DMG Bonus`,
      ...talents.c2,
      show: c >= 2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'xly_c3',
      text: `S3 Skill DMG Bonus`,
      ...talents.c3,
      show: c >= 3,
      default: true,
    },
    {
      type: 'toggle',
      id: 'xly_c4',
      text: `S4 Team Res. Liberation Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'xly_c4')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.BASIC_SCALING = form.intuition
        ? [
            {
              name: 'Pivot - Impale Stage 1 DMG',
              value: [{ scaling: calcScaling(0.6019, skill), multiplier: Stats.ATK }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Pivot - Impale Stage 2 DMG',
              value: [{ scaling: calcScaling(0.3065, skill), multiplier: Stats.ATK, hits: 4 }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Pivot - Impale Stage 3 DMG',
              value: [{ scaling: calcScaling(0.6703, skill), multiplier: Stats.ATK, hits: 2 }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
          ]
        : [
            {
              name: 'Stage 1 DMG',
              value: [{ scaling: calcScaling(0.1665, normal), multiplier: Stats.ATK, hits: 2 }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 2 DMG',
              value: [{ scaling: calcScaling(0.501, normal), multiplier: Stats.ATK }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 3 DMG',
              value: [{ scaling: calcScaling(0.2, normal), multiplier: Stats.ATK, hits: 3 }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 4 DMG',
              value: [
                { scaling: calcScaling(0.2668, normal), multiplier: Stats.ATK, hits: 2 },
                { scaling: calcScaling(0.1334, normal), multiplier: Stats.ATK },
              ],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 5 DMG',
              value: [{ scaling: calcScaling(1, normal), multiplier: Stats.ATK }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
          ]
      base.HEAVY_SCALING = form.intuition
        ? []
        : [
            {
              name: 'Heavy Attack DMG',
              value: [{ scaling: calcScaling(0.4165, normal), multiplier: Stats.ATK, hits: 2 }],
              element: Element.ELECTRO,
              property: TalentProperty.HA,
            },
          ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.62, normal), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = form.intuition
        ? [
            {
              name: 'Unfathomed DMG',
              scale: Stats.ATK,
              value: [
                { scaling: calcScaling(0.1953, lib), multiplier: Stats.ATK, hits: 2 },
                { scaling: calcScaling(1.5622, lib), multiplier: Stats.ATK },
              ],
              element: Element.ELECTRO,
              property: TalentProperty.LIB,
            },
          ]
        : [
            {
              name: 'Dodge Counter DMG',
              scale: Stats.ATK,
              value: [{ scaling: calcScaling(1.2, normal), multiplier: Stats.ATK }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
          ]
      base.SKILL_SCALING = form.intuition
        ? [
            {
              name: 'Divergence DMG',
              value: [
                { scaling: calcScaling(0.2494, lib), multiplier: Stats.ATK, hits: 3 },
                { scaling: calcScaling(0.8729, lib), multiplier: Stats.ATK, hits: 2 },
              ],
              element: Element.ELECTRO,
              property: TalentProperty.SKILL,
              bonus: form.xly_c3 ? 0.63 : 0,
            },
          ]
        : [
            {
              name: 'Deduction DMG',
              value: [{ scaling: calcScaling(1, skill), multiplier: Stats.ATK }],
              element: Element.ELECTRO,
              property: TalentProperty.SKILL,
              bonus: form.xly_c3 ? 0.63 : 0,
            },
          ]
      base.LIB_SCALING = [
        {
          name: 'Cogitation Model DMG',
          value: [{ scaling: calcScaling(7.3742, lib), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.LIB,
          multiplier: c >= 5 ? 2 : 1,
        },
      ]
      const law = {
        name: 'Law of Reigns DMG',
        value: [
          { scaling: calcScaling(0.4815, forte), multiplier: Stats.ATK, hits: 4 },
          { scaling: calcScaling(1.284, forte), multiplier: Stats.ATK },
        ],
        element: Element.ELECTRO,
        property: TalentProperty.LIB,
        multiplier: c >= 6 ? 1.76 : 1,
        bonus: form.xly_c3 ? 0.63 : 0,
      }
      base.FORTE_SCALING = [
        {
          name: 'Decipher DMG',
          value: [{ scaling: calcScaling(2.001, forte), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.LIB,
          bonus: form.xly_c3 ? 0.63 : 0,
        },
        law,
        {
          name: 'Revamp DMG',
          value: [
            { scaling: calcScaling(0.11, forte), multiplier: Stats.ATK, hits: 4 },
            { scaling: calcScaling(0.33, forte), multiplier: Stats.ATK, hits: 2 },
          ],
          element: Element.ELECTRO,
          property: TalentProperty.LIB,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Principle DMG`,
          value: [{ scaling: calcScaling(0.5, intro), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.INTRO,
        },
      ]
      base.OUTRO_SCALING = [
        {
          name: `Chain Rule DMG`,
          value: [{ scaling: 2.3763, multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.OUTRO,
          multiplier: c >= 5 ? 3.22 : 1,
        },
      ]

      if (form.xly_i1) {
        base[Stats.ELECTRO_DMG].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.05 * form.xly_i1,
        })
      }
      if (c >= 1) {
        base.LIB_SCALING.push({
          ...law,
          multiplier: 0.08,
        })
      }
      if (form.xly_c2) {
        base[Stats.CRIT_DMG].push({
          name: `Sequence Node 2`,
          source: 'Self',
          value: 0.3,
        })
      }
      if (form.xly_c4) {
        base[Stats.LIB_DMG].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.25,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.xly_c4) {
        base[Stats.LIB_DMG].push({
          name: `Sequence Node 4`,
          source: 'Xiangli Yao',
          value: 0.25,
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

export default XLY
