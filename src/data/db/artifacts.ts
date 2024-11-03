import { IArtifact, Stats, WeaponType } from '@src/domain/constant'
import _ from 'lodash'

export const ArtifactSets: IArtifact[] = [
  {
    id: '1212345779',
    name: "Gladiator's Finale",
    icon: 'UI_RelicIcon_15001',
    rarity: [4, 5],
    bonus: [{ stat: Stats.P_ATK, value: 0.18 }],
    add: (base, weapon) => {
      if (_.includes([WeaponType.CLAYMORE, WeaponType.SWORD, WeaponType.POLEARM], weapon))
        base.BASIC_DMG.push({ value: 0.35, name: '4-Piece', source: `Gladiator's Finale` })
      return base
    },
    desc: [
      `ATK <span class="text-desc">+18%</span>.`,
      `If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by <span class="text-desc">35%</span>.`,
    ],
    set: [
      `Gladiator's Intoxication`,
      `Gladiator's Destiny`,
      `Gladiator's Triumphus`,
      `Gladiator's Nostalgia`,
      `Gladiator's Longing`,
    ],
  },
  {
    id: '147298547',
    name: "Wanderer's Troupe",
    icon: 'UI_RelicIcon_15003',
    rarity: [4, 5],
    bonus: [{ stat: Stats.EM, value: 80 }],
    add: (base, weapon) => {
      if (_.includes([WeaponType.CATALYST, WeaponType.BOW], weapon))
        base.CHARGE_DMG.push({ value: 0.35, name: '4-Piece', source: `Wanderer's Troupe` })
      return base
    },
    desc: [
      `Increases Elemental Mastery by <span class="text-desc">80</span>.`,
      `Increases Charged Attack DMG by <span class="text-desc">35%</span> if the character uses a Catalyst or Bow.`,
    ],
    set: [
      `Wanderer's String-Kettle`,
      `Bard's Arrow Feather`,
      `Conductor's Top Hat`,
      `Troupe's Dawnlight`,
      `Concert's Final Hour`,
    ],
  },
  {
    id: '1751039235',
    name: 'Noblesse Oblige',
    icon: 'UI_RelicIcon_15007',
    rarity: [4, 5],
    bonus: [],
    half: (base) => {
      base.BURST_DMG.push({ value: 0.6, name: '2-Piece', source: `Noblesse Oblige` })
      return base
    },
    desc: [
      `Elemental Burst DMG <span class="text-desc">+20%</span>`,
      `Using an Elemental Burst increases all party members' ATK by <span class="text-desc">20%</span> for <span class="text-desc">12</span>s. This effect cannot stack.`,
    ],
    set: [`Royal Silver Urn`, `Royal Plume`, `Royal Masque`, `Royal Flora`, `Royal Pocket Watch`],
  },
  {
    id: '1541919827',
    name: 'Bloodstained Chivalry',
    icon: 'UI_RelicIcon_15008',
    rarity: [4, 5],
    bonus: [{ stat: Stats.PHYSICAL_DMG, value: 0.25 }],
    desc: [
      `<b>Physical DMG Bonus</b> <span class="text-desc">+25%</span>`,
      `After defeating an opponent, increases Charged Attack DMG by <span class="text-desc">50%</span>, and reduces its Stamina cost to <span class="text-desc">0</span> for <span class="text-desc">10</span>s. Also triggers with wild animals such as boars, squirrels and frogs.`,
    ],
    set: [
      `Bloodstained Chevalier's Goblet`,
      `Bloodstained Black Plume`,
      `Bloodstained Iron Mask`,
      `Bloodstained Flower of Iron`,
      `Bloodstained Final Hour`,
    ],
  },
  {
    id: '83115355',
    name: 'Maiden Beloved',
    icon: 'UI_RelicIcon_14004',
    rarity: [4, 5],
    bonus: [{ stat: Stats.HEAL, value: 0.15 }],
    desc: [
      `Character Healing Effectiveness <span class="text-desc">+15%</span>`,
      `Using an Elemental Skill or Burst increases healing received by all party members by <span class="text-desc">20%</span> for <span class="text-desc">10</span>s.`,
    ],
    set: [
      `Maiden's Fleeting Leisure`,
      `Maiden's Heart-Stricken Infatuation`,
      `Maiden's Fading Beauty`,
      `Maiden's Distant Love`,
      `Maiden's Passing Youth`,
    ],
  },
  {
    id: '1562601179',
    name: 'Viridescent Venerer',
    icon: 'UI_RelicIcon_15002',
    rarity: [4, 5],
    bonus: [{ stat: Stats.ANEMO_DMG, value: 0.15 }],
    add: (base) => {
      base.SWIRL_DMG.push({ value: 0.6, name: '4-Piece', source: `Viridescent Venerer` })
      return base
    },
    desc: [
      `<b class="text-genshin-anemo">Anemo DMG Bonus</b> <span class="text-desc">+15%</span>`,
      `Increases Swirl DMG by <span class="text-desc">60%</span>. Decreases opponent's Elemental RES to the element infused in the Swirl by <span class="text-desc">40%</span> for <span class="text-desc">10</span>s.`,
    ],
    set: [
      `Viridescent Venerer's Vessel`,
      `Viridescent Arrow Feather`,
      `Viridescent Venerer's Diadem`,
      `In Remembrance of Viridescent Fields`,
      `Viridescent Venerer's Determination`,
    ],
  },
  {
    id: '2040573235',
    name: 'Archaic Petra',
    icon: 'UI_RelicIcon_15014',
    rarity: [4, 5],
    bonus: [{ stat: Stats.GEO_DMG, value: 0.15 }],
    desc: [
      `<b class="text-genshin-geo">Geo DMG Bonus</b> <span class="text-desc">+15%</span>`,
      `Upon obtaining an Elemental Shard created through a Crystallize Reaction, all party members gain <span class="text-desc">35%</span> <b>DMG Bonus</b> for that particular element for <span class="text-desc">10</span>s. Only one form of <b>Elemental DMG Bonus</b> can be gained in this manner at any one time.`,
    ],
    set: [
      `Goblet of Chiseled Crag`,
      `Feather of Jagged Peaks`,
      `Mask of Solitude Basalt`,
      `Flower of Creviced Cliff`,
      `Sundial of Enduring Jade`,
    ],
  },
  {
    id: '1438974835',
    name: 'Retracing Bolide',
    icon: 'UI_RelicIcon_15015',
    rarity: [4, 5],
    bonus: [{ stat: Stats.SHIELD, value: 0.35 }],
    desc: [
      `Increases Shield Strength by <span class="text-desc">35%</span>.`,
      `While protected by a shield, gain an additional <span class="text-desc">40%</span> Normal and Charged Attack DMG.`,
    ],
    set: [
      `Summer Night's Waterballoon`,
      `Summer Night's Finale`,
      `Summer Night's Mask`,
      `Summer Night's Bloom`,
      `Summer Night's Moment`,
    ],
  },
  {
    id: '1873342283',
    name: 'Thundersoother',
    icon: 'UI_RelicIcon_14002',
    rarity: [4, 5],
    bonus: [],
    half: (base) => {
      base.ELECTRO_RES.push({ value: 0.4, name: '2-Piece', source: 'Thundersoother' })
      return base
    },
    desc: [
      `<b class="text-genshin-electro">Electro RES</b> increased by <span class="text-desc">40%</span>.`,
      `Increases DMG against opponents affected by <b class="text-genshin-electro">Electro</b> by <span class="text-desc">35%</span>.`,
    ],
    set: [
      `Thundersoother's Goblet`,
      `Thundersoother's Plume`,
      `Thundersoother's Diadem`,
      `Thundersoother's Heart`,
      `Hour of Soothing Thunder`,
    ],
  },
  {
    id: '2512309395',
    name: 'Thundering Fury',
    icon: 'UI_RelicIcon_15005',
    rarity: [4, 5],
    bonus: [{ stat: Stats.ELECTRO_DMG, value: 0.15 }],
    add: (base) => {
      base.OVERLOAD_DMG.push({ value: 0.4, name: '4-Piece', source: `Thundering Fury` })
      base.TASER_DMG.push({ value: 0.4, name: '4-Piece', source: `Thundering Fury` })
      base.SUPERCONDUCT_DMG.push({ value: 0.4, name: '4-Piece', source: `Thundering Fury` })
      base.HYPERBLOOM_DMG.push({ value: 0.4, name: '4-Piece', source: `Thundering Fury` })
      base.AGGRAVATE_DMG.push({ value: 0.2, name: '4-Piece', source: `Thundering Fury` })
      return base
    },
    desc: [
      `<b class="text-genshin-electro">Electro DMG Bonus</b> <span class="text-desc">+15%</span>`,
      `Increases DMG caused by Overloaded, Electro-Charged, Superconduct, and Hyperbloom by <span class="text-desc">40%</span>, and the DMG Bonus conferred by Aggravate is increased by <span class="text-desc">20%</span>. When Quicken or the aforementioned Elemental Reactions are triggered, Elemental Skill CD is decreased by <span class="text-desc">1</span>s. Can only occur once every <span class="text-desc">0.8</span>s.`,
    ],
    set: [
      `Omen of Thunderstorm`,
      `Survivor of Catastrophe`,
      `Thunder Summoner's Crown`,
      `Thunderbird's Mercy`,
      `Hourglass of Thunder`,
    ],
  },
  {
    id: '1632377563',
    name: 'Lavawalker',
    icon: 'UI_RelicIcon_14003',
    rarity: [4, 5],
    bonus: [],
    half: (base) => {
      base.PYRO_RES.push({ value: 0.4, name: '2-Piece', source: 'Thundersoother' })
      return base
    },
    desc: [
      `<b class="text-genshin-pyro">Pyro RES</b> increased by <span class="text-desc">40%</span>.`,
      `Increases DMG against opponents affected by <b class="text-genshin-pyro">Pyro</b> by <span class="text-desc">35%</span>.`,
    ],
    set: [
      `Lavawalker's Epiphany`,
      `Lavawalker's Salvation`,
      `Lavawalker's Wisdom`,
      `Lavawalker's Resolution`,
      `Lavawalker's Torment`,
    ],
  },
  {
    id: '1524173875',
    name: 'Crimson Witch of Flames',
    icon: 'UI_RelicIcon_15006',
    rarity: [4, 5],
    bonus: [{ stat: Stats.PYRO_DMG, value: 0.15 }],
    add: (base) => {
      base.OVERLOAD_DMG.push({ value: 0.4, name: '4-Piece', source: `Crimson Witch of Flames` })
      base.BURNING_DMG.push({ value: 0.4, name: '4-Piece', source: `Crimson Witch of Flames` })
      base.BURGEON_DMG.push({ value: 0.4, name: '4-Piece', source: `Crimson Witch of Flames` })
      base.VAPE_DMG.push({ value: 0.15, name: '4-Piece', source: `Crimson Witch of Flames` })
      base.MELT_DMG.push({ value: 0.15, name: '4-Piece', source: `Crimson Witch of Flames` })
      return base
    },
    desc: [
      `<b class="text-genshin-pyro">Pyro DMG Bonus</b> <span class="text-desc">+15%</span>`,
      `Increases Overloaded and Burning, and Burgeon DMG by <span class="text-desc">40%</span>. Increases Vaporize and Melt DMG by <span class="text-desc">15%</span>. Using Elemental Skill increases the 2-Piece Set Bonus by <span class="text-desc">50%</span> of its starting value for <span class="text-desc">10</span>s. Max <span class="text-desc">3</span> stacks.`,
    ],
    set: [
      `Witch's Heart Flames`,
      `Witch's Ever-Burning Plume`,
      `Witch's Scorching Hat`,
      `Witch's Flower of Blaze`,
      `Witch's End Time`,
    ],
  },
  {
    id: '933076627',
    name: 'Blizzard Strayer',
    icon: 'UI_RelicIcon_14001',
    rarity: [4, 5],
    bonus: [{ stat: Stats.CRYO_DMG, value: 0.15 }],
    desc: [
      `<b class="text-genshin-cryo">Cryo DMG Bonus</b> <span class="text-desc">+15%</span>`,
      `When a character attacks an opponent affected by <b class="text-genshin-cryo">Cryo</b>, their CRIT Rate is increased by <span class="text-desc">20%</span>. If the opponent is <b class="text-genshin-cryo">Frozen</b>, CRIT Rate is increased by an additional <span class="text-desc">20%</span>.`,
    ],
    set: [
      `Frost-Weaved Dignity`,
      `Icebreaker's Resolve`,
      `Broken Rime's Echo`,
      `Snowswept Memory`,
      `Frozen Homeland's Demise`,
    ],
  },
  {
    id: '156294403',
    name: 'Heart of Depth',
    icon: 'UI_RelicIcon_15016',
    rarity: [4, 5],
    bonus: [{ stat: Stats.HYDRO_DMG, value: 0.15 }],
    desc: [
      `<b class="text-genshin-hydro">Hydro DMG Bonus</b> <span class="text-desc">+15%</span>`,
      `After using an Elemental Skill, increases Normal Attack and Charged Attack DMG by <span class="text-desc">30%</span> for <span class="text-desc">15</span>s.`,
    ],
    set: [
      `Goblet of Thundering Deep`,
      `Gust of Nostalgia`,
      `Wine-Stained Tricorne`,
      `Gilded Corsage`,
      `Copper Compass`,
    ],
  },
  {
    id: '1337666507',
    name: 'Tenacity of the Millelith',
    icon: 'UI_RelicIcon_15017',
    rarity: [4, 5],
    bonus: [{ stat: Stats.P_HP, value: 0.2 }],
    desc: [
      `HP <span class="text-desc">+<span class="text-desc">20%</span>`,
      `When an Elemental Skill hits an opponent, the ATK of all nearby party members is increased by <span class="text-desc">20%</span> and their Shield Strength is increased by <span class="text-desc">30%</span> for <span class="text-desc">3</span>s. This effect can be triggered once every <span class="text-desc">0.5</span>s. This effect can still be triggered even when the character who is using this artifact set is not on the field.`,
    ],
    set: [
      `Noble's Pledging Vessel`,
      `Ceremonial War-Plume`,
      `General's Ancient Helm`,
      `Flower of Accolades`,
      `Orichalceous Time-Dial`,
    ],
  },
  {
    id: '862591315',
    name: 'Pale Flame',
    icon: 'UI_RelicIcon_15018',
    rarity: [4, 5],
    bonus: [{ stat: Stats.PHYSICAL_DMG, value: 0.25 }],
    desc: [
      `<b>Physical DMG Bonus</b> +<span class="text-desc">25%</span>`,
      `When an Elemental Skill hits an opponent, ATK is increased by <span class="text-desc">9%</span> for <span class="text-desc">7</span>s. This effect stacks up to <span class="text-desc">2</span> times and can be triggered once every <span class="text-desc">0.3</span>s. Once <span class="text-desc">2</span> stacks are reached, the 2-set effect is increased by <span class="text-desc">100%</span>.`,
    ],
    set: [`Surpassing Cup`, `Wise Doctor's Pinion`, `Mocking Mask`, `Stainless Bloom`, `Moment of Cessation`],
  },
  {
    id: '4144069251',
    name: "Shimenawa's Reminiscence",
    icon: 'UI_RelicIcon_15019',
    rarity: [4, 5],
    bonus: [{ stat: Stats.P_ATK, value: 0.18 }],
    desc: [
      `ATK <span class="text-desc">+<span class="text-desc">18%</span>`,
      `When casting an Elemental Skill, if the character has <span class="text-desc">15</span> or more Energy, they lose <span class="text-desc">15</span> Energy and Normal/Charged/Plunging Attack DMG is increased by <span class="text-desc">50%</span> for <span class="text-desc">10</span>s. This effect will not trigger again during that duration.`,
    ],
    set: [`Hopeful Heart`, `Shaft of Remembrance`, `Capricious Visage`, `Entangling Bloom`, `Morning Dew's Moment`],
  },
  {
    id: '2276480763',
    name: 'Emblem of Severed Fate',
    icon: 'UI_RelicIcon_15020',
    rarity: [4, 5],
    bonus: [{ stat: Stats.ER, value: 0.2 }],
    desc: [
      `Energy Recharge <span class="text-desc">+20%</span>`,
      `Increases Elemental Burst DMG by <span class="text-desc">25%</span> of Energy Recharge. A maximum of <span class="text-desc">75%</span> bonus DMG can be obtained in this way.`,
    ],
    set: [`Scarlet Vessel`, `Sundered Feather`, `Ornate Kabuto`, `Magnificent Tsuba`, `Storm Cage`],
  },
  {
    id: '2546254811',
    name: 'Husk of Opulent Dreams',
    icon: 'UI_RelicIcon_15021',
    rarity: [4, 5],
    bonus: [{ stat: Stats.P_DEF, value: 0.3 }],
    desc: [
      `DEF <span class="text-desc">+30%</span>`,
      `A character equipped with this Artifact set will obtain the <b>Curiosity</b> effect in the following conditions:
    <br />When on the field, the character gains <span class="text-desc">1</span> stack after hitting an opponent with a <b class="text-genshin-geo">Geo</b> attack, triggering a maximum of once every <span class="text-desc">0.3</span>s.
    <br />When off the field, the character gains <span class="text-desc">1</span> stack every <span class="text-desc">3</span>s.
    <br /><b>Curiosity</b> can stack up to <span class="text-desc">4</span> times, each providing <span class="text-desc">6%</span> DEF and a <span class="text-desc">6%</span> Geo DMG Bonus.
    <br />When <span class="text-desc">6</span> seconds pass without gaining a <b>Curiosity</b> stack, <span class="text-desc">1</span> stack is lost.`,
    ],
    set: [`Calabash of Awakening`, `Plume of Luxury`, `Skeletal Hat`, `Bloom Times`, `Song of Life`],
  },
  {
    id: '1756609915',
    name: 'Ocean-Hued Clam',
    icon: 'UI_RelicIcon_15022',
    rarity: [4, 5],
    bonus: [{ stat: Stats.HEAL, value: 0.15 }],
    desc: [
      `Healing Bonus <span class="text-desc">+15%</span>.`,
      `When the character equipping this artifact set heals a character in the party, a <b>Sea-Dyed Foam</b> will appear for <span class="text-desc">3</span> seconds, accumulating the amount of HP recovered from healing (including overflow healing).
      <br />At the end of the duration, the <b>Sea-Dyed Foam</b> will explode, dealing DMG to nearby opponents based on <span class="text-desc">90%</span> of the accumulated healing.
      <br />(This DMG is calculated similarly to Reactions such as Electro-Charged, and Superconduct, but it is not affected by Elemental Mastery, Character Levels, or Reaction DMG Bonuses).
      <br />Only one <b>Sea-Dyed Foam</b> can be produced every <span class="text-desc">3.5</span> seconds.
      <br />Each <b>Sea-Dyed Foam</b> can accumulate up to <span class="text-desc">30,000</span> HP (including overflow healing).
      <br />There can be no more than one <b>Sea-Dyed Foam</b> active at any given time.
      <br />This effect can still be triggered even when the character who is using this artifact set is not on the field.`,
    ],
    set: [`Pearl Cage`, `Deep Palace's Plume`, `Crown of Watatsumi`, `Sea-Dyed Blossom`, `Cowry of Parting`],
  },
  {
    id: '1558036915',
    name: 'Vermillion Hereafter',
    icon: 'UI_RelicIcon_15023',
    rarity: [4, 5],
    bonus: [{ stat: Stats.P_ATK, value: 0.18 }],
    desc: [
      `ATK <span class="text-desc">+18%</span>.`,
      `After using an Elemental Burst, this character will gain the <b>Nascent Light</b> effect, increasing their ATK by <span class="text-desc">8%</span> for <span class="text-desc">16</span>s. When the character's HP decreases, their ATK will further increase by <span class="text-desc">10%</span>. This increase can occur this way maximum of <span class="text-desc">4</span> times. This effect can be triggered once every <span class="text-desc">0.8</span>s. <b>Nascent Light</b> will be dispelled when the character leaves the field. If an Elemental Burst is used again during the duration of <b>Nascent Light</b>, the original <b>Nascent Light</b> will be dispelled.`,
    ],
    set: [`Moment of the Pact`, `Feather of Nascent Light`, `Thundering Poise`, `Flowering Life`, `Solar Relic`],
  },
  {
    id: '3626268211',
    name: 'Echoes of an Offering',
    icon: 'UI_RelicIcon_15024',
    rarity: [4, 5],
    bonus: [{ stat: Stats.P_ATK, value: 0.18 }],
    desc: [
      `ATK <span class="text-desc">+18%</span>.`,
      `When Normal Attacks hit opponents, there is a <span class="text-desc">36%</span> chance that it will trigger <b>Valley Rite</b>, which will increase Normal Attack DMG by <span class="text-desc">70%</span> of ATK.
      <br />This effect will be dispelled <span class="text-desc">0.05</span>s after a Normal Attack deals DMG.
      <br />If a Normal Attack fails to trigger <b>Valley Rite</b>, the odds of it triggering the next time will increase by <span class="text-desc">20%</span>.
      <br />This trigger can occur once every <span class="text-desc">0.2</span>s.`,
    ],
    set: [`Chalice of the Font`, `Jade Leaf`, `Flowing Rings`, `Soulscent Bloom`, `Symbol of Felicitation`],
  },
  {
    id: '1675079283',
    name: 'Deepwood Memories',
    icon: 'UI_RelicIcon_15025',
    rarity: [4, 5],
    bonus: [{ stat: Stats.DENDRO_DMG, value: 0.15 }],
    desc: [
      `<b class="text-genshin-dendro">Dendro DMG Bonus</b> <span class="text-desc">+15%</span>`,
      `After Elemental Skills or Bursts hit opponents, the targets' <b class="text-genshin-dendro">Dendro RES</b> will be decreased by <span class="text-desc">30%</span> for <span class="text-desc">8</span>s. This effect can be triggered even if the equipping character is not on the field.`,
    ],
    set: [`Lamp of the Lost`, `Scholar of Vines`, `Laurel Coronet`, `Labyrinth Wayfarer`, `A Time of Insight`],
  },
  {
    id: '4145306051',
    name: 'Gilded Dreams',
    icon: 'UI_RelicIcon_15026',
    rarity: [4, 5],
    bonus: [{ stat: Stats.EM, value: 80 }],
    desc: [
      `Increases Elemental Mastery by <span class="text-desc">80</span>.`,
      `Within <span class="text-desc">8</span>s of triggering an Elemental Reaction, the character equipping this will obtain buffs based on the <b>Elemental Type</b> of the other party members. ATK is increased by <span class="text-desc">14%</span> for each party member whose <b>Elemental Type</b> is the same as the equipping character, and Elemental Mastery is increased by <span class="text-desc">50</span> for every party member with a different <b>Elemental Type</b>. Each of the aforementioned buffs will count up to <span class="text-desc">3</span> characters. This effect can be triggered once every <span class="text-desc">8</span>s. The character who equips this can still trigger its effects when not on the field.`,
    ],
    set: [
      `Honeyed Final Feast`,
      `Feather of Judgment`,
      `Shadow of the Sand King`,
      `Dreaming Steelbloom`,
      `The Sunken Years`,
    ],
  },
  {
    id: '2538235187',
    name: 'Desert Pavilion Chronicle',
    icon: 'UI_RelicIcon_15027',
    rarity: [4, 5],
    bonus: [{ stat: Stats.ANEMO_DMG, value: 0.15 }],
    desc: [
      `<b class="text-genshin-anemo">Anemo DMG Bonus</b> <span class="text-desc">+15%</span>.`,
      `When Charged Attacks hit opponents, the equipping character's Normal Attack SPD will increase by <span class="text-desc">10%</span> while Normal, Charged, and Plunging Attack DMG will increase by <span class="text-desc">40%</span> for <span class="text-desc">15</span>s.`,
    ],
    set: [
      `Defender of the Enchanting Dream`,
      `End of the Golden Realm`,
      `Legacy of the Desert High-Born`,
      `The First Days of the City of Kings`,
      `Timepiece of the Lost Path`,
    ],
  },
  {
    id: '3094139291',
    name: 'Flower of Paradise Lost',
    icon: 'UI_RelicIcon_15028',
    rarity: [4, 5],
    bonus: [{ stat: Stats.EM, value: 80 }],
    add: (base) => {
      base.BLOOM_DMG.push({ value: 0.4, name: '4-Piece', source: `Flower of Paradise Lost` })
      base.HYPERBLOOM_DMG.push({ value: 0.4, name: '4-Piece', source: `Flower of Paradise Lost` })
      base.BURGEON_DMG.push({ value: 0.4, name: '4-Piece', source: `Flower of Paradise Lost` })
      return base
    },
    desc: [
      `Increases Elemental Mastery by <span class="text-desc">80</span>.`,
      `The equipping character's Bloom, Hyperbloom, and Burgeon reaction DMG are increased by <span class="text-desc">40%</span>. Additionally, after the equipping character triggers Bloom, Hyperbloom, or Burgeon, they will gain another <span class="text-desc">25%</span> bonus to the effect mentioned prior. Each stack of this lasts <span class="text-desc">10</span>s. Max <span class="text-desc">4</span> stacks simultaneously. This effect can only be triggered once per second. The character who equips this can still trigger its effects when not on the field.`,
    ],
    set: [
      `Secret-Keeper's Magic Bottle`,
      `Wilting Feast`,
      `Amethyst Crown`,
      `Ay-Khanoum's Myriad`,
      `A Moment Congealed`,
    ],
  },
  {
    id: '1925210475',
    name: "Nymph's Dream",
    icon: 'UI_RelicIcon_15029',
    rarity: [4, 5],
    bonus: [{ stat: Stats.HYDRO_DMG, value: 0.15 }],
    desc: [
      `<b class="text-genshin-hydro">Hydro DMG Bonus</b> <span class="text-desc">+15%</span>`,
      `After Normal, Charged, and Plunging Attacks, Elemental Skills, and Elemental Bursts hit opponents, <span class="text-desc">1</span> stack of <b>Mirrored Nymph</b> will triggered, lasting <span class="text-desc">8</span>s. When under the effect of <span class="text-desc">1</span>, <span class="text-desc">2</span>, or <span class="text-desc">3</span> or more <b>Mirrored Nymph</b> stacks, ATK will be increased by <span class="text-desc">7%</span>/<span class="text-desc">16%</span>/<span class="text-desc">25%</span>, and <b class="text-genshin-hydro">Hydro DMG</b> will be increased by <span class="text-desc">4%</span>/<span class="text-desc">9%</span>/<span class="text-desc">15%</span>. <b>Mirrored Nymph</b> created by Normal, Charged, and Plunging Attacks, Elemental Skills, and Elemental Bursts exist independently.`,
    ],
    set: [
      `Heroes' Tea Party`,
      `Wicked Mage's Plumule`,
      `Fell Dragon's Monocle`,
      `Odyssean Flower`,
      `Nymph's Constancy`,
    ],
  },
  {
    id: '235897163',
    name: "Vourukasha's Glow",
    icon: 'UI_RelicIcon_15030',
    rarity: [4, 5],
    bonus: [{ stat: Stats.P_HP, value: 0.2 }],
    add: (base) => {
      base.SKILL_DMG.push({ value: 0.1, name: '4-Piece', source: `Vourukasha's Glow` })
      base.BURST_DMG.push({ value: 0.1, name: '4-Piece', source: `Vourukasha's Glow` })
      return base
    },
    desc: [
      `HP <span class="text-desc">+<span class="text-desc">20%</span>`,
      `Elemental Skill and Elemental Burst DMG will be increased by <span class="text-desc">10%</span>. After the equipping character takes DMG, the aforementioned DMG Bonus is increased by <span class="text-desc">80%</span> for <span class="text-desc">5</span>s. This effect increase can have <span class="text-desc">5</span> stacks. The duration of each stack is counted independently. These effects can be triggered even when the equipping character is not on the field.`,
    ],
    set: [
      `Feast of Boundless Joy`,
      `Vibrant Pinion`,
      `Heart of Khvarena's Brilliance`,
      `Stamen of Khvarena's Origin`,
      `Ancient Abscission`,
    ],
  },
  {
    id: '1249831867',
    name: 'Marechaussee Hunter',
    icon: 'UI_RelicIcon_15031',
    rarity: [4, 5],
    bonus: [],
    half: (base) => {
      base.BASIC_DMG.push({ value: 0.15, name: '4-Piece', source: `Marechaussee Hunter` })
      base.CHARGE_DMG.push({ value: 0.15, name: '4-Piece', source: `Marechaussee Hunter` })
      return base
    },
    desc: [
      `Normal and Charged Attack DMG <span class="text-desc">+15%</span>.`,
      `When current HP increases or decreases, CRIT Rate will be increased by <span class="text-desc">12%</span> for <span class="text-desc">5</span>s. Max <span class="text-desc">3</span> stacks.`,
    ],
    set: [`Forgotten Vessel`, `Masterpiece's Overture`, `Veteran's Visage`, `Hunter's Brooch`, `Moment of Judgment`],
  },
  {
    id: '3410220315',
    name: 'Golden Troupe',
    icon: 'UI_RelicIcon_15032',
    rarity: [4, 5],
    bonus: [],
    half: (base) => {
      base.SKILL_DMG.push({ value: 0.2, name: '2-Piece', source: `Golden Troupe` })
      return base
    },
    add: (base) => {
      base.SKILL_DMG.push({ value: 0.25, name: '4-Piece', source: `Golden Troupe` })
      return base
    },
    desc: [
      `Increases Elemental Skill DMG by <span class="text-desc">20%</span>.`,
      `Increases Elemental Skill DMG by <span class="text-desc">25%</span>.
      <br />Additionally, when not on the field, Elemental Skill DMG will be further increased by <span class="text-desc">25%</span>. This effect will be cleared <span class="text-desc">2</span>s after taking the field.`,
    ],
    set: [
      `Golden Night's Bustle`,
      `Golden Bird's Shedding`,
      `Golden Troupe's Reward`,
      `Golden Song's Variation`,
      `Golden Era's Prelude`,
    ],
  },
  {
    id: '2803305851',
    name: 'Song of Days Past',
    icon: 'UI_RelicIcon_15033',
    rarity: [4, 5],
    bonus: [{ stat: Stats.HEAL, value: 0.15 }],
    desc: [
      `Healing Bonus <span class="text-desc">+15%</span>`,
      `When the equipping character heals a party member, the <b>Yearning</b> effect will be created for <span class="text-desc">6</span>s, which records the total amount of healing provided (including overflow healing). When the duration expires, the <b>Yearning</b> effect will be transformed into the <b>Waves of Days Past</b> effect: When your active party member hits an opponent with a Normal Attack, Charged Attack, Plunging Attack, Elemental Skill, or Elemental Burst, the DMG dealt will be increased by <span class="text-desc">8%</span> of the total healing amount recorded by the <b>Yearning</b> effect. The <b>Waves of Days Past</b> effect is removed after it has taken effect <span class="text-desc">5</span> times or after <span class="text-desc">10</span>s. A single instance of the <b>Yearning</b> effect can record up to <span class="text-desc">15,000</span> healing, and only a single instance can exist at once, but it can record the healing from multiple equipping characters. Equipping characters on standby can still trigger this effect.`,
    ],
    set: [
      `Promised Dream of Days Past`,
      `Recollection of Days Past`,
      `Poetry of Days Past`,
      `Forgotten Oath of Days Past`,
      `Echoing Sound From Days Past`,
    ],
  },
  {
    id: '279470883',
    name: 'Nighttime Whispers in the Echoing Woods',
    icon: 'UI_RelicIcon_15034',
    rarity: [4, 5],
    bonus: [{ stat: Stats.P_ATK, value: 0.18 }],
    desc: [
      `ATK <span class="text-desc">+18%</span>`,
      `After using an Elemental Skill, gain a <span class="text-desc">20%</span> <b class="text-genshin-geo">Geo DMG Bonus</b> for <span class="text-desc">10</span>s. While under a shield granted by the Crystallize reaction, the above effect will be increased by 1<span class="text-desc">50%</span>, and this additional increase disappears <span class="text-desc">1</span>s after that shield is lost.`,
    ],
    set: [
      `Magnanimous Ink Bottle`,
      `Honest Quill`,
      `Compassionate Ladies' Hat`,
      `Selfless Floral Accessory`,
      `Faithful Hourglass`,
    ],
  },
  {
    id: '1492570003',
    name: 'Fragment of Harmonic Whimsy',
    icon: 'UI_RelicIcon_15035',
    rarity: [4, 5],
    bonus: [{ stat: Stats.P_ATK, value: 0.18 }],
    desc: [
      `ATK <span class="text-desc">+<span class="text-desc">18%</span>`,
      `When the value of a <b class="text-genshin-bol">Bond of Life</b> increases or decreases, this character deals <span class="text-desc">18%</span> increased DMG for <span class="text-desc">6</span>s. Max <span class="text-desc">3</span> stacks.`,
    ],
    set: [
      `Ichor Shower Rhapsody`,
      `Ancient Sea's Nocturnal Musing`,
      `Whimsical Dance of the Withered`,
      `Harmonious Symphony Prelude`,
      `The Grand Jape of the Turning of Fate`,
    ],
  },
  {
    id: '352459163',
    name: 'Unfinished Reverie',
    icon: 'UI_RelicIcon_15036',
    rarity: [4, 5],
    bonus: [{ stat: Stats.P_ATK, value: 0.18 }],
    desc: [
      `ATK <span class="text-desc">+<span class="text-desc">18%</span>`,
      `After leaving combat for <span class="text-desc">3</span>s, DMG dealt increased by <span class="text-desc">50%</span>. In combat, if no Burning opponents are nearby for more than <span class="text-desc">6</span>s, this DMG Bonus will decrease by <span class="text-desc">10%</span> per second until it reaches <span class="text-desc">0%</span>. When a Burning opponent exists, it will increase by <span class="text-desc">10%</span> instead until it reaches <span class="text-desc">50%</span>. This effect still triggers if the equipping character is off-field.`,
    ],
    set: [
      `The Wine-Flask Over Which the Plan Was Hatched`,
      `Faded Emerald Tail`,
      `Crownless Crown`,
      `Dark Fruit of Bright Flowers`,
      `Moment of Attainment`,
    ],
  },
  {
    id: '2949388203',
    name: 'Scroll of the Hero of Cinder City',
    icon: 'UI_RelicIcon_15037',
    rarity: [4, 5],
    bonus: [],
    desc: [
      `When a nearby party member triggers a <b>Nightsoul Burst</b>, the equipping character regenerates <span class="text-desc">6</span> Elemental Energy.`,
      `After the equipping character triggers a reaction related to their <b>Elemental Type</b>, all nearby party members gain a <span class="text-desc">12%</span> <b>Elemental DMG Bonus</b> for the <b>Elemental Types</b> involved in the elemental reaction for <span class="text-desc">15</span>s. If the equipping character is in the <b>Nightsoul's Blessing</b> state when triggering this effect, all nearby party members gain an additional <span class="text-desc">28%</span> <b>Elemental DMG Bonus</b> for the <b>Elemental Types</b> involved in the elemental reaction for <span class="text-desc">20</span>s. The equipping character can trigger this effect while off-field, and the DMG bonus from Artifact Sets with the same name do not stack.`,
    ],
    set: [
      `Wandering Scholar's Claw Cup`,
      `Mountain Ranger's Marker`,
      `Demon-Warrior's Feather Mask`,
      `Beast Tamer's Talisman`,
      `Mystic's Gold Dial`,
    ],
  },
  {
    id: '1774579403',
    name: 'Obsidian Codex',
    icon: 'UI_RelicIcon_15038',
    rarity: [4, 5],
    bonus: [],
    desc: [
      `While the equipping character is in <b>Nightsoul's Blessing</b> and is on the field, their DMG dealt is increased by <span class="text-desc">15%</span>.`,
      `After the equipping character consumes <span class="text-desc">1</span> <b>Nightsoul</b> point while on the field, CRIT Rate increases by <span class="text-desc">40%</span> for <span class="text-desc">6</span>s. This effect can trigger once every second.`,
    ],
    set: [
      `Pre-Banquet of the Contenders`,
      `Root of the Spirit-Marrow`,
      `Crown of the Saints`,
      `Reckoning of the Xenogenic`,
      `Myths of the Night Realm`,
    ],
  },
  {
    id: '2364208851',
    name: 'Resolution of Sojourner',
    icon: 'UI_RelicIcon_10001',
    rarity: [3, 4],
    bonus: [{ stat: Stats.P_ATK, value: 0.18 }],
    add: (base) => {
      base.CHARGE_CR.push({ value: 0.3, name: '4-Piece', source: `Resolution of Sojourner` })
      return base
    },
    desc: [
      `ATK <span class="text-desc">+<span class="text-desc">18%</span>.`,
      `Increases Charged Attack CRIT Rate by <span class="text-desc">30%</span>.`,
    ],
    set: [
      `Goblet of the Sojourner`,
      `Feather of Homecoming`,
      `Crown of Parting`,
      `Heart of Comradeship`,
      `Sundial of the Sojourner`,
    ],
  },
  {
    id: '1383639611',
    name: 'Tiny Miracle',
    icon: 'UI_RelicIcon_10004',
    rarity: [3, 4],
    bonus: [],
    desc: [
      `<b>All Elemental RES</b> increased by <span class="text-desc">20%</span>.`,
      `Incoming <b>Elemental DMG</b> increases corresponding <b>Elemental RES</b> by <span class="text-desc">30%</span> for <span class="text-desc">10</span>s. Can only occur once every <span class="text-desc">10</span>s.`,
    ],
    set: [
      `Tiny Miracle's Goblet`,
      `Tiny Miracle's Feather`,
      `Tiny Miracle's Earrings`,
      `Tiny Miracle's Flower`,
      `Tiny Miracle's Hourglass`,
    ],
  },
  {
    id: '855894507',
    name: 'Berserker',
    icon: 'UI_RelicIcon_10005',
    rarity: [3, 4],
    bonus: [{ stat: Stats.CRIT_RATE, value: 0.12 }],
    desc: [`CRIT Rate <span class="text-desc">+12%</span>`, `When HP is below <span class="text-desc">70%</span>, CRIT Rate increases by an additional <span class="text-desc">24%</span>.`],
    set: [
      `Berserker's Bone Goblet`,
      `Berserker's Indigo Feather`,
      `Berserker's Battle Mask`,
      `Berserker's Rose`,
      `Berserker's Timepiece`,
    ],
  },
  {
    id: '3890292467',
    name: 'Instructor',
    icon: 'UI_RelicIcon_10007',
    rarity: [3, 4],
    bonus: [{ stat: Stats.EM, value: 80 }],
    desc: [
      `Increases Elemental Mastery by <span class="text-desc">80</span>.`,
      `Upon triggering an Elemental Reaction, increases all party members' Elemental Mastery by <span class="text-desc">120</span> for <span class="text-desc">8</span>s.`,
    ],
    set: [
      `Instructor's Tea Cup`,
      `Instructor's Feather Accessory`,
      `Instructor's Cap`,
      `Instructor's Brooch`,
      `Instructor's Pocket Watch`,
    ],
  },
  {
    id: '2764598579',
    name: 'The Exile',
    icon: 'UI_RelicIcon_10009',
    rarity: [3, 4],
    bonus: [{ stat: Stats.ER, value: 0.2 }],
    desc: [
      `Energy Recharge <span class="text-desc">+<span class="text-desc">20%</span>`,
      `Using an Elemental Burst regenerates <span class="text-desc">2</span> Energy for all party members (excluding the wearer) every <span class="text-desc">2</span>s for <span class="text-desc">6</span>s. This effect cannot stack.`,
    ],
    set: [`Exile's Goblet`, `Exile's Feather`, `Exile's Circlet`, `Exile's Flower`, `Exile's Pocket Watch`],
  },
  {
    id: '4082302819',
    name: "Defender's Will",
    icon: 'UI_RelicIcon_10003',
    rarity: [3, 4],
    bonus: [{ stat: Stats.P_DEF, value: 0.3 }],
    desc: [
      `DEF <span class="text-desc">+30%</span>`,
      `For each different element present in your own party, the wearer's <b>Elemental RES</b> to that corresponding element is increased by <span class="text-desc">30%</span>.`,
    ],
    set: [`Guardian's Vessel`, `Guardian's Sigil`, `Guardian's Band`, `Guardian's Flower`, `Guardian's Clock`],
  },
  {
    id: '3535784755',
    name: 'Brave Heart',
    icon: 'UI_RelicIcon_10002',
    rarity: [3, 4],
    bonus: [{ stat: Stats.P_ATK, value: 0.18 }],
    desc: [
      `ATK <span class="text-desc">+18%</span>.`,
      `Increases DMG by <span class="text-desc">30%</span> against opponents with more than <span class="text-desc">50%</span> HP.`,
    ],
    set: [
      `Outset of the Brave`,
      `Prospect of the Brave`,
      `Crown of the Brave`,
      `Medal of the Brave`,
      `Fortitude of the Brave`,
    ],
  },
  {
    id: '2890909531',
    name: 'Martial Artist',
    icon: 'UI_RelicIcon_10006',
    rarity: [3, 4],
    bonus: [],
    desc: [
      `Normal and Charged Attack DMG <span class="text-desc">+15%</span>`,
      `After using Elemental Skill, increases Normal Attack and Charged Attack DMG by <span class="text-desc">25%</span> for <span class="text-desc">8</span>s.`,
    ],
    set: [
      `Martial Artist's Wine Cup`,
      `Martial Artist's Feather Accessory`,
      `Martial Artist's Bandana`,
      `Martial Artist's Red Flower`,
      `Martial Artist's Water Hourglass`,
    ],
  },
  {
    id: '1186209435',
    name: 'Gambler',
    icon: 'UI_RelicIcon_10008',
    rarity: [3, 4],
    bonus: [],
    desc: [
      `Increases Elemental Skill DMG by <span class="text-desc">20%</span>.`,
      `Defeating an opponent has a <span class="text-desc">100%</span> chance to remove Elemental Skill CD. Can only occur once every <span class="text-desc">15</span>s.`,
    ],
    set: [
      `Gambler's Dice Cup`,
      `Gambler's Feather Accessory`,
      `Gambler's Earrings`,
      `Gambler's Brooch`,
      `Gambler's Pocket Watch`,
    ],
  },
  {
    id: '3618167299',
    name: 'Scholar',
    icon: 'UI_RelicIcon_10012',
    rarity: [3, 4],
    bonus: [{ stat: Stats.ER, value: 0.2 }],
    desc: [
      `Energy Recharge <span class="text-desc">+20%</span>`,
      `Gaining Elemental Particles or Orbs gives <span class="text-desc">3</span> Energy to all party members who have a bow or a catalyst equipped. Can only occur once every <span class="text-desc">3</span>s.`,
    ],
    set: [`Scholar's Ink Cup`, `Scholar's Quill Pen`, `Scholar's Lens`, `Scholar's Bookmark`, `Scholar's Clock`],
  },
  {
    id: '3782508715',
    name: 'Traveling Doctor',
    icon: 'UI_RelicIcon_10013',
    rarity: [2, 3],
    bonus: [{ stat: Stats.I_HEALING, value: 0.2 }],
    desc: [
      `Increases incoming healing by <span class="text-desc">20%</span>.`,
      `Using Elemental Burst restores <span class="text-desc">20%</span> HP.`,
    ],
    set: [
      `Traveling Doctor's Medicine Pot`,
      `Traveling Doctor's Owl Feather`,
      `Traveling Doctor's Handkerchief`,
      `Traveling Doctor's Silver Lotus`,
      `Traveling Doctor's Pocket Watch`,
    ],
  },
  {
    id: '1103732675',
    name: 'Lucky Dog',
    icon: 'UI_RelicIcon_10011',
    rarity: [2, 3],
    bonus: [{ stat: Stats.DEF, value: 100 }],
    desc: [
      `DEF increased by <span class="text-desc">100</span>.`,
      `Picking up Mora restores <span class="text-desc">300</span> HP.`,
    ],
    set: [
      `Lucky Dog's Goblet`,
      `Lucky Dog's Eagle Feather`,
      `Lucky Dog's Silver Circlet`,
      `Lucky Dog's Clover`,
      `Lucky Dog's Hourglass`,
    ],
  },
  {
    id: '2191797987',
    name: 'Adventurer',
    icon: 'UI_RelicIcon_10010',
    rarity: [2, 3],
    bonus: [{ stat: Stats.DEF, value: 100 }],
    desc: [
      `Max HP increased by <span class="text-desc">1,000</span>.`,
      `Opening a chest regenerates <span class="text-desc">30%</span> Max HP over <span class="text-desc">5</span>s.`,
    ],
    set: [
      `Adventurer's Golden Goblet`,
      `Adventurer's Tail Feather`,
      `Adventurer's Bandana`,
      `Adventurer's Flower`,
      `Adventurer's Pocket Watch`,
    ],
  },
]
