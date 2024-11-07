import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Calcharo = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Gnawing Fangs`,
      content: `<b>Basic Attack</b>
      <br />Calcharo performs up to 4 consecutive attacks, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Consumes STA to attack the target, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Consumes STA to perform a Mid-Air Plunging Attack, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-electro">Electro DMG</b>.`,
      image: 'SP_IconNorSword',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Extermination Order`,
      content: `Calcharo performs up to <span class="text-desc">3</span> consecutive attacks, dealing <b class="text-wuwa-electro">Electro DMG</b>.
      <br />If Calcharo is switched off field, or if Resonance Skill <b>Extermination Order</b> is not activated again in a while, this skill will enter Cooldown.
      <br />Resonance Skill <b>Extermination Order</b> does not interrupt Calcharo's Basic Attack cycle.`,
      image: 'SP_IconKakaluoB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Phantom Etching`,
      content: `Calcharo attacks the target, dealing <b class="text-wuwa-electro">Electro DMG</b> and enters <b class="text-violet-400">Deathblade Gear</b> state. After <b class="text-violet-400">Deathblade Gear</b> state ends, Calcharo's next Intro Skill is replaced with Intro Skill <b>Necessary Means</b>, which deals <b class="text-wuwa-electro">Electro DMG</b>, considered as Intro Skill DMG.
      <br />
      <br /><b class="text-violet-400">Deathblade Gear</b>
      <br />-Basic Attack is replaced with Basic Attack <b>Hounds Roar</b>.
      <br />-Heavy Attack deals increased DMG, considered as Resonance Liberation DMG.
      <br />-Dodge Counter deals increased DMG, considered as Resonance Liberation DMG.
      <br />
      <br /><b>Basic Attack: Hounds Roar</b>
      <br />Calcharo performs up to 5 consecutive attacks, dealing <b class="text-wuwa-electro">Electro DMG</b>, considered as Basic Attack DMG.`,
      image: 'SP_IconKakaluoC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Hunting Mission`,
      content: `<b>Heavy Attack: Mercy</b>
      <br />When Calcharo has <span class="text-desc">3</span> <b class="text-red">Cruelty</b>, his Heavy Attack is replaced with Heavy Attack <b>Mercy</b>.
      <br />When casting Heavy Attack "Mercy", Calcharo consumes <span class="text-desc">3</span> "Cruelty" to deal <b class="text-wuwa-electro">Electro DMG</b>, considered as Heavy Attack DMG, and recovers Resonance Energy and Concerto Energy.
      <br />
      <br /><b class="text-red">Cruelty</b>
      <br />Calcharo can hold up to <span class="text-desc">3</span> <b class="text-red">Cruelty</b>.
      <br />In Resonance Liberation <b class="text-violet-400">Deathblade Gear</b> state, <b class="text-red">Cruelty</b> cannot be acquired.
      <br />When Resonance Skill <b>Extermination Order</b> hits the target, gain <span class="text-desc">1</span> <b class="text-red">Cruelty</b>.
      <br />
      <br /><b>Heavy Attack: Death Messenger</b>
      <br />When Calcharo has <span class="text-desc">5</span> <b class="text-violet-500">Killing Intent</b>, his Basic Attack is replaced with Heavy Attack <b>Death Messenger</b>.
      <br />When casting Heavy Attack <b>Death Messenger</b>, Calcharo consumes <span class="text-desc">5</span> <b class="text-violet-500">Killing Intent</b> to deal <b class="text-wuwa-electro">Electro DMG</b>, considered as Resonance Liberation DMG, and recovers Resonance Energy and Concerto Energy.
      <br />
      <br /><b class="text-violet-500">Killing Intent</b>
      <br />In Resonance Liberation <b class="text-violet-400">Deathblade Gear</b> state, Calcharo's Forte Gauge is replaced with <b class="text-violet-500">Killing Intent</b>, stacking up to <span class="text-desc">5</span>.
      <br />When Basic Attack <b>Hounds Roar</b> hits the target, Calcharo gains <span class="text-desc">1</span> <b class="text-violet-500">Killing Intent</b>.`,
      image: 'SP_IconKakaluoY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Wanted Outlaw`,
      content: `Attack the target, dealing <b class="text-wuwa-electro">Electro DMG</b>.`,
      image: 'SP_IconKakaluoQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Shadowy Raid`,
      content: `Calcharo summons Phantom to support the active Resonator, clearing the targets in front with a slash. The Phantom's attack deals <b class="text-wuwa-electro">Electro DMG</b> equal to <span class="text-desc">195.98%</span>+<span class="text-desc">391.96%</span> of Calcharo's ATK.`,
      image: 'SP_IconKakaluoT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Bloodshed Awaken`,
      content: `When casting Heavy Attack <b>Mercy</b>, Calcharo's Resonance Liberation DMG Bonus is increased by <span class="text-desc">10%</span> for <span class="text-desc">15</span>s.`,
      image: 'SP_IconKakaluoD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Revenant Rush`,
      content: `When Heavy Attack <b>Death Messenger</b> hits the target, the damage taken by Calcharo is reduced by <span class="text-desc">15%</span> for <span class="text-desc">5</span>s.`,
      image: 'SP_IconKakaluoD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Covert Negotiation`,
      content: `When Resonance Skill <b>Extermination Order</b> hits a target, it additionally recovers <span class="text-desc">10</span> Resonance Energy. This can be triggered once every <span class="text-desc">20</span>s.`,
      image: 'T_IconDevice_KakaluoM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Zero-Sum Game`,
      content: `After Calcharo casts Intro Skill <b>Wanted Criminal</b> or Intro Skill <b>Necessary Means</b>, his Resonance Skill DMG Bonus is increased by <span class="text-desc">30%</span> for <span class="text-desc">15</span>s.`,
      image: 'T_IconDevice_KakaluoM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Iron Fist Diplomacy`,
      content: `During the Resonance Liberation <b class="text-violet-400">Deathblade Gear</b> state, Calcharo's <b class="text-wuwa-electro">Electro DMG Bonus</b> is increased by <span class="text-desc">25%</span>.`,
      image: 'T_IconDevice_KakaluoM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Dark Alliance`,
      content: `After casting Outro Skill Shadowy Raid, <b class="text-wuwa-electro">Electro DMG Bonus</b> of all team members is increased by <span class="text-desc">20%</span> for <span class="text-desc">30</span>s.`,
      image: 'T_IconDevice_KakaluoM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Unconventional Compact`,
      content: `Intro Skill <b>Wanted Criminal</b> and Intro Skill <b>Necessary Means</b> deal <span class="text-desc">50%</span> more DMG.`,
      image: 'T_IconDevice_KakaluoM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `The Ultimatum`,
      content: `When casting Resonance Liberation <b>Death Messenger</b>, Calcharo will summon <span class="text-desc">2</span> Phantoms to perform Coordinated Attacks. Each Phantom deals <b class="text-wuwa-electro">Electro DMG</b> equal to <span class="text-desc">100%</span> of Calcharo's ATK, which is considered Resonance Liberation DMG.`,
      image: 'T_IconDevice_KakaluoM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'deathblade',
      text: `Deathblade Gear`,
      ...talents.lib,
      show: true,
      default: true,
      sync: true,
    },
    {
      type: 'toggle',
      id: 'cal_i1',
      text: `I1 Liberation DMG Bonus`,
      ...talents.i1,
      show: i.i1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'cal_c2',
      text: `S2 Skill DMG Bonus`,
      ...talents.c2,
      show: c >= 2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'cal_c4',
      text: `S4 Team ELectro DMG Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'cal_c4')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.BASIC_SCALING = form.deathblade
        ? [
            {
              name: 'Hounds Roar Stage 1 DMG',
              value: [{ scaling: calcScaling(0.443, lib), multiplier: Stats.ATK }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Hounds Roar Stage 2 DMG',
              value: [
                { scaling: calcScaling(0.1772, lib), multiplier: Stats.ATK, hits: 2 },
                { scaling: calcScaling(0.2658, lib), multiplier: Stats.ATK, hits: 2 },
              ],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Hounds Roar Stage 3 DMG',
              value: [{ scaling: calcScaling(0.8241, lib), multiplier: Stats.ATK }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Hounds Roar Stage 4 DMG',
              value: [{ scaling: calcScaling(0.1782, lib), multiplier: Stats.ATK, hits: 6 }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Hounds Roar Stage 5 DMG',
              value: [{ scaling: calcScaling(0.7554, lib), multiplier: Stats.ATK, hits: 2 }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
          ]
        : [
            {
              name: 'Stage 1 DMG',
              value: [{ scaling: calcScaling(0.23, normal), multiplier: Stats.ATK, hits: 2 }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 2 DMG',
              value: [{ scaling: calcScaling(0.5, normal), multiplier: Stats.ATK }],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 3 DMG',
              value: [
                { scaling: calcScaling(0.4284, normal), multiplier: Stats.ATK },
                { scaling: calcScaling(0.2142, normal), multiplier: Stats.ATK, hits: 3 },
              ],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 4 DMG',
              value: [
                { scaling: calcScaling(0.3999, normal), multiplier: Stats.ATK, hits: 2 },
                { scaling: calcScaling(0.5332, normal), multiplier: Stats.ATK },
              ],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
          ]
      base.HEAVY_SCALING = form.deathblade
        ? [
            {
              name: 'Heavy Attack DMG',
              value: [{ scaling: calcScaling(0.312, lib), multiplier: Stats.ATK, hits: 5 }],
              element: Element.ELECTRO,
              property: TalentProperty.LIB,
            },
          ]
        : [
            {
              name: 'Heavy Attack DMG',
              value: [{ scaling: calcScaling(0.208, normal), multiplier: Stats.ATK, hits: 5 }],
              element: Element.ELECTRO,
              property: TalentProperty.HA,
            },
          ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          value: [{ scaling: calcScaling(0.62, normal), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = form.deathblade
        ? [
            {
              name: 'Heavy Attack DMG',
              value: [{ scaling: calcScaling(0.2867, lib), multiplier: Stats.ATK, hits: 6 }],
              element: Element.ELECTRO,
              property: TalentProperty.LIB,
            },
          ]
        : [
            {
              name: 'Dodge Counter DMG',
              value: [
                { scaling: calcScaling(0.3344, normal), multiplier: Stats.ATK, hits: 5 },
                { scaling: calcScaling(0.4299, normal), multiplier: Stats.ATK },
              ],
              element: Element.ELECTRO,
              property: TalentProperty.BA,
            },
          ]
      base.SKILL_SCALING = [
        {
          name: 'Extermination Order Stage 1 DMG',
          value: [
            { scaling: calcScaling(0.2594, skill), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.3459, skill), multiplier: Stats.ATK },
          ],
          element: Element.ELECTRO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Extermination Order Stage 2 DMG',
          value: [
            { scaling: calcScaling(0.3891, skill), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.5188, skill), multiplier: Stats.ATK },
          ],
          element: Element.ELECTRO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Extermination Order Stage 3 DMG',
          value: [{ scaling: calcScaling(1.0808, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.ELECTRO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Phantom Etching DMG',
          value: [{ scaling: calcScaling(3, lib), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.LIB,
        },
        {
          name: 'Necessary Means DMG',
          value: [{ scaling: calcScaling(1, lib), multiplier: Stats.ATK, hits: 2 }],
          element: Element.ELECTRO,
          property: TalentProperty.INTRO,
          bonus: c >= 5 ? 0.5 : 0,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Mercy DMG',
          value: [
            { scaling: calcScaling(0.1967, forte), multiplier: Stats.ATK, hits: 8 },
            { scaling: calcScaling(0.3934, forte), multiplier: Stats.ATK },
          ],
          element: Element.ELECTRO,
          property: TalentProperty.HA,
        },
        {
          name: 'Death Messenger DMG',
          value: [
            { scaling: calcScaling(0.4918, forte), multiplier: Stats.ATK, hits: 8 },
            { scaling: calcScaling(0.9835, forte), multiplier: Stats.ATK },
          ],
          element: Element.ELECTRO,
          property: TalentProperty.HA,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Grand Entrance DMG`,
          value: [
            { scaling: calcScaling(0.2, intro), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.3, intro), multiplier: Stats.ATK, hits: 2 },
          ],
          element: Element.ELECTRO,
          property: TalentProperty.INTRO,
          bonus: c >= 5 ? 0.5 : 0,
        },
      ]
      base.OUTRO_SCALING = [
        {
          name: `Phantom DMG`,
          value: [
            { scaling: calcScaling(1.9598, intro), multiplier: Stats.ATK },
            { scaling: calcScaling(3.9196, intro), multiplier: Stats.ATK },
          ],
          element: Element.ELECTRO,
          property: TalentProperty.OUTRO,
        },
      ]

      if (form.cal_i1) {
        base[Stats.LIB_DMG].push({
          name: `Inherent Skill 1`,
          source: 'Self',
          value: 0.1,
        })
      }
      if (form.cal_c2) {
        base[Stats.SKILL_DMG].push({
          name: `Sequence Node 2`,
          source: 'Self',
          value: 0.3,
        })
      }
      if (c >= 3 && form.deathblade) {
        base[Stats.ELECTRO_DMG].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.25,
        })
      }
      if (form.cal_c4) {
        base[Stats.ELECTRO_DMG].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (c >= 6) {
        base.LIB_SCALING.push({
          name: `S6 Phantom DMG`,
          value: [{ scaling: 1, multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.LIB,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.cal_c4) {
        base[Stats.ELECTRO_DMG].push({
          name: `Sequence Node 4`,
          source: 'Calcharo',
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

export default Calcharo
