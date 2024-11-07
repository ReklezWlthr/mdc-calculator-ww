import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Taoqi = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Concealed Edge`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 4 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Consume Stamina to deal <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />Hold Basic Attack to enter Rocksteady Defense.
      <br />
      <br /><b>Rocksteady Defense</b>
      <br />- Taoqi's damage taken is reduced by <span class="text-desc">35%</span>;
      <br />- When Taoqi is attacked during <b>Rocksteady Defense</b>, she will cast <b>Strategic Parry</b>;
      <br />- <b>Strategic Parry</b> is automatically cast after <b>Rocksteady Defense</b> lasts for <span class="text-desc">3</span>s;
      <br />If Taoqi is attacked when casting Resonance Skill <b>Fortified Defense</b>, <b>Strategic Parry</b> is automatically cast.
      <br />
      <br /><b>Strategic Parry</b>
      <br />Attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Consume Stamina to perform a Plunging Attack while in mid-air, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.`,
      image: 'SP_IconNorSword',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Fortified Defense`,
      content: `Taoqi deals <b class="text-wuwa-havoc">Havoc DMG</b> to surrounding targets, generating <span class="text-desc">3</span> <b>Rocksteady Shield</b> and healing herself.
      <br />If attacked when casting <b>Fortified Defense</b>, <b>Strategic Parry</b> will be automatically cast.
      <br />
      <br /><b>Rocksteady Shield</b>
      <br />When the active character on the team is attacked, <span class="text-desc">1</span> <b>Rocksteady Shield</b> is consumed to reduce the damage taken.`,
      image: 'SP_IconTaohuaB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Unmovable`,
      content: `Launch an attack based on Taoqi's DEF to the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.`,
      image: 'SP_IconTaohuaC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Power Shift`,
      content: `<b>Timed Counters</b>
      <br />When carrying <b class="text-red">Resolving Caliber</b>, use Basic Attack after Heavy Attack <b>Strategic Parry</b> or Intro Skill <b>Defense Formation</b> to cast <b>Timed Counters</b>, performing up to 3 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>, considered as Basic Attack DMG.
      <br /><b>Timed Counters</b> consume 1 <b class="text-red">Resolving Caliber</b> upon hitting an enemy to grant a shield.
      <br />After casting the Intro Skill <b>Defense Formation</b>, use Basic Attack to directly cast <b>Timed Counters</b>.
      <br />
      <br /><b class="text-red">Resolving Caliber</b>
      <br />Taoqi can hold up to <span class="text-desc">3</span> <b class="text-red">Resolving Caliber</b>.
      <br />Basic Attack 4 will consume all of Taoqi's <b>Rocksteady Shields</b> to grant that many <b class="text-red">Resolving Caliber</b>.
      <br />While <b>Rocksteady Shield</b> exists, when the active character is attacked, <span class="text-desc">1</span> <b>Rocksteady Shield</b> will be consumed to recover <b class="text-red">Resolving Caliber</b>.
      <br />After <b>Rocksteady Shield</b> ends, all remaining <b>Rocksteady Shield</b> will be consumed to grant that many <b class="text-red">Resolving Caliber</b>.`,
      image: 'SP_IconTaohuaY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Defense Formation`,
      content: `Attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.`,
      image: 'SP_IconTaohuaQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Iron Will`,
      content: `The incoming Resonator has their Resonance Skill DMG Amplified by <span class="text-desc">38%</span> for <span class="text-desc">14</span>s or until they are switched out.`,
      image: 'SP_IconTaohuaT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Steadfast Protection`,
      content: `While Resonance Skill <b>Rocksteady Shield</b> lasts, the Character's DEF is increased by <span class="text-desc">15%</span>.`,
      image: 'SP_IconTaohuaD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Unyielding`,
      content: `After Heavy Attack <b>Strategic Parry</b> is successfully triggered, <span class="text-desc">25</span> STA is recovered.`,
      image: 'SP_IconTaohuaD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Essense of Tranquility`,
      content: `Forte Circuit <b>Power Shift</b>'s Shield is increased by <span class="text-desc">40%</span>.`,
      image: 'T_IconDevice_TaohuaM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Silent Strength`,
      content: `The Crit. Rate and Crit. DMG of Resonance Liberation <b>Unmovable</b> is increased by <span class="text-desc">20%</span> and <span class="text-desc">20%</span>, respectively.`,
      image: 'T_IconDevice_TaohuaM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Keen-eyed Observer`,
      content: `The duration of Resonance Skill <b>Rocksteady Shield</b> is extended to <span class="text-desc">30</span>s.`,
      image: 'T_IconDevice_TaohuaM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Heavylifting Duty`,
      content: `When Taoqi successfully triggers Heavy Attack <b>Strategic Parry</b>, she restores <span class="text-desc">25%</span> HP and increases her DEF by <span class="text-desc">50%</span> for <span class="text-desc">5</span>s. This can be triggered once every <span class="text-desc">15</span>s.`,
      image: 'T_IconDevice_TaohuaM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Benevolent Guardian`,
      content: `The damage of Forte Circuit <b>Power Shift</b> is increased by <span class="text-desc">50%</span>. When Forte Circuit <b>Power Shift</b> hits a target, restore <span class="text-desc">20</span> Resonance Energy.`,
      image: 'T_IconDevice_TaohuaM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Defender of Peace`,
      content: `The damage of Taoqi's Basic Attack and Heavy Attack is increased by <span class="text-desc">40%</span> while the Shield granted by Resonance Skill <b>Rocksteady Shield</b> holds.`,
      image: 'T_IconDevice_TaohuaM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'taoqi_i1',
      text: `I1 DEF Bonus`,
      ...talents.i1,
      show: i.i1,
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
        id: 'taoqi_outro',
        text: `Outro: Iron Will`,
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
          value: [{ scaling: calcScaling(0.4534, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.4267, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.56, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(1.36, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(1.1084, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.HA,
        },
        {
          name: 'Strategic Parry DMG',
          value: [{ scaling: calcScaling(0.3959, normal), multiplier: Stats.DEF }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          value: [{ scaling: calcScaling(0.62, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          value: [{ scaling: calcScaling(1.25, normal), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Fortified Defense DMG',
          value: [{ scaling: calcScaling(0.6786, skill), multiplier: Stats.DEF }],
          element: Element.HAVOC,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Healing',
          value: [{ scaling: calcScaling(0.45, skill), multiplier: Stats.DEF }],
          flat: calcScaling(950, skill),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Unmovable DMG',
          value: [{ scaling: calcScaling(2.262, lib), multiplier: Stats.DEF }],
          element: Element.HAVOC,
          property: TalentProperty.LIB,
          cr: c >= 2 ? 0.2 : 0,
          cd: c >= 2 ? 0.2 : 0,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Timed Counters Stage 1 DMG',
          value: [{ scaling: calcScaling(0.4336, forte), multiplier: Stats.DEF }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
          bonus: c >= 5 ? 0.5 : 0,
        },
        {
          name: 'Timed Counters Stage 2 DMG',
          value: [{ scaling: calcScaling(0.558, forte), multiplier: Stats.DEF }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
          bonus: c >= 5 ? 0.5 : 0,
        },
        {
          name: 'Timed Counters Stage 3 DMG',
          value: [{ scaling: calcScaling(0.7314, forte), multiplier: Stats.DEF }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
          bonus: c >= 5 ? 0.5 : 0,
        },
        {
          name: 'Timed Counters Stage 1 Shield',
          value: [{ scaling: calcScaling(0.1125, forte), multiplier: Stats.DEF }],
          flat: calcScaling(300, forte),
          element: TalentProperty.SHIELD,
          property: TalentProperty.SHIELD,
          bonus: c >= 1 ? 0.4 : 0,
        },
        {
          name: 'Timed Counters Stage 2 Shield',
          value: [{ scaling: calcScaling(0.1687, forte), multiplier: Stats.DEF }],
          flat: calcScaling(450, forte),
          element: TalentProperty.SHIELD,
          property: TalentProperty.SHIELD,
          bonus: c >= 1 ? 0.4 : 0,
        },
        {
          name: 'Timed Counters Stage 3 Shield',
          value: [{ scaling: calcScaling(0.2812, forte), multiplier: Stats.DEF }],
          flat: calcScaling(750, forte),
          element: TalentProperty.SHIELD,
          property: TalentProperty.SHIELD,
          bonus: c >= 1 ? 0.4 : 0,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Tactical Strike DMG`,
          value: [{ scaling: calcScaling(1.05, intro), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.INTRO,
        },
      ]

      if (form.taoqi_i1) {
        base[Stats.P_DEF].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (c >= 4) {
        base.HEAVY_SCALING.push({
          name: 'S4 Healing',
          value: [{ scaling: 0.25, multiplier: Stats.HP }],
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        })
      }
      if (form.taoqi_c4) {
        base[Stats.P_DEF].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.5,
        })
      }
      if (form.taoqi_c6) {
        base[Stats.BASIC_DMG].push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.4,
        })
        base[Stats.HEAVY_DMG].push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.4,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.taoqi_outro) {
        base.SKILL_AMP.push({
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

export default Taoqi
