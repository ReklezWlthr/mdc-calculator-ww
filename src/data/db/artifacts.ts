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
  FIRE = 'Molten Rift',
}

export const Echoes: IArtifact[] = [
  {
    id: '6000038',
    name: 'Hooscamp',
    icon: 'T_IconMonsterGoods_988_UI',
    skill: 'T_MstSkil_988_UI',
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
    icon: 'T_IconMonsterGoods_221_UI',
    skill: 'T_MstSkil_Z_B3_UI',
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
    icon: 'T_IconMonsterGoods_989_UI',
    skill: 'T_MstSkil_989_UI',
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
    icon: 'T_IconMonsterGoods_987_UI',
    skill: 'T_MstSkil_987_UI',
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
    icon: 'T_IconMonsterGoods_9991_UI',
    skill: 'T_MstSkil_Z_B8_UI',
    sonata: [Sonata.HAVOC],
    desc: `Transform into Crownless and perform up to <span class="text-desc">4</span> consecutive attacks. The first <span class="text-desc">2</span> attacks deal {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b> each, the <span class="text-desc">3rd</span> attack deals {{1}}% <b class="text-wuwa-havoc">Havoc DMG</b> <span class="text-desc">2</span> times, and the <span class="text-desc">4th</span> attack deals {{2}}% <b class="text-wuwa-havoc">Havoc DMG</b> <span class="text-desc">3</span> times.
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
    icon: 'T_IconMonsterGoods_996_UI',
    skill: 'T_Mstskil_996_UI',
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
    icon: 'T_IconMonsterGoods_994_UI',
    skill: 'T_Mstskil_994_UI',
    sonata: [Sonata.ICE],
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
    sonata: [Sonata.LIGHT],
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
    id: '6000046',
    name: 'Carapace',
    icon: 'T_IconMonsterGoods_970_UI',
    skill: 'T_MstSkil_970_UI',
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
  {
    id: '6000047',
    name: 'Chirpuff',
    icon: 'T_IconMonsterGoods_971_UI',
    skill: 'T_MstSkil_971_UI',
    sonata: [Sonata.WIND, Sonata.HAVOC],
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
    sonata: [Sonata.ATK],
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
    sonata: [Sonata.ICE, Sonata.LIGHT],
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
    sonata: [Sonata.FIRE, Sonata.THUNDER, Sonata.WIND],
    desc: `Summon a Traffic Illuminator, immobilizing enemies for up to <span class="text-desc">1</span>s. The immobilization will be lifted once the enemy is hit.`,
    properties: [],
    cost: 1,
  },
  {
    id: '6000051',
    name: 'Clang Bang',
    icon: 'T_IconMonsterHead_1001_UI',
    skill: 'T_MstSkil_998_UI',
    sonata: [Sonata.LIGHT, Sonata.ICE],
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
    sonata: [Sonata.REGEN],
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
    id: '6000053',
    name: 'Dreamless',
    icon: 'T_IconMonsterHead_998_UI',
    skill: 'T_MstSkil_Z_B8_1_UI',
    sonata: [Sonata.HAVOC],
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
    sonata: [Sonata.FIRE, Sonata.ATK],
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
    sonata: [Sonata.WIND, Sonata.HEAL],
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
    sonata: [Sonata.ICE, Sonata.REGEN],
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
    sonata: [Sonata.ICE, Sonata.THUNDER],
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
    sonata: [Sonata.LIGHT],
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
    sonata: [Sonata.LIGHT],
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
    sonata: [Sonata.HEAL],
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
          name: 'Press Blast DMG',
          value: [{ scaling: calcRefinement(0.114, 0.0148, r), multiplier: Stats.HP }],
          element: Element.SPECTRO,
          property: TalentProperty.ECHO,
        },
        {
          name: 'Flurry DMG',
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
    sonata: [Sonata.THUNDER, Sonata.HEAL, Sonata.ATK],
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
    sonata: [Sonata.THUNDER, Sonata.HEAL, Sonata.REGEN],
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
    sonata: [Sonata.THUNDER, Sonata.FIRE],
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
    sonata: [Sonata.THUNDER, Sonata.FIRE, Sonata.WIND],
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
    name: 'Havoc Predator',
    icon: 'T_IconMonsterGoods_051_UI',
    skill: 'T_MstSkil_Z_Z8_UI',
    sonata: [Sonata.HAVOC, Sonata.LIGHT],
    desc: `Transform into Havoc Warrior to attack up to <span class="text-desc">3</span> times, dealing {{0}}% <b class="text-wuwa-havoc">Havoc DMG</b> each time.`,
    properties: [{ base: 123.43, growth: 16.1 }],
    bonus: (base, r) => {
      base.ECHO_SCALING.push({
        name: 'Counterattack DMG',
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
    sonata: [Sonata.FIRE, Sonata.HEAL, Sonata.ATK],
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
    sonata: [Sonata.LIGHT, Sonata.REGEN, Sonata.ATK],
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
    sonata: [Sonata.WIND, Sonata.HEAL, Sonata.REGEN],
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
    sonata: [Sonata.HAVOC, Sonata.HEAL, Sonata.ATK],
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
    sonata: [Sonata.LIGHT, Sonata.ICE],
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
    sonata: [Sonata.THUNDER, Sonata.WIND],
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
    sonata: [Sonata.LIGHT, Sonata.HEAL, Sonata.REGEN],
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
    sonata: [Sonata.ICE, Sonata.WIND, Sonata.REGEN],
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
    sonata: [Sonata.ICE, Sonata.LIGHT],
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
    sonata: [Sonata.ICE, Sonata.HAVOC],
    desc: `Transform into an Excarat and tunnel underground to advance. In this state, you have the ability to change your direction and are immune to damage.`,
    properties: [],
    cost: 1,
  },
  {
    id: '390070078',
    name: 'Baby Viridblaze Saurian',
    icon: 'T_IconMonsterGoods_281_UI',
    skill: 'T_MstSkil_285_UI',
    sonata: [Sonata.FIRE, Sonata.THUNDER, Sonata.ATK],
    desc: `Transform into Baby Viridblaze Saurian to rest in place, and slowly restore HP.`,
    properties: [],
    cost: 1,
  },
  {
    id: '390070079',
    name: 'Young Roseshroom',
    icon: 'T_IconMonsterGoods_301_UI',
    skill: 'T_MstSkil_305_UI',
    sonata: [Sonata.WIND, Sonata.HAVOC],
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
    sonata: [Sonata.FIRE, Sonata.HEAL],
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
    sonata: [Sonata.ICE, Sonata.LIGHT],
    desc: `Transform into Hoartoise and slowly restore HP. Use the Echo skill again to exit the transformation state.`,
    properties: [],
    cost: 1,
  },
  {
    id: '390077004',
    name: 'Violet-Feathered Heron',
    icon: 'T_IconMonsterGoods_121_UI',
    skill: 'T_MstSkil_Z_B2_UI',
    sonata: [Sonata.FIRE, Sonata.THUNDER],
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
    sonata: [Sonata.WIND, Sonata.LIGHT],
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
    sonata: [Sonata.ICE, Sonata.FIRE, Sonata.ATK],
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
    sonata: [Sonata.ICE, Sonata.HAVOC, Sonata.REGEN],
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
    sonata: [Sonata.THUNDER, Sonata.FIRE, Sonata.LIGHT],
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
    sonata: [Sonata.THUNDER, Sonata.HAVOC, Sonata.LIGHT],
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
    sonata: [Sonata.HEAL, Sonata.REGEN],
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
    sonata: [Sonata.THUNDER, Sonata.ATK],
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
    sonata: [Sonata.ICE, Sonata.HAVOC],
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
    sonata: [Sonata.LIGHT, Sonata.HEAL],
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
    sonata: [Sonata.ATK, Sonata.HEAL],
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
    sonata: [Sonata.FIRE, Sonata.REGEN],
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
    sonata: [Sonata.ICE, Sonata.HAVOC],
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
    sonata: [Sonata.FIRE, Sonata.HAVOC],
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
    sonata: [Sonata.REGEN, Sonata.ATK],
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
    sonata: [Sonata.THUNDER],
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
    id: '390080005',
    name: 'Bell-Borne Geochelone',
    icon: 'T_IconMonsterGoods_992_UI',
    skill: 'T_MstSkil_992_UI',
    sonata: [Sonata.THUNDER],
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
    sonata: [Sonata.FIRE],
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
]
