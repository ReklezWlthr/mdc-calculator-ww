import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Sanhua = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Frigid Light`,
      content: `<b>Basic Attack</b>
      <br />Sanhua performs up to 5 consecutive attacks, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Sanhua consumes STA to launch attacks, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Sanhua consumes STA to perform a Mid-Air Plunging Attack, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      `,
      image: 'SP_IconNorKnife',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Eternal Frost`,
      content: `Sanhua sends an air blade to create <span class="text-desc">1</span> <b class="text-sky-200">Ice Prism</b> on the ground, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.`,
      image: 'SP_IconSanhuaB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Glacial Gaze`,
      content: `Sanhua deals <b class="text-wuwa-glacio">Glacio DMG</b> and creates <span class="text-desc">1</span> <b class="text-sky-200">Glacier</b>.`,
      image: 'SP_IconSanhuaC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Clarity of Mind`,
      content: `<b>Heavy Attack: Detonate</b>
      <br />When holding Basic Attack, a cursor moves back and forth on the Forte Gauge. Release Basic Attack while cursor falls in the <b class="text-wuwa-glacio">Frostbite</b> area, to perform Heavy Attack <b>Detonate</b>, dealing <b class="text-wuwa-glacio">Glacio DMG</b> considered as Heavy Attack DMG.
      <br />
      <br /><b>Ice Burst</b>
      <br />Sanhua's Heavy Attack <b>Detonate</b> detonates all <b class="text-sky-200">Ice Thorns</b>, <b class="text-sky-200">Ice Prisms</b> and <b class="text-sky-200">Glaciers</b> within her attack range, dealing <b class="text-wuwa-glacio">Glacio DMG</b>. <b>Ice Burst</b> deals Resonance Skill DMG.
      <br />
      <br /><b class="text-wuwa-glacio">Frostbite Area</b>
      <br />The <b class="text-wuwa-glacio">Frostbite</b> area expands with every <span class="text-desc">1</span> stack of <b class="text-yellow">Clarity</b>. <b class="text-yellow">Clarity</b> stacks up to <span class="text-desc">2</span> times.
      <br />Sanhua obtains <span class="text-desc">1</span> stack of <b class="text-yellow">Clarity</b> upon performing Basic Attack 5.
      <br />Sanhua obtains <span class="text-desc">1</span> stack of <b class="text-yellow">Clarity</b> upon casting Intro Skill <b>Freezing Thorns</b>.
      <br />Sanhua obtains <span class="text-desc">1</span> stack of <b class="text-yellow">Clarity</b> upon casting Resonance Skill <b>Eternal Frost</b>.
      <br />Sanhua obtains <span class="text-desc">2</span> stack(s) of <b class="text-yellow">Clarity</b> upon casting Resonance Liberation <b>Glacial Gaze</b>.
      <br />Upon casting Heavy Attack <b>Detonate</b>, all <b class="text-yellow">Clarity</b> is removed.`,
      image: 'SP_IconSanhuaY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Freezing Thorns`,
      content: `Sanhua swings her blade downward and creates <span class="text-desc">1</span> <b class="text-sky-200">Ice Thorn</b>, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.`,
      image: 'SP_IconSanhuaQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Silversnow`,
      content: `The incoming Resonator has their Basic Attack DMG Amplified by <span class="text-desc">38%</span> for <span class="text-desc">14</span>s or until they are switched out.`,
      image: 'SP_IconSanhuaT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Condensation`,
      content: `Damage dealt by Sanhua's Resonance Skill increased by <span class="text-desc">20%</span> for <span class="text-desc">8</span>s after casting her Intro Skill.`,
      image: 'SP_IconSanhuaD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Avalanche`,
      content: `Damage dealt by Sanhua's Forte Circuit <b>Ice Burst</b> is increased by <span class="text-desc">20%</span> for <span class="text-desc">8</span>s after casting Basic Attack 5.`,
      image: 'SP_IconSanhuaD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Solitude's Embrace`,
      content: `Basic Attack 5 increases Sanhua's Crit. Rate by <span class="text-desc">15%</span> for <span class="text-desc">10</span>s.`,
      image: 'T_IconDevice_SanhuaM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Snowy Clarity`,
      content: `Heavy Attack Detonate STA cost is reduced by <span class="text-desc">10</span>. When Sanhua casts Resonance Skill <b>Eternal Frost</b>, her resistance to interruption is enhanced for <span class="text-desc">10</span>s.`,
      image: 'T_IconDevice_SanhuaM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Anomalous Vision`,
      content: `Sanhua's damage dealt is increased by <span class="text-desc">35%</span> against targets with HP below <span class="text-desc">70%</span>.`,
      image: 'T_IconDevice_SanhuaM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Blade Mastery`,
      content: `Resonance Liberation <b>Glacial Gaze</b> restores <span class="text-desc">10</span> Resonance Energy.
      <br />DMG of the next Heavy Attack <b>Detonate</b> within <span class="text-desc">5</span>s is increased by <span class="text-desc">120%</span>.`,
      image: 'T_IconDevice_SanhuaM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Unraveling Fate`,
      content: `Crit. DMG of Forte Circuit <b>Ice Burst</b> is increased by <span class="text-desc">100%</span>. Ice Creations (<b class="text-sky-200">Ice Thorn</b>, <b class="text-sky-200">Ice Prism</b>, and <b class="text-sky-200">Glacier</b>) will explode even if they are not detonated.`,
      image: 'T_IconDevice_SanhuaM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Daybreak Radiance`,
      content: `After an <b class="text-sky-200">Ice Prism</b> or a <b class="text-sky-200">Glacier</b> is detonated, all team members' ATK is increased by <span class="text-desc">10%</span> for <span class="text-desc">20</span>s, stacking up to <span class="text-desc">2</span> times.`,
      image: 'T_IconDevice_SanhuaM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'sanhua_i1',
      text: `I1 Skill DMG Bonus`,
      ...talents.i1,
      show: i.i1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'sanhua_i2',
      text: `I2 Ice Burst Bonus`,
      ...talents.i2,
      show: i.i2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'sanhua_c1',
      text: `S1 Crit Rate Bonus`,
      ...talents.c1,
      show: c >= 1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'sanhua_c3',
      text: `S3 DMG Bonus`,
      ...talents.c3,
      show: c >= 3,
      default: false,
    },
    {
      type: 'toggle',
      id: 'sanhua_c4',
      text: `S4 Enhanced Detonate`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'number',
      id: 'sanhua_c6',
      text: `S6 Team ATK Bonus`,
      ...talents.c6,
      show: c >= 6,
      default: 2,
      min: 0,
      max: 2,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'sanhua_c6')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'sanhua_outro',
        text: `Outro: Silversnow`,
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
          value: [{ scaling: calcScaling(0.245, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.371, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.1085, normal), multiplier: Stats.ATK, hits: 4 }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(0.1995, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 5 DMG',
          value: [{ scaling: calcScaling(1.176, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.112, normal), multiplier: Stats.ATK, hits: 5 }],
          element: Element.GLACIO,
          property: TalentProperty.HA,
        },
        {
          name: 'Mid-Air Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.62, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.434, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.84, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Eternal Frost DMG',
          value: [{ scaling: calcScaling(1.81, skill), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Glacial Gaze DMG',
          value: [{ scaling: calcScaling(4.0716, lib), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Detonate DMG',
          value: [{ scaling: calcScaling(0.937, forte), multiplier: Stats.ATK, hits: 2 }],
          element: Element.GLACIO,
          property: TalentProperty.HA,
          bonus: form.sanhua_c4 ? 1.2 : 0,
        },
        {
          name: 'Glacier Burst DMG',
          value: [{ scaling: calcScaling(0.7, forte), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
          bonus: form.sanhua_i2 ? 0.2 : 0,
          cd: c >= 5 ? 1 : 0,
        },
        {
          name: 'Ice Prism Burst DMG',
          value: [{ scaling: calcScaling(0.4, forte), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
          bonus: form.sanhua_i2 ? 0.2 : 0,
          cd: c >= 5 ? 1 : 0,
        },
        {
          name: 'Ice Thorn Burst DMG',
          value: [{ scaling: calcScaling(0.3, forte), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
          bonus: form.sanhua_i2 ? 0.2 : 0,
          cd: c >= 5 ? 1 : 0,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Freezing Thorns DMG`,
          value: [{ scaling: calcScaling(0.7, intro), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.INTRO,
        },
      ]

      if (form.sanhua_i1) {
        base[Stats.SKILL_DMG].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (form.sanhua_c1) {
        base[Stats.CRIT_RATE].push({
          name: `Sequence Node 1`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (form.sanhua_c3) {
        base[Stats.ALL_DMG].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.35,
        })
      }
      if (form.sanhua_c6) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.2 * form.sanhua_c6,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.sanhua_outro) {
        base.BASIC_AMP.push({
          name: `Outro Skill`,
          source: 'Sanhua',
          value: 0.38,
        })
      }
      if (form.sanhua_c6) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 6`,
          source: 'Sanhua',
          value: 0.2 * form.sanhua_c6,
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

export default Sanhua
