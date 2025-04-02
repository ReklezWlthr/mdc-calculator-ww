import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcFlatScaling, calcHealScaling, calcScaling } from '@src/core/utils/data_format'

const Cantarella = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Illusion Collapse`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 3 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Consume STA to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Heavy Attack - Delusive Dive</b>
      <br />When Cantarella has <b class="text-[#E44A8F]">Trance</b>, Heavy Attack becomes <b>Delusive Dive</b>, dealing <b class="text-wuwa-havoc">Havoc DMG</b> to the target, and then Cantarella enters <b class="text-fuchsia-300">Mirage</b>. While in <b class="text-fuchsia-300">Mirage</b>, casting <b>Delusive Dive</b> does not activate <b class="text-fuchsia-300">Mirage</b> again. Can be cast in water.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Consume STA to perform Plunging Attack, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Press Normal Attack right after a successful Dodge to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.`,
      image: 'SP_IconNorMagic',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Dance with Shadows`,
      content: `<b>Graceful Step</b>
      <br />Attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Flickering Reverie</b>
      <br />When in <b class="text-fuchsia-300">Mirage</b>, Resonance Skill becomes <b>Flickering Reverie</b>, which is considered an Echo Skill when being cast. Attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>, and send them into <b class="text-violet-300">Hazy Dream</b>.
      <br />
      <br /><b class="text-violet-300">Hazy Dream</b>
      <br />Reduce the target's movement speed for <span class="text-desc">6.5</span>s. When the target takes damage, <b>Jolt</b> is triggered once, removing <b class="text-violet-300">Hazy Dream</b> to deal <b class="text-wuwa-havoc">Havoc DMG</b>, considered Basic Attack DMG.
      <br />Attacks by other Resonators in the team will not <b>Jolt</b> a target influenced by <b class="text-violet-300">Hazy Dream</b> and will remove the <b class="text-violet-300">Hazy Dream</b>.
      <br />Coordinated Attacks and damage from Utilities will not <b>Jolt</b> a target.`,
      image: 'SP_IconKanteleilaB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Beneath the Sea`,
      content: `<b>Flowing Suffocation</b>
      <br />Attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b> (considered Basic Attack DMG). Grant <b class="text-indigo-300">Diffusion</b> to all Resonators in the team. Casting this skill is also considered as casting Echo Skill.
      <br />Can be cast in mid-air close to the ground.
      <br />
      <br /><b class="text-indigo-300">Diffusion</b>
      <br />When the Resonator on the field deals damage to a target, summon <b>Dreamweavers</b> to perform Coordinated Attack, dealing <b class="text-wuwa-havoc">Havoc DMG</b> (considered as Basic Attack DMG).
      <br />- Within <span class="text-desc">3</span>s after the Resonator deals damage, summons <span class="text-desc">1</span> <b>Dreamweaver</b> per second. This effect can be triggered once per second. Damage dealt by <b>Dreamweavers</b> cannot trigger this effect.
      <br />- Up to <span class="text-desc">1</span> <b>Dreamweaver</b> can be summoned each second, max <span class="text-desc">21</span> <b>Dreamweavers</b> in total.
      <br />- This effect lasts for <span class="text-desc">30</span>s or until reaching the maximum number of <b>Dreamweavers</b>.`,
      image: 'SP_IconKanteleilaC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Between Illusion and Reality`,
      content: `<b class="text-fuchsia-300">Mirage</b>
      <br />- Basic Attack becomes Basic Attack <b>Phantom Sting</b>. Perform up to 3 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>. Can be cast in mid-air. When cast mid-air, Basic Attack <b>Phantom Sting</b> consumes STA, and the combo does not reset when Cantarella is airborne.
      <br />- Hitting the target with Basic Attack <b>Phantom Sting</b> consumes <span class="text-desc">1</span> point of <b class="text-[#E44A8F]">Trance</b> to obtain <span class="text-desc">1</span> point of <b class="text-fuchsia-200">Shiver</b> and heal all nearby Resonators in the team.
      <br />- The third stage of Basic Attack <b>Phantom Sting</b> triggers <span class="text-desc">3</span> Coordinated Attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />- Mid-Air Attack becomes <b>Abysmal Vortex</b>. Press Jump to perform a Plunging Attack at the cost of STA, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />- Dodge Counter becomes Dodge Counter <b>Shadowy Sweep</b>. Attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>. Press Normal Attack right after casting the skill to cast Basic Attack <b>Phantom Sting</b> Stage 2.
      <br />- When Mid-air Attack <b>Abysmal Vortex</b> or Dodge Counter <b>Shadowy Sweep</b> hits a target, consume <span class="text-desc">1</span> point of <b class="text-[#E44A8F]">Trance</b> to obtain <span class="text-desc">1</span> point of <b class="text-fuchsia-200">Shiver</b> and heal all nearby Resonators in the team.
      <br />- <b class="text-fuchsia-300">Mirage</b> lasts for <span class="text-desc">8</span>s.
      <br />- <b class="text-fuchsia-300">Mirage</b> ends when all <b class="text-[#E44A8F]">Trance</b> is depleted.
      <br />
      <br /><b>Forte Circuit - Perception Drain</b>
      <br />If Cantarella has <span class="text-desc">3</span> points of <b class="text-fuchsia-200">Shiver</b> in <b class="text-fuchsia-300">Mirage</b>, Resonance Skill becomes <b>Perception Drain</b>.
      <br />Consume all <b class="text-fuchsia-200">Shiver</b> to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>, considered Basic Attack DMG. Send the target into <b class="text-violet-300">Hazy Dream</b> and heal all Resonators in the team.
      <br />Casting this skill is also considered as casting Echo Skill.
      <br />Can be cast in mid-air.
      <br />
      <br /><b>Abyssal Rebirth</b>
      <br />After casting Intro Skill, Cantarella enters <b>Abyssal Rebirth</b>, which lasts for <span class="text-desc">25</span>s and can be activated once every <span class="text-desc">25</span>s. In the duration, for up to <span class="text-desc">6</span> times, when Resonators in the team cast Echo Skill, Cantarella recovers <span class="text-desc">6</span> points of Concerto Energy. Echoes with the same name can trigger this effect once. When in water, Cantarella's swimming speed increases and STA cost decreases.
      <br />
      <br /><b class="text-[#E44A8F]">Trance</b>
      <br />- Cantarella can hold up to <span class="text-desc">5</span> points of <b class="text-[#E44A8F]">Trance</b>.
      <br />- Casting Intro Skill recovers <span class="text-desc">1</span> points of <b class="text-[#E44A8F]">Trance</b>.
      <br />- Hitting the target with Basic Attack Stage 3 recovers <span class="text-desc">1</span> points of <b class="text-[#E44A8F]">Trance</b>.
      <br />- Casting Resonance Skill <b>Graceful Step</b> recovers <span class="text-desc">1</span> points of <b class="text-[#E44A8F]">Trance</b>.
      <br />- Casting Resonance Liberation <b>Flowing Suffocation</b> recovers <span class="text-desc">2</span> points of <b class="text-[#E44A8F]">Trance</b>.
      <br />- When in the water, recover <span class="text-desc">1</span> point of <b class="text-[#E44A8F]">Trance</b> every <span class="text-desc">5</span>s.
      <br />
      <br /><b class="text-fuchsia-200">Shiver</b>
      <br />Cantarella can hold up to <span class="text-desc">3</span> points of <b class="text-fuchsia-200">Shiver</b>.
      <br />- Hitting the target with Basic Attack <b>Phantom Sting</b> recovers <span class="text-desc">1</span> point of <b class="text-fuchsia-200">Shiver</b>.
      <br />- When Mid-Air Attack <b>Abysmal Vortex</b> or Dodge Counter <b>Shadowy Sweep</b> hits a target, restore <span class="text-desc">1</span> point of <b class="text-fuchsia-200">Shiver</b>`,
      image: 'SP_IconKanteleilaY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Cruise`,
      content: `<b>Ripple</b>
      <br />Attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>. Press Normal Attack shortly after casting this skill to start the Basic Attack combo from Basic Attack Stage 3.
      <br />
      <br /><b>Tidal Surge</b>
      <br />When in <b class="text-fuchsia-300">Mirage</b>, Intro Skill becomes <b>Tidal Surge</b>, which triggers <span class="text-desc">3</span> coordinated attacks on hit, dealing <b class="text-wuwa-havoc">Havoc DMG</b>. Casting <b>Tidal Surge</b> resets the combo of Basic Attack <b>Phantom Sting</b>.
`,
      image: 'SP_IconKanteleilaQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Gentle Tentacles`,
      content: `Amplify the incoming Resonator's <b class="text-wuwa-havoc">Havoc DMG</b> by <span class="text-desc">20%</span> and Resonance Skill DMG by <span class="text-desc">25%</span> for <span class="text-desc">14</span>s. Switching Resonators ends this effect.`,
      image: 'SP_IconKanteleilaT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `"Cure"`,
      content: `Increase Healing Bonus by <span class="text-desc">20%</span>.`,
      image: 'SP_IconKanteleilaD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `"Poison"`,
      content: `Casting Echo Skill gives <span class="text-desc">6%</span> <b class="text-wuwa-havoc">Havoc DMG Bonus</b> for <span class="text-desc">10</span>s, stacking up to <span class="text-desc">2</span> times.`,
      image: 'SP_IconKanteleilaD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Embrace the Endless Waves`,
      content: `Casting Resonance Skill recovers <span class="text-desc">1</span> point of <b class="text-[#E44A8F]">Trance</b>. The DMG Multiplier of Resonance Skill <b>Graceful Step</b>, Resonance Skill <b>Flickering Reverie</b>, and Forte Circuit <b>Perception Drain</b> is increased by <span class="text-desc">50%</span>. Immune to interruptions while casting <b>Perception Drain</b>.`,
      image: 'T_IconDevice_KanteleilaM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Surrender to the Illusive Reverie`,
      content: `Resonance Liberation <b>Flowing Suffocation</b> now sends the target into <b class="text-violet-300">Hazy Dream</b>. The DMG Multiplier of <b>Jolt</b> triggered by Cantarella is increased by <span class="text-desc">245%</span>.`,
      image: 'T_IconDevice_KanteleilaM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Gaze into the Abyss`,
      content: `The DMG Multiplier of Resonance Liberation <b>Flowing Suffocation</b> is increased by <span class="text-desc">370%</span>. After casting Resonance Liberation <b>Flowing Suffocation</b>, enter into <b class="text-fuchsia-300">Mirage</b>. If already in <b class="text-fuchsia-300">Mirage</b>, casting Resonance Liberation <b>Flowing Suffocation</b> does not activate the <b class="text-fuchsia-300">Mirage</b> state again.`,
      image: 'T_IconDevice_KanteleilaM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Behold Your Own Soul`,
      content: `When in <b class="text-fuchsia-300">Mirage</b>, Healing Bonus is increased by <span class="text-desc">25%</span>.`,
      image: 'T_IconDevice_KanteleilaM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Rest in Your Reflection`,
      content: `The maximum number of <b>Dreamweavers</b> Cantarella can summon through Resonance Liberation <b>Diffusion</b> is increased by <span class="text-desc">5</span>.`,
      image: 'T_IconDevice_KanteleilaM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Fall, Fall... and Fall Deeper into the Dream`,
      content: `Increase the DMG Multiplier of Basic Attack <b>Phantom Sting</b> by <span class="text-desc">80%</span>. Casting Resonance Liberation <b>Flowing Suffocation</b> makes Cantarella's DMG ignore <span class="text-desc">30%</span> of the target's DEF for <span class="text-desc">10</span>s. For the first <span class="text-desc">1.2</span>s of <b class="text-violet-300">Hazy Dream</b>, when the target takes an instance of DMG that does not inflict <b class="text-violet-300">Hazy Dream</b>, <b>Jolt</b> will not be triggered on the target.`,
      image: 'T_IconDevice_KanteleilaM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'number',
      id: 'cante_i2',
      text: `"Poison" Stacks`,
      ...talents.i2,
      show: i.i2,
      default: 1,
      min: 0,
      max: 2,
    },
    {
      type: 'toggle',
      id: 'cante_c4',
      text: `S4 Mirage Healing Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'toggle',
      id: 'cante_c6',
      text: `S6 DEF PEN`,
      ...talents.c6,
      show: c >= 6,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'Kanteleila_c4')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'cante_outro',
        text: `Outro: Gentle Tentacles`,
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
          value: [{ scaling: calcScaling(0.4, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.1833, normal), multiplier: Stats.ATK, hits: 4 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.365, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.2876, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
        },
        {
          name: 'Delusive Dive DMG',
          value: [{ scaling: calcScaling(0.2662, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          scale: Stats.ATK,
          value: [
            { scaling: calcScaling(0.2112, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.3168, normal), multiplier: Stats.ATK },
          ],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.2666, normal), multiplier: Stats.ATK, hits: 4 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Graceful Step DMG',
          value: [{ scaling: calcScaling(0.3702, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
          multiplier: c >= 1 ? 1.5 : 1,
        },
        {
          name: 'Flickering Reverie DMG',
          value: [{ scaling: calcScaling(0.987, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
          multiplier: c >= 1 ? 1.5 : 1,
        },
        {
          name: 'Jolt DMG',
          value: [{ scaling: calcScaling(1, skill), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
          multiplier: c >= 2 ? 3.45 : 1,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Flowing Suffocation DMG',
          value: [{ scaling: calcScaling(1.8913, lib), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.LIB,
          multiplier: c >= 3 ? 4.7 : 1,
        },
        {
          name: 'Diffusion DMG',
          value: [{ scaling: calcScaling(0.0731, lib), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
          coord: true,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Phantom Sting Stage 1 DMG',
          value: [{ scaling: calcScaling(0.1777, forte), multiplier: Stats.ATK, hits: 3 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
          multiplier: c >= 6 ? 1.8 : 1,
        },
        {
          name: 'Phantom Sting Stage 2 DMG',
          value: [{ scaling: calcScaling(0.3165, forte), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
          multiplier: c >= 6 ? 1.8 : 1,
        },
        {
          name: 'Phantom Sting Stage 3 DMG',
          value: [{ scaling: calcScaling(0.325, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
          multiplier: c >= 6 ? 1.8 : 1,
        },
        {
          name: 'Phantom Sting Stage 3 Coordinated DMG',
          value: [{ scaling: calcScaling(0.325, forte), multiplier: Stats.ATK, hits: 3 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
          multiplier: c >= 6 ? 1.8 : 1,
          coord: true,
        },
        {
          name: 'Abysmal Vortex DMG',
          value: [
            { scaling: calcScaling(0.2112, forte), multiplier: Stats.ATK },
            { scaling: calcScaling(0.3168, forte), multiplier: Stats.ATK },
          ],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Perception Drain DMG',
          value: [{ scaling: calcScaling(3.36, forte), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
          multiplier: c >= 1 ? 1.5 : 1,
        },
        {
          name: 'Shadowy Sweep DMG',
          value: [{ scaling: calcScaling(0.3777, forte), multiplier: Stats.ATK, hits: 3 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Phantom Sting Healing',
          value: [{ scaling: calcHealScaling(0.216, forte), multiplier: Stats.ATK }],
          flat: calcFlatScaling(90, forte),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
        {
          name: 'Perception Drain Healing',
          value: [{ scaling: calcHealScaling(0.9, forte), multiplier: Stats.ATK }],
          flat: calcFlatScaling(375, forte),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Ripple DMG`,
          value: [{ scaling: calcScaling(0.2125, intro), multiplier: Stats.ATK, hits: 4 }],
          element: Element.HAVOC,
          property: TalentProperty.INTRO,
        },
        {
          name: `Tidal Surge DMG`,
          value: [{ scaling: calcScaling(0.595, intro), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.INTRO,
        },
        {
          name: `Tidal Surge Coordinated DMG`,
          value: [{ scaling: calcScaling(0.085, intro), multiplier: Stats.ATK, hits: 3 }],
          element: Element.HAVOC,
          property: TalentProperty.INTRO,
          coord: true,
        },
      ]

      if (i.i1) {
        base[Stats.HEAL].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (form.cante_i2) {
        base[Stats.HAVOC_DMG].push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: 0.06 * form.cante_i2,
        })
      }
      if (form.cante_c4) {
        base[Stats.HEAL].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.25,
        })
      }
      if (form.cante_c6) {
        base.DEF_PEN.push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.3,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.cante_outro) {
        base.HAVOC_AMP.push({
          name: `Outro Skill`,
          source: 'Cantarella',
          value: 0.2,
        })
        base.SKILL_AMP.push({
          name: `Outro Skill`,
          source: 'Cantarella',
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

export default Cantarella
