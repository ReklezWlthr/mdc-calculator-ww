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
      title: `Take It Easy, Pero`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 4 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Perform a charged attack at the cost of STA, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />If Roccia has <span class="text-desc">100</span> or more <b class="text-rose-400">Imagination</b>, she will be sent into the air and enter the <b>Flying Fantasy</b> state.
      <br />Hold Normal Attack Button to continuously charge the attack. The longer the attack is charged, the more <b class="text-rose-400">Imagination</b> will be gained. When the Normal Attack Button is released, or upon reaching the maximum charge time, Heavy Attack will automatically be performed.
      <br />
      <br /><b>Plunging Attack</b>
      <br />Perform a Plunging Attack from mid-air at the cost of STA, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.`,
      image: 'SP_IconNorFist',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Complicated Design`,
      content: `Roccia projects the thought storm, pulling in nearby targets, dealing <b class="text-wuwa-havoc">Havoc DMG</b>, and sending her into the air, entering the <b>Flying Fantasy</b> state.`,
      image: 'SP_IconLuokekeB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Impromptu Comedy, Begin!`,
      content: `Roccia begins her impromptu comedy, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.`,
      image: 'SP_IconLuokekeC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Self-Cultivation of a Prop Master`,
      content: `<b>Flying Fantasy</b>
      <br />While in <b>Flying Fantasy</b> state, if Roccia has <span class="text-desc">100</span> or more <b class="text-rose-400">Imagination</b>, use Basic Attack to consume <span class="text-desc">100</span> <b class="text-rose-400">Imagination</b> and perform Basic Attack <b>Dream Comes True</b>.
      <br />The <b>Flying Fantasy</b> state ends when Roccia lands.
      <br />
      <br /><b>Basic Attack: Dream Comes True</b>
      <br />Perform up to 3 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>, considered as Resonance Skill DMG. After Basic Attack <b>Dream Comes True</b> Stage 1 and 2 land, Roccia will be sent into the air and enter the <b>Flying Fantasy</b> state.
      <br />When using the Stage 3 of Basic Attack <b>Dream Comes True</b>, if Roccia's Crit. Rate is higher than <span class="text-desc">50%</span>, for every <span class="text-desc">0.1%</span> Crit. Rate, all party members gain <span class="text-desc">1</span> ATK for <span class="text-desc">30</span>s, up to <span class="text-desc">200</span> ATK.
      <br />
      <br /><b class="text-rose-400">Imagination</b>
      <br />Roccia can hold up to <span class="text-desc">300</span> <b class="text-rose-400">Imagination</b> and can restore <b class="text-rose-400">Imagination</b> in the following ways:.
      <br />- When Normal Attack <b>Take It Easy, Pero</b> hits the target.
      <br />- When Resonance Skill <b>Complicated Design</b>, or Intro Skill <b>Pero, Come Help</b> hits the target.
      `,
      image: 'SP_IconLuokekeY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Pero, Come Help`,
      content: `Attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>. Shortly after casting Intro Skill, use Basic Attack to perform the 4th stage of Basic Attack.`,
      image: 'SP_IconLuokekeQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Applause`,
      content: `The incoming Resonator has their <b class="text-wuwa-havoc">Havoc DMG Amplified</b> by <span class="text-desc">20%</span> and Basic Attack DMG Amplified by <span class="text-desc">25%</span> for <span class="text-desc">14</span>s or until they are switched out.`,
      image: 'SP_IconLuokekeT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Immersive Performance`,
      content: `After Resonance Skill or Heavy Attack is cast, Roccia's ATK is increased by <span class="text-desc">20%</span> for <span class="text-desc">12</span>s.`,
      image: 'SP_IconLuokekeD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Boundless Gravity Treasure Box`,
      content: `After the Outro Skill is cast, the Gadget of the incoming Resonator will be replaced by the <b>Mystery Box</b>.
      <br />
      <br /><b>Mystery Box</b>
      <br />- When used, <b>Mystery Box</b> will pull surrounding targets towards itself.
      <br />- <b>Mystery Box</b> lasts for <span class="text-desc">14</span>s. If the Resonator is switched out, the <b>Mystery Box</b> will disappear.`,
      image: 'SP_IconLuokekeD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `N/A`,
      content: `When casting Resonance Skill <b>Complicated Design</b>, an additional <span class="text-desc">100</span> <b class="text-rose-400">Imagination</b> and <span class="text-desc">10</span> Concerto Energy will be restored.`,
      image: 'T_IconDevice_LuokekeM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `N/A`,
      content: `After Normal Attack <b>Dream Comes True</b>, <b class="text-wuwa-havoc">Havoc DMG Bonus</b> of the all party members is increased by <span class="text-desc">10%</span>, stacking up to <span class="text-desc">3</span> times and lasting for <span class="text-desc">30</span> seconds. At maximum stacks, <b class="text-wuwa-havoc">Havoc DMG Bonus</b> of the all party members is increased by an additional <span class="text-desc">10%</span>, lasting for <span class="text-desc">30</span> seconds.`,
      image: 'T_IconDevice_LuokekeM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `N/A`,
      content: `After the Intro Skill <b>Pero, Come Help</b> is cast, Roccia's Crit. Rate is increased by <span class="text-desc">10%</span> and Crit. DMG is increased by <span class="text-desc">30%</span> for <span class="text-desc">15</span>s.`,
      image: 'T_IconDevice_LuokekeM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `N/A`,
      content: `After Resonance Skill <b>Complicated Design</b> is cast, the DMG Multiplier of Basic Attack <b>Dream Comes True</b> is increased by <span class="text-desc">60%</span>, lasting for <span class="text-desc">12</span>s.`,
      image: 'T_IconDevice_LuokekeM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `N/A`,
      content: `The DMG Multiplier of Resonance Liberation <b>Impromptu Comedy, Begin!</b> is increased by <span class="text-desc">20%</span>. The DMG Multiplier of Heavy Attack is increased by <span class="text-desc">80%</span>`,
      image: 'T_IconDevice_LuokekeM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `N/A`,
      content: `After Roccia casts Resonance Liberation <b>Impromptu Comedy, Begin!</b>, gain the following effects:
      <br />- For <span class="text-desc">12</span>s, dealing DMG with Basic Attack <b>Dream Comes True</b> ignores <span class="text-desc">60%</span> of the target's DEF.
      <br />- For <span class="text-desc">12</span>s, after Basic Attack <b>Dream Comes True</b> Stage 3 hits the target, Roccia can continuously cast <b>Constructed Reality</b>, dealing DMG equal to <span class="text-desc">100%</span> of Basic Attack <b>Dream Comes True</b> Stage 3, considered Resonance Skill DMG.`,
      image: 'T_IconDevice_LuokekeM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'roccia_forte',
      text: `Dream Comes True ATK Bonus`,
      ...talents.forte,
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
      text: `S4 Dream Comes True Multiplier`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'toggle',
      id: 'roccia_c6',
      text: `S6 Dream Comes True DEF PEN`,
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
        text: `Outro: Applause`,
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
          name: 'Complicated Design DMG',
          value: [{ scaling: calcScaling(0.3092, skill), multiplier: Stats.ATK, hits: 8 }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Impromptu Comedy, Begin! DMG',
          value: [{ scaling: calcScaling(1.4, lib), multiplier: Stats.ATK, hits: 3 }],
          element: Element.HAVOC,
          property: TalentProperty.LIB,
          multiplier: c >= 5 ? 1.2 : 1,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Basic Attack: Dream Comes True 1 DMG',
          value: [{ scaling: calcScaling(1.62, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
          multiplier: form.roccia_c4 ? 1.6 : 1,
          defPen: form.roccia_c6 ? 0.6 : 0,
        },
        {
          name: 'Basic Attack: Dream Comes True 2 DMG',
          value: [{ scaling: calcScaling(1.71, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
          multiplier: form.roccia_c4 ? 1.6 : 1,
          defPen: form.roccia_c6 ? 0.6 : 0,
        },
        {
          name: 'Basic Attack: Dream Comes True 3 DMG',
          value: [{ scaling: calcScaling(1.862, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
          multiplier: form.roccia_c4 ? 1.6 : 1,
          defPen: form.roccia_c6 ? 0.6 : 0,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Immersive Performance DMG`,
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
          name: 'Constructed Reality DMG',
          value: [{ scaling: calcScaling(1.862, forte), multiplier: Stats.ATK }],
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
          name: `Outro`,
          source: 'Roccia',
        })
        base.BASIC_AMP.push({
          value: 0.25,
          name: `Outro`,
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
      if (form.roccia_forte) {
        const index = _.findIndex(team, (item) => item.cId === '1606')
        base.CALLBACK.push(function (x, a) {
          const cr = _.round(_.min([_.max([x.getValue(Stats.CRIT_RATE) * 100 - 50, 0]), 20]), 2) / 1e2
          _.forEach(a, (member, i) => {
            member[Stats.ATK].push({
              name: `Dream Comes True`,
              source: index === i ? 'Self' : 'Roccia',
              value: 1000 * cr,
              base: 1000,
              multiplier: cr,
            })
          })
          return x
        })
      }
      return base
    },
  }
}

export default Roccia
