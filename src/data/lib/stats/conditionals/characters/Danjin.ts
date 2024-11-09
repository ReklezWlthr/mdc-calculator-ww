import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Danjin = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Execution`,
      content: `<b>Basic Attack</b>
      <br />Danjin performs up to 3 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Danjin consumes STA to launch consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Consume STA to perform a Mid-Air Plunging Attack, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.

      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to launch an attack, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Dodge Counter: Ruby Shades</b>
      <br />After a successful Dodge Counter, Danjin can use Resonance Skill <b>Crimson Fragment</b> to perform Resonance Skill: <b>Crimson Erosion</b>.`,
      image: 'SP_IconNorKnife',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Crimson Fragment`,
      content: `When casting <b>Crimson Fragment</b>, each attack consumes <span class="text-desc">3%</span> of Danjin's max HP. When Danjin's HP is less than <span class="text-desc">1%</span>, this no longer consumes HP.
      <br />
      <br /><b>Carmine Gleam</b>
      <br />Danjin attacks the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Crimson Erosion</b>
      <br />After Basic Attack 2, Dodge Counter or Intro Skill <b>Vindication</b>, use Resonance Skill to perform up to 2 consecutive strikes, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />When <b>Crimson Erosion 2</b> hits a target, apply <b class="text-red">Incinerating Will</b> to it.
      <br />
      <br /><b class="text-red">Incinerating Will</b>
      <br />Danjin's damage dealt to targets marked with <b class="text-red">Incinerating Will</b> is increased by <span class="text-desc">20%</span>.
      <br />
      <br /><b>Sanguine Pulse</b>
      <br />Use Resonance Skill after Basic Attack 3 to perform up to 3 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.`,
      image: 'SP_IconMicaiB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Crimson Bloom`,
      content: `Danjin's anger intensifies as she frantically swings her dual blades, performing multiple rapid consecutive attacks, and <span class="text-desc">1</span> <b>Scarlet Burst</b> attack(s), dealing <b class="text-wuwa-havoc">Havoc DMG</b>.`,
      image: 'SP_IconMicaiC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Serene Vigil`,
      content: `<b>Heavy Attack: Chaoscleave</b>
      <br />After accumulating <span class="text-desc">60</span> <b class="text-rose-400">Ruby Blossom</b>, long press Basic Attack to consume all <b class="text-rose-400">Ruby Blossom</b> to cast <b>Chaoscleave</b>, dealing <b class="text-wuwa-havoc">Havoc DMG</b>, considered as Heavy Attack DMG, and healing Danjin.
      <br />If current <b class="text-rose-400">Ruby Blossom</b> reaches over <span class="text-desc">120</span>, <span class="text-desc">120</span> <b class="text-rose-400">Ruby Blossom</b> is consumed instead to increase the DMG multiplier of <b>Chaoscleave</b> and <b>Scatterbloom</b> performed this time.
      <br />
      <br /><b>Heavy Attack: Scatterbloom</b>
      <br />Use Basic Attack after Heavy Attack <b>Chaoscleave</b> to cast <b>Scatterbloom</b> to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>, considered as Heavy Attack DMG.
      <br />
      <br /><b class="text-rose-400">Ruby Blossom</b>
      <br />Danjin can hold up to <span class="text-desc">120</span> <b class="text-rose-400">Ruby Blossom</b>.
      <br />Danjin obtains <b class="text-rose-400">Ruby Blossom</b> when using Resonance Skill <b>Crimson Fragment</b>.`,
      image: 'SP_IconMicaiY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Vindication`,
      content: `With unwavering determination, Danjin unleashes a strike, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.`,
      image: 'SP_IconMicaiQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Duality`,
      content: `The incoming Resonator has their <b class="text-wuwa-havoc">Havoc DMG Amplified</b> by <span class="text-desc">23%</span> for <span class="text-desc">14</span>s or until they are switched out.`,
      image: 'SP_IconMicaiT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Crimson Light`,
      content: `Damage of Resonance Skill <b>Crimson Erosion</b> triggered by <b>Dodge Counter: Ruby Shades</b> is increased by <span class="text-desc">20%</span>. The HP cost and stacks of <b class="text-rose-400">Ruby Blossom</b> recovered are doubled.`,
      image: 'SP_IconMicaiD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Overflow`,
      content: `After casting the Resonance Skill <b>Sanguine Pulse</b>, Danjin's Heavy Attack DMG is increased by <span class="text-desc">30%</span> for <span class="text-desc">5</span>s.`,
      image: 'SP_IconMicaiD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Crimson Heart of Justice`,
      content: `When Danjin attacks a target with Resonance Skill's <b>Incinerating Will</b>, her ATK is increased by <span class="text-desc">5%</span> for <span class="text-desc">6</span>s, stacking up to <span class="text-desc">6</span> times. Danjin loses <span class="text-desc">1</span> stacks of this effect each time she takes damage.`,
      image: 'T_IconDevice_MicaiM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Dusted Mirror`,
      content: `When Danjin attacks a target with Resonance Skill's <b>Incinerating Will</b>, her damage dealt is increased by <span class="text-desc">20%</span>.`,
      image: 'T_IconDevice_MicaiM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Fleeting Blossom`,
      content: `Resonance Liberation DMG Bonus is increased by <span class="text-desc">30%</span>.`,
      image: 'T_IconDevice_MicaiM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Solitary Carnation`,
      content: `When Danjin has more than <span class="text-desc">60</span> <b class="text-rose-400">Ruby Blossom</b>, her Crit. Rate is increased by <span class="text-desc">15%</span>.
      <br />This effect lasts until the end of Heavy Attack: <b>Scatterbloom</b> even after all <b class="text-rose-400">Ruby Blossom</b> is consumed when casting Heavy Attack: <b>Chaoscleave</b>.`,
      image: 'T_IconDevice_MicaiM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Reigning Blade`,
      content: `Danjin's <b class="text-wuwa-havoc">Havoc DMG Bonus</b> is increased by <span class="text-desc">15%</span>, and further increased by another <span class="text-desc">15%</span> when her HP is lower than <span class="text-desc">60%</span>.`,
      image: 'T_IconDevice_MicaiM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Bloodied Jade`,
      content: `Heavy Attack <b>Chaoscleave</b> increases the ATK of all team members by <span class="text-desc">20%</span> for <span class="text-desc">20</span>s.`,
      image: 'T_IconDevice_MicaiM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'danjin_i1',
      text: `I1 Dodge Erosion Bonus`,
      ...talents.i1,
      show: i.i1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'danjin_i2',
      text: `I2 Heavy ATK Bonus`,
      ...talents.i2,
      show: i.i2,
      default: true,
    },
    {
      type: 'number',
      id: 'danjin_c1',
      text: `S1 ATK Stacks`,
      ...talents.c1,
      show: c >= 1,
      default: 0,
      min: 0,
      max: 6,
    },
    {
      type: 'toggle',
      id: 'danjin_c2',
      text: `S2 DMG Bonus`,
      ...talents.c2,
      show: c >= 2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'danjin_c4',
      text: `S4 Crit Rate Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'toggle',
      id: 'danjin_c5',
      text: `S5 Low-Health Havoc Bonus`,
      ...talents.c5,
      show: c >= 5,
      default: true,
    },
    {
      type: 'toggle',
      id: 'danjin_c6',
      text: `S6 Team ATK Bonus`,
      ...talents.c6,
      show: c >= 6,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'danjin_c6')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'danjin_outro',
        text: `Outro: Duality`,
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
          value: [{ scaling: calcScaling(0.288, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.296, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.4, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.1867, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.496, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.32, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Carmine Gleam DMG',
          value: [{ scaling: calcScaling(0.192, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Crimson Erosion Stage 1 DMG',
          value: [{ scaling: calcScaling(0.324, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
          bonus: form.danjin_i1 ? 0.2 : 0,
        },
        {
          name: 'Crimson Erosion Stage 2 DMG',
          value: [{ scaling: calcScaling(0.3, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
          bonus: form.danjin_i1 ? 0.2 : 0,
        },
        {
          name: 'Sanguine Pulse Stage 1 DMG',
          value: [{ scaling: calcScaling(0.282, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Sanguine Pulse Stage 2 DMG',
          value: [{ scaling: calcScaling(0.216, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Sanguine Pulse Stage 3 DMG',
          value: [{ scaling: calcScaling(0.324, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Consecutive Attack DMG',
          value: [{ scaling: calcScaling(0.2469, lib), multiplier: Stats.ATK, hits: 8 }],
          element: Element.HAVOC,
          property: TalentProperty.LIB,
        },
        {
          name: 'Scarlet Burst DMG',
          value: [{ scaling: calcScaling(1.975, lib), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Chaoscleave DMG',
          value: [{ scaling: calcScaling(0.3, forte), multiplier: Stats.ATK, hits: 7 }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
        },
        {
          name: 'Scatterbloom DMG',
          value: [{ scaling: calcScaling(0.9, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
        },
        {
          name: 'Full Energy Chaoscleave DMG',
          value: [{ scaling: calcScaling(0.72, forte), multiplier: Stats.ATK, hits: 7 }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
        },
        {
          name: 'Full Energy Scatterbloom DMG',
          value: [{ scaling: calcScaling(2.16, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
        },
        {
          name: 'Chaoscleave Healing',
          value: [{ scaling: calcScaling(0.36, forte), multiplier: Stats.HP }],
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Vindication DMG`,
          value: [{ scaling: calcScaling(0.25, intro), multiplier: Stats.ATK, hits: 4 }],
          element: Element.HAVOC,
          property: TalentProperty.INTRO,
        },
      ]

      if (form.danjin_i2) {
        base[Stats.HEAVY_DMG].push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: 0.3,
        })
      }
      if (form.danjin_c1) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 1`,
          source: 'Self',
          value: 0.05 * form.danjin_c1,
        })
      }
      if (form.danjin_c2) {
        base[Stats.ALL_DMG].push({
          name: `Sequence Node 2`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (c >= 3) {
        base[Stats.LIB_DMG].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.3,
        })
      }
      if (form.danjin_c4) {
        base[Stats.CRIT_RATE].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (c >= 5) {
        base[Stats.HAVOC_DMG].push({
          name: `Sequence Node 5`,
          source: 'Self',
          value: 0.15 * (form.danjin_c5 ? 2 : 1),
        })
      }
      if (form.danjin_c6) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.2,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.danjin_outro) {
        base.HAVOC_AMP.push({
          name: `Outro Skill`,
          source: 'Danjin',
          value: 0.23,
        })
      }
      if (form.danjin_c6) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 6`,
          source: 'Danjin',
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

export default Danjin
