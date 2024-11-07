import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Encore = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Wooly Attack`,
      content: `<b>Basic Attack</b>
      <br />Encore performs up to 4 consecutive attacks, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Basic Attack: Wooly Strike</b>
      <br />After Basic Attack 4, press the Normal Attack button to attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Encore consumes STA to attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Encore consumes STA to perform a Mid-Air Plunging Attack, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.`,
      image: 'SP_IconNorMagic',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Flaming Woolies`,
      content: `<b>Flaming Woolies</b>
      <br />Encore summons Cloudy and Cosmos to attack with burning rays, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Energetic Welcome</b>
      <br />After casting <b>Flaming Woolies</b>, use Resonance Skill to perform <b>Energetic Welcome</b>, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.`,
      image: 'SP_IconAnkeB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Cosmos Rave`,
      content: `As Encore loses control, Cosmos breaks free and wreaks havoc on its surroundings.
      <br />
      <br /><b>Basic Attack: Cosmos - Frolicking</b>
      <br />During <b class="text-wuwa-fusion">Cosmos Rave</b>, the Basic Attack is replaced with <b>Cosmos - Frolicking</b>, which performs up to 4 consecutive attacks, dealing <b class="text-wuwa-fusion">Fusion DMG</b>, considered as Basic Attack DMG.
      <br />
      <br /><b>Cosmos - Heavy Attack</b>
      <br />During <b class="text-wuwa-fusion">Cosmos Rave</b>, the Heavy Attack is replaced with <b>Cosmos - Heavy Attack</b>, consuming STA to attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>, considered as Heavy Attack DMG.
      <br />
      <br /><b>Resonance Skill: Cosmos - Rampage</b>
      <br />During <b class="text-wuwa-fusion">Cosmos Rave</b>, Flaming Woolies is replaced with <b>Cosmos - Rampage</b>, dealing <b class="text-wuwa-fusion">Fusion DMG</b>, considered as Resonance Skill DMG.
      <br />
      <br /><b>Cosmos - Dodge Counter</b>
      <br />During <b class="text-wuwa-fusion">Cosmos Rave</b>, use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>, considered as Basic Attack DMG.`,
      image: 'SP_IconAnkeC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Black & White Woolies`,
      content: `<b>Heavy Attack: Cloudy Frenzy</b>
      <br />When Encore's <b class="text-red">Mayhem</b> is full, after casting a Heavy Attack, Encore will consume all <b class="text-red">Mayhem</b> to enter the <b>Mayhem</b> state, reducing damage taken by <span class="text-desc">70%</span>. Switching Characters does not interrupt the <b>Mayhem</b> state.
      <br />After the <b>Mayhem</b> state ends, Encore will cast <b>Cloudy Frenzy</b>, dealing <b class="text-wuwa-fusion">Fusion DMG</b>, considered as Resonance Liberation damage.
      <br />
      <br /><b>Heavy Attack: Cosmos Rupture</b>
      <br />During Cosmos Rave, when casting Heavy Attack, if <b class="text-red">Mayhem</b> is full, Encore will consume all <b class="text-red">Mayhem</b> to enter <b>Cosmos' Mayhem</b> state, reducing damage taken by <span class="text-desc">70%</span>. Switching Characters does not interrupt the <b>Cosmos' Mayhem</b> state.
      <br />After <b>Cosmos' Mayhem</b> state ends, Encore will cast <b>Cosmos Rupture</b>, dealing <b class="text-wuwa-fusion">Fusion DMG</b>, considered as Resonance Liberation DMG.
      <br />
      <br /><b class="text-red">Mayhem</b>
      <br />Encore can hold up to <span class="text-desc">100</span> <b class="text-red">Mayhem</b>.
      <br />When Normal Attack <b>Wooly Attack</b> hits a target, Encore restores <b class="text-red">Mayhem</b>.
      <br />When Resonance Skill <b>Flaming Woolies</b> hits a target, Encore restores <b class="text-red">Mayhem</b>.
      <br />When Resonance Skill <b>Energetic Welcome</b> hits a target, Encore restores <b class="text-red">Mayhem</b>.
      <br />When Intro Skill <b>Woolies Helpers</b> hits a target, Encore restores <b class="text-red">Mayhem</b>.
      <br />During the duration of Resonance Liberation <b>Cosmos Rave</b>, Encore restores <b class="text-red">Mayhem</b> when hitting a target.`,
      image: 'SP_IconAnkeY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Woolies Helpers`,
      content: `Encore pounces at the enemies with Cosmos, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.`,
      image: 'SP_IconAnkeQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Thermal Field`,
      content: `Encore generates a Thermal Field centered around skill target, with a radius of <span class="text-desc">3</span>m. Targets inside the Thermal Field are continuously burned, suffering <b class="text-wuwa-fusion">Fusion DMG</b> equal to <span class="text-desc">176.76%</span> of Encore's ATK every <span class="text-desc">1.5</span>s for <span class="text-desc">6</span>s.`,
      image: 'SP_IconAnkeT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Angry Cosmos`,
      content: `During the Resonance Liberation <b>Cosmos Rave</b>, when Encore's HP is above <span class="text-desc">70%</span>, DMG dealt is increased by <span class="text-desc">10%</span>.`,
      image: 'SP_IconAnkeD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Woolies Cheer Dance`,
      content: `When Resonance Skill <b>Flaming Woolies</b> or Resonance Skill <b>Cosmos - Rampage</b> is cast, Encore's <b class="text-wuwa-fusion">Fusion DMG Bonus</b> is increased by <span class="text-desc">10%</span> for <span class="text-desc">10</span>s.`,
      image: 'SP_IconAnkeD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Wooly's Fairy Tale`,
      content: `When Basic Attack hits a target, Encore's <b class="text-wuwa-fusion">Fusion DMG Bonus</b> is increased by <span class="text-desc">3%</span>, stacking up to <span class="text-desc">4</span> time(s) for <span class="text-desc">6</span>s.`,
      image: 'T_IconDevice_AnkeM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Sheep-counting Lullaby`,
      content: `Encore additionally restores <span class="text-desc">10</span> Resonance Energy when casting Basic Attack <b>Woolies Attack</b> or Resonance Skill <b>Energetic Welcome</b>. This can be triggered once every <span class="text-desc">10</span>s.`,
      image: 'T_IconDevice_AnkeM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Fog? The Black Shores!`,
      content: `The DMG multiplier of Heavy Attack <b>Cloudy Frenzy</b> and Heavy Attack <b>Cosmos Rupture</b> is increased by <span class="text-desc">40%</span>.`,
      image: 'T_IconDevice_AnkeM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Adventure? Let's go!`,
      content: `Heavy Attack <b>Cosmos Rupture</b> increases the <b class="text-wuwa-fusion">Fusion DMG Bonus</b> of all team members by <span class="text-desc">20%</span> for <span class="text-desc">30</span>s.`,
      image: 'T_IconDevice_AnkeM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Hero Takes the Stage!`,
      content: `Resonance Skill DMG Bonus is increased by <span class="text-desc">35%</span>.`,
      image: 'T_IconDevice_AnkeM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Woolies Save the World!`,
      content: `During Resonance Liberation <b>Cosmos Rave</b>, Encore gains <span class="text-desc">1</span> stack(s) of <b class="text-wuwa-fusion">Lost Lamb</b> every time she deals damage, each stack increasing her ATK by <span class="text-desc">5%</span> for <span class="text-desc">10</span>s, stacking up to <span class="text-desc">5</span> time(s).`,
      image: 'T_IconDevice_AnkeM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'cosmos_rave',
      text: `Cosmos Rave`,
      ...talents.lib,
      show: true,
      default: true,
    },
    {
      type: 'toggle',
      id: 'encore_i1',
      text: `I1 DMG Bonus`,
      ...talents.i1,
      show: i.i1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'encore_i2',
      text: `I2 Fusion DMG Bonus`,
      ...talents.i2,
      show: i.i2,
      default: true,
    },
    {
      type: 'number',
      id: 'encore_c1',
      text: `S1 Fusion DMG Bonus`,
      ...talents.c1,
      show: c >= 1,
      default: 0,
      min: 0,
      max: 4,
    },
    {
      type: 'toggle',
      id: 'encore_c4',
      text: `S4 Team Fusion DMG Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'number',
      id: 'encore_c6',
      text: `S6 ATK Bonus`,
      ...talents.c6,
      show: c >= 6,
      default: 0,
      min: 0,
      max: 5,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'encore_c4')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.BASIC_SCALING = form.cosmos_rave
        ? [
            {
              name: 'Cosmos: Frolicking Stage 1 DMG',
              value: [{ scaling: calcScaling(0.4536, lib), multiplier: Stats.ATK, hits: 2 }],
              element: Element.FUSION,
              property: TalentProperty.BA,
            },
            {
              name: 'Cosmos: Frolicking Stage 2 DMG',
              value: [{ scaling: calcScaling(0.2837, lib), multiplier: Stats.ATK, hits: 3 }],
              element: Element.FUSION,
              property: TalentProperty.BA,
            },
            {
              name: 'Cosmos: Frolicking Stage 3 DMG',
              value: [{ scaling: calcScaling(0.319, lib), multiplier: Stats.ATK, hits: 4 }],
              element: Element.FUSION,
              property: TalentProperty.BA,
            },
            {
              name: 'Cosmos: Frolicking Stage 4 DMG',
              value: [{ scaling: calcScaling(0.9759, lib), multiplier: Stats.ATK, hits: 3 }],
              element: Element.FUSION,
              property: TalentProperty.BA,
            },
          ]
        : [
            {
              name: 'Stage 1 DMG',
              value: [{ scaling: calcScaling(0.28, normal), multiplier: Stats.ATK }],
              element: Element.FUSION,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 2 DMG',
              value: [{ scaling: calcScaling(0.333, normal), multiplier: Stats.ATK }],
              element: Element.FUSION,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 3 DMG',
              value: [{ scaling: calcScaling(0.3335, normal), multiplier: Stats.ATK, hits: 2 }],
              element: Element.FUSION,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 4 DMG',
              value: [{ scaling: calcScaling(0.1925, normal), multiplier: Stats.ATK, hits: 4 }],
              element: Element.FUSION,
              property: TalentProperty.BA,
            },
            {
              name: 'Woolies DMG',
              value: [{ scaling: calcScaling(1.2, normal), multiplier: Stats.ATK }],
              element: Element.FUSION,
              property: TalentProperty.BA,
            },
          ]
      base.HEAVY_SCALING = form.cosmos_rave
        ? [
            {
              name: 'Cosmos: Heavy Attack DMG',
              value: [{ scaling: calcScaling(1.0944, normal), multiplier: Stats.ATK }],
              element: Element.FUSION,
              property: TalentProperty.HA,
            },
          ]
        : [
            {
              name: 'Heavy Attack DMG',
              value: [{ scaling: calcScaling(0.941, normal), multiplier: Stats.ATK }],
              element: Element.FUSION,
              property: TalentProperty.HA,
            },
          ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.62, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = form.cosmos_rave
        ? [
            {
              name: 'Cosmos: Dodge Counter DMG',
              value: [{ scaling: calcScaling(0.3319, normal), multiplier: Stats.ATK, hits: 4 }],
              element: Element.FUSION,
              property: TalentProperty.BA,
            },
          ]
        : [
            {
              name: 'Dodge Counter DMG',
              scale: Stats.ATK,
              value: [{ scaling: calcScaling(0.6334, normal), multiplier: Stats.ATK, hits: 2 }],
              element: Element.FUSION,
              property: TalentProperty.BA,
            },
          ]
      base.SKILL_SCALING = form.cosmos_rave
        ? [
            {
              name: 'Cosmos Rampage DMG',
              value: [{ scaling: calcScaling(0.3185, normal), multiplier: Stats.ATK, hits: 4 }],
              element: Element.FUSION,
              property: TalentProperty.SKILL,
            },
          ]
        : [
            {
              name: 'Flaming Woolies DMG',
              value: [{ scaling: calcScaling(0.3853, skill), multiplier: Stats.ATK, hits: 8 }],
              element: Element.FUSION,
              property: TalentProperty.SKILL,
            },
            {
              name: 'Energetic Welcome DMG',
              value: [{ scaling: calcScaling(1.706, skill), multiplier: Stats.ATK }],
              element: Element.FUSION,
              property: TalentProperty.SKILL,
            },
          ]
      base.LIB_SCALING = []
      base.FORTE_SCALING = [
        {
          name: 'Cloudy Frenzy DMG',
          value: [{ scaling: calcScaling(1.68, forte), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.LIB,
          multiplier: c >= 3 ? 1.4 : 1,
        },
        {
          name: 'Cosmos Rupture DMG',
          value: [
            { scaling: calcScaling(0.2335, forte), multiplier: Stats.ATK, hits: 6 },
            { scaling: calcScaling(2.4908, forte), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.LIB,
          multiplier: c >= 3 ? 1.4 : 1,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Woolies Helpers DMG`,
          value: [{ scaling: calcScaling(1, intro), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.INTRO,
        },
      ]
      base.OUTRO_SCALING = [
        {
          name: `Thermal Field DMG`,
          value: [{ scaling: calcScaling(1.7676, intro), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.OUTRO,
        },
      ]

      if (form.encore_i1) {
        base[Stats.ALL_DMG].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.1,
        })
      }
      if (form.encore_i2) {
        base[Stats.FUSION_DMG].push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: 0.1,
        })
      }
      if (form.encore_c1) {
        base[Stats.FUSION_DMG].push({
          name: `Sequence Node 1`,
          source: 'Self',
          value: 0.03 * form.encore_c1,
        })
      }
      if (form.encore_c4) {
        base[Stats.FUSION_DMG].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (c >= 5) {
        base[Stats.SKILL_DMG].push({
          name: `Sequence Node 5`,
          source: 'Self',
          value: 0.35,
        })
      }
      if (form.encore_c6 && form.cosmos_rave) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.05 * form.encore_c6,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.encore_c4) {
        base[Stats.FUSION_DMG].push({
          name: `Sequence Node 4`,
          source: 'Encore',
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

export default Encore
