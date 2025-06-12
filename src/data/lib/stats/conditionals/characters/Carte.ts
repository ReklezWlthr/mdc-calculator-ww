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
import { calcFlatScaling, calcScaling } from '@src/core/utils/data_format'

const Carte = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const carte_lib = `<b>Resonance Liberation - Blade of Howling Squall</b>
      <br />When Fleurdelys has <span class="text-desc">120</span> points of <b class="text-desc">Resolve</b>, Resonance Liberation - <b>A Knight's Heartfelt Prayers</b> is replaced by Resonance Liberation - <b>Blade of Howling Squall</b>.
      <br />Casting Resonance Liberation - <b>Blade of Howling Squall</b> removes all <b class="text-desc">Resolve</b>, ends <b class="text-green-300">Manifest</b>, restores <span class="text-desc">50%</span> of Max HP, and then deals <b class="text-wuwa-aero">Aero DMG</b> to all targets in an area along a straight line in front. Upon hitting the target, remove all stacks of <b class="text-wuwa-aero">Aero Erosion</b> on the target. Each stack removed Amplifies the DMG taken by the targets by <span class="text-desc">20%</span>, max <span class="text-desc">5</span> stacks.
      <br />Can be cast in mid-air.`
  const mandate = `When Fleurdelys has <b class="text-amber-400">Mandate of Divinity</b> in <b class="text-green-300">Manifest</b>:
      <br /><b class="text-wuwa-aero">Aero Erosion</b> DMG is Amplified by <span class="text-desc">50%</span> and the damage interval is decreased by <span class="text-desc">50%</span> for enemies within a certain distance from Fleurdelys.
      <br /><b class="text-amber-400">Mandate of Divinity</b> is removed when <b class="text-green-300">Manifest</b> ends.`

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Sword to Carve My Forms`,
      content: `<b>Basic Attack - Cartethyia</b>
      <br />Perform up to 4 consecutive attacks, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />Following Basic Attack - Cartethyia Stage 4, inflict <span class="text-desc">1</span> stack of <b class="text-wuwa-aero">Aero Erosion</b> on targets hit and summon <b class="text-amber-400">Sword of Divinity's Shadow</b>.
      <br />Up to <span class="text-desc">1</span> <b class="text-amber-400">Sword of Divinity's Shadow</b> may exist for <span class="text-desc">20</span>s at the same time.
      <br />
      <br /><b>Heavy Attack - Cartethyia</b>
      <br />Consume STA to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>, inflicting <span class="text-desc">2</span> stacks of <b class="text-wuwa-aero">Aero Erosion</b> and summoning <b class="text-violet-300">Sword of Discord's Shadow</b>.
      <br />Up to <span class="text-desc">1</span> <b class="text-violet-300">Sword of Discord's Shadow</b> can exist for <span class="text-desc">20</span>s at the same time.
      <br />This instance of DMG is considered Basic Attack DMG.
      <br />
      <br /><b>Mid-Air Attack - Cartethyia</b>
      <br />Release Normal Attack button while airborne to perform Plunging Attack at the cost of STA, dealing <b class="text-wuwa-aero">Aero DMG</b>, also considered <b class="text-wuwa-aero">Aero Erosion</b> DMG.
      <br />Press Normal Attack shortly after the Plunging Attack to perform Basic Attack - Cartethyia Stage 2.
      <br />Casting Mid-Air Attack - Cartethyia recalls all <b>Sword Shadows</b>. Based on the types and number of <b>Sword Shadows</b> recalled, perform different forms of Plunging Attack and obtain the corresponding <b class="text-sky-300">Heart of Virtue</b>, <b class="text-amber-400">Mandate of Divinity</b>, and <b class="text-violet-300">Power of Discord</b>.
      <br />
      <br /><b>Dodge Counter - Cartethyia</b>
      <br />Press Normal Attack shortly after a successful Dodge to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      `,
      image: 'SP_IconNorKnife',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Sword to Bear Their Names`,
      content: `<b>Cartethyia - Resonance Skill</b>
      <br />Attack the target, launch nearby enemies and then plunge them to the ground, dealing <b class="text-wuwa-aero">Aero DMG</b> and inflicting <span class="text-desc">2</span> stacks of <b class="text-wuwa-aero">Aero Erosion</b> on the targets hit. This instance of DMG is considered Basic Attack DMG. Can be performed in mid-air.
      <br />Following Cartethyia - Resonance Skill, summon <b class="text-sky-300">Sword of Virtue's Shadow</b>.
      <br />Up to <span class="text-desc">1</span> <b class="text-sky-300">Sword of Virtue's Shadow</b> can exist for <span class="text-desc">20</span>s at the same time.
      `,
      image: 'SP_IconKatixiyaB3',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `A Knight's Heartfelt Prayers`,
      content: `<b>Resonance Liberation - A Knight's Heartfelt Prayers</b>
      <br />By reducing HP to <span class="text-desc">50%</span> of the Max HP, Cartethyia transforms into Fleurdelys, unlocking new moves and entering the <b class="text-green-300">Manifest</b> state for <span class="text-desc">12</span>s.
      <br />Can be performed in mid-air.
      <br />Entering <b class="text-green-300">Manifest</b> clears all <b class="text-desc">Resolve</b>.
      <br />As Fleurdelys, Basic Attack - Fleurdelys Stage 5, Mid-Air Attack - Fleurdelys Stage 2, and Resonance Skill - <b>May Tempest Break the Tides</b> instantly trigger <span class="text-desc">1</span> instance of <b class="text-wuwa-aero">Aero Erosion</b> DMG and reduce the <b class="text-wuwa-aero">Aero Erosion</b> stack on the target hit by <span class="text-desc">1</span>.
      <br />- Ending the state will not clear Resonance Energy.
      <br />- No HP cost when HP is below <span class="text-desc">50%</span>.
      <br />
      <br />Fleurdelys's attacks restore <b class="text-desc">Resolve</b> on hit. When <b class="text-desc">Resolve</b> reaches <span class="text-desc">120</span> points, press Resonance Liberation to cast Resonance Liberation - <b>Blade of Howling Squall</b>.
      <br />When <b class="text-desc">Resolve</b> is below <span class="text-desc">120</span> points, press Resonance Liberation to transform back into Cartethyia. When in <b class="text-green-300">Manifest</b>, casting Resonance Liberation - <b>A Knight's Heartfelt Prayers</b> as Cartethyia consumes no Resonance Energy.
      <br />
      <br />When Fleurdelys has <b class="text-sky-300">Heart of Virtue</b> in <b class="text-green-300">Manifest</b>:
      <br />- Basic Attack - Fleurdelys Stage 4 will generate a force field to Stagnate the targets within the range.
      <br />- Fleurdelys's resistance to interruption increases.
      <br /><b class="text-sky-300">Heart of Virtue</b> is removed when <b class="text-green-300">Manifest</b> ends.
      <br />
      <br />${mandate}
      <br />
      <br />When Fleurdelys has <b class="text-violet-300">Power of Discord</b> in <b class="text-green-300">Manifest</b>:
      <br />When casting Basic Attack - Fleurdelys Stage 5, Mid-Air Attack - Fleurdelys Stage 2 and Enhanced Heavy Attack - Fleurdelys or after Resonance Skill - <b>May Tempest Break the Tides</b> deals damage, raise the <b class="text-wuwa-aero">Aero Erosion</b> stacks on all nearby targets to the highest count among the targets.
      <br /><b class="text-violet-300">Power of Discord</b> is removed when <b class="text-green-300">Manifest</b> ends.
      <br />
      <br />Fleurdelys will transform back to Cartethyia during quest dialogues, environmental interaction, or using Utilities. Fleurdelys can walk on water. Doing so on deep waters continuously consumes STA. When in walking state, Fleurdelys can step out of a high place and walk in mid-air by continuously consuming STA.
      <br />
      <br /><b>Avatar - Cartethyia</b>
      <br />As Fleurdelys, when <b class="text-desc">Resolve</b> is below <span class="text-desc">120</span> points, press Resonance Liberation to perform Basic Attack - Cartethyia Stage 2 and temporarily transform back to Cartethyia, which pauses the timer on <b class="text-green-300">Manifest</b>.
      <br />Can be cast in mid-air. Casting the skill in mid-air performs Mid-Air Attack - Cartethyia.
      <br />
      <br /><b>Avatar - Fleurdelys</b>
      <br />When in <b class="text-green-300">Manifest</b>, casting Resonance Liberation as Cartethyia performs Basic Attack - Fleurdelys Stage 2 without consuming Resonance Energy and transforms her back to Fleurdelys, which also resumes the timer on <b class="text-green-300">Manifest</b>.
      <br />Can be cast in mid-air. Casting the skill in mid-air performs Mid-Air Attack - Fleurdelys Stage 1.
      <br />
      <br />${carte_lib}
      `,
      image: 'SP_IconKatixiyaC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Tempest`,
      content: `Cartethyia unlocks new moves when she transforms into Fleurdelys:
      <br />
      <br /><b>Basic Attack - Fleurdelys</b>
      <br />Basic Attack - Cartethyia is replaced by Basic Attack - Fleurdelys.
      <br />Perform up to 5 consecutive attacks, dealing <b class="text-wuwa-aero">Aero DMG</b> and restoring <b class="text-desc">Resolve</b> on hit.
      <br />
      <br /><b>Mid-Air Attack - Fleurdelys</b>
      <br />Mid-Air Attack - Cartethyia is replaced by Mid-Air Attack - Fleurdelys.
      <br />Perform up to 3 consecutive attacks in the air at the cost of STA, dealing <b class="text-wuwa-aero">Aero DMG</b> and restoring <b class="text-desc">Resolve</b> on hit.
      <br />While airborne, hold Normal Attack to cast Mid-Air Attack - Fleurdelys Stage 3.
      <br />Follow up with Basic Attack shortly afterward to cast Basic Attack - Fleurdelys Stage 3.
      <br />While airborne, casting Resonance Skill - <b>Sword to Answer Waves' Call</b> and Resonance Skill - <b>May Tempest Break the Tides</b> resets the combo of Mid-Air Attack - Fleurdelys.
      <br />
      <br /><b>Heavy Attack - Fleurdelys</b>
      <br />Heavy Attack - Cartethyia is replaced by Heavy Attack - Fleurdelys.
      <br />Thrust forward to deliver a focused strike, dealing <b class="text-wuwa-aero">Aero DMG</b> and restoring <b class="text-desc">Resolve</b> on hit.
      <br />
      <br /><b>Enhanced Heavy Attack - Fleurdelys</b>
      <br />In the action of Heavy Attack - Fleurdelys, press Normal Attack again to cast Enhanced Heavy Attack - Fleurdelys: fall back and blast the area in a straight line in front, dealing <b class="text-wuwa-aero">Aero DMG</b> and restoring <b class="text-desc">Resolve</b> on hit.
      <br />Follow up with Basic Attack shortly after casting Enhanced Heavy Attack - Fleurdelys to cast Upward Cut - Fleurdelys.
      <br />
      <br /><b>Upward Cut - Fleurdelys</b>
      <br />While Fleurdelys is on the ground, Jump to cast this skill, dealing <b class="text-wuwa-aero">Aero DMG</b> and restoring <b class="text-desc">Resolve</b> on hit.
      <br />
      <br /><b>Dodge Counter - Fleurdelys</b>
      <br />Dodge Counter - Cartethyia is replaced by Dodge Counter - Fleurdelys.
      <br />Press Normal Attack shortly after a successful Dodge to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b> and restoring <b class="text-desc">Resolve</b> on hit.
      <br />Follow up with Basic Attack shortly afterward to cast Basic Attack - Fleurdelys Stage 4.
      <br />
      <br /><b>Resonance Skill - Sword to Answer Waves' Call</b>
      <br />Resonance Skill - Cartethyia is replaced by Resonance Skill - <b>Sword to Answer Waves' Call</b>.
      <br />Summon a force field near the target's location to continuously pull in nearby targets, dealing <b class="text-wuwa-aero">Aero DMG</b> and restoring <b class="text-desc">Resolve</b> on hit.
      <br />Can be cast in mid-air.
      <br />
      <br /><b>Resonance Skill - May Tempest Break the Tides</b>
      <br />Following Resonance Skill - <b>Sword to Answer Waves' Call</b>, press Resonance Skill again to call down a giant Sword Shadow to crush an area around the target, dealing <b class="text-wuwa-aero">Aero DMG</b> to ground targets and restoring <b class="text-desc">Resolve</b> on hit.
      <br />Follow up with Basic Attack shortly afterward to cast Basic Attack - Fleurdelys Stage 3.
      <br />The Resonance Skill enters cooldown if Resonance Skill - <b>May Tempest Break the Tides</b> is not cast within a certain period or when switching to another Resonator.
      <br />Can be cast in mid-air.
      `,
      image: 'SP_IconKatixiyaY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Sword to Mark Tide's Trace`,
      content: `<b>Cartethyia - Sword to Mark Tide's Trace</b>
      <br />Deal <b class="text-wuwa-aero">Aero DMG</b> and inflict <span class="text-desc">2</span> stacks of <b class="text-wuwa-aero">Aero Erosion</b> on targets hit. Summon <b class="text-violet-300">Sword of Discord's Shadow</b>.
      <br />Up to <span class="text-desc">1</span> <b class="text-violet-300">Sword of Discord's Shadow</b> may exist at the same time, lasting <span class="text-desc">20</span>s.
      <br />Click Normal Attack shortly after <b>Cartethyia - Sword to Mark Tide</b>'s Trace to perform Basic Attack - Cartethyia Stage 2.
      <br />
      <br /><b>Fleurdelys - Sword to Call for Freedom</b>
      <br />Thrust forward to impale the target, dealing <b class="text-wuwa-aero">Aero DMG</b> and restoring <b class="text-desc">Resolve</b>.
      <br />Click Normal Attack shortly after Fleurdelys - <b>Sword to Call for Freedom</b> to cast Basic Attack - Fleurdelys Stage 2.
      `,
      image: 'SP_IconKatixiyaQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Wind's Divine Blessing`,
      content: `<b class="text-wuwa-aero">Aero DMG</b> dealt by the active Resonator in the team other than Cartethyia/Fleurdelys to targets with Negative Statuses is Amplified by <span class="text-desc">17.5%</span> for <span class="text-desc">20</span>s.`,
      image: 'SP_IconKatixiyaT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `A Heart's Truest Wishes`,
      content: `The healing received by all Resonators other than Cartethyia/Fleurdelys in the team is increased by <span class="text-desc">20%</span> and their resistance to interruption is enhanced. If Rover: Aero is in the team, Rover: Aero additionally restores <span class="text-desc">25</span> <b class="text-emerald-300">Windstrings</b> upon casting <b>Omega Storm</b>.`,
      image: 'SP_IconKatixiyaD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Winds' Indelible Imprint`,
      content: `Targets with <span class="text-desc">1</span> to <span class="text-desc">3</span> stacks of <b class="text-wuwa-aero">Aero Erosion</b> take <span class="text-desc">30%</span> more DMG from Cartethyia and Fleurdelys. Targets with more than <span class="text-desc">3</span> stacks of <b class="text-wuwa-aero">Aero Erosion</b> additionally take <span class="text-desc">10%</span> more DMG from Cartethyia and Fleurdelys for each stack of <b class="text-wuwa-aero">Aero Erosion</b> they have, up to <span class="text-desc">3</span> stacks.`,
      image: 'SP_IconKatixiyaD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Crown Destined by Fate`,
      content: `Defeating targets with <b class="text-wuwa-aero">Aero Erosion</b> as Cartethyia and Fleurdelys grants <b class="text-wuwa-aero">Zeal</b> that lasts for <span class="text-desc">10</span>s.
      <br />In the <b class="text-wuwa-aero">Zeal</b> state, upon defeating enemies, the next move raises the <b class="text-wuwa-aero">Aero Erosion</b> stacks on the targets hit to the highest count among the targets defeated. This will not exceed the current max <b class="text-wuwa-aero">Aero Erosion</b> stack limit. <b class="text-wuwa-aero">Zeal</b> is removed afterward and enters a <span class="text-desc">1</span>s cooldown.
      <br />When Fleurdelys's <b class="text-desc">Resolve</b> hits <span class="text-desc">30/60/90/120</span>, both Cartethyia and Fleurdelys's Crit. DMG is increased by <span class="text-desc">25%</span> for <span class="text-desc">15</span>s, up to <span class="text-desc">4</span> stacks. The duration of this effect does not reset upon gaining new stacks. After casting Resonance Liberation - <b>Blade of Howling Squall</b>, the increased Crit. DMG is removed.`,
      image: 'T_IconDevice_KatixiyaM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Blade Broken by Tempest`,
      content: `Casting Resonance Liberation - <b>A Knight's Heartfelt Prayers</b> increases the max stack limit of <b class="text-wuwa-aero">Aero Erosion</b> on targets within a certain range by <span class="text-desc">3</span> stacks. The next attack inflicts <span class="text-desc">3</span> stacks of <b class="text-wuwa-aero">Aero Erosion</b> on all targets hit and immediately trigger the <b class="text-wuwa-aero">Aero Erosion</b> DMG on the targets once without consuming the <b class="text-wuwa-aero">Aero Erosion</b> stacks.
      <br />The DMG Multipliers of Cartethyia's Basic Attack, Heavy Attack, Dodge Counter, and Intro Skill are increased by <span class="text-desc">50%</span> and the DMG Multiplier of her Mid-Air Attack is increased by <span class="text-desc">200%</span>.
      <br />After casting Mid-Air Attack - Cartethyia, every <span class="text-desc">1</span> type of <b>Sword Shadow</b> recalled reduces the cooldown of Resonance Skill - Cartethyia by <span class="text-desc">1</span>s.`,
      image: 'T_IconDevice_KatixiyaM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Hanged Prisoner in the Tower`,
      content: `Basic Attack - Fleurdelys Stage 5, Mid-Air Attack - Fleurdelys Stage 5, Enhanced Heavy Attack - Fleurdelys, and Resonance Skill - <b>May Tempest Break the Tides</b> now inflict <span class="text-desc">2</span> stacks of <b class="text-wuwa-aero">Aero Erosion</b> on the targets hit.
      <br />The DMG Multiplier of Resonance Skill - <b>Blade of Howling Squall</b> is increased by <span class="text-desc">100%</span>.`,
      image: 'T_IconDevice_KatixiyaM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Swan Song of Salvation`,
      content: `When Resonators in the team inflict <b class="text-wuwa-havoc">Havoc Bane</b>, <b class="text-wuwa-fusion">Fusion Burst</b>, <b class="text-wuwa-spectro">Spectro Frazzle</b>, <b class="text-wuwa-electro">Electro Flare</b>, <b class="text-wuwa-glacio">Glacio Chafe</b> and <b class="text-wuwa-aero">Aero Erosion</b>, all Resonators in the team gain <span class="text-desc">20%</span> DMG Bonus for all Attributes for <span class="text-desc">20</span>s.`,
      image: 'T_IconDevice_KatixiyaM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Hope Reshaped in Storms`,
      content: `When Cartethyia or Fleurdelys takes a fatal blow, they will not be downed by this instance of damage, but instead gain a Shield equal to <span class="text-desc">20%</span> of Cartethyia's Max HP for <span class="text-desc">10</span>s. This effect can be triggered once every <span class="text-desc">10</span> min.
      <br />The HP cost for casting Resonance Liberation - <b>A Knight's Heartfelt Prayers</b> is reduced to <span class="text-desc">25%</span> of Max HP.`,
      image: 'T_IconDevice_KatixiyaM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Freedom Found in Storm's Wake`,
      content: `After casting Resonance Liberation - <b>Blade of Howling Squall</b>, raise the <b class="text-wuwa-aero">Aero Erosion</b> stacks on the target to max.
      <br />After casting Intro Skill - <b>Sword to Mark Tide's Trace</b>, Intro Skill - <b>Sword to Call for Freedom</b>, Resonance Liberation - <b>A Knight's Heartfelt Prayers</b>, and Resonance Liberation - <b>Blade of Howling Squall</b>, Fleurdelys gains new abilities: For <span class="text-desc">30</span>s, when any Resonator in the team inflicts <b class="text-wuwa-aero">Aero Erosion</b> on the targets with max stacks of <b class="text-wuwa-aero">Aero Erosion</b>, immediately trigger the <b class="text-wuwa-aero">Aero Erosion</b> DMG once.
      <br />The targets take <span class="text-desc">40%</span> more DMG from Fleurdelys.`,
      image: 'T_IconDevice_KatixiyaM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'number',
      id: 'carte_lib',
      text: `Blade of Howling Squall DMG AMP`,
      ...talents.lib,
      content: carte_lib,
      show: true,
      default: 5,
      min: 0,
      max: 5,
    },
    {
      type: 'toggle',
      id: 'mandate',
      text: `Mandate of Divinity`,
      ...talents.ult,
      content: mandate,
      show: true,
      default: true,
    },
    {
      type: 'number',
      id: 'carte_i2',
      text: `I2 Erosion Count`,
      ...talents.i2,
      show: i.i2,
      default: 3,
      min: 0,
      max: 6,
    },
    {
      type: 'toggle',
      id: 'carte_i1',
      text: `I1 Outro Healing Bonus`,
      ...talents.i1,
      show: i.i1,
      default: false,
    },
    {
      type: 'number',
      id: 'carte_s1',
      text: `S1 Crit. DMG Bonus`,
      ...talents.c1,
      show: c >= 1,
      default: 1,
      min: 0,
      max: 4,
    },
    {
      type: 'toggle',
      id: 'carte_s4',
      text: `S4 Team DMG Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'carte_i1'), findContentById(content, 'carte_s4')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'carte_outro',
        text: `Outro: Wind's Divine Blessing`,
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
          value: [{ scaling: calcScaling(0.0241, normal), multiplier: Stats.HP }],
          element: Element.AERO,
          property: TalentProperty.BA,
          multiplier: c >= 2 ? 1.5 : 1,
        },
        {
          name: 'Stage 2 DMG',
          value: [
            { scaling: calcScaling(0.0198, normal), multiplier: Stats.HP, hits: 2 },
            { scaling: calcScaling(0.0264, normal), multiplier: Stats.HP },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
          multiplier: c >= 2 ? 1.5 : 1,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.0215, normal), multiplier: Stats.HP, hits: 4 }],
          element: Element.AERO,
          property: TalentProperty.BA,
          multiplier: c >= 2 ? 1.5 : 1,
        },
        {
          name: 'Stage 4 DMG',
          value: [
            { scaling: calcScaling(0.0127, normal), multiplier: Stats.HP, hits: 3 },
            { scaling: calcScaling(0.038, normal), multiplier: Stats.HP },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
          multiplier: c >= 2 ? 1.5 : 1,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [
            { scaling: calcScaling(0.0105, normal), multiplier: Stats.HP, hits: 3 },
            { scaling: calcScaling(0.0314, normal), multiplier: Stats.HP },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
          multiplier: c >= 2 ? 1.5 : 1,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack (0~1 Sword) DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.0284, normal), multiplier: Stats.HP }],
          element: Element.AERO,
          property: TalentProperty.BA,
          subType: TalentSubType.EROSION,
          multiplier: c >= 2 ? 3 : 1,
        },
        {
          name: 'Mid-Air Attack (2 Swords) DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.0166, normal), multiplier: Stats.HP, hits: 3 }],
          element: Element.AERO,
          property: TalentProperty.BA,
          subType: TalentSubType.EROSION,
          multiplier: c >= 2 ? 3 : 1,
        },
        {
          name: 'Mid-Air Attack (3 Swords) DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.0568, normal), multiplier: Stats.HP, hits: 3 }],
          element: Element.AERO,
          property: TalentProperty.BA,
          subType: TalentSubType.EROSION,
          multiplier: c >= 2 ? 3 : 1,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.0143, normal), multiplier: Stats.HP, hits: 4 }],
          element: Element.AERO,
          property: TalentProperty.BA,
          multiplier: c >= 2 ? 1.5 : 1,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Sword to Bear Their Names DMG',
          value: [
            { scaling: calcScaling(0.0347, skill), multiplier: Stats.HP, hits: 3 },
            { scaling: calcScaling(0.0446, skill), multiplier: Stats.HP },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.LIB_SCALING = [
        {
          name: `Blade of Howling Squall DMG`,
          value: [{ scaling: calcScaling(0.066, lib), multiplier: Stats.HP, hits: 7 }],
          element: Element.AERO,
          property: TalentProperty.LIB,
          amp: (form.carte_lib || 0) * 0.2,
          bonus: c >= 6 ? 0.4 : 0,
          multiplier: c >= 3 ? 2 : 1,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Fleurdelys - Stage 1 DMG',
          value: [{ scaling: calcScaling(0.0327, forte), multiplier: Stats.HP }],
          element: Element.AERO,
          property: TalentProperty.BA,
          bonus: c >= 6 ? 0.4 : 0,
        },
        {
          name: 'Fleurdelys - Stage 2 DMG',
          value: [
            { scaling: calcScaling(0.0183, forte), multiplier: Stats.HP },
            { scaling: calcScaling(0.0092, forte), multiplier: Stats.HP, hits: 3 },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
          bonus: c >= 6 ? 0.4 : 0,
        },
        {
          name: 'Fleurdelys - Stage 3 DMG',
          value: [
            { scaling: calcScaling(0.0108, forte), multiplier: Stats.HP, hits: 3 },
            { scaling: calcScaling(0.0215, forte), multiplier: Stats.HP },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
          bonus: c >= 6 ? 0.4 : 0,
        },
        {
          name: 'Fleurdelys - Stage 4 DMG',
          value: [{ scaling: calcScaling(0.0138, forte), multiplier: Stats.HP, hits: 4 }],
          element: Element.AERO,
          property: TalentProperty.BA,
          bonus: c >= 6 ? 0.4 : 0,
        },
        {
          name: 'Fleurdelys - Stage 5 DMG',
          value: [
            { scaling: calcScaling(0.0363, forte), multiplier: Stats.HP },
            { scaling: calcScaling(0.1449, forte), multiplier: Stats.HP },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
          bonus: c >= 6 ? 0.4 : 0,
        },
        {
          name: 'Fleurdelys - Dodge Counter DMG',
          value: [
            { scaling: calcScaling(0.0161, forte), multiplier: Stats.HP, hits: 3 },
            { scaling: calcScaling(0.0322, forte), multiplier: Stats.HP },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
          bonus: c >= 6 ? 0.4 : 0,
        },
        {
          name: 'Fleurdelys - Upward Cut DMG',
          value: [{ scaling: calcScaling(0.0229, forte), multiplier: Stats.HP, hits: 2 }],
          element: Element.AERO,
          property: TalentProperty.BA,
          bonus: c >= 6 ? 0.4 : 0,
        },
        {
          name: 'Fleurdelys - Heavy Attack DMG',
          value: [
            { scaling: calcScaling(0.0215, forte), multiplier: Stats.HP },
            { scaling: calcScaling(0.0502, forte), multiplier: Stats.HP },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
          bonus: c >= 6 ? 0.4 : 0,
        },
        {
          name: 'Fleurdelys - Enhanced Heavy Attack DMG',
          value: [
            { scaling: calcScaling(0.0391, forte), multiplier: Stats.HP, hits: 2 },
            { scaling: calcScaling(0.0196, forte), multiplier: Stats.HP },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
          bonus: c >= 6 ? 0.4 : 0,
        },
        {
          name: 'Fleurdelys - Mid-Air Attack 1 DMG',
          value: [
            { scaling: calcScaling(0.015, forte), multiplier: Stats.HP, hits: 2 },
            { scaling: calcScaling(0.0155, forte), multiplier: Stats.HP },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
          bonus: c >= 6 ? 0.4 : 0,
        },
        {
          name: 'Fleurdelys - Mid-Air Attack 2 DMG',
          value: [
            { scaling: calcScaling(0.0372, forte), multiplier: Stats.HP, hits: 2 },
            { scaling: calcScaling(0.0743, forte), multiplier: Stats.HP },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
          bonus: c >= 6 ? 0.4 : 0,
        },
        {
          name: 'Fleurdelys - Mid-Air Attack 3 DMG',
          value: [{ scaling: calcScaling(0.0111, forte), multiplier: Stats.HP }],
          element: Element.AERO,
          property: TalentProperty.BA,
          bonus: c >= 6 ? 0.4 : 0,
        },
        {
          name: `Sword to Answer Waves' Call DMG`,
          value: [
            { scaling: calcScaling(0.0094, forte), multiplier: Stats.HP, hits: 4 },
            { scaling: calcScaling(0.0873, forte), multiplier: Stats.HP },
          ],
          element: Element.AERO,
          property: TalentProperty.SKILL,
          bonus: c >= 6 ? 0.4 : 0,
        },
        {
          name: 'May Tempest Break the Tides DMG',
          value: [
            { scaling: calcScaling(0.0094, forte), multiplier: Stats.HP, hits: 2 },
            { scaling: calcScaling(0.0354, forte), multiplier: Stats.HP, hits: 3 },
          ],
          element: Element.AERO,
          property: TalentProperty.SKILL,
          bonus: c >= 6 ? 0.4 : 0,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Sword to Mark Tide's Trace DMG`,
          value: [
            { scaling: calcScaling(0.0105, intro), multiplier: Stats.HP, hits: 3 },
            { scaling: calcScaling(0.0314, intro), multiplier: Stats.HP },
          ],
          element: Element.AERO,
          property: TalentProperty.INTRO,
          multiplier: c >= 2 ? 1.5 : 1,
        },
        {
          name: `Sword to Call for Freedom DMG`,
          value: [
            { scaling: calcScaling(0.0215, intro), multiplier: Stats.HP },
            { scaling: calcScaling(0.0502, intro), multiplier: Stats.HP },
          ],
          element: Element.AERO,
          property: TalentProperty.INTRO,
          bonus: c >= 6 ? 0.4 : 0,
        },
      ]

      if (form.carte_i2) {
        base[Stats.ALL_DMG].push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: _.max([form.carte_i2 * 0.1, 0.3]),
        })
      }
      if (form.mandate) {
        base.EROSION_AMP.push({
          name: `Mandate of Divinity`,
          source: 'Self',
          value: 0.5,
        })
      }
      if (form.carte_s1) {
        base[Stats.CRIT_DMG].push({
          name: `Sequence Node 1`,
          source: 'Self',
          value: 0.25 * form.carte_s1,
        })
      }
      if (form.carte_s4) {
        base[Stats.ATTR_DMG].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (c >= 5) {
        base.FORTE_SCALING.push({
          name: `S5 Shield`,
          value: [{ scaling: 0.2, multiplier: Stats.HP }],
          element: TalentProperty.SHIELD,
          property: TalentProperty.SHIELD,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.carte_i1) {
        base.I_HEAL.push({
          name: `Inherent Skill 1`,
          source: 'Cartethyia',
          value: 0.2,
        })
      }
      if (aForm.carte_outro) {
        base.AERO_AMP.push({
          name: `Outro Skill`,
          source: 'Cartethyia',
          value: 0.175,
        })
      }
      if (form.carte_s4) {
        base[Stats.ATTR_DMG].push({
          name: `Sequence Node 4`,
          source: 'Cartethyia',
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

export default Carte
