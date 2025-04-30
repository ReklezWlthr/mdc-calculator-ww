import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Youhu = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Frosty Punches`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 4 consecutive attacks, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />- When <b class="text-wuwa-glacio">Frost</b> is full, hold the Normal Attack Button to cast <b>Frostfall</b>.
      <br />- When <b class="text-wuwa-glacio">Frost</b> is full during the <b class="text-desc">Fortune Rolling</b> state, release the Normal Attack Button to cast <b>Frostfall</b>. If Youhu cannot cast <b>Frostfall</b> at the moment, perform <b>Lucky Draw</b> once instead.
      <br />Youhu can obtain <b class="text-wuwa-glacio">Frost</b> in the following ways:
      <br />- When <b class="text-wuwa-glacio">Frost</b> is not full, hold Normal Attack Button to enter the <b class="text-desc">Fortune Rolling</b> state and restore <b class="text-wuwa-glacio">Frost</b> over time.
      <br />- When Basic Attacks hit a target.
      <br />
      <br /><b>Heavy Attack: Frostfall</b>
      <br />Youhu dashes forward, dealing <b class="text-wuwa-glacio">Glacio DMG</b>, and performs <b>Lucky Draw</b> once.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Perform a Plunging Attack at the cost of STA, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />When Youhu possesses no Antique, quickly press Normal Attack Button right after a successful Dodge to thrust forward, dealing <b class="text-wuwa-glacio">Glacio DMG</b>, and perform <b>Lucky Draw</b> once.`,
      image: 'SP_IconNorFist',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Scroll Divination`,
      content: `Youhu smashes her scroll down at the enemy, dealing <b class="text-wuwa-glacio">Glacio DMG</b>, restoring HP for all party members nearby, and performs <b>Lucky Draw</b> once.
      <br />
      <br /><b>Lucky Draw</b>
      <br />Youhu obtains a random <b class="text-desc">Antique</b> after the <b>Lucky Draw</b>. With an <b class="text-desc">Antique</b>, her next Basic Attack will activate the corresponding <b>Antique Appraisal</b>.
      <br />Only one <b class="text-desc">Antique</b> can exist at a time, and the newly <b class="text-desc">Antique</b> Antique will replace the existing one.
      <br />
      <br /><b>Antique Appraisal</b>
      <br />- <b class="text-heal">Chime</b>: Attack the enemy with a <b class="text-heal">Chime</b>, dealing <b class="text-wuwa-glacio">Glacio DMG</b>. <b class="text-heal">Chime</b> can effectively reduce the enemy's Vibration Strength.
      <br />- <b class="text-red">Ruyi</b>: Batter the enemy with a <b class="text-red">Ruyi</b>, dealing <b class="text-wuwa-glacio">Glacio DMG</b>. <b class="text-red">Ruyi</b> has a higher DMG Multiplier.
      <br />- <b class="text-wuwa-electro">Ding</b>: Ram into the enemy on a <b class="text-wuwa-electro">Ding</b>, dealing <b class="text-wuwa-glacio">Glacio DMG</b>. <b class="text-wuwa-electro">Ding</b> can effectively break the enemy's stance.
      <br />- <b class="text-wuwa-aero">Mask</b>: Throw a <b class="text-wuwa-aero">Mask</b> at enemies in front, dealing <b class="text-wuwa-glacio">Glacio DMG</b>. <b class="text-wuwa-aero">Mask</b> can pull in enemies along its path.`,
      image: 'SP_IconYouhuB4',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Fortune's Favor`,
      content: `Youhu hurls her scroll at the enemy, causing a <b class="text-wuwa-glacio">Glacio DMG</b> blast in the area.
      <br />On the blast, four buttons will appear. Choose a button within the specified time to obtain the corresponding <b class="text-desc">Antique</b>. Otherwise, obtain one random <b class="text-desc">Antique</b>.`,
      image: 'SP_IconYouhuC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Poetic Essence`,
      content: `At <span class="text-desc">four</span> <b class="text-blue">Auspices</b>, hold the Normal Attack button to release <b>Poetic Essence</b>, dealing <b class="text-wuwa-glacio">Glacio DMG</b>, considered as Resonance Skill DMG, while restoring HP for all nearby party members.
      <br />Youhu can hold up to <span class="text-desc">four</span> <b class="text-blue">Auspices</b>.
      <br />
      <br /><b>Poetic Essence</b>
      <br />Deal <b class="text-wuwa-glacio">Glacio DMG</b> to enemies within the range and additionally obtain one of the following effects based on the <b class="text-blue">Auspice</b> combination:
      <br />- <b class="text-wuwa-electro">Free Verse</b>: Four different types <b class="text-blue">Auspices</b>. Additionally reduce the Vibration Strength of hit enemies.
      <br />- <b class="text-blue">Antithesis</b>: A pair of <b class="text-blue">Auspices</b>. Increase <b>Poetic Essence</b>'s DMG by <span class="text-desc">70%</span>.
      <br />- <b class="text-heal">Double Pun</b>: Two pairs of <b class="text-blue">Auspices</b>. Additionally restore HP for all nearby party members.
      <br />- <b class="text-red">Triplet</b>: Three identical <b class="text-blue">Auspices</b>. Increase <b>Poetic Essence</b>'s DMG by <span class="text-desc">175%</span>.
      <br />- <b class="text-desc">Perfect Rhyme</b>: Four identical <b class="text-blue">Auspices</b>. Simultaneously activate the effects of <b class="text-wuwa-electro">Free Verse</b>, <b class="text-heal">Double Pun</b>, and <b class="text-red">Triplet</b>.
      <br />Casting <b>Poetic Essence</b> removes all <b class="text-blue">Auspices</b>.
      <br />
      <br /><b class="text-blue">Auspice</b>
      <br />- Youhu gains an <b class="text-blue">Auspice</b> through <b>Antique Appraisal</b>. Use Basic Attack while holding an <b class="text-desc">Antique</b> to receive the corresponding <b class="text-blue">Auspice</b>.
      <br />- Youhu unlocks <b class="text-desc">Antiques</b> by casting Resonance Skill <b>Scroll Divination</b>, Intro Skill <b>Scroll of Wonders</b>, Heavy Attack <b>Frostfall</b>, Resonance Liberation <b>Fortune's Favor</b>, and Dodge Counter.`,
      image: 'SP_IconYouhuY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Scroll of Wonders`,
      content: `Toss out the scroll and perform <b>Lucky Draw</b> once.`,
      image: 'SP_IconYouhuQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Timeless Classics`,
      content: `The incoming Resonator has their Coordinated Attack DMG Amplified by <span class="text-desc">100%</span> for <span class="text-desc">28</span>s.`,
      image: 'SP_IconYouhuT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Treasured Piece`,
      content: `Restore HP for all nearby party members based on <span class="text-desc">30%</span> of the healing provided by Resonance Skill <b>Scroll Divination</b> when Resonance Skill <b>Antique Appraisal</b> is cast.`,
      image: 'SP_IconYouhuD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Rare Find`,
      content: `Gain <span class="text-desc">15%</span> <b class="text-wuwa-glacio">Glacio DMG Bonus</b> for <span class="text-desc">14</span>s upon casting Intro Skill <b>Scroll of Wonders</b>.`,
      image: 'SP_IconYouhuD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Waterside Respite`,
      content: `Youhu has a <span class="text-desc">10%</span> chance to gain immunity to damage and interruption after casting <b>Lucky Draw</b>. This effect lasts for <span class="text-desc">5</span>s or until she is switched out.`,
      image: 'T_IconDevice_YouhuM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Sunroom Siesta`,
      content: `The DMG bonus of <b class="text-blue">Antithesis</b>, <b class="text-red">Triplet</b> and <b class="text-desc">Perfect Rhyme</b> on <b>Poetic Essence</b> is doubled.`,
      image: 'T_IconDevice_YouhuM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Restless Sleep`,
      content: `Youhu's ATK is increased by <span class="text-desc">20%</span>.`,
      image: 'T_IconDevice_YouhuM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Frosted Lullaby`,
      content: `Every time Resonance Skill <b>Scroll Divination</b> is cast, there is a <span class="text-desc">20%</span> chance that the skill will not enter Cooldown.`,
      image: 'T_IconDevice_YouhuM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Dreamland Meander`,
      content: `When Intro Skill <b>Scroll of Wonders</b> is cast, Youhu's Crit. Rate is increased by <span class="text-desc">15%</span> for <span class="text-desc">14</span>s.`,
      image: 'T_IconDevice_YouhuM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Slumber Evermore`,
      content: `When casting Resonance Skill <b>Antique Appraisal</b>, gain <span class="text-desc">1</span> stack of <b class="text-blue">Sky Blue</b>, stackable up to <span class="text-desc">4</span> times, lasting for <span class="text-desc">7</span>s. Each stack increases Youhu's Crit. DMG by <span class="text-desc">15%</span>.`,
      image: 'T_IconDevice_YouhuM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'cosmos_rave',
      text: `Cosmos Rave`,
      ...talents.lib,
      show: true,
      default: true,
    },
    {
      type: 'toggle',
      id: 'youhu_i2',
      text: `I2 Glacio DMG Bonus`,
      ...talents.i2,
      show: i.i2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'youhu_c5',
      text: `S5 Crit Rate Bonus`,
      ...talents.c5,
      show: c >= 5,
      default: true,
    },
    {
      type: 'number',
      id: 'youhu_c6',
      text: `C6 Crit DMG Bonus`,
      ...talents.c6,
      show: c >= 6,
      default: 0,
      min: 0,
      max: 4,
    },
    {
      type: 'toggle',
      id: 'encore_c4',
      text: `S4 Team Fusion DMG Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'number',
      id: 'encore_c6',
      text: `S6 ATK Bonus`,
      ...talents.c6,
      show: c >= 6,
      default: 0,
      min: 0,
      max: 5,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'encore_c4')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'youhu_outro',
        text: `Outro: Timeless Classics`,
        ...talents.outro,
        show: true,
        default: true,
      },
    ],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.BASIC_SCALING = [
        {
          name: 'Stage 1 DMG',
          value: [{ scaling: calcScaling(0.2383, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [
            { scaling: calcScaling(0.1605, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.2981, normal), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [
            { scaling: calcScaling(0.1915, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.234, normal), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(0.5853, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack: Frostfall DMG',
          value: [{ scaling: calcScaling(0.0727, normal), multiplier: Stats.ATK, hits: 6 }],
          element: Element.GLACIO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.62, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.1453, normal), multiplier: Stats.ATK, hits: 6 }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Scroll Divination DMG',
          value: [{ scaling: calcScaling(0.787, skill), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Scroll Divination Healing',
          value: [{ scaling: calcScaling(0.39, skill), multiplier: Stats.ATK }],
          flat: calcScaling(1041, skill),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
        {
          name: 'Chime DMG',
          value: [
            { scaling: calcScaling(0.2065, skill), multiplier: Stats.ATK },
            { scaling: calcScaling(0.2507, skill), multiplier: Stats.ATK, hits: 3 },
            { scaling: calcScaling(0.5162, skill), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Ruyi DMG',
          value: [
            { scaling: calcScaling(0.6891, skill), multiplier: Stats.ATK },
            { scaling: calcScaling(0.8423, skill), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Ding DMG',
          value: [
            { scaling: calcScaling(0.1438, skill), multiplier: Stats.ATK, hits: 6 },
            { scaling: calcScaling(0.5749, skill), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Mask DMG',
          value: [
            { scaling: calcScaling(0.0577, skill), multiplier: Stats.ATK, hits: 9 },
            { scaling: calcScaling(0.223, skill), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: `Fortune's Favor DMG`,
          value: [{ scaling: calcScaling(1.6458, forte), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Poetic Essence DMG',
          value: [{ scaling: calcScaling(0.1872, forte), multiplier: Stats.ATK, hits: 10 }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Antithesis DMG',
          value: [{ scaling: calcScaling(0.1872, forte), multiplier: Stats.ATK, hits: 10 }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
          bonus: c >= 2 ? 1.4 : 0.7,
        },
        {
          name: 'Triplet DMG',
          value: [{ scaling: calcScaling(0.1872, forte), multiplier: Stats.ATK, hits: 10 }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
          bonus: c >= 2 ? 3.5 : 1.75,
        },
        {
          name: 'Poetic Essence Healing',
          value: [{ scaling: calcScaling(0.442, forte), multiplier: Stats.ATK }],
          flat: calcScaling(1180, forte),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
        {
          name: 'Double Pun Bonus Healing',
          value: [{ scaling: calcScaling(0.26, forte), multiplier: Stats.ATK }],
          flat: calcScaling(694, forte),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Scroll of Wonders DMG`,
          value: [
            { scaling: calcScaling(0.45, intro), multiplier: Stats.ATK },
            { scaling: calcScaling(0.55, intro), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.INTRO,
        },
      ]

      if (i.i1) {
        base.SKILL_SCALING.push({
          name: 'I1 Antique Appraisal Healing',
          value: [{ scaling: calcScaling(0.39, skill), multiplier: Stats.ATK }],
          flat: calcScaling(1041, skill),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
          multiplier: 0.3,
        })
      }
      if (form.youhu_i2) {
        base[Stats.GLACIO_DMG].push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (c >= 3) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (form.youhu_c5) {
        base[Stats.CRIT_RATE].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (form.youhu_c6) {
        base[Stats.CRIT_DMG].push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.15 * form.youhu_c6,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.youhu_outro) {
        base.COORD_AMP.push({
          name: `Outro`,
          source: 'Youhu',
          value: 1,
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

export default Youhu
