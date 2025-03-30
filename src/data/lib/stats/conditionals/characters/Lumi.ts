import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Lumi = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Navigation Support`,
      content: `<b>Yellow Light: Basic Attack</b>
      <br />Summon Squeakie to shoot three shots in a row, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Yellow Light: Sprint</b>
      <br />Press Dodge to perform <b>Sprint</b> and enter <b>Zoom Mode</b>. Lumi is unable to Dodge when performing <b>Sprint</b>.
      <br />
      <br /><b>Yellow Light: Zoom</b>
      <br />When in this state, automatically shoot <b>Glitters</b> at a locked-on target and deal <b class="text-wuwa-electro">Electro DMG</b>, considered Basic Attack DMG.
      <br />
      <br /><b>Yellow Light: Plunging Attack</b>
      <br />Consume STA to perform a Plunging Attack, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Red Light: Basic Attack</b>
      <br />Perform up to 3 consecutive attacks, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Red Light: Heavy Attack</b>
      <br />Consume STA to strike the ground with Squeakie, causing an impact dealing <b class="text-wuwa-electro">Electro DMG</b>. The DMG dealt is considered Basic Attack DMG.
      <br />
      <br /><b>Red Light: Plunging Attack</b>
      <br />Consume STA to perform a Plunging Attack, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Red Light: Dodge Counter</b>
      <br />Press Basic Attack right after a successful Dodge to attack the target, dealing <b class="text-wuwa-electro">Electro DMG</b>.`,
      image: 'SP_IconNorSword',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Searchlight Service`,
      content: `<b>Pounce</b>
      <br />When in <b class="text-desc">Yellow Light Mode</b>, use Resonance Skill to perform <b>Pounce</b>, which consumes STA to pounce on the target before switching to <b class="text-red">Red Light Mode</b>.
      <br />Lumi will perform a <b>Pounce</b> without STA cost when switched onto the field.
      <br />
      <br /><b>Rebound</b>
      <br />When in <b class="text-red">Red Light Mode</b>, use Resonance Skill to perform <b>Rebound</b>, which consumes STA to leap backward and attack the target before switching to <b class="text-desc">Yellow Light Mode</b>.
      <br />
      <br /><b class="text-desc">Yellow Light Mode</b>
      <br />Perform ranged attacks when in <b class="text-desc">Yellow Light Mode</b>. Dodge is unavailable in this mode.
      <br />
      <br /><b class="text-red">Red Light Mode</b>
      <br />Perform melee attacks when in <b class="text-red">Red Light Mode</b>. Dodge is available in this mode.`,
      image: 'SP_IconDengdengB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Squeakie Express`,
      content: `Throw giant Squeakie at the target, dealing <b class="text-wuwa-electro">Electro DMG</b>.`,
      image: 'SP_IconDengdengC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Signal Light`,
      content: `<b>Energized Pounce</b>
      <br />When <b class="text-desc">Yellow Light Spark</b> is fully recovered, replace Resonance Skill with Resonance Skill <b>Energized Pounce</b> that deals <b class="text-wuwa-electro">Electro DMG</b> and enter <b class="text-red">Red Spotlight Mode</b>. The DMG dealt is considered Basic Attack DMG.
      <br />When in <b class="text-red">Red Spotlight Mode</b>, the DMG Multiplier of <b>Red Light: Basic Attack</b> and <b>Red Light: Heavy Attack</b> is increased, with an extra amount of <b class="text-red">Sparks</b> recovered.
      <br /><b class="text-red">Red Spotlight Mode</b> ends after performing altogether <span class="text-desc">4</span> Basic Attacks and/or Heavy Attacks.
      <br />
      <br /><b>Energized Rebound</b>
      <br />When <b class="text-red">Red Light Spark</b> is fully recovered, replace Resonance Skill with Resonance Skill <b>Energized Rebound</b> that deals <b class="text-wuwa-electro">Electro DMG</b> and enter <b class="text-desc">Yellow Spotlight Mode</b>. The DMG dealt is considered Basic Attack DMG.
      <br />When in <b class="text-desc">Yellow Spotlight Mode</b>, <b>Glitter</b> is replaced by <b>Glare</b>, with an increased DMG Multiplier and an extra amount of <b class="text-desc">Sparks</b> recovered.
      <br /><b class="text-desc">Yellow Spotlight Mode</b> ends after shooting <span class="text-desc">6</span> <b>Glares</b>.
      <br />
      <br /><b>Laser</b>
      <br />Casting Outro Skill consumes all <b>Sparks</b> obtained in the current mode.
      <br />Laser can be cast when the amount of consumed <b>Sparks</b> is greater than or equal to <span class="text-desc">25</span>, dealing <b class="text-wuwa-electro">Electro DMG</b>. The DMG dealt is considered Basic Attack DMG.
      <br />Every <span class="text-desc">25</span> <b>Sparks</b> consumed generates <span class="text-desc">1</span> extra <b>Laser</b> beam, up to <span class="text-desc">4</span> <b>Laser</b> beams.
      <br />
      <br /><b class="text-desc">Yellow Light Spark</b>
      <br />Lumi can hold up to <span class="text-desc">100</span> <b class="text-desc">Yellow Light Sparks</b>.
      <br />Lumi obtains <b class="text-desc">Yellow Light Spark</b> under the following conditions:
      <br />When <b>Yellow Light: Basic Attack</b> hits the target;
      <br />When <b>Glitter</b> hits the target;
      <br />When <b>Glare</b> hits the target;
      <br />When Resonance Skill <b>Energized Rebound</b> hits the target;
      <br />When casting Intro Skill <b>Special Delivery</b>.
      <br />
      <br /><b class="text-red">Red Light Spark</b>
      <br />Lumi can hold up to <span class="text-desc">100</span> <b class="text-red">Red Light Sparks</b>.
      <br />Lumi obtains <b class="text-red">Red Light Spark</b> under the following conditions:
      <br />When Normal Attack <b>Navigation Support</b> hits the target in <b class="text-red">Red Light Mode</b> or <b class="text-red">Red Spotlight Mode</b>.`,
      image: 'SP_IconDengdengY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Special Delivery`,
      content: `Enter <b class="text-desc">Yellow Light Mode</b> and attack the target, dealing <b class="text-wuwa-electro">Electro DMG</b>.`,
      image: 'SP_IconDengdengQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Escorting`,
      content: `The incoming Resonator has their Resonance Skill DMG Amplified by <span class="text-desc">38%</span> for <span class="text-desc">10</span>s or until they are switched out.`,
      image: 'SP_IconDengdengT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Pathfinding`,
      content: `Gain <span class="text-desc">10%</span> <b class="text-wuwa-electro">Electro DMG Bonus</b> when in <b class="text-red">Red Light Mode</b>.`,
      image: 'SP_IconDengdengD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Focus`,
      content: `Casting <b>Energized Pounce</b> or <b>Energized Rebound</b> increases ATK by <span class="text-desc">10%</span> for <span class="text-desc">5</span>s.`,
      image: 'SP_IconDengdengD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Parcel To Be Delivered`,
      content: `Casting <b>Energized Pounce</b> or <b>Energized Rebound</b> additionally recovers <span class="text-desc">3</span> STA.`,
      image: 'T_IconDevice_DengdengM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Lollo Logistics, Ready to Help`,
      content: `<b>Energized Pounce</b> and <b>Energized Rebound</b> ignore <span class="text-desc">20%</span> of the target's DEF.`,
      image: 'T_IconDevice_DengdengM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Priority Parcel In Transit`,
      content: `The DMG of Resonance Liberation <b>Squeakie Express</b> is increased by <span class="text-desc">30%</span>.`,
      image: 'T_IconDevice_DengdengM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Captain Lumi, At Your Service`,
      content: `Gain <span class="text-desc">30%</span> Basic Attack DMG Bonus.`,
      image: 'T_IconDevice_DengdengM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Parcel Collected On Time`,
      content: `When <b>Spark</b> is fully recovered, <b>Laser</b> DMG Multiplier is increased by <span class="text-desc">100%</span>.`,
      image: 'T_IconDevice_DengdengM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Give Me A Five-star Rating`,
      content: `Casting Outro Skill increases all team members' ATK by <span class="text-desc">20%</span> for <span class="text-desc">20</span>s.`,
      image: 'T_IconDevice_DengdengM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'lumi_i1',
      text: `I1 Electro DMG Bonus`,
      ...talents.i1,
      show: i.i1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'lumi_i2',
      text: `I2 ATK Bonus`,
      ...talents.i2,
      show: i.i2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'lumi_c5',
      text: `S5 Laser DMG Bonus`,
      ...talents.c5,
      show: c >= 5,
      default: true,
    },
    {
      type: 'toggle',
      id: 'lumi_c6',
      text: `S6 Team ATK Bonus`,
      ...talents.c6,
      show: c >= 6,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'lumi_c6')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'lumi_outro',
        text: `Outro: Escorting`,
        ...talents.outro,
        show: true,
        default: false,
      },
    ],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.BASIC_SCALING = [
        {
          name: 'Yellow Light: Basic Attack DMG',
          value: [{ scaling: calcScaling(0.16, skill), multiplier: Stats.ATK, hits: 3 }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Red Light: Basic Attack 1 DMG',
          value: [{ scaling: calcScaling(0.456, normal), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Red Light: Basic Attack 2 DMG',
          value: [
            { scaling: calcScaling(0.5415, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1083, normal), multiplier: Stats.ATK, hits: 5 },
          ],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Red Light: Basic Attack 3 DMG',
          value: [
            { scaling: calcScaling(0.3249, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.7581, normal), multiplier: Stats.ATK },
          ],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Red Light: Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.3325, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Yellow Light: Plunging Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.48, normal), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Red Light: Plunging Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.57, normal), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Glitter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.32, lib), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Red Light: Dodge Counter DMG',
          scale: Stats.ATK,
          value: [
            { scaling: calcScaling(0.8415, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1683, normal), multiplier: Stats.ATK, hits: 5 },
          ],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Pounce DMG',
          value: [{ scaling: calcScaling(0.912, lib), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Rebound DMG',
          value: [{ scaling: calcScaling(0.874, skill), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Cogitation Model DMG',
          value: [{ scaling: calcScaling(4.8, lib), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Glare DMG',
          value: [{ scaling: calcScaling(0.41, forte), multiplier: Stats.ATK, hits: 2 }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Red Spotlight: Basic Attack 1 DMG',
          value: [{ scaling: calcScaling(0.6048, forte), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Red Spotlight: Basic Attack 2 DMG',
          value: [
            { scaling: calcScaling(0.6957, forte), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1392, forte), multiplier: Stats.ATK, hits: 5 },
          ],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Red Spotlight: Basic Attack 3 DMG',
          value: [
            { scaling: calcScaling(0.4715, forte), multiplier: Stats.ATK },
            { scaling: calcScaling(1.1, forte), multiplier: Stats.ATK },
          ],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Energized Pounce DMG',
          value: [{ scaling: calcScaling(0.922, forte), multiplier: Stats.ATK, hits: 2 }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
          defPen: c >= 2 ? 0.2 : 0,
        },
        {
          name: 'Energized Rebound DMG',
          value: [{ scaling: calcScaling(1.266, forte), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
          defPen: c >= 2 ? 0.2 : 0,
        },
        {
          name: 'Laser Beam DMG',
          value: [{ scaling: calcScaling(0.375, forte), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
          multiplier: form.lumi_c5 ? 2 : 1,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Special Delivery DMG`,
          value: [{ scaling: calcScaling(0.2834, intro), multiplier: Stats.ATK, hits: 3 }],
          element: Element.ELECTRO,
          property: TalentProperty.INTRO,
        },
      ]

      if (form.lumi_i1) {
        base[Stats.ELECTRO_DMG].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.1,
        })
      }
      if (form.lumi_i2) {
        base[Stats.P_ATK].push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: 0.1,
        })
      }
      if (c >= 3) {
        base[Stats.LIB_DMG].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.3,
        })
      }
      if (c >= 4) {
        base[Stats.BASIC_DMG].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.3,
        })
      }
      if (form.lumi_c6) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.2,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.lumi_outro) {
        base.SKILL_AMP.push({
          name: `Outro Skill`,
          source: 'Lumi',
          value: 0.38,
        })
      }
      if (form.lumi_c6) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 6`,
          source: 'Lumi',
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

export default Lumi
