import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcFlatScaling, calcHealScaling, calcScaling } from '@src/core/utils/data_format'

const Phrolova = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Movement of Life and Death`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 3 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>. When performing Basic Attack Stage 3, enter <b class="text-wuwa-fusion">Reincarnate</b> state.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Consume STA to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />Press Normal Attack shortly after casting this skill to cast Basic Attack Stage 2.
      <br />
      <br /><b>Scarlet Coda</b>
      <br />Phrolova enters the <b class="text-desc">Compose</b> state every <span class="text-desc">25</span>s.
      <br />When the following 3 conditions are met, Heavy Attack is replaced with <b>Scarlet Coda</b>.
      <br />- Has <span class="text-desc">6</span> <b class="text-violet-400">Volatile Notes</b>.
      <br />- In the <b class="text-desc">Compose</b> state.
      <br />- Not in the <b class="text-fuchsia-500">Resolving Chord</b> state.
      <br /><b>Scarlet Coda</b>: Consume STA to deal <b class="text-wuwa-havoc">Havoc DMG</b>, Stagnating and pulling in nearby targets. This instance of damage is considered Resonance Skill DMG.
      <br />Each stack of <b class="text-wuwa-havoc">Aftersound</b> additionally increases the DMG Multiplier of this instance of damage.
      <br />Casting this skill is considered as casting Echo Skill.
      <br />Casting this skill seconds <b class="text-desc">Compose</b> into cooldown and actives <b class="text-fuchsia-500">Resolving Chord</b> state.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Consume STA to perform Plunging Attack, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Press Normal Attack right after a successful Dodge to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />Press Normal Attack shortly after casting this skill to cast Basic Attack Stage 3.`,
      image: 'SP_IconNorMagic',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Whispers in a Fleeting Dream`,
      content: `Attack the target and deal <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />Casting this skill sends Phrolova into <b class="text-wuwa-fusion">Reincarnate</b> state.`,
      image: 'SP_IconFuLuoLuoB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Waltz of Forsaken Depths`,
      content: `<b>Waltz of Forsaken Depths</b>
      <br />Phrolova's max Resonance Energy is <span class="text-desc">0</span>. <b>Waltz of Forsaken Depths</b> does not consume Resonance Energy.
      <br />When in the <b class="text-fuchsia-500">Resolving Chord</b> state, <b>Waltz of Forsaken Depths becomes</b> available.
      <br />Casting this skill ends the <b class="text-fuchsia-500">Resolving Chord</b> state, and Phrolova enters the <b class="text-red">Maestro</b> state for <span class="text-desc">24</span>s.
      <br />
      <br /><b class="text-red">Maestro</b>
      <br />Gain <span class="text-desc">120%</span> ATK increase.
      <br />Phrolova floats in the air and commands Hecate to fight. Hecate will share Phrolova's stats and statuses, and damage dealt by Hecate will be considered coming from Phrolova. Hecate's attacks will not remove the target's <b class="text-violet-300">Hazy Dream</b> state.
      <br />During this period, Phrolova plays the <b class="text-violet-400">Volatile Notes</b> in turn. Each <b class="text-violet-400">Volatile Note</b> holds for <span class="text-desc">4</span>s.
      <br />If Phrolova is the active Resonator on the field, she can give the following cues to Hecate. Any damage taken by Hecate in this state affects Phrolova as well.
      <br />- <b>Cue - Basic Attack</b>: Press Normal Attack to command Hecate to cast <b>Basic Attack - Hecate</b>. When Phrolova is on the field, for every <span class="text-desc">2</span> times Hecate casts <b>Basic Attack - Hecate</b>, the next <b>Basic Attack - Hecate</b> is replaced with <b>Enhanced Attack - Hecate</b>.
      <br />- <b>Cue - Dodge</b>: Press Dodge to command Hecate to dodge an attack. Hecate takes no damage from a hit successfully Dodged.
      <br />- <b>Cue - Reset</b>: Press Jump to reset Hecate's position.
      <br />- <b>Cue - Curtain Call</b>: Press Resonance Liberation to command Hecate to cast <b>Curtain Call - Hecate</b> and end the <b class="text-red">Maestro</b> State.
      <br />When Phrolova is not the active Resonator, Hecate takes no damage and automatically casts <b>Basic Attack - Hecate</b> to attack the target. When Resonators in the team cast Echo Skill, Hecate casts <b>Enhanced Attack - Hecate</b> to attack the target.
      <br />During Phrolova's <b class="text-red">Maestro</b> state, Echoes of the same name can trigger this effect up to <span class="text-desc">1</span> time.
      <br />Switching back to Phrolova ends <b class="text-red">Maestro</b> state. Ending <b class="text-red">Maestro</b> state removes all <b class="text-violet-400">Volatile Note</b>.
      <br />
      <br /><b>Basic Attack - Hecate</b>
      <br />Perform up to 2 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b> (considered Echo Skill DMG).
      <br />
      <br /><b>Enhanced Attack - Hecate: Strings</b>
      <br />When Phrolova plays <b class="text-rose-600">Volatile Note - Strings</b>, Hecate casts <b>Enhanced Attack - Hecate: Strings</b> when casting <b>Enhanced Attack - Hecate</b>, dealing <b class="text-wuwa-havoc">Havoc DMG</b> and Stagnating the targets (considered Echo Skill DMG).
      <br />
      <br /><b>Enhanced Attack - Hecate: Winds</b>
      <br />When Phrolova plays <b class="text-indigo-500">Volatile Note - Winds</b>, Hecate casts <b>Enhanced Attack - Hecate: Winds</b> when casting <b>Enhanced Attack - Hecate</b>, dealing <b class="text-wuwa-havoc">Havoc DMG</b>, pulling the targets in (considered Echo Skill DMG).
      <br />
      <br /><b>Enhanced Attack - Hecate: Cadenza</b>
      <br />When Phrolova plays <b class="text-pink-400">Volatile Note - Cadenza</b>, Hecate casts <b>Enhanced Attack - Hecate: Cadenza</b> when casting <b>Enhanced Attack - Hecate</b>, dealing <b class="text-wuwa-havoc">Havoc DMG</b>, Stagnating and pulling the targets in (considered Echo Skill DMG).
      <br />
      <br /><b>Curtain Call - Hecate</b>
      <br /><b>Curtain Call</b> can be cast via the following 5 ways, Stagnating the targets and dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />- When Phrolova is the active Resonator on the field, end the <b class="text-red">Maestro</b> state.
      <br />- When Phrolova is in the <b class="text-red">Maestro</b> state, switch to Phrolova without casting Intro Skill.
      <br />- When Phrolova is not the active Resonator and the <b class="text-red">Maestro</b> state ends, switch to Phrolova without casting Intro Skill.
      <br />- When Phrolova is in the <b class="text-red">Maestro</b> state, press Resonance Liberation.
      <br />- When Phrolova is in the <b class="text-fuchsia-500">Resolving Chord</b> state, hold Resonance Liberation.
      <br />When in <b class="text-fuchsia-500">Resolving Chord</b> state, casting <b>Curtain Call</b> removes all <b class="text-violet-400">Volatile Notes</b> and ends the <b class="text-fuchsia-500">Resolving Chord</b> state.`,
      image: 'SP_IconFuLuoLuoC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Rhapsody of a New World`,
      content: `<b>Basic Attack - Movement of Fate and Finality</b>
      <br />When in <b class="text-wuwa-fusion">Reincarnate</b>, press Normal Attack on the ground to cast <b>Movement of Fate and Finality</b>, which Stagnates the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b> (considered Resonance Skill DMG) and ending <b class="text-wuwa-fusion">Reincarnate</b> afterwards.
      <br />
      <br /><b>Resonance Skill - Murmurs in a Haunting Dream</b>
      <br />When in <b class="text-wuwa-fusion">Reincarnate</b>, press Resonance Skill on the ground to cast <b>Murmurs in a Haunting Dream</b>, dealing <b class="text-wuwa-havoc">Havoc DMG</b> (considered Resonance Skill DMG) and ending <b class="text-wuwa-fusion">Reincarnate</b> afterwards.
      <br />
      <br /><b class="text-wuwa-havoc">Aftersound</b>
      <br />Phrolova can hold up to <span class="text-desc">24</span> stacks of <b class="text-wuwa-havoc">Aftersound</b>.
      <br />When Phrolova is not the active Resonator, casting <b>Enhanced Attack - Hecate: Strings</b>, <b>Enhanced Attack - Hecate: Winds</b>, and <b>Enhanced Attack - Hecate: Cadenza</b> grants <span class="text-desc">1</span> stack of <b class="text-wuwa-havoc">Aftersound</b>.
      <br />When Phrolova is out of combat, all stacks of <b class="text-wuwa-havoc">Aftersound</b> are removed every <span class="text-desc">30</span>s.
      <br />
      <br /><b class="text-violet-400">Volatile Note</b>
      <br />Phrolova can hold up to <span class="text-desc">6</span> <b class="text-violet-400">Volatile Notes</b>. When <b class="text-violet-400">Volatile Notes</b> reaches the max number, gaining new <b class="text-violet-400">Volatile Notes</b> moves all <b class="text-violet-400">Volatile Notes</b> one slot to the left, and the leftmost <b class="text-rose-600">Volatile Note - Strings</b> or <b class="text-indigo-500">Volatile Note - Winds</b> will be removed.
      <br />Hitting a target with Basic Attack Stage 3 or <b>Movement of Fate and Finality</b> grants <span class="text-desc">1</span> <b class="text-rose-600">Volatile Note - Strings</b>.
      <br />Hitting a target with Resonance Skill <b>Whispers in a Fleeting Dream</b> or Resonance Skill <b>Murmurs in a Haunting Dream</b> grants <span class="text-desc">1</span> <b class="text-indigo-500">Volatile Note - Winds</b>.
      <br />When Inherent Skill - <b>Accidental</b> is activated, casting <b>Suite of Quietus</b>, <b>Suite of Immortality</b>, or Echo Skill grants <span class="text-desc">1</span> <b class="text-pink-400">Volatile Note - Cadenza</b>.
      <br />Phrolova cannot obtain <b class="text-violet-400">Volatile Notes</b> during <b class="text-fuchsia-500">Resolving Chord</b>.`,
      image: 'SP_IconFuLuoLuoY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Suite of Quietus`,
      content: `<b>Suite of Quietus</b>
      <br />Attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />Press Normal Attack shortly after casting this skill to cast Basic Attack Stage 3.
      <br />
      <br /><b>Suite of Immortality</b>
      <br />When in the <b class="text-red">Maestro</b> state, the next <b>Suite of Quietus</b> is replaced with <b>Suite of Immortality</b>. This replacement is cancelled if <b>Curtain Call</b> is cast while in this state. <b>Suite of Immortality</b> deals <b class="text-wuwa-havoc">Havoc DMG</b> (considered Resonance Skill DMG), and Stagnates the target.
      <br />Press Normal Attack shortly after casting this skill to cast Basic Attack Stage 3.`,
      image: 'SP_IconFuLuoLuoQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Unfinished Piece`,
      content: `The incoming Resonator gains <span class="text-desc">20%</span> <b class="text-wuwa-havoc">Havoc DMG</b> Amplification by and Heavy Attack DMG by <span class="text-desc">25%</span> for <span class="text-desc">14</span>s or until they are switched out.
      <br />If Phrolova is in <b class="text-red">Maestro</b> state when she casts this skill, Hecate additionally casts <b>Enhanced Attack - Hecate</b> <span class="text-desc">2</span> times when Phrolova is switched off the field while in the same <b class="text-red">Maestro</b> state duration.`,
      image: 'SP_IconFuluoluoT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Accidental`,
      content: `Casting Echo Skill grants increased resistance to interruption and reduces damage taken by <span class="text-desc">30%</span> for <span class="text-desc">15</span>s.
      <br />After casting <b>Suite of Quietus</b>, <b>Suite of Immortality</b>, and Echo Skill, the next <b class="text-violet-400">Volatile Note</b> becomes <b class="text-pink-400">Volatile Note - Cadenza</b>.`,
      image: 'SP_IconFuLuoLuoD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Octet`,
      content: `Obtain <span class="text-desc">10</span> stacks of <b class="text-wuwa-havoc">Aftersound</b> stacks of upon entering battle. This effect cannot be triggered again within <span class="text-desc">4</span>s after exiting the combat state. For every <span class="text-desc">1</span> stacks of <b class="text-wuwa-havoc">Aftersound</b>, increase Crit. DMG by <span class="text-desc">2.5%</span>.
      <br />When <b class="text-wuwa-havoc">Aftersound</b> reaches the max, each new stack of <b class="text-wuwa-havoc">Aftersound</b> increases Phrolova's Crit. DMG by <span class="text-desc">1%</span>, up to <span class="text-desc">100%</span>. The increased Crit. DMG is removed when <b class="text-wuwa-havoc">Aftersound</b> stacks are cleared.`,
      image: 'SP_IconFuLuoLuoD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `A Key to Netherworld's Secrets`,
      content: `The DMG Multiplier of <b>Movement of Fate and Finality</b> is increased by <span class="text-desc">80%</span>.
      <br />The DMG Multiplier of <b>Murmurs in a Haunting Dream</b> is increased by <span class="text-desc">80%</span>.
      <br />If Phrolova has less than <span class="text-desc">2</span> <b class="text-violet-400">Volatile Notes</b> when she is not in the <b class="text-red">Maestro</b> state and stays out of combat for <span class="text-desc">4</span>s, she gains <b class="text-pink-400">Volatile Note - Cadenza</b> until she has at least <span class="text-desc">2</span> <b class="text-violet-400">Volatile Notes</b>.`,
      image: 'T_IconDevice_FuLuoLuoM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `A Rope Tied to a Life Beyond`,
      content: `The DMG Multiplier of <b>Scarlet Coda</b> is increased by <span class="text-desc">75%</span>. <b class="text-wuwa-havoc">Aftersound</b> now additionally increases the DMG Multiplier of <b>Scarlet Coda</b> by <span class="text-desc">75%</span>.
      <br />Casting <b>Scarlet Coda</b> grants <span class="text-desc">14</span> stacks of <b class="text-wuwa-havoc">Aftersound</b>.`,
      image: 'T_IconDevice_FuLuoLuoM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `A Dagger to Cut Clean Obsessions`,
      content: `Echo Skill DMG is Amplified by <span class="text-desc">80%</span>.
      <br />Casting <b>Scarlet Coda</b> will convert all <b class="text-violet-400">Volatile Notes</b> to <b>Volatile Notes - Cadenza</b> in turn.
      <br />Targets hit by <b>Enhanced Attack - Hecate: Cadenza</b> will have their ATK reduced by <span class="text-desc">20%</span> for <span class="text-desc">15</span>s.`,
      image: 'T_IconDevice_FuLuoLuoM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `A Torch Illuminating the Path`,
      content: `Casting Echo Skill grants <span class="text-desc">20%</span> <b>Attribute DMG Bonus</b> for all Resonators in the team for <span class="text-desc">30</span>s.`,
      image: 'T_IconDevice_FuLuoLuoM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `A Forked Road in Fate's Heartland`,
      content: `Upon entering the <b class="text-red">Maestro</b> state, generate a field to Stagnate the nearby targets, which lasts for <span class="text-desc">4</span>s. Leaving the <b class="text-red">Maestro</b> state or switching to other Resonators removes the Stagnation effect early.
      <br />Damage taken during the <b class="text-red">Maestro</b> state is reduced by <span class="text-desc">30%</span>.`,
      image: 'T_IconDevice_FuLuoLuoM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `A Night to Depart From Eternal Rest`,
      content: `The DMG Multiplier of <b>Enhanced Attack - Hecate</b> is increased by <span class="text-desc">24%</span>.
      <br />
      <br />During <b>Movement of Fate and Finality</b> and <b>Murmurs in a Haunting Dream</b>, command Hecate to cast <span class="text-desc">1</span> <b>Apparition of Beyond - Hecate</b>, dealing <b class="text-wuwa-havoc">Havoc DMG</b> equal to <span class="text-desc">216.42%</span> of Phrolova's ATK (considered Echo Skill DMG) and granting <span class="text-desc">8</span> stacks of <b class="text-wuwa-havoc">Aftersound</b> on hit.
      <br />If Phrolova is not the active Resonator during the <b class="text-red">Maestro</b> state, targets take <span class="text-desc">40%</span> more DMG from Hecate and Phrolova. If Phrolova is the active Resonator during the <b class="text-red">Maestro</b> state, gain <span class="text-desc">60%</span> <b class="text-wuwa-havoc">Havoc DMG Bonus</b>.`,
      image: 'T_IconDevice_FuLuoLuoM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'number',
      id: 'lingering_note',
      text: `Aftersound Stacks`,
      ...talents.normal,
      show: true,
      default: 10,
      min: 0,
    },
    {
      type: 'toggle',
      id: 'phrolova_c4',
      text: `S4 Team ATK Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'element',
      id: 'phrolova_c6',
      text: `S6 Dynamic Buff`,
      ...talents.c6,
      show: c >= 6,
      default: 'on',
      options: [
        { name: 'On-Field (DMG Bonus)', value: 'on' },
        { name: 'Off-Field (DMG Taken)', value: 'off' },
      ],
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'phrolova_c4')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'phrolova_outro',
        text: `Outro: Unfinished Piece`,
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
          value: [{ scaling: calcScaling(0.2688, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.48, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [
            { scaling: calcScaling(0.1973, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1316, normal), multiplier: Stats.ATK, hits: 6 },
          ],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.4016, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
        },
        {
          name: 'Scarlet Coda DMG',
          value: [
            { scaling: calcScaling(0.1661, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.0623, normal), multiplier: Stats.ATK, hits: 8 },
            { scaling: calcScaling(2.4903, normal), multiplier: Stats.ATK },
            ...(form.lingering_note
              ? [{ scaling: calcScaling(0.4153, normal) * form.lingering_note, multiplier: Stats.ATK }]
              : []),
          ],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
          multiplier: c >= 1 ? 1.75 : 1,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.64, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.6136, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Whispers in a Fleeting Dream DMG',
          value: [{ scaling: calcScaling(0.533, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Basic Attack - Hecate Stage 1 DMG',
          value: [{ scaling: calcScaling(0.14, lib), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
          atkBonus: 1.2,
          vul: form.phrolova_c6 === 'off' ? 0.4 : 0,
          bonus: form.phrolova_c6 === 'on' ? 0.6 : 0,
        },
        {
          name: 'Basic Attack - Hecate Stage 2 DMG',
          value: [{ scaling: calcScaling(0.07, lib), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
          atkBonus: 1.2,
          vul: form.phrolova_c6 === 'off' ? 0.4 : 0,
          bonus: form.phrolova_c6 === 'on' ? 0.6 : 0,
        },
        {
          name: 'Enhanced Attack - Strings: Hecate DMG',
          value: [
            { scaling: calcScaling(0.525, lib), multiplier: Stats.ATK },
            { scaling: calcScaling(1.225, lib), multiplier: Stats.ATK },
          ],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
          multiplier: c >= 6 ? 1.24 : 1,
          atkBonus: 1.2,
          vul: form.phrolova_c6 === 'off' ? 0.4 : 0,
          bonus: form.phrolova_c6 === 'on' ? 0.6 : 0,
        },
        {
          name: 'Enhanced Attack - Winds: Hecate DMG',
          value: [
            { scaling: calcScaling(0.4988, lib), multiplier: Stats.ATK },
            { scaling: calcScaling(1.1638, lib), multiplier: Stats.ATK },
          ],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
          multiplier: c >= 6 ? 1.24 : 1,
          atkBonus: 1.2,
          vul: form.phrolova_c6 === 'off' ? 0.4 : 0,
          bonus: form.phrolova_c6 === 'on' ? 0.6 : 0,
        },
        {
          name: 'Enhanced Attack - Cadenza: Hecate DMG',
          value: [
            { scaling: calcScaling(0.525, lib), multiplier: Stats.ATK },
            { scaling: calcScaling(1.225, lib), multiplier: Stats.ATK },
          ],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
          multiplier: c >= 6 ? 1.24 : 1,
          atkBonus: 1.2,
          vul: form.phrolova_c6 === 'off' ? 0.4 : 0,
          bonus: form.phrolova_c6 === 'on' ? 0.6 : 0,
        },
        {
          name: 'Curtain Call - Hecate DMG',
          value: [{ scaling: calcScaling(2.34, lib), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Movement of Fate and Finality DMG',
          value: [
            { scaling: calcScaling(0.1905, forte), multiplier: Stats.ATK, hits: 4 },
            { scaling: calcScaling(0.5927, forte), multiplier: Stats.ATK, hits: 3 },
          ],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
          multiplier: c >= 1 ? 1.8 : 1,
        },
        {
          name: 'Murmurs in a Haunting Dream DMG',
          value: [
            { scaling: calcScaling(0.1167, forte), multiplier: Stats.ATK, hits: 4 },
            { scaling: calcScaling(0.2334, forte), multiplier: Stats.ATK },
            { scaling: calcScaling(1.6338, forte), multiplier: Stats.ATK },
          ],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
          multiplier: c >= 1 ? 1.8 : 1,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Suite of Quietus DMG`,
          value: [
            { scaling: calcScaling(0.4055, intro), multiplier: Stats.ATK },
            { scaling: calcScaling(0.6082, intro), multiplier: Stats.ATK },
          ],
          element: Element.HAVOC,
          property: TalentProperty.INTRO,
        },
        {
          name: `Suite of Immortality DMG`,
          value: [{ scaling: calcScaling(3, intro), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
        },
      ]

      if (form.lingering_note) {
        base[Stats.CRIT_DMG].push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: 0.025 * _.min([form.lingering_note, 24]) + _.min([1, 0.01 * _.max([form.lingering_note - 24, 0])]),
        })
      }
      if (c >= 3) {
        base.ECHO_AMP.push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.8,
        })
      }
      if (form.phrolova_c4) {
        base[Stats.ATTR_DMG].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.2,
        })
      }

      if (c >= 6) {
        base.FORTE_SCALING.push({
          name: `Apparition of Beyond - Hecate DMG`,
          value: [{ scaling: 2.1642, multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.phrolova_outro) {
        base.HAVOC_AMP.push({
          name: `Outro Skill`,
          source: 'Phrolova',
          value: 0.2,
        })
        base.HEAVY_AMP.push({
          name: `Outro Skill`,
          source: 'Phrolova',
          value: 0.25,
        })
      }
      if (form.phrolova_c4) {
        base[Stats.ATTR_DMG].push({
          name: `Sequence Node 4`,
          source: 'Phrolova',
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

export default Phrolova
