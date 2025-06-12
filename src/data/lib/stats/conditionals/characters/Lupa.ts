import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Lupa = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const elements = _.map(team, (t) => findCharacter(t.cId)?.element)
  const fusionCount = _.size(_.filter(elements, (e) => e === Element.FUSION))

  const pack_hunt = `<b class="text-rose-600">Pack Hunt</b>
      <br />Resonators with <b class="text-rose-600">Pack Hunt</b> gain a <span class="text-desc">6%</span> ATK increase, and <span class="text-desc">10%</span> <b class="text-wuwa-fusion">Fusion DMG Bonus</b> when they attack Overlord Class or Calamity Class targets (Both are non-stackable). If there are more than <span class="text-desc">3</span> <b class="text-wuwa-fusion">Fusion</b> Resonators in the team, the <b class="text-wuwa-fusion">Fusion DMG Bonus</b> against Overlord Class or Calamity Class targets additionally increases by <span class="text-desc">10%</span>. When the active Resonator casts Intro Skill, <b class="text-rose-600">Pack Hunt</b> is enhanced, granting an additional <span class="text-desc">6%</span> ATK increase to all Resonators in the team, up to a maximum of <span class="text-desc">18%</span>.
      <br />If Lupa's <b class="text-rose-600">Pack Hunt</b> reaches its cap within its duration, she enters <b>Wild Hunt</b> and Intro Skill <b>Nowhere to Run!</b> becomes available. <b>Wild Hunt</b> can be triggered once per <b class="text-rose-600">Pack Hunt</b>.`
  const wildfire_banner = `<b class="text-indigo-400">Wildfire Banner</b>
      <br />Lupa's ATK is increased by <span class="text-desc">12%</span> for <span class="text-desc">8</span>s when performing the following actions:
      <br />- Casting Resonance Skill <b>Feral Fang</b>.
      <br />- Casting Heavy Attack - <b>Wolf's Gnawing</b>, Heavy Attack - <b>Wolf's Claw</b>, or Mid-Air Attack - <b>Firestrike</b>.
      <br />- Casting Resonance Liberation <b>Fire-Kissed Glory</b>.
      <br />- Casting <b>Dance With the Wolf</b> and <b>Dance With the Wolf - Climax</b>.`

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Flaming Star`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 4 consecutive attacks, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />- After Basic Attack Stage 3, press Normal Attack in the right time to cast Mid-Air Attack Stage 1.
      <br />- After Dodge Counter, Basic Attack <b>Starfall</b>, Resonance Skill <b>Shewolf's Hunt</b>, or Resonance Skill <b>Feral Fang</b>, press Normal Attack in the right time to cast Basic Attack Stage 2.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Consumes STA to attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Heavy Attack - Wolf's Gnawing</b>
      <br />When <b class="text-red">Wolflame</b> reaches <span class="text-desc">50</span> points, Heavy Attack will be replaced by <b>Wolf's Gnawing</b>, consuming STA to attack the target and dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />- This attack does not restore <b class="text-red">Wolflame</b>. Consume <span class="text-desc">50</span> points of <b class="text-red">Wolflame</b> to perform this attack and gain <span class="text-desc">1</span> point of <b class="text-desc">Wolfaith</b>.
      <br />
      <br /><b>Heavy Attack - Wolf's Claw</b>
      <br />When <b class="text-red">Wolflame</b> reaches <span class="text-desc">50</span> points and <b class="text-desc">Wolfaith</b> reaches <span class="text-desc">1</span> point, Heavy Attack will be replaced by <b>Wolf's Claw</b>, consuming STA to attack the target and dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />- If <b class="text-red">Wolflame</b> reaches <span class="text-desc">50</span> points and <b class="text-desc">Wolfaith</b> reaches <span class="text-desc">1</span> point after performing Mid-Air Attack - <b>Firestrike</b> or Heavy Attack - <b>Wolf's Gnawing</b>, press Normal Attack in time to perform Heavy Attack - <b>Wolf's Claw</b>.
      <br />- This attack does not restore <b class="text-red">Wolflame</b>. Consume <span class="text-desc">50</span> points of <b class="text-red">Wolflame</b> to perform this attack and gain <span class="text-desc">1</span> point of <b class="text-desc">Wolfaith</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Consume Stamina to perform up to 3 attacks in mid-air, dealing <b class="text-wuwa-fusion">Fusion DMG</b>. The Mid-Air Attack cycle will not be reset.
      <br />
      <br /><b>Mid-Air Attack - Firestrike</b>
      <br />When <b class="text-red">Wolflame</b> reaches <span class="text-desc">50</span> points, Mid-Air Attack Stage 3 will be replaced by Mid-air Attack - <b>Firestrike</b>, consuming STA to attack the target and dealing <b class="text-wuwa-fusion">Fusion DMG</b> (considered Heavy Attack DMG).
      <br />- This attack does not restore <b class="text-red">Wolflame</b>. Consume <span class="text-desc">50</span> points of <b class="text-red">Wolflame</b> to perform this attack and gain <span class="text-desc">1</span> point of <b class="text-desc">Wolfaith</b>.
      <br />
      <br /><b>Plunging Attack</b>
      <br />Hold Normal Attack while airborne to perform a Plunging Attack at the cost of STA, dealing <b class="text-wuwa-fusion">Fusion DMG</b>. After performing this attack, press Normal Attack in time to perform Basic Attack <b>Starfall</b>.
      <br />- If a a successful Dodge is performed while casting Basic Attack Stage 3 or Mid-Air Attack - <b>Firestrike</b>, press Normal Attack to perform Plunging Attack at the cost of STA.
      <br />
      <br /><b>Basic Attack - Starfall</b>
      <br />Attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Press Normal Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.`,
      image: 'SP_IconNorSword',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Shewolf's Hunt`,
      content: `Lupa throws her <b class="text-indigo-400">Wildfire Banner</b> at the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b> and restoring <span class="text-desc">15</span> points of <b class="text-red">Wolflame</b>. <b class="text-orange-400">Mark</b> the target for <span class="text-desc">8</span>s. After performing Resonance Skill <b>Shewolf's Hunt</b>, Lupa can perform <b>Feral Fang</b>.
      <br />Can be performed in mid-air close to the ground.
      <br />- Hold Resonance Skill to leap into the air, then follow up with Basic Attack to cast Mid-Air Attack Stage 1.
      <br />
      <br /><b>Resonance Skill - Feral Fang</b>
      <br />Lupa presses on the target relentlessly, dealing <b class="text-wuwa-fusion">Fusion DMG</b> restoring <span class="text-desc">15</span> points of <b class="text-red">Wolflame</b>. The DMG Multiplier to <b class="text-orange-400">marked</b> target is increased by <span class="text-desc">50%</span>. If Resonance Skill - <b>Feral Fang</b> is not performed or Lupa is switched out, it enters cooldown.
      <br />Can be performed in mid-air close to the ground.`,
      image: 'SP_IconLupaB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Fire-Kissed Glory`,
      content: `Attack the target and deal <b class="text-wuwa-fusion">Fusion DMG</b>. Performing this attack consumes all <b class="text-desc">Wolfaith</b> and restores <span class="text-desc">100</span> points of <b class="text-red">Wolflame</b>. Use Basic Attack or Resonance Skill shortly after to cast Resonance Skill <b>Foebreaker</b>.
      <br />Can be performed in mid-air close to the ground.
      <br />Performing this skill strengthens all Resonators in the team. Within <span class="text-desc">35</span>s:
      <br />- All Resonators in the team gain <b class="text-rose-600">Pack Hunt</b> effect.
      <br />- If the active Resonator is hit or launched into the air, they immediately recover and are considered to have successfully dodged the attack when they are on the ground. Can be triggered up to <span class="text-desc">3</span> times.
      <br />
      <br />${pack_hunt}
      <br />
      <br /><b>Resonance Skill - Foebreaker</b>
      <br />Consume all <b class="text-red">Wolflame</b> to perform <b>Foebreaker</b>, dealing <b class="text-wuwa-fusion">Fusion DMG</b> and entering <b class="text-wuwa-fusion">Burning Matchpoint</b> state.
      <br />
      <br /><b class="text-wuwa-fusion">Burning Matchpoint</b>
      <br />Normal Attacks increase <b class="text-red">Wolflame</b> Regen by <span class="text-desc">500%</span> on hit. Cannot perform Resonance Skill <b>Shewolf's Hunt</b> and Resonance Skill <b>Feral Fang</b> in this state.`,
      image: 'SP_IconLupaC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Ignis Lupa`,
      content: `${wildfire_banner}
      <br />
      <br /><b>Dance With the Wolf</b>
      <br />When <b class="text-desc">Wolfaith</b> reaches <span class="text-desc">2</span> points, Resonance Skill is replaced with <b>Dance With the Wolf</b>. Performing <b>Dance With the Wolf</b> consumes all <b class="text-desc">Wolfaith</b>, dealing <b class="text-wuwa-fusion">Fusion DMG</b> (considered Resonance Liberation DMG).
      <br />Can be performed in mid-air close to the ground.
      <br />
      <br /><b>Dance With the Wolf - Climax</b>
      <br />When <b class="text-desc">Wolfaith</b> reaches <span class="text-desc">2</span> points in the <b class="text-wuwa-fusion">Burning Matchpoint</b> state, Resonance Skill is replaced with <b>Dance With the Wolf - Climax</b>. Performing <b>Dance With the Wolf - Climax</b> consumes all <b class="text-desc">Wolfaith</b>, dealing <b class="text-wuwa-fusion">Fusion DMG</b> (considered Resonance Liberation DMG). <b class="text-wuwa-fusion">Burning Matchpoint</b> is removed when the skill ends.
      <br />Can be performed in mid-air close to the ground.
      <br />
      <br /><b>Set the Arena Ablaze</b>
      <br />Within <span class="text-desc">8</span>s after performing <b>Dance With the Wolf</b> or <b>Dance With the Wolf - Climax</b>, Lupa will remain on the field and back up the active Resonator when they perform Resonance Liberation, dealing <b class="text-wuwa-fusion">Fusion DMG</b>, considered Resonance Skill DMG. This effect can only be triggered once in the duration.
      <br />
      <br /><b class="text-red">Wolflame</b>
      <br />Lupa can hold up to <span class="text-desc">100</span> points of <b class="text-red">Wolflame</b>.
      <br />- Restore <b class="text-red">Wolflame</b> when Normal Attacks hit the target.
      <br />- Restore <b class="text-red">Wolflame</b> while casting Resonance Skill.
      <br />- Restore <b class="text-red">Wolflame</b> while casting Resonance Liberation.
      <br />
      <br /><b class="text-desc">Wolfaith</b>
      <br />Lupa can hold up to <span class="text-desc">2</span> points of <b class="text-desc">Wolfaith</b>.
      <br /><b class="text-desc">Wolfaith</b> lasts for <span class="text-desc">10</span>s. The duration is reset when <b class="text-desc">Wolfaith</b> is restored. At the end of its duration, each remaining point of <b class="text-desc">Wolfaith</b> becomes <span class="text-desc">50</span> points of <b class="text-red">Wolflame</b>.
      <br />- Restore <span class="text-desc">1</span> points of <b class="text-desc">Wolfaith</b> when casting Heavy Attack - <b>Wolf's Gnawing</b>, Heavy Attack - <b>Wolf's Claw</b>, or Mid-Air Attack - <b>Firestrike</b>.`,
      image: 'SP_IconLupaY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Try Focusing, Eh?`,
      content: `Attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>. Press Normal Attack following Intro Skill <b>Try Focusing, Eh?</b> to cast Mid-Air Attack Stage 3.
      <br />
      <br /><b>Nowhere to Run!</b>
      <br />When Lupa enters the <b>Wild Hunt</b> state, her next Intro Skill is replaced with <b>Nowhere to Run!</b>. Casting <b>Nowhere to Run!</b> removes the <b class="text-rose-600">Pack Hunt</b> and <b class="text-amber-200">Glory</b> effects on all Resonators in the team, dealing <b class="text-wuwa-fusion">Fusion DMG</b> (considered Resonance Liberation DMG).`,
      image: 'SP_IconLupaQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Stand by Me, Warrior`,
      content: `The incoming Resonator will have their <b class="text-wuwa-fusion">Fusion DMG</b> Amplified by <span class="text-desc">20%</span> and Basic Attack DMG Amplified by <span class="text-desc">25%</span> for <span class="text-desc">14</span>s or until the Resonator is switched out.`,
      image: 'SP_IconLupaT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Remember My Name`,
      content: `After dashing for <span class="text-desc">2.5</span>s, Lupa enters Sprint state. The next Basic Attack is replaced with Basic Attack - <b>Starfall</b>.
      <br />Gain increased resistance to interruptions while casting Heavy Attack - <b>Wolf's Gnawing</b>, Heavy Attack - <b>Wolf's Claw</b>, and Mid-Air Attack - <b>Firestrike</b>.`,
      image: 'SP_IconLupaD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Applause of Victory`,
      content: `Defeating a <b class="text-orange-400">marked</b> target resets the cooldown of Resonance Skill <b>Shewolf's Hunt</b>.
      <br />
      <br /><b>Resonance Liberation - Glory</b>
      <br />Casting Resonance Liberation <b>Fire-Kissed Glory</b> grants <b class="text-amber-200">Glory</b>. Within <span class="text-desc">35</span>s:
      <br />Attacks of all Resonators in the team ignore <span class="text-desc">3%</span> of the target's <b class="text-wuwa-fusion">Fusion RES</b>. For each <b class="text-wuwa-fusion">Fusion</b> Resonator in the team other than Lupa, this effect increases by <span class="text-desc">3%</span>, up to the maximum of <span class="text-desc">9%</span>. When there are <span class="text-desc">3</span> <b class="text-wuwa-fusion">Fusion</b> Resonators in the team, Resonators' attacks further ignore <span class="text-desc">6%</span> <b class="text-wuwa-fusion">Fusion RES</b>.`,
      image: 'SP_IconLupaD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Behold the Nameless One`,
      content: `Performing Resonance Skill <b>Fire-Kissed Glory</b> recovers <span class="text-desc">10</span> Concerto Energy for Lupa and increases Lupa's Crit. Rate by <span class="text-desc">20%</span> for <span class="text-desc">10</span>s.
      <br /><b>Dance With the Wolf - Climax</b> is immune to interruption.`,
      image: 'T_IconDevice_LupaM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Every Ground, Her Hunting Field`,
      content: `Performing <b>Fire-Kissed Glory</b>, Heavy Attack - <b>Wolf's Gnawing</b>, Heavy Attack - <b>Wolf's Claw</b>, or Mid-Air Attack - <b>Firestrike</b> gives <span class="text-desc">20%</span> <b class="text-wuwa-fusion">Fusion DMG Bonus</b> to all Resonators in the team for <span class="text-desc">30</span>s, stacking up to <span class="text-desc">2</span> times.`,
      image: 'T_IconDevice_LupaM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Wolflame Howls in Her Wake`,
      content: `The DMG Multiplier of Intro Skill <b>Nowhere to Run!</b> increases by <span class="text-desc">100%</span>.
      <br />- The <b class="text-rose-600">Pack Hunt</b> effect of Resonance Liberation now no longer requires <span class="text-desc">3</span> <b class="text-wuwa-fusion">Fusion</b> Resonators.
      <br />- The <b class="text-amber-200">Glory</b> effect of Resonance Liberation is now modified as:
      <br />Casting Resonance Liberation <b>Fire-Kissed Glory</b> additionally grants <b class="text-amber-200">Glory</b>. Resonators in the team ignore <span class="text-desc">15%</span> <b class="text-wuwa-fusion">Fusion RES</b> of targets for <span class="text-desc">35</span>s.`,
      image: 'T_IconDevice_LupaM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `High and Aflame Is Her Banner`,
      content: `The DMG Multiplier of <b>Dance With the Wolf - Climax</b> increases by <span class="text-desc">125%</span>.`,
      image: 'T_IconDevice_LupaM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Embrace the Thunderous Triumph`,
      content: `Performing Intro Skill <b>Try Focusing, Eh?</b> or <b>Nowhere to Run!</b> gives <span class="text-desc">15%</span> Resonance Liberation DMG Bonus for <span class="text-desc">10</span>s.`,
      image: 'T_IconDevice_LupaM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `To the Brightest Flaming Star`,
      content: `- The damage dealt by Forte Circuit <b>Dance With the Wolf - Climax</b>, Resonance Liberation <b>Fire-Kissed Glory</b>, and Intro Skill <b>Nowhere to Run!</b> ignores <span class="text-desc">30%</span> of the target's DEF.
      <br />- Resonance Skill <b>Feral Fang</b> restores <span class="text-desc">100</span> points of <b class="text-red">Wolflame</b> on hit, triggered once per <span class="text-desc">20</span>s.
      <br />- Forte Circuit <b>Dance With the Wolf</b> is replaced with <b>Dance With the Wolf - Climax</b>. <b>Dance With the Wolf - Climax</b> can be performed when Lupa is not in <b class="text-wuwa-fusion">Burning Matchpoint</b> state.
      <br />- Casting Intro Skill <b>Nowhere to Run!</b> no longer ends <b class="text-rose-600">Pack Hunt</b> and <b class="text-amber-200">Glory</b>.`,
      image: 'T_IconDevice_LupaM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'number',
      id: 'pack_hunt',
      text: `Pack Hunt (ATK)`,
      ...talents.lib,
      content: pack_hunt,
      show: true,
      default: 1,
      min: 0,
      max: 3,
    },
    {
      type: 'toggle',
      id: 'pack_hunt_dmg',
      text: `Pack Hunt (DMG%)`,
      ...talents.lib,
      content: pack_hunt,
      show: true,
      default: true,
    },
    {
      type: 'toggle',
      id: 'wildfire_banner',
      text: `Wildfire Banner`,
      ...talents.forte,
      content: wildfire_banner,
      show: true,
      default: true,
    },
    {
      type: 'toggle',
      id: 'glory',
      text: `Glory`,
      ...talents.i2,
      show: i.i2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'lupa_c1',
      text: `S1 Crit. Rate Bonus`,
      ...talents.c1,
      show: c >= 1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'lupa_c2',
      text: `S2 Fusion DMG Bonus`,
      ...talents.c2,
      show: c >= 2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'lupa_c5',
      text: `S5 Liberation Bonus`,
      ...talents.c5,
      show: c >= 5,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [
    findContentById(content, 'pack_hunt'),
    findContentById(content, 'glory'),
    findContentById(content, 'lupa_c2'),
  ]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'lupa_outro',
        text: `Outro: Stand by Me, Warrior`,
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
          value: [
            { scaling: calcScaling(0.1133, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.2266, normal), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.4531, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [
            { scaling: calcScaling(0.3966, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.0661, normal), multiplier: Stats.ATK, hits: 6 },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [
            { scaling: calcScaling(0.3716, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.2477, normal), multiplier: Stats.ATK, hits: 2 },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Starfall DMG',
          value: [
            { scaling: calcScaling(0.0637, normal), multiplier: Stats.ATK, hits: 4 },
            { scaling: calcScaling(0.5939, normal), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.2835, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.FUSION,
          property: TalentProperty.HA,
        },
        {
          name: `Wolf's Gnawing DMG`,
          value: [{ scaling: calcScaling(0.2822, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.FUSION,
          property: TalentProperty.HA,
        },
        {
          name: `Wolf's Claw DMG`,
          value: [
            { scaling: calcScaling(0.3629, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.0908, normal), multiplier: Stats.ATK, hits: 6 },
            { scaling: calcScaling(0.4839, normal), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack Stage 1 DMG',
          value: [{ scaling: calcScaling(0.3859, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Mid-Air Attack Stage 2 DMG',
          value: [
            { scaling: calcScaling(0.3885, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.0972, normal), multiplier: Stats.ATK, hits: 4 },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Mid-Air Attack Stage 3 DMG',
          value: [{ scaling: calcScaling(0.1433, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Firestrike DMG',
          value: [{ scaling: calcScaling(0.1433, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Plunging Attack DMG',
          value: [
            { scaling: calcScaling(0.1318, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.2635, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1318, normal), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          value: [
            { scaling: calcScaling(0.172, normal), multiplier: Stats.ATK, hits: 4 },
            { scaling: calcScaling(0.6877, normal), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: `Shewolf's Hunt DMG`,
          value: [{ scaling: calcScaling(0.7081, skill), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Feral Fang DMG',
          value: [{ scaling: calcScaling(1.5774, skill), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Marked Feral Fang DMG',
          value: [{ scaling: calcScaling(1.5774, skill), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.SKILL,
          multiplier: 1.5,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Fire-Kissed Glory DMG',
          value: [{ scaling: calcScaling(4.1268, lib), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.LIB,
          defPen: c >= 6 ? 0.3 : 0,
        },
        {
          name: 'Foebreaker DMG',
          value: [{ scaling: calcScaling(1.5314, lib), multiplier: Stats.ATK, hits: 2 }],
          element: Element.FUSION,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Dance With the Wolf DMG',
          value: [
            { scaling: calcScaling(0.2818, forte), multiplier: Stats.ATK },
            { scaling: calcScaling(0.2114, forte), multiplier: Stats.ATK, hits: 4 },
            { scaling: calcScaling(1.6906, forte), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.LIB,
        },
        {
          name: 'Dance With the Wolf - Climax DMG',
          value: [
            { scaling: calcScaling(0.3804, forte), multiplier: Stats.ATK },
            { scaling: calcScaling(0.2853, forte), multiplier: Stats.ATK, hits: 4 },
            { scaling: calcScaling(2.2823, forte), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.LIB,
          multiplier: c >= 4 ? 2.25 : 1,
          defPen: c >= 6 ? 0.3 : 0,
        },
        {
          name: 'Set the Arena Ablaze DMG',
          value: [
            { scaling: calcScaling(0.2131, forte), multiplier: Stats.ATK },
            { scaling: calcScaling(0.8521, forte), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.SKILL,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Try Focusing, Eh? DMG`,
          value: [
            { scaling: calcScaling(0.1497, intro), multiplier: Stats.ATK },
            { scaling: calcScaling(0.2121, intro), multiplier: Stats.ATK, hits: 4 },
          ],
          element: Element.FUSION,
          property: TalentProperty.INTRO,
        },
        {
          name: `Nowhere to Run! DMG`,
          value: [
            { scaling: calcScaling(3.9916, intro), multiplier: Stats.ATK },
            { scaling: calcScaling(0.2495, intro), multiplier: Stats.ATK, hits: 4 },
          ],
          element: Element.FUSION,
          property: TalentProperty.LIB,
          multiplier: c >= 3 ? 2 : 1,
          defPen: c >= 6 ? 0.3 : 0,
        },
      ]

      if (form.pack_hunt) {
        base[Stats.P_ATK].push({
          name: `Pack Hunt`,
          source: 'Self',
          value: 0.06 * form.pack_hunt,
        })
      }
      if (form.pack_hunt_dmg) {
        base[Stats.FUSION_DMG].push({
          name: `Pack Hunt`,
          source: 'Self',
          value: fusionCount >= 3 || c >= 3 ? 0.2 : 0.1,
        })
      }
      if (form.wildfire_banner) {
        base[Stats.P_ATK].push({
          name: `Wildfire Banner`,
          source: 'Self',
          value: 0.12,
        })
      }

      if (form.glory) {
        base.FUSION_RES_PEN.push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: fusionCount >= 3 || c >= 3 ? 0.15 : 0.03 * fusionCount,
        })
      }
      if (form.lupa_c1) {
        base[Stats.CRIT_RATE].push({
          name: `Sequence Node 1`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (form.lupa_c2) {
        base[Stats.FUSION_DMG].push({
          name: `Sequence Node 2`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (form.lupa_c5) {
        base[Stats.LIB_DMG].push({
          name: `Sequence Node 5`,
          source: 'Self',
          value: 0.15,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.pack_hunt) {
        base[Stats.P_ATK].push({
          name: `Pack Hunt`,
          source: 'Lupa',
          value: 0.06 * form.pack_hunt,
        })
      }
      if (form.pack_hunt_dmg) {
        base[Stats.FUSION_DMG].push({
          name: `Pack Hunt`,
          source: 'Lupa',
          value: fusionCount >= 3 || c >= 3 ? 0.2 : 0.1,
        })
      }
      if (form.glory) {
        base.FUSION_RES_PEN.push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: fusionCount >= 3 || c >= 3 ? 0.15 : 0.03 * fusionCount,
        })
      }
      if (form.lupa_c2) {
        base[Stats.FUSION_DMG].push({
          name: `Sequence Node 2`,
          source: 'Lupa',
          value: 0.2,
        })
      }
      if (aForm.lupa_outro) {
        base.FUSION_AMP.push({
          name: `Outro`,
          source: 'Lupa',
          value: 0.2,
        })
        base.BASIC_AMP.push({
          name: `Outro`,
          source: 'Lupa',
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

export default Lupa
