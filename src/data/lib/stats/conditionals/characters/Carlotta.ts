import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Carlotta = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Silent Execution`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 2 consecutive strikes, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Basic Attack - Necessary Measures</b>
      <br />With <b class="text-blue">Moldable Crystals</b>, Carlotta's Basic Attack is replaced with <b>Necessary Measures</b>.
      <br />Chain up to 3 strikes, dealing <b class="text-wuwa-glacio">Glacio DMG</b>. Each strike of <b>Necessary Measures</b> consumes <span class="text-desc">1</span> <b class="text-blue">Moldable Crystal</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Deliver a charged attack at the target at the cost of STA, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Heavy Attack - Containment Tactics</b>
      <br />When Carlotta's <b class="text-yellow">Substance</b> is full, her Heavy Attack will be replaced with <b>Containment Tactics</b>: consume all <b class="text-yellow">Substance</b> to deal <b class="text-wuwa-glacio">Glacio DMG</b> and reduce the cooldown of Resonance Skill <b>Art of Violence</b> by <span class="text-desc">6</span>s.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Perform a Plunging Attack at the cost of STA, dealing <b class="text-wuwa-glacio">Glacio DMG</b>. Using Basic Attack shortly after the landing will cast <b>Customary Greetings</b>.
      <br />
      <br /><b>Mid-Air Attack - Customary Greetings</b>
      <br />Flip over the target and deliver a surprise shot, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Press Normal Attack shortly after a successful Dodge to deliver a riposte shot, dealing <b class="text-wuwa-glacio">Glacio DMG</b>. This consumes <span class="text-desc">1</span> <b class="text-blue">Moldable Crystal</b>.`,
      image: 'SP_IconNorGun',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Art of Violence`,
      content: `Deal <b class="text-wuwa-glacio">Glacio DMG</b> and inflict <b class="text-cyan-200">Dispersion</b> on the target. Press Resonance Skill again shortly after to cast <b>Chromatic Splendor</b>.
      <br />
      <br /><b class="text-cyan-200">Dispersion</b>
      <br />Targets with <b class="text-cyan-200">Dispersion</b> are immobilized for <span class="text-desc">1.5</span>s.
      <br />
      <br /><b>Chromatic Splendor</b>
      <br />Consume all <b class="text-blue">Moldable Crystals</b> and deal <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />The Resonance Skill enters cooldown after a while if <b>Chromatic Splendor</b> is not cast or Carlotta is switched off the field.`,
      image: 'SP_IconKelaitaB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Era of New Wave`,
      content: `Deal <b class="text-wuwa-glacio">Glacio DMG</b> to all targets in an area (considered Resonance Skill DMG) and inflict <b class="text-violet-300">Deconstruction</b> on the targets hit, then activate <b>Twilight Tango</b>.
      <br />Can be cast in mid-air.
      <br />
      <br /><b class="text-violet-300">Deconstruction</b>
      <br />Dealing DMG to targets inflicted with <b class="text-violet-300">Deconstruction</b> ignores <span class="text-desc">18%</span> of their DEF.
      <br />
      <br /><b>Twilight Tango</b>
      <br />While in <b>Twilight Tango</b>, press Normal Attack or Resonance Liberation to cast <b>Death Knell</b>.
      <br />Each <b>Death Knell</b> grants <span class="text-desc">1</span> <b class="text-cyan-200">Meta Vector</b>.
      <br />With <span class="text-desc">4</span> <b class="text-cyan-200">Meta Vectors</b>, press Normal Attack or Resonance Liberation to cast <b>Fatal Finale</b>.
      <br />- All <b class="text-yellow">Substance</b> is removed when activating and ending <b>Twilight Tango</b>. Cannot perform Basic Attack <b>Necessary Measures</b>, Heavy Attack <b>Containment Tactics</b>, and Heavy Attack <b>Imminent Oblivion</b> while in <b>Twilight Tango</b>.
      <br />
      <br /><b>Death Knell</b>
      <br />Carlotta fires powerful shots with her musket and crystal shards, dealing <b class="text-wuwa-glacio">Glacio DMG</b>, considered Resonance Skill DMG.
      <br />- Carlotta moves in the direction of the movement input with each shot of <b>Death Knell</b>.
      <br />
      <br /><b>Death Knell: Burial</b>
      <br />Carlotta attacks with her blunderbuss, dealing <b class="text-wuwa-glacio">Glacio DMG</b>. The DMG dealt is considered Resonance Skill DMG.
      <br />
      <br /><b>Fatal Finale</b>
      <br />Deal <b class="text-wuwa-glacio">Glacio DMG</b> to an area, considered Resonance Skill DMG.
      <br />- <b>Twilight Tango</b> ends after casting <b>Fatal Finale</b>.
      `,
      image: 'SP_IconKelaitaC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Lethal Repertoire`,
      content: `<b>Heavy Attack - Imminent Oblivion</b>
      <br />Carlotta activates <b class="text-rose-200">Tinted Crystal</b> every <span class="text-desc">22</span>s.
      <br />When <b class="text-yellow">Substance</b> is full and <b class="text-rose-200">Tinted Crystal</b> is activated, hold Normal Attack to consume all <b class="text-yellow">Substance</b> and cast Heavy Attack <b>Imminent Oblivion</b>, after which <b class="text-rose-200">Tinted Crystal</b> enters cooldown.
      <br />Deal <b class="text-wuwa-glacio">Glacio DMG</b> (considered Resonance Skill DMG) and reduce the cooldown of Resonance Skill <b>Art of Violence</b> by <span class="text-desc">6</span>s.
      <br />
      <br /><b class="text-yellow">Substance</b>
      <br />Carlotta can hold up to <span class="text-desc">120</span> points of <b class="text-desc">Substance</b>.
      <br />Cannot gain <b class="text-yellow">Substance</b> while in <b>Twilight Tango</b> triggered by Resonance Liberation.
      <br />Restore <span class="text-desc">30</span> points of <b class="text-yellow">Substance</b> upon casting Intro Skill <b>Wintertime Aria</b>.
      <br />Restore <span class="text-desc">10</span> points of <b class="text-yellow">Substance</b> for every <span class="text-desc">1</span> <b class="text-blue">Moldable Crystal</b> consumed upon casting Resonance Skill <b>Chromatic Splendor</b>.
      <br />Restore <span class="text-desc">10</span> points of <b class="text-yellow">Substance</b> for every <span class="text-desc">1</span> <b class="text-blue">Moldable Crystal</b> consumed upon casting Basic Attack <b>Necessary Measures</b>.
      <br />Restore <span class="text-desc">10</span> points of <b class="text-yellow">Substance</b> upon casting Dodge Counter.
      <br />
      <br /><b class="text-blue">Moldable Crystal</b>
      <br />Carlotta can hold up to <span class="text-desc">6</span> <b class="text-blue">Moldable Crystals</b>.
      <br />Cannot gain <b class="text-blue">Moldable Crystal</b> while in <b>Twilight Tango</b> triggered by Resonance Liberation.
      <br />Restore <span class="text-desc">3</span> <b class="text-blue">Moldable Crystals</b> upon casting Basic Attack Stage 2.
      <br />Restore <span class="text-desc">3</span> <b class="text-blue">Moldable Crystals</b> upon casting Heavy Attack.
      <br />Restore <span class="text-desc">3</span> <b class="text-blue">Moldable Crystals</b> upon casting Mid-Air Attack <b>Customary Greetings</b>.
      <br />Restore <span class="text-desc">3</span> <b class="text-blue">Moldable Crystals</b> upon casting Intro Skill <b>Wintertime Aria</b>.
      <br />Restore <span class="text-desc">3</span> <b class="text-blue">Moldable Crystals</b> upon casting Resonance Skill <b>Art of Violence</b>.
      <br />Restore <span class="text-desc">3</span> <b class="text-blue">Moldable Crystals</b> upon a successful Dodge.
      `,
      image: 'SP_IconKelaitaY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Wintertime Aria`,
      content: `Attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.`,
      image: 'SP_IconKelaitaQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Closing Remark`,
      content: `Attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b> equal to <span class="text-desc">794.2%</span> of Carlotta's ATK.`,
      image: 'SP_IconKelaitaT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Flawless Purity`,
      content: `After casting Resonance Skill <b>Chromatic Splendor</b>, Carlotta can perform Mid-air Attacks while being immune to any DMG or interruptions before the Mid-air Attack deals DMG.
      <br />When Carlotta is on the team, the Resoanator on the field's Flight STA cost is reduced by <span class="text-desc">-20%</span>.`,
      image: 'SP_IconKelaitaD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Ars Gratia Artis`,
      content: `Intro Skill <b>Wintertime Aria</b>, Resonance Skill <b>Chromatic Splendor</b>, Resonance Liberation <b>Death Knell</b>, and Heavy Attack <b>Imminent Oblivion</b> can inflict <b class="text-violet-300">Deconstruction</b>.`,
      image: 'SP_IconKelaitaD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Beauty Blazes Brightest Before It Fades`,
      content: `Casting Resonance Skill <b>Art of Violence</b> increases <b class="text-wuwa-glacio">Glacio DMG Bonus</b> by <span class="text-desc">25%</span> for <span class="text-desc">15</span>s.
      <br />When Resonance Skill <b>Chromatic Splendor</b> hits a target inflicted with <b class="text-cyan-200">Dispersion</b>, Carlotta additionally restores <span class="text-desc">30</span> points of <b class="text-yellow">Substance</b>.
      <br />Carlotta is immune to interruptions when casting Resonance Liberation <b>Death Knell</b>.`,
      image: 'T_IconDevice_KelaitaM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Fallen Petals Give Life to New Blooms`,
      content: `Dealing DMG to targets inflicted with <b class="text-violet-300">Deconstruction</b> increases the Crit. Rate of this attack by <span class="text-desc">25%</span>.`,
      image: 'T_IconDevice_KelaitaM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Adelante, Cortado, Spinning in Grace`,
      content: `Enable Outro Skill <b>Kaleidoscope Sparks</b>: Deal <span class="text-desc">1</span> additional strike at the end of Outro Skill <b>Closing Remark</b>, dealing <b class="text-wuwa-glacio">Glacio DMG</b> equal to <span class="text-desc">1032.18%</span> of Carlotta's ATK. The DMG Multiplier of Resonance Skill <b>Art of Violence</b> and Resonance Skill <b>Chromatic Splendor</b> is increased by <span class="text-desc">70%</span>.`,
      image: 'T_IconDevice_KelaitaM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Yesterday's Raindrops Make Finest Wine`,
      content: `Casting Heavy Attack, Heavy Attack <b>Containment Tactics</b>, and Heavy Attack <b>Imminent Oblivion</b> grants all team members <span class="text-desc">25%</span> Resonance Skill DMG Bonus for <span class="text-desc">30</span>s.`,
      image: 'T_IconDevice_KelaitaM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Toast to Past, Today, and Every Day to Come`,
      content: `Casting Resonance Skill <b>Art of Violence</b> increases ATK by <span class="text-desc">10%</span> for <span class="text-desc">20</span>s.`,
      image: 'T_IconDevice_KelaitaM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `As the Curtain Falls, I Remain What I Am`,
      content: `Shots of Resonance Liberation <b>Death Knell</b> deal higher DMG and shoot out double the number of crystal shards, representing a total increase of <span class="text-desc">145.6%</span> in the DMG Multiplier.
      <br />Shots of Resonance Liberation <b>Death Knell</b> inflict <b class="text-violet-300">Scattering</b> on targets when hit, during which the target is immobilized. This effect is removed after <span class="text-desc">1.5</span>s or when the target receives DMG.`,
      image: 'T_IconDevice_KelaitaM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'Deconstruction',
      text: `Deconstruction`,
      ...talents.lib,
      show: true,
      default: true,
      debuff: true,
    },
    {
      type: 'toggle',
      id: 'carlotta_c1',
      text: `S1 Glacio DMG Bonus`,
      ...talents.c1,
      show: c >= 1,
      default: true,
    },
    {
      type: 'toggle',
      id: 'carlotta_c4',
      text: `S4 Skill DMG Bonus`,
      ...talents.c4,
      show: c >= 4,
      default: true,
    },
    {
      type: 'toggle',
      id: 'carlotta_c5',
      text: `S5 ATK Bonus`,
      ...talents.c5,
      show: c >= 5,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'carlotta_c4')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.BASIC_SCALING = [
        {
          name: 'Basic Attack 1 DMG',
          value: [{ scaling: calcScaling(0.272, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Basic Attack 2 DMG',
          value: [
            { scaling: calcScaling(0.1989, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.2652, normal), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Necessary Measures 1 DMG',
          value: [{ scaling: calcScaling(0.3315, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Necessary Measures 2 DMG',
          value: [
            { scaling: calcScaling(0.3022, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.3694, normal), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Necessary Measures 3 DMG',
          value: [
            { scaling: calcScaling(0.7038, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1173, normal), multiplier: Stats.ATK, hits: 4 },
          ],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [
            { scaling: calcScaling(0.1148, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.1148, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.306, normal), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.HA,
        },
        {
          name: 'Customary Greetings DMG',
          value: [
            { scaling: calcScaling(0.1722, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.1722, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.459, normal), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.527, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Customary Greetings DMG',
          scale: Stats.ATK,
          value: [
            { scaling: calcScaling(0.5432, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.6639, normal), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [
            { scaling: calcScaling(0.522, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.6919, normal), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Art of Violence DMG',
          value: [{ scaling: calcScaling(0.7249, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
          multiplier: c >= 3 ? 1.7 : 1,
        },
        {
          name: 'Chromatic Splendor DMG',
          value: [
            { scaling: calcScaling(0.567, skill), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(1.701, skill), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
          multiplier: c >= 3 ? 1.7 : 1,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'Era of New Wave DMG',
          value: [{ scaling: calcScaling(3.646, lib), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Death Knell DMG',
          value: [
            { scaling: calcScaling(1.6626, lib), multiplier: Stats.ATK },
            { scaling: calcScaling(0.1313, lib), multiplier: Stats.ATK, hits: 4 },
          ],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
          multiplier: c >= 6 ? 2.456 : 1,
        },
        {
          name: `Fatal Finale DMG`,
          value: [{ scaling: calcScaling(5.8336, lib), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Imminent Oblivion DMG',
          value: [
            { scaling: calcScaling(0.3362, forte), multiplier: Stats.ATK, hits: 5 },
            { scaling: calcScaling(2.5211, forte), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Wintertime Aria DMG`,
          value: [
            { scaling: calcScaling(0.9, intro), multiplier: Stats.ATK },
            { scaling: calcScaling(0.3, intro), multiplier: Stats.ATK, hits: 2 },
          ],
          element: Element.GLACIO,
          property: TalentProperty.INTRO,
        },
      ]
      base.OUTRO_SCALING = [
        {
          name: `Closing Remark DMG`,
          value: [{ scaling: 7.942, multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.OUTRO,
        },
      ]

      if (form.Deconstruction) {
        base.DEF_PEN.push({
          value: 0.18,
          name: `Deconstruction`,
          source: 'Self',
        })
        if (c >= 2) {
          base[Stats.CRIT_RATE].push({
            value: 0.25,
            name: `Sequence Node 2`,
            source: 'Self',
          })
        }
      }
      if (form.carlotta_c1) {
        base[Stats.GLACIO_DMG].push({
          value: 0.25,
          name: `Sequence Node 1`,
          source: 'Self',
        })
      }
      if (c >= 3) {
        base.OUTRO_SCALING.push({
          name: `Kaleidoscope Sparks DMG`,
          value: [{ scaling: 10.3218, multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.OUTRO,
        })
      }
      if (form.carlotta_c4) {
        base[Stats.SKILL_DMG].push({
          value: 0.25,
          name: `Sequence Node 4`,
          source: 'Self',
        })
      }
      if (form.carlotta_c5) {
        base[Stats.P_ATK].push({
          value: 0.1,
          name: `Sequence Node 5`,
          source: 'Self',
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.carlotta_c4) {
        base[Stats.SKILL_DMG].push({
          value: 0.25,
          name: `Sequence Node 4`,
          source: 'Self',
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

export default Carlotta
