import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Jinhsi = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const incarnation = `<b class="text-wuwa-spectro">Incarnation</b>
      <br />While in <b class="text-wuwa-spectro">Incarnation</b>:
      <br />- Alternative Basic Attack <b>Incarnation - Basic Attack</b> becomes available. Perform up to 4 consecutive strikes, dealing <b class="text-wuwa-spectro">Spectro DMG</b> considered as Resonance Skill DMG. The basic attack cycle of this will not be reset. Can be cast in mid-air.
      <br />- Alternative Resonance Skill <b>Crescent Divinity</b> becomes available. Deal <b class="text-wuwa-spectro">Spectro DMG</b>. Can be cast in mid-air.
      <br />- Alternative Heavy Attack <b>Incarnation - Heavy Attack</b> becomes available. Attack the target in mid-air at the cost of Stamina, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />- Alternative Dodge <b>Incarnation - Dodge</b> is available while in mid-air. Can be cast multiple times at the cost of Stamina.
      <br />- Alternative Dodge Counter <b>Incarnation - Dodge Counter</b> becomes available. Deal <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />Can be cast in mid-air.`
  const incandescence = `<b class="text-amber-200">Incandescence</b>
      <br />Jinhsi can hold up to <span class="text-desc">50</span> <b class="text-amber-200">Incandescence</b>.
      <br />When Jinhsi is in the party, all nearby Resonators in the party gain <b>Eras in Unity</b>.
      <br /><b>Eras in Unity</b> provides <span class="text-desc">2</span> independent effects:
      <br />Jinhsi gains <span class="text-desc">1</span> <b class="text-amber-200">Incandescence</b> anytime Resonators in the party inflict <b>Attribute DMG</b>. This effect may be triggered by damage of the same Attribute for up to <span class="text-desc">1</span> time(s) every <span class="text-desc">3</span>s. Additionally, Jinhsi gains <span class="text-desc">2</span> <b class="text-amber-200">Incandescence</b> when Resonators in the party damage the enemy with Coordinated Attacks. This effect may be triggered by Coordinated Attacks of the same Attribute for up to <span class="text-desc">1</span> time(s) every <span class="text-desc">3</span>s.`

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Slash of Breaking Dawn`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 4 consecutive strikes, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Perform a charged attack at the cost of STA, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Perform a Plunging Attack while in mid-air at the cost of STA, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to counterattack, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      `,
      image: 'SP_IconNorSword',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Trailing Lights of Eons`,
      content: `Dash forward and perform consecutive strikes that inflict Spectro DMG.
      <br />
      <br /><b>Overflowing Radiance</b>
      <br />After Jinhsi uses <b>Basic Attack 4</b> or, while not in <b class="text-wuwa-spectro">Incarnation</b>, Intro Skill <b>Loong's Halo</b>, an alternative Resonance Skill <b>Overflowing Radiance</b> is available within <span class="text-desc">5</span>s.
      <br />Resonance Skill <b>Overflowing Radiance</b> inflicts <b class="text-wuwa-spectro">Spectro DMG</b> and sends Jinhsi into <b class="text-wuwa-spectro">Incarnation</b>.
      <br />Can be cast in mid-air.
      `,
      image: 'SP_IconJinxiB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Purge of Light`,
      content: `Unleash the power of invocation to deal <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />Can be cast in mid-air.
      `,
      image: 'SP_IconJinxiC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Luminal Synthesis`,
      content: `${incarnation}
      <br />
      <br /><b>Resonance Skill - Illuminous Epiphany</b>
      <br />After Stage 4 of <b>Incarnation - Basic Attack</b>, <b class="text-wuwa-spectro">Incarnation</b> terminates and Jinhsi gains <b>Ordination Glow</b>.
      <br />Can be cast in mid-air.
      <br />While <b>Ordination Glow</b> lasts:
      <br />- Basic Attack is replaced with Heavy Attack <b>Incarnation - Heavy Attack</b>. Attack the target in mid-air at the cost of Stamina, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />- Resonance Skill is replaced with Resonance Skill <b>Illuminous Epiphany</b>. Send out <b>Solar Flare</b> that detonates as <b>Stella Glamor</b>, dealing <b class="text-wuwa-spectro">Spectro DMG</b> after a short delay. Consume up to <span class="text-desc">50</span> <b class="text-amber-200">Incandescence</b>, with each point of <b class="text-amber-200">Incandescence</b> granting bonus DMG Multiplier percentage to <b>Stella Glamor</b>.
      <br />Can be cast in mid-air.
      <br />- After casting Resonance Skill <b>Illuminous Epiphany</b>, Jinhsi gains <b class="text-amber-600">Unison</b>. This can be triggered once every <span class="text-desc">25</span>s.
      <br />
      <br /><b class="text-amber-600">Unison</b>
      <br />While Jinhsi has <b class="text-amber-600">Unison</b>, switching to other Resonators will remove Jinhsi's <b class="text-amber-600">Unison</b> to trigger Jinhsi's Outro Skill and the incoming Resonator's Intro Skill. <b class="text-amber-600">Unison</b> will be consumed in priority in place of Concerto Energy when Concerto Energy is full.
      <br />
      <br />${incandescence}
      `,
      image: 'SP_IconJinxiY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Loong's Halo`,
      content: `Attack the target, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      `,
      image: 'SP_IconJinxiQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Temporal Bender`,
      content: `Summoning the power homologous with the Sentinel, Jinhsi may now gain <b class="text-amber-200">Incandescence</b> via <b>Eras in Unity</b> from damage of the same Attribute more effectively, at <span class="text-desc">1</span> time(s) every <span class="text-desc">1</span>s for <span class="text-desc">20</span>s.
      `,
      image: 'SP_IconJinxiT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Radiant Surge`,
      content: `Jinhsi's <b class="text-wuwa-spectro">Spectro DMG Bonus</b> is increased by <span class="text-desc">20%</span>.`,
      image: 'SP_IconJinxiD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Converged Flash`,
      content: `DMG Multiplier of Intro Skill <b>Loong's Halo</b> is increased by <span class="text-desc">50%</span>.`,
      image: 'SP_IconJinxiD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Abyssal Ascension`,
      content: `When casting Basic Attack <b>Incarnation - Basic Attack</b> or Resonance Skill <b>Crescent Divinity</b>, Jinhsi gains <span class="text-desc">1</span> stack of <b class="text-desc">Herald of Revival</b>, stacking up to <span class="text-desc">4</span> times and lasting for <span class="text-desc">6</span>s. When casting Resonance Skill <b>Illuminous Epiphany</b>, Jinhsi consumes all stacks of <b class="text-desc">Herald of Revival</b>. Each stack increases the damage of Resonance Skill <b>Illuminous Epiphany</b> by <span class="text-desc">20%</span>.`,
      image: 'T_IconDevice_JinxiM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Chronofrost Repose`,
      content: `Jinhsi restores <span class="text-desc">50</span> <b class="text-amber-200">Incandescence</b> while staying out of combat for more than <span class="text-desc">4</span>s. This effect can only be triggered <span class="text-desc">1</span> time(s) every <span class="text-desc">4</span>s.`,
      image: 'T_IconDevice_JinxiM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Celestial Incarnate`,
      content: `Jinhsi gains <span class="text-desc">1</span> stack of <b class="text-desc">Immortal's Descendancy</b> after casting Intro Skill <b>Loong's Halo</b>. Each stack of <b class="text-desc">Immortal's Descendancy</b> increases Jinhsi's ATK by <span class="text-desc">25%</span>, stacking up to <span class="text-desc">2</span> time(s) and lasting for <span class="text-desc">20</span>s.`,
      image: 'T_IconDevice_JinxiM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Benevolent Grace`,
      content: `When Jinhsi casts Resonance Liberation <b>Purge of Light</b> or Resonance Skill <b>Illuminous Epiphany</b>, all nearby Resonators on the team gain <span class="text-desc">20%</span> <b>Attribute DMG Bonus</b> for <span class="text-desc">20</span>s.`,
      image: 'T_IconDevice_JinxiM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Frostfire Illumination`,
      content: `The DMG Multiplier of Resonance Liberation <b>Purge of Light</b> is increased by <span class="text-desc">120%</span>.`,
      image: 'T_IconDevice_JinxiM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Thawing Triumph`,
      content: `The DMG Multiplier of Resonance Skill <b>Illuminous Epiphany</b> is increased by <span class="text-desc">45%</span> and the additional DMG Multiplier gained by consuming <b class="text-amber-200">Incandescence</b> is increased by <span class="text-desc">45%</span>.`,
      image: 'T_IconDevice_JinxiM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'incarnation',
      text: `Incarnation`,
      ...talents.forte,
      content: incarnation,
      show: true,
      default: true,
      sync: true,
    },
    {
      type: 'number',
      id: 'incandescence',
      text: `Incandescence`,
      ...talents.forte,
      content: incandescence,
      show: true,
      default: 0,
      min: 0,
      max: 50,
    },
    {
      type: 'number',
      id: 'jinhsi_c1',
      text: `Herald of Revival`,
      ...talents.c1,
      show: c >= 1,
      default: 4,
      min: 0,
      max: 4,
    },
    {
      type: 'number',
      id: 'jinhsi_c3',
      text: `Immortal's Descendancy`,
      ...talents.c3,
      show: c >= 3,
      default: 2,
      min: 0,
      max: 2,
    },
    {
      type: 'toggle',
      id: 'jinhsi_c4',
      text: `S4 Team DMG Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'jinhsi_c4')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.BASIC_SCALING = form.incarnation
        ? [
            {
              name: 'Incarnation - Basic Attack 1 DMG',
              value: [{ scaling: calcScaling(0.4458, forte), multiplier: Stats.ATK }],
              element: Element.SPECTRO,
              property: TalentProperty.SKILL,
            },
            {
              name: 'Incarnation - Basic Attack 2 DMG',
              value: [
                { scaling: calcScaling(0.3922, forte), multiplier: Stats.ATK },
                { scaling: calcScaling(0.1308, forte), multiplier: Stats.ATK, hits: 2 },
              ],
              element: Element.SPECTRO,
              property: TalentProperty.SKILL,
            },
            {
              name: 'Incarnation - Basic Attack 3 DMG',
              value: [
                { scaling: calcScaling(0.5002, forte), multiplier: Stats.ATK },
                { scaling: calcScaling(0.3335, forte), multiplier: Stats.ATK },
              ],
              element: Element.SPECTRO,
              property: TalentProperty.SKILL,
            },
            {
              name: 'Incarnation - Basic Attack 4 DMG',
              value: [
                { scaling: calcScaling(0.0939, forte), multiplier: Stats.ATK, hits: 6 },
                { scaling: calcScaling(0.3756, forte), multiplier: Stats.ATK },
              ],
              element: Element.SPECTRO,
              property: TalentProperty.SKILL,
            },
          ]
        : [
            {
              name: 'Stage 1 DMG',
              value: [{ scaling: calcScaling(0.3343, normal), multiplier: Stats.ATK }],
              element: Element.SPECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 2 DMG',
              value: [{ scaling: calcScaling(0.55048, normal), multiplier: Stats.ATK }],
              element: Element.SPECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 3 DMG',
              value: [{ scaling: calcScaling(0.65816, normal), multiplier: Stats.ATK }],
              element: Element.SPECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 4 DMG',
              value: [{ scaling: calcScaling(0.86027, normal), multiplier: Stats.ATK }],
              element: Element.SPECTRO,
              property: TalentProperty.BA,
            },
          ]
      base.HEAVY_SCALING = form.incarnation
        ? [
            {
              name: 'Incarnation - Heavy Attack DMG',
              value: [
                { scaling: calcScaling(0.24, forte), multiplier: Stats.ATK },
                { scaling: calcScaling(0.56, forte), multiplier: Stats.ATK },
              ],
              element: Element.SPECTRO,
              property: TalentProperty.HA,
            },
          ]
        : [
            {
              name: 'Heavy Attack DMG',
              value: [
                { scaling: calcScaling(0.12, normal), multiplier: Stats.ATK, hits: 5 },
                { scaling: calcScaling(0.18, normal), multiplier: Stats.ATK },
                { scaling: calcScaling(0.42, normal), multiplier: Stats.ATK },
              ],
              element: Element.SPECTRO,
              property: TalentProperty.HA,
            },
          ]
      base.MID_AIR_SCALING = form.incarnation
        ? []
        : [
            {
              name: 'Mid-Air Attack DMG',
              scale: Stats.ATK,
              value: [
                { scaling: calcScaling(0.062, normal), multiplier: Stats.ATK },
                { scaling: calcScaling(0.124, normal), multiplier: Stats.ATK },
                { scaling: calcScaling(0.434, normal), multiplier: Stats.ATK },
              ],
              element: Element.SPECTRO,
              property: TalentProperty.BA,
            },
          ]
      base.DODGE_SCALING = form.incarnation
        ? [
            {
              name: 'Incarnation - Dodge Counter DMG',
              scale: Stats.ATK,
              value: [
                { scaling: calcScaling(0.2208, forte), multiplier: Stats.ATK },
                { scaling: calcScaling(0.1656, forte), multiplier: Stats.ATK, hits: 2 },
                { scaling: calcScaling(0.5519, forte), multiplier: Stats.ATK },
              ],
              element: Element.SPECTRO,
              property: TalentProperty.BA,
            },
          ]
        : [
            {
              name: 'Dodge Counter DMG',
              scale: Stats.ATK,
              value: [
                { scaling: calcScaling(0.0738, normal), multiplier: Stats.ATK, hits: 7 },
                { scaling: calcScaling(0.2214, normal), multiplier: Stats.ATK },
              ],
              element: Element.SPECTRO,
              property: TalentProperty.BA,
            },
          ]
      base.SKILL_SCALING = [
        {
          name: 'Trailing Lights of Eons DMG',
          value: [
            { scaling: calcScaling(0.0979, skill), multiplier: Stats.ATK, hits: 4 },
            { scaling: calcScaling(0.3915, skill), multiplier: Stats.ATK },
          ],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Overflowing Radiance DMG',
          value: [
            { scaling: calcScaling(0.0496, skill), multiplier: Stats.ATK, hits: 4 },
            { scaling: calcScaling(0.1488, skill), multiplier: Stats.ATK, hits: 4 },
            { scaling: calcScaling(0.1984, skill), multiplier: Stats.ATK },
          ],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Purge of Light DMG',
          value: [
            { scaling: calcScaling(2.514, lib), multiplier: Stats.ATK },
            { scaling: calcScaling(5.866, lib), multiplier: Stats.ATK },
          ],
          multiplier: c >= 5 ? 2.2 : 1,
          element: Element.SPECTRO,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Crescent Divinity DMG',
          value: [
            { scaling: calcScaling(0.5068, forte), multiplier: Stats.ATK },
            { scaling: calcScaling(0.3801, forte), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(1.267, forte), multiplier: Stats.ATK },
          ],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Solar Flare DMG',
          value: [{ scaling: calcScaling(0.1, forte), multiplier: Stats.ATK, hits: 6 }],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
          multiplier: c >= 6 ? 1.45 : 1,
          bonus: form.jinhsi_c1 ? 0.2 * form.jinhsi_c1 : 0,
        },
        {
          name: 'Stella Glamor DMG',
          value: [
            { scaling: calcScaling(1.75, forte), multiplier: Stats.ATK },
            ...(form.incandescence
              ? [
                  {
                    scaling: calcScaling(0.224, forte) * form.incandescence,
                    multiplier: Stats.ATK,
                  },
                ]
              : []),
          ],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
          bonus: form.jinhsi_c1 ? 0.2 * form.jinhsi_c1 : 0,
          multiplier: c >= 6 ? 1.45 : 1,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Loong's Halo DMG`,
          value: [{ scaling: calcScaling(0.8, intro), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.INTRO,
          multiplier: i.i2 ? 1.5 : 1,
        },
      ]

      if (i.i1) {
        base[Stats.SPECTRO_DMG].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (form.jinhsi_c3) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.25 * form.jinhsi_c3,
        })
      }
      if (form.jinhsi_c4) {
        base[Stats.ATTR_DMG].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.2,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.jinhsi_c4) {
        base[Stats.ATTR_DMG].push({
          name: `Sequence Node 4`,
          source: 'Jinhsi',
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

export default Jinhsi
