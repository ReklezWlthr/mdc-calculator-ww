import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Phoebe = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `O Come Divine Light`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 3 consecutive attacks of Holy Light, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Consume STA to attack the target, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Consume STA to ride the staff and dive down from mid-air to attack the target, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />
      <br /><b>Mid-Air Heavy Attack</b>
      <br />Consume STA to ride on the staff for a distance.
      <br />- Can be re-cast after a Mid-Air Dodge or using Grapple.
      <br />
      <br /><b>Dodge Counter</b>
      <br />After a successful Dodge, quickly use Basic Attack to attack the target, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />- When Phoebe is inside the <b class="text-yellow">Ring of Mirrors</b>, Dodge Counter becomes <b>Chamuel's Star: Dodge Counter</b>.
      `,
      image: 'SP_IconNorMagic',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `To Where Light Shines`,
      content: `Summon a <b class="text-yellow">Ring of Mirrors</b> at the target location, making the target hit stagnate for <span class="text-desc">2</span>s and dealing <b class="text-wuwa-spectro">Spectro DMG</b>. The stagnation effect can be applied to <span class="text-desc">12</span> targets max for each <b class="text-yellow">Ring of Mirrors</b>. Using Resonance Skill again shortly after the summoning teleports Phoebe to the <b class="text-yellow">Ring of Mirrors</b>' location, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />Unable to teleport if Phoebe is too far from the <b class="text-yellow">Ring of Mirrors</b>.
      <br />
      <br /><b class="text-yellow">Ring of Mirrors</b>
      <br />- <b class="text-yellow">Ring of Mirrors</b> lasts for <span class="text-desc">30</span>s. When Phoebe summons a new <b class="text-yellow">Ring of Mirrors</b>, the existing <b class="text-yellow">Ring of Mirrors</b> disappears.
      <br />- When Phoebe is outside of the <b class="text-yellow">Ring of Mirrors</b>, a Basic Attacks or Dodge Counter that hits the <b class="text-yellow">Ring of Mirrors</b> will refract Holy Light, which deals <b class="text-wuwa-spectro">Spectro DMG</b> to targets inside the <b class="text-yellow">Ring of Mirrors</b> and pulls the targets hit to the center of the ring. The DMG dealt is considered Basic Attack DMG. Can be triggered once every <span class="text-desc">0.5</span>s.
      <br />- When Phoebe is inside the <b class="text-yellow">Ring of Mirrors</b>, Basic Attack becomes Basic Attack <b> Chamuel's Star</b>, which performs up to 3 consecutive attacks, dealing <b class="text-wuwa-spectro">Spectro DMG</b>, considered Basic Attack DMG.
      `,
      image: 'SP_IconFeibiB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Dawn of Enlightenment`,
      content: `Phoebe concentrates the light in her hands into the Mirror of Enlightenment and smashes it, dealing <b class="text-wuwa-spectro">Spectro DMG</b>.
      <br />- <b>Absolution</b> Enhancement: Increase DMG Multiplier by <span class="text-desc">255%</span>.
      <br />- <b>Confession</b> Enhancement: Apply <span class="text-desc">8</span> stacks of <b class="text-wuwa-spectro">Spectro Frazzle</b> to targets hit.
      `,
      image: 'SP_IconFeibiC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Radiant Invocation`,
      content: `When Phoebe's <b class="text-blue">Prayer</b> is full, consume all <b class="text-blue">Prayer</b> to cast one of the following skills:
      <br />- Holding Basic Attack to cast Heavy Attack Heavy Attack <b>Absolution Litany</b>, dealing <b class="text-wuwa-spectro">Spectro DMG</b> and applying <span class="text-desc">1</span> stack of <b class="text-wuwa-spectro">Spectro Frazzle</b> to the targets hit. Phoebe enters <b>Absolution</b> status, which allows her to deal more DMG.
      <br />- Holding Resonance Skill to cast Resonance Skill <b>Utter Confession</b>, dealing <b class="text-wuwa-spectro">Spectro DMG</b> and applying <span class="text-desc">1</span> stack of <b class="text-wuwa-spectro">Spectro Frazzle</b> to the targets hit. Phoebe enters <b>Confession</b> status, which allows her to better exploit <b class="text-wuwa-spectro">Spectro Frazzle</b>.
      <br />- <b>Absolution</b> status and <b>Confession</b> status cannot exist at the same time. Entering into one will end the other.
      <br />- When <b class="text-heal">Divine Voice</b> is not exhausted, Phoebe is unable to cast Heavy Attack <b>Absolution Litany</b> and Resonance Skill <b>Utter Confession</b>.
      <br />- When <b class="text-heal">Divine Voice</b> is exhausted, Phoebe will not exit the <b>Absolution</b> or <b>Confession</b> status.
      <br />
      <br /><b>Heavy Attack: Starflash</b>
      <br />When Phoebe has <b class="text-heal">Divine Voice</b>, casting Basic Attack Stage 3 or Dodge Counter replaces the next Heavy Attack with <b>Heavy Attack: Starflash</b>, which deals <b class="text-wuwa-spectro">Spectro DMG</b> at the cost of <span class="text-desc">30</span> <b class="text-heal">Divine Voice</b>.
      <br />- <b>Absolution</b> Enhancement: Reduce the cost of <b class="text-heal">Divine Voice</b> by <span class="text-desc">15</span>. When the targets hit have <b class="text-wuwa-spectro">Spectro Frazzle</b>, the skill gains <span class="text-desc">256%</span> DMG Amplification.
      <br />- <b>Confession</b> Enhancement: Apply <span class="text-desc">5</span> stacks of <b class="text-wuwa-spectro">Spectro Frazzle</b> to the targets hit.
      <br />
      <br /><b class="text-blue">Prayer</b>
      <br />Phoebe can hold up to <span class="text-desc">120</span> <b class="text-blue">Prayer</b>.
      <br />Phoebe automatically gains <span class="text-desc">5</span> <b class="text-blue">Prayer</b> every second.
      <br />
      <br /><b class="text-heal">Divine Voice</b>
      <br />Phoebe can hold up to <span class="text-desc">60</span> <b class="text-heal">Divine Voice</b>.
      <br />Casting Heavy Attack <b>Absolution Litany</b> or Resonance Skill <b>Utter Confession</b> restores <span class="text-desc">60</span> <b class="text-heal">Divine Voice</b>.
      `,
      image: 'SP_IconFeibiY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Golden Grace`,
      content: `Knock back nearby targets and deal <b class="text-wuwa-spectro">Spectro DMG</b>.`,
      image: 'SP_IconFeibiQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Attentive Heart`,
      content: `Deal <b class="text-wuwa-spectro">Spectro DMG</b> equal to <span class="text-desc">528.41%</span> of Phoebe's ATK to nearby targets.
      <br />- <b>Absolution</b> Enhancement: Increase DMG Multiplier by <span class="text-desc">255%</span>.
      <br />- <b>Confession</b> Enhancement: Grant <b>Silent Prayer</b> to the Resonator on the field, reducing the <b class="text-wuwa-spectro">Spectro RES</b> of nearby targets by <span class="text-desc">10%</span> and granting <span class="text-desc">100%</span> <b class="text-wuwa-spectro">Spectro Frazzle</b> DMG Amplification. When <b class="text-wuwa-spectro">Spectro Frazzle</b> inflicts DMG, extend <b class="text-wuwa-spectro">Spectro Frazzle</b>'s damage interval by <span class="text-desc">50%</span>. This effect lasts <span class="text-desc">30</span>s or until Phoebe switches to <b>Absolution</b> status.`,
      image: 'SP_IconFeibiT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Presence`,
      content: `Mid-Air Heavy Attack Attack can be cast <span class="text-desc">1</span> more time.`,
      image: 'SP_IconFeibiD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Revelation`,
      content: `When in the <b>Absolution</b> status and <b>Confession</b> status, <b class="text-wuwa-spectro">Spectro DMG Bonus</b> is increased by <span class="text-desc">12%</span>.`,
      image: 'SP_IconFeibiD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Warm Light and Bedside Wishes`,
      content: `Under the <b>Absolution</b> status, activate Resonance Liberation <b>Dawn of Enlightenment</b> to increase the DMG Multiplier effect from <span class="text-desc">145%</span> to <span class="text-desc">275%</span>. Under the <b>Confession</b> status, activate Resonance Liberation <b>Dawn of Enlightenment</b> to increase the DMG Multiplier by <span class="text-desc">70%</span>, and add <b class="text-wuwa-spectro">Spectro Frazzle</b> Effect stacks up to the maximum that can be received by the target.`,
      image: 'T_IconDevice_FeibiM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `A Boat Adrift in Tears`,
      content: `Under the <b>Absolution</b> status, DMG dealt by Outro Skills to enemies with the <b class="text-wuwa-spectro">Spectro Frazzle</b> Effect is amplified by <span class="text-desc">150%</span>. Under the <b>Confession</b> status, DMG dealt by the <b class="text-wuwa-spectro">Spectro Frazzle</b> Effect of the <b>Silent Prayer</b> is amplified by <span class="text-desc">120%</span>, targets hit with Heavy Attack <b>Starlight Brilliance</b> receive an extra <span class="text-desc">2</span> stacks of <b class="text-wuwa-spectro">Spectro Frazzle</b> Effect.`,
      image: 'T_IconDevice_FeibiM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Daisies Weaving Wreaths and Dreams`,
      content: `The multiplier of the DMG dealt by Heavy Attack <b>Starlight Brilliance</b> is increased by <span class="text-desc">85%</span>.`,
      image: 'T_IconDevice_FeibiM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Ringing Bells on Wings Aloft`,
      content: `When Basic Attack or Basic Attack <b>Chamuel's Star</b> hits, the target's <b class="text-wuwa-spectro">Spectro RES</b> decreases by <span class="text-desc">10%</span> for <span class="text-desc">30</span>s.`,
      image: 'T_IconDevice_FeibiM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Pray to the Distant Light`,
      content: `Casting Intro Skill <b>Golden Grace</b> increases Phoebe's <b class="text-wuwa-spectro">Spectro DMG Bonus</b> by <span class="text-desc">12%</span> for <span class="text-desc">15</span>s.`,
      image: 'T_IconDevice_FeibiM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Whispers of the Bluebird`,
      content: `Targets entering the <b class="text-yellow">Ring of Mirrors</b> are stagnated for an additional <span class="text-desc">2</span>s. The stagnation effect affects all targets entering the <b class="text-yellow">Ring of Mirrors</b> and can be applied to <span class="text-desc">12</span> targets max for each <b class="text-yellow">Ring of Mirrors</b>. Each target will only be affected by this effect once.
      <br />When in <b>Absolution</b> or <b>Confession</b>, summoning a <b class="text-yellow">Ring of Mirrors</b> with Resonance Skill increases Phoebe's ATK by <span class="text-desc">10%</span> for <span class="text-desc">20</span>s, and triggers an extra Heavy Attack Starflash at the <b class="text-yellow">Ring of Mirrors</b>' location. This Heavy Attack <b>Starflash</b> does not consume <b class="text-heal">Divine Voice</b> and is not considered as casting a Heavy Attack.`,
      image: 'T_IconDevice_FeibiM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'element',
      options: [
        { name: 'None', value: '' },
        { name: 'Absolution', value: 'absolution' },
        { name: 'Confession', value: 'confession' },
      ],
      id: 'forte_state',
      text: `Current Forte State`,
      ...talents.forte,
      show: true,
      default: 'absolution',
    },
    {
      type: 'toggle',
      id: 'silent_prayer',
      text: `Silent Prayer`,
      ...talents.forte,
      show: true,
      default: true,
      debuff: true,
    },
    {
      type: 'toggle',
      id: 'phoebe_c2',
      text: `S2 Absolution Enhanced Outro`,
      ...talents.c2,
      show: c >= 2,
      default: true,
    },
    {
      type: 'toggle',
      id: 'phoebe_c4',
      text: `S4 Spectro RES Shred`,
      ...talents.c4,
      show: c >= 4,
      default: true,
      debuff: true,
    },
    {
      type: 'toggle',
      id: 'phoebe_c5',
      text: `S5 Spectro DMG Bonus`,
      ...talents.c5,
      show: c >= 5,
      default: true,
    },
    {
      type: 'toggle',
      id: 'phoebe_c6',
      text: `S6 ATK Bonus`,
      ...talents.c6,
      show: c >= 6,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'silent_prayer'), findContentById(content, 'phoebe_c4')]

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
          value: [{ scaling: calcScaling(0.1485, normal), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 2 DMG',
          value: [
            { scaling: calcScaling(0.1125, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1375, normal), multiplier: Stats.ATK },
          ],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.0717, normal), multiplier: Stats.ATK, hits: 8 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.208, normal), multiplier: Stats.ATK, hits: 4 }],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.2325, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.1086, normal), multiplier: Stats.ATK, hits: 8 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: `Chamuel's Star: Dodge Counter DMG`,
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.2205, normal), multiplier: Stats.ATK, hits: 6 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'To Where Light Shines DMG',
          value: [{ scaling: calcScaling(0.315, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Refracted Holy Light DMG',
          value: [{ scaling: calcScaling(0.075, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: `Chamuel's Star: Stage 1 DMG`,
          value: [{ scaling: calcScaling(0.2985, skill), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: `Chamuel's Star: Stage 2 DMG`,
          value: [{ scaling: calcScaling(0.2, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
        {
          name: `Chamuel's Star: Stage 3 DMG`,
          value: [{ scaling: calcScaling(0.1455, skill), multiplier: Stats.ATK, hits: 6 }],
          element: Element.SPECTRO,
          property: TalentProperty.BA,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Dawn of Enlightenment DMG',
          value: [{ scaling: calcScaling(2.02, lib), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.LIB,
          multiplier:
            form.forte_state === 'absolution'
              ? c >= 1
                ? 5.8
                : 3.55
              : form.forte_state === 'confession' && c >= 1
              ? 1.9
              : 1,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Absolution Litany DMG',
          value: [{ scaling: calcScaling(3.21, forte), multiplier: Stats.ATK, hits: 3 }],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
        },
        {
          name: 'Utter Confession DMG',
          value: [{ scaling: calcScaling(0.0945, forte), multiplier: Stats.ATK, hits: 3 }],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Heavy Attack: Starflash DMG',
          value: [{ scaling: calcScaling(0.4159, forte), multiplier: Stats.ATK, hits: 3 }],
          element: Element.SPECTRO,
          property: TalentProperty.HA,
          amp: form.forte_state === 'absolution' ? 2.56 : 0,
          multiplier: c >= 3 ? (form.forte_state === 'absolution' ? 1.91 : 3.49) : 1,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Golden Grace DMG`,
          value: [{ scaling: calcScaling(1, intro), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.INTRO,
        },
      ]
      base.OUTRO_SCALING = [
        {
          name: `Attentive Heart DMG`,
          value: [{ scaling: 5.2841, multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.OUTRO,
          multiplier: form.forte_state === 'absolution' ? 2.55 : 1,
        },
      ]

      if (form.silent_prayer) {
        base.SPECTRO_RES_PEN.push({
          name: `Silent Prayer`,
          source: 'Self',
          value: 0.1,
        })
      }
      if (i.i2 && !!form.forte_state) {
        base[Stats.SPECTRO_DMG].push({
          name: `Inherent Skill 2`,
          source: 'Self',
          value: 0.12,
        })
      }
      if (form.phoebe_c4) {
        base.SPECTRO_RES_PEN.push({
          name: `Sequence Node 4`,
          source: 'Self',
          value: 0.1,
        })
      }
      if (form.phoebe_c5) {
        base[Stats.SPECTRO_DMG].push({
          name: `Sequence Node 5`,
          source: 'Self',
          value: 0.12,
        })
      }
      if (form.phoebe_c6) {
        base[Stats.P_ATK].push({
          name: `Sequence Node 6`,
          source: 'Self',
          value: 0.1,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.silent_prayer) {
        base.SPECTRO_RES_PEN.push({
          name: `Silent Prayer`,
          source: 'Phoebe',
          value: 0.1,
        })
      }
      if (form.phoebe_c4) {
        base.SPECTRO_RES_PEN.push({
          name: `Sequence Node 4`,
          source: 'Phoebe',
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
      return base
    },
  }
}

export default Phoebe
