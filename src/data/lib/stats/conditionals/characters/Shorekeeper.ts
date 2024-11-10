import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Shorekeeper = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Origin Calculus`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 4 consecutive attacks, dealing <b class="text-wuwa-spectro">Spectro DMG</b>. Each hit generates <span class="text-desc">1</span> <b class="text-indigo-300">Collapsed Core</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Hold the Normal Attack Button to enter <b>Unbound Form</b>, which consumes STA continuously. While in this form, Shorekeeper will:
      <br />- Generate a segment of <b class="text-indigo-500">Deductive Data</b> every second;
      <br />- Automatically collect nearby plant collectibles.
      <br />Using up all STA or actions such as casting Basic Attack will end the <b>Unbound Form</b> and deal <b class="text-wuwa-spectro">Spectro DMG</b> to the target. Each accumulated segment of <b class="text-indigo-500">Deductive Data</b> will convert into a segment of <b class="text-amber-400">Empirical Data</b> and generate a <b class="text-indigo-300">Collapsed Core</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Consume STA to perform a Plunging Attack. Each hit generates <span class="text-desc">1</span> <b class="text-indigo-300">Collapsed Core</b>. Quickly Press the Normal Attack Button after the Plunging Attack to perform Basic Attack Stage 2.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Press the Normal Attack Button after a successful Dodge to attack a target, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      `,
      image: 'SP_IconNorMagic',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Chaos Theory`,
      content: `Restore HP for all nearby party members and summon <span class="text-desc">5</span> <b>Dim Star Butterflies</b>, which automatically track and attack a target, dealing <b class="text-wuwa-spectro">Spectro DMG</b>. Follow up with Basic Attack in time to start the Basic Attack cycle from Stage 2.
      <br />Can be performed in mid-air.
      `,
      image: 'SP_IconShouanrenB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `End Loop`,
      content: `<b class="text-blue">Outer Stellarealm</b>
      <br />Generate the <b class="text-blue">Outer Stellarealm</b> to restore HP for all party members within its effective range continuously. This effect can be triggered once every <span class="text-desc">3</span>s.
      <br />
      <br /><b class="text-purple">Inner Stellarealm</b>
      <br />When a party member uses Intro Skill within the <b class="text-blue">Outer Stellarealm</b>, it evolves into the <b class="text-purple">Inner Stellarealm</b>. Within the effective range of the <b class="text-purple">Inner Stellarealm</b>, for every <span class="text-desc">0.2%</span> of Shorekeeper's Energy Regen, all party members gain a <span class="text-desc">0.01%</span> increase of Crit. Rate, up to <span class="text-desc">12.5%</span>.
      <br /><b class="text-purple">Inner Stellarealm</b> has all the effects of the <b class="text-blue">Outer Stellarealm</b>.
      <br />
      <br /><b class="text-wuwa-spectro">Supernal Stellarealm</b>
      <br />When a party member uses Intro Skill within the <b class="text-purple">Inner Stellarealm</b>, it evolves into the <b class="text-wuwa-spectro">Supernal Stellarealm</b>. Within the effective range of the <b class="text-wuwa-spectro">Supernal Stellarealm</b>, for every <span class="text-desc">0.1%</span> of Shorekeeper's Energy Regen, all party members gain a <span class="text-desc">0.01%</span> increase of Crit. DMG, up to <span class="text-desc">25%</span>.
      <br /><b class="text-wuwa-spectro">Supernal Stellarealm</b> has all the effects of the <b class="text-purple">Inner Stellarealm</b>.
      `,
      image: 'SP_IconShouanrenC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Astral Chord`,
      content: `<b>Flare Star Butterfly</b>
      <br />Hitting a target with a Normal Attack generates a <b class="text-indigo-300">Collapsed Core</b>, which transforms into a <b>Flare Star Butterfly</b> after <span class="text-desc">6</span>s. <b>Flare Star Butterflies</b> automatically track and attack a target, dealing <b class="text-wuwa-spectro">Spectro DMG</b>. If there are already <span class="text-desc">5</span> <b class="text-indigo-300">Collapsed Cores</b>, Shorekeeper's next Basic Attack hit will instantly convert a <b class="text-indigo-300">Collapsed Core</b> into a <b>Flare Star Butterfly</b>.
      <br />
      <br /><b>Illation</b>
      <br />When Shorekeeper has <span class="text-desc">5</span> segments of <b class="text-amber-400">Empirical Data</b>, casting Heavy Attack will consume all segments to pull in nearby targets, dealing <b class="text-wuwa-spectro">Spectro DMG</b>. Meanwhile, all generated <b class="text-indigo-300">Collapsed Cores</b> will instantly transform into <b>Flare Star Butterflies</b>.
      <br />
      <br /><b>Transmutation</b>
      <br />When Shorekeeper has <span class="text-desc">5</span> segments of <b class="text-amber-400">Empirical Data</b>, casting Mid-air Attack will consume all segments to deal <b class="text-wuwa-spectro">Spectro DMG</b>. Meanwhile, all generated <b class="text-indigo-300">Collapsed Cores</b> will instantly transform into <b>Flare Star Butterflies</b>. Quickly press the Normal Attack Button afterward to perform Basic Attack Stage 2.
      <br />
      <br /><b class="text-amber-400">Empirical Data</b>
      <br />Shorekeeper can hold up to <span class="text-desc">5</span> segments of <b class="text-amber-400">Empirical Data</b>.
      <br />- Obtain <span class="text-desc">1</span> segment of <b class="text-amber-400">Empirical Data</b> when Basic Attack Stage 1, 2, or 4 hits a target.
      <br />- Obtain <span class="text-desc">2</span> segments of <b class="text-amber-400">Empirical Data</b> when Basic Attack Stage 3 hits a target.
      <br />- Obtain <span class="text-desc">1</span> segment of <b class="text-amber-400">Empirical Data</b> when Mid-air Attack hits a target.
      <br />- Obtain <span class="text-desc">1</span> segment of <b class="text-amber-400">Empirical Data</b> when Dodge Counter hits a target.
      `,
      image: 'SP_IconShouanrenY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Proof of Existence`,
      content: `<b>Enlightenment</b>
      <br />Shorekeeper appears to restore HP for all nearby party members and summon <span class="text-desc">5</span> <b>Dim Star Butterflies</b>, which automatically track and attack a target, dealing <b class="text-wuwa-spectro">Spectro DMG</b>. This is considered Resonance Skill DMG.
      <br />
      <br /><b>Discernment</b>
      <br />When a <b class="text-wuwa-spectro">Supernal Stellarealm</b> is generated, Shorekeeper's first Intro Skill triggered in its duration will be replaced with Intro Skill <b>Discernment</b>. Casting <b>Discernment</b> ends the current <b class="text-wuwa-spectro">Stellarealm</b>, restores HP for all nearby party members, and deals <b class="text-wuwa-spectro">Spectro DMG</b> to the targets. This attack is guaranteed to be a Critical Hit dealing Resonance Liberation DMG. The Intro Skill <b>Discernment</b> can only be triggered once each time a <b class="text-wuwa-spectro">Supernal Stellarealm</b> is generated.
      `,
      image: 'SP_IconShouanrenQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Binary Butterfly`,
      content: `Shorekeeper summons <span class="text-desc">1</span> <b>Flare Star Butterfly</b> and <span class="text-desc">1</span> <b>Dim Star Butterfly</b> to circle the Resonator on the field for up to <span class="text-desc">30</span>s, granting the following effects:
      <br />- If the Resonator on the field is hit or launched, tapping the Dodge Button allows the Resonator to immediately recover from the interruption, triggering a successful Dodge. The Resonator launched in the air can land on the ground standing if they are close to the ground. This effect can be triggered up to <span class="text-desc">5</span> time(s).
      <br />- All nearby party members' DMG is Amplified by <span class="text-desc">15%</span>.
      `,
      image: 'SP_IconShouanrenT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Life Entwined`,
      content: `When a Resonator other than Shorekeeper takes a fatal blow, they will not be knocked out and will instead be healed for <span class="text-desc">50%</span> of Shorekeeper's HP while Shorekeeper loses the same amount of HP. Shorekeeper's HP will not go below <span class="text-desc">1</span> from this effect. This effect can be triggered once every <span class="text-desc">10</span> minutes.`,
      image: 'SP_IconShouanrenD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Self Gravitation`,
      content: `When the Resonator on the field is within the effective range of a <b>Stellarealm</b>, Shorekeeper's Energy Regen increases by <span class="text-desc">10%</span>, and Rover's Energy Regen also increases by <span class="text-desc">10%</span> if Rover is on the team.`,
      image: 'SP_IconShouanrenD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Unspoken Conjecture`,
      content: `The <b>Stellarealms</b> generated by Resonance Liberation <b>End Loop</b> gain the following enhancements:
      <br />- The effective range of the healing and buffs is extended by <span class="text-desc">150%</span>
      <br />- The duration is extended by <span class="text-desc">10</span>s.
      <br />- Casting Intro Skill <b>Discernment</b> no longer ends the existing <b>Stellarealm</b>.`,
      image: 'T_IconDevice_ShouanrenM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Night's Gift and Refusal`,
      content: `The <b class="text-blue">Outer Stellarealm</b> now increases the ATK of all nearby party members by <span class="text-desc">40%</span>.`,
      image: 'T_IconDevice_ShouanrenM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Infinity Awaits Me`,
      content: `Casting Resonance Liberation <b>End Loop</b> grants Shorekeeper <span class="text-desc">20</span> Concerto Energy. This effect can be triggered once every <span class="text-desc">25</span>s.`,
      image: 'T_IconDevice_ShouanrenM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Overflowing Quietude`,
      content: `Gain <span class="text-desc">70%</span> additional Healing Bonus when casting Resonance Skill <b>Chaos Theory</b>.`,
      image: 'T_IconDevice_ShouanrenM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Echoes in Silence`,
      content: `Extend the ranges of the pulling effect of Basic Attack Stage 3 by <span class="text-desc">50%</span> and <b>Illation</b> by <span class="text-desc">30%</span>.`,
      image: 'T_IconDevice_ShouanrenM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `To the New World`,
      content: `Increase the DMG Multiplier of Intro Skill <b>Discernment</b> by <span class="text-desc">42%</span>. Casting Intro Skill <b>Discernment</b> increases Shorekeeper's Crit. DMG by <span class="text-desc">500%</span>.`,
      image: 'T_IconDevice_ShouanrenM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'element',
      options: [
        { name: 'None', value: '' },
        { name: 'Outer Stellarealm', value: '1' },
        { name: 'Inner Stellarealm', value: '2' },
        { name: 'Supernal Stellarealm', value: '3' },
      ],
      id: 'stellarealm',
      text: `Stellarealm`,
      ...talents.lib,
      show: true,
      default: '1',
    },
    {
      type: 'toggle',
      id: 'sh_outro',
      text: `Binary Butterfly`,
      ...talents.outro,
      show: true,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'stellarealm'), findContentById(content, 'sh_outro')]

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
          value: [{ scaling: calcScaling(0.1599, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [{ scaling: calcScaling(0.12, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.1173, normal), multiplier: Stats.ATK, hits: 3 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(0.3658, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.2304, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Plunging Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.374, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.44, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Dim Star Butterfly DMG',
          value: [{ scaling: calcScaling(0.1575, skill), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Skill Healing',
          value: [{ scaling: calcScaling(0.03, skill), multiplier: Stats.HP }],
          flat: calcScaling(660, skill),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
          bonus: c >= 4 ? 0.7 : 0,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Healing Over Time',
          value: [{ scaling: calcScaling(0.012, lib), multiplier: Stats.HP }],
          flat: calcScaling(220, lib),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Flare Star Butterfly DMG',
          value: [{ scaling: calcScaling(0.1876, forte), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Illation DMG',
          value: [{ scaling: calcScaling(0.0954, forte), multiplier: Stats.ATK, hits: 5 }],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
        },
        {
          name: 'Transmutation DMG',
          value: [{ scaling: calcScaling(0.372, forte), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Enlightenment DMG`,
          value: [{ scaling: calcScaling(0.2279, intro), multiplier: Stats.ATK, hits: 5 }],
          element: Element.SPECTRO,
          property: TalentProperty.INTRO,
        },
        {
          name: `Discernment DMG`,
          value: [{ scaling: calcScaling(0.0988, intro) * (c >= 6 ? 1.42 : 1), multiplier: Stats.HP, hits: 3 }],
          element: Element.SPECTRO,
          property: TalentProperty.INTRO,
          cr: 1,
          cd: c >= 6 ? 5 : 0,
        },
        {
          name: `Enlightenment Heaing`,
          value: [{ scaling: calcScaling(0.006, intro), multiplier: Stats.HP }],
          flat: calcScaling(130, intro),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
        {
          name: `Discernment Heaing`,
          value: [{ scaling: calcScaling(0.0066, intro), multiplier: Stats.HP }],
          flat: calcScaling(145, intro),
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        },
      ]

      if (form.stellarealm && i.i2) {
        base[Stats.ER].push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: 0.1,
        })
      }
      if (form.stellarealm && c >= 2) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 2`,
          source: 'Self',
          value: 0.4,
        })
      }
      if (form.sh_outro) {
        base.AMP.push({
          name: `Outro Skill`,
          source: 'Self',
          value: 0.15,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.sh_outro) {
        base.AMP.push({
          name: `Outro Skill`,
          source: 'Shorekeeper',
          value: 0.15,
        })
      }
      if (form.stellarealm && c >= 2) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 2`,
          source: 'Shorekeeper',
          value: 0.4,
        })
      }
      if (form.stellarealm && i.i2 && _.includes(base.NAME, 'Rover')) {
        base[Stats.ER].push({
          name: `Inherent Skill 2`,
          source: 'Shorekeeper',
          value: 0.1,
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
      if (form.stellarealm) {
        const index = _.findIndex(team, (item) => item.cId === '1505')
        _.forEach(allBase, (member, i) => {
          if (form.stellarealm >= 2) {
            member[Stats.CRIT_RATE].push({
              name: `Inner Stellarealm`,
              source: index === i ? 'Self' : 'Shorekeeper',
              value: _.min([0.05 * base.getValue(Stats.ER), 0.125]),
              base: toPercentage(base.getValue(Stats.ER)),
              multiplier: 0.05,
            })
          }
          if (form.stellarealm >= 3) {
            member[Stats.CRIT_DMG].push({
              name: `Supernal Stellarealm`,
              source: index === i ? 'Self' : 'Shorekeeper',
              value: _.min([0.1 * base.getValue(Stats.ER), 0.25]),
              base: toPercentage(base.getValue(Stats.ER)),
              multiplier: 0.1,
            })
          }
        })
      }

      return base
    },
  }
}

export default Shorekeeper
