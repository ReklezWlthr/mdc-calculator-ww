import { calcRefinement } from '@src/core/utils/data_format'
import { checkBuffExist, findCharacter, findContentById } from '@src/core/utils/finder'
import { IWeaponContent } from '@src/domain/conditional'
import { Element, Stats } from '@src/domain/constant'
import _ from 'lodash'
import { StatsObject } from '../../baseConstant'
import { toPercentage } from '@src/core/utils/converter'

export const WeaponConditionals: IWeaponContent[] = [
  {
    type: 'toggle',
    text: `Intro ATK Bonus`,
    show: true,
    default: true,
    id: '21010013',
    scaling: (base, form, r) => {
      if (form['21010013']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.08, 0.02, r),
          name: 'Passive',
          source: `Broadblade of Night`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Intro ATK Bonus`,
    show: true,
    default: true,
    id: '21020013',
    scaling: (base, form, r) => {
      if (form['21020013']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.08, 0.02, r),
          name: 'Passive',
          source: `Sword of Night`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Intro ATK Bonus`,
    show: true,
    default: true,
    id: '21030013',
    scaling: (base, form, r) => {
      if (form['21030013']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.08, 0.02, r),
          name: 'Passive',
          source: `Pistols of Night`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Intro ATK Bonus`,
    show: true,
    default: true,
    id: '21040013',
    scaling: (base, form, r) => {
      if (form['21040013']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.08, 0.02, r),
          name: 'Passive',
          source: `Gauntlets of Night`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Intro ATK Bonus`,
    show: true,
    default: true,
    id: '21050013',
    scaling: (base, form, r) => {
      if (form['21050013']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.08, 0.02, r),
          name: 'Passive',
          source: `Rectifier of Night`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Current HP > 80%`,
    show: true,
    default: true,
    id: '21010034',
    scaling: (base, form, r) => {
      if (form['21010034']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.12, 0.03, r),
          name: 'Passive',
          source: `Broadblade#41`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `ATK & DEF Bonus`,
    show: true,
    default: false,
    id: '21010044',
    scaling: (base, form, r) => {
      if (form['21010044']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.08, 0.02, r),
          name: 'Passive',
          source: `Dauntless Evernight`,
        })
        base[Stats.P_DEF].push({
          value: calcRefinement(0.15, 0.0375, r),
          name: 'Passive',
          source: `Dauntless Evernight`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Helios Cleaver Stacks`,
    show: true,
    default: 1,
    min: 0,
    max: 4,
    id: '21010064',
    scaling: (base, form, r) => {
      if (form['21010064']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.03, 0.0075, r) * form['21010064'],
          name: 'Passive',
          source: `Helios Cleaver`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Autumntrace Stacks`,
    show: true,
    default: 1,
    min: 0,
    max: 5,
    id: '21010074',
    scaling: (base, form, r) => {
      if (form['21010074']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.04, 0.022, r) * form['21010074'],
          name: 'Passive',
          source: `Autumntrace`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Skill ATK Bonus`,
    show: true,
    default: true,
    id: '21010084',
    scaling: (base, form, r) => {
      if (form['21010084']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.1, 0.025, r),
          name: 'Passive',
          source: `Waning Redshift`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Searing Feather Stacks`,
    show: true,
    default: 5,
    min: 0,
    max: 14,
    id: '21020016',
    scaling: (base, form, r) => {
      if (form['21020016']) {
        base[Stats.SKILL_DMG].push({
          value: calcRefinement(0.04, 0.01, r) * form['21020016'],
          name: 'Searing Feather',
          source: `Blazing Brilliance`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Hiss Stacks`,
    show: true,
    default: 1,
    min: 0,
    max: 10,
    id: '21020017',
    scaling: (base, form, r) => {
      if (form['21020017']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.02, 0.005, r) * form['21020017'],
          name: 'Hiss',
          source: `Somnoire Anchor`,
        })
      }
      if (form['21020017'] === 10) {
        base[Stats.CRIT_RATE].push({
          value: calcRefinement(0.06, 0.015, r),
          name: 'Hiss - Full',
          source: `Somnoire Anchor`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Red Spring Stacks`,
    show: true,
    default: 1,
    min: 0,
    max: 3,
    id: '21020026_1',
    scaling: (base, form, r) => {
      if (form['21020026_1']) {
        base[Stats.BASIC_DMG].push({
          value: calcRefinement(0.1, 0.025, r) * form['21020026_1'],
          name: 'Passive',
          source: `Red Spring`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Consume Concerto Bonus`,
    show: true,
    default: false,
    id: '21020026_2',
    scaling: (base, form, r) => {
      if (form['21020026_2']) {
        base[Stats.BASIC_DMG].push({
          value: calcRefinement(0.4, 0.1, r),
          name: 'Passive',
          source: `Red Spring`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Low-HP Heavy ATK Bonus`,
    show: true,
    default: false,
    id: '21020034',
    scaling: (base, form, r) => {
      if (form['21020034']) {
        base[Stats.HEAVY_DMG].push({
          value: calcRefinement(0.18, 0.045, r),
          name: 'Passive',
          source: `Sword#18`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Intro ATK Bonus`,
    show: true,
    default: false,
    id: '21020044',
    scaling: (base, form, r) => {
      if (form['21020044']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.15, 0.0375, r),
          name: 'Passive',
          source: `Commando of Conviction`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Oath Stacks`,
    show: true,
    default: 6,
    min: 0,
    max: 6,
    id: '21020064',
    scaling: (base, form, r) => {
      if (form['21020064']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.02, 0.005, r) * form['21020064'],
          name: 'Oath',
          source: `Lunar Cutter`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Oath Stacks`,
    show: true,
    default: true,
    id: '21020074',
    scaling: (base, form, r) => {
      if (form['21020074']) {
        base[Stats.BASIC_DMG].push({
          value: calcRefinement(0.2, 0.11, r),
          name: 'Passive',
          source: `Lumingloss`,
        })
        base[Stats.HEAVY_DMG].push({
          value: calcRefinement(0.2, 0.11, r),
          name: 'Passive',
          source: `Lumingloss`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Skill ATK Bonus`,
    show: true,
    default: true,
    id: '21020084',
    scaling: (base, form, r) => {
      if (form['21020084']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.1, 0.025, r),
          name: 'Passive',
          source: `Endless Collapse`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Skill ATK Bonus`,
    show: true,
    default: true,
    id: '21030084',
    scaling: (base, form, r) => {
      if (form['21030084']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.1, 0.025, r),
          name: 'Passive',
          source: `Relativistic Jet`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Skill ATK Bonus`,
    show: true,
    default: true,
    id: '21040084',
    scaling: (base, form, r) => {
      if (form['21040084']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.1, 0.025, r),
          name: 'Passive',
          source: `Celestial Spiral`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Skill ATK Bonus`,
    show: true,
    default: true,
    id: '21050084',
    scaling: (base, form, r) => {
      if (form['21050084']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.1, 0.025, r),
          name: 'Passive',
          source: `Fusion Accretion`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Pistols#26 ATK Stacks`,
    show: true,
    default: 2,
    min: 0,
    max: 2,
    id: '21030034',
    scaling: (base, form, r) => {
      if (form['21030034']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.06, 0.015, r) * form['21030034'],
          name: 'Passive',
          source: `Pistols#26`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Intro Skill Bonus`,
    show: true,
    default: true,
    id: '21030044',
    scaling: (base, form, r) => {
      if (form['21030044']) {
        base[Stats.SKILL_DMG].push({
          value: calcRefinement(0.2, 0.05, r),
          name: 'Passive',
          source: `Undying Flame`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `ATK Bonus Stacks`,
    show: true,
    default: 1,
    min: 0,
    max: 3,
    id: '21030064',
    scaling: (base, form, r) => {
      if (form['21030064']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.04, 0.01, r) * form['21030064'],
          name: 'Passive',
          source: `Novaburst`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Skill DMG Stacks`,
    show: true,
    default: 1,
    min: 0,
    max: 3,
    id: '21030074',
    scaling: (base, form, r) => {
      if (form['21030074']) {
        base[Stats.SKILL_DMG].push({
          value: calcRefinement(0.07, 0.04, r) * form['21030074'],
          name: 'Passive',
          source: `Thunderbolt`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Ageless Marking`,
    show: true,
    default: true,
    id: '21010026_1',
    scaling: (base, form, r) => {
      if (form['21010026_1']) {
        base[Stats.SKILL_DMG].push({
          value: calcRefinement(0.24, 0.06, r),
          name: 'Ageless Marking',
          source: `Ages of Harvest`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Ethereal Endowment`,
    show: true,
    default: true,
    id: '21010026_2',
    scaling: (base, form, r) => {
      if (form['21010026_2']) {
        base[Stats.SKILL_DMG].push({
          value: calcRefinement(0.24, 0.06, r),
          name: 'Ethereal Endowment',
          source: `Ages of Harvest`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Heavy ATK DMG Stacks`,
    show: true,
    default: 1,
    min: 0,
    max: 2,
    id: '21010016',
    scaling: (base, form, r) => {
      if (form['21010016']) {
        base[Stats.HEAVY_DMG].push({
          value: calcRefinement(0.24, 0.06, r) * form['21010016'],
          name: 'Passive',
          source: `Verdant Summit`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Liberation DMG Stacks`,
    show: true,
    default: 1,
    min: 0,
    max: 3,
    id: '21010015',
    scaling: (base, form, r) => {
      if (form['21010015']) {
        base[Stats.LIB_DMG].push({
          value: calcRefinement(0.07, 0.0175, r) * form['21010015'],
          name: 'Passive',
          source: `Lustrous Razor`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `ATK Bonus Stacks`,
    show: true,
    default: 1,
    min: 0,
    max: 2,
    id: '21020015',
    scaling: (base, form, r) => {
      if (form['21020015']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.06, 0.015, r) * form['21020015'],
          name: 'Passive',
          source: `Emerald of Genesis`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Skill to Basic ATK Bonus`,
    show: true,
    default: true,
    id: '21040015_1',
    scaling: (base, form, r) => {
      if (form['21040015_1']) {
        base[Stats.BASIC_DMG].push({
          value: calcRefinement(0.1, 0.025, r),
          name: 'Passive',
          source: `Abyss Surges`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Basic ATK to Skill Bonus`,
    show: true,
    default: true,
    id: '21040015_2',
    scaling: (base, form, r) => {
      if (form['21040015_2']) {
        base[Stats.SKILL_DMG].push({
          value: calcRefinement(0.1, 0.025, r),
          name: 'Passive',
          source: `Abyss Surges`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Liberation DMG Bonus`,
    show: true,
    default: true,
    id: '21040016',
    scaling: (base, form, r) => {
      if (form['21040016']) {
        base[Stats.SKILL_DMG].push({
          value: calcRefinement(0.48, 0.12, r),
          name: 'Passive',
          source: `Verity's Handle`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Dodge DMG Bonus`,
    show: true,
    default: true,
    id: '21040034',
    scaling: (base, form, r) => {
      if (form['21040034']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.08, 0.02, r),
          name: 'Passive',
          source: `Gauntlets#21`,
        })
        base[Stats.DODGE_DMG].push({
          value: calcRefinement(0.5, 0.125, r),
          name: 'Passive',
          source: `Gauntlets#21`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Liberation DMG Bonus`,
    show: true,
    default: true,
    id: '21040044',
    scaling: (base, form, r) => {
      if (form['21040044']) {
        base[Stats.LIB_DMG].push({
          value: calcRefinement(0.2, 0.05, r),
          name: 'Passive',
          source: `Amity Accord`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Iron Armor Stacks`,
    show: true,
    default: 3,
    min: 0,
    max: 3,
    id: '21040064',
    scaling: (base, form, r) => {
      if (form['21040064']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.03, 0.005, r) * form['21040064'],
          name: 'Passive',
          source: `Hollow Mirage`,
        })
        base[Stats.P_DEF].push({
          value: calcRefinement(0.03, 0.005, r) * form['21040064'],
          name: 'Passive',
          source: `Hollow Mirage`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Liberation DMG Bonus`,
    show: true,
    default: true,
    id: '21040074',
    scaling: (base, form, r) => {
      if (form['21040074']) {
        base[Stats.LIB_DMG].push({
          value: calcRefinement(0.18, 0.09, r),
          name: 'Passive',
          source: `Stonard`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Cosmic Ripples Stacks`,
    show: true,
    default: 1,
    min: 0,
    max: 5,
    id: '21050015',
    scaling: (base, form, r) => {
      if (form['21050015']) {
        base[Stats.BASIC_DMG].push({
          value: calcRefinement(0.032, 0.008, r) * form['21050015'],
          name: 'Passive',
          source: `Cosmic Ripples`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Stringmaster ATK Stacks`,
    show: true,
    default: 1,
    min: 0,
    max: 2,
    id: '21050016_1',
    scaling: (base, form, r) => {
      if (form['21050016_1']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.12, 0.03, r) * form['21050016_1'],
          name: 'Passive',
          source: `Stringmaster`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Off-Field ATK Stacks`,
    show: true,
    default: false,
    id: '21050016_2',
    scaling: (base, form, r) => {
      if (form['21050016_2']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.12, 0.03, r),
          name: 'Passive',
          source: `Stringmaster`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Basic ATK DMG Stacks`,
    show: true,
    default: 1,
    min: 0,
    max: 3,
    id: '21050026_1',
    scaling: (base, form, r) => {
      if (form['21050026_1']) {
        base[Stats.BASIC_DMG].push({
          value: calcRefinement(0.12, 0.03, r) * form['21050026_1'],
          name: 'Passive',
          source: `Rime-Draped Sprouts`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Outro Basic ATK DMG Bonus`,
    show: true,
    default: false,
    id: '21050026_2',
    scaling: (base, form, r) => {
      if (form['21050026_2'] && form['21050026_1'] === 3) {
        base[Stats.BASIC_DMG].push({
          value: calcRefinement(0.52, 0.13, r),
          name: 'Passive',
          source: `Rime-Draped Sprouts`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Current HP > 60%`,
    show: true,
    default: true,
    id: '21050034',
    scaling: (base, form, r) => {
      if (form['21050034']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.12, 0.03, r),
          name: 'Passive',
          source: `Rectifier#25`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Intro ATK & HP Bonus`,
    show: true,
    default: true,
    id: '21050044',
    scaling: (base, form, r) => {
      if (form['21050044']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.08, 0.02, r),
          name: 'Passive',
          source: `Jinzhou Keeper`,
        })
        base[Stats.P_HP].push({
          value: calcRefinement(0.1, 0.025, r),
          name: 'Passive',
          source: `Jinzhou Keeper`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Healing Bonus Stacks`,
    show: true,
    default: 1,
    min: 0,
    max: 3,
    id: '21050064',
    scaling: (base, form, r) => {
      if (form['21050064']) {
        base[Stats.HEAL].push({
          value: calcRefinement(0.03, 0.005, r) * form['21050064'],
          name: 'Passive',
          source: `Comet Flare`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Liberation ATK Bonus`,
    show: true,
    default: true,
    id: '21050074',
    scaling: (base, form, r) => {
      if (form['21050074']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.15, 0.0825, r),
          name: 'Passive',
          source: `Augment`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Liberation Healing Bonus`,
    show: true,
    default: true,
    id: '21050017',
    scaling: (base, form, r) => {
      if (form['21050017']) {
        base[Stats.HEAL].push({
          value: calcRefinement(0.16, 0.04, r),
          name: 'Passive',
          source: `Echoes of the Deep`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Liberation Healing Bonus`,
    show: true,
    default: true,
    id: '21050017',
    scaling: (base, form, r) => {
      if (form['21050017']) {
        base[Stats.HEAL].push({
          value: calcRefinement(0.16, 0.04, r),
          name: 'Passive',
          source: `Echoes of the Deep`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Resonance Skill Bonus`,
    show: true,
    default: true,
    id: '21030016',
    scaling: (base, form, r) => {
      if (form['21030016']) {
        base[Stats.SKILL_DMG].push({
          value: calcRefinement(0.48, 0.12, r),
          name: 'Passive',
          source: `The Last Dance`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Resonance Skill Bonus`,
    show: true,
    default: true,
    id: '21040026',
    scaling: (base, form, r) => {
      if (form['21040026']) {
        base[Stats.HEAVY_DMG].push({
          value: calcRefinement(0.48, 0.12, r),
          name: 'Passive',
          source: `Tragicomedy`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Negative Effect ATK Bonus`,
    show: true,
    default: 1,
    min: 1,
    max: 4,
    id: '21010094',
    scaling: (base, form, r) => {
      if (form['21010094']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.04, 0.01, r) * form['21010094'],
          name: 'Passive',
          source: `Meditations on Mercy`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Negative Effect ATK Bonus`,
    show: true,
    default: 1,
    min: 1,
    max: 4,
    id: '21020094',
    scaling: (base, form, r) => {
      if (form['21020094']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.04, 0.01, r) * form['21020094'],
          name: 'Passive',
          source: `Fables of Wisdom`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Negative Effect ATK Bonus`,
    show: true,
    default: 1,
    min: 1,
    max: 4,
    id: '21030094',
    scaling: (base, form, r) => {
      if (form['21030094']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.04, 0.01, r) * form['21030094'],
          name: 'Passive',
          source: `Romance in Farewell`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Negative Effect ATK Bonus`,
    show: true,
    default: 1,
    min: 1,
    max: 4,
    id: '21040094',
    scaling: (base, form, r) => {
      if (form['21040094']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.04, 0.01, r) * form['21040094'],
          name: 'Passive',
          source: `Legend of Drunken Hero`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Negative Effect ATK Bonus`,
    show: true,
    default: 1,
    min: 1,
    max: 4,
    id: '21050094',
    scaling: (base, form, r) => {
      if (form['21050094']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.04, 0.01, r) * form['21050094'],
          name: 'Passive',
          source: `Waltz in Masquerade`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Basic ATK Bonus Stacks`,
    show: true,
    default: 1,
    min: 0,
    max: 2,
    id: '21020036',
    scaling: (base, form, r) => {
      if (form['21020036']) {
        base[Stats.BASIC_DMG].push({
          value: calcRefinement(0.24, 0.06, r) * form['21020036'],
          name: 'Passive',
          source: `Unflickering Valor`,
        })
      }
      return base
    },
  },
  {
    type: 'number',
    text: `Basic & Heavy ATK Bonus`,
    show: true,
    default: 1,
    min: 0,
    max: 3,
    id: '21050046',
    scaling: (base, form, r) => {
      if (form['21050046']) {
        base[Stats.BASIC_DMG].push({
          value: calcRefinement(0.14, 0.035, r) * form['21050046'],
          name: 'Passive',
          source: `Luminous Hymn`,
        })
        base[Stats.HEAVY_DMG].push({
          value: calcRefinement(0.14, 0.035, r) * form['21050046'],
          name: 'Passive',
          source: `Luminous Hymn`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Outro Spectro Frazzle DMG Amp.`,
    show: true,
    default: true,
    id: '21050046_1',
    scaling: (base, form, r) => {
      if (form['21050046_1']) {
        base.FRAZZLE_AMP.push({
          value: calcRefinement(0.5, 0.125, r),
          name: 'Passive',
          source: `Luminous Hymn`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Basic ATK DMG Bonus (1 Stack)`,
    show: true,
    default: true,
    id: '21050056_1',
    scaling: (base, form, r) => {
      if (form['21050056_1']) {
        base[Stats.BASIC_DMG].push({
          value: calcRefinement(0.4, 0.1, r),
          name: 'Gentle Dreams',
          source: `Whispers of Sirens`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Havoc RES PEN (2 Stacks)`,
    show: true,
    default: true,
    id: '21050056_2',
    scaling: (base, form, r) => {
      if (form['21050056_2']) {
        base.HAVOC_RES_PEN.push({
          value: calcRefinement(0.12, 0.03, r),
          name: 'Gentle Dreams',
          source: `Whispers of Sirens`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `On-Heal Skill DMG Bonus`,
    show: true,
    default: true,
    id: '21020046',
    scaling: (base, form, r) => {
      if (form['21020046']) {
        base[Stats.SKILL_DMG].push({
          value: calcRefinement(0.1, 0.04, r),
          name: 'Passive',
          source: `Bloodpact's Pledge`,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Aero Rover: Aero DMG AMP`,
    show: true,
    default: true,
    id: '21020046_1',
    scaling: (base, form, r) => {
      if (form[`21020046_1`]) {
        base.AERO_AMP.push({
          value: calcRefinement(0.1, 0.04, r),
          name: 'Passive',
          source: `Bloodpact's Pledge`,
        })
      }
      return base
    },
  },
]

export const WeaponAllyConditionals: IWeaponContent[] = [
  {
    type: 'toggle',
    text: `Outro ATK Bonus`,
    show: true,
    default: false,
    id: '21030015',
    scaling: (base, form, r, { own, owner }) => {
      if (form[`21030015_${owner}`]) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.1, 0.025, r),
          name: 'Static Mist',
          source: own.NAME,
        })
      }
      return base
    },
  },
  {
    type: 'toggle',
    text: `Aero DMG AMP`,
    show: true,
    default: true,
    id: '21020046_1',
    scaling: (base, form, r, { own, owner }) => {
      if (form[`21020046_1_${owner}`]) {
        base.AERO_AMP.push({
          value: calcRefinement(0.1, 0.04, r),
          name: 'Passive',
          source: `Bloodpact's Pledge`,
        })
      }
      return base
    },
  },
]

export const WeaponTeamConditionals: IWeaponContent[] = [
  {
    type: 'toggle',
    text: `Healing Skill ATK Bonus`,
    show: true,
    default: true,
    id: '21050036',
    scaling: (base, form, r) => {
      if (form['21050036']) {
        base[Stats.P_ATK].push({
          value: calcRefinement(0.14, 0.035, r),
          name: 'Passive',
          source: `Stellar Symphony`,
        })
      }
      return base
    },
  },
]
