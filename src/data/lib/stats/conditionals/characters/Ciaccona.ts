import { findCharacter, findContentById } from '@src/core/utils/finder'
import _ from 'lodash'
import { baseStatsObject, StatsObject, StatsObjectKeys } from '../../baseConstant'
import { Element, ITalentLevel, ITeamChar, Stats, TalentProperty, WeaponType } from '@src/domain/constant'

import { toPercentage } from '@src/core/utils/converter'
import { IContent, ITalent } from '@src/domain/conditional'
import { calcScaling } from '@src/core/utils/data_format'

const Ciaccona = (c: number, i: { i1: boolean; i2: boolean }, t: ITalentLevel, team: ITeamChar[]) => {
  const { normal, skill, lib, forte, intro } = t

  const talents: ITalent = {
    normal: {
      level: normal,
      trace: `Normal Attack`,
      title: `Quadruple Time Steps`,
      content: `<b>Basic Attack</b>
      <br />Perform up to 4 consecutive attacks, dealing <b class="text-wuwa-aero">Aero DMG</b>. Basic Attack Stage 4 inflicts <span class="text-desc">1</span> stack of <b class="text-wuwa-aero">Aero Erosion</b> upon the target hit.
      <br />- When the first three stages of Ciaccona's Basic Attack are interrupted by dodging, press Basic Attack in time to resume the combo and cast the corresponding Basic Attack stage. This effect can be triggered once in each Basic Attack combo.
      <br />- After Basic Attack Stage 4, Ciaccona starts a <b class="text-desc">Solo Concert</b>. If Ciaccona's Basic Attack Stage 4 and <b class="text-desc">Solo Concert</b> ends early (proactively or being interrupted), an <b class="text-teal-200">Ensemble Sylph</b> is generated
      <br />
      <br /><b class="text-desc">Solo Concert</b>
      <br />After Inherent Skill <b>Interlude Tune</b> is activated, Ciaccona and her <b class="text-teal-200">Ensemble Sylph</b> will increase the <b class="text-wuwa-aero">Aero DMG Bonus</b> for all nearby Resonators in the team.
      <br />
      <br /><b class="text-teal-200">Ensemble Sylph</b>
      <br />Up to <span class="text-desc">2</span> <b class="text-teal-200">Ensemble Sylphs</b> may exist simultaneously.
      <br />If Ciaccona's Basic Attack Stage 4 ends early, the <b class="text-teal-200">Ensemble Sylphs</b> generated will finish the action for Ciaccona and send Ciaccona into <b class="text-desc">Solo Concert</b>.
      <br />If Ciaccona's <b class="text-desc">Solo Concert</b> ends early, the <b class="text-teal-200">Ensemble Sylphs</b> generated will continue the <b class="text-desc">Solo Concert</b> for Ciaccona.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Consume STA to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>.
      <br />
      <br /><b>Aimed Attack</b>
      <br />Press Aim to enter Aiming Mode to fire powerful shots after charging, dealing <b class="text-wuwa-aero">Aero DMG</b>, considered as Heavy Attack DMG.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Consume STA to perform up to 2 consecutive attacks, dealing <b class="text-wuwa-aero">Aero DMG</b>. Press Normal Attack after Mid-air Attack Stage 2 to cast Basic Attack Stage 4.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Follow up successful Dodges with Basic Attack to attack the target, dealing <b class="text-wuwa-aero">Aero DMG</b>.`,
      image: 'SP_IconNorGun',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Harmonic Allegro`,
      content: `Move a certain distance, dealing <b class="text-wuwa-aero">Aero DMG</b> and inflicting a stack of <b class="text-wuwa-aero">Aero Erosion</b> on the target upon hit.
      <br />Press Normal Attack in time to cast Basic Attack Stage 2.
      <br />
      <br />- When Ciaccona interrupts the Basic Attack combo with Resonance Skill, an <b class="text-teal-200">Ensemble Sylph</b> is generated to continue the action for Ciaccona.
      <br />- Ciaccona's Resonance Skill can be cast in mid-air.`,
      image: 'SP_IconXiaKongB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `Singer's Triple Cadenza`,
      content: `Ciaccona and <b class="text-teal-200">Ensemble Sylphs</b> perform an <b class="text-teal-500">Improvised Symphonic Poem</b> together, dealing <b class="text-wuwa-aero">Aero DMG</b> once to the nearby targets and entering <b class="text-teal-500">Recital</b>.
      <br />
      <br /><b class="text-teal-500">Recital</b>
      <br />When in <b class="text-teal-500">Recital</b>, sound waves will periodically radiate around Ciaccona. When the sound wave overlaps with the circle indicator, Press the <span class="text-heal">green</span> or <span class="text-desc">yellow</span> buttons to generate <b>Symphonic Poem: Tonic</b> of the corresponding color and recover a certain amount of Concerto Energy.
      <br />During <b class="text-teal-500">Recital</b>:
      <br />- Switching to another Resonator doesn't end <b class="text-teal-500">Recital</b>, but automatically generates a <b>Symphonic Poem: Tonic</b> of the color corresponding to the color of the last generated Tonic before switching. A <span class="text-heal">green</span> <b>Symphonic Poem: Tonic</b> is generated by default if no interaction input is given before switching to another Resonator.
      <br />- Ciaccona is immune to any interruptions and takes <span class="text-desc">50%</span> less DMG.
      <br />- Exit <b class="text-teal-500">Recital</b> by pressing Resonance Liberation again or switching Ciaccona back onto the field.
      <br />- <b class="text-teal-200">Ensemble Sylphs</b> now directly grant <b class="text-wuwa-aero">Aero DMG Bonus</b> provided by <b class="text-desc">Solo Concert</b>.
      <br />
      <br /><b>Symphonic Poem: Tonic</b>
      <br /><span class="text-heal">Green Tonic</span>: Deal <b class="text-wuwa-aero">Aero DMG</b> to the nearby targets and inflict a stack of <b class="text-wuwa-aero">Aero Erosion</b> on the target hit.
      <br /><span class="text-desc">Yellow Tonic</span>: Deal <b class="text-wuwa-aero">Aero DMG</b> to the nearby targets and inflict a stack of <b class="text-wuwa-spectro">Spectro Frazzle</b> on the target hit.`,
      image: 'SP_IconXiaKongC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Symphony of Wind and Verse`,
      content: `<b>Heavy Attack - Quadruple Downbeat</b>
      <br />When there are <span class="text-desc">3</span> segments of <b class="text-wuwa-aero">Musical Essence</b>, Heavy Attack is replaced with Heavy Attack - <b>Quadruple Downbeat</b>.
      <br />Consume all <b class="text-wuwa-aero">Musical Essence</b> to shoot Downbeat Notes forward to deal <b class="text-wuwa-aero">Aero DMG</b>, pulling in the nearby targets and inflicting <span class="text-desc">1</span> stack of <b class="text-wuwa-aero">Aero Erosion</b> on the target hit.
      <br />Heavy Attack - <b>Quadruple Downbeat</b> can be cast in mid-air close to the ground.
      <br />
      <br /><b class="text-wuwa-aero">Musical Essence</b>
      <br />Ciaccona can hold up to <span class="text-desc">3</span> segments of <b class="text-wuwa-aero">Musical Essence</b>.
      <br />Casting Basic Attack Stage 4 and Intro Skill recovers <span class="text-desc">1</span> segment of <b class="text-wuwa-aero">Musical Essence</b>.`,
      image: 'SP_IconXiaKongY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Roaming with the Wind`,
      content: `Attack the target to deal <b class="text-wuwa-aero">Aero DMG</b> and inflict a stack of <b class="text-wuwa-aero">Aero Erosion</b>.
      <br />Follow up with Basic Attack in time to cast Basic Attack Stage 3.`,
      image: 'SP_IconXiaKongQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Windcalling Tune`,
      content: `<b class="text-wuwa-aero">Aero Erosion</b> DMG dealt to targets near the active Resonator is Amplified by <span class="text-desc">100%</span> for <span class="text-desc">30</span>s.`,
      image: 'SP_IconXiaKongT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Interlude Tune`,
      content: `Casting Resonance Liberation <b>Singer's Triple Cadenza</b> grants Ciaccona a Shield equal to <span class="text-desc">100%</span> of her Max HP for <span class="text-desc">4</span>s. Switching out Ciaccona removes the Shield.`,
      image: 'SP_IconXiaKongD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Winds of Rinascita`,
      content: `Increase Heavy Attack - <b>Quadruple Downbeat</b>'s DMG by <span class="text-desc">30%</span>.`,
      image: 'SP_IconXiaKongD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `Where Wind Sings`,
      content: `Casting Resonance Skill <b>Harmonic Allegro</b> grants Ciaccona immunity to interruption for <span class="text-desc">3</span>s. Casting Basic Attack increases Ciaccona's ATK by <span class="text-desc">35%</span> for <span class="text-desc">10</span>s.`,
      image: 'T_IconDevice_XiaKongM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `Song of the Four Seasons`,
      content: `During Resonance Liberation <b>Singer's Triple Cadenza</b>, Resonators in the team gain <span class="text-desc">40%</span> <b class="text-wuwa-aero">Aero DMG Bonus</b>.`,
      image: 'T_IconDevice_XiaKongM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `Starlit Improv`,
      content: `Casting Basic Attack Stage 4 additionally grants <span class="text-desc">1</span> segment of <b class="text-wuwa-aero">Musical Essence</b>. Resonance Skill <b>Harmonic Allegro</b> gains <span class="text-desc">1</span> more charge.`,
      image: 'T_IconDevice_XiaKongM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `Toccata and Fugue`,
      content: `Heavy Attack <b>Quadruple Downbeat</b> and Resonance Liberation <b>Singer's Triple Cadenza</b> ignore <span class="text-desc">45%</span> of the targets' DEF when dealing damage.`,
      image: 'T_IconDevice_XiaKongM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `Eternal Idyll to Lasting Summer`,
      content: `Resonance Liberation <b>Singer's Triple Cadenza</b> deals <span class="text-desc">40%</span> more damage. During Resonance Liberation, Resonators within the range receive <span class="text-desc">30%</span> less damage.`,
      image: 'T_IconDevice_XiaKongM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `Unending Cadence`,
      content: `When in <b class="text-desc">Solo Concert</b>, Ciaccona and <b class="text-teal-200">Ensemble Sylph</b> deal <b class="text-wuwa-aero">Aero DMG</b> equal to <span class="text-desc">220%</span> of Ciaccona's ATK to nearby targets (considered Resonance Liberation DMG), triggered once every <span class="text-desc">10</span>s.`,
      image: 'T_IconDevice_XiaKongM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'ciac_outro',
      text: `Outro: Windcalling Tune`,
      ...talents.outro,
      show: true,
      default: false,
    },
    {
      type: 'toggle',
      id: 'ciac_c2',
      text: `S2 Team Aero Bonus`,
      ...talents.c2,
      show: c >= 2,
      default: true,
    },
  ]

  const teammateContent: IContent[] = [findContentById(content, 'ciac_outro'), findContentById(content, 'ciac_c2')]

  return {
    talents,
    content,
    teammateContent,
    allyContent: [],
    preCompute: (x: StatsObject, form: Record<string, any>) => {
      const base = _.cloneDeep(x)

      base.DoT = true

      base.BASIC_SCALING = [
        {
          name: 'Stage 1 DMG',
          value: [{ scaling: calcScaling(0.287, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.BA,
          atkBonus: c >= 1 ? 0.35 : 0,
        },
        {
          name: 'Stage 2 DMG',
          value: [
            { scaling: calcScaling(0.246, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.123, normal), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(0.328, normal), multiplier: Stats.ATK },
          ],
          element: Element.AERO,
          property: TalentProperty.BA,
          atkBonus: c >= 1 ? 0.35 : 0,
        },
        {
          name: 'Stage 3 DMG',
          value: [{ scaling: calcScaling(0.1661, normal), multiplier: Stats.ATK, hits: 4 }],
          element: Element.AERO,
          property: TalentProperty.BA,
          atkBonus: c >= 1 ? 0.35 : 0,
        },
        {
          name: 'Stage 4 DMG',
          value: [{ scaling: calcScaling(0.1661, normal), multiplier: Stats.ATK, hits: 4 }],
          element: Element.AERO,
          property: TalentProperty.BA,
          atkBonus: c >= 1 ? 0.35 : 0,
        },
      ]
      base.HEAVY_SCALING = [
        {
          name: 'Heavy Attack DMG',
          value: [{ scaling: calcScaling(0.5412, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
        {
          name: 'Aimed Shot DMG',
          value: [{ scaling: calcScaling(0.164, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
        {
          name: 'Fully Charged Aimed Shot DMG',
          value: [{ scaling: calcScaling(0.369, normal), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.HA,
        },
      ]
      base.MID_AIR_SCALING = [
        {
          name: 'Mid-Air Attack Stage 1 DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.2788, normal), multiplier: Stats.ATK, hits: 2 }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
        {
          name: 'Mid-Air Attack Stage 2 DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.123, normal), multiplier: Stats.ATK, hits: 4 }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.DODGE_SCALING = [
        {
          name: 'Dodge Counter DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.2876, normal), multiplier: Stats.ATK, hits: 4 }],
          element: Element.AERO,
          property: TalentProperty.BA,
        },
      ]
      base.SKILL_SCALING = [
        {
          name: 'Harmonic Allegro DMG',
          value: [{ scaling: calcScaling(0.2032, skill), multiplier: Stats.ATK, hits: 4 }],
          element: Element.AERO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: `Improvised Symphonic Poem DMG`,
          value: [{ scaling: calcScaling(5.535, lib), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.LIB,
          defPen: c >= 4 ? 0.45 : 0,
          bonus: (form.ciac_c2 ? 0.4 : 0) + (c >= 5 ? 0.4 : 0),
        },
        {
          name: `Total Symphonic Poem: Tonic DMG`,
          value: [{ scaling: calcScaling(0.0308, lib), multiplier: Stats.ATK, hits: 20 }],
          element: Element.AERO,
          property: TalentProperty.LIB,
          defPen: c >= 4 ? 0.45 : 0,
          bonus: (form.ciac_c2 ? 0.4 : 0) + (c >= 5 ? 0.4 : 0),
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Quadruple Downbeat DMG',
          value: [
            { scaling: calcScaling(0.1112, forte), multiplier: Stats.ATK, hits: 10 },
            { scaling: calcScaling(1.1115, forte), multiplier: Stats.ATK },
          ],
          element: Element.AERO,
          property: TalentProperty.HA,
          bonus: i.i2 ? 0.3 : 0,
          defPen: c >= 4 ? 0.45 : 0,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Roaming with the Wind DMG`,
          value: [{ scaling: calcScaling(0.9512, intro), multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.INTRO,
        },
      ]

      if (i.i1) {
        base.LIB_SCALING.push({
          name: `I1 Shield`,
          value: [{ scaling: 1, multiplier: Stats.HP }],
          element: TalentProperty.SHIELD,
          property: TalentProperty.SHIELD,
        })
      }
      if (form.ciac_outro) {
        base.EROSION_AMP.push({
          name: `Outro`,
          source: 'Self',
          value: 1,
        })
      }
      if (c >= 6) {
        base.BASIC_SCALING.push({
          name: `S6 Solo Concert DMG`,
          value: [{ scaling: 2.2, multiplier: Stats.ATK }],
          element: Element.AERO,
          property: TalentProperty.LIB,
        })
      }

      return base
    },
    preComputeShared: (own: StatsObject, base: StatsObject, form: Record<string, any>, aForm: Record<string, any>) => {
      if (form.ciac_outro) {
        base.EROSION_AMP.push({
          name: `Outro`,
          source: 'Ciaccona',
          value: 1,
        })
      }
      if (form.ciac_c2) {
        base[Stats.AERO_DMG].push({
          name: `Sequence Node 2`,
          source: 'Ciaccona',
          value: 0.4,
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

export default Ciaccona
