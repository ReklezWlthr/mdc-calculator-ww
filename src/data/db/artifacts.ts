import { calcRefinement } from '@src/core/utils/data_format'
import { Element, IArtifact, Stats, TalentProperty, WeaponType } from '@src/domain/constant'
import _ from 'lodash'

export enum Sonata {
  WIND = 'Sierra Gale',
  ATK = 'Lingering Tunes',
  THUNDER = 'Void Thunder',
  HEAL = 'Rejuvenating Glow',
}

export const Echoes: IArtifact[] = [
  {
    id: '6000038',
    name: 'Hooscamp',
    icon: '988',
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
    sonata: [Sonata.THUNDER],
    desc: `Transform into Tempest Mephis to perform tail swing attacks followed by a claw attack. The lightning strike summoned by the tail swing deals {{0}}% <b class="text-wuwa-electro">Electro DMG</b> each time, while the claw attack deals {{1}}% <b class="text-wuwa-electro">Electro DMG</b>.
    <br />
    <br />After the claw hit, increase the current character's <b class="text-wuwa-electro">Electro DMG</b> by {{2}}% and Heavy Attack DMG by {{2}}% for <span class="text-desc">15</span>s.`,
    properties: [
      { base: 34.5, growth: 4.5 },
      { base: 69, growth: 9 },
    ],
    cost: 4,
  },
  {
    id: '6000040',
    name: 'Hoochief',
    icon: '989',
    sonata: [Sonata.WIND],
    desc: `Transform into Hoochief and smack the enemies, dealing {{0}}% Aero DMG.`,
    properties: [{ base: 178.8, growth: 29.8 }],
    cost: 3,
  },
]
