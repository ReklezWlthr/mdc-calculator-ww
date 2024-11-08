import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Lingyang = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Majestic Fists`,
      content: `<b>Basic Attack</b>
      <br />Lingyang performs up to 5 consecutive attacks, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Basic Attack: Feral Roars</b>
      <br />After Resonance Skill <b>Furious Punches</b> is cast, Basic Attack 5 is replaced with <b>Feral Roars</b>, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Lingyang consumes STA to attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Lingyang consumes STA to perform a Mid-air Plunging Attack, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.`,
      image: 'SP_IconNorFist',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Ancient Arts`,
      content: `<b>Ancient Arts</b>
      <br />Attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Furious Punches</b>
      <br />When Basic Attacks 3, 4, or 5 or Basic Attack <b>Feral Roars</b> hits the target, Resonance Skill <b>Ancient Arts</b> is replaced with Resonance Skill <b>Furious Punches</b>.
      <br />Lingyang's Basic Attack cycle starts from Basic Attack 3 after casting Basic Attack <b>Feral Roars</b> and Resonance Skill <b>Furious Punches</b> in turn.
      <br />
      <br />Lingyang's Resonance Skill does not reset his Basic Attack cycle.`,
      image: 'SP_IconLingyangB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Strive: Lion's Vigor`,
      content: `Attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b>, and receive the blessing of <b class="text-wuwa-glacio">Lion's Vigor</b>.
      <br />
      <br /><b class="text-wuwa-glacio">Lion's Vigor</b>
      <br />Lingyang's <b class="text-wuwa-glacio">Glacio DMG Bonus</b> is increased by <span class="text-desc">50%</span>.`,
      image: 'SP_IconLingyangC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Unification of Spirits`,
      content: `<b>Heavy Attack: Glorious Plunge</b>
      <br />When <b class="text-sky-300">Lion's Spirit</b> is full, use Heavy Attack to perform <b>Glorious Plunge</b>, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Mid-Air Attack: Tail Strike</b>
      <br />When <b class="text-sky-300">Lion's Spirit</b> is not full, use Basic Attack after Heavy Attack to perform <b>Tail Strike</b>, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b class="text-desc">Striding Lion</b>
      <br />After casting Heavy Attack <b>Glorious Plunge</b>, enter <b class="text-desc">Striding Lion</b> state;
      <br />After casting Intro Skill <b>Lion Awakens</b> or Resonance Liberation <b>Strive: Lion's Vigor</b>, if <b class="text-sky-300">Lion's Spirit</b> is full, use Basic Attack to enter <b class="text-desc">Striding Lion</b> state.
      <br />In the <b class="text-desc">Striding Lion</b> state:
      <br />-Attacks can be launched in mid-air. If Lingyang is on the ground, use Heavy Attack <b>Glorious Plunge</b> to get back in the air.
      <br />-<b class="text-sky-300">Lion's Spirit</b> is continuously consumed before running out in <span class="text-desc">5</span>s, and when it runs out, <b class="text-desc">Striding Lion</b> ends;
      <br />-If Lingyang is in the Resonance Liberation <b class="text-wuwa-glacio">Lion's Vigor</b> state, the consumption speed of <b class="text-sky-300">Lion's Spirit</b> is reduced by <span class="text-desc">50%</span>, extending <b class="text-desc">Striding Lion</b> state by up to <span class="text-desc">10</span>s.
      <br />-Lingyang's Basic Attack is replaced with Basic Attack <b>Feral Gyrate</b>, which performs up to 2 consecutive attacks, dealing <b class="text-wuwa-glacio">Glacio DMG</b>;
      <br />-Lingyang's Resonance Skill is replaced with <b>Mountain Roamer</b>, dealing <b class="text-wuwa-glacio">Glacio DMG</b>;
      <br />-When <b class="text-sky-300">Lion's Spirit</b> is less than <span class="text-desc">10</span>, use Basic Attack to perform <b>Stormy Kicks</b>, dealing <b class="text-wuwa-glacio">Glacio DMG</b>; after performing Basic Attack <b>Stormy Kicks</b>, the Mid-Air Attack <b>Tail Strike</b> becomes available.
      <br />-Concerto Energy is restored when <b class="text-sky-300">Lion's Spirit</b> is consumed.
      <br />
      <br /><b class="text-sky-300">Lion's Spirit</b>
      <br />Lingyang can hold up to <span class="text-desc">100</span> <b class="text-sky-300">Lion's Spirit</b>.
      <br />When casting Resonance Skill <b>Furious Punches</b>, <b class="text-sky-300">Lion's Spirit</b> is restored.
      <br />When casting Intro Skill <b>Lion Awakens</b>, <b class="text-sky-300">Lion's Spirit</b> is restored.
      <br />When casting Resonance Liberation <b>Strive: Lion's Vigor</b>, <b class="text-sky-300">Lion's Spirit</b> is restored.`,
      image: 'SP_IconLingyangY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Lion Awakens`,
      content: `Lingyang enters the battlefield, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.`,
      image: 'SP_IconLingyangQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Frosty Marks`,
      content: `Lingyang releases a shock wave centered on the skill target, dealing <b class="text-wuwa-glacio">Glacio DMG</b> equal to <span class="text-desc">587.94%</span> of Lingyang's ATK to targets within the range.`,
      image: 'SP_IconLingyangT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Lion's Pride`,
      content: `DMG of the Intro Skill <b>Lion Awakens</b> is increased by <span class="text-desc">50%</span>.`,
      image: 'SP_IconLingyangD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Diligent Practice`,
      content: `Under the Forte Circuit <b class="text-desc">Striding Lion</b> state, within 3s after each Basic Attack, the next Forte Circuit <b>Mountain Roamer</b> will deal an additional <b class="text-wuwa-glacio">Glacio DMG</b>, equal to <span class="text-desc">150%</span> of <b>Mountain Roamer</b> DMG, considered as Resonance Skill DMG.`,
      image: 'SP_IconLingyangD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Lion of Light, Blessings Abound`,
      content: `During Resonance Liberation <b>Lion's Vigor</b>, Lingyang's Anti-Interruption is enhanced.`,
      image: 'T_IconDevice_LingyangM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Dominant and Fierce, Power Unbound`,
      content: `Intro Skill <b>Lion Awakens</b> additionally recovers <span class="text-desc">10</span> Resonance Energy for Lingyang, triggered once every <span class="text-desc">20</span>s.`,
      image: 'T_IconDevice_LingyangM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Jaw-Dropping Feats, Loud and Wide`,
      content: `During Resonance Liberation <b class="text-wuwa-glacio">Lion's Vigor</b>, Lingyang's Basic Attack DMG Bonus is increased by <span class="text-desc">20%</span>, and Resonance Skill DMG Bonus increased by <span class="text-desc">10%</span>.`,
      image: 'T_IconDevice_LingyangM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Immortals Bow, in Reverence Flawed`,
      content: `Outro Skill <b>Frosty Marks</b> increases the <b class="text-wuwa-glacio">Glacio DMG Bonus</b> of all team members by <span class="text-desc">20%</span> for <span class="text-desc">30</span>s.`,
      image: 'T_IconDevice_LingyangM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Seven Stars Shine, Stepped upon High`,
      content: `Resonance Liberation <b>Strive: Lion's Vigor</b> additionally deals <b class="text-wuwa-glacio">Glacio DMG</b> equal to <span class="text-desc">200%</span> of Lingyang's ATK.`,
      image: 'T_IconDevice_LingyangM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Demons Tremble, Divine Power Nigh`,
      content: `In the Forte Circuit <b class="text-desc">Striding Lion</b> state, during the first <span class="text-desc">3</span>s after every Resonance Skill <b>Mountain Roamer</b>, the Basic Attack DMG Bonus for Lingyang's next Basic Attack is increased by <span class="text-desc">100%</span>.`,
      image: 'T_IconDevice_LingyangM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'lion_vigor',
      text: `Lion's Vigor`,
      ...talents.lib,
      show: true,
      default: true,
    },
    {
      type: 'toggle',
      id: 'striding_lion',
      text: `Striding Lion`,
      ...talents.forte,
      show: true,
      default: true,
      sync: true,
    },
    {
      type: 'toggle',
      id: 'lingyang_c4',
      text: `S4 Team Glacio DMG Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'toggle',
      id: 'lingyang_c6',
      text: `S6 Basic ATK Bonus`,
      ...talents.c6,
      show: c >= 6,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'lingyang_c4')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.BASIC_SCALING = form.striding_lion
        ? [
            {
              name: `Feral Gyrate Stage 1 DMG`,
              value: [
                { scaling: calcScaling(0.438, forte), multiplier: Stats.ATK, hits: 2 },
                { scaling: calcScaling(0.584, forte), multiplier: Stats.ATK },
              ],
              element: Element.GLACIO,
              property: TalentProperty.BA,
            },
            {
              name: `Feral Gyrate Stage 2 DMG`,
              value: [{ scaling: calcScaling(0.1598, forte), multiplier: Stats.ATK, hits: 6 }],
              element: Element.GLACIO,
              property: TalentProperty.BA,
            },
            {
              name: `Stormy Kicks DMG`,
              value: [
                { scaling: calcScaling(0.1838, forte), multiplier: Stats.ATK, hits: 8 },
                { scaling: calcScaling(0.9665, forte), multiplier: Stats.ATK },
              ],
              element: Element.GLACIO,
              property: TalentProperty.BA,
            },
          ]
        : [
            {
              name: 'Stage 1 DMG',
              value: [{ scaling: calcScaling(0.3, normal), multiplier: Stats.ATK }],
              element: Element.GLACIO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 2 DMG',
              value: [{ scaling: calcScaling(0.4, normal), multiplier: Stats.ATK }],
              element: Element.GLACIO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 3 DMG',
              value: [{ scaling: calcScaling(0.3665, normal), multiplier: Stats.ATK, hits: 2 }],
              element: Element.GLACIO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 4 DMG',
              value: [
                { scaling: calcScaling(0.1027, normal), multiplier: Stats.ATK, hits: 5 },
                { scaling: calcScaling(0.2199, normal), multiplier: Stats.ATK },
              ],
              element: Element.GLACIO,
              property: TalentProperty.BA,
            },
            {
              name: 'Stage 5 DMG',
              value: [{ scaling: calcScaling(0.767, normal), multiplier: Stats.ATK }],
              element: Element.GLACIO,
              property: TalentProperty.BA,
            },
            {
              name: 'Feral Roars DMG',
              value: [{ scaling: calcScaling(0.4, normal), multiplier: Stats.ATK, hits: 2 }],
              element: Element.GLACIO,
              property: TalentProperty.BA,
            },
          ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.733, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          value: [{ scaling: calcScaling(0.62, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          value: [{ scaling: calcScaling(0.634, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = form.striding_lion
        ? [
            {
              name: `Mountain Roamer DMG`,
              value: [{ scaling: calcScaling(0.4169, forte), multiplier: Stats.ATK, hits: 2 }],
              element: Element.GLACIO,
              property: TalentProperty.SKILL,
            },
            ...(i.i2
              ? [
                  {
                    name: `Enhanced Mountain Roamer DMG`,
                    value: [
                      { scaling: calcScaling(0.4169, forte), multiplier: Stats.ATK, hits: 2 },
                      { scaling: calcScaling(0.4169, forte) * 1.5, multiplier: Stats.ATK, hits: 2 },
                    ],
                    element: Element.GLACIO,
                    property: TalentProperty.SKILL,
                  },
                ]
              : []),
          ]
        : [
            {
              name: 'Ancient Arts DMG',
              value: [{ scaling: calcScaling(0.667, skill), multiplier: Stats.ATK }],
              element: Element.GLACIO,
              property: TalentProperty.SKILL,
            },
            {
              name: 'Furious Punches DMG',
              value: [{ scaling: calcScaling(0.3835, skill), multiplier: Stats.ATK, hits: 2 }],
              element: Element.GLACIO,
              property: TalentProperty.SKILL,
            },
          ]
      base.LIB_SCALING = [
        {
          name: `Strive: Lion's Vigor DMG`,
          value: [
            { scaling: calcScaling(2, lib), multiplier: Stats.ATK },
            ...(c >= 5 ? [{ scaling: 2, multiplier: Stats.ATK }] : []),
          ],
          element: Element.GLACIO,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: `Glorious Plunge DMG`,
          value: [{ scaling: calcScaling(0.867, forte), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.HA,
        },
        {
          name: `Tail Strike DMG`,
          value: [{ scaling: calcScaling(0.88, forte), multiplier: Stats.ATK, hits: 2 }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Lion Awakens DMG`,
          value: [{ scaling: calcScaling(0.5, intro), multiplier: Stats.ATK, hits: 2 }],
          element: Element.GLACIO,
          property: TalentProperty.INTRO,
          bonus: i.i1 ? 0.5 : 0,
        },
      ]
      base.OUTRO_SCALING = [
        {
          name: `Frosty Marks DMG`,
          value: [{ scaling: 5.8794, multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.OUTRO,
        },
      ]

      if (form.lion_vigor) {
        base[Stats.GLACIO_DMG].push({
          name: `Lion's Vigor`,
          source: 'Self',
          value: 0.5,
        })
        if (c >= 3) {
          base[Stats.BASIC_DMG].push({
            name: `Sequence Node 3`,
            source: 'Self',
            value: 0.2,
          })
          base[Stats.SKILL_DMG].push({
            name: `Sequence Node 3`,
            source: 'Self',
            value: 0.1,
          })
        }
      }
      if (form.lingyang_c4) {
        base[Stats.GLACIO_DMG].push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.2,
        })
      }
      if (form.lingyang_c6) {
        base[Stats.BASIC_DMG].push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 1,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.lingyang_c4) {
        base[Stats.GLACIO_DMG].push({
          name: `Sequence Node 4`,
          source: 'Lingyang',
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

export default Lingyang
