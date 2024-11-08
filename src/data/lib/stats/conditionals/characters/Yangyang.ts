import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Yangyang = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Feather as Blade`,
      content: `<b>Basic Attack</b>
      <br />Yangayang performs up to 4 consecutive attacks, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Yangyang consumes STA to lunge forward, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Heavy Attack: Zephyr Song</b>
      <br />Use Basic Attack after Heavy Attack or Dodge Counter to perform Heavy Attack <b>Zephyr Song</b>, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Yangyang consumes STA to perform a Plunging Attack from mid-air, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to thrust forward, dealing <b class="text-wuwa-aero">Aero DMG</b>.`,
      image: 'SP_IconNorKnife',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Zephyr Domain`,
      content: `Yangyang wields her sword to create a whirling vortex of winds that pulls nearby enemies to the center, dealing <b class="text-wuwa-aero">Aero DMG</b>.`,
      image: 'SP_IconYangyangB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Wind Spirals`,
      content: `Yangyang conjures a mighty Cyclone that pulls nearby enemies, dealing <b class="text-wuwa-aero">Aero DMG</b>.`,
      image: 'SP_IconYangyangC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Echoing Feathers`,
      content: `<b>Heavy Attack: Stormy Strike</b>
      <br />When Yangyang has <span class="text-desc">3</span> <b class="text-teal-200">Melodies</b>, she can cast <b>Stormy Strike</b> after Heavy Attack or Dodge Counter, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Mid-Air Attack: Feather Release</b>
      <br />When Yangyang has <span class="text-desc">3</span> <b class="text-teal-200">Melodies</b>, cast Basic Attack in mid-air to consume all <b class="text-teal-200">Melodies</b> and perform consecutive strikes, diving from mid-air, dealing <b class="text-wuwa-aero">Aero DMG</b>. As Yangyang lands, she sheathes her sword with an attack, dealing <b class="text-wuwa-aero">Aero DMG</b>, considered as Basic Attack DMG.
      <br />
      <br /><b class="text-teal-200">Melody</b>
      <br />Yangyang can hold up to <span class="text-desc">3</span> <b class="text-teal-200">Melodies</b>
      <br />Yangyang obtains <span class="text-desc">1</span> <b class="text-teal-200">Melody</b> with every Basic Attack 4 on hit.
      <br />Yangyang obtains <span class="text-desc">1</span> <b class="text-teal-200">Melody</b> for every Heavy Attack <b>Zephyr Song</b> on hit.
      <br />Yangyang obtains <span class="text-desc">1</span> <b class="text-teal-200">Melody</b> for every Resonance Skill <b>Zephyr Domain</b> on hit.
      <br />Yangyang obtains <span class="text-desc">1</span> <b class="text-teal-200">Melody</b> upon casting Intro Skill <b>Cerulean Song</b>.`,
      image: 'SP_IconYangyangY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Cerulean Song`,
      content: `Yangyang sends the target into the air, dealing <b class="text-wuwa-aero">Aero DMG</b>.`,
      image: 'SP_IconYangyangQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Whispering Breeze`,
      content: `Restore <span class="text-desc">4</span> Resonance Energy per second for <span class="text-desc">5</span>s for the incoming Resonator.`,
      image: 'SP_IconYangyangT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Compassion`,
      content: `Yangyang recovers <span class="text-desc">30</span> STA after she casts a Mid-Air Attack <b>Feather Release</b>.`,
      image: 'SP_IconYangyangD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Lazuline Mercy`,
      content: `Yangyang's <b class="text-wuwa-aero">Aero DMG Bonus</b> is increased by <span class="text-desc">8%</span> for <span class="text-desc">8</span>s after casting Intro Skill <b>Cerulean Song</b>.`,
      image: 'SP_IconYangyangD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Sapphire Skies, Soaring Sparrows`,
      content: `Intro Skill <b>Cerulean Song</b> increases Yangyang's <b class="text-wuwa-aero">Aero DMG Bonus</b> by an additional <span class="text-desc">15%</span> for <span class="text-desc">8</span>s.`,
      image: 'T_IconDevice_YangyangM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Nesting Twigs, in Beaks They Harrow`,
      content: `Heavy Attack recovers an additional <span class="text-desc">10</span> Resonance Energy for Yangyang when it hits a target, which can be triggered <span class="text-desc">1</span> time every <span class="text-desc">20</span>s.`,
      image: 'T_IconDevice_YangyangM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Nature Sings in Symphony`,
      content: `Resonance Skill DMG Bonus is increased by <span class="text-desc">40%</span>. The <b>Wind Field</b>'s pulling effect on surrounding targets is enhanced, and the pulling range is expanded by <span class="text-desc">33%</span>.`,
      image: 'T_IconDevice_YangyangM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Close Your Eyes and Listen in`,
      content: `Mid-Air Attack <b>Feather Release</b>'s damage is increased by <span class="text-desc">95%</span>.`,
      image: 'T_IconDevice_YangyangM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Winds Whisper in Harmony`,
      content: `Resonance Liberation <b>Wind Spirals</b>'s damage is increased by <span class="text-desc">85%</span>.`,
      image: 'T_IconDevice_YangyangM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `A Tribute to Life's Sweet Hymn`,
      content: `After casting Mid-Air Attack <b>Feather Release</b>, the ATK of all team members is increased by <span class="text-desc">20%</span> for <span class="text-desc">20</span>s.`,
      image: 'T_IconDevice_YangyangM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'yangyang_i2',
      text: `I2 Aero DMG Bonus`,
      ...talents.i2,
      show: i.i2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'yangyang_c1',
      text: `S1 Aero DMG Bonus`,
      ...talents.c1,
      show: c >= 1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'yangyang_c6',
      text: `S6 Team ATK Bonus`,
      ...talents.c6,
      show: c >= 6,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'yangyang_c6')]

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
          value: [{ scaling: calcScaling(0.225, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.3, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.2355, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [
            { scaling: calcScaling(0.2986, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.3981, normal), multiplier: Stats.ATK },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.1, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
        {
          name: 'Zephyr Song DMG',
          value: [{ scaling: calcScaling(0.5362, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          value: [{ scaling: calcScaling(0.465, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          value: [{ scaling: calcScaling(0.438, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Zephyr Domain DMG',
          value: [
            { scaling: calcScaling(0.1737, skill), multiplier: Stats.ATK, hits: 4 },
            { scaling: calcScaling(1.0422, skill), multiplier: Stats.ATK },
          ],
          element: Element.AERO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: `Wind Spirals DMG`,
          value: [
            { scaling: calcScaling(0.2343, lib), multiplier: Stats.ATK, hits: 12 },
            { scaling: calcScaling(1.8746, lib), multiplier: Stats.ATK },
          ],
          element: Element.AERO,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: `Stormy Strike DMG`,
          value: [{ scaling: calcScaling(0.1912, forte), multiplier: Stats.ATK, hits: 2 }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
        {
          name: `Feather Release DMG`,
          value: [
            { scaling: calcScaling(0.1093, forte), multiplier: Stats.ATK, hits: 5 },
            { scaling: calcScaling(0.6378, forte), multiplier: Stats.ATK, hits: 2 },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
          bonus: c >= 4 ? 0.95 : 0,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Cerulean Song DMG`,
          value: [{ scaling: calcScaling(0.4, intro), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.INTRO,
        },
      ]

      if (form.yangyang_i2) {
        base[Stats.AERO_DMG].push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: 0.08,
        })
      }
      if (form.yangyang_c1) {
        base[Stats.AERO_DMG].push({
          name: `Sequence Node 1`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (c >= 3) {
        base[Stats.SKILL_DMG].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.4,
        })
      }
      if (c >= 5) {
        base[Stats.LIB_DMG].push({
          name: `Sequence Node 5`,
          source: 'Self',
          value: 0.85,
        })
      }
      if (form.yangyang_c6) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.2,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.yangyang_c6) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 6`,
          source: 'Yangyang',
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

export default Yangyang
