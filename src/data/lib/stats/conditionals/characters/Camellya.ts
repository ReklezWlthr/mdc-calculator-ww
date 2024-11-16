import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Camellya = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const buddingMode = `<b class="text-desc">Budding Mode</b>
      <br />- <b>Sweet Dream</b>: Increase the DMG Multiplier of Normal Attack, Basic Attack <b>Vining Waltz</b>, Basic Attack <b>Vining Ronde</b>, Dodge Counter <b>Atonement</b> , Resonance Skill <b>Crimson Blossom</b>, and Resonance Skill <b>Floral Ravage</b> by <span class="text-desc">50%</span>.
      <br />- Casting <b>Ephemeral</b> consumes all <b class="text-rose-300">Crimson Buds</b>. Each <b class="text-rose-300">Crimson Bud</b> consumed additionally increases the DMG Multiplier of <b>Sweet Dream</b> by <span class="text-desc">5%</span>, up to <span class="text-desc">50%</span>.
      <br />- When in <b class="text-desc">Budding Mode</b>, Camellya cannot gain <b class="text-rose-300">Crimson Buds</b>.
      <br />- When in <b class="text-desc">Budding Mode</b>, the Energy Regen Multiplier of Normal Attack, Basic Attack <b>Vining Waltz</b>, Basic Attack <b>Vining Ronde</b>, Dodge Counter <b>Atonement</b> , Resonance Skill <b>Crimson Blossom</b>, and Resonance Skill <b>Floral Ravage</b> is reduced to <span class="text-desc">0%</span>.
      <br />- <b class="text-desc">Budding Mode</b> ends when Camellya is switched off the field.
      <br />- <b class="text-desc">Budding Mode</b> ends when all <b class="text-red">Crimson Pistils</b> are consumed.`

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Burgeoning`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 5 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />After performing Basic Attack Stage 3, hold Normal Attack Button to continuously strike the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />Basic Attack Stage 4 is automatically followed by Basic Attack Stage 5.
      <br />
      <br /><b>Heavy Attack - Pruning</b>
      <br />Consume STA to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Plunging Attack</b>
      <br />Consume STA to perform Plunging Attack, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack right after a successful Dodge to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      `,
      image: 'SP_IconNorKnife',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Valse of Bloom and Blight`,
      content: `<b>Crimson Blossom</b>
      <br />Attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b> (considered Basic Attack DMG), then enter <b class="text-pink-400">Blossom Mode</b>.
      <br />This attack can be performed in mid-air.
      <br />
      <br /><b class="text-pink-400">Blossom Mode</b>
      <br />- Unable to move while suspended on vines.
      <br />- Basic Attack and Heavy Attack <b>Pruning</b> are replaced by Basic Attack <b>Vining Waltz</b>: chain together 4 consecutive attacks, dealing <b class="text-wuwa-havoc">Havoc DMG</b>, considered Basic Attack DMG.
      <br />- When performing <b>Vining Waltz</b> Stage 3, hold Normal Attack Button to cast <b>Blazing Waltz</b> that deals <b class="text-wuwa-havoc">Havoc DMG</b> before automatically performing <b>Vining Waltz</b> Stage 4.
      <br />- Dodge Counter is replaced by Dodge Counter <b>Atonement</b>. Press Normal Attack Button right after a successful Dodge to attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>, considered Basic Attack DMG.
      <br />- Resonance Skill is replaced by Resonance Skill <b>Floral Ravage</b>. Casting <b>Floral Ravage</b> deals <b class="text-wuwa-havoc">Havoc DMG</b>, considered Basic Attack DMG.
      <br />- Resonance Skill <b>Floral Ravage</b> can be cast in mid-air.
      <br />- <b class="text-pink-400">Blossom Mode</b> ends after casting Resonance Skill <b>Floral Ravage</b>.
      <br />- <b class="text-pink-400">Blossom Mode</b> ends after using the <b>Levitator</b>.
      <br />- Jump is replaced with Basic Attack <b>Vining Ronde</b>. Press Jump to deal <b class="text-wuwa-havoc">Havoc DMG</b> (considered Basic Attack DMG) and ends the <b class="text-pink-400">Blossom Mode</b>.
      <br />- Using Basic Attack <b>Vining Waltz</b>, Basic Attack <b>Blazing Waltz</b>, and Basic Attack <b>Vining Ronde</b> in mid-air consumes STA.
      <br />- Casting Resonance Skill <b>Floral Ravage</b> in mid-air doesn't restore STA.
      <br />- Consume STA continuously to stay suspended on the vines.
      `,
      image: 'SP_IconChunB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Fervor Efflorescent`,
      content: `Attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      <br />This attack can be performed in mid-air.
      `,
      image: 'SP_IconChunC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Vegetative Universe`,
      content: `Hitting a target with Normal Attack, Basic Attack <b>Vining Waltz</b>, Basic Attack <b>Vining Ronde</b>, Dodge Counter <b>Atonement</b>, Resonance Skill <b>Crimson Blossom</b>, and Resonance Skill <b>Floral Ravage</b> consumes <b class="text-red">Crimson Pistils</b>. The Energy Regen Multiplier of this attack is increased by <span class="text-desc">150%</span>.
      <br />Consuming <span class="text-desc">10</span> <b class="text-red">Crimson Pistils</b> recovers <span class="text-desc">4</span> Concerto Energy and obtains <span class="text-desc">1</span> <b class="text-rose-300">Crimson Bud(s)</b>. Each <b class="text-rose-300">Bud</b> lasts for <span class="text-desc">15</span>s, stacking up to <span class="text-desc">10</span> times.
      <br />
      <br /><b>Forte Circuit: Ephemeral</b>
      <br />When Concerto Energy is fully recovered, and <b>Ephemeral</b> is not on Cooldown, Resonance Skill is replaced with <b>Ephemeral</b>.
      <br />Casting <b>Ephemeral</b> consumes <span class="text-desc">70</span> Concerto Energy and deals <b class="text-wuwa-havoc">Havoc DMG</b> to the targets. This damage is considered Basic Attack DMG.
      <br />Camellya enters <b class="text-desc">Budding Mode</b> after casting <b>Ephemeral</b>.
      <br />
      <br />${buddingMode}
      <br />
      <br /><b class="text-red">Crimson Pistil</b>
      <br />Camellya can hold up to <span class="text-desc">100</span> <b class="text-red">Crimson Pistils</b>.
      <br />- Casting Intro Skill <b>Everblooming</b> recovers <span class="text-desc">100</span> <b class="text-red">Crimson Pistils</b>.
      <br />- Activating Forte Circuit's <b>Ephemeral</b> recovers <span class="text-desc">100</span> <b class="text-red">Crimson Pistils</b>.
      `,
      image: 'SP_IconChunY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Everblooming`,
      content: `Attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b>.
      `,
      image: 'SP_IconChunQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Twining`,
      content: `Attack the target, dealing <b class="text-wuwa-havoc">Havoc DMG</b> equal to <span class="text-desc">329.24%</span> of Camellya's ATK.
      <br />After activating Forte Circuit's <b>Ephemeral</b>, the next Outro Skill <b>Twining</b> deals additional <b class="text-wuwa-havoc">Havoc DMG</b> equal to <span class="text-desc">459.09%</span> of Camellya's ATK.
      `,
      image: 'SP_IconChunT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Seedbed`,
      content: `Gain <span class="text-desc">15%</span> <b class="text-wuwa-havoc">Havoc DMG Bonus</b>. DMG dealt by Heavy Attack <b>Pruning</b> is now considered Basic Attack DMG.`,
      image: 'SP_IconChunD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Epiphyte`,
      content: `Gain <span class="text-desc">15%</span> Basic Attack DMG Bonus. Gain increased resistance to interruption when casting Basic Attack, and Basic Attack <b>Vining Waltz</b>, and Basic Attack <b>Blazing Waltz</b>.`,
      image: 'SP_IconChunD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Somewhere No One Travelled`,
      content: `Casting Intro Skill <b>Everblooming</b> increases Camellya's Crit. DMG by <span class="text-desc">28%</span> for <span class="text-desc">18</span>s. This effect can be triggered every <span class="text-desc">25</span>s.
      <br />Immune to interruptions while casting <b>Ephemeral</b>.`,
      image: 'T_IconDevice_ChunM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Calling Upon the Silent Rose`,
      content: `The DMG Multiplier of Resonance Skill <b>Ephemeral</b> is increased by <span class="text-desc">120%</span>.`,
      image: 'T_IconDevice_ChunM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `A Bud Adorned by Thorns`,
      content: `The DMG Multiplier of Resonance Liberation <b>Fervor Efflorescent</b> is increased by <span class="text-desc">50%</span>. When in <b class="text-desc">Budding Mode</b>, Camellya's ATK is increased by <span class="text-desc">58%</span>.`,
      image: 'T_IconDevice_ChunM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Roots Set Deep In Eternity`,
      content: `Casting <b>Everblooming</b> gives all team members <span class="text-desc">25%</span> Basic Attack DMG Bonus for <span class="text-desc">30</span>s.`,
      image: 'T_IconDevice_ChunM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Infinity Held in Your Palm`,
      content: `The DMG Multipliers of Intro Skill <b>Everblooming</b> is increased by <span class="text-desc">303%</span> and Outro Skill <b>Twining</b> is increased by <span class="text-desc">68%</span>.`,
      image: 'T_IconDevice_ChunM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Bloom For You Thousand Times Over`,
      content: `The DMG Multiplier of Forte Circuit's <b>Sweet Dream</b> is additionally increased by 150%.
      <br /><b>Forte Circuit Perennial</b>: Within <span class="text-desc">15</span>s after casting <b>Ephemeral</b>, if Concerto Energy is full and <b>Perennial</b> is not on cooldown, Resonance Skill is replaced with <b>Perennial</b>.
      <br />Casting <b>Perennial</b> consumes <span class="text-desc">50</span> Concerto Energy and recovers <span class="text-desc">50</span> <b class="text-red">Crimson Pistils</b>, dealing <b class="text-wuwa-havoc">Havoc DMG</b> equal to <span class="text-desc">100%</span> of <b>Ephemeral</b>, considered Basic Attack DMG. This skill can be cast once every <span class="text-desc">25</span>s.
      <br />Camellya enters <b class="text-desc">Budding Mode</b> after casting <b>Perennial</b> and removes all <b class="text-rose-300">Crimson Buds</b>. The bonus DMG Multiplier granted by Forte Circuit's <b>Sweet Dream</b> is increased to <span class="text-desc">250%</span>.
      <br />Immune to interruptions when casting <b>Perennial</b>.`,
      image: 'T_IconDevice_ChunM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'blossom',
      text: `Blossom Mode`,
      ...talents.skill,
      show: true,
      default: true,
      sync: true,
    },
    {
      type: 'toggle',
      id: 'budding',
      text: `Budding Mode`,
      ...talents.forte,
      content: buddingMode,
      show: true,
      default: true,
    },
    {
      type: 'number',
      id: 'crimson_buds',
      text: `Crimson Buds`,
      ...talents.forte,
      content: buddingMode,
      show: true,
      default: 0,
      min: 0,
      max: 10,
    },
    {
      type: 'toggle',
      id: 'camellya_c1',
      text: `S1 Crit DMG Bonus`,
      ...talents.c1,
      show: c >= 1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'camellya_c4',
      text: `S4 Team Basic ATK DMG Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'toggle',
      id: 'camellya_c6',
      text: `S6 Budding Mode Enhance`,
      ...talents.c6,
      show: c >= 6,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'camellya_c4')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      const sweetDream = form.budding
        ? (c >= 6 ? (form.camellya_c6 ? 2.5 : 1.5) : 0) + 0.5 + form.crimson_buds * 0.05
        : 0

      base.BASIC_SCALING = form.blossom
        ? [
            {
              name: 'Vining Waltz 1 DMG',
              value: [{ scaling: calcScaling(0.4845, normal), multiplier: Stats.ATK }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
              multiplier: 1 + sweetDream,
            },
            {
              name: 'Vining Waltz 2 DMG',
              value: [{ scaling: calcScaling(0.2295, normal), multiplier: Stats.ATK, hits: 2 }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
              multiplier: 1 + sweetDream,
            },
            {
              name: 'Vining Waltz 3 DMG',
              value: [{ scaling: calcScaling(0.1104, normal), multiplier: Stats.ATK, hits: 6 }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
              multiplier: 1 + sweetDream,
            },
            {
              name: 'Vining Waltz 4 DMG',
              value: [{ scaling: calcScaling(0.34, normal), multiplier: Stats.ATK, hits: 3 }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
              multiplier: 1 + sweetDream,
            },
          ]
        : [
            {
              name: 'Stage 1 DMG',
              value: [{ scaling: calcScaling(0.3145, normal), multiplier: Stats.ATK }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
              multiplier: 1 + sweetDream,
            },
            {
              name: 'Stage 2 DMG',
              value: [{ scaling: calcScaling(0.2338, normal), multiplier: Stats.ATK, hits: 2 }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
              multiplier: 1 + sweetDream,
            },
            {
              name: 'Stage 3 DMG',
              value: [{ scaling: calcScaling(0.255, normal), multiplier: Stats.ATK, hits: 3 }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
              multiplier: 1 + sweetDream,
            },
            {
              name: 'Stage 4 DMG',
              value: [{ scaling: calcScaling(0.1242, normal), multiplier: Stats.ATK, hits: 20 }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
              multiplier: 1 + sweetDream,
            },
            {
              name: 'Stage 5 DMG',
              value: [{ scaling: calcScaling(0.2423, normal), multiplier: Stats.ATK, hits: 4 }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
              multiplier: 1 + sweetDream,
            },
          ]
      base.HEAVY_SCALING = form.blossom
        ? [
            {
              name: 'Blazing Waltz DMG',
              value: [{ scaling: calcScaling(0.1104, normal), multiplier: Stats.ATK, hits: 19 }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
              multiplier: 1 + sweetDream,
            },
          ]
        : [
            {
              name: 'Heavy Attack DMG',
              value: [{ scaling: calcScaling(0.4433, normal), multiplier: Stats.ATK, hits: 3 }],
              element: Element.HAVOC,
              property: i.i1 ? TalentProperty.BA : TalentProperty.HA,
            },
          ]
      base.MID_AIR_SCALING = form.blossom
        ? [
            {
              name: 'Vining Ronde DMG',
              value: [{ scaling: calcScaling(0.2664, normal), multiplier: Stats.ATK, hits: 3 }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
              multiplier: 1 + sweetDream,
            },
          ]
        : [
            {
              name: 'Plunging Attack DMG',
              scale: Stats.ATK,
              value: [{ scaling: calcScaling(0.33, normal), multiplier: Stats.ATK, hits: 2 }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
              multiplier: 1 + sweetDream,
            },
          ]
      base.DODGE_SCALING = form.blossom
        ? [
            {
              name: 'Atonement DMG',
              value: [{ scaling: calcScaling(0.57, normal), multiplier: Stats.ATK, hits: 2 }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
              multiplier: 1 + sweetDream,
            },
          ]
        : [
            {
              name: 'Dodge Counter DMG',
              scale: Stats.ATK,
              value: [{ scaling: calcScaling(0.5, normal), multiplier: Stats.ATK, hits: 3 }],
              element: Element.HAVOC,
              property: TalentProperty.BA,
              multiplier: 1 + sweetDream,
            },
          ]
      base.SKILL_SCALING = [
        {
          name: 'Crimson Blossom DMG',
          value: [{ scaling: calcScaling(0.5715, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
          multiplier: 1 + sweetDream,
        },
        {
          name: 'Floral Ravage DMG',
          value: [{ scaling: calcScaling(0.2646, skill), multiplier: Stats.ATK, hits: 5 }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
          multiplier: 1 + sweetDream,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Fervor Efflorescent DMG',
          value: [{ scaling: calcScaling(6.05, lib), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.LIB,
          multiplier: c >= 3 ? 1.5 : 1,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Ephemeral DMG',
          value: [{ scaling: calcScaling(6.35, forte), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.BA,
          multiplier: c >= 2 ? 2.2 : 1,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Everblooming DMG`,
          value: [{ scaling: calcScaling(1, intro), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.INTRO,
          multiplier: c >= 4 ? 4.03 : 1,
        },
      ]
      base.OUTRO_SCALING = [
        {
          name: `Twining DMG`,
          value: [{ scaling: 3.2924, multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.OUTRO,
          multiplier: c >= 4 ? 1.68 : 1,
        },
        {
          name: `Enhanced Twining DMG`,
          value: [
            { scaling: 3.2924, multiplier: Stats.ATK },
            { scaling: 4.5902, multiplier: Stats.ATK },
          ],
          element: Element.HAVOC,
          property: TalentProperty.OUTRO,
          multiplier: c >= 4 ? 1.68 : 1,
        },
      ]

      if (form.budding && c >= 3) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.58,
        })
      }
      if (i.i1) {
        base[Stats.HAVOC_DMG].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (i.i2) {
        base[Stats.BASIC_DMG].push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (form.camellya_c1) {
        base[Stats.CRIT_DMG].push({
          name: `Sequence Node 1`,
          source: 'Self',
          value: 0.28,
        })
      }
      if (form.camellya_c4) {
        base[Stats.BASIC_DMG].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.25,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.camellya_c4) {
        base[Stats.BASIC_DMG].push({
          name: `Sequence Node 4`,
          source: 'Camellya',
          value: 0.25,
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

export default Camellya
