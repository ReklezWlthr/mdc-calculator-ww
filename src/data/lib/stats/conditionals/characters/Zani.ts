import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import {
  Element,
  ITalentLevel,
  ITeamChar,
  Stats,
  TalentProperty,
  TalentSubType,
  WeaponType,
} from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Zani = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const on_fire = `<b>Scorching Light</b>
      <br />When Zani is in <b class="text-amber-200">Inferno Mode</b>, Heavy Slash - <b>Daybreak</b>, Heavy Slash - <b>Dawning</b>, Heavy Slash - <b>Nightfall</b>, and Heavy Slash - <b>Lightsmash</b> become available, which deal <b class="text-wuwa-spectro">Spectro DMG</b> what is considered both Heavy Attack DMG and <b class="text-wuwa-spectro">Spectro Frazzle</b> DMG.
      <br />When <b class="text-red">Blaze</b> is no less than <span class="text-desc">30</span>, Resonance Skill <b>Standard Defense Protocol</b> is replaced with Resonance Skill <b>Scorching Light</b>.
      <br />Hold Resonance Skill to enter <b>Ready Stance</b>, during which Zani is immune to interruption. This state ends early when Zani is switched off the field. While in <b>Ready Stance</b>, release Resonance Skill button within a certain time to consume <b class="text-red">Blaze</b> and perform Heavy Slash - <b>Daybreak</b>.
      <br />When attacked in a certain time after entering <b>Ready Stance</b>, reduce this instance of damage by <span class="text-desc">100%</span> and Stagnate nearby targets, then perform Heavy Slash - <b>Lightsmash</b>, consuming <b class="text-red">Blazes</b> and further reducing their Vibration Strength by <span class="text-desc">10%</span>. Zani's DMG taken within the next <span class="text-desc">2</span>s is reduced by <span class="text-desc">30%</span>.
      <br />After casting Heavy Slash - <b>Lightsmash</b>, Basic Attack is replaced with Heavy Slash - <b>Nightfall</b>, consuming up to <span class="text-desc">40</span> <b class="text-red">Blazes</b> on hit, with each <b class="text-red">Blaze</b> increasing the DMG Multiplier of Heavy Slash - <b>Nightfall</b>. If Heavy Slash - <b>Nightfall</b> Stage 1 is interrupted, press Basic Attack again to cast Heavy Slash - <b>Nightfall</b> Stage 2.
      <br />Upon releasing the button after a certain time or when <b>Ready Stance</b> ends, immediately perform Heavy Slash - <b>Nightfall</b>.
      <br />When <b class="text-red">Blaze</b> is no less than <span class="text-desc">30</span>, Basic Attack is replaced with Heavy Slash - <b>Daybreak</b>. After entering <b class="text-amber-200">Inferno Mode</b>, casting Basic Attack immediately replaces the current Basic Attack with Resonance Skill <b>Scorching Light</b>. Hold Basic Attack to enter <b>Ready Stance</b>.
      <br />After performing Heavy Slash - <b>Daybreak</b>, press Basic Attack immediately to perform Heavy Slash - <b>Dawning</b> at the cost of <b class="text-red">Blaze</b>.
      <br />After performing Heavy Slash - <b>Dawning</b>, Basic Attack is replaced with Heavy Slash - <b>Nightfall</b>.
      <br />If Basic Attack is not replaced with Heavy Slash - <b>Nightfall</b> after a successful Dodge and Zani has no less than <span class="text-desc">30</span> <b class="text-red">Blazes</b>, press Normal Attack within a certain time to perform Heavy Slash - <b>Lightsmash</b> at the cost of <b class="text-red">Blazes</b>.`

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Routine Negotiation`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 4 consecutive attacks to deal <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />After performing Basic Attack Stage 3, press Normal Attack at the right time to perform Basic Attack <b>Breakthrough</b>, which can be followed by Basic Attack Stage 4 by pressing Normal Attack again.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Consume STA to attack the target, dealing <b class="text-wuwa-spectro">Spectro DMG</b>. Press Normal Attack within a certain time to perform Basic Attack Stage 3.
      <br />
      <br /><b>Mid-air Attack</b>
      <br />Consume STA to perform a plunging attack, dealing <b class="text-wuwa-spectro">Spectro DMG</b>. Press Normal Attack within a certain time to perform Basic Attack Stage 3.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Press Normal Attack within a certain time after a successful Dodge to attack the target, dealing <b class="text-wuwa-spectro">Spectro DMG</b>. Then press Normal Attack at the right time to cast Basic Attack <b>Breakthrough</b>.`,
      image: 'SP_IconNorFist',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Restless Watch`,
      content: `<b>Standard Defense Protocol</b>
      <br />Attack the target to deal <b class="text-wuwa-spectro">Spectro DMG</b> and enter a block stance. This state ends early if Zani is switched off the field.
      <br />Press Normal Attack within a certain time to perform Basic Attack Stage 3, recovering <span class="text-desc">10</span> points of <b class="text-amber-500">Redundant Energy</b> and Stagnating the target on hit.
      <br />When attacked by an enemy while in block stance, reduce this instance of damage by <span class="text-desc">100%</span> and Stagnate nearby targets, then cast <b>Pinpoint Strike</b>, dealing <b class="text-wuwa-spectro">Spectro DMG</b> and further reducing their Vibration Strength by <span class="text-desc">5%</span>. DMG taken by Zani is reduced by <span class="text-desc">30%</span> within the next <span class="text-desc">2</span>s.
      <br />
      <br /><b>Crisis Response Protocol</b>
      <br />When Zani is not in <b class="text-amber-200">Inferno Mode</b> and has full <b class="text-amber-500">Redundant Energy</b>, her Resonance Skill is replaced with Resonance Skill <b>Crisis Response Protocol</b>.
      <br />Hold Resonance Skill to enter <b>Ready Stance</b>. While in <b>Ready Stance</b>, Zani is immune to interruption. This state ends early if Zani is switched off the field. After releasing Resonance Skill button or when the stance duration ends, consume all <b class="text-amber-500">Redundant Energy</b> to cast <b>Targeted Action</b>, dealing <b class="text-wuwa-spectro">Spectro DMG</b>, which is also considered <b class="text-wuwa-spectro">Spectro Frazzle</b> DMG.
      <br />When attacked by an enemy while in <b>Ready Stance</b>, reduce this instance of damage by <span class="text-desc">100%</span> and consume all <b class="text-amber-500">Redundant Energy</b> to cast <b>Forcible Riposte</b>, dealing <b class="text-wuwa-spectro">Spectro DMG</b> (also considered <b class="text-wuwa-spectro">Spectro Frazzle</b> DMG), Stagnating the target, and further reducing their Vibration Strength by <span class="text-desc">5%</span>. The DMG taken by Zani is reduced by <span class="text-desc">30%</span> within the next <span class="text-desc">2</span>s.
      <br />Casting <b>Targeted Action</b> or <b>Forcible Riposte</b> sends Zani into <b class="text-wuwa-spectro">Sunburst</b> mode and inflicts a stack of <b class="text-orange-300">Heliacal Ember</b> upon the target on hit.
      <br />
      <br /><b class="text-wuwa-spectro">Sunburst</b>
      <br />The <b class="text-wuwa-spectro">Spectro Frazzle</b> DMG dealt by Zani to the target is Amplified by <span class="text-desc">20%</span>.`,
      image: 'SP_IconZanniB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Between Dawn and Dusk`,
      content: `<b>Rekindle</b>
      <br />Deal <b class="text-wuwa-spectro">Spectro DMG</b> and enter <b class="text-amber-200">Inferno Mode</b>, increasing Max <b class="text-red">Blaze</b> from <span class="text-desc">100</span> to <span class="text-desc">150</span> and granting <span class="text-desc">50</span> <b class="text-red">Blazes</b>. When in <b class="text-amber-200">Inferno Mode</b>, the DMG Multiplier of Basic Attack is increased.
      <br />
      <br /><b>The Last Stand</b>
      <br />When in <b class="text-amber-200">Inferno Mode</b>, Resonance Liberation <b>The Last Stand</b> becomes available when <b class="text-red">Blaze</b> is lower than <span class="text-desc">30</span> or after <span class="text-desc">8</span>s in <b class="text-amber-200">Inferno Mode</b>.
      <br />Casting Resonance Liberation <b>The Last Stand</b> deals <b class="text-wuwa-spectro">Spectro DMG</b> and ends the <b class="text-amber-200">Inferno Mode</b>.`,
      image: 'SP_IconZanniC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `There Will Be A Light`,
      content: `<b class="text-orange-300">Heliacal Ember</b>
      <br />When Zani is in the team and a nearby Resonator inflicts <b class="text-wuwa-spectro">Spectro Frazzle</b> upon a target, immediately consume all <b class="text-wuwa-spectro">Spectro Frazzle</b> stacks and trigger the corresponding DMG, then convert <b class="text-wuwa-spectro">Spectro Frazzle</b> into an equal number of <b class="text-orange-300">Heliacal Ember</b>. Every time the conversion happens, Zani obtains <b class="text-red">Blaze</b> based on the stacks of <b class="text-orange-300">Heliacal Ember</b> inflicted. <b class="text-orange-300">Heliacal Ember</b> is capped at <span class="text-desc">60</span> stacks, with each stack lasting for <span class="text-desc">6</span>s. <b class="text-orange-300">Heliacal Ember</b> stacks are counted toward the <b class="text-wuwa-spectro">Spectro Frazzle</b> stacks for the <b>Eternal Radiance</b> Sonata Effect.
      <br />
      <br />${on_fire}
      <br />
      <br /><b class="text-amber-500">Redundant Energy</b>
      <br />Zani can hold up to <span class="text-desc">100</span> <b class="text-amber-500">Redundant Energy</b>.
      <br />Obtain <b class="text-amber-500">Redundant Energy</b> when Normal Attacks hit a target.
      <br />Obtain <b class="text-amber-500">Redundant Energy</b> when casting Intro Skill <b>Immediate Execution</b>.
      <br />Obtain <b class="text-amber-500">Redundant Energy</b> when casting Resonance Skill <b>Standard Defense Protocol</b>.
      <br />Obtain <b class="text-amber-500">Redundant Energy</b> when casting <b>Pinpoint Strike</b>.
      <br />Cannot obtain <b class="text-amber-500">Redundant Energy</b> while in <b class="text-amber-200">Inferno Mode</b>.
      <br />
      <br /><b class="text-red">Blaze</b>
      <br /><b class="text-red">Blaze</b> is capped at <span class="text-desc">100</span> when not in <b class="text-amber-200">Inferno Mode</b>.
      <br /><b class="text-red">Blaze</b> is capped at <span class="text-desc">150</span> in <b class="text-amber-200">Inferno Mode</b>
      <br />Casting <b>Targeted Action</b> or <b>Forcible Riposte</b> grants <span class="text-desc">10</span> <b class="text-red">Blazes</b>.
      <br />Every stack of <b class="text-orange-300">Heliacal Ember</b> converted from <b class="text-wuwa-spectro">Spectro Frazzle</b> grants <span class="text-desc">5</span> <b class="text-red">Blazes</b>.
      <br />Casting Resonance Liberation <b>Rekindle</b> grants <span class="text-desc">50</span> <b class="text-red">Blazes</b>.`,
      image: 'SP_IconZanniY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Immediate Execution`,
      content: `Attack the target and deal <b class="text-wuwa-spectro">Spectro DMG</b>.`,
      image: 'SP_IconZanniQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Beacon For the Future`,
      content: `Attack the target, dealing <b class="text-wuwa-spectro">Spectro DMG</b> equal to <span class="text-desc">150%</span> of Zani's ATK and removing all stacks of <b class="text-orange-300">Heliacal Ember</b> inflicted upon the target. Each stack increases the DMG dealt by <span class="text-desc">10%</span>. This DMG is considered <b class="text-wuwa-spectro">Spectro Frazzle</b> DMG. The <b class="text-wuwa-spectro">Spectro DMG</b> dealt by other Resonators in the team to the target marked by <b class="text-orange-300">Heliacal Ember</b> is Amplified by <span class="text-desc">20%</span> for <span class="text-desc">20</span>s.`,
      image: 'SP_IconZanniT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Quick Response`,
      content: `Casting Intro Skill <b>Immediate Execution</b> gives <span class="text-desc">12%</span> <b class="text-wuwa-spectro">Spectro DMG Bonus</b> for <span class="text-desc">14</span>s.`,
      image: 'SP_IconZanniD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Fear No Pain`,
      content: `When in <b>Ready Stance</b>, all DMG taken is reduced by <span class="text-desc">40%</span>.`,
      image: 'SP_IconZanniD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `When the Alarm Clock Rings`,
      content: `Casting <b>Targeted Action</b> or <b>Forcible Riposte</b> gives a <span class="text-desc">50%</span> <b class="text-wuwa-spectro">Spectro DMG Bonus</b> for <span class="text-desc">14</span>s.
      <br />
      <br />Resonance Skill Heavy Slash - <b>Nightfall</b> can't be interrupted.`,
      image: 'T_IconDevice_ZanniM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Stale Bread With Energy Drink`,
      content: `Crit. Rate is increased by <span class="text-desc">20%</span>.
      <br />The DMG Multiplier of <b>Targeted Action</b> and <b>Forcible Riposte</b> is increased by <span class="text-desc">80%</span>.`,
      image: 'T_IconDevice_ZanniM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Each Day A New Commute`,
      content: `When in <b class="text-amber-200">Inferno Mode</b>, every <span class="text-desc">1</span> <b class="text-red">Blaze</b> consumed increases the last stage DMG Multiplier of the subsequent Resonance Liberation <b>The Last Stand</b> by <span class="text-desc">8%</span>, maxed at <span class="text-desc">1200%</span>.`,
      image: 'T_IconDevice_ZanniM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `More Efficiency, Less Drama`,
      content: `When Intro Skill <b>Immediate Execution</b> is cast, the ATK of all Resonators in the team is increased by <span class="text-desc">20%</span> for <span class="text-desc">30</span>s.`,
      image: 'T_IconDevice_ZanniM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Delivered In Full On Time`,
      content: `The DMG Multiplier of Resonance Liberation <b>Rekindle</b> is increased by <span class="text-desc">120%</span>.`,
      image: 'T_IconDevice_ZanniM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `First Things First? Clock Out!`,
      content: `The DMG Multiplier of Heavy Slash - <b>Daybreak</b>, Heavy Slash- <b>Dawning</b>, Heavy Slash - <b>Nightfall</b>, and Heavy Slash - <b>Lightsmash</b> are increased by <span class="text-desc">40%</span>. Every <b class="text-red">Blaze</b> consumed increases the DMG Multiplier of Heavy Slash - <b>Nightfall</b> by <span class="text-desc">40%</span> on hit.
      <br />Gain following effects when in <b class="text-amber-200">Inferno Mode</b>:
      <br />- When <b class="text-red">Blaze</b> is lower than <span class="text-desc">70</span>, restore <span class="text-desc">70</span> <b class="text-red">Blazes</b> immediately. This effect is triggered once in <b class="text-amber-200">Inferno Mode</b>.
      <br />- Within <span class="text-desc">8</span>s after entering <b class="text-amber-200">Inferno Mode</b>, Zani will remain standing with at least <span class="text-desc">1</span> HP if hit by a fatal blow.`,
      image: 'T_IconDevice_ZanniM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'number',
      id: 'blaze_consumed',
      text: `Nightfall Blaze Consumed`,
      ...talents.forte,
      content: on_fire,
      show: true,
      default: 40,
      min: 0,
      max: 40,
    },
    {
      type: 'number',
      id: 'ember_consumed',
      text: `Outro Ember Consumed`,
      ...talents.outro,
      show: true,
      default: 10,
      min: 0,
      max: 60,
    },
    {
      type: 'toggle',
      id: 'sunburst',
      text: `Sunburst`,
      ...talents.skill,
      show: true,
      default: true,
    },
    {
      type: 'toggle',
      id: 'inferno_mode',
      text: `Inferno Mode`,
      ...talents.lib,
      show: true,
      default: true,
    },
    {
      type: 'toggle',
      id: 'zani_i1',
      text: `I1 Spectro DMG Bonus`,
      ...talents.i1,
      show: i.i1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'zani_c1',
      text: `S1 Spectro DMG Bonus`,
      ...talents.c1,
      show: c >= 1,
      default: true,
    },
    {
      type: 'number',
      id: 'blaze_consumed_c3',
      text: `S3 Total Blaze Consumed`,
      ...talents.c3,
      show: c >= 3,
      default: 40,
      min: 0,
      max: 150,
    },
    {
      type: 'toggle',
      id: 'zani_c4',
      text: `S4 Team ATK Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'zani_c4')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'zani_outro',
        text: `Outro: Beacon For the Future`,
        ...talents.outro,
        show: true,
        default: false,
      },
    ],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.DoT = true

      base.BASIC_SCALING = [
        {
          name: 'Stage 1 DMG',
          value: [{ scaling: calcScaling(0.296, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
          multiplier: form.inferno_mode ? 1.25 : 1,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.4, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
          multiplier: form.inferno_mode ? 1.25 : 1,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.2134, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
          multiplier: form.inferno_mode ? 1.25 : 1,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(0.34, normal), multiplier: Stats.ATK, hits: 4 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
          multiplier: form.inferno_mode ? 1.25 : 1,
        },
        {
          name: 'Breakthrough DMG',
          value: [
            { scaling: calcScaling(0.3094, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.0884, normal), multiplier: Stats.ATK, hits: 7 },
          ],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
          multiplier: form.inferno_mode ? 1.25 : 1,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.2066, normal), multiplier: Stats.ATK, hits: 4 }],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Plunging Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.528, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.3734, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Standard Defense Protocol DMG',
          value: [{ scaling: calcScaling(0.3216, skill), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Pinpoint Strike DMG',
          value: [
            { scaling: calcScaling(0.3068, skill), multiplier: Stats.ATK },
            { scaling: calcScaling(0.6136, skill), multiplier: Stats.ATK },
          ],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Targeted Action DMG',
          value: [
            { scaling: calcScaling(0.4335, skill), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1445, skill), multiplier: Stats.ATK },
            { scaling: calcScaling(0.867, skill), multiplier: Stats.ATK },
          ],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
          multiplier: c >= 2 ? 1.8 : 1,
          subType: TalentSubType.FRAZZLE,
        },
        {
          name: 'Forcible Riposte DMG',
          value: [
            { scaling: calcScaling(0.4335, skill), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1445, skill), multiplier: Stats.ATK },
            { scaling: calcScaling(0.867, skill), multiplier: Stats.ATK },
          ],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
          multiplier: c >= 2 ? 1.8 : 1,
          subType: TalentSubType.FRAZZLE,
        },
      ]
      base.LIB_SCALING = [
        {
          name: `Rekindle DMG`,
          value: [{ scaling: calcScaling(1.6022, lib), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.LIB,
          multiplier: c >= 5 ? 2.2 : 1,
        },
        {
          name: `The Last Stand DMG`,
          value: [
            { scaling: calcScaling(0.9613, lib), multiplier: Stats.ATK },
            { scaling: calcScaling(5.4473, lib) * (1 + (form.blaze_consumed_c3 || 0) * 0.08), multiplier: Stats.ATK },
          ],
          element: Element.SPECTRO,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Daybreak DMG',
          value: [{ scaling: calcScaling(1, forte), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
          subType: TalentSubType.FRAZZLE,
          multiplier: c >= 6 ? 1.4 : 1,
        },
        {
          name: 'Dawning DMG',
          value: [{ scaling: calcScaling(2.133, forte), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
          subType: TalentSubType.FRAZZLE,
          multiplier: c >= 6 ? 1.4 : 1,
        },
        {
          name: 'Nightfall DMG',
          value: [
            { scaling: calcScaling(0.68, forte), multiplier: Stats.ATK },
            { scaling: calcScaling(1.32, forte), multiplier: Stats.ATK },
            ...(form.blaze_consumed
              ? [{ scaling: calcScaling(0.05, forte) * (form.blaze_consumed || 0), multiplier: Stats.ATK }]
              : []),
          ],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
          multiplier: c >= 6 ? 1.4 : 1,
          subType: TalentSubType.FRAZZLE,
        },
        {
          name: 'Lightsmash DMG',
          value: [{ scaling: calcScaling(2.133, forte), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
          subType: TalentSubType.FRAZZLE,
          multiplier: c >= 6 ? 1.4 : 1,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Immediate Execution DMG`,
          value: [
            { scaling: calcScaling(0.122, intro), multiplier: Stats.ATK, hits: 4 },
            { scaling: calcScaling(0.4064, intro), multiplier: Stats.ATK },
          ],
          element: Element.SPECTRO,
          property: TalentProperty.INTRO,
        },
      ]
      base.OUTRO_SCALING = [
        {
          name: `Beacon For the Future DMG`,
          value: [{ scaling: 1.5, multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.OUTRO,
          subType: TalentSubType.FRAZZLE,
          bonus: form.ember_consumed * 0.1,
        },
      ]

      if (form.zani_i1) {
        base[Stats.SPECTRO_DMG].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.12,
        })
      }
      if (form.sunburst) {
        base.FRAZZLE_AMP.push({
          name: `Sunburst`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (form.zani_c1) {
        base[Stats.SPECTRO_DMG].push({
          name: `Sequence Node 1`,
          source: 'Self',
          value: 0.5,
        })
      }
      if (c >= 2) {
        base[Stats.CRIT_RATE].push({
          name: `Sequence Node 2`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (form.zani_c4) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.2,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.zani_outro) {
        base.SPECTRO_AMP.push({
          name: `Outro`,
          source: 'Zani',
          value: 0.2,
        })
      }
      if (form.zani_c4) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 4`,
          source: 'Zani',
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

export default Zani
