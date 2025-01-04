import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Roccia = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Pero, Easy`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 4 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Consume STA to attack, dealing <b class="text-wuwa-havoc">Havoc DMG</b>. Hitting a target with at least <span class="text-desc">100</span> <b class="text-rose-400">Imagination</b> sends Roccia into mid-air and activates the <b>Beyond Imagination</b> state. The longer you hold the Basic Attack button, the more <b class="text-rose-400">Imagination</b> Roccia gains. Heavy Attack will be automatically cast when you release the Basic Attack button while charging or when <b class="text-rose-400">Imagination</b> reaches the max limit.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Consume STA to perform a Plunging Attack, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack right after a successful Dodge to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.`,
      image: 'SP_IconNorFist',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Acrobatic Trick`,
      content: `Roccia projects her creativity into reality, pulling in nearby targets and dealing <b class="text-wuwa-havoc">Havoc DMG</b>. She then launches into mid-air and activates the <b>Beyond Imagination</b> state.`,
      image: 'SP_IconLuokekeB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Ta-da, Commedia Improvviso`,
      content: `Roccia's improvised comedy begins! Deal <b class="text-wuwa-havoc">Havoc DMG</b>, considered Heavy Attack DMG. For every <span class="text-desc">0.1%</span> of Roccia's Crit. Rate over <span class="text-desc">50%</span>, this skill increases the ATK of all Resnonators in the team by <span class="text-desc">1</span> point for <span class="text-desc">30</span>s, up to <span class="text-desc">200</span> points.`,
      image: 'SP_IconLuokekeC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `A Prop Master Prepares`,
      content: `<b>Beyond Imagination</b>
      <br />- When Roccia is in <b>Beyond Imagination</b> with at least <span class="text-desc">100</span> <b class="text-rose-400">Imagination</b>, press the Basic Attack button to consume <span class="text-desc">100</span> <b class="text-rose-400">Imagination</b> to cast Basic Attack <b>Real Fantasy</b>.
      <br />- Roccia exits this state when she is not airborne or when switched off the field.
      <br />
      <br /><b>Basic Attack - Real Fantasy</b>
      <br />- Perform up to 3 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>, considered Heavy Attack DMG. When Roccia lands after Stage 1 and Stage 2 attacks with over <span class="text-desc">100</span> <b class="text-rose-400">Imagination</b>, she will launch into mid-air and activate <b>Beyond Imagination</b>.
      <br />
      <br /><b class="text-rose-400">Imagination</b>
      <br />Roccia can hold up to <span class="text-desc">300</span> <b class="text-rose-400">Imagination</b>.
      <br />- Dealing DMG with Normal Attacks restores <b class="text-rose-400">Imagination</b>.
      <br />- Hold Normal Attack to charge the next attack while restoring <b class="text-rose-400">Imagination</b>.
      <br />- Casting Resonance Skill <b>Acrobatic Trick</b> restores <span class="text-desc">100</span> <b class="text-rose-400">Imagination</b>.
      <br />- Casting Intro Skill <b>Pero, Help</b> restores <span class="text-desc">100</span> <b class="text-rose-400">Imagination</b>.
      `,
      image: 'SP_IconLuokekeY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Pero, Help`,
      content: `Attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>. Use Basic Attack right after casting this skill to cast Basic Attack Stage 4.`,
      image: 'SP_IconLuokekeQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Applause, Please!`,
      content: `The incoming Resonator has their <b class="text-wuwa-havoc">Havoc DMG Amplified</b> by <span class="text-desc">20%</span> and Basic Attack DMG Amplified by <span class="text-desc">25%</span> for <span class="text-desc">14</span>s or until the Resonator is switched out.`,
      image: 'SP_IconLuokekeT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Immersive Performance`,
      content: `Casting Resonance Skill or Heavy Attack increases Roccia's ATK by <span class="text-desc">20%</span> for <span class="text-desc">12</span>s.`,
      image: 'SP_IconLuokekeD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Super Attractive Magic Box`,
      content: `After casting Outro Skill, the Utility of the incoming Resonator is replaced with <b>Magic Box</b>.
      <br />
      <br /><b>Magic Box</b>
      <br />- Upon use, pull nearby targets toward the <b>Magic Box</b>, dealing <b class="text-wuwa-havoc">Havoc DMG</b> equal to <span class="text-desc">20%*5</span> of the active Resonator's ATK, considered Utility DMG.
      <br />- The <b>Magic Box</b> lasts for <span class="text-desc">14</span>s or until the Resonator is switched out.`,
      image: 'SP_IconLuokekeD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `When Shadows Engulf the Hull`,
      content: `Casting Resonance Skill <b>Acrobatic Trick</b> grants an additional <span class="text-desc">100</span> <b class="text-rose-400">Imagination</b> and <span class="text-desc">10</span> Concerto Energy.
      <br />Immune to interruptions when casting Basic Attack <b>Real Fantasy</b>.`,
      image: 'T_IconDevice_LuokekeM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `When the Luceanite Gleams`,
      content: `Casting Basic Attack <b>Real Fantasy</b> grants all Resonators in the team <span class="text-desc">10%</span> <b class="text-wuwa-havoc">Havoc DMG Bonus</b> for <span class="text-desc">30</span>s, stacking up to <span class="text-desc">3</span> times. Upon reaching the max stacks, it grants all Resonators in the team <span class="text-desc">10%</span> additional <b class="text-wuwa-havoc">Havoc DMG Bonus</b> for <span class="text-desc">30</span>s`,
      image: 'T_IconDevice_LuokekeM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `When the Heart Sees and Hands Feel`,
      content: `Casting Intro Skill <b>Pero, Help</b> increases Roccia's Crit. Rate by <span class="text-desc">10%</span> and Crit. DMG by <span class="text-desc">30%</span> for <span class="text-desc">15</span>s.`,
      image: 'T_IconDevice_LuokekeM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `When Wonders Gather in the Box`,
      content: `Casting Resonance Skill <b>Acrobatic Trick</b> increases Basic Attack <b>Real Fantasy</b>'s DMG Multiplier by <span class="text-desc">60%</span> for <span class="text-desc">12</span>s.`,
      image: 'T_IconDevice_LuokekeM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `When Dreams Are Reborn on Stage`,
      content: `Increase Resonance Liberation <b>Ta-da, Commedia Improvviso</b>'s DMG Multiplier by <span class="text-desc">20%</span> and Heavy Attack's DMG Multiplier by <span class="text-desc">80%</span>`,
      image: 'T_IconDevice_LuokekeM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `When the Golden Wings Fly`,
      content: `Casting Resonance Liberation <b>Ta-da, Commedia Improvviso</b> grants the following effects for <span class="text-desc">12</span>s:
      <br />- Basic Attack <b>Real Fantasy</b> ignores enemies' DEF by <span class="text-desc">60%</span>.
      <br />- When Roccia lands after performing Basic Attack <b>Real Fantasy</b> Stage 3, she is launched into mid-air, activating the <b>Beyond Imagination</b>. In this state, Basic Attack becomes Basic Attack <b>Reality Recreation</b>, dealing DMG equal to <span class="text-desc">100%</span> of Basic Attack <b>Real Fantasy</b> Stage 3 DMG, considered Heavy Attack DMG. Roccia is immune to interruptions while casting Basic Attack <b>Reality Recreation</b>.
      <br />- When Roccia lands after performing Basic Attack <b>Reality Recreation</b>, she is launched into mid-air, activating <b>Beyond Imagination</b>. Basic Attack <b>Reality Recreation</b> is only available in the <b>Beyond Imagination</b> state.`,
      image: 'T_IconDevice_LuokekeM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'roccia_forte',
      text: `Liberation ATK Bonus`,
      ...talents.lib,
      show: true,
      default: true,
    },
    {
      type: 'toggle',
      id: 'roccia_i1',
      text: `I1 ATK Bonus`,
      ...talents.i1,
      show: i.i1,
      default: true,
    },
    {
      type: 'number',
      id: 'roccia_c2',
      text: `S2 Havoc DMG Bonus`,
      ...talents.c2,
      show: c >= 2,
      default: 3,
      min: 0,
      max: 3,
    },
    {
      type: 'toggle',
      id: 'roccia_c3',
      text: `S3 Crit. Bonus`,
      ...talents.c3,
      show: c >= 3,
      default: true,
    },
    {
      type: 'toggle',
      id: 'roccia_c4',
      text: `S4 Real Fantasy Multiplier`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'toggle',
      id: 'roccia_c6',
      text: `S6 Real Fantasy DEF PEN`,
      ...talents.c6,
      show: c >= 6,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'roccia_forte'), findContentById(content, 'roccia_c2')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'roccia_outro',
        text: `Outro: Applause, Please!`,
        ...talents.outro,
        show: true,
        default: false,
      },
    ],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.BASIC_SCALING = [
        {
          name: 'Basic Attack 1 DMG',
          value: [{ scaling: calcScaling(0.3681, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Basic Attack 2 DMG',
          value: [{ scaling: calcScaling(0.1919, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Basic Attack 3 DMG',
          value: [
            { scaling: calcScaling(0.17, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.51, normal), multiplier: Stats.ATK },
          ],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Basic Attack 4 DMG',
          value: [{ scaling: calcScaling(0.5141, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.85, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
          multiplier: c >= 5 ? 1.8 : 1,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.527, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.3466, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Acrobatic Trick DMG',
          value: [{ scaling: calcScaling(0.3092, skill), multiplier: Stats.ATK, hits: 8 }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Ta-da, Commedia Improvviso DMG',
          value: [{ scaling: calcScaling(1.4, lib), multiplier: Stats.ATK, hits: 3 }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
          multiplier: c >= 5 ? 1.2 : 1,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Real Fantasy 1 DMG',
          value: [{ scaling: calcScaling(1.62, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
          multiplier: form.roccia_c4 ? 1.6 : 1,
          defPen: form.roccia_c6 ? 0.6 : 0,
        },
        {
          name: 'Real Fantasy 2 DMG',
          value: [{ scaling: calcScaling(1.71, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
          multiplier: form.roccia_c4 ? 1.6 : 1,
          defPen: form.roccia_c6 ? 0.6 : 0,
        },
        {
          name: 'Real Fantasy 3 DMG',
          value: [{ scaling: calcScaling(1.8, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
          multiplier: form.roccia_c4 ? 1.6 : 1,
          defPen: form.roccia_c6 ? 0.6 : 0,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Pero, Help DMG`,
          value: [{ scaling: calcScaling(0.85, intro), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.INTRO,
        },
      ]

      if (form.roccia_i1) {
        base[Stats.P_ATK].push({
          value: 0.2,
          name: `Inherent Skill 1`,
          source: 'Self',
        })
      }
      if (form.roccia_c2) {
        base[Stats.HAVOC_DMG].push({
          value: 0.1 * form.roccia_c2 + (form.roccia_c2 === 3 ? 0.1 : 0),
          name: `Sequence Node 2`,
          source: 'Self',
        })
      }
      if (form.roccia_c3) {
        base[Stats.CRIT_RATE].push({
          value: 0.1,
          name: `Sequence Node 3`,
          source: 'Self',
        })
        base[Stats.CRIT_DMG].push({
          value: 0.3,
          name: `Sequence Node 3`,
          source: 'Self',
        })
      }
      if (c >= 6) {
        base.FORTE_SCALING.push({
          name: 'Reality Recreation DMG',
          value: [{ scaling: calcScaling(1.8, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
          multiplier: form.roccia_c4 ? 1.6 : 1,
          defPen: form.roccia_c6 ? 0.6 : 0,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.roccia_outro) {
        base.HAVOC_AMP.push({
          value: 0.2,
          name: `Outro Skill`,
          source: 'Roccia',
        })
        base.BASIC_AMP.push({
          value: 0.25,
          name: `Outro Skill`,
          source: 'Roccia',
        })
      }
      if (form.roccia_c2) {
        base[Stats.HAVOC_DMG].push({
          value: 0.1 * form.roccia_c2 + (form.roccia_c2 === 3 ? 0.1 : 0),
          name: `Sequence Node 2`,
          source: 'Self',
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
      const index = _.findIndex(team, (item) => item.cId === '1606')
      if (form.roccia_forte) {
        base.CALLBACK.push(function (x, a) {
          const cr = _.round(_.min([_.max([x.getValue(Stats.CRIT_RATE) * 100 - 50, 0]), 20]), 2) / 1e2
          _.forEach(a, (member, i) => {
            member[Stats.ATK].push({
              name: `Real Fantasy`,
              source: index === i ? 'Self' : 'Roccia',
              value: 1000 * cr,
              base: 1000,
              multiplier: cr,
            })
          })
          return x
        })
      }
      _.forEach(allBase, (member, i) => {
        if (i !== index)
          member.SKILL_SCALING.push({
            name: 'Magic Box DMG',
            value: [{ scaling: 0.2, multiplier: Stats.ATK, hits: 5 }],
            element: Element.HAVOC,
            property: TalentProperty.UTIL,
          })
      })
      return base
    },
  }
}

export default Roccia
