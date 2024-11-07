import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Jianxin = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Fengyiquan`,
      content: `<b>Basic Attack</b>
      <br />Jianxin performs up to 4 consecutive attacks, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Jianxin consumes STA to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Jianxin consumes STA to plunge and unleash a powerful kick, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>.`,
      image: 'SP_IconNorFist',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Calming Air`,
      content: `Hold Resonance Skill to enter <b class="text-desc">Parry Stance</b>.
      <br />
      <br /><b>Chi Counter</b>
      <br />When Jianxin is attacked in the <b class="text-desc">Parry Stance</b>, she does not take damage and immediately performs <b>Chi Counter</b>, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Chi Parry</b>
      <br />Release the Resonance Skill button during <b class="text-desc">Parry Stance</b> to interrupt <b class="text-desc">Parry Stance</b> and perform <b>Chi Parry</b>, dealing <b class="text-wuwa-aero">Aero DMG</b>.`,
      image: 'SP_IconJianxinB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Purification Force Field`,
      content: `Create a strong wind field, continuously pulling targets within the wind field to the center and dealing <b class="text-wuwa-aero">Aero DMG</b>. When the wind field disappears, it will trigger an explosion to deal <b class="text-wuwa-aero">Aero DMG</b> to all targets within the range again.`,
      image: 'SP_IconJianxinC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Primordial Chi Spiral`,
      content: `<b>Heavy Attack: Primordial Chi Spiral</b>
      <br />When <b class="text-wuwa-aero">Chi</b> reaches max stacks, hold Basic Attack to cast <b>Primordial Chi Spiral</b> and start <b class="text-desc">Zhoutian Progress</b>.
      <br />
      <br /><b class="text-desc">Zhoutian Progress</b>
      <br />Jianxin's resistance to interruption is increased, and her the damage taken is reduced by <span class="text-desc">50%</span>:
      <br />Jianxin continuously consumes <b class="text-wuwa-aero">Chi</b> and casts <b>Chi Strike</b> to attack targets nearby, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />As <b class="text-desc">Zhoutian Progress</b> accumulates, Jianxin reaches different <b>Zhoutian</b> and gains effects accordingly.
      <br />-Before <b>Minor Zhoutian</b>: Gain <b class="text-desc">Zhoutian Progress 1</b> shield. When <b class="text-desc">Zhoutian Progress</b> is interrupted, cast <b>Pushing Punch</b> to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />-<b>Minor Zhoutian</b>: Gain <b class="text-desc">Zhoutian Progress 2</b> shield and cast <b>Shock</b> to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>. When <b class="text-desc">Zhoutian Progress</b> is interrupted, cast <b>Yielding Pull</b> to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />-<b>Major Zhoutian - Inner</b>: Gain <b class="text-desc">Zhoutian Progress 3</b> shield and cast <b>Shock</b> to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>. When <b class="text-desc">Zhoutian Progress</b> is interrupted, cast <b>Yielding Pull</b> to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />-<b>Major Zhoutian - Outer</b>: Gain <b class="text-desc">Zhoutian Progress 4</b> shield and cast <b>Shock</b> to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />-When Basic Attack button is released, interrupt <b class="text-desc">Zhoutian Progress</b> and lose all <b class="text-wuwa-aero">Chi</b>;
      <br />-When all <b class="text-wuwa-aero">Chi</b> is consumed, end <b class="text-desc">Zhoutian Progress</b>.
      <br />
      <br />When <b class="text-desc">Zhoutian Progress</b> ends, regain a shield according to the <b class="text-desc">Zhoutian Progress</b> reached;
      <br />As the shield provided by Heavy Attack: <b>Primordial Chi Spiral</b> persists, the active character is healed once every <span class="text-desc">6</span>s.
      <br />
      <br /><b class="text-wuwa-aero">Chi</b>
      <br />Jianxin can hold up to <span class="text-desc">120</span> <b class="text-wuwa-aero">Chi</b>.
      <br /><b class="text-wuwa-aero">Chi</b> is obtained when Normal Attack <b>Fengyiquan</b> hits the target.
      <br /><b class="text-wuwa-aero">Chi</b> is obtained when the Resonance Skill <b>Calming Air</b> is cast.
      <br /><b class="text-wuwa-aero">Chi</b> is obtained when the Resonance Skills <b>Chi Counter</b> or <b>Chi Parry</b> hits the target.
      <br /><b class="text-wuwa-aero">Chi</b> is obtained when the Intro Skill <b>Essence of Tao</b> hits the target.`,
      image: 'SP_IconJianxinY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Essence of Tao`,
      content: `Pull in targets within the range, dealing <b class="text-wuwa-aero">Aero DMG</b>.`,
      image: 'SP_IconJianxinQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Transcendence`,
      content: `The incoming Resonator has their Resonance Liberation DMG Amplified by <span class="text-desc">38%</span> for <span class="text-desc">14</span>s or until they are switched out.`,
      image: 'SP_IconJianxinT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Formless Release`,
      content: `Damage of Resonance Liberation <b>Purification Force Field</b> is increased by <span class="text-desc">20%</span>.`,
      image: 'SP_IconJianxinD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Reflection`,
      content: `The Shield obtained from Heavy Attack <b>Primordial Chi Spiral</b> is increased by <span class="text-desc">20%</span>.`,
      image: 'SP_IconJianxinD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Verdant Branchlet`,
      content: `After casting Intro Skill <b>Essence of Tao</b>, Jianxin gains <span class="text-desc">100%</span> extra <b class="text-wuwa-aero">Chi</b> from Basic Attacks for <span class="text-desc">10</span>s.`,
      image: 'T_IconDevice_JianxinM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Tao Seeker's Journey`,
      content: `Resonance Skill <b>Calming Air</b> can be used <span class="text-desc">1</span> more time.`,
      image: 'T_IconDevice_JianxinM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Principles of Wuwei`,
      content: `After staying in the <b class="text-desc">Parry Stance</b> of Resonance Skill <b>Calming Air</b> for <span class="text-desc">2.5</span>s, Resonance Skill <b>Chi Counter</b> becomes immediately available.`,
      image: 'T_IconDevice_JianxinM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Multitide Reflection`,
      content: `When performing Forte Circuit Heavy Attack: <b>Primordial Chi Spiral</b>, Jianxin's Resonance Liberation <b>Purification Force Field</b> DMG is increased by <span class="text-desc">80%</span> for <span class="text-desc">14</span>s.`,
      image: 'T_IconDevice_JianxinM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Mirroring Introspection`,
      content: `The range of Resonance Liberation <b>Purification Force Field</b> is increased by <span class="text-desc">33%</span>.`,
      image: 'T_IconDevice_JianxinM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Truth from Within`,
      content: `During Forte Circuit Heavy Attack: <b>Primordial Qi Spiral</b>, if Jianxin performs <b>Pushing Punch</b>, enhanced Resonance Skill <b>Special Chi Counter</b> can be used <span class="text-desc">1</span> time(s) in <span class="text-desc">5</span>s.
      <br />
      <br /><b>Special Chi Counter</b>: Deals <b class="text-wuwa-aero">Aero DMG</b> equal to <span class="text-desc">556.67%</span> of Jianxin's ATK, considered as Heavy Attack DMG. Obtain a <b class="text-desc">Zhoutian Progress 4</b> Shield (Benefits from Inherent Skill <b>Reflection</b>'s bonus effect.)`,
      image: 'T_IconDevice_JianxinM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'jianxin_c4',
      text: `S4 Liberation DMG Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'toggle',
      id: 'taoqi_c4',
      text: `S4 DEF Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'toggle',
      id: 'taoqi_c6',
      text: `S6 Basic & Heavy ATK Bonus`,
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
        id: 'jianxin_outro',
        text: `Outro: Transcendence`,
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
          value: [{ scaling: calcScaling(0.3494, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [
            { scaling: calcScaling(0.134, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.4019, normal), multiplier: Stats.ATK },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.21, normal), multiplier: Stats.ATK, hits: 4 }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(0.5704, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.6341, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          value: [{ scaling: calcScaling(0.62, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          value: [
            { scaling: calcScaling(0.2054, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.8214, normal), multiplier: Stats.ATK },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Chi Counter DMG',
          value: [{ scaling: calcScaling(1.683, skill), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Chi Parry DMG',
          value: [{ scaling: calcScaling(1.3014, skill), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Continuous DMG',
          value: [{ scaling: calcScaling(0.15, lib), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.LIB,
        },
        {
          name: 'Explosion DMG',
          value: [{ scaling: calcScaling(3.2, lib), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Pushing Punch DMG',
          value: [{ scaling: calcScaling(1.25, forte), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
        {
          name: 'Zhoutian Progress Continuous DMG',
          value: [{ scaling: calcScaling(0.125, forte), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
        {
          name: 'Minor Zhoutian Shock DMG',
          value: [{ scaling: calcScaling(0.7, forte), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
        {
          name: 'Major Zhoutian: Inner Shock DMG',
          value: [{ scaling: calcScaling(1.9, forte), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
        {
          name: 'Major Zhoutian: Outer Shock DMG',
          value: [{ scaling: calcScaling(2.6, forte), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
        {
          name: 'Yielding Pull DMG',
          value: [{ scaling: calcScaling(1.1, forte), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
        {
          name: 'Zhoutian Progress 1 Shield',
          value: [{ scaling: calcScaling(0.1706, forte), multiplier: Stats.ATK }],
          flat: calcScaling(437, forte),
          element: TalentProperty.SHIELD,
          property: TalentProperty.SHIELD,
          bonus: i.i2 ? 0.2 : 0,
        },
        {
          name: 'Zhoutian Progress 2 Shield',
          value: [{ scaling: calcScaling(0.3413, forte), multiplier: Stats.ATK }],
          flat: calcScaling(875, forte),
          element: TalentProperty.SHIELD,
          property: TalentProperty.SHIELD,
          bonus: i.i2 ? 0.2 : 0,
        },
        {
          name: 'Zhoutian Progress 3 Shield',
          value: [{ scaling: calcScaling(0.6825, forte), multiplier: Stats.ATK }],
          flat: calcScaling(1750, forte),
          element: TalentProperty.SHIELD,
          property: TalentProperty.SHIELD,
          bonus: i.i2 ? 0.2 : 0,
        },
        {
          name: 'Zhoutian Progress 4 Shield',
          value: [{ scaling: calcScaling(1.137, forte), multiplier: Stats.ATK }],
          flat: calcScaling(2915, forte),
          element: TalentProperty.SHIELD,
          property: TalentProperty.SHIELD,
          bonus: i.i2 ? 0.2 : 0,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Essence of Tao DMG`,
          value: [
            { scaling: calcScaling(0.17, intro), multiplier: Stats.ATK, hits: 3 },
            { scaling: calcScaling(0.34, intro), multiplier: Stats.ATK },
          ],
          element: Element.AERO,
          property: TalentProperty.INTRO,
        },
      ]

      if (i.i1) {
        base[Stats.LIB_DMG].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (form.jianxin_c4) {
        base[Stats.LIB_DMG].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.8,
        })
      }
      if (c >= 6) {
        base.FORTE_SCALING.push({
          name: 'Special Chi Counter DMG',
          value: [{ scaling: 5.5667, multiplier: Stats.HP }],
          element: Element.AERO,
          property: TalentProperty.HA,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.jianxin_outro) {
        base.LIB_AMP.push({
          name: `Outro Skill`,
          source: 'Taoqi',
          value: 0.38,
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

export default Jianxin
