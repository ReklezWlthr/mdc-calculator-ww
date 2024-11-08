import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Aalto = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Half Truths`,
      content: `<b>Basic Attack</b>
      <br />Aalto fires up to 5 consecutive shots, dealing <b class="text-wuwa-aero">Aero DMG</b>. Basic Attack 4 will spread the <b class="text-wuwa-aero">Mist</b> forward, which lasts for <span class="text-desc">1.5</span>s.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Aalto enters the aiming state for a more powerful shot.
      <br />The aimed shot fired after charging finishes deals <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Aalto consumes STA to perform consecutive shots at the target in mid-air, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>.`,
      image: 'SP_IconNorGun',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Shift Trick`,
      content: `<b>Mist Avatar</b>
      <br />Casts <b class="text-wuwa-aero">Mist</b> and <span class="text-desc">1</span> <b>Mist Avatar(s)</b> to taunt the surrounding targets. The avatars inherit a portion of Aalto's HP and generate <span class="text-desc">6</span> <b>Mist Bullets</b> around them, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Mist Bullets</b>
      <br />Deals <b class="text-wuwa-aero">Aero DMG</b>, considered as Resonance Skill DMG.`,
      image: 'SP_IconQiuShuiB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Flower in the Mist`,
      content: `Generate a <b class="text-teal-200">Gate of Quandary</b> in front, dealing <b class="text-wuwa-aero">Aero DMG</b>. When bullets pass through the <b class="text-teal-200">Gate of Quandary</b>, they deal increased DMG. <b class="text-teal-200">Gate of Quandary</b> lasts for <span class="text-desc">10</span>s.`,
      image: 'SP_IconQiuShuiC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Misty Cover`,
      content: `When Aalto passes through <b class="text-wuwa-aero">Mist</b> or <b class="text-teal-200">Gate of Quandary</b>, he enters the <b>Mistcloak Dash</b>.
      <br />
      <br /><b>Mistcloak Dash</b>
      <br />-Movement speed increased;
      <br />-During this period, <b class="text-desc">Mist Drops</b> are continuously consumed, and for each <span class="text-desc">1</span> <b class="text-desc">Mist Drop</b> consumed, <span class="text-desc">1</span> <b>Mist Bullet(s)</b> is generated.
      <br />
      <br /><b class="text-desc">Mist Drops</b>
      <br />Aalto can hold up to <span class="text-desc">6</span> <b class="text-desc">Mist Drops</b>.
      <br />When Basic Attack or Mid-air Attack passes through <b class="text-wuwa-aero">Mist</b> and hits the target, <span class="text-desc">1</span> <b class="text-desc">Mist Drop</b> is recovered.`,
      image: 'SP_IconQiuShuiY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Feint Shot`,
      content: `Aalto shows up out of thin air to perform rapid continuous shooting, dealing <b class="text-wuwa-aero">Aero DMG</b>.`,
      image: 'SP_IconQiuShuiQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Dissolving Mist`,
      content: `The incoming Resonator has their <b class="text-wuwa-aero">Aero DMG Amplified</b> by <span class="text-desc">23%</span> for <span class="text-desc">14</span>s or until they are switched out.`,
      image: 'SP_IconQiuShuiT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Perfect Performance`,
      content: `Aalto's Heavy Attack will always critically hit, triggered once every <span class="text-desc">30</span>s.`,
      image: 'SP_IconQiuShuiD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Mid-game Break`,
      content: `Aalto will continuously recover STA when he is in the Forte Circuit <b>Miscloak Dash</b> state.`,
      image: 'SP_IconQiuShuiD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Trickster's Opening Show`,
      content: `The cooldown of Resonance Skill <b>Shift Trick</b> is reduced by <span class="text-desc">4</span>s.`,
      image: 'T_IconDevice_QiuShuiM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Mistweave's Debut`,
      content: `<b>Mist Avatar</b> inherits <span class="text-desc">100%</span> more HP from Aalto. When Aalto attacks targets taunted by the <b>Mist Avatar(s)</b>, his ATK is increased by <span class="text-desc">15%</span>.`,
      image: 'T_IconDevice_QiuShuiM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Hazey Transition`,
      content: `When Aalto's Basic Attack or Mid-air Attack passes through the <b class="text-wuwa-aero">Mist</b>, <span class="text-desc">2</span> more bullets will be generated, dealing <span class="text-desc">50%</span> of the DMG of Basic Attack or Mid-air Attack.`,
      image: 'T_IconDevice_QiuShuiM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Blake Bloom for Finale`,
      content: `The damage of Resonance Skill <b>Mist Bullets</b> is increased by <span class="text-desc">30%</span>; Aalto receives <span class="text-desc">30%</span> less DMG in his Forte Circuit <b>Mistcloak Dash</b> state.`,
      image: 'T_IconDevice_QiuShuiM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Applause of the Lost`,
      content: `In the Forte Circuit <b>Mistcloak Dash</b> state, Aalto's <b class="text-wuwa-aero">Aero DMG Bonus</b> is increased by <span class="text-desc">25%</span> for <span class="text-desc">6</span>s.`,
      image: 'T_IconDevice_QiuShuiM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Broker's Secrets`,
      content: `Resonance Liberation <b>Flower in the Mist</b> now additionally increases Crit. Rate by <span class="text-desc">8%</span>. When Aalto's Heavy Attack passes through the <b class="text-teal-200">Gate of Quandary</b>, the damage dealt is additionally increased by <span class="text-desc">50%</span>.`,
      image: 'T_IconDevice_QiuShuiM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'aalto_gate',
      text: `Gate of Quandary`,
      ...talents.lib,
      show: true,
      default: true,
    },
    {
      type: 'toggle',
      id: 'aalto_i1',
      text: `I1 Heavy ATK Guaranteed Crit`,
      ...talents.i1,
      show: i.i1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'aalto_c2',
      text: `S2 ATK Bonus`,
      ...talents.c2,
      show: c >= 2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'aalto_c5',
      text: `S5 Aero DMG Bonus`,
      ...talents.c5,
      show: c >= 5,
      default: true,
    },
    {
      type: 'toggle',
      id: 'aalto_c6',
      text: `S6 Enhanced Heavy ATK`,
      ...talents.c6,
      show: c >= 6,
      default: true,
    },
  ]

  const teammateContent: IContent[] = []

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'aalto_outro',
        text: `Outro: Dissolving Mist`,
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
          value: [{ scaling: calcScaling(0.16, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.2667, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.24, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(0.2534, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 5 DMG',
          value: [{ scaling: calcScaling(0.904, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Aimed Shot DMG',
          value: [{ scaling: calcScaling(0.18, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.HA,
          cr: form.aalto_i1 ? 1 : 0,
          bonus: form.aalto_c6 ? 0.5 : 0,
        },
        {
          name: 'Fully Charged Aimed Shot DMG',
          value: [{ scaling: calcScaling(0.405, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.HA,
          cr: form.aalto_i1 ? 1 : 0,
          bonus: form.aalto_c6 ? 0.5 : 0,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          value: [{ scaling: calcScaling(0.3, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          value: [{ scaling: calcScaling(1.077, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Mist Bullet DMG',
          value: [{ scaling: calcScaling(0.3, skill), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.SKILL,
          bonus: c >= 4 ? 0.3 : 0,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Flower in the Mist DMG',
          value: [{ scaling: calcScaling(2, lib), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.LIB,
          cr: c >= 6 ? 0.08 : 0,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Mist Bullet DMG',
          value: [{ scaling: calcScaling(0.3, forte), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.SKILL,
          bonus: c >= 4 ? 0.3 : 0,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Feint Shot DMG`,
          value: [{ scaling: calcScaling(0.3334, intro), multiplier: Stats.ATK, hits: 3 }],
          element: Element.AERO,
          property: TalentProperty.INTRO,
        },
      ]

      if (form.aalto_gate) {
        base[Stats.P_ATK].push({
          name: `Gate of Quandary`,
          source: 'Self',
          value: 0.1,
        })
      }
      if (form.aalto_c2) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 2`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (form.aalto_c5) {
        base[Stats.AERO_DMG].push({
          name: `Sequence Node 5`,
          source: 'Self',
          value: 0.25,
        })
      }
      if (c >= 3) {
        base.BASIC_SCALING.push(
          {
            name: 'Hazey Transition Stage 1 DMG',
            value: [{ scaling: calcScaling(0.16, normal), multiplier: Stats.ATK }],
            element: Element.AERO,
            property: TalentProperty.BA,
            multiplier: 0.5,
          },
          {
            name: 'Hazey Transition Stage 2 DMG',
            value: [{ scaling: calcScaling(0.2667, normal), multiplier: Stats.ATK }],
            element: Element.AERO,
            property: TalentProperty.BA,
            multiplier: 0.5,
          },
          {
            name: 'Hazey Transition Stage 3 DMG',
            value: [{ scaling: calcScaling(0.24, normal), multiplier: Stats.ATK, hits: 2 }],
            element: Element.AERO,
            property: TalentProperty.BA,
            multiplier: 0.5,
          },
          {
            name: 'Hazey Transition Stage 4 DMG',
            value: [{ scaling: calcScaling(0.2534, normal), multiplier: Stats.ATK, hits: 2 }],
            element: Element.AERO,
            property: TalentProperty.BA,
            multiplier: 0.5,
          },
          {
            name: 'Hazey Transition Stage 5 DMG',
            value: [{ scaling: calcScaling(0.904, normal), multiplier: Stats.ATK }],
            element: Element.AERO,
            property: TalentProperty.BA,
            multiplier: 0.5,
          }
        )
        base.MID_AIR_SCALING.push({
          name: 'Hazey Transition Mid-Air Attack DMG',
          value: [{ scaling: calcScaling(0.3, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
          multiplier: 0.5,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.aalto_outro) {
        base.AERO_AMP.push({
          name: `Outro Skill`,
          source: 'Aalto',
          value: 0.23,
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

export default Aalto
