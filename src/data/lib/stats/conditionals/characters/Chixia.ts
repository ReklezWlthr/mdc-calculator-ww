import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Chixia = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `POW POW`,
      content: `<b>Basic Attack</b>
      <br />Chixia fires up to 4 consecutive shots, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Chixia enters the aiming state for a more powerful shot.
      <br />The aimed shot fired after charging finishes deals <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Chixia consumes STA to perform consecutive shots at the target in mid-air, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.`,
      image: 'SP_IconNorGun',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Whizzing Fight Spirit`,
      content: `Chixia unleashes a flurry of shots, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Whizzing Fight Spirit</b> has <span class="text-desc">2</span> initial charges.`,
      image: 'SP_IconMaxiaofangB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Blazing Flames`,
      content: `Chixia fires up fast shots at nearby enemies, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.`,
      image: 'SP_IconMaxiaofangC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Heroic Bullets`,
      content: `<b>Resonance Skill: DAKA DAKA!</b>
      <br />Hold Resonance Skill <b>Whizzing Fight Spirit</b> to enter <b>DAKA DAKA!</b>. In this state:
      <br />- Chixia continuously consumes <b class="text-red">Thermobaric Bullets</b> to attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>, considered as Resonance Skill DMG.
      <br />- Press Basic Attack to cast Basic Attack 4, dealing <b class="text-wuwa-fusion">Fusion DMG</b>, considered as Basic Attack DMG. Then she exits the <b>DAKA DAKA!</b> state.
      <br />- If 30 <b class="text-red">Thermobaric Bullets</b> have been fired when Basic Attack is activated, Chixia will cast Resonance Skill Boom Boom and exit <b>DAKA DAKA!</b> state.
      <br />- Chixia exits the <b>DAKA DAKA!</b> state when all <b class="text-red">Thermobaric Bullets</b> are consumed.
      <br />
      <br /><b>Resonance Skill: Boom Boom</b>
      <br />Deal <b class="text-wuwa-fusion">Fusion DMG</b>, considered as Resonance Skill DMG.
      <br />
      <br /><b class="text-red">Thermobaric Bullets</b>
      <br />Chixia can hold up to <span class="text-desc">60</span> <b class="text-red">Thermobaric Bullets</b>.
      <br />Inherent Skill <b>Scorching Magazine</b> increases Max <b class="text-red">Thermobaric Bullets</b> by <span class="text-desc">10</span>.
      <br />Chixia obtains <b class="text-red">Thermobaric Bullets</b> for every Normal Attack <b>POW POW</b> on hit.
      <br />Chixia obtains <b class="text-red">Thermobaric Bullets</b> upon casting Intro Skill <b>Grand Entrance</b> and Resonance Skill <b>Whizzing Fight Spirit</b>.`,
      image: 'SP_IconMaxiaofangY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Grand Entrance`,
      content: `Chixia makes a heroic entrance and fires rapidly with her dual pistols at the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.`,
      image: 'SP_IconMaxiaofangQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Leaping Flames`,
      content: `Chixia releases a shock wave surrounding the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b> equal to <span class="text-desc">530%</span> of Chixia's ATK to enemies within the range.`,
      image: 'SP_IconMaxiaofangT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Scorching Magazine`,
      content: `Max <b class="text-red">Thermobaric Bullets</b> is increased by <span class="text-desc">10</span> rounds. The damage of Resonance Skill <b>Boom Boom</b> is increased by <span class="text-desc">50%</span>.`,
      image: 'SP_IconMaxiaofangD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Numbingly Spicy!`,
      content: `Each <b class="text-red">Thermobaric Bullets</b> that hits a target during Resonance Skill <b>DAKA DAKA!</b> increases ATK by <span class="text-desc">1%</span> for <span class="text-desc">10</span>s, stacking up to <span class="text-desc">30</span> times.`,
      image: 'SP_IconMaxiaofangD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `No.1 Hero Play Fan`,
      content: `Resonance Skill <b>Boom Boom</b> hits will always be Critical Hits.`,
      image: 'T_IconDevice_MaxiaofangM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Leaping Sparkles`,
      content: `During Resonance Liberation <b>Blazing Flames</b>, for every <span class="text-desc">1</span> target defeated, Chixia recovers <span class="text-desc">5</span> Resonance Energy, up to <span class="text-desc">20</span> each time.`,
      image: 'T_IconDevice_MaxiaofangM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Eternal Flames`,
      content: `Resonance Liberation <b>Blazing Flames</b> deals <span class="text-desc">40%</span> more DMG to targets whose HP is below <span class="text-desc">50%</span>.`,
      image: 'T_IconDevice_MaxiaofangM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Hero's Ultimate Move`,
      content: `Resonance Liberation <b>Blazing Flames</b> grants <span class="text-desc">60</span> <b class="text-red">Thermobaric Bullets</b> and immediately resets the Cooldown of Resonance Skill <b>Whizzing Fight Spirit</b>.`,
      image: 'T_IconDevice_MaxiaofangM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Triumphant Explosions`,
      content: `When the Inherent Skill <b>Numbingly Spicy!</b> reaches max stacks, ATK is additionally increased by <span class="text-desc">30%</span>.`,
      image: 'T_IconDevice_MaxiaofangM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Easter Egg Performance`,
      content: `Resonance Skill <b>Boom Boom</b> increases the Basic Attack DMG Bonus of all team members by <span class="text-desc">25%</span> for <span class="text-desc">15</span>s.`,
      image: 'T_IconDevice_MaxiaofangM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'number',
      id: 'chixia_i2',
      text: `Thermobaric Bullets Hit`,
      ...talents.i2,
      show: i.i2,
      default: 30,
      min: 0,
      max: 30,
    },
    {
      type: 'toggle',
      id: 'chixia_c3',
      text: `S3 Liberation DMG Bonus`,
      ...talents.c43,
      show: c >= 3,
      default: true,
    },
    {
      type: 'toggle',
      id: 'chixia_c6',
      text: `S6 Team Basic ATK Bonus`,
      ...talents.c6,
      show: c >= 6,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'chixia_c6')]

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
          value: [{ scaling: calcScaling(0.333, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.243, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.1688, normal), multiplier: Stats.ATK, hits: 4 }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(1.17, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.18, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.HA,
        },
        {
          name: 'Full Charge Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.18, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          value: [{ scaling: calcScaling(0.162, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          value: [{ scaling: calcScaling(1.71, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Whizzing Fight Spirit DMG',
          value: [{ scaling: calcScaling(0.16, skill), multiplier: Stats.ATK, hits: 8 }],
          element: Element.FUSION,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Blazing Flames DMG',
          value: [
            { scaling: calcScaling(4.8, lib), multiplier: Stats.ATK },
            { scaling: calcScaling(0.291, lib), multiplier: Stats.ATK, hits: 11 },
          ],
          element: Element.FUSION,
          property: TalentProperty.LIB,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Thermobaric Bullets DMG',
          value: [{ scaling: calcScaling(0.1, forte), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Boom Boom DMG',
          value: [{ scaling: calcScaling(2.2, forte), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.SKILL,
          bonus: i.i1 ? 0.5 : 0,
          cr: c >= 1 ? 1 : 0,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Grand Entrance DMG`,
          value: [
            { scaling: calcScaling(0.2475, intro), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.1238, intro), multiplier: Stats.ATK, hits: 4 },
          ],
          element: Element.FUSION,
          property: TalentProperty.INTRO,
        },
      ]
      base.OUTRO_SCALING = [
        {
          name: `Leaping Flames DMG`,
          value: [{ scaling: 5.3, multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.OUTRO,
        },
      ]

      if (form.chixia_i2) {
        base[Stats.P_ATK].push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: 0.01 * form.chixia_i2,
        })
        if (form.chixia_i2 === 30 && c >= 5) {
          base[Stats.P_ATK].push({
            name: `Sequence Node 5`,
            source: 'Self',
            value: 0.3,
          })
        }
      }
      if (form.chixia_c3) {
        base[Stats.LIB_DMG].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.4,
        })
      }
      if (form.chixia_c6) {
        base[Stats.BASIC_DMG].push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.25,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.chixia_c6) {
        base[Stats.BASIC_DMG].push({
          name: `Sequence Node 6`,
          source: 'Chixia',
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

export default Chixia
