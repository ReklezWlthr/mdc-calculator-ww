import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const SRover = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Vibration Manifestation`,
      content: `<b>Basic Attack</b>
      <br />Rover performs up to 4 consecutive attacks, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Rover consumes STA to attack the target, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />
      <br /><b>Heavy Attack: Resonance</b>
      <br />After Basic Attack 3 or Heavy Attack, press the Basic Attack button at the right time to perform Heavy Attack <b>Resonance</b>, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />
      <br /><b>Heavy Attack: Aftertune</b>
      <br />After Heavy Attack <b>Resonance</b> or Dodge Counter hits a target, press the Basic Attack button to perform Heavy Attack <b>Aftertune</b>, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Rover consumes STA to perform a Mid-Air Plunging Attack, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.`,
      image: 'SP_IconNorKnife',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Resonating Slashes`,
      content: `Rover launches an attack forward, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.`,
      image: 'SP_IconZhujueB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Echoing Orchestra`,
      content: `Rover converges Spectro energy to assail the target area, detonating it after a short delay and dealing <b class="text-wuwa-spectro">Spectro DMG</b>.`,
      image: 'SP_IconZhujueC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `World in a Grain of Sand`,
      content: `<b>Resonance Skill: Resonating Spin</b>
      <br />If <b class="text-amber-200">Diminutive Sound</b> exceeds <span class="text-desc">50</span> when Resonance Skill is used, Rover consumes <span class="text-desc">50</span> <b class="text-amber-200">Diminutive Sound</b> to cast <b>Resonating Spin</b>, dealing <b class="text-wuwa-spectro">Spectro DMG</b>, considered as Resonance Skill DMG.
      <br />
      <br /><b>Basic Attack: Resonating Echoes</b>
      <br />After Resonance Skill <b>Resonating Spin</b> ends, Rover performs <b>Resonating Echoes</b> upon using Basic Attack button.
      <br />Launch attacks forward, dealing <b class="text-wuwa-spectro">Spectro DMG</b>, considered as Resonance Skill DMG.
      <br />
      <br /><b class="text-amber-200">Diminutive Sound</b>
      <br />Rover can hold up to <span class="text-desc">100</span> <b class="text-amber-200">Diminutive Sound</b>.
      <br />Rover obtains <b class="text-amber-200">Diminutive Sound</b> for every Normal Attack <b>Vibration Manifestation</b> on hit.
      <br />Rover obtains <b class="text-amber-200">Diminutive Sound</b> for every Heavy Attack <b>Aftertune</b> on hit.
      <br />Rover obtains <b class="text-amber-200">Diminutive Sound</b> upon casting Intro Skill <b>Waveshock</b>.`,
      image: 'SP_IconZhujueY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Waveshock`,
      content: `Rover attacks the target, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.`,
      image: 'SP_IconZhujueQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Instant`,
      content: `Generate an area of stasis centered around the incoming Resonator, lasting for <span class="text-desc">3</span>s.`,
      image: 'SP_IconZhujueT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Reticence`,
      content: `DMG dealt by Rover's Basic Attack <b>Resonating Echoes</b> is increased by <span class="text-desc">60%</span>.`,
      image: 'SP_IconZhujueD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Silent Listener`,
      content: `Rover gains <span class="text-desc">15%</span> ATK increase for <span class="text-desc">5</span>s upon casting Heavy Attack <b>Resonance</b>.`,
      image: 'SP_IconZhujueD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Odyssey of Beginnings`,
      content: `Rover's Crit. Rate is increased by <span class="text-desc">15%</span> for <span class="text-desc">7</span>s when casting Resonance Skill <b>Resonating Slashes</b> or Resonance Skill <b>Resonating Spin</b>.`,
      image: 'T_IconDevice_nannvzhuM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Microcosmic Murmurs`,
      content: `Rover's <b class="text-wuwa-spectro">Spectro DMG Bonus</b> is increased by <span class="text-desc">20%</span>.`,
      image: 'T_IconDevice_nannvzhuM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Visages of Dust`,
      content: `Rover's Energy Regen is increased by <span class="text-desc">20%</span>.`,
      image: 'T_IconDevice_nannvzhuM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Resonating Lamella`,
      content: `When casting Resonance Liberation <b>Echoing Resonance</b>, Rover continuously restores HP for all team members: HP equal to <span class="text-desc">20%</span> of Rover's ATK will be restored every second for <span class="text-desc">5</span>s.`,
      image: 'T_IconDevice_nannvzhuM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Temporal Virtuoso`,
      content: `Rover's Resonance Liberation DMG Bonus is increased by <span class="text-desc">40%</span>.`,
      image: 'T_IconDevice_nannvzhuM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Echoes of Wanderlust`,
      content: `Resonance Skill <b>Resonating Slashes</b> and Resonance Skill <b>Resonating Spin</b> reduces the target's <b class="text-wuwa-spectro">Spectro DMG RES</b> by <span class="text-desc">10%</span> on hit for <span class="text-desc">20</span>s.`,
      image: 'T_IconDevice_nannvzhuM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'smc_i2',
      text: `I2 ATK Bonus`,
      ...talents.i2,
      show: i.i2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'smc_c1',
      text: `S1 Crit Rate Bonus`,
      ...talents.c1,
      show: c >= 1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'smc_c6',
      text: `S6 Spectro RES Shred`,
      ...talents.c6,
      show: c >= 6,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'smc_c6')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.BASIC_SCALING = [
        {
          name: 'Stage 1 DMG',
          value: [{ scaling: calcScaling(0.2975, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.3825, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.0765, normal), multiplier: Stats.ATK, hits: 5 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(0.6545, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.0969, normal), multiplier: Stats.ATK, hits: 5 }],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
        },
        {
          name: 'Heavy Attack - Resonance DMG',
          value: [{ scaling: calcScaling(0.3825, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
        },
        {
          name: 'Heavy Attack - Aftertune DMG',
          value: [{ scaling: calcScaling(0.6375, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          value: [{ scaling: calcScaling(0.527, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          value: [{ scaling: calcScaling(0.9825, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Resonating Slashes DMG',
          value: [{ scaling: calcScaling(0.1188, skill), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Echoing Orchestra DMG',
          value: [
            { scaling: calcScaling(1, lib), multiplier: Stats.ATK },
            { scaling: calcScaling(3.4, lib), multiplier: Stats.ATK },
          ],
          element: Element.SPECTRO,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Resonating Spin DMG',
          value: [{ scaling: calcScaling(0.6492, forte), multiplier: Stats.ATK, hits: 2 }],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Resonating Whirl DMG',
          value: [{ scaling: calcScaling(0.2, forte), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Resonating Echoes Stage 1 DMG',
          value: [{ scaling: calcScaling(0.4, forte), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
          bonus: i.i1 ? 0.6 : 0,
        },
        {
          name: 'Resonating Echoes Stage 2 DMG',
          value: [{ scaling: calcScaling(0.8, forte), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
          bonus: i.i1 ? 0.6 : 0,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Waveshock DMG`,
          value: [{ scaling: calcScaling(0.85, intro), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.INTRO,
        },
      ]

      if (form.smc_i2) {
        base[Stats.P_ATK].push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (form.smc_c1) {
        base[Stats.CRIT_RATE].push({
          name: `Sequence Node 1`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (c >= 2) {
        base[Stats.SPECTRO_DMG].push({
          name: `Sequence Node 2`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (c >= 3) {
        base[Stats.ER].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (c >= 4) {
        base.LIB_SCALING.push({
          name: `S4 Healing`,
          value: [{ scaling: 0.2, multiplier: Stats.ATK }],
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        })
      }
      if (c >= 5) {
        base[Stats.LIB_DMG].push({
          name: `Sequence Node 5`,
          source: 'Self',
          value: 0.4,
        })
      }
      if (form.smc_c6) {
        base.SPECTRO_RES_PEN.push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.1,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.smc_c6) {
        base.SPECTRO_RES_PEN.push({
          name: `Sequence Node 6`,
          source: 'Rover (Spectro)',
          value: 0.1,
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

export default SRover
