import { calcRefinement } from '@src/core/utils/data_format'
import { Element, IArtifact, Stats, TalentProperty, WeaponType } from '@src/domain/constant'
import _ from 'lodash'

export enum Sonata {
  WIND = 'Sierra Gale',
  ATK = 'Lingering Tunes',
  THUNDER = 'Void Thunder',
  HEAL = 'Rejuvenating Glow',
  REGEN = 'Moonlit Clouds',
  HAVOC = 'Sun-sinking Eclipse',
  ICE = 'Freezing Frost',
  LIGHT = 'Celestial Light',
}

export const Echoes: IArtifact[] = [
  {
    id: '6000038',
    name: 'Hooscamp',
    icon: '988',
    skill: '988',
    sonata: [Sonata.WIND, Sonata.ATK],
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
    icon: '221',
    skill: 'B3',
    sonata: [Sonata.THUNDER],
    desc: `Transform into Tempest Mephis to perform tail swing attacks followed by a claw attack. The lightning strike summoned by the tail swing deals {{0}}% <b class="text-wuwa-electro">Electro DMG</b> each time, while the claw attack deals {{1}}% <b class="text-wuwa-electro">Electro DMG</b>.
    <br />
    <br />After the claw hit, increase the current character's <b class="text-wuwa-electro">Electro DMG</b> by {{2}}% and Heavy Attack DMG by {{2}}% for <span class="text-desc">15</span>s.`,
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
    id: '6000040',
    name: 'Hoochief',
    icon: '989',
    skill: '989',
    sonata: [Sonata.WIND],
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
    icon: '987',
    skill: '987',
    sonata: [Sonata.REGEN, Sonata.ATK],
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
    icon: '9991',
    skill: 'B8',
    sonata: [Sonata.HAVOC],
    desc: `Transform into Crownless and perform up to 4 consecutive attacks. The first 2 attacks deal {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b> each, the 3rd attack deals {{1}}% <b class="text-wuwa-havoc">Havoc DMG</b> <span class="text-desc">2</span> times, and the 4th attack deals {{2}}% <b class="text-wuwa-havoc">Havoc DMG</b> <span class="text-desc">3</span> times.
    <br />
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
    id: '6000043',
    name: 'Feilian Beringal',
    icon: '996',
    skill: '996',
    sonata: [Sonata.WIND],
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
    icon: '994',
    skill: '994',
    sonata: [Sonata.ICE],
    desc: `Transform into Lampylumen Myriad. Perform up to 3 consecutive attacks.
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
    icon: '997',
    skill: '997',
    sonata: [Sonata.LIGHT],
    desc: `Transform into Mourning Aix and perform 2 consecutive claw attacks, each attack dealing {{0}}% and {{1}}% <b class="text-wuwa-spectro">Spectro DMG</b> respectively.
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
    id: '6000046',
    name: 'Carapace',
    icon: '970',
    skill: '970',
    sonata: [Sonata.WIND, Sonata.REGEN],
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
]
