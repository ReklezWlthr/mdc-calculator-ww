import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Yinlin = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Zapstring's Dance`,
      content: `<b>Basic Attack</b>
      <br />Yinlin controls the puppet "Zapstring" to perform up to 4 attacks, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Yinlin consumes STA to control "Zapstring", dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Yinlin consumes STA to control "Zapstring" to perform a Mid-air Plunging Attack, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-electro">Electro DMG</b>.`,
      image: 'SP_IconNorMagic',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Magnetic Roar`,
      content: `<b>Magnetic Roar</b>
      <br />The puppet "Zapstring" deals <b class="text-wuwa-electro">Electro DMG</b> to the target, and puts Yinlin in Resonance Skill <b class="text-red">Execution Mode</b>.
      <br />
      <br /><b class="text-red">Execution Mode</b>
      <br />Basic Attack and Dodge Counter will trigger <span class="text-desc">1</span> <b>Electromagnetic Blast</b> when hitting a target.
      <br />Each stage of Basic Attack or Dodge Counter can only trigger <span class="text-desc">1</span> <b>Electromagnetic Blast</b>, up to <span class="text-desc">4</span> times.
      <br />
      <br /><b>Electromagnetic Blast</b>
      <br />Attack all targets marked with Forte Circuit <b class="text-violet-300">Sinner's Mark</b>, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Lightning Execution</b>
      <br />Use Resonance Skill after casting Resonance Skill <b>Magnetic Roar</b> to cast <b>Lightning Execution</b> to attack the target, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />If Resonance Skill <b>Lightning Execution</b> is not activated in a while or this Character is switched, this Skill will be put on Cooldown.`,
      image: 'SP_IconYinlinB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Thundering Wrath`,
      content: `Command "Zapstring" to call for thunder to fall upon a large range, dealing <b class="text-wuwa-electro">Electro DMG</b>.`,
      image: 'SP_IconYinlinC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Chameleon Cipher`,
      content: `<b>Chameleon Cipher</b>
      <br />When Yinlin's <b class="text-wuwa-electro">Judgment Points</b> are full, her Heavy Attack is replaced with <b>Chameleon Cipher</b>, which consumes all <b class="text-wuwa-electro">Judgment Points</b> to attack the target, dealing <b class="text-wuwa-electro">Electro DMG</b>. When it hits a target marked with <b class="text-violet-300">Sinner's Mark</b>, the <b class="text-violet-300">Sinner's Mark</b> is replaced with <b class="text-rose-400">Punishment Mark</b>, lasting for <span class="text-desc">18</span>s.
      <br />
      <br /><b class="text-violet-300">Sinner's Mark</b>
      <br />Basic Attack <b>Zapstring's Dance</b>, Resonance Liberation <b>Thundering Wrath</b>, and Intro Skill <b>Roaring Storm</b> apply <b class="text-violet-300">Sinner's Mark</b> to the target on hit.
      <br /><b class="text-violet-300">Sinner's Mark</b> is removed when Yinlin is switched out.
      <br />
      <br /><b class="text-rose-400">Punishment Mark</b>
      <br />When a target marked with <b class="text-rose-400">Punishment Mark</b> takes damage, <b>Judgement Strike</b> will fall, triggering Coordinated Attacks to all targets marked with <b class="text-rose-400">Punishment Mark</b>, dealing <b class="text-wuwa-electro">Electro DMG</b>. This can be triggered up to <span class="text-desc">1</span> time per second.
      <br />
      <br /><b class="text-wuwa-electro">Judgment Points</b>
      <br />Yinlin can hold up to <span class="text-desc">100</span> <b class="text-wuwa-electro">Judgment Points</b>. Yinlin gains <b class="text-wuwa-electro">Judgment Points</b> through the following ways:
      <br />Upon casting Intro Skill <b>Raging Storm</b>
      <br />When Basic Attack <b>Zapstring's Dance</b> hits a target
      <br />Upon casting Resonance Skill <b>Magnetic Roar</b>;
      <br />When Resonance Skill <b>Electromagnetic Blast</b> hits a target;
      <br />Upon casting Resonance Skill <b>Lightning Execution</b>.`,
      image: 'SP_IconYinlinY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Raging Storm`,
      content: `Command puppet "Zapstring" to attack, dealing <b class="text-wuwa-electro">Electro DMG</b> in a large range.`,
      image: 'SP_IconYinlinQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Strategist`,
      content: `The incoming Resonator has their Electro DMG Amplified by <span class="text-desc">20%</span> and Resonance Liberation DMG Amplified by <span class="text-desc">25%</span> for <span class="text-desc">14</span>s or until they are switched out.`,
      image: 'SP_IconYinlinT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Pain Immersion`,
      content: `After using Resonance Skill <b>Magnetic Roar</b>, Yinlin's Crit. Rate is increased by <span class="text-desc">15%</span> for <span class="text-desc">5</span>s.`,
      image: 'SP_IconYinlinD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Deadly Focus`,
      content: `The damage of Resonance Skill <b>Lightning Execution</b> is increased by <span class="text-desc">10%</span> when hitting targets marked with <b class="text-violet-300">Sinner's Mark</b>, and Yinlin's ATK is increased by <span class="text-desc">10%</span> for <span class="text-desc">4</span>s when this is triggered.`,
      image: 'SP_IconYinlinD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Morality's Crossroads`,
      content: `Resonance Skill <b>Magnetic Roar</b> and <b>Lightning Execution</b> deal <span class="text-desc">70%</span> more DMG.`,
      image: 'T_IconDevice_YinlinM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Ensnarled by Rapport`,
      content: `Resonance Skill <b>Electromagnetic Blast</b> recovers an additional <span class="text-desc">5</span> <b class="text-wuwa-electro">Judgment Point(s)</b> and <span class="text-desc">5</span> Resonance Energy on hit.`,
      image: 'T_IconDevice_YinlinM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Unyielding Verdict`,
      content: `Forte Circuit <b>Judgment Strike</b>'s DMG multiplier is increased by <span class="text-desc">55%</span>.`,
      image: 'T_IconDevice_YinlinM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Steadfast Conviction`,
      content: `When Forte Circuit <b>Judgment Strike</b> hits a target, the ATK of all team members is increased by <span class="text-desc">20%</span> for <span class="text-desc">12</span>s.`,
      image: 'T_IconDevice_YinlinM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Resounding Will`,
      content: `Resonance Liberation <b>Thundering Wrath</b> deals <span class="text-desc">100%</span> extra DMG to targets with Forte Circuit's <b class="text-violet-300">Sinner's Mark</b> or <b class="text-rose-400">Punishment Mark</b>.`,
      image: 'T_IconDevice_YinlinM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Pursuit of Justice`,
      content: `In the first <span class="text-desc">30</span>s after casting Resonance Liberation <b>Thundering Wrath</b>, when Yinlin's Basic Attack hits a target, <b>Furious Thunder</b> will be triggered, dealing <b class="text-wuwa-electro">Electro DMG</b> equal to <span class="text-desc">419.59%</span> of Yinlin's ATK. Every Basic Attack hit can trigger <b>Furious Thunder</b> <span class="text-desc">1</span> time, up to <span class="text-desc">4</span> times. This is considered Resonance Skill DMG.`,
      image: 'T_IconDevice_YinlinM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'yinlin_i1',
      text: `I1 Crit Rate Bonus`,
      ...talents.i1,
      show: i.i1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'yinlin_i2',
      text: `I2 DMG & ATK Bonus`,
      ...talents.i2,
      show: i.i2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'yinlin_c4',
      text: `S4 Team ATK Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'toggle',
      id: 'yinlin_c5',
      text: `S5 Liberation DMG Bonus`,
      ...talents.c5,
      show: c >= 5,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'yinlin_c4')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'yinlin_outro',
        text: `Outro: Strategist`,
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
          value: [{ scaling: calcScaling(0.1449, normal), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.1701, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.0704, normal), multiplier: Stats.ATK, hits: 7 }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(0.378, normal), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.15, normal), multiplier: Stats.ATK, hits: 2 }],
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
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.1218, normal), multiplier: Stats.ATK, hits: 7 }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Magnetic Roar DMG',
          value: [{ scaling: calcScaling(0.3, skill), multiplier: Stats.ATK, hits: 3 }],
          element: Element.ELECTRO,
          property: TalentProperty.SKILL,
          bonus: c >= 1 ? 0.7 : 0,
        },
        {
          name: 'Lightning Execution DMG',
          value: [{ scaling: calcScaling(0.45, skill), multiplier: Stats.ATK, hits: 4 }],
          element: Element.ELECTRO,
          property: TalentProperty.SKILL,
          bonus: (form.lumi_i2 ? 0.1 : 0) + (c >= 1 ? 0.7 : 0),
        },
        {
          name: 'Electromagnetic Blast DMG',
          value: [{ scaling: calcScaling(0.1, skill), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Thundering Wrath DMG',
          value: [{ scaling: calcScaling(0.5863, forte), multiplier: Stats.ATK, hits: 7 }],
          element: Element.ELECTRO,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Chameleon Cipher DMG',
          value: [{ scaling: calcScaling(0.9, forte), multiplier: Stats.ATK, hits: 2 }],
          element: Element.ELECTRO,
          property: TalentProperty.HA,
        },
        {
          name: 'Judgment Strike DMG',
          value: [{ scaling: calcScaling(0.3956, forte), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.SKILL,
          multiplier: c >= 3 ? 1.55 : 1,
          coord: true
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Raging Storm DMG`,
          value: [{ scaling: calcScaling(0.072, intro), multiplier: Stats.ATK, hits: 10 }],
          element: Element.ELECTRO,
          property: TalentProperty.INTRO,
        },
      ]

      if (form.yinlin_i1) {
        base[Stats.CRIT_RATE].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (form.yinlin_c4) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (form.yinlin_c4) {
        base[Stats.LIB_DMG].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 1,
        })
      }
      if (c >= 6) {
        base.BASIC_SCALING.push({
          name: 'Furious Thunder DMG',
          value: [{ scaling: 4.1959, multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.SKILL,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.yinlin_outro) {
        base.ELECTRO_AMP.push({
          name: `Outro Skill`,
          source: 'Yinlin',
          value: 0.2,
        })
        base.LIB_AMP.push({
          name: `Outro Skill`,
          source: 'Yinlin',
          value: 0.25,
        })
      }
      if (form.yinlin_c4) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 4`,
          source: 'Yinlin',
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

export default Yinlin
