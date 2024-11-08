import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Yuanwu = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Leihuangquan`,
      content: `<b>Basic Attack</b>
      <br />Yuanwu performs up to 5 consecutive attacks, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Yuanwu consumes STA to attack the target, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Yuanwu consumes STA to launch a Mid-air Plunging Attack, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-electro">Electro DMG</b>.`,
      image: 'SP_IconNorFist',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Leihuang Master`,
      content: `<b class="text-violet-300">Thunder Wedge</b>
      <br />Yuanwu summons <b class="text-violet-300">Thunder Wedge</b>, dealing <b class="text-wuwa-electro">Electro DMG</b>, and forms a <b class="text-indigo-400">Thunder Field</b> centered on the <b class="text-violet-300">Thunder Wedge</b>. <b class="text-violet-300">Thunder Wedge</b> lasts for <span class="text-desc">12</span>s.
      <br />Forte Circuit <b>Rumbling Spark</b> and Resonance Liberation <b>Blazing Might</b> will immediately detonate Resonance Skill <b class="text-violet-300">Thunder Wedge</b> on the field, dealing <b class="text-wuwa-electro">Electro DMG</b>, considered as Resonance Skill DMG.
      <br />
      <br /><b class="text-indigo-400">Thunder Field</b>
      <br />The active character gains the effects below when in the <b class="text-indigo-400">Thunder Field</b>: a Coordinated Attack from Resonance Skill <b class="text-violet-300">Thunder Wedge</b> is triggered when attacks hit a target, dealing <b class="text-wuwa-electro">Electro DMG</b>. This can be triggered once every <span class="text-desc">1.2</span>s. The effect lasts for <span class="text-desc">1.5</span>s.`,
      image: 'SP_IconYuanwuB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Blazing Might`,
      content: `Awaken the power of thunder and provide Forte Circuit <b class="text-wuwa-electro">Lightning Infused</b> status to all characters on a nearby team for <span class="text-desc">10</span>s, then perform a powerful blow that deals <b class="text-wuwa-electro">Electro DMG</b>.`,
      image: 'SP_IconYuanwuC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Unassuming Blade`,
      content: `<b>Rumbling Spark</b>
      <br />When <b class="text-violet-400">Readiness</b> is full, hold Resonance Skill to consume all <b class="text-violet-400">Readiness</b> and cast <b>Rumbling Spark</b>, dealing <b class="text-wuwa-electro">Electro DMG</b> and entering the <b class="text-wuwa-electro">Lightning Infused</b> state.
      <br />
      <br /><b>Thunder Uprising</b>
      <br />When <b class="text-violet-400">Readiness</b> is full, Resonance Skill <b class="text-violet-300">Thunder Wedge</b> will be replaced with <b>Thunder Uprising</b>, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b class="text-wuwa-electro">Lightning Infused</b>
      <br />The character in <b class="text-wuwa-electro">Lightning Infused</b> state has a greatly increased resistance to interruption.
      <br />When Yuanwu is in this state:
      <br />-<b>Basic Attacks</b>: Hit targets in a larger range, reduce enemy Vibration Strength with increased efficiency.
      <br />-<b>Heavy Attacks</b>: Have increased attack speed, reduce enemy Vibration Strength with increased efficiency.
      <br />-<b>Dodge Counters</b>: Have increased attack speed, reduce enemy Vibration Strength with increased efficiency.
      <br />-Use Basic Attack within <span class="text-desc">3</span>s after casting a Heavy Attack or a successful Counterattack to cast <b>Thunderweaver</b>, dealing <b class="text-wuwa-electro">Electro DMG</b>, considered as Basic Attack DMG.
      <br />-Does not recover <b class="text-violet-400">Readiness</b>.
      <br />
      <br /><b class="text-violet-400">Readiness</b>
      <br />Yuanwu can hold up to <span class="text-desc">100</span> <b class="text-violet-400">Readiness</b>.
      <br />When Resonance Skill <b class="text-violet-300">Thunder Wedge</b> is on the field, Yuanwu gains <span class="text-desc">6</span> <b class="text-violet-400">Readiness</b> every second, even when he is not the active character;
      <br />When Resonance Skill <b class="text-violet-300">Thunder Wedge</b> hits a target with a Coordinated Attack, Yuanwu gains <span class="text-desc">5</span> <b class="text-violet-400">Readiness</b>.`,
      image: 'SP_IconYuanwuY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Thunder Bombardment`,
      content: `Attack the target, dealing <b class="text-wuwa-electro">Electro DMG</b>.`,
      image: 'SP_IconYuanwuQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Lightning Manipulation`,
      content: `Yuanwu unleashes thunderbolts in an area centered around the skill target, greatly reducing the Vibration Strength of enemies upon impact.`,
      image: 'SP_IconYuanwuT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Thunderous Determination`,
      content: `The DMG multiplier of Resonance Skill <b>Thunder Uprising</b> is increased by <span class="text-desc">40%</span>, and its reduction efficiency of enemy Vibration Strength is enhanced.`,
      image: 'SP_IconYuanwuD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Reserved Confidence`,
      content: `The ranges of the Resonance Skills <b class="text-indigo-400">Thunder Field</b> and <b>Thunder Uprising</b> are greatly expanded. When switched off the field during combat, if <b class="text-violet-400">Readiness</b> is not full, Yuanwu will automatically leave <span class="text-desc">1</span> Resonance Skill <b class="text-violet-300">Thunder Wedge</b> in place.`,
      image: 'SP_IconYuanwuD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Steaming Cup of Justice`,
      content: `When Yuanwu is in Forte Circuit's <b class="text-wuwa-electro">Lightning Infused</b> state, his Basic Attack Speed is increased by <span class="text-desc">20%</span>, and his Heavy Attack Speed is increased by <span class="text-desc">20%</span>.`,
      image: 'T_IconDevice_YuanwuM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Fierce Heart, Serene Mind`,
      content: `Intro Skill <b>Thunder Bombardment</b> additionally recovers <span class="text-desc">15</span> Resonance Energy for Yuanwu.`,
      image: 'T_IconDevice_YuanwuM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Upholder of Integrity`,
      content: `When the Coordinated Attacks of Resonance Skill's <b class="text-violet-300">Thunder Wedge</b> hits a target, the damage is additionally increased by <span class="text-desc">20%</span> of Yuanwu's DEF.`,
      image: 'T_IconDevice_YuanwuM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Retributive Knuckles`,
      content: `When casting Resonance Liberation <b>Blazing Might</b>, the on-field character will gain a Shield equal to <span class="text-desc">200%</span> of Yuanwu's DEF for <span class="text-desc">10</span>s.`,
      image: 'T_IconDevice_YuanwuM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Neighborhood Protector`,
      content: `When Resonance Skill <b class="text-violet-300">Thunder Wedge</b> is on the field, Yuanwu's Resonance Liberation DMG Bonus is increased by <span class="text-desc">50%</span>.`,
      image: 'T_IconDevice_YuanwuM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Defender of All Realms`,
      content: `All team members nearby within the range of Resonance Skill <b class="text-violet-300">Thunder Wedge</b> will gain a <span class="text-desc">32%</span> DEF increase, lasting <span class="text-desc">3</span>s.`,
      image: 'T_IconDevice_YuanwuM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'lightning_infused',
      text: `Lightning Infused`,
      ...talents.forte,
      show: true,
      default: true,
      sync: true,
    },
    {
      type: 'toggle',
      id: 'yuanwu_c5',
      text: `S5 Liberation DMG Bonus`,
      ...talents.c5,
      show: c >= 5,
      default: true,
    },
    {
      type: 'toggle',
      id: 'yuanwu_c6',
      text: `S6 Team DEF Bonus`,
      ...talents.c6,
      show: c >= 6,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'yuanwu_c6')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.BASIC_SCALING = form.lightning_infused
        ? [
            {
              name: `Lightning Infused Basic Attack Stage 1 DMG`,
              value: [{ scaling: calcScaling(0.1235, forte), multiplier: Stats.DEF }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: `Lightning Infused Basic Attack Stage 2 DMG`,
              value: [{ scaling: calcScaling(0.1303, forte), multiplier: Stats.DEF, hits: 2 }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: `Lightning Infused Basic Attack Stage 3 DMG`,
              value: [
                { scaling: calcScaling(0.055, forte), multiplier: Stats.DEF, hits: 2 },
                { scaling: calcScaling(0.0824, forte), multiplier: Stats.DEF, hits: 2 },
              ],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: `Lightning Infused Basic Attack Stage 4 DMG`,
              value: [{ scaling: calcScaling(0.0577, forte), multiplier: Stats.DEF, hits: 5 }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: `Lightning Infused Basic Attack Stage 5 DMG`,
              value: [
                { scaling: calcScaling(0.0824, forte), multiplier: Stats.DEF, hits: 3 },
                { scaling: calcScaling(0.1647, forte), multiplier: Stats.DEF },
              ],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: `Thunderweaver DMG`,
              value: [
                { scaling: calcScaling(0.156, forte), multiplier: Stats.DEF },
                { scaling: calcScaling(0.104, forte), multiplier: Stats.DEF, hits: 2 },
              ],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
          ]
        : [
            {
              name: 'Stage 1 DMG',
              value: [{ scaling: calcScaling(0.247, normal), multiplier: Stats.ATK }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 2 DMG',
              value: [{ scaling: calcScaling(0.2606, normal), multiplier: Stats.ATK, hits: 2 }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 3 DMG',
              value: [
                { scaling: calcScaling(0.1099, normal), multiplier: Stats.ATK, hits: 2 },
                { scaling: calcScaling(0.1648, normal), multiplier: Stats.ATK, hits: 2 },
              ],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 4 DMG',
              value: [{ scaling: calcScaling(0.2606, normal), multiplier: Stats.ATK, hits: 2 }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 5 DMG',
              value: [
                { scaling: calcScaling(0.247, normal), multiplier: Stats.ATK, hits: 2 },
                { scaling: calcScaling(0.3294, normal), multiplier: Stats.ATK },
              ],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
          ]
      base.HEAVY_SCALING = form.lightning_infused
        ? [
            {
              name: 'Lightning Infused Heavy Attack DMG',
              value: [{ scaling: calcScaling(0.156, forte), multiplier: Stats.DEF }],
              element: Element.ELECTRO,
              property: TalentProperty.HA,
            },
          ]
        : [
            {
              name: 'Heavy Attack DMG',
              value: [{ scaling: calcScaling(0.8, normal), multiplier: Stats.ATK }],
              element: Element.ELECTRO,
              property: TalentProperty.HA,
            },
          ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          value: [{ scaling: calcScaling(0.496, normal), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = form.lightning_infused
        ? [
            {
              name: 'Lightning Infused Dodge Counter DMG',
              value: [
                { scaling: calcScaling(0.2176, forte), multiplier: Stats.DEF },
                { scaling: calcScaling(0.1632, forte), multiplier: Stats.DEF, hits: 2 },
              ],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
          ]
        : [
            {
              name: 'Dodge Counter DMG',
              value: [{ scaling: calcScaling(0.576, normal), multiplier: Stats.ATK, hits: 2 }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
          ]
      base.SKILL_SCALING = [
        {
          name: 'Thunder Wedge DMG',
          value: [{ scaling: calcScaling(0.12, skill), multiplier: Stats.DEF }],
          element: Element.ELECTRO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Thunder Wedge Coordinated Attack DMG',
          value: [
            { scaling: calcScaling(0.04, skill), multiplier: Stats.DEF },
            ...(c >= 3 ? [{ scaling: 0.2, multiplier: Stats.DEF }] : []),
          ],
          element: Element.ELECTRO,
          property: TalentProperty.SKILL,
          coord: true
        },
        {
          name: 'Thunder Wedge Detonation DMG',
          value: [{ scaling: calcScaling(0.3, skill), multiplier: Stats.DEF }],
          element: Element.ELECTRO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Rumbling Spark DMG',
          value: [{ scaling: calcScaling(0.546, skill), multiplier: Stats.DEF }],
          element: Element.ELECTRO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: `Blazing Might DMG`,
          value: [{ scaling: calcScaling(0.88, lib), multiplier: Stats.DEF, hits: 2 }],
          element: Element.ELECTRO,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: `Thunder Uprising DMG`,
          value: [{ scaling: calcScaling(0.2, forte), multiplier: Stats.DEF }],
          element: Element.ELECTRO,
          property: TalentProperty.SKILL,
          multiplier: i.i1 ? 1.4 : 1,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Thunder Bombardment DMG`,
          value: [{ scaling: calcScaling(0.32, intro), multiplier: Stats.DEF }],
          element: Element.ELECTRO,
          property: TalentProperty.INTRO,
        },
      ]

      if (c >= 4) {
        base.LIB_SCALING.push({
          name: `S4 Cast Shield`,
          value: [{ scaling: 2, multiplier: Stats.DEF }],
          element: TalentProperty.SHIELD,
          property: TalentProperty.SHIELD,
        })
        base[Stats.SKILL_DMG].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.1,
        })
      }
      if (form.yuanwu_c5) {
        base[Stats.LIB_DMG].push({
          name: `Sequence Node 5`,
          source: 'Self',
          value: 0.5,
        })
      }
      if (form.yuanwu_c6) {
        base[Stats.P_DEF].push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.32,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.yuanwu_c6) {
        base[Stats.P_DEF].push({
          name: `Sequence Node 6`,
          source: 'Yuanwu',
          value: 0.32,
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

export default Yuanwu
