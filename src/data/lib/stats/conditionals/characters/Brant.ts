import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcFlatScaling, calcScaling } from '@src/core/utils/data_format'

const Brant = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Captain's Rhapsody`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 4 consecutive attacks, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Consume STA to attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />
      <br /><b>Heavy Attack - Rhapsodic Riff</b>
      <br />Consume STA to attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />- After performing Basic Attack Stage 2 or Stage 4, hold the Basic Attack button to perform Heavy Attack - <b>Rhapsodic Riff</b>.
      <br />- After performing Mid-Air Attack Stage 4, press the Basic Attack button to perform Heavy Attack - <b>Rhapsodic Riff</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Perform up to 4 consecutive attacks, dealing <b class="text-wuwa-fusion">Fusion DMG</b>. Normal Attack following Mid-air Attack Stage 1 or Stage 2 to swing to the target with Grapple. Brant will attack the target if he reaches them with the swing. Release while in action to flip backward after the attack hits; or hold Normal Attack to attack the target continuously and flip backward after the finishing move. Brant flips backward automatically after Mid-air Attack Stage 3. Press Normal Attack after each flip to perform the next stage of Mid-air Attack. Flip resets Mid-air Dodge attempts.
      <br />- If Brant fails to reach the target with the Grapple swing of Mid-air Attack Stage 1, he instead performs a slash forward, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      <br />- If Brant reaches the target with the Grapple swing of Mid-air Attack Stage 1 or Stage 2 but the attack fails to hit the target, he will drop down after a temporary suspension in mid-air.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Press Normal Attack right after a successful Dodge to attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b>.
      `,
      image: 'SP_IconNorKnife',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Anchors Aweigh!`,
      content: `Brant launches himself into the air and blasts all targets in an area, dealing <b class="text-wuwa-fusion">Fusion DMG</b>. While in mid-air, if <b class="text-desc">Bravo</b> is not full, Resonance Skill <b>Anchors Aweigh!</b> is replaced with <b>Plunging Attack</b>.
      <br />
      <br /><b>Plunging Attack</b>
      <br />Plunge at the target at the cost of STA, dealing <b class="text-wuwa-fusion">Fusion DMG</b>, which is considered Basic Attack DMG.
      <br />- If Brant fails to reach the target with the Grapple swing of Mid-air Attack Stage 1, he instead performs a slash forward. Afterward, press Normal Attack to perform <b>Plunging Attack</b>.
      <br />- If Brant reaches the target with the Grapple swing of Mid-air Attack Stage 1 or Stage 2 but the attack fails to hit the target, press Normal Attack to perform <b>Plunging Attack</b> during the suspension.
      `,
      image: 'SP_IconBulanteB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `To the Horizon`,
      content: `Deal <b class="text-wuwa-fusion">Fusion DMG</b> to the target within the range and enter <b class="text-wuwa-fusion">Aflame</b> state.
      <br />Can be cast in mid-air.
      <br />
      <br /><b class="text-wuwa-fusion">Aflame</b>
      <br />The efficiency of gaining <b class="text-desc">Bravo</b> is increased by <span class="text-desc">100%</span> when Normal Attack or Resonance Skill <b>Anchors Aweigh!</b> hits the target. Meanwhile, Forte Circuit <b>Theatrical Moment</b> is replaced by <b>"My" Moment</b>.
      <br />
      <br /><b>"My" Moment</b>
      <br />Brant gains additional ATK based on his Energy Regen: For every <span class="text-desc">1%</span> of his Energy Regen over <span class="text-desc">150%</span>, Brant gains additional <span class="text-desc">20</span> points of ATK, up to <span class="text-desc">2,600</span>.
      `,
      image: 'SP_IconBulanteC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Saga at Sea`,
      content: `<b>Theatrical Moment</b>
      <br />Brant gains additional ATK based on his Energy Regen: For every <span class="text-desc">1%</span> of his Energy Regen over <span class="text-desc">150%</span>, Brant gains additional <span class="text-desc">12</span> points of ATK, up to <span class="text-desc">1,560</span>.
      <br />
      <br /><b>Waves of Acclaims</b>
      <br />Heal all nearby Resonators in the team when <b class="text-desc">Bravo</b> reaches <span class="text-desc">25</span>, <span class="text-desc">50</span>, <span class="text-desc">75</span>, and <span class="text-desc">100</span>.
      <br />
      <br /><b>Returned from Ashes</b>
      <br />When <b class="text-desc">Bravo</b> is full, replace Resonance Skill <b>Anchor Aweigh!</b> with <b>Returned from Ashes</b>.
      <br />Consume all <b class="text-desc">Bravo</b> to perform <b>Returned from Ashes</b>, dealing <b class="text-wuwa-fusion">Fusion DMG</b>, considered Basic Attack DMG, and generate a shield. Casting this skill when in <b class="text-wuwa-fusion">Aflame</b> ends this state after <b>Returned from Ashes ends</b>.
      <br />
      <br /><b class="text-desc">Bravo</b>
      <br />Brant can hold up to <span class="text-desc">100</span> <b class="text-desc">Bravo</b>.
      <br />- Obtain <b class="text-desc">Bravo</b> when Normal Attack hits the target.
      <br />- Obtain <b class="text-desc">Bravo</b> when Intro Skill hits the target.
      <br />- Obtain <b class="text-desc">Bravo</b> when Resonance Skill hits the target.
      `,
      image: 'SP_IconBulanteY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Applaud For Me!`,
      content: `Attack the target, dealing <b class="text-wuwa-fusion">Fusion DMG</b> and gain <b>Interlude Applause</b> effect.
      <br />
      <br /><b>Interlude Applause</b>
      <br />The next Mid-Air Attack begins at Stage 2. This effect ends when Brant lands early or is switched out.
      `,
      image: 'SP_IconBulanteQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `The Course is Set!`,
      content: `Ampify the incoming Resonator's <b class="text-wuwa-fusion">Fusion DMG</b> by <span class="text-desc">20%</span> and Resonance Skill DMG by <span class="text-desc">25%</span> for <span class="text-desc">14</span>s or until the Resonator is switched out.
      `,
      image: 'SP_IconBulanteT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Voyager's Blaze`,
      content: `Healing provided by <b>Waves of Acclaims</b> is increased by <span class="text-desc">20%</span>.`,
      image: 'SP_IconBulanteD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Trial by Fire and Tide`,
      content: `Brant's resistance to interruption is increased during Mid-Air Attacks and gains <span class="text-desc">15%</span> <b class="text-wuwa-fusion">Fusion DMG Bonus</b>.`,
      image: 'SP_IconBulanteD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `By Currents and Winds`,
      content: `<b>Returned from Ashes</b> temporarily causes nearby targets to stagnate while casting. The stagnation effect is removed when Brant is switched off the field.
      <br />After casting Intro Skill <b>Applaud for Me!</b> or each flip following Mid-air Attack, Brant's DMG dealt is increased by <span class="text-desc">20%</span> for <span class="text-desc">5</span>s, stacking up to <span class="text-desc">3</span> times.`,
      image: 'T_IconDevice_BulanteM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `For Smiles and Cheers`,
      content: `Casting Mid-Air Attack and <b>Returned from Ashes</b> increases Brant's Crit. Rate by <span class="text-desc">30%</span>.
      <br />Brant's Outro Skill <b>The Course is Set!</b> gains a new enhancement: When Resonance Skill cast by the incoming Resonator (or nearby Resonators who activate Brant's Outro Skill) hits a target within <span class="text-desc">20</span>s after Brant's Outro Skill, Brant blasts the hit target, dealing <b class="text-wuwa-fusion">Fusion DMG</b> equal to <span class="text-desc">440%</span> of Brant's ATK (considered Basic Attack DMG). This explosion can be triggered <span class="text-desc">1</span> time per second, up to <span class="text-desc">2</span> explosions in total.
      <br />- This effect remains active when Brant is switched off the field`,
      image: 'T_IconDevice_BulanteM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Through Storms I Sail`,
      content: `The DMG Multiplier of <b>Returned from Ashes</b> is increased by <span class="text-desc">42%</span>.`,
      image: 'T_IconDevice_BulanteM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `To Freedom I Sing`,
      content: `The Shield obtained from <b>Returned from Ashes</b> is increased by <span class="text-desc">20%</span>. Casting <b>Returned from Ashes</b> restores HP for all nearby Resonators in the team (<span class="text-desc">6.6</span> HP for every <span class="text-desc">1%</span> Energy Regen)`,
      image: 'T_IconDevice_BulanteM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `All the World's A Stage, Says the Actor`,
      content: `Dealing Basic Attack DMG gives Brant <span class="text-desc">15%</span> Basic Attack DMG Bonus for <span class="text-desc">10</span>s.`,
      image: 'T_IconDevice_BulanteM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `All the World's A Carnevale, Says Brant`,
      content: `Mid-Air Attack's DMG Multiplier is increased by <span class="text-desc">30%</span>. Casting <b>Returned from Ashes</b> causes a secondary blast, dealing <b class="text-wuwa-fusion">Fusion DMG</b> equal to <span class="text-desc">30%</span> of the DMG dealt by <b>Returned from Ashes</b>, considered Basic Attack DMG.`,
      image: 'T_IconDevice_BulanteM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'my_moment',
      text: `"My" Moment`,
      ...talents.lib,
      show: true,
      default: true,
    },
    {
      type: 'number',
      id: 'brant_c1',
      text: `S1 DMG Bonus`,
      ...talents.c1,
      show: c >= 1,
      default: 0,
      min: 1,
      max: 3,
    },
    {
      type: 'toggle',
      id: 'brant_c5',
      text: `S5 Basic ATK DMG Bonus`,
      ...talents.c5,
      show: c >= 5,
      default: true,
    },
  ]

  const teammateContent: IContent[] = []

  return {
    talents,
    content,
    teammateContent,
    allyContent: [
      {
        type: 'toggle',
        id: 'brant_outro',
        text: `Outro: The Course is Set!`,
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
          value: [{ scaling: calcScaling(0.2542, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [
            { scaling: calcScaling(0.255, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.255, normal), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [
            { scaling: calcScaling(0.111, normal), multiplier: Stats.ATK, hits: 3 },
            { scaling: calcScaling(0.1664, normal), multiplier: Stats.ATK, hits: 2 },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [
            { scaling: calcScaling(0.141, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1128, normal), multiplier: Stats.ATK, hits: 5 },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.9937, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.HA,
        },
        {
          name: 'Heavy Attack - Rhapsodic Riff DMG',
          value: [{ scaling: calcScaling(0.85, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack Stage 1 DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.618, normal), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.BA,
          cr: c >= 2 ? 0.3 : 0,
          multiplier: c >= 6 ? 1.3 : 1,
        },
        {
          name: 'Mid-Air Attack Stage 1: Charged Attack DMG',
          scale: Stats.ATK,
          value: [
            { scaling: calcScaling(0.1672, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.2508, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.209, normal), multiplier: Stats.ATK, hits: 6 },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
          cr: c >= 2 ? 0.3 : 0,
          multiplier: c >= 6 ? 1.3 : 1,
        },
        {
          name: 'Mid-Air Attack Stage 1 Slash DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.1417, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.FUSION,
          property: TalentProperty.BA,
          cr: c >= 2 ? 0.3 : 0,
          multiplier: c >= 6 ? 1.3 : 1,
        },
        {
          name: 'Mid-Air Attack Stage 2 DMG',
          scale: Stats.ATK,
          value: [
            { scaling: calcScaling(0.4272, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.4272, normal), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
          cr: c >= 2 ? 0.3 : 0,
          multiplier: c >= 6 ? 1.3 : 1,
        },
        {
          name: 'Mid-Air Attack Stage 2: Charged Attack DMG',
          scale: Stats.ATK,
          value: [
            { scaling: calcScaling(0.4272, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.4272, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1654, normal), multiplier: Stats.ATK, hits: 6 },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
          cr: c >= 2 ? 0.3 : 0,
          multiplier: c >= 6 ? 1.3 : 1,
        },
        {
          name: 'Mid-Air Attack Stage 3 DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.1417, normal), multiplier: Stats.ATK, hits: 6 }],
          element: Element.FUSION,
          property: TalentProperty.BA,
          cr: c >= 2 ? 0.3 : 0,
          multiplier: c >= 6 ? 1.3 : 1,
        },
        {
          name: 'Mid-Air Attack Flip DMG',
          scale: Stats.ATK,
          value: [
            { scaling: calcScaling(0.17, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.2975, normal), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
          cr: c >= 2 ? 0.3 : 0,
          multiplier: c >= 6 ? 1.3 : 1,
        },
        {
          name: 'Mid-Air Attack Stage 4 DMG',
          scale: Stats.ATK,
          value: [
            { scaling: calcScaling(0.5107, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1277, normal), multiplier: Stats.ATK, hits: 3 },
            { scaling: calcScaling(0.3831, normal), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
          cr: c >= 2 ? 0.3 : 0,
          multiplier: c >= 6 ? 1.3 : 1,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [
            { scaling: calcScaling(0.1913, normal), multiplier: Stats.ATK, hits: 3 },
            { scaling: calcScaling(0.2869, normal), multiplier: Stats.ATK, hits: 2 },
          ],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Anchors Aweigh! DMG',
          value: [
            { scaling: calcScaling(1.0077, skill), multiplier: Stats.ATK },
            { scaling: calcScaling(0.6718, skill), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Plunging Attack DMG',
          value: [{ scaling: calcScaling(0.527, skill), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'To the Horizon DMG',
          value: [
            { scaling: calcScaling(0.4278, lib), multiplier: Stats.ATK, hits: 4 },
            { scaling: calcScaling(1.7112, lib), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.LIB,
        },
      ]
      const returnFromAshes = {
        name: 'Returned from Ashes DMG',
        value: [
          { scaling: calcScaling(0.2375, forte), multiplier: Stats.ATK, hits: 2 },
          { scaling: calcScaling(0.475, forte), multiplier: Stats.ATK },
          { scaling: calcScaling(0.95, forte), multiplier: Stats.ATK, hits: 2 },
          { scaling: calcScaling(6.65, forte), multiplier: Stats.ATK },
        ],
        element: Element.FUSION,
        property: TalentProperty.BA,
        cr: c >= 2 ? 0.3 : 0,
        multiplier: c >= 3 ? 1.42 : 1,
      }
      base.FORTE_SCALING = [returnFromAshes]
      base.INTRO_SCALING = [
        {
          name: `Applaud For Me! DMG`,
          value: [
            { scaling: calcScaling(1.02, intro), multiplier: Stats.ATK },
            { scaling: calcScaling(0.255, intro), multiplier: Stats.ATK },
          ],
          element: Element.FUSION,
          property: TalentProperty.INTRO,
        },
      ]

      if (i.i2) {
        base[Stats.FUSION_DMG].push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (form.brant_c1) {
        base[Stats.ALL_DMG].push({
          name: `Sequence Node 1`,
          source: 'Self',
          value: 0.2 * form.brant_c1,
        })
      }
      if (c >= 2) {
        base.FORTE_SCALING.push({
          name: 'S2 Mark Explosion DMG',
          value: [{ scaling: 4.4, multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.BA,
        })
      }
      if (form.brant_c5) {
        base[Stats.BASIC_DMG].push({
          name: `Sequence Node 5`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (c >= 6) {
        base.FORTE_SCALING.push({
          ...returnFromAshes,
          name: 'S6 Explosion DMG',
          multiplier: returnFromAshes.multiplier * 0.3,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.brant_outro) {
        base.FUSION_AMP.push({
          name: `Outro Skill`,
          source: 'Brant',
          value: 0.2,
        })
        base.SKILL_AMP.push({
          name: `Outro Skill`,
          source: 'Brant',
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
      const er = base.getValue(Stats.ER)
      if (c >= 4) {
        base.FORTE_SCALING.push({
          name: 'S4 Returned from Ashes Healing',
          value: [{ scaling: er, multiplier: Stats.ER, override: 6.6, hits: 100 }],
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        })
      }
      if (er > 1.5) {
        base[Stats.ATK].push({
          name: form.my_moment ? `"My" Moment` : `Theatrical Moment`,
          source: 'Self',
          value: _.min([(form.my_moment ? 2000 : 1200) * (er - 1.5), form.my_moment ? 2600 : 1560]),
          base: ((er - 1.5) * 100).toLocaleString(),
          multiplier: form.my_moment ? '20' : '12',
        })
      }
      base.LIB_SCALING.push({
        name: 'Healing',
        value: [{ scaling: er, multiplier: Stats.ER, override: calcFlatScaling(1.75, lib), hits: 100 }],
        flat: calcFlatScaling(500, lib),
        element: TalentProperty.HEAL,
        property: TalentProperty.HEAL,
      })
      base.FORTE_SCALING.push(
        {
          name: 'Waves of Acclaims Healing',
          value: [{ scaling: er, multiplier: Stats.ER, override: calcFlatScaling(1.09, lib), hits: 100 }],
          flat: calcFlatScaling(312, lib),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
          bonus: i.i1 ? 0.2 : 0,
        },
        {
          name: 'Waves of Acclaims Shield',
          value: [{ scaling: er, multiplier: Stats.ER, override: calcFlatScaling(9, lib), hits: 100 }],
          flat: calcFlatScaling(2500, lib),
          element: TalentProperty.SHIELD,
          property: TalentProperty.SHIELD,
          bonus: c >= 4 ? 0.2 : 0,
        }
      )

      return base
    },
  }
}

export default Brant
