import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Changli = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Blazing Enlightment`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 4 consecutive attacks, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />After releasing Basic Attack 4, enter <b class="text-red">True Sight</b>, lasting for <span class="text-desc">12</span>s.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Consume Stamina to perform up to 4 consecutive attacks in mid-air, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />After releasing Mid-Air Attack 4, enter <b class="text-red">True Sight</b>, lasting for <span class="text-desc">12</span>s.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Hold Basic Attack on the ground to perform an upward strike at the cost of Stamina, dealing <b class="text-wuwa-fusion">Fusion DMG</b>. Use Basic Attack within a certain time to release Mid-Air Attack 3.
      <br />
      <br /><b>Mid-Air Heavy Attack</b>
      <br />Shortly after holding Basic Attack in mid-air or using Basic Attack True Sight: Charge, use Basic Attack to perform a plunging attack at the cost of Stamina, dealing <b class="text-wuwa-fusion">Fusion DMG</b>. Use Basic Attack within a certain time to release Basic Attack 3.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      `,
      image: 'SP_IconNorKnife',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Tripartite Flames`,
      content: `<b>True Sight: Capture</b>
      <br />After releasing Resonance Skill, Changli dashes towards the enemy and enters <b class="text-red">True Sight</b>, lasting for <span class="text-desc">12</span>s. In the end, she releases a plunging attack, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br /><b>True Sight: Capture</b> has <span class="text-desc">2</span> initial charges and holds up to <span class="text-desc">2</span> charges at maximum. The number of charges is replenished by <span class="text-desc">1</span> every <span class="text-desc">12</span>s.
      <br />Can be cast in mid-air.
      <br />
      <br /><b>Basic Attack: True Sight - Conquest</b>
      <br />When in <b class="text-red">True Sight</b>, if Changli uses Ground Basic Attack, she releases <b>True Sight: Conquest</b>, dashing towards the enemy and dealing <b class="text-wuwa-fusion">Fusion DMG</b>, considered as Resonance Skill DMG. After releasing <b>True Sight: Conquest</b>, <b class="text-red">True Sight</b> ends.
      <br />
      <br /><b>Basic Attack: True Sight - Charge</b>
      <br />When in <b class="text-red">True Sight</b>, if Changli jumps or uses Basic Attack in mid-air, she releases <b>True Sight: Charge</b>, dashing towards the enemy and dealing <b class="text-wuwa-fusion">Fusion DMG</b>, considered as Resonance Skill DMG. After releasing <b>True Sight: Charge</b>, <b class="text-red">True Sight</b> ends.
      `,
      image: 'SP_IconChangliB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Radiance of Fealty`,
      content: `Deal <b class="text-wuwa-fusion">Fusion DMG</b> to nearby targets, obtaining <span class="text-desc">4</span> stacks of <b class="text-rose-400">Enflamement</b>, and entering <b class="text-wuwa-fusion">Fiery Feather</b>.
      <br />Can be cast in mid-air.
      <br />
      <br /><b class="text-wuwa-fusion">Fiery Feather</b>
      <br />When Changli releases Heavy Attack <b>Flaming Sacrifice</b> within <span class="text-desc">10</span>s, her ATK is increased by <span class="text-desc">25%</span>, after which <b class="text-desc">Fiery Feather</b> ends.
      `,
      image: 'SP_IconChangliC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Flaming Sacrifice`,
      content: `<b>Heavy Attack: Flaming Sacrifice</b>
      <br />When releasing Heavy Attack, if Changli carries <span class="text-desc">4</span> stacks of <b class="text-rose-400">Enflamement</b>, she consumes all stacks of <b class="text-rose-400">Enflamement</b> to cast <b>Flaming Sacrifice</b>, dealing <b class="text-wuwa-fusion">Fusion DMG</b>, considered as Resonance Skill DMG.
      <br />While casting <b>Flaming Sacrifice</b>, Changli takes <span class="text-desc">40%</span> less DMG.
      <br />
      <br /><b class="text-rose-400">Enflamement</b>
      <br />Changli can hold up to <span class="text-desc">4</span> stacks of <b class="text-rose-400">Enflamement</b>.
      <br />Changli obtains <span class="text-desc">1</span> stack of <b class="text-rose-400">Enflamement</b> for every <b>Basic Attack: True Sight - Conquest</b> on hit.
      <br />Changli obtains <span class="text-desc">1</span> stack of <b class="text-rose-400">Enflamement</b> for every <b>Basic Attack: True Sight - Charge</b> on hit.
      <br />Changli obtains <span class="text-desc">4</span> stacks of <b class="text-rose-400">Enflamement</b> for every Resonance Liberation <b>Radiance of Fealty</b>.
      `,
      image: 'SP_IconChangliY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Obedience of Rules`,
      content: `Changli appears in mid-air, attacks the target, and enters <b class="text-red">True Sight</b>, lasting for <span class="text-desc">12</span>s.
      `,
      image: 'SP_IconChangliQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Strategy of Duality`,
      content: `The incoming Resonator has their <b class="text-wuwa-fusion">Fusion DMG Amplified</b> by <span class="text-desc">20%</span> and Resonance Liberation DMG Amplified by <span class="text-desc">25%</span> for <span class="text-desc">10</span>s or until the Resonator is switched out.
      `,
      image: 'SP_IconChangliT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Secret Strategist`,
      content: `When Changli releases <b>Basic Attack: True Sight - Conquest</b> or <b>Basic Attack: True Sight - Charge</b>, for each stack of <b class="text-rose-400">Enflamement</b>, Changli's <b class="text-wuwa-fusion">Fusion DMG Bonus</b> is increased by <span class="text-desc">5%</span>.`,
      image: 'SP_IconChangliD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Sweeping Force`,
      content: `When Changli releases Heavy Attack <b>Flaming Sacrifice</b> or Resonance Liberation <b>Radiance of Fealty</b>, Changli's <b class="text-wuwa-fusion">Fusion DMG Bonus</b> is increased by <span class="text-desc">20%</span>, and Changli ignores <span class="text-desc">15%</span> of the target's DEF when dealing damage.`,
      image: 'SP_IconChangliD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Hidden Thoughts`,
      content: `Resonance Skill <b>Tripartite Flames</b> and Heavy Attack <b>Flaming Sacrifice</b> increase Changli's DMG dealt by <span class="text-desc">10%</span> and resistance to interruption.`,
      image: 'T_IconDevice_ChangliM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Pursuit of Desires`,
      content: `<b class="text-rose-400">Enflamement</b> increases Changli's Crit. Rate by <span class="text-desc">25%</span> for <span class="text-desc">8</span>s.`,
      image: 'T_IconDevice_ChangliM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Learned Secrets`,
      content: `Resonance Liberation <b>Radiance of Fealty</b> DMG is increased by <span class="text-desc">80%</span>.`,
      image: 'T_IconDevice_ChangliM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Polished Words`,
      content: `After Intro Skill is cast, all team members' ATK is increased by <span class="text-desc">20%</span> for <span class="text-desc">30</span>s.`,
      image: 'T_IconDevice_ChangliM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Sacrificed Gains`,
      content: `Heavy Attack <b>Flaming Sacrifice</b>'s Multiplier is increased by <span class="text-desc">50%</span> and its DMG dealt is increased by <span class="text-desc">50%</span>.`,
      image: 'T_IconDevice_ChangliM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Realized Plans`,
      content: `Resonance Skill <b>Tripartite Flames</b>, Heavy Attack <b>Flaming Sacrifice</b>, and Resonance Liberation <b>Radiance of Fealty</b> ignore an additional <span class="text-desc">40%</span> of the target's DEF when dealing damage.`,
      image: 'T_IconDevice_ChangliM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'fiery_feather',
      text: `Fiery Feather`,
      ...talents.lib,
      show: true,
      default: true,
    },
    {
      type: 'number',
      id: 'changli_i1',
      text: `I1 Enflamement DMG Bonus`,
      ...talents.i1,
      show: i.i1,
      default: 0,
      min: 0,
      max: 4,
    },
    {
      type: 'toggle',
      id: 'changli_c2',
      text: `S2 Crit Rate Bonus`,
      ...talents.c2,
      show: c >= 2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'changli_c4',
      text: `S4 Team ATK Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'changli_c4')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'changli_outro',
        text: `Outro: Strategy of Duality`,
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
          value: [{ scaling: calcScaling(0.1484, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.1785, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.1834, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [
            { scaling: calcScaling(0.255, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1488, normal), multiplier: Stats.ATK, hits: 4 },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [
            { scaling: calcScaling(0.1458, normal), multiplier: Stats.ATK, hits: 3 },
            { scaling: calcScaling(0.1875, normal), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.HA,
        },
        {
          name: 'Mid-Air Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.62, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack 1 DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.3086, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Mid-Air Attack 2 DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.2559, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Mid-Air Attack 3 DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.2213, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Mid-Air Attack 4 DMG',
          scale: Stats.ATK,
          value: [
            { scaling: calcScaling(0.1913, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1116, normal), multiplier: Stats.ATK, hits: 4 },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.4157, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'True Sight: Capture DMG',
          value: [
            { scaling: calcScaling(0.4119, skill), multiplier: Stats.ATK, hits: 3 },
            { scaling: calcScaling(0.8237, skill), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.SKILL,
        },
        {
          name: 'True Sight: Conquest DMG',
          value: [
            { scaling: calcScaling(0.2965, skill), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.4151, skill), multiplier: Stats.ATK },
            { scaling: calcScaling(0.4744, skill), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.SKILL,
        },
        {
          name: 'True Sight: Charge DMG',
          value: [
            { scaling: calcScaling(0.3656, skill), multiplier: Stats.ATK },
            { scaling: calcScaling(0.5484, skill), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Radiance of Fealty DMG',
          value: [{ scaling: calcScaling(6.1, lib), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.LIB,
          bonus: i.i2 ? 0.2 : 0,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Flaming Sacrifice DMG',
          value: [
            { scaling: calcScaling(0.1974, forte), multiplier: Stats.ATK, hits: 5 },
            { scaling: calcScaling(2.303, forte), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.SKILL,
          multiplier: c >= 5 ? 1.5 : 1,
          bonus: (i.i2 ? 0.2 : 0) + (c >= 5 ? 0.5 : 0),
          defPen: i.i2 ? 0.15 : 0,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Obedience of Rules DMG`,
          value: [
            { scaling: calcScaling(0.2238, intro), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1306, intro), multiplier: Stats.ATK, hits: 4 },
          ],
          element: Element.FUSION,
          property: TalentProperty.INTRO,
        },
      ]

      if (form.fiery_feather) {
        base[Stats.P_ATK].push({
          name: `Fiery Feather`,
          source: 'Self',
          value: 0.25,
        })
      }
      if (form.changli_i1) {
        base[Stats.FUSION_DMG].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.05 * form.changli_i1,
        })
      }
      if (i.i2) {
        base.LIB_DEF_PEN.push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (c >= 1) {
        base[Stats.SKILL_DMG].push({
          name: `Sequence Node 1`,
          source: 'Self',
          value: 0.1,
        })
      }
      if (form.changli_c2) {
        base[Stats.CRIT_RATE].push({
          name: `Sequence Node 2`,
          source: 'Self',
          value: 0.25,
        })
      }
      if (c >= 3) {
        base[Stats.LIB_DMG].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.8,
        })
      }
      if (form.changli_c4) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (c >= 6) {
        base.SKILL_DEF_PEN.push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.4,
        })
        base.LIB_DEF_PEN.push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.4,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.changli_outro) {
        base.FUSION_AMP.push({
          name: `Outro Skill`,
          source: 'Changli',
          value: 0.2,
        })
        base.LIB_AMP.push({
          name: `Outro Skill`,
          source: 'Changli',
          value: 0.25,
        })
      }
      if (form.changli_c4) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 4`,
          source: 'Changli',
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

export default Changli
