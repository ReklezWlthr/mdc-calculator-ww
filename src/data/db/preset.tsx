import { getEchoImage, getFoodImage } from '@src/core/utils/fetcher'
import { findEcho } from '@src/core/utils/finder'
import { Stats } from '@src/domain/constant'
import { SonataIcons } from '@src/presentation/genshin/components/artifact_block'
import classNames from 'classnames'
import { Sonata } from './artifacts'

export const ModifierPresets = [
  {
    name: 'Fallacy of No Return',
    order: 0,
    type: 'Echo',
    property: [{ stat: Stats.P_ATK, value: 10, flat: false }],
    icon: (
      <img
        src={getEchoImage(findEcho('6000061')?.icon)}
        className="w-10 h-10 rounded-full ring-2 ring-primary-lighter"
      />
    ),
  },
  {
    name: 'Impermanence Heron',
    order: 0,
    type: 'Echo',
    property: [{ stat: Stats.ALL_DMG, value: 12, flat: false }],
    icon: (
      <img
        src={getEchoImage(findEcho('6000052')?.icon)}
        className="w-10 h-10 rounded-full ring-2 ring-primary-lighter"
      />
    ),
  },
  {
    name: Sonata.REJUVENATING_GLOW,
    order: 1,
    type: 'Sonata',
    property: [{ stat: Stats.P_ATK, value: 15, flat: false }],
    icon: (
      <div className="flex items-center justify-center w-11 h-11">
        <img src={SonataIcons[Sonata.REJUVENATING_GLOW]} className="w-10 h-10" />
      </div>
    ),
  },
  {
    name: Sonata.MOONLIT_CLOUDS,
    order: 1,
    type: 'Sonata',
    property: [{ stat: Stats.P_ATK, value: 22.5, flat: false }],
    icon: (
      <div className="flex items-center justify-center w-11 h-11">
        <img src={SonataIcons[Sonata.MOONLIT_CLOUDS]} className="w-10 h-10" />
      </div>
    ),
  },
  {
    name: Sonata.EMPYREAN_ANTHEM,
    order: 1,
    type: 'Sonata',
    property: [{ stat: Stats.P_ATK, value: 20, flat: false }],
    icon: (
      <div className="flex items-center justify-center w-11 h-11">
        <img src={SonataIcons[Sonata.EMPYREAN_ANTHEM]} className="w-10 h-10" />
      </div>
    ),
  },
  {
    name: Sonata.MIDNIGHT_VEIL,
    order: 1,
    type: 'Sonata',
    property: [{ stat: Stats.HAVOC_DMG, value: 15, flat: false }],
    icon: (
      <div className="flex items-center justify-center w-11 h-11">
        <img src={SonataIcons[Sonata.MIDNIGHT_VEIL]} className="w-10 h-10" />
      </div>
    ),
  },
  {
    name: 'Jinzhou Skewers',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.ATK, value: 100, flat: true }],
    icon: (
      <img src={getFoodImage('T_IconCook_001_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Stuffed Flatbread',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.DEF, value: 200, flat: true }],
    icon: (
      <img src={getFoodImage('T_IconCook_002_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Perilla Salad',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.CRIT_RATE, value: 10, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_003_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Refreshment Tea',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.HP, value: 800, flat: true }],
    icon: (
      <img src={getFoodImage('T_IconCook_007_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Angelica Tea',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.P_HP, value: 25, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_009_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Shuyun Herbal Tea',
    order: 2,
    type: 'Dish',
    property: [
      { stat: Stats.P_ATK, value: 12, flat: false },
      { stat: Stats.CRIT_RATE, value: 10, flat: false },
    ],
    icon: (
      <img src={getFoodImage('T_IconCook_010_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Spicy Meat Slices',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.P_ATK, value: 25, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_012_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Loong Bun',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.P_DEF, value: 25, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_013_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Iron Shovel Edodes',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.CRIT_RATE, value: 16, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_014_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Jinzhou Stew',
    order: 2,
    type: 'Dish',
    property: [
      { stat: Stats.P_ATK, value: 8, flat: false },
      { stat: Stats.CRIT_RATE, value: 6, flat: false },
    ],
    icon: (
      <img src={getFoodImage('T_IconCook_015_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Candied Caltrops',
    order: 2,
    type: 'Dish',
    property: [
      { stat: Stats.P_DEF, value: 18, flat: false },
      { stat: Stats.P_HP, value: 15, flat: false },
    ],
    icon: (
      <img src={getFoodImage('T_IconCook_016_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Wuthercake',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.P_ATK, value: 30, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_017_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Kudzu Congee',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.CRIT_RATE, value: 22, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_021_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Star Flakes',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.P_DEF, value: 35, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_022_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Caltrop Soup',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.P_HP, value: 30, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_024_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Crispy Squab',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.P_DEF, value: 50, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_025_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Jinzhou Maocai',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.CRIT_RATE, value: 28, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_026_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Rising Loong',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.P_HP, value: 40, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_027_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Morri Pot',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.P_ATK, value: 40, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_030_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Failed Attempt',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.ATK, value: 50, flat: true }],
    icon: (
      <img src={getFoodImage('T_IconCook_035_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Happiness Tea',
    order: 2,
    type: 'Dish',
    property: [
      { stat: Stats.P_DEF, value: 12, flat: false },
      { stat: Stats.P_HP, value: 10, flat: false },
    ],
    icon: (
      <img src={getFoodImage('T_IconCook_034_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Lotus Pastry',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.CRIT_DMG, value: 32, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_038_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Spicy Meat with Pavo Plums',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.ER, value: 20, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_039_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Huanglong Omelette',
    order: 2,
    type: 'Dish',
    property: [
      { stat: Stats.P_ATK, value: 6, flat: false },
      { stat: Stats.ER, value: 10, flat: false },
    ],
    icon: (
      <img src={getFoodImage('T_IconCook_042_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Moon Pearl',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.HP, value: 1000, flat: true }],
    icon: (
      <img src={getFoodImage('T_IconCook_046_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: 'Moon Brew',
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.ER, value: 20, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_045_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Fisher's Chowder`,
    order: 2,
    type: 'Dish',
    property: [
      { stat: Stats.P_DEF, value: 10, flat: false },
      { stat: Stats.P_HP, value: 20, flat: false },
    ],
    icon: (
      <img src={getFoodImage('T_IconCook_047_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Honeysuckle Cake`,
    order: 2,
    type: 'Dish',
    property: [
      { stat: Stats.P_ATK, value: 8, flat: false },
      { stat: Stats.CRIT_DMG, value: 12, flat: false },
    ],
    icon: (
      <img src={getFoodImage('T_IconCook_049_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Pizza Classica`,
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.BASIC_DMG, value: 40, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_054_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Pizza Tropicale`,
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.HEAL, value: 25, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_055_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Steak Margherita`,
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.LIB_DMG, value: 40, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_061_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Laurus Salad`,
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.HEAL, value: 30, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_058_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Nectarwine`,
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.HEAL, value: 15, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_063_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Daily Panini`,
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.ER, value: 25, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_062_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Every Flavor Bell Crab`,
    order: 2,
    type: 'Dish',
    property: [
      { stat: Stats.P_ATK, value: 22, flat: false },
      { stat: Stats.CRIT_RATE, value: 12, flat: false },
    ],
    icon: (
      <img src={getFoodImage('T_IconCook_056_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Baton Bread`,
    order: 2,
    type: 'Dish',
    property: [
      { stat: Stats.HEAL, value: 5, flat: false },
      { stat: Stats.P_HP, value: 10, flat: false },
    ],
    icon: (
      <img src={getFoodImage('T_IconCook_057_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Troupe Strength`,
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.CRIT_DMG, value: 25, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_059_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Gold Star Pizza`,
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.SKILL_DMG, value: 50, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_068_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Every Flavor Bell-less Crab`,
    order: 2,
    type: 'Dish',
    property: [
      { stat: Stats.P_ATK, value: 22, flat: false },
      { stat: Stats.CRIT_DMG, value: 24, flat: false },
    ],
    icon: (
      <img src={getFoodImage('T_IconCook_071_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Wine-Brewed Octopus Clam`,
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.P_HP, value: 30, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_072_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Riccioli Salt Baked Fish`,
    order: 2,
    type: 'Dish',
    property: [{ stat: Stats.P_DEF, value: 35, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_073_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Liondance Companion`,
    order: 3,
    type: `Lingyang's Signature Dish`,
    property: [{ stat: Stats.ATK, value: 120, flat: true }],
    icon: (
      <img src={getFoodImage('T_IconCook_SP_14_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Sweet Stuffed Flatbread`,
    order: 3,
    type: `Zhezhi's Signature Dish`,
    property: [{ stat: Stats.DEF, value: 200, flat: true }],
    icon: (
      <img src={getFoodImage('T_IconCook_044_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Iced Perilla`,
    order: 3,
    type: `Baizhi's Signature Dish`,
    property: [{ stat: Stats.CRIT_RATE, value: 12, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_SP_01_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Ration Bar`,
    order: 3,
    type: `Calcharo's Signature Dish`,
    property: [{ stat: Stats.P_DEF, value: 36, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_SP_12_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Sanqing Tea`,
    order: 3,
    type: `Yuanwu's Signature Dish`,
    property: [{ stat: Stats.P_HP, value: 28, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_SP_13_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Yuezhou Spicy Meat Noodles`,
    order: 3,
    type: `Lumi's Signature Dish`,
    property: [{ stat: Stats.P_ATK, value: 28, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_053_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Crystal Clear Buns`,
    order: 3,
    type: `Sanhua's Signature Dish`,
    property: [{ stat: Stats.P_DEF, value: 28, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_SP_10_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Yesterday in Jinzhou`,
    order: 3,
    type: `Jiyan's Signature Dish`,
    property: [
      { stat: Stats.P_ATK, value: 10, flat: false },
      { stat: Stats.CRIT_RATE, value: 8, flat: false },
    ],
    icon: (
      <img src={getFoodImage('T_IconCook_SP_02_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Fluffy Wuthercake`,
    order: 3,
    type: `Yangyang's Signature Dish`,
    property: [{ stat: Stats.P_ATK, value: 33, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_SP_03_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Floral Porridge`,
    order: 3,
    type: `Taoqi's Signature Dish`,
    property: [{ stat: Stats.CRIT_RATE, value: 24, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_SP_09_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Baa Baa Crisp`,
    order: 3,
    type: `Encore's Signature Dish`,
    property: [{ stat: Stats.P_DEF, value: 40, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_SP_16_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Lotus Seed Soup`,
    order: 3,
    type: `Jianxin's Signature Dish`,
    property: [{ stat: Stats.P_HP, value: 33, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_SP_15_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Smoked Pigeon`,
    order: 3,
    type: `Mortefi's Signature Dish`,
    property: [{ stat: Stats.P_DEF, value: 55, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_SP_07_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Champion Hotpot`,
    order: 3,
    type: `Chixia's Signature Dish`,
    property: [{ stat: Stats.CRIT_RATE, value: 30, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_SP_04_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Green Field Pot`,
    order: 3,
    type: `Verina's Signature Dish`,
    property: [{ stat: Stats.P_ATK, value: 44, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_SP_06_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Misty Tea`,
    order: 3,
    type: `Aalto's Signature Dish`,
    property: [
      { stat: Stats.P_DEF, value: 14, flat: false },
      { stat: Stats.P_HP, value: 12, flat: false },
    ],
    icon: (
      <img src={getFoodImage('T_IconCook_SP_05_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Spring Pastry`,
    order: 3,
    type: `Jinhsi's Signature Dish`,
    property: [{ stat: Stats.CRIT_DMG, value: 36, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_040_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Blazing Feather Spicy Meat`,
    order: 3,
    type: `Changli's Signature Dish`,
    property: [{ stat: Stats.ER, value: 24, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_041_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Vege Omelette`,
    order: 3,
    type: `Xiangli Yao's Signature Dish`,
    property: [
      { stat: Stats.P_ATK, value: 8, flat: false },
      { stat: Stats.ER, value: 12, flat: false },
    ],
    icon: (
      <img src={getFoodImage('T_IconCook_043_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Creamy Clouds`,
    order: 3,
    type: `Shorekeeper's Signature Dish`,
    property: [
      { stat: Stats.P_DEF, value: 12, flat: false },
      { stat: Stats.P_HP, value: 22, flat: false },
    ],
    icon: (
      <img src={getFoodImage('T_IconCook_051_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Frostwork Cake`,
    order: 3,
    type: `Youhu's Signature Dish`,
    property: [
      { stat: Stats.P_ATK, value: 10, flat: false },
      { stat: Stats.CRIT_DMG, value: 16, flat: false },
    ],
    icon: (
      <img src={getFoodImage('T_IconCook_050_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `A Slice of Pizza`,
    order: 3,
    type: `Phoebe's Signature Dish`,
    property: [{ stat: Stats.BASIC_DMG, value: 44, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_070_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Purity Strength`,
    order: 3,
    type: `Brant's Signature Dish`,
    property: [{ stat: Stats.HEAVY_DMG, value: 28, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_069_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Homemade Panini`,
    order: 3,
    type: `Cantarella's Signature Dish`,
    property: [{ stat: Stats.ER, value: 28, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_074_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Fusion Petrol`,
    order: 4,
    type: `Medicine`,
    property: [{ stat: Stats.FUSION_DMG, value: 15, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_YJ_007_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Glacio Petrol`,
    order: 4,
    type: `Medicine`,
    property: [{ stat: Stats.GLACIO_DMG, value: 15, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_YJ_010_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Spectro Petrol`,
    order: 4,
    type: `Medicine`,
    property: [{ stat: Stats.SPECTRO_DMG, value: 15, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_YJ_008_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Havoc Petrol`,
    order: 4,
    type: `Medicine`,
    property: [{ stat: Stats.HAVOC_DMG, value: 15, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_YJ_009_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Electro Petrol`,
    order: 4,
    type: `Medicine`,
    property: [{ stat: Stats.ELECTRO_DMG, value: 15, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_YJ_011_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
  {
    name: `Aero Petrol`,
    order: 4,
    type: `Medicine`,
    property: [{ stat: Stats.AERO_DMG, value: 15, flat: false }],
    icon: (
      <img src={getFoodImage('T_IconCook_YJ_012_UI')} className="w-10 h-10 rounded-full ring-2 ring-primary-lighter" />
    ),
  },
]
