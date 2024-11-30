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
      <br />Carlotta fires up to 2 consecutive shots, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Basic Attack: Necessary Means</b>
      <br />When Carlotta has any amount of <b class="text-blue">Crystal</b>, Basic Attack is replaced with Basic Attack <b>Necessary Means</b>.
      <br />Carlotta fires up to 3 consecutive shots, dealing <b class="text-wuwa-glacio">Glacio DMG</b>. Each Basic Attack <b>Necessary Means</b> will consume <span class="text-desc">1</span> <b class="text-blue">Crystal</b>.
      <br />
      <br /><b>Heavy Attack</b>
      <br />Consumes stamina to attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Heavy Attack: Restrictive Strategy</b>
      <br />When Keleta's <b class="text-yellow">Spirit Essence</b> is full, Heavy Attack is replaced with Heavy Attack <b>Restrictive Strategy</b>, consuming all <b class="text-yellow">Spirit Essence</b>, dealing <b class="text-wuwa-glacio">Glacio DMG</b>, and reducing the cooldown of Resonance Skill <b>Violent Aesthetics</b> by <span class="text-desc">6</span>s.
      <br />
      <br /><b>Mid-Air Attack</b>
      <br />Perform an attack while in mid-air at the cost of STA, dealing <b class="text-wuwa-glacio">Glacio DMG</b>. After using Mid-Air Attack, use Basic Attack to cast Mid-Air Attack <b>Courtesy Greeting</b>.
      <br />
      <br /><b>Mid-Air Attack: Courtesy Greeting</b>
      <br />Carlotta leaps backwards and attacks the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.
      <br />
      <br /><b>Dodge Counter</b>
      <br />Use Basic Attack after a successful Dodge to attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b> and consuming <span class="text-desc">1</span> <b class="text-blue">Crystal</b>.`,
      image: 'SP_IconNorGun',
    },
    skill: {
      level: skill,
      trace: `Resonance Skill`,
      title: `Violent Aesthetics`,
      content: `Deals <b class="text-wuwa-glacio">Glacio DMG</b> and inflicts <b class="text-cyan-200">Iridescence</b> to the target. Shortly after casting Resonance Skill, Carlotta can use Resonance Skill again to cast Resonance Skill <b>Show Me Brilliance</b>.
      <br />
      <br /><b class="text-cyan-200">Iridescence</b>
      <br />Unable to perform any actions for <span class="text-desc">1.5</span>s.
      <br />
      <br /><b>Resonance Skill: Show Me Brilliance</b>
      <br />Carlotta consumes all of her current <b class="text-blue">Crystal</b> and deals <b class="text-wuwa-glacio">Glacio DMG</b> to the target.
      <br />If Resonance Skill <b>Show Me Brilliance</b> is not cast within a certain period of time or if Carlotta is switched out, Resonance Skill will enter cooldown.`,
      image: 'SP_IconKelaitaB1',
    },
    lib: {
      level: lib,
      trace: `Resonance Liberation`,
      title: `New Wave Era`,
      content: `Deals <b class="text-wuwa-glacio">Glacio DMG</b> to all targets within range, inflicts <b class="text-violet-300">Dissociation</b> to the targets hit, and enters <b>Guns N' Roses</b> state. The DMG dealt is considered Resonance Skill DMG.
      <br />Can be cast in mid-air.
      <br />
      <br /><b class="text-violet-300">Dissociation</b>
      <br />Carlotta ignores <span class="text-desc">18%</span> of the target's DEF when dealing DMG to targets with <b class="text-violet-300">Dissociation</b>.
      <br />
      <br /><b>Guns N' Roses</b>
      <br />Using Basic Attack or Resonance Skill in <b>Guns N' Roses</b> state activates <b>Death Omen</b>. Each time <b>Death Omen</b> is cast, Carlotta gains <span class="text-desc">1</span> <b class="text-cyan-200">Mirror Shard</b>.
      <br />Upon reaching <span class="text-desc">4</span> <b class="text-cyan-200">Mirror Shards</b>, use Basic Attack or Resonance Skill to cast <b>Death's End</b>.
      <br />When entering or leaving <b>Guns N' Roses</b> state, Carlotta loses all of her <b class="text-yellow">Spirit Essence</b>.
      <br />In <b>Guns N' Roses</b> state, Carlotta cannot use her Heavy Attack, Heavy Attack <b>Restrictive Strategy</b>, and Heavy Attack <b>End of the Road</b>.
      <br />
      <br /><b>Death Omen</b>
      <br /><b>Death Omen</b> include <b>Death Omen: Burial</b> and <b>Death Omen: Eternal Slumber</b>.
      <br />After using <b>Death Omen</b>, Carlotta can swiftly dash in the direction of the arrow keys.
      <br />
      <br /><b>Death Omen: Burial</b>
      <br />Carlotta attacks with her blunderbuss, dealing <b class="text-wuwa-glacio">Glacio DMG</b>. The DMG dealt is considered Resonance Skill DMG.
      <br />
      <br /><b>Death Omen: Eternal Slumber</b>
      <br />Carlotta's blunderbuss shatters and turns into crystals to attack, dealing <b class="text-wuwa-glacio">Glacio DMG</b>. The DMG dealt is considered Resonance Skill DMG.
      <br />
      <br /><b>Death's End</b>
      <br />Deals <b class="text-wuwa-glacio">Glacio DMG</b> to the targets within certain range. The DMG dealt is considered Resonance Skill DMG.
      `,
      image: 'SP_IconKelaitaC1',
    },
    forte: {
      level: forte,
      trace: `Forte Circuit`,
      title: `Art Tour`,
      content: `<b>Heavy Attack: End of the Road</b>
      <br />Carlotta gains <b class="text-rose-200">Colored Crystal</b> every <span class="text-desc">22</span>s.
      <br />When <b class="text-yellow">Spirit Essence</b> is full and <b class="text-rose-200">Colored Crystal</b> is activated, hold Basic Attack to consume all <b class="text-yellow">Spirit Essence</b> and cast Heavy Attack <b>End of the Road</b>. After casting Heavy Attack <b>End of the Road</b>, <b>Colored Crystal</b> enters cooldown.
      <br />Deals <b class="text-wuwa-glacio">Glacio DMG</b> and reduces the cooldown of Resonance Skill <b>Violent Aesthetics</b> by <span class="text-desc">6</span>s.
      <br />
      <br /><b class="text-yellow">Spirit Essence</b>
      <br />Carlotta can hold up to <span class="text-desc">120</span> <b class="text-desc">Spirit Essence</b>.
      <br />Carlotta gains <span class="text-desc">30</span> <b class="text-yellow">Spirit Essence</b> when the Intro Skill <b>Winter's Lament</b> hits the target.
      <br />Carlotta gains <span class="text-desc">10</span> <b class="text-yellow">Spirit Essence</b> for each <b class="text-blue">Crystal</b> consumed when the Resonance Skill <b>Show Me Brilliance</b> hits the target.
      <br />Carlotta gains <span class="text-desc">30</span> <b class="text-yellow">Spirit Essence</b> when the Basic Attack <b>Necessary Means</b> on hit.
      <br />Carlotta gains <span class="text-desc">30</span> <b class="text-yellow">Spirit Essence</b> when the Dodge Counter hits the target.
      <br />
      <br /><b class="text-blue">Crystals</b>
      <br />Carlotta can hold up to <span class="text-desc">6</span> <b class="text-blue">Crystals</b>.
      <br />Carlotta gains <span class="text-desc">3</span> <b class="text-blue">Crystals</b> when casting Basic Attack 2.
      <br />Carlotta gains <span class="text-desc">3</span> <b class="text-blue">Crystals</b> when casting Heavy Attack.
      <br />Carlotta gains <span class="text-desc">3</span> <b class="text-blue">Crystals</b> when casting Mid-Air Attack <b>Courtesy Greeting</b>.
      <br />Carlotta gains <span class="text-desc">3</span> <b class="text-blue">Crystals</b> when casting Resonance Skill <b>Violent Aesthetics</b>.
      <br />Carlotta gains <span class="text-desc">3</span> <b class="text-blue">Crystals</b> after a successful Dodge.
      `,
      image: 'SP_IconKelaitaY',
    },
    intro: {
      level: intro,
      trace: `Intro Skill`,
      title: `Winter's Lament`,
      content: `Attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b>.`,
      image: 'SP_IconKelaitaQTE',
    },
    outro: {
      trace: `Outro Skill`,
      title: `Closing Speech`,
      content: `Attack the target, dealing <b class="text-wuwa-glacio">Glacio DMG</b> equal to <span class="text-desc">772.01%</span> of Carlotta's ATK.`,
      image: 'SP_IconKelaitaT',
    },
    i1: {
      trace: `Inherent Skill 1`,
      title: `Flawless Clarity`,
      content: `Casting Resonance Skill <b>Show Me Brilliance</b> will cause Carlotta to perform a Mid-Air Attack within a certain period of time. Carlotta becomes immune to damage until the Mid-Air Attack deals DMG.
      <br />Reduces STA cost of gliding by <span class="text-desc">20%</span>.`,
      image: 'SP_IconKelaitaD1',
    },
    i2: {
      trace: `Inherent Skill 2`,
      title: `Art First`,
      content: `Intro Skill <b>Winter's Lament</b>, Resonance Skill <b>Show Me Brilliance</b>, Resonance Liberation <b>Death Omen</b>, and Heavy Attack <b>End of the Road</b> can now inflict <b class="text-violet-300">Dissociation</b> to the targets hit.`,
      image: 'SP_IconKelaitaD2',
    },
    c1: {
      trace: `Sequence Node 1`,
      title: `N/A`,
      content: `After the Intro Skill <b>Winter's Lament</b> is cast, <span class="text-desc">3</span> <b class="text-blue">Crystals</b> are restored, and Coletta's <b class="text-wuwa-glacio">Glacio DMG Bonus</b> is increased by <span class="text-desc">30%</span> for <span class="text-desc">15</span>s.
      <br />When Resonance Skill <b>Show Me Brilliance</b> hits the target with <b class="text-cyan-200">Iridescence</b>, an additional <span class="text-desc">30</span> <b class="text-yellow">Spirit Essence</b> is restored.`,
      image: 'T_IconDevice_KelaitaM1_UI',
    },
    c2: {
      trace: `Sequence Node 2`,
      title: `N/A`,
      content: `When Carlotta deals DMG to the target with <b class="text-violet-300">Dissociation</b>, her Crit. Rate is increased by <span class="text-desc">15%</span> and her Crit. DMG is increased by <span class="text-desc">20%</span>.`,
      image: 'T_IconDevice_KelaitaM2_UI',
    },
    c3: {
      trace: `Sequence Node 3`,
      title: `N/A`,
      content: `Outro Skill <b>Closing Speech</b> launches an additional attack, dealing <b class="text-wuwa-glacio">Glacio DMG</b> equal to <span class="text-desc">779.67%</span> of Carlotta's ATK. The DMG Multiplier of Heavy Attack <b>End of the Road</b> is increased by <span class="text-desc">80%</span>.`,
      image: 'T_IconDevice_KelaitaM3_UI',
    },
    c4: {
      trace: `Sequence Node 4`,
      title: `N/A`,
      content: `After Heavy Attack, Heavy Attack <b>Restrictive Strategy</b>, or Heavy Attack <b>End of the Road</b> is cast, all nearby Resonators on the team gain <span class="text-desc">25%</span> Basic Attack DMG Bonus for <span class="text-desc">30</span>s.`,
      image: 'T_IconDevice_KelaitaM4_UI',
    },
    c5: {
      trace: `Sequence Node 5`,
      title: `N/A`,
      content: `Resonance Skill <b>Violent Aesthetics</b> increases Carlotta's ATK by <span class="text-desc">10%</span> for <span class="text-desc">20</span>s.`,
      image: 'T_IconDevice_KelaitaM5_UI',
    },
    c6: {
      trace: `Sequence Node 6`,
      title: `N/A`,
      content: `The DMG Multiplier of <b>Death Omen: Burial</b> is increased by <span class="text-desc">109%</span>, and each <b>Death Omen: Eternal Slumber</b> fires <span class="text-desc">1</span> additional shot. Resonance Liberation <b>Death Omen: Burial</b> inflicts <b class="text-cyan-200">Iridescence</b> when it hits the target. The effect is cleared when taking DMG or after <span class="text-desc">1</span>s.`,
      image: 'T_IconDevice_KelaitaM6_UI',
    },
  }

  const content: IContent[] = [
    {
      type: 'toggle',
      id: 'dissociation',
      text: `Dissociation`,
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
      text: `S4 Basic ATK Bonus`,
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
          name: 'Basic Attack: Necessary Means 1 DMG',
          value: [{ scaling: calcScaling(0.3315, normal), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Basic Attack: Necessary Means 2 DMG',
          value: [
            { scaling: calcScaling(0.3022, normal), multiplier: Stats.ATK },
            { scaling: calcScaling(0.3694, normal), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.BA,
        },
        {
          name: 'Basic Attack: Necessary Means 3 DMG',
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
          name: 'Heavy Attack: Courtesy Greeting DMG',
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
          name: 'Mid-Air Attack: Courtesy Greeting DMG',
          scale: Stats.ATK,
          value: [{ scaling: calcScaling(0.5432, normal), multiplier: Stats.ATK }],
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
          name: 'Violent Aesthetics DMG',
          value: [{ scaling: calcScaling(0.4641, skill), multiplier: Stats.ATK, hits: 2 }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Show Me Brilliance DMG',
          value: [
            { scaling: calcScaling(0.363, skill), multiplier: Stats.ATK, hits: 2 },
            { scaling: calcScaling(1.089, skill), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
      ]
      base.LIB_SCALING = [
        {
          name: 'New Wave Era DMG',
          value: [{ scaling: calcScaling(3.832, lib), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
        {
          name: 'Death Omen: Burial DMG',
          value: [{ scaling: calcScaling(1.7474, lib), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
          multiplier: c >= 6 ? 2.09 : 1,
        },
        {
          name: 'Death Omen: Eternal Slumber DMG',
          value: [{ scaling: calcScaling(0.138, lib), multiplier: Stats.ATK, hits: 4 }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
        {
          name: `Death's End DMG`,
          value: [{ scaling: calcScaling(6.1312, lib), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.SKILL,
        },
      ]
      base.FORTE_SCALING = [
        {
          name: 'Heavy Attack: End of the Road DMG',
          value: [
            { scaling: calcScaling(0.3362, forte), multiplier: Stats.ATK, hits: 5 },
            { scaling: calcScaling(2.5211, forte), multiplier: Stats.ATK },
          ],
          element: Element.GLACIO,
          property: TalentProperty.HA,
          multiplier: c >= 3 ? 1.8 : 1,
        },
      ]
      base.INTRO_SCALING = [
        {
          name: `Winter's Lament DMG`,
          value: [{ scaling: calcScaling(1.4, intro), multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.INTRO,
        },
      ]
      base.OUTRO_SCALING = [
        {
          name: `Closing Speech DMG`,
          value: [{ scaling: 7.2201, multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.OUTRO,
        },
      ]

      if (form.dissociation) {
        base.DEF_PEN.push({
          value: 0.18,
          name: `Dissociation`,
          source: 'Self',
        })
        if (c >= 2) {
          base[Stats.CRIT_RATE].push({
            value: 0.15,
            name: `Sequence Node 2`,
            source: 'Self',
          })
          base[Stats.CRIT_DMG].push({
            value: 0.2,
            name: `Sequence Node 2`,
            source: 'Self',
          })
        }
      }
      if (form.carlotta_c1) {
        base[Stats.GLACIO_DMG].push({
          value: 0.3,
          name: `Sequence Node 1`,
          source: 'Self',
        })
      }
      if (c >= 3) {
        base.OUTRO_SCALING.push({
          name: `Additional Closing Speech DMG`,
          value: [{ scaling: 7.7967, multiplier: Stats.ATK }],
          element: Element.GLACIO,
          property: TalentProperty.OUTRO,
        })
      }
      if (form.carlotta_c4) {
        base[Stats.BASIC_DMG].push({
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
        base[Stats.BASIC_DMG].push({
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
