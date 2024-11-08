import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Baizhi = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Destined Promise`,
      content: `Basic Attack
      <br />Baizhi instructs You'tan to perform up to 4 consecutive attacks, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br />Heavy Attack
      <br />Baizhi continuously consumes STA to command You'tan to attack enemies, dealing <b class="text-wuwa-glacio">Glacio DMG</b>. During Heavy Attack, Baizhi can command You'tan to move.
      <br />
      <br />Mid-air Attack
      <br />Baizhi consumes STA and summons You'tan in mid-air to perform a Plunging Attack, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br />Dodge Counter
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.`,
      image: 'SP_IconNorMagic',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Emergency Plan`,
      content: `Baizhi calls You'tan to attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b> while immediately healing all characters on nearby teams.`,
      image: 'SP_IconBailianB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Momentary Union`,
      content: `Baizhi summons You'tan to heal all characters on nearby teams, generating <span class="text-desc">4</span> stacks of <b class="text-sky-200">Remnant Entities</b>.
      <br />
      <br /><b class="text-sky-200">Remnant Entities</b>
      <br /><b class="text-sky-200">Remnant Entities</b> follow the active team members. <span class="text-desc">1</span> stack(s) of <b class="text-sky-200">Remnant Entities</b> are automatically consumed to perform Coordinated Attacks every <span class="text-desc">2.5</span>s, dealing <b class="text-wuwa-glacio">Glacio DMG</b> on hit while healing all characters of the team when the active character is within the range.`,
      image: 'SP_IconBailianC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Cycle of Life`,
      content: `<b>You'tan</b>
      <br />A Remnant Creature that answers to Baizhi's mind and desires while sharing all her stats. You'tan goes back to Baizhi when Baizhi dodges.
      <br />
      <br /><b class="text-sky-300">Concentration</b>
      <br />Baizhi consumes all <b class="text-sky-300">Concentration</b> when casting Heavy Attack or Resonance Skill <b>Emergency Plan</b> to continuously heal all Resonators on nearby teams. Each <span class="text-desc">1</span> <b class="text-sky-300">Concentration</b> consumed provides <span class="text-desc">1</span> healing. The healing happens every <span class="text-desc">2</span>s.
      <br />When Baizhi consumes <b class="text-sky-300">Concentration</b> to cast Heavy Attack, Baizhi additionally restores Concerto Energy and Resonance Energy.
      <br />When Baizhi consumes <b class="text-sky-300">Concentration</b> to cast Resonance Skill <b>Emergency Plan</b>, Baizhi additionally restores Concerto Energy.
      <br />
      <br /><b>Forte Gauge: Concentration</b>
      <br />Baizhi can hold up to <span class="text-desc">4</span> <b class="text-sky-300">Concentration</b>.
      <br />Baizhi obtains <span class="text-desc">1</span> <b class="text-sky-300">Concentration</b> for every Basic Attack on hit.`,
      image: 'SP_IconBailianY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Overflowing Frost`,
      content: `Baizhi calls You'tan to perform <span class="text-desc">1</span> plunging attack, dealing <b class="text-wuwa-glacio">Glacio DMG</b> while healing all characters on a nearby team.`,
      image: 'SP_IconBailianQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Rejuvinating Flow`,
      content: `Heal the incoming Resonator by <span class="text-desc">1.54</span>% of Baizhi's max HP every <span class="text-desc">3</span>s for <span class="text-desc">30</span>s. The healed Resonator has their DMG Amplified by <span class="text-desc">15%</span> for <span class="text-desc">6</span>s.`,
      image: 'SP_IconBailianT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Harmonic Range`,
      content: `When Baizhi casts Resonance Skill <b>Emergency Plan</b>, You'tan generates a field of <b>Euphonia</b> that lasts for <span class="text-desc">15</span>s.
      <br />
      <br /><b>Euphonia</b>
      <br />ATK of the Resonators who pick up <b>Euphonia</b> is increased by <span class="text-desc">15%</span> for <span class="text-desc">20</span>s.`,
      image: 'SP_IconBailianD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Stimulus Feedback`,
      content: `Baizhi's Heavy Attack on hit heals the character with the lowest HP on a nearby team by <span class="text-desc">0.25%</span> of her Max HP.`,
      image: 'SP_IconBailianD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Complex Simplicity`,
      content: `Resonance Skill <b>Emergency Plan</b> additionally restores <span class="text-desc">2.5</span> Resonance Energy for every <span class="text-desc">1</span> <b class="text-sky-300">Concentration</b> consumed.`,
      image: 'T_IconDevice_BailianM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Silent Tundra`,
      content: `Resonance Skill <b>Emergency Plan</b>> increases Baizhi's <b class="text-wuwa-glacio">Glacio DMG Bonus</b> by <span class="text-desc">15%</span> and her Healing by <span class="text-desc">15%</span> if she has <span class="text-desc">4</span> <b class="text-sky-300">Concentration</b>. These effects last for <span class="text-desc">12</span>s.`,
      image: 'T_IconDevice_BailianM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Veritas Lux Mea`,
      content: `Intro Skill <b>Overflowing Frost</b> increases Baizhi's Max HP by <span class="text-desc">12%</span> for <span class="text-desc">10</span>s.`,
      image: 'T_IconDevice_BailianM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Eternal Verity`,
      content: `Upon casting Resonance Liberation <b>Momentary Union</b>, Resonance Liberation <b class="text-sky-200">Remnant Entities</b> gains the following enhancements:
      <br />
      <br />-<b class="text-sky-200">Remnant Entities</b> can be performed <span class="text-desc">2</span> more time(s);
      <br />-Healing multiplier of <b class="text-sky-200">Remnant Entities</b> is increased by <span class="text-desc">20%</span>;
      <br />-<b class="text-sky-200">Remnant Entities</b> deals additional <b class="text-wuwa-glacio">Glacio DMG</b> equal to <span class="text-desc">1.2%</span> of Baizhi's Max HP.`,
      image: 'T_IconDevice_BailianM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `A Wish Answered`,
      content: `If a team member is knocked out when Baizhi is alive on the team, immediately revive them and restore <span class="text-desc">100%</span> of their Max HP. This effect can be triggered once every <span class="text-desc">10</span> minute(s).`,
      image: 'T_IconDevice_BailianM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Seeker's Devotion`,
      content: `When <b>Euphonia</b> is picked up, increase the <b class="text-wuwa-glacio">Glacio DMG Bonus</b> of all characters nearby by <span class="text-desc">12%</span> for <span class="text-desc">20</span>s.`,
      image: 'T_IconDevice_BailianM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'euphonia',
      text: `Euphonia`,
      ...talents.i1,
      show: i.i1,
      default: false,
    },
    {
      type: 'toggle',
      id: 'baizhi_c2',
      text: `S2 Glacio DMG & Healing Bonus`,
      ...talents.c2,
      show: c >= 2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'baizhi_c3',
      text: `S3 HP Bonus`,
      ...talents.c3,
      show: c >= 3,
      default: true,
    },
    {
      type: 'toggle',
      id: 'aalto_c5',
      text: `S5 Aero DMG Bonus`,
      ...talents.c5,
      show: c >= 5,
      default: true,
    },
    {
      type: 'toggle',
      id: 'aalto_c6',
      text: `S6 Enhanced Heavy ATK`,
      ...talents.c6,
      show: c >= 6,
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
        id: 'baizhi_outro',
        text: `Outro: Rejuvinating Flow`,
        ...talents.outro,
        show: true,
        default: false,
      },
      findContentById(content, 'euphonia'),
    ],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.BASIC_SCALING = [
        {
          name: 'Stage 1 DMG',
          value: [{ scaling: calcScaling(0.3294, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.3952, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.0659, normal), multiplier: Stats.ATK, hits: 7 }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(0.3952, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.2458, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          value: [{ scaling: calcScaling(0.3968, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          value: [{ scaling: calcScaling(0.8986, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Emergency Plan DMG',
          value: [{ scaling: calcScaling(0.0802, skill), multiplier: Stats.HP }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Emergency Plan Healing',
          value: [{ scaling: calcScaling(0.029, skill), multiplier: Stats.HP }],
          flat: calcScaling(575, skill),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Momentary Union Healing',
          value: [{ scaling: calcScaling(0.0126, lib), multiplier: Stats.HP }],
          flat: calcScaling(310, lib),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
        {
          name: 'Remnant Entities DMG',
          value: [
            { scaling: calcScaling(0.0205, lib), multiplier: Stats.HP },
            ...(c >= 4 ? [{ scaling: 0.012, multiplier: Stats.HP }] : []),
          ],
          element: Element.GLACIO,
          property: TalentProperty.LIB,
          coord: true,
        },
        {
          name: 'Remnant Entities Healing',
          value: [{ scaling: calcScaling(0.0142, lib), multiplier: Stats.HP }],
          flat: calcScaling(349, lib),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
          multiplier: c >= 4 ? 1.2 : 1,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Concentration Healing',
          value: [{ scaling: calcScaling(0.0016, forte), multiplier: Stats.HP }],
          flat: calcScaling(32, lib),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Overflowing Frost DMG`,
          value: [{ scaling: calcScaling(0.4, intro), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.INTRO,
        },
        {
          name: 'Overflowing Frost Healing',
          value: [{ scaling: calcScaling(0.0038, intro), multiplier: Stats.HP }],
          flat: calcScaling(75, lib),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
      ]
      base.OUTRO_SCALING = [
        {
          name: 'Overflowing Frost Healing',
          value: [{ scaling: 0.0154, multiplier: Stats.HP }],
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
      ]

      if (form.euphonia) {
        base[Stats.P_ATK].push({
          name: `Euphonia`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (form.baizhi_c2) {
        base[Stats.GLACIO_DMG].push({
          name: `Sequence Node 2`,
          source: 'Self',
          value: 0.15,
        })
        base[Stats.HEAL].push({
          name: `Sequence Node 2`,
          source: 'Self',
          value: 0.15,
        })
      }
      if (form.baizhi_c3) {
        base[Stats.P_HP].push({
          name: `Sequence Node 3`,
          source: 'Self',
          value: 0.12,
        })
      }
      if (i.i2) {
        base.HEAVY_SCALING.push({
          name: 'Stimulus Feedback Healing',
          value: [{ scaling: 0.025, multiplier: Stats.HP }],
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (aForm.baizhi_outro) {
        base.AMP.push({
          name: `Outro Skill`,
          source: 'Baizhi',
          value: 0.15,
        })
      }
      if (aForm.euphonia) {
        base[Stats.P_ATK].push({
          name: `Euphonia`,
          source: 'Baizhi',
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
      if (_.some(allForm, (item) => item.euphonia) && c >= 6) {
        const index = _.findIndex(team, (item) => item.cId === '1103')
        _.forEach(allBase, (b, i) => {
          b[Stats.GLACIO_DMG].push({
            name: `Sequence Node 6`,
            source: index === i ? 'Self' : 'Baizhi',
            value: 0.12,
          })
        })
      }

      return base
    },
  }
}

export default Baizhi
