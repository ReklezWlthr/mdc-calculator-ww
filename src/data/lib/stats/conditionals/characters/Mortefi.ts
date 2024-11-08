import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Mortefi = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Impromptu Show`,
      content: `<b>Basic Attack</b>
      <br />Mortefi uses his dual pistols and flames to perform up to 4 consecutive shots, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Mortefi enters the aiming state for a more powerful shot.
      <br />The aimed shot fired after charging finishes deals <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Mortefi consumes STA to perform consecutive shots at the target in mid-air, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.`,
      image: 'SP_IconNorGun',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Passionate Variation`,
      content: `Launch a flashing lightning of flames forward, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.`,
      image: 'SP_IconMotefeiB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Violent Finale`,
      content: `Deal <b class="text-wuwa-fusion">Fusion DMG</b>, and apply <b>Burning Rhapsody</b> to all characters on the team.
      <br />
      <br /><b>Burning Rhapsody</b>
      <br />When the active character's Basic Attack hits the target, Mortefi launches a Coordinated Attack, firing <span class="text-desc">1</span> <b class="text-wuwa-fusion">Marcato</b>.
      <br />When the active character's Heavy Attack hits the target, Mortefi launches a Coordinated Attack, firing <span class="text-desc">2</span> <b class="text-wuwa-fusion">Marcato</b>.
      <br />Mortefi can launch one Coordinated Attack every <span class="text-desc">0.35</span>s.
      <br />
      <br /><b class="text-wuwa-fusion">Marcato</b>
      <br />Deals <b class="text-wuwa-fusion">Fusion DMG</b>.`,
      image: 'SP_IconMotefeiC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Fury Fugue`,
      content: `<b>Resonance Skill: Fury Fugue</b>
      <br />When Mortefi's <b class="text-wuwa-fusion">Annoyance</b> reaches <span class="text-desc">100</span>, his Resonance Skill is replaced with <b>Fury Fugue</b>.
      <br />When casting <b>Fury Fugue</b>, Mortefi consumes all <b class="text-wuwa-fusion">Annoyance</b> to unleash high-speed flame lightning, dealing <b class="text-wuwa-fusion">Fusion DMG</b>, considered as Resonance Skill DMG.
      <br />
      <br /><b class="text-wuwa-fusion">Annoyance</b>
      <br />Mortefi can hold up to <span class="text-desc">100</span> <b class="text-wuwa-fusion">Annoyance</b> and can restore <b class="text-wuwa-fusion">Annoyance</b> in the following ways:
      <br />- When Normal Attack <b>Impromptu Show</b> hits the target
      <br />- When Intro Skill <b>Dissonance</b> hits the target
      <br />- When Resonance Skill <b>Passionate Variation</b> hits the target
      <br />- Within <span class="text-desc">5</span>s after casting <b>Passionate Variation</b>, Normal Attack <b>Impromptu Show</b> that hits the target restores <b class="text-wuwa-fusion">Annoyance</b> additionally.`,
      image: 'SP_IconMotefeiY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Dissonance`,
      content: `Attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.`,
      image: 'SP_IconMotefeiQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Rage Transposition`,
      content: `The incoming Resonator gains <span class="text-desc">38%</span> Heavy Attack DMG Amplification for <span class="text-desc">14</span>s or until they are switched out.`,
      image: 'SP_IconMotefeiT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Harmonic Control`,
      content: `After casting Resonance Skill Passionate ,b>Variation, the damage of Resonance Skill <b>Fury Fugue</b> is increased by <span class="text-desc">25%</span> for <span class="text-desc">8</span>s.`,
      image: 'SP_IconMotefeiD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Rhythmic Vibrato`,
      content: `During Resonance Liberation <b>Burning Rhapsody</b>, each hit of Resonance Liberation <b class="text-wuwa-fusion">Marcato</b> will increase the DMG of the next Resonance Liberation <b class="text-wuwa-fusion">Marcato</b> by <span class="text-desc">1.5%</span>, which can be triggered once every <span class="text-desc">0.35</span>s, stacking up to <span class="text-desc">50</span> times.
      <br />The effect will be reset after Resonance Liberation <b>Burning Rhapsody</b> ends.`,
      image: 'SP_IconMotefeiD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Solitary Etude`,
      content: `During Resonance Liberation <b>Burning Rhapsody</b>, Mortefi launches Coordinated Attacks when the on-field character performs their Resonance Skills, firing <span class="text-desc">2</span> Resonance Liberation's <b class="text-wuwa-fusion">Marcato</b> hits, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.`,
      image: 'T_IconDevice_MotefeiM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Hypocritical Hymn`,
      content: `After using the Echo Skill, Mortefi restores an additional <span class="text-desc">10</span> Resonance Energy. This can be triggered once every <span class="text-desc">20</span> second.`,
      image: 'T_IconDevice_MotefeiM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Flaming Recitativo`,
      content: `During Resonance Liberation <b>Burning Rhapsody</b>, the Crit. DMG of Resonance Liberation's <b class="text-wuwa-fusion">Marcato</b> is increased by <span class="text-desc">30%</span>.`,
      image: 'T_IconDevice_MotefeiM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Cathartic Waltz`,
      content: `The duration of Resonance Liberation <b>Burning Rhapsody</b> is extended by <span class="text-desc">7</span>s.`,
      image: 'T_IconDevice_MotefeiM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Funerary Quartet`,
      content: `When Resonance Skill Passionate <b>Variation</b> or Resonance Skill <b>Fury Fugue</b> hits a target, Coordinated Attacks will be triggered to fire <span class="text-desc">4</span> Resonance Liberation's <b class="text-wuwa-fusion">Marcato</b> hit(s), dealing <b class="text-wuwa-fusion">Fusion DMG</b>. DMG of Resonance Liberation's <b class="text-wuwa-fusion">Marcato</b> fired in this way is reduced by <span class="text-desc">50%</span>.`,
      image: 'T_IconDevice_MotefeiM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Apoplectic Instrumental`,
      content: `When Resonance Liberation <b>Violent Finale</b> is cast, ATK of all team members is increased by <span class="text-desc">20%</span> for <span class="text-desc">20</span>s.`,
      image: 'T_IconDevice_MotefeiM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'mortefi_i1',
      text: `I1 Enhanced Fury Fugue`,
      ...talents.i1,
      show: i.i1,
      default: true,
    },
    {
      type: 'number',
      id: 'mortefi_i2',
      text: `I2 Marcato Bonus`,
      ...talents.i2,
      show: i.i2,
      default: 0,
      min: 0,
      max: 50,
    },
    {
      type: 'toggle',
      id: 'mortefi_c6',
      text: `S6 Team ATK Bonus`,
      ...talents.c6,
      show: c >= 6,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'mortefi_c6')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'mortefi_outro',
        text: `Outro: Rage Transposition`,
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
          value: [{ scaling: calcScaling(0.2429, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.2051, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.5397, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [
            { scaling: calcScaling(0.1057, normal), multiplier: Stats.ATK, hits: 4 },
            { scaling: calcScaling(0.6384, normal), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Aimed Shot DMG',
          value: [{ scaling: calcScaling(0.4914, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.HA,
        },
        {
          name: 'Fully Charged Aimed Shot DMG',
          value: [{ scaling: calcScaling(0.84, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.1169, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.9807, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Passionate Variation DMG',
          value: [{ scaling: calcScaling(1.05, skill), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Violent Finale DMG',
          value: [{ scaling: calcScaling(0.8, lib), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.LIB,
        },
        {
          name: 'Marcato DMG',
          value: [{ scaling: calcScaling(0.16, lib), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.LIB,
          bonus: form.mortefi_i2 ? 0.015 * form.mortefi_i2 : 0,
          cd: c >= 3 ? 0.3 : 0,
          coord: true,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Fury Fugue DMG',
          value: [{ scaling: calcScaling(1.64, forte), multiplier: Stats.ATK, hits: 7 }],
          element: Element.FUSION,
          property: TalentProperty.SKILL,
          bonus: form.mortefi_i1 ? 0.25 : 0,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Dissonance DMG`,
          value: [{ scaling: calcScaling(0.85, intro), multiplier: Stats.ATK, hits: 4 }],
          element: Element.FUSION,
          property: TalentProperty.INTRO,
        },
      ]

      if (c >= 5) {
        base.LIB_SCALING.push({
          name: 'S5 Marcato DMG',
          value: [{ scaling: calcScaling(0.16, lib), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.LIB,
          bonus: form.mortefi_i2 ? 0.015 * form.mortefi_i2 : 0,
          cd: c >= 3 ? 0.3 : 0,
          multiplier: 0.5,
          coord: true,
        })
      }
      if (form.mortefi_c6) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.2,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.mortefi_outro) {
        base.HEAVY_AMP.push({
          name: `Outro Skill`,
          source: 'Mortefi',
          value: 0.38,
        })
      }
      if (form.mortefi_c6) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 6`,
          source: 'Mortefi',
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

export default Mortefi
