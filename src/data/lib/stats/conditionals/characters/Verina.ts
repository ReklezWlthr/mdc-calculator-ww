import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Verina = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Cultivation`,
      content: `<b>Basic Attack</b>
      <br />Verina performs up to 5 consecutive attacks with vines, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Verina consumes STA to charge forward, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Verina consumes STA to perform up to 3 consecutive attacks in mid-air, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />
      <br /><b>Mid-Air Heavy Attack</b>
      <br />Hold Basic Attack to consume STA and perform a mid-air Plunging Attack, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.`,
      image: 'SP_IconNorMagic',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Botany Experiment`,
      content: `Verina converges an energy field in front to grow foliage, dealing <b class="text-wuwa-spectro">Spectro DMG</b> within the range.`,
      image: 'SP_IconJueyuanB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Arboreal Flourish`,
      content: `Verina nourishes nearby foliage at rapid speed, dealing <b class="text-wuwa-spectro">Spectro DMG</b> while healing all Characters on teams nearby. A <b class="text-desc">Photosynthesis Mark</b> is applied to the target on hit.
      <br />
      <br /><b class="text-desc">Photosynthesis Mark</b>
      <br />Whenever a Character on a team nearby performs an attack on targets with a <b class="text-desc">Photosynthesis Mark</b>, Verina performs a Coordinated Attack, dealing <b class="text-wuwa-spectro">Spectro DMG</b> while healing the active Character dealing damage on a team nearby, triggered <span class="text-desc">1</span> time per second.`,
      image: 'SP_IconJueyuanC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Starflower Blooms`,
      content: `<b>Heavy Attack: Starflower Blooms</b>
      <br />When casting Heavy Attack, if Verina carries <b class="text-amber-200">Photosynthesis Energy</b>, Verina consumes <span class="text-desc">1</span> stack of <b class="text-amber-200">Photosynthesis Energy</b> to recover Concerto Energy and heal all characters on a nearby team.
      <br />Heavy Attack: <b>Starflower Blooms</b> deals <b class="text-wuwa-spectro">Spectro DMG</b>, considered as Heavy Attack DMG.
      <br />
      <br /><b>Mid-Air Attack: Starflower Blooms</b>
      <br />When casting Mid-Air Attack, if Verina carries <b class="text-amber-200">Photosynthesis Energy</b>, Verina consumes <span class="text-desc">1</span> stack of <b class="text-amber-200">Photosynthesis Energy</b> to recover Concerto Energy and heal all characters on a nearby team.
      <br />Mid-Air Attack: <b>Starflower Blooms</b> deals <b class="text-wuwa-spectro">Spectro DMG</b>, considered as Basic Attack DMG.
      <br />Verina can cast Mid-Air Attack: <b>Starflower Blooms</b> by using Basic Attack after casting Heavy Attack: <b>Starflower Blooms</b>.
      <br />
      <br /><b class="text-amber-200">Photosynthesis Energy</b>
      <br />Verina can hold up to <span class="text-desc">4</span> <b class="text-amber-200">Photosynthesis Energy</b>.
      <br />Verina obtains <span class="text-desc">1</span> stack of <b class="text-amber-200">Photosynthesis Energy</b> for every Basic Attack 5 on hit.
      <br />Verina obtains <span class="text-desc">1</span> stack of <b class="text-amber-200">Photosynthesis Energy</b> for every Resonance Skill <b>Botany Experiment</b> on hit.
      <br />Verina obtains <span class="text-desc">1</span> stack of <b class="text-amber-200">Photosynthesis Energy</b> for every Intro Skill <b>Verdant Growth</b> on hit.`,
      image: 'SP_IconJueyuanY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Verdant Growth`,
      content: `Verina attacks the target, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.`,
      image: 'SP_IconJueyuanQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Blossom`,
      content: `Heal the incoming Resonator by <span class="text-desc">19%</span> of Verina's ATK per second for <span class="text-desc">6</span>s. All Resonators on nearby teams have their DMG Amplified by <span class="text-desc">15%</span> for <span class="text-desc">30</span>s.`,
      image: 'SP_IconJueyuanT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Gift of Nature`,
      content: `When Verina casts Heavy Attack <b>Starflower Blooms</b>, Mid-air Attack <b>Starflower Blooms</b>, Resonance Liberation <b>Arboreal Flourish</b> or Outro <b>Skill Blossom</b>, all team members' ATK are increased by <span class="text-desc">20%</span> for <span class="text-desc">20</span>s.`,
      image: 'SP_IconJueyuanD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Grace of Life`,
      content: `Verina protects a team member from fatal damage and grants a shield with strength equal to <span class="text-desc">120%</span> of Verina's ATK, lasting for <span class="text-desc">10</span>s. This can be triggered <span class="text-desc">1</span> time every <span class="text-desc">10</span> minutes.`,
      image: 'SP_IconJueyuanD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Moment of Emergence`,
      content: `Outro Skill <b>Blossom</b> grants the next character a continuous Healing effect, recovering HP by <span class="text-desc">20%</span> of Verina's ATK every <span class="text-desc">5</span>s for <span class="text-desc">30</span>s.`,
      image: 'T_IconDevice_weilinaiM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Sprouting Reflections`,
      content: `Resonance Skill <b>Botany Experiment</b> additionally grants <span class="text-desc">1</span> <b class="text-amber-200">Photosynthesis Energy</b> and <span class="text-desc">10</span> Concerto Energy.`,
      image: 'T_IconDevice_weilinaiM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `The Choice to Flourish`,
      content: `Healing of Resonance Liberation's <b class="text-desc">Photosynthesis Mark</b> is increased by <span class="text-desc">12%</span>.`,
      image: 'T_IconDevice_weilinaiM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Blossoming Embrace`,
      content: `Heavy Attack <b>Starflower Blooms</b>, Mid-Air Attack <b>Starflower Blooms</b>, Resonance Liberation <b>Arboreal Flourish</b> and Outro Skill <b>Blossom</b> increases the <b class="text-wuwa-spectro">Spectro DMG Bonus</b> of all team members by <span class="text-desc">15%</span> for <span class="text-desc">24</span>s.`,
      image: 'T_IconDevice_weilinaiM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Miraculous Blooms`,
      content: `When Verina heals a team member with HP less than <span class="text-desc">50%</span>, her Healing is increased by <span class="text-desc">20%</span>.`,
      image: 'T_IconDevice_weilinaiM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Joyous Harvest`,
      content: `Heavy Attack <b>Starflower Blooms</b> and Mid-Air Attack <b>Starflower Blooms</b> deal <span class="text-desc">20%</span> more DMG. They will trigger Coordinated Attack <span class="text-desc">1</span> time and heal all characters nearby. The damage of this Coordinated Attack and the Healing are equal to those of the Resonance Liberation's <b class="text-desc">Photosynthesis Mark</b>.`,
      image: 'T_IconDevice_weilinaiM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'verina_outro',
      text: `Outro: Blossom`,
      ...talents.outro,
      show: true,
      default: false,
    },
    {
      type: 'toggle',
      id: 'verina_i1',
      text: `I1 Team ATK Bonus`,
      ...talents.i1,
      show: i.i1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'verina_c4',
      text: `S4 Team Spectro DMG Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'toggle',
      id: 'verina_c5',
      text: `S5 Low-Health Healing Bonus`,
      ...talents.c5,
      show: c >= 5,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'verina_outro'), findContentById(content, 'verina_c4')]

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
          value: [{ scaling: calcScaling(0.1904, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.2573, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.1287, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(0.3386, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 5 DMG',
          value: [{ scaling: calcScaling(0.3603, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.5, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack Stage 1 DMG',
          value: [{ scaling: calcScaling(0.2835, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Mid-Air Attack Stage 2 DMG',
          value: [{ scaling: calcScaling(0.2675, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Mid-Air Attack Stage 3 DMG',
          value: [{ scaling: calcScaling(0.1279, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Mid-Air Attack Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.31, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          value: [{ scaling: calcScaling(0.65, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Botany Experiment DMG',
          value: [
            { scaling: calcScaling(0.18, skill), multiplier: Stats.ATK, hits: 3 },
            { scaling: calcScaling(0.36, skill), multiplier: Stats.ATK },
          ],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: `Arboreal Flourish DMG`,
          value: [{ scaling: calcScaling(1, lib), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.LIB,
        },
        {
          name: `Arboreal Flourish Healing`,
          value: [{ scaling: calcScaling(0.1133, lib), multiplier: Stats.ATK }],
          flat: calcScaling(500, lib),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
        {
          name: `Coordinated Attack DMG`,
          value: [{ scaling: calcScaling(0.05, lib), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.LIB,
          coord: true,
        },
        {
          name: `Coordinated Attack Healing`,
          value: [{ scaling: calcScaling(0.051, lib), multiplier: Stats.ATK }],
          flat: calcScaling(225, lib),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
          bonus: c >= 3 ? 0.12 : 0,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: `Heavy Attack: Starflower Blooms DMG`,
          value: [
            { scaling: calcScaling(0.3267, forte), multiplier: Stats.ATK },
            { scaling: calcScaling(0.49, forte), multiplier: Stats.ATK },
          ],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
          bonus: c >= 6 ? 0.2 : 0,
        },
        {
          name: 'Mid-Air Attack: Starflower Blooms Stage 1 DMG',
          value: [{ scaling: calcScaling(0.3402, forte), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
          bonus: c >= 6 ? 0.2 : 0,
        },
        {
          name: 'Mid-Air Attack: Starflower Blooms Stage 2 DMG',
          value: [{ scaling: calcScaling(0.321, forte), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
          bonus: c >= 6 ? 0.2 : 0,
        },
        {
          name: 'Mid-Air Attack: Starflower Blooms Stage 3 DMG',
          value: [{ scaling: calcScaling(0.1534, forte), multiplier: Stats.ATK, hits: 3 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
          bonus: c >= 6 ? 0.2 : 0,
        },
        {
          name: `Starflower Blooms Healing`,
          value: [{ scaling: calcScaling(0.1417, lib), multiplier: Stats.ATK }],
          flat: calcScaling(625, lib),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
          bonus: c >= 6 ? 0.2 : 0,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Verdant Growth DMG`,
          value: [{ scaling: calcScaling(0.5, intro), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.INTRO,
        },
      ]
      base.OUTRO_SCALING = [
        {
          name: `Blossom Healing`,
          value: [{ scaling: 0.19, multiplier: Stats.ATK }],
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
      ]

      if (form.verina_i1) {
        base[Stats.P_ATK].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (i.i2) {
        base.FORTE_SCALING.push({
          name: `Grace of Life Shield`,
          value: [{ scaling: 1.2, multiplier: Stats.ATK }],
          element: TalentProperty.SHIELD,
          property: TalentProperty.SHIELD,
        })
      }
      if (c >= 1) {
        base.OUTRO_SCALING.push({
          name: `S1 Healing`,
          value: [{ scaling: 0.2, multiplier: Stats.ATK }],
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        })
      }
      if (form.verina_c4) {
        base[Stats.SKILL_DMG].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (form.verina_c5) {
        base[Stats.HEAL].push({
          name: `Sequence Node 5`,
          source: 'Self',
          value: 0.2,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.verina_i1) {
        base[Stats.P_ATK].push({
          name: `Inherent Skill 1`,
          source: 'Verina',
          value: 0.2,
        })
      }
      if (form.verina_outro) {
        base.AMP.push({
          name: `Outro`,
          source: 'Verina',
          value: 0.15,
        })
      }
      if (form.verina_c4) {
        base[Stats.SPECTRO_DMG].push({
          name: `Sequence Node 4`,
          source: 'Verina',
          value: 0.15,
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

export default Verina
