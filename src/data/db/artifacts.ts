import { calcRefinement } from '@src/core/utils/data_format'
import { Element, IArtifact, Stats, TalentProperty } from '@src/domain/constant'
import _ from 'lodash'
import { StatsObject } from '../lib/stats/baseConstant'
import { CharStats } from './characters'

export enum Sonata {
  FREEZING_FROST = 'Freezing Frost',
  MOLTEN_RIFT = 'Molten Rift',
  VOID_THUNDER = 'Void Thunder',
  SIERRA_GALE = 'Sierra Gale',
  CELESTIAL_LIGHT = 'Celestial Light',
  SUN_SINKING_ECLIPSE = 'Sun-sinking Eclipse',
  REJUVENATING_GLOW = 'Rejuvenating Glow',
  MOONLIT_CLOUDS = 'Moonlit Clouds',
  LINGERING_TUNES = 'Lingering Tunes',
  FROSTY_RESOLVE = 'Frosty Resolve',
  ETERNAL_RADIANCE = 'Eternal Radiance',
  MIDNIGHT_VEIL = `Midnight Veil`,
  EMPYREAN_ANTHEM = `Empyrean Anthem`,
  TIDEBREAKING_COURAGE = 'Tidebreaking Courage',
  GUST_OF_WELKIN = 'Gusts of Welkin',
  WINDWARD = 'Windward Pilgrimage',
  FLAMING_CLAWPRINT = 'Flaming Clawprint',
  DREAM = 'Dream of the Lost',
}

export const SonataDetail = {
  [Sonata.MOLTEN_RIFT]: [
    {
      desc: `<b class="text-wuwa-fusion">Fusion DMG</b> + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.FUSION_DMG, value: 0.1 },
    },
    {
      desc: `<b class="text-wuwa-fusion">Fusion DMG</b> + <span class="text-desc">30%</span> for <span class="text-desc">15</span>s after releasing Resonance Skill.`,
    },
  ],
  [Sonata.VOID_THUNDER]: [
    {
      desc: `<b class="text-wuwa-electro">Electro DMG</b> + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.ELECTRO_DMG, value: 0.1 },
    },
    {
      desc: `<b class="text-wuwa-electro">Electro DMG</b> + <span class="text-desc">15%</span> after releasing Heavy Attack or Resonance Skill. This effect stacks up to <span class="text-desc">2</span> times, each stack lasts <span class="text-desc">15</span>s.`,
    },
  ],
  [Sonata.SIERRA_GALE]: [
    {
      desc: `<b class="text-wuwa-aero">Aero DMG</b> + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.AERO_DMG, value: 0.1 },
    },
    {
      desc: `<b class="text-wuwa-aero">Aero DMG</b> + <span class="text-desc">30%</span> for <span class="text-desc">15</span>s after releasing Intro Skill.`,
    },
  ],
  [Sonata.SUN_SINKING_ECLIPSE]: [
    {
      desc: `<b class="text-wuwa-havoc">Havoc DMG</b> + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.HAVOC_DMG, value: 0.1 },
    },
    {
      desc: `<b class="text-wuwa-havoc">Havoc DMG</b> + <span class="text-desc">7.5%</span> after releasing Basic Attack or Heavy Attack. This effect stacks up to <span class="text-desc">4</span> times, each stack lasts <span class="text-desc">15</span>s.`,
    },
  ],
  [Sonata.CELESTIAL_LIGHT]: [
    {
      desc: `<b class="text-wuwa-spectro">Spectro DMG</b> + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.SPECTRO_DMG, value: 0.1 },
    },
    {
      desc: `<b class="text-wuwa-spectro">Spectro DMG</b> + <span class="text-desc">30%</span> for <span class="text-desc">15</span>s after releasing Intro Skill.`,
    },
  ],
  [Sonata.FREEZING_FROST]: [
    {
      desc: `<b class="text-wuwa-glacio">Glacio DMG</b> + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.GLACIO_DMG, value: 0.1 },
    },
    {
      desc: `<b class="text-wuwa-glacio">Glacio DMG</b> + <span class="text-desc">10%</span> after releasing Basic Attack or Heavy Attack. This effect stacks up to <span class="text-desc">3</span> times, each stack lasts <span class="text-desc">15</span>s.`,
    },
  ],
  [Sonata.REJUVENATING_GLOW]: [
    {
      desc: `Healing Bonus + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.HEAL, value: 0.1 },
    },
    {
      desc: `Increases the ATK of all party members by <span class="text-desc">15%</span> for <span class="text-desc">30</span>s upon healing allies.`,
    },
  ],
  [Sonata.MOONLIT_CLOUDS]: [
    {
      desc: `Energy Regen + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.ER, value: 0.1 },
    },
    {
      desc: `Upon using Outro Skill, increases the ATK of the next Resonator by <span class="text-desc">22.5%</span> for <span class="text-desc">15</span>s.`,
    },
  ],
  [Sonata.LINGERING_TUNES]: [
    {
      desc: `ATK + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.P_ATK, value: 0.1 },
    },
    {
      desc: `While on the field, ATK increases by <span class="text-desc">5%</span> every <span class="text-desc">1.5</span>s. This effect stacks up to <span class="text-desc">4</span> times. Outro Skill DMG + <span class="text-desc">60%</span>.`,
      bonus: { stat: Stats.OUTRO_DMG, value: 0.6 },
    },
  ],
  [Sonata.FROSTY_RESOLVE]: [
    {
      desc: `Resonance Skill DMG + <span class="text-desc">12%</span>.`,
      bonus: { stat: Stats.SKILL_DMG, value: 0.12 },
    },
    {
      desc: `Casting Resonance Skill grants <span class="text-desc">22.5%</span> <b class="text-wuwa-glacio">Glacio DMG Bonus</b> for <span class="text-desc">15</span>s and casting Resonance Liberation increases Resonance Skill DMG <span class="text-desc">18%</span>, lasting for <span class="text-desc">5</span>s. This effect stacks up to <span class="text-desc">2</span> times.`,
    },
  ],
  [Sonata.ETERNAL_RADIANCE]: [
    {
      desc: `<b class="text-wuwa-spectro">Spectro DMG</b> + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.SPECTRO_DMG, value: 0.1 },
    },
    {
      desc: `Inflicting enemies with <b class="text-wuwa-spectro">Spectro Frazzle</b> increases Crit. Rate by <span class="text-desc">20%</span> for <span class="text-desc">15</span>s.
      <br />Attacking enemies with <span class="text-desc">10</span> stacks of <b class="text-wuwa-spectro">Spectro Frazzle</b> grants <span class="text-desc">15%</span> <b class="text-wuwa-spectro">Spectro DMG Bonus</b> for <span class="text-desc">15</span>s.`,
    },
  ],
  [Sonata.MIDNIGHT_VEIL]: [
    {
      desc: `<b class="text-wuwa-havoc">Havoc DMG</b> + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.HAVOC_DMG, value: 0.1 },
    },
    {
      desc: `When Outro Skill is triggered, deal additional <span class="text-desc">480%</span> <b class="text-wuwa-havoc">Havoc DMG</b> to surrounding enemies, considered Outro Skill DMG, and grant the incoming Resonator <span class="text-desc">15%</span> <b class="text-wuwa-havoc">Havoc DMG Bonus</b> for <span class="text-desc">15</span>s.`,
      callback: (base: StatsObject) => {
        base.OUTRO_SCALING.push({
          name: `Midnight Veil Outro DMG`,
          scale: Stats.ATK,
          value: [{ scaling: 4.8, multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.OUTRO,
        })
        return base
      },
    },
  ],
  [Sonata.EMPYREAN_ANTHEM]: [
    {
      desc: `Energy Regen + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.ER, value: 0.1 },
    },
    {
      desc: `Increase the Resonator's Coordinated Attack DMG by <span class="text-desc">80%</span>. Upon a critical hit of Coordinated Attack, increase the active Resonator's ATK by <span class="text-desc">20%</span> for <span class="text-desc">4</span>s.`,
      bonus: { stat: Stats.COORD_DMG, value: 0.8 },
    },
  ],
  [Sonata.TIDEBREAKING_COURAGE]: [
    {
      desc: `Energy Regen + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.ER, value: 0.1 },
    },
    {
      desc: `Increase the Resonator's ATK by <span class="text-desc">15%</span>. Reaching <span class="text-desc">250%</span> Energy Regen increases all <b>Attribute DMG Bonus</b> by <span class="text-desc">30%</span> for the Resonator.`,
      bonus: { stat: Stats.P_ATK, value: 0.15 },
      callback: (base: StatsObject) => {
        if (base.getValue(Stats.ER) >= 2.5) {
          base[Stats.ATTR_DMG].push({
            value: 0.3,
            name: '5 Piece',
            source: Sonata.TIDEBREAKING_COURAGE,
          })
        }
        return base
      },
    },
  ],
  [Sonata.GUST_OF_WELKIN]: [
    {
      desc: `<b class="text-wuwa-aero">Aero DMG</b> + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.AERO_DMG, value: 0.1 },
    },
    {
      desc: `Inflicting <b class="text-wuwa-aero">Aero Erosion</b> upon enemies increases <b class="text-wuwa-aero">Aero DMG</b> for other Resonators in the team by <span class="text-desc">15%</span>, and for the equipped Resonator by an additional <span class="text-desc">20%</span>, lasting for <span class="text-desc"></span>s.`,
    },
  ],
  [Sonata.WINDWARD]: [
    {
      desc: `<b class="text-wuwa-aero">Aero DMG</b> + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.AERO_DMG, value: 0.1 },
    },
    {
      desc: `Hitting a target with <b class="text-wuwa-aero">Aero Erosion</b> increases Crit. Rate by <span class="text-desc">10%</span> and grants <span class="text-desc">30%</span> <b class="text-wuwa-aero">Aero DMG Bonus</b>, lasting for <span class="text-desc">10</span>s.`,
    },
  ],
  [Sonata.FLAMING_CLAWPRINT]: [
    {
      desc: `<b class="text-wuwa-fusion">Fusion DMG</b> + <span class="text-desc">10%</span>.`,
      bonus: { stat: Stats.FUSION_DMG, value: 0.1 },
    },
    {
      desc: `Casting Resonance Liberation increases <b class="text-wuwa-fusion">Fusion DMG</b> of Resonators in the team by <span class="text-desc">15%</span> and the caster's Resonance Liberation DMG by <span class="text-desc">20%</span>, lasting for <span class="text-desc">35</span>s.`,
    },
  ],
  [Sonata.DREAM]: [
    {
      desc: `Holding <span class="text-desc">0</span> Resonance Energy increases Crit. Rate by <span class="text-desc">20%</span> and grants <span class="text-desc">35%</span> Echo Skill DMG Bonus.`,
    },
  ],
}

export const SonataBonusFunc = {
  [Sonata.DREAM]: (base: StatsObject, char: CharStats, setCount: number) => {
    if (!char?.stat?.energy && setCount === 3) {
      base[Stats.CRIT_RATE].push({
        name: `3 Piece`,
        source: Sonata.DREAM,
        value: 0.2,
      })
      base[Stats.ECHO_DMG].push({
        name: `3 Piece`,
        source: Sonata.DREAM,
        value: 0.35,
      })
    }
    return base
  },
}

export const Echoes: IArtifact[] = [
  {
    id: '6000038',
    name: 'Hooscamp',
    icon: 'T_IconMonsterGoods_988_UI',
    skill: 'T_MstSkil_988_UI',
    sonata: [Sonata.SIERRA_GALE, Sonata.LINGERING_TUNES],
    desc: `Transform into Hooscamp Flinger and pounce at the enemies, dealing {{0}}%+{{1}} <b class="text-wuwa-aero">Aero DMG</b>.`,
    properties: [
      { base: 34.5, growth: 4.5 },
      { base: 69, growth: 9 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Pounce DMG',
        value: [{ scaling: calcRefinement(0.345, 0.045, r), multiplier: Stats.ATK }],
        flat: calcRefinement(69, 9, r),
        element: Element.AERO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000039',
    name: 'Tempest Mephis',
    icon: 'T_IconMonsterGoods_221_UI',
    skill: 'T_MstSkil_Z_B3_UI',
    sonata: [Sonata.VOID_THUNDER],
    desc: `Transform into Tempest Mephis to perform tail swing attacks followed by a claw attack. The lightning strike summoned by the tail swing deals {{0}}% <b class="text-wuwa-electro">Electro DMG</b> each time, while the claw attack deals {{1}}% <b class="text-wuwa-electro">Electro DMG</b>.
    <br />
    <br />After the claw hit, increase the current character's <b class="text-wuwa-electro">Electro DMG</b> by <span class="text-desc">12%</span> and Heavy Attack DMG by <span class="text-desc">12%</span> for <span class="text-desc">15</span>s.`,
    properties: [
      { base: 73.66, growth: 9.605 },
      { base: 126.27, growth: 16.47 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Lightning Strike DMG',
          value: [{ scaling: calcRefinement(0.7366, 0.09605, r), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Claw Attack DMG',
          value: [{ scaling: calcRefinement(1.2627, 0.1647, r), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 4,
  },
  {
    id: '60000895',
    name: 'Nightmare: Tempest Mephis',
    icon: 'T_IconMonsterHead_YZ_33017_UI',
    skill: 'T_MstSkil_Z_B3_UI',
    sonata: [Sonata.EMPYREAN_ANTHEM, Sonata.VOID_THUNDER],
    desc: `Transform into Nightmare: Tempest Mephis and attack surrounding enemies, dealing {{0}}% <b class="text-wuwa-electro">Electro DMG</b>.
    <br />The Resonator with this Echo equipped in their main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-electro">Electro DMG Bonus</b> and <span class="text-desc">12%</span> Resonance Skill DMG Bonus.`,
    properties: [{ base: 550.85, growth: 71.85 }],
    bonus: (base, r) => {
      base[Stats.ELECTRO_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Nightmare: Tempest Mephis',
      })
      base[Stats.SKILL_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Nightmare: Tempest Mephis',
      })
      base.ECHO_SCALING.push({
        name: 'Tempest Mephis DMG',
        value: [{ scaling: calcRefinement(5.5085, 0.7185, r), multiplier: Stats.ATK }],
        element: Element.ELECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 4,
  },
  {
    id: '6000040',
    name: 'Hoochief',
    icon: 'T_IconMonsterGoods_989_UI',
    skill: 'T_MstSkil_989_UI',
    sonata: [Sonata.SIERRA_GALE],
    desc: `Transform into Hoochief and smack the enemies, dealing {{0}}% <b class="text-wuwa-aero">Aero DMG</b>.`,
    properties: [{ base: 178.8, growth: 29.8 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Smack DMG',
        value: [{ scaling: calcRefinement(1.788, 0.298, r), multiplier: Stats.ATK }],
        element: Element.AERO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '6000041',
    name: 'Diamondclaw',
    icon: 'T_IconMonsterGoods_987_UI',
    skill: 'T_MstSkil_987_UI',
    sonata: [Sonata.MOONLIT_CLOUDS, Sonata.LINGERING_TUNES],
    desc: `Transform into Crystal Scorpion and enter a Parry State. Counterattack when the Parry State is over, dealing {{0}}%+{{1}} <b class="text-slate-400">Physical DMG</b>.`,
    properties: [
      { base: 34.5, growth: 4.5 },
      { base: 69, growth: 9 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Counterattack DMG',
        value: [{ scaling: calcRefinement(0.345, 0.045, r), multiplier: Stats.ATK }],
        flat: calcRefinement(69, 9, r),
        element: Element.PHYSICAL,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000042',
    name: 'Crownless',
    icon: 'T_IconMonsterGoods_9991_UI',
    skill: 'T_MstSkil_Z_B8_UI',
    sonata: [Sonata.SUN_SINKING_ECLIPSE],
    desc: `Transform into Crownless and perform up to <span class="text-desc">4</span> consecutive attacks. The first <span class="text-desc">2</span> attacks deal {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b> each, the <span class="text-desc">3rd</span> attack deals {{1}}% <b class="text-wuwa-havoc">Havoc DMG</b> <span class="text-desc">2</span> times, and the <span class="text-desc">4th</span> attack deals {{2}}% <b class="text-wuwa-havoc">Havoc DMG</b> <span class="text-desc">3</span> times.
    <br />After the transformation, increase current character's <b class="text-wuwa-havoc">Havoc DMG</b> by <span class="text-desc">12%</span> and Resonance Skill DMG by <span class="text-desc">12%</span> for <span class="text-desc">15</span>s.`,
    properties: [
      { base: 96.37, growth: 12.57 },
      { base: 72.28, growth: 9.43 },
      { base: 48.19, growth: 6.28 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Stage 1 & 2 DMG',
          value: [{ scaling: calcRefinement(0.9637, 0.1257, r), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcRefinement(0.7228, 0.0943, r), multiplier: Stats.ATK, hits: 2 }],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcRefinement(0.4819, 0.0628, r), multiplier: Stats.ATK, hits: 3 }],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 4,
  },
  {
    id: '60000905',
    name: 'Nightmare: Crownless',
    icon: 'T_IconMonsterHead_YZ_33018_UI',
    skill: 'T_MstSkil_Z_B8_UI',
    sonata: [Sonata.SUN_SINKING_ECLIPSE],
    desc: `Transform into Nightmare: Crownless and attack enemies in front, dealing {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b>. The Resonator with this Echo equipped in their main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-havoc">Havoc DMG Bonus</b> and <span class="text-desc">12%</span> Basic Attack DMG Bonus.
    <br />This skill has <span class="text-desc">3</span> initial charges, replenished once every <span class="text-desc">12</span>s, max <span class="text-desc">3</span> charges. When Nightmare: Crownless hits a target, DMG dealt by this skill is increased by <span class="text-desc">20%</span>. This effect lasts for <span class="text-desc">2</span>s and does not stack.`,
    properties: [{ base: 176.4, growth: 29.4 }],
    bonus: (base, r) => {
      base[Stats.HAVOC_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Nightmare: Crownless',
      })
      base[Stats.BASIC_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Nightmare: Crownless',
      })
      base.ECHO_SCALING.push(
        {
          name: 'DMG per Charge',
          value: [{ scaling: calcRefinement(1.764, 0.294, r), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Enhanced DMG per Charge',
          value: [{ scaling: calcRefinement(1.764, 0.294, r), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
          bonus: 0.2,
        }
      )
      return base
    },
    cost: 4,
  },
  {
    id: '6000043',
    name: 'Feilian Beringal',
    icon: 'T_IconMonsterGoods_996_UI',
    skill: 'T_Mstskil_996_UI',
    sonata: [Sonata.SIERRA_GALE],
    desc: `Transform into Feilian Beringal to perform a powerful kick. If the kick lands on an enemy, immediately perform a follow-up strike. The kick deals {{0}}% <b class="text-wuwa-aero">Aero DMG</b>, and the follow-up strike deals {{1}}% <b class="text-wuwa-aero">Aero DMG</b>.
    <br />
    <br />After the follow-up strike hits, the current character's <b class="text-wuwa-aero">Aero DMG</b> increases by <span class="text-desc">12%</span>, and the Heavy Attack DMG increases by <span class="text-desc">12%</span> for <span class="text-desc">15</span>s.`,
    properties: [
      { base: 116.64, growth: 71.73 },
      { base: 203.67, growth: 26.56 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Kick DMG',
          value: [{ scaling: calcRefinement(1.1664, 0.7173, r), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Follow-Up DMG',
          value: [{ scaling: calcRefinement(2.0367, 0.2656, r), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 4,
  },
  {
    id: '6000044',
    name: 'Lampylumen Myriad',
    icon: 'T_IconMonsterGoods_994_UI',
    skill: 'T_Mstskil_994_UI',
    sonata: [Sonata.FREEZING_FROST],
    desc: `Transform into Lampylumen Myriad. Perform up to <span class="text-desc">3</span> consecutive attacks.
    <br />
    <br />Unleash a freezing shock by performing consecutive forward strikes, with the initial two strikes inflicting {{0}}% and {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b> respectively, and the final strike dealing {{1}}% <b class="text-wuwa-glacio">Glacio DMG</b>. Enemies will be frozen on hit.
    <br />
    <br />Each shock increases the current character's <b class="text-wuwa-glacio">Glacio DMG</b> by <span class="text-desc">4%</span> and Resonance Skill DMG dealt by <span class="text-desc">4%</span> for <span class="text-desc">15</span>s, stacking up to <span class="text-desc">3</span> times.`,
    properties: [
      { base: 143.87, growth: 18.76 },
      { base: 191.82, growth: 25.02 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Stage 1 & 2 DMG',
          value: [{ scaling: calcRefinement(1.4387, 0.1876, r), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcRefinement(1.9182, 0.2502, r), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 4,
  },
  {
    id: '6000045',
    name: 'Mourning Aix',
    icon: 'T_IconMonsterGoods_997_UI',
    skill: 'T_MstSkil_997_UI',
    sonata: [Sonata.CELESTIAL_LIGHT],
    desc: `Transform into Mourning Aix and perform <span class="text-desc">2</span> consecutive claw attacks, each attack dealing {{0}}% and {{1}}% <b class="text-wuwa-spectro">Spectro DMG</b> respectively.
    <br />
    <br />After the transformation, increase current character's <b class="text-wuwa-spectro">Spectro DMG</b> by <span class="text-desc">12%</span> and Resonance Liberation DMG by <span class="text-desc">12%</span> for <span class="text-desc">15</span>s.`,
    properties: [
      { base: 113.16, growth: 14.76 },
      { base: 169.74, growth: 22.14 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Stage 1 & 2 DMG',
          value: [{ scaling: calcRefinement(1.1316, 0.1476, r), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcRefinement(1.6974, 0.2214, r), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 4,
  },
  {
    id: '60000925',
    name: 'Nightmare: Mourning Aix',
    icon: 'T_IconMonsterHead_YZ_33020_UI',
    skill: 'T_MstSkil_997_UI',
    sonata: [Sonata.ETERNAL_RADIANCE],
    desc: `Summon a Nightmare: Mourning Aix to attack surrounding enemies, dealing {{0}}% <b class="text-wuwa-spectro">Spectro DMG</b>. DMG dealt to enemies inflicted by <b class="text-wuwa-spectro">Spectro Frazzle</b> is increased by <span class="text-desc">100%</span>.
    <br />The Resonator with this Echo equipped in their main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-spectro">Spectro DMG Bonus</b>.`,
    properties: [{ base: 182.4, growth: 30.4 }],
    bonus: (base, r) => {
      base[Stats.SPECTRO_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Nightmare: Mourning Aix',
      })
      base.ECHO_SCALING.push(
        {
          name: 'Attack DMG',
          value: [{ scaling: calcRefinement(1.824, 0.304, r), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Enhanced Attack DMG',
          value: [{ scaling: calcRefinement(1.824, 0.304, r), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
          bonus: 1,
        }
      )
      return base
    },
    cost: 4,
  },
  {
    id: '6000046',
    name: 'Carapace',
    icon: 'T_IconMonsterGoods_970_UI',
    skill: 'T_MstSkil_970_UI',
    sonata: [Sonata.SIERRA_GALE, Sonata.MOONLIT_CLOUDS],
    desc: `Transform into Carapace to perform a spinning attack that deals {{0}}% <b class="text-wuwa-aero">Aero DMG</b>, followed by a slash that deals {{1}}% <b class="text-wuwa-aero">Aero DMG</b>.`,
    properties: [
      { base: 80.5, growth: 10.5 },
      { base: 120.75, growth: 15.75 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Spin DMG',
          value: [{ scaling: calcRefinement(0.805, 0.105, r), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Slash DMG',
          value: [{ scaling: calcRefinement(1.2075, 0.1575, r), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 3,
  },
  {
    id: '6000047',
    name: 'Chirpuff',
    icon: 'T_IconMonsterGoods_971_UI',
    skill: 'T_MstSkil_971_UI',
    sonata: [Sonata.SIERRA_GALE, Sonata.SUN_SINKING_ECLIPSE],
    desc: `Summon a Chirpuff that self-inflates and blasts a powerful gust of wind forward <span class="text-desc">3</span> times. Each blast inflicts {{0}}% <b class="text-wuwa-aero">Aero DMG</b> and pushes enemies backwards.`,
    properties: [{ base: 27.6, growth: 3.6 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Wind Blast DMG',
        value: [{ scaling: calcRefinement(0.276, 0.036, r), multiplier: Stats.ATK }],
        element: Element.AERO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000048',
    name: 'Mech Abomination',
    icon: 'T_IconMonsterHead_993_UI',
    skill: 'T_MstSkil_1001_UI',
    sonata: [Sonata.LINGERING_TUNES],
    desc: `Strike enemies in front, dealing {{0}}% <b class="text-wuwa-electro">Electro DMG</b>, and summon Mech Waste to attack. Mech Waste deals {{1}}% <b class="text-wuwa-electro">Electro DMG</b> on hit and explodes after a while, dealing {{2}}% <b class="text-wuwa-electro">Electro DMG</b>.
    <br />
    <br />After casting this Echo Skill, increase the current character's ATK by <span class="text-desc">12%</span> for <span class="text-desc">15</span>s.
    <br />Damage dealt by Mech Waste equals to the Resonator's Outro Skill DMG.`,
    properties: [
      { base: 34.96, growth: 4.56 },
      { base: 230, growth: 30 },
      { base: 115, growth: 15 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Strike DMG',
          value: [{ scaling: calcRefinement(0.3496, 0.0456, r), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Mech Waste DMG',
          value: [{ scaling: calcRefinement(2.3, 0.3, r), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.OUTRO,
        },
        {
          name: 'Explosion DMG',
          value: [{ scaling: calcRefinement(1.15, 0.15, r), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.OUTRO,
        }
      )
      return base
    },
    cost: 4,
  },
  {
    id: '6000049',
    name: 'Autopuppet Scout',
    icon: 'T_IconMonsterHead_1003_UI',
    skill: 'T_MstSkil_1000_UI',
    sonata: [Sonata.FREEZING_FROST, Sonata.CELESTIAL_LIGHT],
    desc: `Transform into Autopuppet Scout, dealing {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b> to the surroundings, and generate up to <span class="text-desc">3</span> Ice Walls to block off the enemies.`,
    properties: [{ base: 195.5, growth: 5.5 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Strike DMG',
        value: [{ scaling: calcRefinement(1.955, 0.055, r), multiplier: Stats.ATK }],
        element: Element.GLACIO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '6000050',
    name: 'Traffic Illuminator',
    icon: 'T_IconMonsterHead_1000_UI',
    skill: 'T_MstSkil_999_UI',
    sonata: [Sonata.MOLTEN_RIFT, Sonata.VOID_THUNDER, Sonata.SIERRA_GALE],
    desc: `Summon a Traffic Illuminator, immobilizing enemies for up to <span class="text-desc">1</span>s. The immobilization will be lifted once the enemy is hit.`,
    properties: [],
    cost: 1,
  },
  {
    id: '6000051',
    name: 'Clang Bang',
    icon: 'T_IconMonsterHead_1001_UI',
    skill: 'T_MstSkil_998_UI',
    sonata: [Sonata.CELESTIAL_LIGHT, Sonata.FREEZING_FROST],
    desc: `Summon a Clang Bang that follows the enemy and eventually self-combusts, dealing {{0}}%+{{1}} <b class="text-wuwa-glacio">Glacio DMG</b>.`,
    properties: [
      { base: 23, growth: 3 },
      { base: 46, growth: 6 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Self-Combust DMG',
        value: [{ scaling: calcRefinement(0.23, 0.03, r), multiplier: Stats.ATK }],
        flat: calcRefinement(46, 6, r),
        element: Element.GLACIO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000052',
    name: 'Impermanence Heron',
    icon: 'T_IconMonsterHead_995_UI',
    skill: 'T_MstSkil_995_UI',
    sonata: [Sonata.MOONLIT_CLOUDS],
    desc: `Transform into Impermanence Heron to fly up and smack down, dealing {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b>.
    <br />
    <br />Long press to stay as Impermanence Heron and continuously spit flames, each attack dealing {{1}}% <b class="text-wuwa-havoc">Havoc DMG</b>.
    <br />
    <br />Once the initial attack lands on any enemy, the current character regains <span class="text-desc">10</span> Resonance Energy. If the current character uses their Outro Skill within the next <span class="text-desc">15</span>s, the next character's damage dealt will be boosted by <span class="text-desc">12%</span> for <span class="text-desc">15</span>s.`,
    properties: [
      { base: 223.22, growth: 19.11 },
      { base: 40.05, growth: 5.23 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Smack Down DMG',
          value: [{ scaling: calcRefinement(2.2322, 0.1911, r), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Flame DMG',
          value: [{ scaling: calcRefinement(0.4005, 0.0523, r), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 4,
  },
  {
    id: '60000875',
    name: 'Nightmare: Impermanence Heron',
    icon: 'T_IconMonsterHead_YZ_33015_UI',
    skill: 'T_MstSkil_995_UI',
    sonata: [Sonata.MIDNIGHT_VEIL],
    desc: `Transform into Nightmare: Impermanence Heron and deliver up to <span class="text-desc">10</span> consecutive strikes to surrounding enemies, each dealing {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b>.
    <br />The Resonator with this Echo equipped in their main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-havoc">Havoc DMG Bonus</b> and <span class="text-desc">12%</span> Heavy Attack DMG Bonus.`,
    properties: [{ base: 36.8, growth: 4.8 }],
    bonus: (base, r) => {
      base[Stats.HAVOC_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Nightmare: Impermanence Heron',
      })
      base[Stats.LIB_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Nightmare: Impermanence Heron',
      })
      base.ECHO_SCALING.push(
        {
          name: 'Strike DMG',
          value: [{ scaling: calcRefinement(0.368, 0.048, r), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Total DMG',
          value: [{ scaling: calcRefinement(0.368, 0.048, r), multiplier: Stats.ATK, hits: 10 }],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 4,
  },
  {
    id: '6000053',
    name: 'Dreamless',
    icon: 'T_IconMonsterHead_998_UI',
    skill: 'T_MstSkil_Z_B8_1_UI',
    sonata: [Sonata.SUN_SINKING_ECLIPSE],
    desc: `Transform into Dreamless and perform <span class="text-desc">6</span> consecutive strikes. The first <span class="text-desc">5</span> strikes deal {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b> each, and the last strike deal {{1}}% <b class="text-wuwa-havoc">Havoc DMG</b>.
    <br />The DMG of this Echo Skill is increased by <span class="text-desc">50%</span> during the first <span class="text-desc">5</span>s after Rover: Havoc casts <b>Resonance Liberation: Deadening Abyss</b>.`,
    properties: [
      { base: 38.87, growth: 5.07 },
      { base: 194.35, growth: 25.35 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Total DMG',
        value: [
          { scaling: calcRefinement(0.3887, 0.0507, r), multiplier: Stats.ATK, hits: 5 },
          { scaling: calcRefinement(1.9435, 0.2535, r), multiplier: Stats.ATK },
        ],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 4,
  },
  {
    id: '6000054',
    name: 'Lava Larva',
    icon: 'T_IconMonsterHead_326_UI',
    skill: 'T_MstSkil_327_UI',
    sonata: [Sonata.MOLTEN_RIFT, Sonata.LINGERING_TUNES],
    desc: `Summon a Lava Larva that continuously attacks enemies, dealing {{0}}% <b class="text-wuwa-fusion">Fusion DMG</b> with each hit. The Lava Larva disappears when the summoner is switched out or moves too far away.`,
    properties: [{ base: 27.6, growth: 3.6 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Fireball DMG',
        value: [{ scaling: calcRefinement(0.276, 0.036, r), multiplier: Stats.ATK }],
        element: Element.FUSION,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000055',
    name: 'Dwarf Cassowary',
    icon: 'T_IconMonsterHead_330_UI',
    skill: 'T_MstSkil_331_UI',
    sonata: [Sonata.SIERRA_GALE, Sonata.REJUVENATING_GLOW],
    desc: `Summon a Dwarf Cassowary that tracks and attacks the enemy, dealing {{0}}% <b class="text-slate-400">Physical DMG</b> <span class="text-desc">3</span> time(s).`,
    properties: [{ base: 27.6, growth: 3.6 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Fireball DMG',
        value: [{ scaling: calcRefinement(0.276, 0.036, r), multiplier: Stats.ATK }],
        element: Element.PHYSICAL,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000056',
    name: 'Glacio Dreadmane',
    icon: 'T_IconMonsterHead_985_UI',
    skill: 'T_MstSkil_326_UI',
    sonata: [Sonata.FREEZING_FROST, Sonata.MOONLIT_CLOUDS],
    desc: `Lacerate enemies as a Glacio Dreadmane, dealing {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b> on each hit. Equipped with <span class="text-desc">2</span> charges and can be cast mid-air. Glacio Dreadmane deals <span class="text-desc">20%</span> more DMG while in mid-air and generates <span class="text-desc">6</span> Icicles upon landing, each dealing {{1}}% <b class="text-wuwa-glacio">Glacio DMG</b>.`,
    properties: [
      { base: 154.1, growth: 20.1 },
      { base: 23, growth: 3 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Lacerate DMG',
          value: [{ scaling: calcRefinement(1.541, 0.201, r), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Mid-Air Lacerate DMG',
          value: [{ scaling: calcRefinement(1.541, 0.201, r), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.ECHO,
          bonus: 0.2,
        },
        {
          name: 'Icicle DMG',
          value: [{ scaling: calcRefinement(0.23, 0.03, r), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 3,
  },
  {
    id: '6000058',
    name: 'Lumiscale Construct',
    icon: 'T_IconMonsterHead_329_UI',
    skill: 'T_MstSkil_330_UI',
    sonata: [Sonata.FREEZING_FROST, Sonata.VOID_THUNDER],
    desc: `Transform into a Lumiscale Construct and enter a Parry Stance. If you are not attacked during the Parry Stance, slash to deal {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b> when the stance finishes. If attacked, counterattack instantly, dealing {{0}}%+{{1}}% <b class="text-wuwa-glacio">Glacio DMG</b>. When hit with a <b class="text-desc">Special Skill</b> attack while in the Parry Stance, break the <b class="text-desc">Special Skill</b> and counterattack, dealing {{0}}%+{{1}}% <b class="text-wuwa-glacio">Glacio DMG</b>.`,
    properties: [
      { base: 397.9, growth: 51.9 },
      { base: 198.95, growth: 25.95 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Slash DMG',
          value: [{ scaling: calcRefinement(3.979, 0.519, r), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Counterattack DMG',
          value: [
            { scaling: calcRefinement(3.979, 0.519, r), multiplier: Stats.ATK },
            { scaling: calcRefinement(1.9895, 0.2595, r), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 3,
  },
  {
    id: '6000059',
    name: 'Lightcrusher',
    icon: 'T_IconMonsterHead_328_UI',
    skill: 'T_MstSkil_329_UI',
    sonata: [Sonata.CELESTIAL_LIGHT],
    desc: `Lunge forward as a Lightcrusher, dealing {{0}}% <b class="text-wuwa-spectro">Spectro DMG</b>. Generate <span class="text-desc">6</span> Ablucence on hit. Each Ablucence explosion deals {{1}}% <b class="text-wuwa-spectro">Spectro DMG</b>.
    <br />Hold the Echo Skill to stay in the Lightcrusher form, which allows you to leap up and pounce forward in the air for a short distance.`,
    properties: [
      { base: 97.29, growth: 12.69 },
      { base: 10.81, growth: 1.41 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Lunge DMG',
          value: [{ scaling: calcRefinement(0.9729, 0.1269, r), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Ablucence DMG',
          value: [{ scaling: calcRefinement(0.1081, 0.0141, r), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 3,
  },
  {
    id: '6000060',
    name: 'Jué',
    icon: 'T_IconMonsterHead_327_UI',
    skill: 'T_MstSkil_328_UI',
    sonata: [Sonata.CELESTIAL_LIGHT],
    desc: `Summon Jué to the aid. Jué soars through the air, dealing {{0}}% <b class="text-wuwa-spectro">Spectro DMG</b>, and summons thunderbolts that strike nearby enemies up to <span class="text-desc">5</span> times, each hit dealing {{1}}% <b class="text-wuwa-spectro">Spectro DMG</b>. Jué then spirals downward, attacking surrounding enemies twice, each hit dealing {{0}}% <b class="text-wuwa-spectro">Spectro DMG</b>.
    <br />Casting this Echo Skill grants the Resonator a <b>Blessing of Time</b> effect that lasts <span class="text-desc">15</span>s, during when:
    <br />- The Resonator gains <span class="text-desc">16%</span> Resonance Skill DMG Bonus.
    <br />- When the Resonator's Resonance Skill hits the target, inflict {{2}}% <b class="text-wuwa-spectro">Spectro DMG</b> <span class="text-desc">1</span> time per second for <span class="text-desc">15</span>s, considered as the Resonator's Resonance Skill DMG.`,
    properties: [
      { base: 34.96, growth: 4.56 },
      { base: 13.98, growth: 1.83 },
      { base: 11.5, growth: 1.5 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Total Echo DMG',
          value: [
            { scaling: calcRefinement(0.3496, 0.0456, r), multiplier: Stats.ATK },
            { scaling: calcRefinement(0.1398, 0.0183, r), multiplier: Stats.ATK, hits: 5 },
            { scaling: calcRefinement(0.3496, 0.0456, r), multiplier: Stats.ATK },
          ],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Blessing of Time DoT',
          value: [{ scaling: calcRefinement(0.115, 0.015, r), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.SKILL,
        }
      )
      return base
    },
    cost: 4,
  },
  {
    id: '6000061',
    name: 'Fallacy of No Return',
    icon: 'T_IconMonsterHead_350_UI',
    skill: 'T_MstSkil_350_UI',
    sonata: [Sonata.REJUVENATING_GLOW],
    desc: `Activate the Echo Skill to summon a fraction of the Fallacy of No Return's power and deal a blast to the surrounding area, inflicting <b class="text-wuwa-spectro">Spectro DMG</b> equal to {{0}}% of max HP, after which the Resonator gains <span class="text-desc">10%</span> bonus Energy Regen and all team members <span class="text-desc">10%</span> bonus ATK for <span class="text-desc">20</span>s.
    <br />Hold Echo Skill to unleash a series of flurry assaults at the cost of STA, each dealing <b class="text-wuwa-spectro">Spectro DMG</b> equal to {{1}}% of max HP; Release to end the assail in a powerful blow, dealing <b class="text-wuwa-spectro">Spectro DMG</b> equal to {{2}}% of max HP.`,
    properties: [
      { base: 11.4, growth: 1.48 },
      { base: 1.14, growth: 0.15 },
      { base: 14.25, growth: 1.86 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Press DMG',
          value: [{ scaling: calcRefinement(0.114, 0.0148, r), multiplier: Stats.HP }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Hold Flurry DMG',
          value: [{ scaling: calcRefinement(0.0114, 0.0015, r), multiplier: Stats.HP }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Hold Final Blow DMG',
          value: [{ scaling: calcRefinement(0.1425, 0.0186, r), multiplier: Stats.HP }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 4,
  },
  {
    id: '390070051',
    name: 'Vanguard Junrock',
    icon: 'T_IconMonsterGoods_011_UI',
    skill: 'T_MstSkil_Z_Z2_UI',
    sonata: [Sonata.VOID_THUNDER, Sonata.REJUVENATING_GLOW, Sonata.LINGERING_TUNES],
    desc: `Summon a Vanguard Junrock that charges forward, dealing {{0}}%+{{1}} <b class="text-slate-400">Physical DMG</b> to enemies in its path.`,
    properties: [
      { base: 23, growth: 3 },
      { base: 46, growth: 8 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Press Blast DMG',
        value: [{ scaling: calcRefinement(0.23, 0.03, r), multiplier: Stats.ATK }],
        flat: calcRefinement(46, 8, r),
        element: Element.PHYSICAL,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390070052',
    name: 'Fission Junrock',
    icon: 'T_IconMonsterGoods_021_UI',
    skill: 'T_MstSkil_Z_Z3_UI',
    sonata: [Sonata.VOID_THUNDER, Sonata.REJUVENATING_GLOW, Sonata.MOONLIT_CLOUDS],
    desc: `Summon a Fission Junrock. Generate a Resonance Effect that restores <span class="text-desc">2%</span> HP for friendly units each time. If not in combat, you can pick up minerals or plants nearby.`,
    properties: [{ base: 2, growth: 0 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Resonance Healing',
        value: [{ scaling: 0.02, multiplier: Stats.HP }],
        element: TalentProperty.HEAL,
        property: TalentProperty.HEAL,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390070053',
    name: 'Electro Predator',
    icon: 'T_IconMonsterGoods_031_UI',
    skill: 'T_MstSkil_Z_Z1_UI',
    sonata: [Sonata.VOID_THUNDER, Sonata.MOLTEN_RIFT],
    desc: `Summon an Electro Predator to shoot the enemy <span class="text-desc">5</span> times. The first <span class="text-desc">4</span> shots deals {{0}}% <b class="text-wuwa-electro">Electro DMG</b>, and the last deals {{1}}% <b class="text-wuwa-electro">Electro DMG</b>.`,
    properties: [
      { base: 12.42, growth: 1.62 },
      { base: 33.12, growth: 4.32 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Shot 1 - 4 DMG',
          value: [{ scaling: calcRefinement(0.1242, 0.0162, r), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Last Shot DMG',
          value: [{ scaling: calcRefinement(0.3312, 0.0432, r), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 1,
  },
  {
    id: '390070064',
    name: 'Fusion Predator',
    icon: 'T_IconMonsterGoods_041_UI',
    skill: 'T_MstSkil_Z_B5_UI',
    sonata: [Sonata.VOID_THUNDER, Sonata.MOLTEN_RIFT, Sonata.SIERRA_GALE],
    desc: `Transform into Fusion Warrior to perform a Counterattack. If the Counterattack is successful, the cooldown time of this skill will be reduced by <span class="text-desc">70%</span>, and {{0}}% <b class="text-wuwa-fusion">Fusion DMG</b> will be dealt.`,
    properties: [{ base: 207, growth: 27 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Counterattack DMG',
        value: [{ scaling: calcRefinement(2.07, 0.27, r), multiplier: Stats.ATK }],
        element: Element.FUSION,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390070065',
    name: 'Havoc Warrior',
    icon: 'T_IconMonsterGoods_051_UI',
    skill: 'T_MstSkil_Z_Z8_UI',
    sonata: [Sonata.SUN_SINKING_ECLIPSE, Sonata.CELESTIAL_LIGHT],
    desc: `Transform into Havoc Warrior to attack up to <span class="text-desc">3</span> times, dealing {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b> each time.`,
    properties: [{ base: 123.43, growth: 16.1 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Havoc Warrior DMG',
        value: [{ scaling: calcRefinement(1.2343, 0.161, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390070066',
    name: 'Snip Snap',
    icon: 'T_IconMonsterGoods_061_UI',
    skill: 'T_MstSkil_Z_Z11_UI',
    sonata: [Sonata.MOLTEN_RIFT, Sonata.REJUVENATING_GLOW, Sonata.LINGERING_TUNES],
    desc: `Summon a Snip Snap that throws fireballs at the enemy, dealing {{0}}%+{{1}} <b class="text-wuwa-fusion">Fusion DMG</b> on-hit.`,
    properties: [
      { base: 23, growth: 3 },
      { base: 46, growth: 6 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Fireball DMG',
        value: [{ scaling: calcRefinement(0.23, 0.03, r), multiplier: Stats.ATK }],
        flat: calcRefinement(46, 6, r),
        element: Element.FUSION,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390070067',
    name: 'Zig Zag',
    icon: 'T_IconMonsterGoods_071_UI',
    skill: 'T_MstSkil_Z_Z10_UI',
    sonata: [Sonata.CELESTIAL_LIGHT, Sonata.MOONLIT_CLOUDS, Sonata.LINGERING_TUNES],
    desc: `Summon a Zig Zag that denotates Spectro energy, dealing {{0}}%+{{1}} <b class="text-wuwa-spectro">Spectro DMG</b> and creating a <b class="text-wuwa-spectro">Stagnation Zone</b> that lasts <span class="text-desc">1.8</span>s.`,
    properties: [
      { base: 34.5, growth: 4.5 },
      { base: 69, growth: 9 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Detonation DMG',
        value: [{ scaling: calcRefinement(0.345, 0.045, r), multiplier: Stats.ATK }],
        flat: calcRefinement(69, 9, r),
        element: Element.SPECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390070068',
    name: 'Whiff Whaff',
    icon: 'T_IconMonsterGoods_081_UI',
    skill: 'T_MstSkil_Z_Z12_UI',
    sonata: [Sonata.SIERRA_GALE, Sonata.REJUVENATING_GLOW, Sonata.MOONLIT_CLOUDS],
    desc: `Summon a Whiff Whaff that triggers an air explosion, dealing {{0}}% <b class="text-wuwa-aero">Aero DMG</b> and produce a Low-pressure Zone. The Low-pressure Zone continuously pulls enemies nearby towards the center for <span class="text-desc">2</span>s, dealing {{1}}% <b class="text-wuwa-aero">Aero DMG</b> up to <span class="text-desc">6</span> times.`,
    properties: [
      { base: 36.92, growth: 4.81 },
      { base: 14.35, growth: 1.87 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Explosion DMG',
          value: [{ scaling: calcRefinement(0.3692, 0.0481, r), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Low-pressure Zone DMG',
          value: [{ scaling: calcRefinement(0.1435, 0.0187, r), multiplier: Stats.ATK, hits: 6 }],
          element: Element.AERO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 1,
  },
  {
    id: '390070069',
    name: 'Tick Tack',
    icon: 'T_IconMonsterGoods_091_UI',
    skill: 'T_Mstskil_095_UI',
    sonata: [Sonata.SUN_SINKING_ECLIPSE, Sonata.REJUVENATING_GLOW, Sonata.LINGERING_TUNES],
    desc: `Summon a Tick Tack that charges and bites the enemy. The charge from Tick Tack will deal {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b> to the enemy, and the bite will deal {{1}}% <b class="text-wuwa-havoc">Havoc DMG</b> to the enemy. Reduces enemy Vibration Strength by up to <span class="text-desc">5%</span> during <span class="text-desc">5</span>s.`,
    properties: [
      { base: 49.22, growth: 6.42 },
      { base: 73.83, growth: 9.63 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Charge DMG',
          value: [{ scaling: calcRefinement(0.4922, 0.0642, r), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Bite DMG',
          value: [{ scaling: calcRefinement(0.7383, 0.0963, r), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 1,
  },
  {
    id: '390070070',
    name: 'Glacio Predator',
    icon: 'T_IconMonsterGoods_101_UI',
    skill: 'T_MstSkil_Z_Z9_UI',
    sonata: [Sonata.CELESTIAL_LIGHT, Sonata.FREEZING_FROST],
    desc: `Summon a Glacio Predator that throws an ice spear, dealing {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b> on hit. Deal {{1}}% <b class="text-wuwa-glacio">Glacio DMG</b> up to <span class="text-desc">10</span> times during the charging time, and {{2}}% <b class="text-wuwa-glacio">Glacio DMG</b> when the spear explodes.`,
    properties: [
      { base: 33.12, growth: 4.32 },
      { base: 3.31, growth: 0.43 },
      { base: 16.56, growth: 2.16 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Ice Spear DMG',
          value: [{ scaling: calcRefinement(0.3312, 0.0432, r), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Lance Field DMG',
          value: [
            { scaling: calcRefinement(0.0331, 0.0043, r), multiplier: Stats.ATK, hits: 10 },
            { scaling: calcRefinement(0.1656, 0.00402163, r), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 1,
  },
  {
    id: '390070071',
    name: 'Aero Predator',
    icon: 'T_IconMonsterGoods_231_UI',
    skill: 'T_MstSkil_235_UI',
    sonata: [Sonata.VOID_THUNDER, Sonata.SIERRA_GALE],
    desc: `Summon an Aero Predator that throws a dart forward. The dart will bounce between enemies up to three times, dealing {{0}}% <b class="text-wuwa-aero">Aero DMG</b> each time it hits.`,
    properties: [{ base: 20.7, growth: 2.7 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Dart DMG',
        value: [{ scaling: calcRefinement(0.207, 0.027, r), multiplier: Stats.ATK }],
        element: Element.AERO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390070074',
    name: 'Cruisewing',
    icon: 'T_IconMonsterGoods_251_UI',
    skill: 'T_MstSkil_255_UI',
    sonata: [Sonata.CELESTIAL_LIGHT, Sonata.REJUVENATING_GLOW, Sonata.MOONLIT_CLOUDS],
    desc: `Summon a Cruisewing that restores HP for all current team characters by {{0}}% of their Max HPs plus an additional <span class="text-desc">80</span> points of HP, up to <span class="text-desc">4</span> times.`,
    properties: [{ base: 1.2, growth: 0.2 }],
    bonus: (base, r) => {
      base.CALLBACK.push(function (x, a) {
        _.forEach(a, (m) => {
          m.ECHO_SCALING.push({
            name: 'Cruisewing Healing',
            value: [{ scaling: calcRefinement(0.012, 0.002, r), multiplier: Stats.HP, override: m.getHP() }],
            flat: 80,
            element: TalentProperty.HEAL,
            property: TalentProperty.HEAL,
          })
        })
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390070075',
    name: 'Sabyr Boar',
    icon: 'T_IconMonsterGoods_261_UI',
    skill: 'T_MstSkil_265_UI',
    sonata: [Sonata.FREEZING_FROST, Sonata.SIERRA_GALE, Sonata.MOONLIT_CLOUDS],
    desc: `Summon a Sabyr Boar to headbutt the enemy into the air, dealing {{0}}%+{{1}} <b class="text-slate-400">Physical DMG</b>.`,
    properties: [
      { base: 23, growth: 3 },
      { base: 46, growth: 6 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Headbutt DMG',
        value: [{ scaling: calcRefinement(0.23, 0.03, r), multiplier: Stats.ATK }],
        flat: calcRefinement(46, 6, r),
        element: Element.PHYSICAL,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390070076',
    name: 'Gulpuff',
    icon: 'T_IconMonsterGoods_111_UI',
    skill: 'T_MstSkil_115_UI',
    sonata: [Sonata.FREEZING_FROST, Sonata.CELESTIAL_LIGHT],
    desc: `Summon a Gulpuff that blows bubbles <span class="text-desc">5</span> times, each time dealing {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b>.`,
    properties: [{ base: 16.56, growth: 2.16 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Bubble DMG',
        value: [{ scaling: calcRefinement(0.1656, 0.0216, r), multiplier: Stats.ATK }],
        element: Element.GLACIO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390070077',
    name: 'Excarat',
    icon: 'T_IconMonsterGoods_271_UI',
    skill: 'T_MstSkil_275_UI',
    sonata: [Sonata.FREEZING_FROST, Sonata.SUN_SINKING_ECLIPSE],
    desc: `Transform into an Excarat and tunnel underground to advance. In this state, you have the ability to change your direction and are immune to damage.`,
    properties: [],
    cost: 1,
  },
  {
    id: '390070078',
    name: 'Baby Viridblaze Saurian',
    icon: 'T_IconMonsterGoods_281_UI',
    skill: 'T_MstSkil_285_UI',
    sonata: [Sonata.MOLTEN_RIFT, Sonata.VOID_THUNDER, Sonata.LINGERING_TUNES],
    desc: `Transform into Baby Viridblaze Saurian to rest in place, and slowly restore HP.`,
    properties: [],
    cost: 1,
  },
  {
    id: '390070079',
    name: 'Young Roseshroom',
    icon: 'T_IconMonsterGoods_301_UI',
    skill: 'T_MstSkil_305_UI',
    sonata: [Sonata.SIERRA_GALE, Sonata.SUN_SINKING_ECLIPSE],
    desc: `Summon a Baby Roseshroom that fires a laser, dealing {{0}}%+{{1}} <b class="text-wuwa-havoc">Havoc DMG</b>.`,
    properties: [
      { base: 23, growth: 3 },
      { base: 46, growth: 6 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Laser DMG',
        value: [{ scaling: calcRefinement(0.23, 0.03, r), multiplier: Stats.ATK }],
        flat: calcRefinement(46, 6, r),
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390070100',
    name: 'Fusion Dreadmane',
    icon: 'T_IconMonsterGoods_980_UI',
    skill: 'T_MstSkil_980_UI',
    sonata: [Sonata.MOLTEN_RIFT, Sonata.REJUVENATING_GLOW],
    desc: `Summon a Fusion Dreadmane that fiercely strikes the enemy, dealing {{0}}%+{{1}} <b class="text-wuwa-fusion">Fusion DMG</b>.`,
    properties: [
      { base: 23, growth: 3 },
      { base: 46, growth: 6 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Strike DMG',
        value: [{ scaling: calcRefinement(0.23, 0.03, r), multiplier: Stats.ATK }],
        flat: calcRefinement(46, 6, r),
        element: Element.FUSION,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390070105',
    name: 'Hoartoise',
    icon: 'T_IconMonsterGoods_969_UI',
    skill: 'T_MstSkil_Z_B10_UI',
    sonata: [Sonata.FREEZING_FROST, Sonata.CELESTIAL_LIGHT],
    desc: `Transform into Hoartoise and slowly restore HP. Use the Echo skill again to exit the transformation state.`,
    properties: [],
    cost: 1,
  },
  {
    id: '390077004',
    name: 'Violet-Feathered Heron',
    icon: 'T_IconMonsterGoods_121_UI',
    skill: 'T_MstSkil_Z_B2_UI',
    sonata: [Sonata.MOLTEN_RIFT, Sonata.VOID_THUNDER],
    desc: `Transform into Violet-Feathered Heron and enter a Parry Stance. Counterattack when the Parry stance is over, dealing {{0}}% <b class="text-wuwa-electro">Electro DMG</b>. If attacked during Parry Stance, you can counterattack in advance and additionally recover <span class="text-desc">5</span> Concerto Energy.`,
    properties: [{ base: 207, growth: 27 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Counterattack DMG',
        value: [{ scaling: calcRefinement(2.07, 0.27, r), multiplier: Stats.ATK }],
        element: Element.ELECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '390077005',
    name: 'Cyan-Feathered Heron',
    icon: 'T_IconMonsterGoods_131_UI',
    skill: 'T_MstSkil_Z_B1_UI',
    sonata: [Sonata.SIERRA_GALE, Sonata.CELESTIAL_LIGHT],
    desc: `Transform into Cyan-Feathered Heron and charge at the enemies, dealing {{0}}% <b class="text-wuwa-aero">Aero DMG</b>; This Echo Skill interrupts enemy <b class="text-desc">Special Skills</b> upon dealing damage.`,
    properties: [{ base: 170.2, growth: 22.2 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Charge DMG',
        value: [{ scaling: calcRefinement(1.702, 0.222, r), multiplier: Stats.ATK }],
        element: Element.AERO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '390077012',
    name: 'Fusion Prism',
    icon: 'T_IconMonsterGoods_151_UI',
    skill: 'T_MstSkil_Z_Z6_UI',
    sonata: [Sonata.FREEZING_FROST, Sonata.MOLTEN_RIFT, Sonata.LINGERING_TUNES],
    desc: `Summon a Fusion Prism to fire a crystal shard, dealing {{0}}%+{{1}} <b class="text-wuwa-fusion">Fusion DMG</b>.`,
    properties: [
      { base: 23, growth: 3 },
      { base: 46, growth: 6 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Crystal Shard DMG',
        value: [{ scaling: calcRefinement(0.23, 0.03, r), multiplier: Stats.ATK }],
        flat: calcRefinement(46, 6, r),
        element: Element.FUSION,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390077013',
    name: 'Glacio Prism',
    icon: 'T_IconMonsterGoods_141_UI',
    skill: 'T_MstSkil_Z_Z6_UI',
    sonata: [Sonata.FREEZING_FROST, Sonata.SUN_SINKING_ECLIPSE, Sonata.MOONLIT_CLOUDS],
    desc: `Summon a Glacio Prism that continuously fires three crystal shards, each dealing {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b>.`,
    properties: [{ base: 27.6, growth: 3.8 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Crystal Shard DMG',
        value: [{ scaling: calcRefinement(0.276, 0.038, r), multiplier: Stats.ATK }],
        element: Element.GLACIO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390077016',
    name: 'Spectro Prism',
    icon: 'T_IconMonsterGoods_161_UI',
    skill: 'T_MstSkil_Z_Z7_UI',
    sonata: [Sonata.VOID_THUNDER, Sonata.MOLTEN_RIFT, Sonata.CELESTIAL_LIGHT],
    desc: `Summon a Spectro Prism to emit a laser that hits the enemy up to <span class="text-desc">8</span> times, dealing {{0}}% <b class="text-wuwa-spectro">Spectro DMG</b> each time.`,
    properties: [{ base: 10.35, growth: 1.35 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Laser DMG',
        value: [{ scaling: calcRefinement(0.1035, 0.0135, r), multiplier: Stats.ATK, hits: 8 }],
        element: Element.SPECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390077017',
    name: 'Havoc Prism',
    icon: 'T_IconMonsterGoods_171_UI',
    skill: 'T_MstSkil_Z_Z4_UI',
    sonata: [Sonata.VOID_THUNDER, Sonata.SUN_SINKING_ECLIPSE, Sonata.CELESTIAL_LIGHT],
    desc: `Summon a Havoc Prism to fire five crystal shards, each dealing {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b>.`,
    properties: [{ base: 16.56, growth: 2.16 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Crystal Shard DMG',
        value: [{ scaling: calcRefinement(0.1656, 0.0216, r), multiplier: Stats.ATK }],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '390077021',
    name: 'Stonewall Bracer',
    icon: 'T_IconMonsterGoods_181_UI',
    skill: 'T_MstSkil_Z_B4_UI',
    sonata: [Sonata.REJUVENATING_GLOW, Sonata.MOONLIT_CLOUDS],
    desc: `Transform into Stonewall Bracer and charge forward, dealing {{0}}% <b class="text-slate-400">Physical DMG</b> on-hit, then smash to deal {{1}}% <b class="text-slate-400">Physical DMG</b>, and gain a shield of <span class="text-desc">10%</span> of current character's Max HP that lasts <span class="text-desc">7</span>s. Use the Echo skill again to exit the transformation state.`,
    properties: [
      { base: 80.96, growth: 10.56 },
      { base: 121.44, growth: 15.84 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Charge DMG',
          value: [{ scaling: calcRefinement(0.8096, 0.1056, r), multiplier: Stats.ATK }],
          element: Element.PHYSICAL,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Smash DMG',
          value: [{ scaling: calcRefinement(1.2144, 0.1584, r), multiplier: Stats.ATK }],
          element: Element.PHYSICAL,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Cast Shield',
          value: [{ scaling: 0.1, multiplier: Stats.HP }],
          element: TalentProperty.SHIELD,
          property: TalentProperty.SHIELD,
        }
      )
      return base
    },
    cost: 3,
  },
  {
    id: '390077022',
    name: 'Flautist',
    icon: 'T_IconMonsterGoods_191_UI',
    skill: 'T_MstSkil_Z_B6_UI',
    sonata: [Sonata.VOID_THUNDER, Sonata.LINGERING_TUNES],
    desc: `Transform into Flautist, continuously emitting Electro lasers, dealing {{0}}% <b class="text-wuwa-electro">Electro DMG</b> for a total of <span class="text-desc">10</span> times. Gain <span class="text-desc">1</span> Concerto Energy every time a hit lands.`,
    properties: [{ base: 38.3, growth: 4.99 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Laser DMG',
        value: [{ scaling: calcRefinement(0.383, 0.0499, r), multiplier: Stats.ATK, hits: 10 }],
        element: Element.ELECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '390077023',
    name: 'Tambourinist',
    icon: 'T_IconMonsterGoods_201_UI',
    skill: 'T_MstSkil_205_UI',
    sonata: [Sonata.FREEZING_FROST, Sonata.SUN_SINKING_ECLIPSE],
    desc: `Summon a Tambourinist that plays out <b>Melodies of Annihilation</b>. Any Resonator on the team gains the following effect for <span class="text-desc">10</span>s upon obtaining a <b>Melody of Annihilation</b>>: When the Resonator hits a target, the Tambourinist deals {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b> to the target, up to <span class="text-desc">10</span> times.`,
    properties: [{ base: 10.35, growth: 1.35 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Melodies of Annihilation DMG',
        value: [{ scaling: calcRefinement(0.1035, 0.0135, r), multiplier: Stats.ATK }],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '390077024',
    name: 'Rocksteady Guardian',
    icon: 'T_IconMonsterGoods_241_UI',
    skill: 'T_MstSkil_245_UI',
    sonata: [Sonata.CELESTIAL_LIGHT, Sonata.REJUVENATING_GLOW],
    desc: `Transform into Rocksteady Guardian and enter a Parry State. Upon being attacked, deal <b class="text-wuwa-spectro">Spectro DMG</b> equal to {{0}}% of the Resonator's Max HP, and perform a follow-up attack that deals <b class="text-wuwa-spectro">Spectro DMG</b> equal to {{0}}% of the Resonator's Max HP.
    <br />
    <br />Use the Echo Skill again to exit the transformation.
    <br />
    <br />If the attack received is a <b class="text-desc">Special Skill</b> attack, interrupt the enemy's <b class="text-desc">Special Skill</b>, gain a Shield equal to <span class="text-desc">30%</span> Max HP, and perform a two-stage follow-up attack, each dealing <b class="text-wuwa-spectro">Spectro DMG</b> equal to {{1}}% of the Resonator's Max HP. These follow-up attacks simultaneously launch three ground-breaking waves, each dealing <b class="text-wuwa-spectro">Spectro DMG</b> equal to {{2}}% of the Resonator's Max HP.`,
    properties: [
      { base: 5.96, growth: 0.775 },
      { base: 3.97, growth: 0.52 },
      { base: 3.3, growth: 0.43 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Counterattack DMG',
          value: [{ scaling: calcRefinement(0.0596, 0.00775, r), multiplier: Stats.HP }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Follow-Up Attack DMG',
          value: [{ scaling: calcRefinement(0.0596, 0.00775, r), multiplier: Stats.HP }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Special Shield',
          value: [{ scaling: 0.3, multiplier: Stats.HP }],
          element: TalentProperty.SHIELD,
          property: TalentProperty.SHIELD,
        },
        {
          name: 'Special Follow-Up Attack DMG',
          value: [{ scaling: calcRefinement(0.0397, 0.0052, r), multiplier: Stats.HP, hits: 2 }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Ground-Breaking Wave DMG',
          value: [{ scaling: calcRefinement(0.033, 0.0043, r), multiplier: Stats.HP, hits: 3 }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 3,
  },
  {
    id: '390077025',
    name: 'Chasm Guardian',
    icon: 'T_IconMonsterGoods_211_UI',
    skill: 'T_MstSkil_Z_B9_UI',
    sonata: [Sonata.LINGERING_TUNES, Sonata.REJUVENATING_GLOW],
    desc: `Transform into Chasm Guardian to perform a Leap Strike that deals {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b> on hit. Current character loses <span class="text-desc">10%</span> HP after the hit lands. Periodically restore current character's HP after <span class="text-desc">5</span>s for up to <span class="text-desc">10%</span> of their Max HP.`,
    properties: [{ base: 196.65, growth: 5.65 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Leap Strike DMG',
          value: [{ scaling: calcRefinement(1.9665, 0.0565, r), multiplier: Stats.ATK }],
          element: Element.HAVOC,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Follow-Up Healing',
          value: [{ scaling: 0.1, multiplier: Stats.HP }],
          element: TalentProperty.HEAL,
          property: TalentProperty.HEAL,
        }
      )
      return base
    },
    cost: 3,
  },
  {
    id: '390077028',
    name: 'Viridblaze Saurian',
    icon: 'T_IconMonsterGoods_291_UI',
    skill: 'T_MstSkil_295_UI',
    sonata: [Sonata.MOLTEN_RIFT, Sonata.MOONLIT_CLOUDS],
    desc: `Summon a Viridblaze Saurian to continuously spit fire, dealing {{0}}% <b class="text-wuwa-fusion">Fusion DMG</b> <span class="text-desc">10</span> times.`,
    properties: [{ base: 12.31, growth: 1.6 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Fire Breath DMG',
        value: [{ scaling: calcRefinement(0.1231, 0.016, r), multiplier: Stats.ATK, hits: 10 }],
        element: Element.FUSION,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '390077029',
    name: 'Roseshroom',
    icon: 'T_IconMonsterGoods_311_UI',
    skill: 'T_MstSkil_315_UI',
    sonata: [Sonata.FREEZING_FROST, Sonata.SUN_SINKING_ECLIPSE],
    desc: `Summon a Roseshroom that fires a laser, dealing {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b> up to <span class="text-desc">3</span> times.`,
    properties: [{ base: 41.02, growth: 5.35 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Laser DMG',
        value: [{ scaling: calcRefinement(0.4102, 0.0535, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '390077033',
    name: 'Havoc Dreadmane',
    icon: 'T_IconMonsterGoods_984_UI',
    skill: 'T_MstSkil_984_UI',
    sonata: [Sonata.MOLTEN_RIFT, Sonata.SUN_SINKING_ECLIPSE],
    desc: `Transform into a Havoc Dreadmane to perform up to <span class="text-desc">2</span> tail strikes. Each strike deals {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b> and inflicts an additional instance of {{1}}% <b class="text-wuwa-havoc">Havoc DMG</b> upon hitting the target.`,
    properties: [
      { base: 83.84, growth: 10.93 },
      { base: 55.89, growth: 7.29 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Tail Strike DMG',
        value: [
          { scaling: calcRefinement(0.8384, 0.1093, r), multiplier: Stats.ATK },
          { scaling: calcRefinement(0.5589, 0.0729, r), multiplier: Stats.ATK },
        ],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '390077038',
    name: 'Spearback',
    icon: 'T_IconMonsterGoods_986_UI',
    skill: 'T_MstSkil_986_UI',
    sonata: [Sonata.MOONLIT_CLOUDS, Sonata.LINGERING_TUNES],
    desc: `Summon a Spearback to perform <span class="text-desc">5</span> consecutive attacks. The first <span class="text-desc">4</span> attacks deal {{0}}% <b class="text-slate-400">Physical DMG</b>, and the last deals {{1}}% <b class="text-slate-400">Physical DMG</b>.`,
    properties: [
      { base: 21.53, growth: 2.81 },
      { base: 36.92, growth: 4.81 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Stage 1 - 4 DMG',
          value: [{ scaling: calcRefinement(0.2153, 0.0281, r), multiplier: Stats.ATK }],
          element: Element.PHYSICAL,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Last Attack DMG',
          value: [{ scaling: calcRefinement(0.3692, 0.0481, r), multiplier: Stats.ATK }],
          element: Element.PHYSICAL,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 3,
  },
  {
    id: '390080003',
    name: 'Thundering Mephis',
    icon: 'T_IconMonsterGoods_222_UI',
    skill: 'T_MstSkil_Z_B3_1_UI',
    sonata: [Sonata.VOID_THUNDER],
    desc: `Transform into Thundering Mephis, engaging in a rapid assault of up to <span class="text-desc">6</span> strikes. The first <span class="text-desc">5</span> strikes deal {{0}}% <b class="text-wuwa-electro">Electro DMG</b> each, while the final strike inflicts {{1}}% <b class="text-wuwa-electro">Electro DMG</b>, with an additional {{2}}% <b class="text-wuwa-electro">Electro DMG</b> from the thunder.
    <br />
    <br />After the final hit, increase the current character's <b class="text-wuwa-electro">Electro DMG</b> by <span class="text-desc">12%</span> and Resonance Liberation DMG by <span class="text-desc">12%</span> for <span class="text-desc">15</span>s.`,
    properties: [
      { base: 95.31, growth: 12.43 },
      { base: 136.16, growth: 16.76 },
      { base: 22.69, growth: 2.96 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Rapid Assault DMG',
          value: [{ scaling: calcRefinement(0.9531, 0.1243, r), multiplier: Stats.ATK }],
          element: Element.ELECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Last Strike DMG',
          value: [
            { scaling: calcRefinement(1.3616, 0.1676, r), multiplier: Stats.ATK },
            { scaling: calcRefinement(0.2269, 0.0296, r), multiplier: Stats.ATK },
          ],
          element: Element.ELECTRO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 4,
  },
  {
    id: '60000885',
    name: 'Nightmare: Thundering Mephis',
    icon: 'T_IconMonsterHead_YZ_33016_UI',
    skill: 'T_MstSkil_Z_B3_1_UI',
    sonata: [Sonata.VOID_THUNDER],
    desc: `Transform into Nightmare: Thundering Mephis and attack enemies in front, dealing {{0}}% <b class="text-wuwa-electro">Electro DMG</b>.
    <br />The Resonator with this Echo equipped in their main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-electro">Electro DMG</b> and <span class="text-desc">12%</span> Resonance Liberation DMG Bonus.`,
    properties: [{ base: 307.05, growth: 40.05 }],
    bonus: (base, r) => {
      base[Stats.ELECTRO_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Nightmare: Thundering Mephis',
      })
      base[Stats.LIB_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Nightmare: Thundering Mephis',
      })
      base.ECHO_SCALING.push({
        name: 'Thundering Mephis DMG',
        value: [{ scaling: calcRefinement(3.0705, 0.4005, r), multiplier: Stats.ATK }],
        element: Element.ELECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 4,
  },
  {
    id: '390080005',
    name: 'Bell-Borne Geochelone',
    icon: 'T_IconMonsterGoods_992_UI',
    skill: 'T_MstSkil_992_UI',
    sonata: [Sonata.MOONLIT_CLOUDS, Sonata.REJUVENATING_GLOW],
    desc: `Activate the protection of Bell-Borne Geochelone. Deal <b class="text-wuwa-glacio">Glacio DMG</b> based on 145.92% of the current character's DEF to nearby enemies, and obtain a Bell-Borne Shield that lasts for <span class="text-desc">15</span>s
    <br />
    <br />The Bell-Borne Shield provides <span class="text-desc">50%</span> DMG Reduction and <span class="text-desc">10%</span> DMG Boost for the current team members, and disappears after the current character is hit for <span class="text-desc">3</span> times.`,
    properties: [{ base: 104.88, growth: 13.68 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Bell-Borne DMG',
        value: [{ scaling: calcRefinement(1.0488, 0.1368, r), multiplier: Stats.DEF }],
        element: Element.GLACIO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 4,
  },
  {
    id: '390080007',
    name: 'Inferno Rider',
    icon: 'T_IconMonsterGoods_321_UI',
    skill: 'T_MstSkil_325_UI',
    sonata: [Sonata.MOLTEN_RIFT],
    desc: `Transform into the Inferno Rider to launch up to <span class="text-desc">3</span> consecutive slashes in a row, each slash dealing {{0}}%, {{1}}%, and {{1}}% <b class="text-wuwa-fusion">Fusion DMG</b> respectively.
    <br />
    <br />After the final hit, increase the current Resonator's <b class="text-wuwa-fusion">Fusion DMG</b> by <span class="text-desc">12%</span> and Basic Attack DMG by <span class="text-desc">12%</span> for <span class="text-desc">15</span>s.
    <br />
    <br />Long press the Echo Skill to transform into the Inferno Rider and enter Riding Mode. When exiting Riding Mode, deal {{1}}% <b class="text-wuwa-fusion">Fusion DMG</b> to enemies in front.`,
    properties: [
      { base: 174.23, growth: 22.72 },
      { base: 203.26, growth: 26.52 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Stage 1 DMG',
          value: [{ scaling: calcRefinement(1.7423, 0.2272, r), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Stage 2 & 3 DMG',
          value: [{ scaling: calcRefinement(2.0326, 0.2652, r), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Riding Mode DMG',
          value: [{ scaling: calcRefinement(2.0326, 0.2652, r), multiplier: Stats.ATK }],
          element: Element.FUSION,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 4,
  },
  {
    id: '310000370',
    name: 'Galescourge Stalker',
    icon: 'T_IconMonsterHead_31037_UI',
    skill: 'MstSkil_32037_UI',
    sonata: [Sonata.FROSTY_RESOLVE, Sonata.EMPYREAN_ANTHEM],
    desc: `Summon a Galescourge Stalker that restores nearby party members' HP by <span class="text-desc">5%</span> of their Max HP, up to <span class="text-desc">3</span> times.`,
    properties: [],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Total Healing',
        value: [{ scaling: 0.05, multiplier: Stats.HP, hits: 3 }],
        element: TalentProperty.HEAL,
        property: TalentProperty.HEAL,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '310000380',
    name: 'Voltscourge Stalker',
    icon: 'T_IconMonsterHead_31038_UI',
    skill: 'MstSkil_31038_UI',
    sonata: [Sonata.MIDNIGHT_VEIL, Sonata.EMPYREAN_ANTHEM],
    desc: `Summon a Voltscourge Stalker to attack enemies, dealing {{0}}% <b class="text-wuwa-electro">Electro DMG</b>.`,
    properties: [{ base: 82.8, growth: 10.8 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Voltscourge Stalker DMG',
        value: [{ scaling: calcRefinement(0.828, 0.108, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.ELECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '310000390',
    name: 'Frostscourge Stalker',
    icon: 'T_IconMonsterHead_31039_UI',
    skill: 'MstSkil_31039_UI',
    sonata: [Sonata.ETERNAL_RADIANCE, Sonata.MIDNIGHT_VEIL],
    desc: `Summon a Frostscourge Stalker to attack enemies, dealing {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b>.`,
    properties: [{ base: 82.8, growth: 10.8 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Frostscourge Stalker DMG',
        value: [{ scaling: calcRefinement(0.828, 0.108, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.GLACIO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '310000400',
    name: 'Chop Chop: Headless',
    icon: 'T_IconMonsterHead_31040_UI',
    skill: 'MstSkil_31040_UI',
    sonata: [Sonata.ETERNAL_RADIANCE, Sonata.TIDEBREAKING_COURAGE],
    desc: `Summon a Chop Chop: Headless to attack enemies, dealing {{0}}% <b class="text-wuwa-fusion">Fusion DMG</b>.`,
    properties: [{ base: 82.8, growth: 10.8 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Headless DMG',
        value: [{ scaling: calcRefinement(0.828, 0.108, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.FUSION,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '310000410',
    name: 'Chop Chop: Leftless',
    icon: 'T_IconMonsterHead_31041_UI',
    skill: 'MstSkil_31041_UI',
    sonata: [Sonata.FROSTY_RESOLVE, Sonata.TIDEBREAKING_COURAGE],
    desc: `Summon a Chop Chop: Leftless to attack enemies, dealing {{0}}% <b class="text-spectro">Spectro DMG</b>.`,
    properties: [{ base: 82.8, growth: 10.8 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Leftless DMG',
        value: [{ scaling: calcRefinement(0.828, 0.108, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.SPECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '310000420',
    name: 'Chop Chop: Rightless',
    icon: 'T_IconMonsterHead_31042_UI',
    skill: 'MstSkil_31042_UI',
    sonata: [Sonata.FROSTY_RESOLVE, Sonata.TIDEBREAKING_COURAGE],
    desc: `Summon a Chop Chop: Rightless to attack enemies, dealing {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b>.`,
    properties: [{ base: 82.8, growth: 10.8 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Rightless DMG',
        value: [{ scaling: calcRefinement(0.828, 0.108, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '310000430',
    name: 'Fae Ignis',
    icon: 'T_IconMonsterHead_31043_UI',
    skill: 'MstSkil_31043_UI',
    sonata: [Sonata.ETERNAL_RADIANCE, Sonata.MIDNIGHT_VEIL, Sonata.DREAM],
    desc: `Summon a Fae Ignis to attack enemies, dealing {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b>.`,
    properties: [{ base: 82.8, growth: 10.8 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Fae Ignis DMG',
        value: [{ scaling: calcRefinement(0.828, 0.108, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '310000440',
    name: 'Nimbus Wraith',
    icon: 'T_IconMonsterHead_31044_UI',
    skill: 'MstSkil_31044_UI',
    sonata: [Sonata.MIDNIGHT_VEIL, Sonata.EMPYREAN_ANTHEM],
    desc: `Summon a Nimbus Wraith that restores the active Resonator's HP by <span class="text-desc">5%</span> of their Max HP, up to <span class="text-desc">4</span> times.`,
    properties: [],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Total Healing',
        value: [{ scaling: 0.05, multiplier: Stats.HP, hits: 4 }],
        element: TalentProperty.HEAL,
        property: TalentProperty.HEAL,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '310000450',
    name: 'Hocus Pocus',
    icon: 'T_IconMonsterHead_31045_UI',
    skill: 'MstSkil_31045_UI',
    sonata: [Sonata.FROSTY_RESOLVE, Sonata.EMPYREAN_ANTHEM],
    desc: `Summon a Hocus Pocus to attack enemies with <span class="text-desc">3</span> consecutive strikes, each dealing {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b>.`,
    properties: [{ base: 27.6, growth: 3.6 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Hocus Pocus DMG',
        value: [{ scaling: calcRefinement(0.276, 0.036, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '310000460',
    name: 'Lottie Lost',
    icon: 'T_IconMonsterHead_31046_UI',
    skill: 'MstSkil_31046_UI',
    sonata: [
      Sonata.CELESTIAL_LIGHT,
      Sonata.MOONLIT_CLOUDS,
      Sonata.LINGERING_TUNES,
      Sonata.FROSTY_RESOLVE,
      Sonata.TIDEBREAKING_COURAGE,
    ],
    desc: `Summon a Lottie Lost to attack enemies, dealing {{0}}% <b class="text-spectro">Spectro DMG</b>.`,
    properties: [{ base: 82.8, growth: 10.8 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Lottie Lost DMG',
        value: [{ scaling: calcRefinement(0.828, 0.108, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.SPECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '310000470',
    name: 'Diggy Duggy',
    icon: 'T_IconMonsterHead_31047_UI',
    skill: 'MstSkil_31047_UI',
    sonata: [Sonata.ETERNAL_RADIANCE, Sonata.TIDEBREAKING_COURAGE],
    desc: `Transform into Diggy Duggy and jump up into the air to smash onto enemies, dealing {{0}}% <b class="text-slate-400">Physical DMG</b>.`,
    properties: [{ base: 464.6, growth: 60.6 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Diggy Duggy DMG',
        value: [{ scaling: calcRefinement(4.646, 0.606, r), multiplier: Stats.ATK }],
        element: Element.PHYSICAL,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '310000480',
    name: 'Chest Mimic',
    icon: 'T_IconMonsterHead_31048_UI',
    skill: 'MstSkil_31048_UI',
    sonata: [Sonata.FROSTY_RESOLVE, Sonata.MIDNIGHT_VEIL, Sonata.EMPYREAN_ANTHEM],
    desc: `Summon a Chest Mimic to attack enemies with <span class="text-desc">3</span> consecutive strikes, each dealing {{0}}% <b class="text-spectro">Spectro DMG</b>.`,
    properties: [{ base: 41.01, growth: 5.35 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Chest Mimic DMG',
        value: [{ scaling: calcRefinement(0.4101, 0.0535, r), multiplier: Stats.ATK }],
        element: Element.SPECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '320000220',
    name: 'Questless Knight',
    icon: 'T_IconMonsterHead_32022_UI',
    skill: 'MstSkil_32022_UI',
    sonata: [Sonata.FROSTY_RESOLVE, Sonata.MIDNIGHT_VEIL],
    desc: `Transform into Questless Knight and smash the surrounding enemies, dealing {{0}}% <b class="text-wuwa-electro">Electro DMG</b>.`,
    properties: [{ base: 308.2, growth: 40.2 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Questless Knight DMG',
        value: [{ scaling: calcRefinement(3.082, 0.402, r), multiplier: Stats.ATK }],
        element: Element.ELECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '320000230',
    name: 'Diurnus Knight',
    icon: 'T_IconMonsterHead_32023_UI',
    skill: 'MstSkil_32023_UI',
    sonata: [Sonata.ETERNAL_RADIANCE, Sonata.TIDEBREAKING_COURAGE],
    desc: `Transform into Diurnus Knight and charge forward to attack enemies with the sword, dealing {{0}}% <b class="text-wuwa-spectro">Spectro DMG</b>. DMG dealt to enemies inflicted by <b>Spectro Frazzle</b> is increased by <span class="text-desc">100%</span>.`,
    properties: [{ base: 292.1, growth: 38.1 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Diurnus Knight DMG',
        value: [{ scaling: calcRefinement(2.921, 0.381, r), multiplier: Stats.ATK }],
        element: Element.SPECTRO,
        property: TalentProperty.ECHO,
      })
      base.ECHO_SCALING.push({
        name: 'Enhanced Diurnus Knight DMG',
        value: [{ scaling: calcRefinement(2.921, 0.381, r) * 2, multiplier: Stats.ATK }],
        element: Element.SPECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '320000240',
    name: 'Nocturnus Knight',
    icon: 'T_IconMonsterHead_32024_UI',
    skill: 'MstSkil_32024_UI',
    sonata: [Sonata.MIDNIGHT_VEIL, Sonata.EMPYREAN_ANTHEM],
    desc: `Transform into Nocturnus Knight and strike enemies in front of you from the air, dealing {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b>.`,
    properties: [{ base: 296.7, growth: 38.7 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Nocturnus Knight DMG',
        value: [{ scaling: calcRefinement(2.967, 0.387, r), multiplier: Stats.ATK }],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '320000250',
    name: 'Abyssal Patricius',
    icon: 'T_IconMonsterHead_32025_UI',
    skill: 'MstSkil_32025_UI',
    sonata: [Sonata.FROSTY_RESOLVE, Sonata.EMPYREAN_ANTHEM],
    desc: `Transform into Abyssal Patricius and charge forward to attack enemies, dealing {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b>.
    <br />The Resonator with this Echo equipped in the main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-glacio">Glacio DMG Bonus</b>.`,
    properties: [{ base: 158.7, growth: 20.4 }],
    bonus: (base, r) => {
      base[Stats.GLACIO_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Abyssal Patricius',
      })
      base.ECHO_SCALING.push({
        name: 'Abyssal Patricius DMG',
        value: [{ scaling: calcRefinement(1.587, 0.204, r), multiplier: Stats.ATK }],
        element: Element.GLACIO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '320000260',
    name: 'Abyssal Gladius',
    icon: 'T_IconMonsterHead_32026_UI',
    skill: 'MstSkil_32027_UI',
    sonata: [Sonata.MIDNIGHT_VEIL, Sonata.TIDEBREAKING_COURAGE],
    desc: `Transform into Abyssal Gladius and attack enemies in front of you with the sword, dealing {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b>.
    <br />Hold the Echo Skill to maintain the Echo form for a while to slash enemies and cast a ranged attack forward, dealing {{0}}% and {{1}}% <b class="text-wuwa-glacio">Glacio DMG</b> respectively.`,
    properties: [
      { base: 174.8, growth: 22.8 },
      { base: 699.2, growth: 91.2 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Abyssal Gladius Slash DMG',
        value: [{ scaling: calcRefinement(1.748, 0.228, r), multiplier: Stats.ATK }],
        element: Element.GLACIO,
        property: TalentProperty.ECHO,
      })
      base.ECHO_SCALING.push({
        name: 'Abyssal Gladius Ranged DMG',
        value: [{ scaling: calcRefinement(6.992, 0.912, r), multiplier: Stats.ATK }],
        element: Element.GLACIO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '320000270',
    name: 'Abyssal Mercator',
    icon: 'T_IconMonsterHead_32027_UI',
    skill: 'MstSkil_32026_UI',
    sonata: [Sonata.FROSTY_RESOLVE, Sonata.ETERNAL_RADIANCE],
    desc: `Transform into Abyssal Mercator and summon <span class="text-desc">3</span> Ice Spikes to attack enemies, each dealing {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b>.`,
    properties: [{ base: 78.2, growth: 10.2 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Ice Spikes DMG',
        value: [{ scaling: calcRefinement(0.782, 0.102, r), multiplier: Stats.ATK }],
        element: Element.GLACIO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '320000280',
    name: 'Chop Chop',
    icon: 'T_IconMonsterHead_32028_UI',
    skill: 'MstSkil_32028_UI',
    sonata: [Sonata.EMPYREAN_ANTHEM, Sonata.TIDEBREAKING_COURAGE, Sonata.DREAM],
    desc: `Summon a Chop Chop to perform a series of consecutive attacks. The first <span class="text-desc">3</span> strikes each deal {{0}}% <b class="text-wuwa-fusion">Fusion DMG</b> and finishing strike deals {{1}}% <b class="text-wuwa-fusion">Fusion DMG</b>.`,
    properties: [
      { base: 22.77, growth: 2.97 },
      { base: 60.72, growth: 7.92 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Strike DMG',
        value: [{ scaling: calcRefinement(0.2277, 0.0297, r), multiplier: Stats.ATK }],
        element: Element.FUSION,
        property: TalentProperty.ECHO,
      })
      base.ECHO_SCALING.push({
        name: 'Finishing Strike DMG',
        value: [{ scaling: calcRefinement(0.6072, 0.0792, r), multiplier: Stats.ATK }],
        element: Element.FUSION,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '320000290',
    name: 'Vitreum Dancer',
    icon: 'T_IconMonsterHead_32029_UI',
    skill: 'MstSkil_32029_UI',
    sonata: [Sonata.ETERNAL_RADIANCE, Sonata.EMPYREAN_ANTHEM],
    desc: `Transform into Vitreum Dancer and attack surrounding enemies, dealing {{0}}% <b class="text-wuwa-electro">Electro DMG</b>.
    <br />The Resonator with this Echo equipped in their main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-electro">Electro DMG Bonus</b>.`,
    properties: [{ base: 323.15, growth: 42.15 }],
    bonus: (base, r) => {
      base[Stats.ELECTRO_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Vitreum Dancer',
      })
      base.ECHO_SCALING.push({
        name: 'Vitreum Dancer DMG',
        value: [{ scaling: calcRefinement(3.2315, 0.4215, r), multiplier: Stats.ATK }],
        element: Element.ELECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '60200032',
    name: 'Cuddle Wuddle',
    icon: 'T_IconMonsterHead_32030_UI',
    skill: 'MstSkil_32030_UI',
    sonata: [Sonata.MOLTEN_RIFT, Sonata.VOID_THUNDER, Sonata.FROSTY_RESOLVE, Sonata.MIDNIGHT_VEIL],
    desc: `Transform into Cuddle Wuddle and attack enemies with <span class="text-desc">4</span> strikes dealing {{0}}% <b class="text-slate-400">Physical DMG</b> and <span class="text-desc">1</span> strike dealing {{1}}% <b class="text-slate-400">Physical DMG</b>.`,
    properties: [
      { base: 74, growth: 9.66 },
      { base: 197.34, growth: 25.74 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Strike DMG',
        value: [{ scaling: calcRefinement(0.74, 0.0966, r), multiplier: Stats.ATK }],
        element: Element.PHYSICAL,
        property: TalentProperty.ECHO,
      })
      base.ECHO_SCALING.push({
        name: 'Finishing Strike DMG',
        value: [{ scaling: calcRefinement(1.9734, 0.2574, r), multiplier: Stats.ATK }],
        element: Element.PHYSICAL,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '330000110',
    name: 'Lorelei',
    icon: 'T_IconMonsterHead_33011_UI',
    skill: 'MstSkil_33011_UI',
    sonata: [Sonata.MIDNIGHT_VEIL],
    desc: `Transform into Lorelei and attack surrounding enemies, dealing {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b>.
    <br />The Resonator with this Echo equipped in their main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-havoc">Havoc DMG Bonus</b> and <span class="text-desc">12%</span> Resonance Liberation DMG Bonus.`,
    properties: [{ base: 363.4, growth: 47.4 }],
    bonus: (base, r) => {
      base[Stats.HAVOC_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Lorelei',
      })
      base[Stats.LIB_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Lorelei',
      })
      base.ECHO_SCALING.push({
        name: 'Lorelei DMG',
        value: [{ scaling: calcRefinement(3.634, 0.474, r), multiplier: Stats.ATK }],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 4,
  },
  {
    id: '330000120',
    name: 'Sentry Construct',
    icon: 'T_IconMonsterHead_33012_UI',
    skill: 'MstSkil_33012_UI',
    sonata: [Sonata.FROSTY_RESOLVE],
    desc: `Transform into Sentry Construct and attack enemies in front, dealing {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b>. Each time the Resonator with this Echo casts Resonance Liberation, it enhances the Strike Capacitor.
    <br />Once Strike Capacitor is at max level, the Echo Skill cooldown will be reset. Use Echo Skill to transform into Sentry Construct and dive into enemies from the air, dealing {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b> and freezing the target.
    <br />The Resonator with this Echo equipped in their main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-glacio">Glacio DMG Bonus</b> and <span class="text-desc">12%</span> Resonance Skill DMG Bonus.`,
    properties: [{ base: 270, growth: 45 }],
    bonus: (base, r) => {
      base[Stats.GLACIO_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Sentry Construct',
      })
      base[Stats.SKILL_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Sentry Construct',
      })
      base.ECHO_SCALING.push({
        name: 'Sentry Construct DMG',
        value: [{ scaling: calcRefinement(2.7, 0.45, r), multiplier: Stats.ATK }],
        element: Element.GLACIO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 4,
  },
  {
    id: '330000130',
    name: 'Dragon of Dirge',
    icon: 'T_IconMonsterHead_33013_UI',
    skill: 'MstSkil_33013_UI',
    sonata: [Sonata.TIDEBREAKING_COURAGE],
    desc: `Transform into Dragon of Dirge and cast Meteorite of Judgment to attack enemies within the Grief Rift, which summons up to <span class="text-desc">10</span> Meteorite, each dealing {{0}}% <b class="text-wuwa-fusion">Fusion DMG</b>.
    <br />The Resonator with this Echo equipped in the main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-fusion">Fusion DMG Bonus</b> and <span class="text-desc">12%</span> Basic Attack DMG Bonus.`,
    properties: [{ base: 35.77, growth: 4.66 }],
    bonus: (base, r) => {
      base[Stats.FUSION_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Dragon of Dirge',
      })
      base[Stats.BASIC_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Dragon of Dirge',
      })
      base.ECHO_SCALING.push({
        name: 'Meteorite DMG',
        value: [{ scaling: calcRefinement(0.3577, 0.0466, r), multiplier: Stats.ATK }],
        element: Element.FUSION,
        property: TalentProperty.ECHO,
      })
      base.ECHO_SCALING.push({
        name: 'Total Meteorite DMG',
        value: [{ scaling: calcRefinement(0.3577, 0.0466, r), multiplier: Stats.ATK, hits: 10 }],
        element: Element.FUSION,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 4,
  },
  {
    id: '340000100',
    name: 'Hecate',
    icon: 'T_IconMonsterHead_34010_1_UI',
    skill: 'MstSkil_34010_UI',
    sonata: [
      Sonata.EMPYREAN_ANTHEM,
      Sonata.FREEZING_FROST,
      Sonata.MOLTEN_RIFT,
      Sonata.VOID_THUNDER,
      Sonata.SIERRA_GALE,
      Sonata.CELESTIAL_LIGHT,
      Sonata.SUN_SINKING_ECLIPSE,
    ],
    desc: `Summon 3 twirling Crescent Servants around you. Crescent Servants attack enemies with their spinning blades, dealing {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b>. Triggering a Counterattack with the Echo attacks extends the Crescent Servants' summon duration.
    <br />The Resonator with this Echo equipped in the main slot has their Coordinated Attack DMG increased by <span class="text-desc">40%</span>.`,
    properties: [{ base: 29.13, growth: 3.8 }],
    bonus: (base, r) => {
      base[Stats.COORD_DMG].push({
        value: 0.4,
        name: 'Echo Skill',
        source: 'Hecate',
      })
      base.ECHO_SCALING.push({
        name: 'Crescent Servants DMG',
        value: [{ scaling: calcRefinement(0.2913, 0.038, r), multiplier: Stats.ATK }],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 4,
  },
  {
    id: '60000865',
    name: 'Nightmare: Feilian Beringal',
    icon: 'T_IconMonsterHead_YZ_33014_UI',
    skill: 'T_Mstskil_996_UI',
    sonata: [Sonata.SIERRA_GALE],
    desc: `Summon a Nightmare: Feilian Beringal to attack enemies, dealing {{0}}% <b class="text-wuwa-aero">Aero DMG</b>. The remaining Whirlwind Beam will continuously attack surrounding enemies up to <span class="text-desc">5</span> times, each dealing {{1}}% <b class="text-wuwa-aero">Aero DMG</b>.
    <br />The Resonator with this Echo equipped in their main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-aero">Aero DMG Bonus</b> and <span class="text-desc">12%</span> Heavy Attack DMG Bonus.`,
    properties: [
      { base: 104.88, growth: 13.68 },
      { base: 13.98, growth: 1.83 },
    ],
    bonus: (base, r) => {
      base[Stats.AERO_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Nightmare: Feilian Beringal',
      })
      base[Stats.HEAVY_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Nightmare: Feilian Beringal',
      })
      base.ECHO_SCALING.push({
        name: 'Initial Strike DMG',
        value: [{ scaling: calcRefinement(1.0488, 0.1368, r), multiplier: Stats.ATK }],
        element: Element.AERO,
        property: TalentProperty.ECHO,
      })
      base.ECHO_SCALING.push({
        name: 'Whirlwind Beam DMG',
        value: [{ scaling: calcRefinement(0.1398, 0.0183, r), multiplier: Stats.ATK }],
        element: Element.AERO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 4,
  },
  {
    id: '6000093',
    name: 'Golden Junrock',
    icon: 'T_IconMonsterHead_31049_UI',
    skill: 'T_Mstskil_31049_UI',
    sonata: [Sonata.FROSTY_RESOLVE, Sonata.ETERNAL_RADIANCE],
    desc: `Summon a Golden Junrock that charges forward, dealing {{0}}% <b class="text-wuwa-spectro">Spectro DMG</b> to enemies in its path.`,
    properties: [{ base: 86.4, growth: 14.4 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Golden Junrock DMG',
        value: [{ scaling: calcRefinement(0.864, 0.144, r), multiplier: Stats.ATK }],
        element: Element.SPECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000094',
    name: 'Calcified Junrock',
    icon: 'T_IconMonsterHead_31050_UI',
    skill: 'T_Mstskil_31050_UI',
    sonata: [Sonata.FROSTY_RESOLVE, Sonata.TIDEBREAKING_COURAGE],
    desc: `Summon a Calcified Junrock that restores HP for nearby Resonators in the team by {{0}}% of their Max HP, up to <span class="text-desc">5</span> times.`,
    properties: [{ base: 1.68, growth: 0.28 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Healing per Tick',
        value: [{ scaling: calcRefinement(0.0168, 0.0028, r), multiplier: Stats.HP }],
        element: TalentProperty.HEAL,
        property: TalentProperty.HEAL,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000095',
    name: 'Aero Prism',
    icon: 'T_IconMonsterHead_31051_UI',
    skill: 'T_Mstskil_31051_UI',
    sonata: [Sonata.ETERNAL_RADIANCE, Sonata.TIDEBREAKING_COURAGE],
    desc: `Summon an Aero Prism to attack enemies, dealing {{0}}% <b class="text-wuwa-aero">Aero DMG</b>.`,
    properties: [{ base: 12.84, growth: 2.14 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Aero Prism DMG',
        value: [{ scaling: calcRefinement(0.1284, 0.0214, r), multiplier: Stats.ATK }],
        element: Element.AERO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000096',
    name: 'Rage Against the Statue',
    icon: 'T_IconMonsterHead_32031_UI',
    skill: 'T_Mstskil_31031_UI',
    sonata: [Sonata.ETERNAL_RADIANCE, Sonata.GUST_OF_WELKIN],
    desc: `Transform into Rage Against the Statue to attack enemies, dealing {{0}}% <b class="text-wuwa-spectro">Spectro DMG</b>. Hold the Echo Skill to maintain the Echo form and charge towards enemies, dealing {{1}}% <b class="text-wuwa-spectro">Spectro DMG</b>.`,
    properties: [
      { base: 208.8, growth: 34.8 },
      { base: 313.2, growth: 52.2 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Press DMG',
          value: [{ scaling: calcRefinement(2.088, 0.348, r), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Hold DMG',
          value: [{ scaling: calcRefinement(3.132, 0.522, r), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 3,
  },
  {
    id: '6000097',
    name: 'Hurriclaw',
    icon: 'T_IconMonsterHead_32032_UI',
    skill: 'T_Mstskil_31032_UI',
    sonata: [Sonata.TIDEBREAKING_COURAGE, Sonata.GUST_OF_WELKIN],
    desc: `Transform into Hurriclaw and charge forward, dealing {{0}}% <b class="text-wuwa-aero">Aero DMG</b> upon hit plus {{0}}% <b class="text-wuwa-aero">Aero DMG</b> with a sweep attack. Hold the Echo Skill to continue charging forward. Use Echo Skill again while charging to perform a sweep attack.`,
    properties: [{ base: 104.4, growth: 17.4 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'DMG per Hit',
          value: [{ scaling: calcRefinement(1.044, 0.174, r), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Total DMG',
          value: [{ scaling: calcRefinement(2.088, 0.348, r), multiplier: Stats.ATK, hits: 2 }],
          element: Element.AERO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 3,
  },
  {
    id: '6000098',
    name: 'La Guardia',
    icon: 'T_IconMonsterHead_31052_UI',
    skill: '',
    sonata: [Sonata.MIDNIGHT_VEIL, Sonata.GUST_OF_WELKIN, Sonata.FLAMING_CLAWPRINT],
    desc: `Transform into La Guardia and attack nearby targets, dealing {{0}}% <b class="text-slate-400">Physical DMG</b>.
    <br />Hold the Echo Skill to maintain the Echo form for a while to slash enemies and cast a ranged attack forward. The slash deals {{0}}% <b class="text-slate-400">Physical DMG</b>, and the ranged attack deals {{1}}% <b class="text-slate-400">Physical DMG</b> up to <span class="text-desc">15</span> times.`,
    properties: [
      { base: 178.8, growth: 29.8 },
      { base: 11.92, growth: 1.98 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Press DMG',
          value: [{ scaling: calcRefinement(1.788, 0.298, r), multiplier: Stats.ATK }],
          element: Element.PHYSICAL,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Total Hold DMG',
          value: [
            { scaling: calcRefinement(1.788, 0.298, r), multiplier: Stats.ATK },
            { scaling: calcRefinement(0.1192, 0.0198, r), multiplier: Stats.ATK, hits: 15 },
          ],
          element: Element.PHYSICAL,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 1,
  },
  {
    id: '6000099',
    name: 'Sagittario',
    icon: 'T_IconMonsterHead_31053_UI',
    skill: 'T_Mstskil_31053',
    sonata: [Sonata.ETERNAL_RADIANCE, Sonata.GUST_OF_WELKIN, Sonata.FLAMING_CLAWPRINT],
    desc: `Transform into Sagittario to move a certain distance and perform a ranged attack, dealing {{0}}% <b class="text-wuwa-spectro">Spectro DMG</b>.
    <br />Getting attacked while moving in the Sagittario form triggers form triggers a damage avoiding enhanced Dodge Counter, dealing {{0}}% <b class="text-wuwa-spectro">Spectro DMG</b> once and 53.64% <b class="text-wuwa-spectro">Spectro DMG</b> <span class="text-desc">5</span> times.`,
    properties: [
      { base: 178.8, growth: 29.8 },
      { base: 35.76, growth: 5.94 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Attack DMG',
          value: [{ scaling: calcRefinement(1.788, 0.298, r), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Dodge Counter DMG',
          value: [
            { scaling: calcRefinement(1.788, 0.298, r), multiplier: Stats.ATK },
            { scaling: calcRefinement(0.3576, 0.0594, r), multiplier: Stats.ATK, hits: 5 },
          ],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 1,
  },
  {
    id: '6000100',
    name: 'Sacerdos',
    icon: 'T_IconMonsterHead_31054_UI',
    skill: 'T_Mstskil_31054',
    sonata: [Sonata.GUST_OF_WELKIN, Sonata.WINDWARD],
    desc: `Summon a Sacerdos to attack enemies, dealing {{0}}% <b class="text-wuwa-aero">Aero DMG</b> <span class="text-desc">2</span> times.`,
    properties: [{ base: 43.2, growth: 7.2 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Sacerdos DMG',
        value: [{ scaling: calcRefinement(0.432, 0.072, r), multiplier: Stats.ATK, hits: 2 }],
        element: Element.AERO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000101',
    name: 'Aero Drake',
    icon: 'T_IconMonsterHead_31055_UI',
    skill: 'T_Mstskil_31055_UI',
    sonata: [Sonata.TIDEBREAKING_COURAGE, Sonata.GUST_OF_WELKIN, Sonata.FLAMING_CLAWPRINT],
    desc: `Summon an Aero Drake to attack enemies, dealing {{0}}% <b class="text-wuwa-aero">Aero DMG</b>.`,
    properties: [{ base: 86.4, growth: 14.4 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Aero Drake DMG',
        value: [{ scaling: calcRefinement(0.864, 0.144, r), multiplier: Stats.ATK }],
        element: Element.AERO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000102',
    name: 'Electro Drake',
    icon: 'T_IconMonsterHead_31056_UI',
    skill: 'T_Mstskil_31056_UI',
    sonata: [Sonata.MIDNIGHT_VEIL, Sonata.GUST_OF_WELKIN, Sonata.FLAMING_CLAWPRINT],
    desc: `Summon an Electro Drake to attack enemies, dealing {{0}}% <b class="text-wuwa-electro">Electro DMG</b> <span class="text-desc">3</span> times.`,
    properties: [{ base: 28.8, growth: 4.8 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Electro Drake DMG',
        value: [{ scaling: calcRefinement(0.288, 0.048, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.ELECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000103',
    name: 'Glacio Drake',
    icon: 'T_IconMonsterHead_31057_UI',
    skill: 'T_Mstskil_31057_UI',
    sonata: [Sonata.GUST_OF_WELKIN, Sonata.WINDWARD],
    desc: `Summon an Glacio Drake to attack enemies, dealing {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b> <span class="text-desc">5</span> times.`,
    properties: [{ base: 17.28, growth: 2.88 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Glacio Drake DMG',
        value: [{ scaling: calcRefinement(0.1728, 0.0288, r), multiplier: Stats.ATK, hits: 5 }],
        element: Element.GLACIO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000104',
    name: 'Capitaneus',
    icon: 'T_IconMonsterHead_32033_UI',
    skill: 'T_MstSkil_32033_UI',
    sonata: [Sonata.ETERNAL_RADIANCE, Sonata.GUST_OF_WELKIN, Sonata.WINDWARD],
    desc: `Summon a Capitaneus to jump up and smash enemies, dealing {{0}}% <b class="text-wuwa-spectro">Spectro DMG</b>. This attack generates <span class="text-desc">4</span> extra Merciless Judgements, each dealing {{1}}% <b class="text-wuwa-spectro">Spectro DMG</b>.
    <br />The Resonator with this Echo equipped in their main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-spectro">Spectro DMG Bonus</b> and <span class="text-desc">12%</span> Heavy Attack DMG Bonus.`,
    properties: [
      { base: 79.2, growth: 13.2 },
      { base: 39.6, growth: 6.6 },
    ],
    bonus: (base, r) => {
      base[Stats.SPECTRO_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Capitaneus',
      })
      base[Stats.HEAVY_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Capitaneus',
      })
      base.ECHO_SCALING.push(
        {
          name: 'Smash DMG',
          value: [{ scaling: calcRefinement(0.792, 0.132, r), multiplier: Stats.ATK }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Merciless Judgement DMG',
          value: [{ scaling: calcRefinement(0.396, 0.066, r), multiplier: Stats.ATK, hits: 4 }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 3,
  },
  {
    id: '6000105',
    name: 'Nightmare: Lampylumen Myriad',
    icon: 'T_IconMonsterHead_34013_UI',
    skill: 'T_Mstskil_994_UI',
    sonata: [Sonata.FROSTY_RESOLVE, Sonata.EMPYREAN_ANTHEM],
    desc: `Summon a Nightmare: Lampylumen Myriad and attack nearby enemies, dealing {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b>.
    <br />The Resonator with this Echo equipped in their main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-glacio">Glacio DMG Bonus</b> and has their Coordinated Attack DMG increased by <span class="text-desc">30%</span>.`,
    properties: [{ base: 182.4, growth: 30.4 }],
    bonus: (base, r) => {
      base[Stats.GLACIO_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Nightmare: Lampylumen Myriad',
      })
      base[Stats.COORD_DMG].push({
        value: 0.3,
        name: 'Echo Skill',
        source: 'Nightmare: Lampylumen Myriad',
      })
      base.ECHO_SCALING.push({
        name: 'Smash DMG',
        value: [{ scaling: calcRefinement(1.824, 0.304, r), multiplier: Stats.ATK }],
        element: Element.GLACIO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 4,
  },
  {
    id: '6000106',
    name: 'Reminiscence: Fleurdelys',
    icon: 'T_IconMonsterHead_34012_1_UI',
    skill: 'T_MstSkil_34012_UI',
    sonata: [Sonata.GUST_OF_WELKIN, Sonata.WINDWARD],
    desc: `Summon the Windcleaver to attack the target, dealing {{0}}% <b class="text-wuwa-aero">Aero DMG</b> <span class="text-desc">8</span> times and {{1}}% <b class="text-wuwa-aero">Aero DMG</b> once.
    <br />The Resonator with this Echo equipped in their main slot gains <span class="text-desc">10%</span> <b class="text-wuwa-aero">Aero DMG Bonus</b>. When Rover: Aero or Cartethyia equips this Echo, they gain <span class="text-desc">10%</span> more <b class="text-wuwa-aero">Aero DMG Bonus</b>.`,
    properties: [
      { base: 18.24, growth: 3.04 },
      { base: 91.2, growth: 15.2 },
    ],
    bonus: (base, r) => {
      base[Stats.AERO_DMG].push({
        value: _.includes(['Rover'], base.NAME) && base.ELEMENT === Element.AERO ? 0.2 : 0.1,
        name: 'Echo Skill',
        source: 'Reminiscence: Fleurdelys',
      })
      base.ECHO_SCALING.push({
        name: 'Windcleaver DMG',
        value: [
          { scaling: calcRefinement(0.1824, 0.0304, r), multiplier: Stats.ATK, hits: 8 },
          { scaling: calcRefinement(0.912, 0.301524, r), multiplier: Stats.ATK },
        ],
        element: Element.AERO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 4,
  },
  {
    id: '6000107',
    name: 'Fusion Drake',
    icon: 'T_IconMonsterHead_31058_UI',
    skill: 'T_MstSkil_31058_UI',
    sonata: [Sonata.WINDWARD, Sonata.FLAMING_CLAWPRINT],
    desc: `Summon a Fusion Drake to attack enemies, dealing {{0}}% <b class="text-wuwa-fusion">Fusion DMG</b> <span class="text-desc">3</span> times.`,
    properties: [{ base: 17.28, growth: 2.88 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Fusion Drake DMG',
        value: [{ scaling: calcRefinement(0.1728, 0.0288, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.FUSION,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000108',
    name: 'Spectro Drake',
    icon: 'T_IconMonsterHead_31059_UI',
    skill: 'T_MstSkil_31059_UI',
    sonata: [Sonata.WINDWARD, Sonata.FLAMING_CLAWPRINT],
    desc: `Summon a Spectro Drake to attack enemies, dealing {{0}}% <b class="text-wuwa-spectro">Spectro DMG</b> <span class="text-desc">3</span> times.`,
    properties: [{ base: 28.8, growth: 4.8 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Spectro Drake DMG',
        value: [{ scaling: calcRefinement(0.288, 0.048, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.SPECTRO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000109',
    name: 'Havoc Drake',
    icon: 'T_IconMonsterHead_31060_UI',
    skill: 'T_MstSkil_31060_UI',
    sonata: [Sonata.WINDWARD, Sonata.FLAMING_CLAWPRINT],
    desc: `Summon a Havoc Drake to attack enemies, dealing {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b> <span class="text-desc">3</span> times.`,
    properties: [{ base: 86.4, growth: 14.1 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Havoc Drake DMG',
        value: [{ scaling: calcRefinement(0.864, 0.144, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000110',
    name: `Devotee's Flesh`,
    icon: 'T_IconMonsterHead_31061_UI',
    skill: 'T_MstSkil_31061_UI',
    sonata: [Sonata.GUST_OF_WELKIN, Sonata.WINDWARD, Sonata.FLAMING_CLAWPRINT],
    desc: `Summon a Devotee's Flesh to attack enemies, dealing {{0}}% <b class="text-wuwa-aero">Aero DMG</b> <span class="text-desc">3</span> times.`,
    properties: [{ base: 28.8, growth: 4.8 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: `Devotee's Flesh DMG`,
        value: [{ scaling: calcRefinement(0.288, 0.048, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.AERO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000111',
    name: `Pilgrim's Shell`,
    icon: 'T_IconMonsterHead_32034_UI',
    skill: 'T_MstSkil_32034_UI',
    sonata: [Sonata.WINDWARD, Sonata.FLAMING_CLAWPRINT],
    desc: `Transform into a Pilgrim's Shell to attack nearby enemies, dealing {{0}}% <b class="text-wuwa-aero">Aero DMG</b>.`,
    properties: [{ base: 178.8, growth: 29.8 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: `Pilgrim's Shell DMG`,
        value: [{ scaling: calcRefinement(1.788, 0.298, r), multiplier: Stats.ATK }],
        element: Element.AERO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '6000112',
    name: `Kerasaur`,
    icon: 'T_IconMonsterHead_31062_UI',
    skill: 'T_MstSkil_32034_UI',
    sonata: [Sonata.WINDWARD, Sonata.FLAMING_CLAWPRINT],
    desc: `Transform into Kerasaur to leap into the air and slam down, dealing {{0}}% Aero DMG. Shortly after hitting the target, Press Echo Skill again to charge at the target, dealing {{0}}% <b class="text-wuwa-aero">Aero DMG</b>.
    <br />The Resonator with this Echo equipped in their main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-aero">Aero DMG Bonus</b> and <span class="text-desc">12%</span> Resonance Liberation DMG Bonus.`,
    properties: [{ base: 178.8, growth: 29.8 }],
    bonus: (base, r) => {
      base[Stats.AERO_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Kerasaur',
      })
      base[Stats.LIB_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Kerasaur',
      })
      base.ECHO_SCALING.push({
        name: `Kerasaur DMG`,
        value: [{ scaling: calcRefinement(1.788, 0.298, r), multiplier: Stats.ATK }],
        element: Element.AERO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
  {
    id: '6000113',
    name: `Nightmares - Kelpie`,
    icon: 'T_IconMonsterHead_33021_UI',
    skill: 'T_MstSkil_33021_UI',
    sonata: [Sonata.GUST_OF_WELKIN, Sonata.WINDWARD],
    desc: `Transform into Nightmare - Kelpie to attack nearby targets, dealing {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b>.
    <br />The Resonator with this Echo equipped in their main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-glacio">Glacio DMG Bonus</b> and <span class="text-desc">12%</span> <b class="text-wuwa-aero">Aero DMG Bonus</b>.
    <br />Performing Outro Skill summons Nightmares - Kelpie to deal {{0}}% <b class="text-wuwa-aero">Aero DMG</b>.`,
    properties: [{ base: 270, growth: 45 }],
    bonus: (base, r) => {
      base[Stats.AERO_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Nightmares - Kelpie',
      })
      base[Stats.GLACIO_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Nightmares - Kelpie',
      })
      base.ECHO_SCALING.push(
        {
          name: `Active DMG`,
          value: [{ scaling: calcRefinement(2.7, 0.45, r), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.ECHO,
        },
        {
          name: `Outro DMG`,
          value: [{ scaling: calcRefinement(2.7, 0.45, r), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 4,
  },
  {
    id: '6000114',
    name: `Lioness of Glory`,
    icon: 'T_IconMonsterHead_33022_UI',
    skill: 'T_MstSkil_33022_UI',
    sonata: [Sonata.FLAMING_CLAWPRINT],
    desc: `Summon the Halberd of Glory to strike nearby targets, dealing {{0}}% <b class="text-wuwa-fusion">Fusion DMG</b>, followed by an additional {{1}}% Fusion DMG after a short delay.
    <br />The Resonator with this Echo equipped in their main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-fusion">Fusion DMG Bonus</b> and <span class="text-desc">12%</span> Resonance Liberation DMG Bonus.`,
    properties: [
      { base: 54.72, growth: 9.12 },
      { base: 127.68, growth: 21.28 },
    ],
    bonus: (base, r) => {
      base[Stats.FUSION_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Lioness of Glory',
      })
      base[Stats.LIB_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Lioness of Glory',
      })
      base.ECHO_SCALING.push({
        name: `Halberd of Glory DMG`,
        value: [
          { scaling: calcRefinement(0.6472, 0.0912, r), multiplier: Stats.ATK },
          { scaling: calcRefinement(1.2768, 0.2128, r), multiplier: Stats.ATK },
        ],
        element: Element.FUSION,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 4,
  },
  {
    id: '6000115',
    name: `Nightmare: Hecate`,
    icon: 'T_IconMonsterHead_34016_UI',
    skill: 'MstSkil_34010_UI',
    sonata: [Sonata.DREAM],
    desc: `Transform into Nightmare: Hecate. Leap up and smash down, dealing <span class="text-desc">3</span> stages of damage, each dealing <b class="text-wuwa-havoc">Havoc DMG</b> equal to {{0}}% of her ATK.
    <br />The Resonator with the Echo equipped in the main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-havoc">Havoc DMG Bonus</b> and <span class="text-desc">20%</span> Echo Skill DMG Bonus.`,
    properties: [{ base: 101.59, growth: 16.93 }],
    bonus: (base, r) => {
      base[Stats.HAVOC_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Nightmare: Hecate',
      })
      base[Stats.ECHO_DMG].push({
        value: 0.2,
        name: 'Echo Skill',
        source: 'Nightmare: Hecate',
      })
      base.ECHO_SCALING.push({
        name: `Nightmare: Hecate DMG`,
        value: [{ scaling: calcRefinement(1.0159, 0.1693, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 4,
  },
  {
    id: '6000116',
    name: `Reminiscence: Fenrico`,
    icon: 'T_IconMonsterHead_34015_2_UI',
    skill: 'T_Mstskil_34015_UI',
    sonata: [Sonata.DREAM],
    desc: `Summon the Talons of Decree to attack nearby enemies, dealing {{0}}% <b class="text-wuwa-aero">Aero DMG</b>.
    <br />The Resonator with this Echo equipped in their main slot gains <span class="text-desc">12%</span> <b class="text-wuwa-aero">Aero DMG Bonus</b> and <span class="text-desc">12%</span> Heavy Attack DMG Bonus.`,
    properties: [{ base: 182.4, growth: 30.4 }],
    bonus: (base, r) => {
      base[Stats.AERO_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Reminiscence: Fenrico',
      })
      base[Stats.HEAVY_DMG].push({
        value: 0.12,
        name: 'Echo Skill',
        source: 'Reminiscence: Fenrico',
      })
      base.ECHO_SCALING.push({
        name: `Talons of Decree DMG`,
        value: [{ scaling: calcRefinement(1.824, 0.304, r), multiplier: Stats.ATK, hits: 2 }],
        element: Element.AERO,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 4,
  },
  {
    id: '6000117',
    name: 'Nightmare: Havoc Warrior',
    icon: 'T_IconMonsterHead_31063_UI',
    skill: 'T_MstSkil_Z_Z8_UI',
    sonata: [Sonata.DREAM],
    desc: `Transform into Havoc Warrior to attack up to <span class="text-desc">3</span> times, dealing {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b> each time.`,
    properties: [{ base: 123.43, growth: 16.1 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Nightmare: Havoc Warrior DMG',
        value: [{ scaling: calcRefinement(1.2343, 0.161, r), multiplier: Stats.ATK, hits: 3 }],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 1,
  },
  {
    id: '6000118',
    name: 'Nightmare: Glacio Predator',
    icon: 'T_IconMonsterHead_31064_UI',
    skill: 'T_MstSkil_Z_Z9_UI',
    sonata: [Sonata.DREAM],
    desc: `Summon a Glacio Predator that throws an ice spear, dealing {{0}}% <b class="text-wuwa-glacio">Glacio DMG</b> on hit. Deal {{1}}% <b class="text-wuwa-glacio">Glacio DMG</b> up to <span class="text-desc">10</span> times during the charging time, and {{2}}% <b class="text-wuwa-glacio">Glacio DMG</b> when the spear explodes.`,
    properties: [
      { base: 33.12, growth: 4.32 },
      { base: 3.31, growth: 0.43 },
      { base: 16.56, growth: 2.16 },
    ],
    bonus: (base, r) => {
      base.ECHO_SCALING.push(
        {
          name: 'Ice Spear DMG',
          value: [{ scaling: calcRefinement(0.3312, 0.0432, r), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Lance Field DMG',
          value: [
            { scaling: calcRefinement(0.0331, 0.0043, r), multiplier: Stats.ATK, hits: 10 },
            { scaling: calcRefinement(0.1656, 0.00402163, r), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.ECHO,
        }
      )
      return base
    },
    cost: 1,
  },
  {
    id: '6000119',
    name: 'Nightmare: Tambourinist',
    icon: 'T_IconMonsterHead_32043_UI',
    skill: 'T_MstSkil_205_UI',
    sonata: [Sonata.DREAM],
    desc: `Summon a Tambourinist that plays out <b>Melodies of Annihilation</b>. Any Resonator on the team gains the following effect for <span class="text-desc">10</span>s upon obtaining a <b>Melody of Annihilation</b>>: When the Resonator hits a target, the Tambourinist deals {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b> to the target, up to <span class="text-desc">10</span> times.`,
    properties: [{ base: 10.35, growth: 1.35 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Melodies of Annihilation DMG',
        value: [{ scaling: calcRefinement(0.1035, 0.0135, r), multiplier: Stats.ATK }],
        element: Element.HAVOC,
        property: TalentProperty.ECHO,
      })
      return base
    },
    cost: 3,
  },
]
