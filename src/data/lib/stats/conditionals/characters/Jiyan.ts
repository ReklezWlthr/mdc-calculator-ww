import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Jiyan = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Lone Lance`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 5 consecutive attacks, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Consume Stamina to thrust forward, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Heavy Attack: Windborne Strike</b>
      <br />Hold Basic Attack during Heavy Attack to cast <b>Windborne</b> Strike after Heavy Attack ends, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Heavy Attack: Abyssal Slash</b>
      <br />Release Basic Attack during Heavy Attack to cast <b>Abyssal Slash</b> after Heavy Attack ends, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Consume Stamina to perform a Plunging Attack while in mid-air, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />After performing the Plunging Attack, use Basic Attack to perform a follow-up attack, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Mid-Air Attack: Banner of Triumph</b>
      <br />After casting Heavy Attack <b>Windborne Strike</b> or Resonance Skill <b>Windqueller</b> in mid-air, Jiyan can perform a mid-air attack, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br />Dodge Counter
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>.`,
      image: 'SP_IconNorSword',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Windqueller`,
      content: `Dash forward a certain distance, dealing <b class="text-wuwa-aero">Aero DMG</b>.`,
      image: 'SP_IconJiyanB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Emerald Storm - Prelude`,
      content: `After releasing <b>Emerald Storm - Prelude</b>, Jiyan enters <b class="text-emerald-300">Qingloong Mode</b>.
      <br />
      <br /><b class="text-emerald-300">Qingloong Mode</b>
      <br />Jiyan has increased resistance to interruption.
      <br />Basic Attack, Heavy Attack and Dodge Counter are replaced with Heavy Attack <b>Lance of Qingloong</b>.
      <br />
      <br /><b>Heavy Attack: Lance of Qingloong</b>
      <br />Perform up to 3 consecutive attacks, dealing <b class="text-wuwa-aero">Aero DMG</b>, considered as Heavy Attack DMG.`,
      image: 'SP_IconJiyanC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Qingloong at War`,
      content: `When casting Resonance Skill <b>Windqueller</b>, if Jiyan has <span class="text-desc">30</span> or more <b class="text-emerald-400">Resolve</b>, he consumes <span class="text-desc">30</span> <b class="text-emerald-400">Resolve</b> to increase the DMG of this Resonance Skill <b>Windqueller</b>> by <span class="text-desc">20%</span>.
      <br />When Jiyan is in <b class="text-emerald-300">Qingloong Mode</b>, DMG of Resonance Skill Windqueller is increased by <span class="text-desc">20%</span> and no longer consumes <b class="text-emerald-400">Resolve</b>.
      <br />
      <br />Resonance Liberation: Emerald Storm - Finale
      <br />When casting Resonance Liberation <b>Emerald Storm - Prelude</b>, if Jiyan has <span class="text-desc">30</span> <b class="text-emerald-400">Resolve</b> or more, he will consume <span class="text-desc">30</span> <b class="text-emerald-400">Resolve</b> to cast <b>Emerald Storm - Finale</b>, dealing <b class="text-wuwa-aero">Aero DMG</b>, considered as Heavy Attack DMG.
      <br /><b>Emerald Storm: Finale</b> can be cast in mid-air at low altitude.
      <br />
      <br /><b class="text-emerald-400">Resolve</b>
      <br />Jiyan can hold up to <span class="text-desc">60</span> <b class="text-emerald-400">Resolve</b>.
      <br />Jiyan gains <b class="text-emerald-400">Resolve</b> when his Normal Attack <b>Lone Lance</b> hits the target.
      <br />Jiyan gains <b class="text-emerald-400">Resolve</b> when the Intro Skill <b>Tactical Strike</b> hits the target.
      <br /><b class="text-emerald-400">Resolve</b> will gradually decrease if Jiyan does not hit a target within <span class="text-desc">15</span>s.`,
      image: 'SP_IconJiyanY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Tactical Strike`,
      content: `Jiyan pierces the target in mid-air, dealing <b class="text-wuwa-aero">Aero DMG</b>.`,
      image: 'SP_IconJiyanQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Discipline`,
      content: `When the incoming Resonator's Heavy Attack hits a target, Jiyan will summon a lance to launch a coordinated attack, dealing Aero DMG equal to <span class="text-desc">313.4%</span> of Jiyan's ATK. This attack lasts for <span class="text-desc">8</span>s and can be triggered once every <span class="text-desc">1</span>s, up to <span class="text-desc"2</span> times.`,
      image: 'SP_IconJiyanT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Heavenly Balance`,
      content: `After casting the Intro Skill <b>Tactical Strike</b>, Jiyan's ATK is increased by <span class="text-desc">10%</span> for <span class="text-desc">15</span>s.`,
      image: 'SP_IconJiyanD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Tempest Taming`,
      content: `When Jiyan's attacks hit a target, Jiyan's Crit. DMG is increased by <span class="text-desc">12%</span> for <span class="text-desc">8</span>s.`,
      image: 'SP_IconJiyanD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Benevolence`,
      content: `Resonance Skill <b>Windqueller</b> can be used <span class="text-desc">1</span> more time.
      <br />When casting Resonance Skill <b>Windqueller</b>, the <b class="text-emerald-400">Resolve</b> cost is decreased by <span class="text-desc">15</span>.`,
      image: 'T_IconDevice_JiyanM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Versatility`,
      content: `After casting Intro Skill <b>Tactical Strike</b>, Jiyan gains <span class="text-desc">30</span> <b class="text-emerald-400">Resolve</b> and his ATK is increased by <span class="text-desc">28%</span> for <span class="text-desc">15</span>s. This can be triggered once every <span class="text-desc">15</span>s.`,
      image: 'T_IconDevice_JiyanM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Spectation`,
      content: `When casting Resonance Skill <b>Windqueller</b>, Resonance Liberation <b>Emerald Storm: Prelude</b>, Resonance Skill <b>Emerald Storm: Finale</b> or Intro Skill <b>Tactical Strike</b>, Jiyan's Crit. Rate is increased by <span class="text-desc">16%</span> and Crit. DMG is increased by <span class="text-desc">32%</span> for <span class="text-desc">8</span>s.`,
      image: 'T_IconDevice_JiyanM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Prudence`,
      content: `When casting Resonance Liberation <b>Emerald Storm: Prelude</b> or Resonance Liberation <b>Emerald Storm: Finale</b>, the Heavy Attack DMG Bonus of all team members is increased by <span class="text-desc">25%</span> for <span class="text-desc">30</span>s.`,
      image: 'T_IconDevice_JiyanM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Resolution`,
      content: `Outro Skill <b>Discipline</b> gains an additional DMG Multiplier of <span class="text-desc">120%</span>.
      <br />When Jiyan's attacks hit a target, his ATK is increased by <span class="text-desc">3%</span> for <span class="text-desc">8</span>s, stacking up to <span class="text-desc">15</span> times; this effect is immediately maxed after he casts Intro Skill <b>Tactical Strike</b>.`,
      image: 'T_IconDevice_JiyanM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Fortitude`,
      content: `Every time Heavy Attack, Intro Skill <b>Tactical Strike</b> or Resonance Skill <b>Windqueller</b> is used, Jiyan gains <span class="text-desc">1</span> stack(s) of <b class="text-emerald-400">Momentum</b>, stacking up to <span class="text-desc">2</span> times.
      <br />Resonance Liberation <b>Emerald Storm: Finale</b> will consume all <b class="text-emerald-400">Momentum</b>, and each stack consumed increases the DMG multiplier of Resonance Liberation <b>Emerald Storm: Finale</b> by <span class="text-desc">120%</span>.`,
      image: 'T_IconDevice_JiyanM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'jiyan_i1',
      text: `I1 ATK Bonus`,
      ...talents.i1,
      show: i.i1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'jiyan_i2',
      text: `I2 Crit DMG Bonus`,
      ...talents.i2,
      show: i.i2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'jiyan_c2',
      text: `S2 ATK Bonus`,
      ...talents.c2,
      show: c >= 2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'jiyan_c3',
      text: `S3 Crit Bonus`,
      ...talents.c3,
      show: c >= 3,
      default: true,
    },
    {
      type: 'toggle',
      id: 'jiyan_c4',
      text: `S4 Team Heavy ATK Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'number',
      id: 'jiyan_c5',
      text: `S5 ATK Bonus`,
      ...talents.c5,
      show: c >= 5,
      default: 15,
      min: 0,
      max: 15,
    },
    {
      type: 'number',
      id: 'jiyan_c6',
      text: `Momentum Stacks`,
      ...talents.c6,
      show: c >= 6,
      default: 2,
      min: 0,
      max: 2,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'jiyan_c4')]

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
          value: [{ scaling: calcScaling(0.368, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.22, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.183, normal), multiplier: Stats.ATK, hits: 5 }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(0.333, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 5 DMG',
          value: [
            { scaling: calcScaling(0.1187, normal), multiplier: Stats.ATK, hits: 7 },
            { scaling: calcScaling(0.7718, normal), multiplier: Stats.ATK, hits: 2 },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.1116, normal), multiplier: Stats.ATK, hits: 6 }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
        {
          name: 'Windborne DMG',
          value: [{ scaling: calcScaling(0.533, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
        {
          name: 'Abyssal Slash DMG',
          value: [{ scaling: calcScaling(0.411, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          value: [{ scaling: calcScaling(0.62, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Mid-Air Attack Follow-Up DMG',
          value: [{ scaling: calcScaling(0.783, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Banner of Triumph DMG',
          value: [{ scaling: calcScaling(0.4, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          value: [{ scaling: calcScaling(0.633, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Windqueller DMG',
          value: [{ scaling: calcScaling(0.535, skill), multiplier: Stats.ATK, hits: 4 }],
          element: Element.AERO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Enhanced Windqueller DMG',
          value: [{ scaling: calcScaling(0.535, skill), multiplier: Stats.ATK, hits: 4 }],
          element: Element.AERO,
          property: TalentProperty.SKILL,
          bonus: 0.2,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Lance of Qingloong Stage 1 DMG',
          value: [{ scaling: calcScaling(0.3295, lib), multiplier: Stats.ATK, hits: 8 }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
        {
          name: 'Lance of Qingloong Stage 2 DMG',
          value: [{ scaling: calcScaling(0.3096, lib), multiplier: Stats.ATK, hits: 8 }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
        {
          name: 'Lance of Qingloong Stage 3 DMG',
          value: [{ scaling: calcScaling(0.3358, lib), multiplier: Stats.ATK, hits: 8 }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Emerald Storm: Finale DMG',
          value: [
            { scaling: calcScaling(0.7188, forte), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(2.1564, forte), multiplier: Stats.ATK },
          ],
          element: Element.AERO,
          property: TalentProperty.HA,
          multiplier: form.jiyan_c6 ? 1 + form.jiyan_c6 * 1.2 : 1,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Tactical Strike DMG`,
          value: [{ scaling: calcScaling(1, intro), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.INTRO,
        },
      ]
      base.OUTRO_SCALING = [
        {
          name: `Discipline DMG`,
          value: [{ scaling: 3.134, multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.OUTRO,
          multiplier: c >= 5 ? 2.2 : 1,
        },
      ]

      if (form.jiyan_i1) {
        base[Stats.P_ATK].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.1,
        })
      }
      if (form.jiyan_i2) {
        base[Stats.CRIT_DMG].push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: 0.12,
        })
      }
      if (form.jiyan_c2) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 2`,
          source: 'Self',
          value: 0.28,
        })
      }
      if (form.jiyan_c3) {
        base[Stats.CRIT_RATE].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.16,
        })
        base[Stats.CRIT_DMG].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.32,
        })
      }
      if (form.jiyan_c4) {
        base[Stats.HEAVY_DMG].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.25,
        })
      }
      if (form.jiyan_c5) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 5`,
          source: 'Self',
          value: 0.03 * form.jiyan_c5,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.jiyan_c4) {
        base[Stats.HEAVY_DMG].push({
          name: `Sequence Node 4`,
          source: 'Jiyan',
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

export default Jiyan
