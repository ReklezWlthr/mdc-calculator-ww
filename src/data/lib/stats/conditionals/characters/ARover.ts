import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcFlatScaling, calcHealScaling, calcScaling } from '@src/core/utils/data_format'

const ARover = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Wind Cutter`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 4 consecutive attacks, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Consume STA to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />- Press Normal Attack right after casting the skill to perform Basic Attack Stage 3 directly.
      <br />
      <br /><b>Heavy Attack - Razor Wind</b>
      <br />Hold Normal Attack after casting Basic Attack Stage 3, Dodge Counter, or Heavy Attack to cast Heavy Attack <b>Razor Wind</b>. Consume STA to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Consume STA to perform Plunging Attack, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />- Press Normal Attack shortly after landing to cast Basic Attack Stage 4.
      <br />- At max <b class="text-emerald-300">Windstrings</b>, press Normal Attack shortly after landing to cast Resonance Skill <b>Unbound Flow</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Press Normal Attack right after a successful Dodge to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>.`,
      image: 'SP_IconNorKnife',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Illusion Breaker`,
      content: `<b>Awakening Gale</b>
      <br />Jump up into the mid-air and slash the target, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Skyfall Severance</b>
      <br />While in mid-air, press Resonance Skill to deal <b class="text-wuwa-aero">Aero DMG</b>, which removes all stacks of <b class="text-wuwa-spectro">Spectro Frazzle</b>, <b class="text-wuwa-havoc">Havoc Bane</b>, <b class="text-wuwa-fusion">Fusion Burst</b>, <b class="text-wuwa-glacio">Glacio Chafe</b>, and <b class="text-wuwa-electro">Electro Flare</b> from the target hit and inflicts <span class="text-desc">1</span> stack of <b class="text-wuwa-aero">Aero Erosion</b> upon the target for each stack removed.`,
      image: 'SP_IconFengzhuB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Omega Storm`,
      content: `Unleash the power of the Eye of Tempest, dealing <b class="text-wuwa-aero">Aero DMG</b> and healing all nearby Resonators in the team.
      <br />Can be cast in mid-air close to the ground.`,
      image: 'SP_IconFengzhuC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Cycle of Wind`,
      content: `<b>Mid-Air Attack - Cloudburst Dance</b>
      <br />Perform up to 2 consecutive attacks, dealing <b class="text-wuwa-aero">Aero DMG</b> (considered Resonance Skill DMG) and healing all nearby Resonators in the team. Cast through the following 3 ways:
      <br />- Press Normal Attack right after casting Resonance Skill <b>Awakening Gale</b>.
      <br />- Press Normal Attack right after casting <b>Intro Skill</b>.
      <br />- Press Normal Attack right after casting Heavy Attack <b>Razor Wind</b>. When casting Mid-Air Attack <b>Cloudburst Dance</b>, hold Normal Attack to perform Mid-Air Attack.
      <br />
      <br /><b>Resonance Skill: Unbound Flow</b>
      <br />At max <b class="text-emerald-300">Windstrings</b>, Resonance Skill <b>Awakening Gale</b> becomes Resonance Skill <b>Unbound Flow</b>: Perform up to 2 consecutive attacks. Each attack consumes <span class="text-desc">60</span> <b class="text-emerald-300">Windstrings</b>, dealing <b class="text-wuwa-aero">Aero DMG</b>, considered Resonance Skill DMG. Switching to another Resonator after Stage 1 automatically triggers Stage 2 of this skill.
      <br />
      <br /><b class="text-emerald-300">Windstrings</b>
      <br />Rover can hold up to <span class="text-desc">120</span> <b class="text-emerald-300">Windstrings</b>.
      <br />Each stage of Mid-Air Attack <b>Cloudburst Dance</b> restores <span class="text-desc">25</span> <b class="text-emerald-300">Windstrings</b> on hit.
      <br />Casting Intro Skill restores <span class="text-desc">20</span> <b class="text-emerald-300">Windstrings</b>.
      <br />Hitting a target with Basic Attack Stage 3 or 4 or Dodge Counter restores <span class="text-desc">10</span> <b class="text-emerald-300">Windstrings</b>`,
      image: 'SP_IconFengzhuY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Relentless Squall`,
      content: `Deal <b class="text-wuwa-aero">Aero DMG</b>.
`,
      image: 'SP_IconFengzhuQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Storm's Echo`,
      content: `Grant <b>Aeolian Realm</b> to all nearby Resonators in the team for <span class="text-desc">30</span>s. <b>Aeolian Realm</b> effect:
      <br />- Upon hitting a target, increase the maximum stack of <b class="text-wuwa-aero">Aero Erosion</b> the target can receive by <span class="text-desc">3</span> for <span class="text-desc">10</span>s. This effect is not stackable.`,
      image: 'SP_IconFengzhuT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Sand in the Storm`,
      content: `Casting Intro Skill increases ATK by <span class="text-desc">20%</span> for <span class="text-desc">10</span>s.`,
      image: 'SP_IconFengzhuD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Boundless Winds`,
      content: `Increase Healing from Resonance Liberation <b>Omega Storm</b> by <span class="text-desc">20%</span>.`,
      image: 'SP_IconFengzhuD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Storm Subsides in the Void`,
      content: `Casting Mid-Air Attack <b>Cloudburst Dance</b> enhances Rover's resistance to interruption for <span class="text-desc">3</span>s.`,
      image: 'T_IconDevice_FengzhuM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Glimmers Fade into the Dark`,
      content: `Casting Resonance Skill <b>Unbound Flow</b> continuously restores HP for the Resonator on the field by <span class="text-desc">20%</span> of Rover's ATK every <span class="text-desc">3</span>s for <span class="text-desc">30</span>s. When the Resonator on the field has an HP lower than <span class="text-desc">35%</span>, immediately restore <span class="text-desc">10%</span> of their lost HP. This restoration effect can be triggered once every <span class="text-desc">10</span>s and will not be affected by any Healing Bonus.`,
      image: 'T_IconDevice_FengzhuM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Illusions Collapse in a Grip`,
      content: `<b class="text-wuwa-aero">Aero DMG Bonus</b> is increased by <span class="text-desc">15%</span>.`,
      image: 'T_IconDevice_FengzhuM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Boundaries Shatter in an Instant`,
      content: `Casting Mid-Air Attack <b>Cloudburst Dance</b> increases Resonance Skill DMG Bonus by <span class="text-desc">15%</span> for <span class="text-desc">5</span>s.`,
      image: 'T_IconDevice_FengzhuM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Life and Death Intertwine`,
      content: `The DMG Multiplier of Resonance Liberation <b>Omega Storm</b> is increased by <span class="text-desc">20%</span>.`,
      image: 'T_IconDevice_FengzhuM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `All Crumble in the Wind`,
      content: `The DMG Multiplier of Resonance Skill <b>Unbound Flow</b> is increased by <span class="text-desc">30%</span>.`,
      image: 'T_IconDevice_FengzhuM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'arover_i1',
      text: `I1 Intro ATK Bonus`,
      ...talents.i1,
      show: i.i1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'arover_c4',
      text: `S4 Skill DMG Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
  ]

  const teammateContent: IContent[] = []

  return {
    talents,
    content,
    teammateContent,
    allyContent: [],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.DoT = true

      base.BASIC_SCALING = [
        {
          name: 'Stage 1 DMG',
          value: [{ scaling: calcScaling(0.1776, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.2166, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.2769, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(0.3859, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.0901, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
        {
          name: 'Razor Wind DMG',
          value: [
            { scaling: calcScaling(0.183, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.2236, normal), multiplier: Stats.ATK, hits: 2 },
          ],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.708, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.6309, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Awakening Gale DMG',
          value: [
            { scaling: calcScaling(0.3342, skill), multiplier: Stats.ATK },
            { scaling: calcScaling(0.5013, skill), multiplier: Stats.ATK },
          ],
          element: Element.AERO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Skyfall Severance DMG',
          value: [
            { scaling: calcScaling(0.1176, skill), multiplier: Stats.ATK, hits: 3 },
            { scaling: calcScaling(0.5289, skill), multiplier: Stats.ATK },
          ],
          element: Element.AERO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Omega Storm DMG',
          value: [{ scaling: calcScaling(2.7, lib), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.LIB,
          multiplier: c >= 5 ? 1.2 : 1,
        },
        {
          name: 'Omega Storm Healing',
          value: [{ scaling: calcHealScaling(0.3667, lib), multiplier: Stats.ATK }],
          flat: calcFlatScaling(1100, lib),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
          bonus: i.i2 ? 0.2 : 0,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Cloudburst Dance Stage 1 DMG',
          value: [{ scaling: calcScaling(0.6479, forte), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Cloudburst Dance Stage 2 DMG',
          value: [{ scaling: calcScaling(0.7116, forte), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Cloudburst Dance Healing',
          value: [{ scaling: calcHealScaling(0.11, forte), multiplier: Stats.ATK }],
          flat: calcFlatScaling(330, forte),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
        {
          name: 'Unbound Flow Stage 1 DMG',
          value: [{ scaling: calcScaling(0.1726, forte), multiplier: Stats.ATK, hits: 5 }],
          element: Element.AERO,
          property: TalentProperty.SKILL,
          multiplier: c >= 6 ? 1.3 : 0,
        },
        {
          name: 'Unbound Flow Stage 2 DMG',
          value: [{ scaling: calcScaling(3.6368, forte), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.SKILL,
          multiplier: c >= 6 ? 1.3 : 0,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Relentless Squall DMG`,
          value: [
            { scaling: calcScaling(0.4, intro), multiplier: Stats.ATK },
            { scaling: calcScaling(0.6, intro), multiplier: Stats.ATK },
          ],
          element: Element.AERO,
          property: TalentProperty.INTRO,
        },
      ]

      if (form.arover_i1) {
        base[Stats.P_ATK].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (c >= 2) {
        base.FORTE_SCALING.push({
          name: 'S2 Unbound Flow Healing per Tick',
          value: [{ scaling: 0.2, multiplier: Stats.ATK }],
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        })
      }
      if (c >= 3) {
        base[Stats.AERO_DMG].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (form.arover_c4) {
        base[Stats.SKILL_DMG].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.15,
        })
      }

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

export default ARover
