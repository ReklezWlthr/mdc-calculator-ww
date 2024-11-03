import { ITeamChar } from '@src/domain/constant'
import { StatsObject } from '../lib/stats/baseConstant'
import { EnergyMeta } from '../stores/energy_store'
import _ from 'lodash'

export interface EnergyCallbackProps {
  totalRotation: number
  char: ITeamChar
  stats: StatsObject
  generator: EnergyMeta
  receiver: EnergyMeta
}

interface BaseEnergy {
  name: string
  source: string
}

export interface IAutoEnergy extends BaseEnergy {
  getEnergy: (props: EnergyCallbackProps) => number
}

export interface ITriggerEnergy extends BaseEnergy {
  detail: React.ReactNode
  type: 'self' | 'everyone' | 'others'
  show: (c: number, a: number) => boolean
}

export const AutoEnergy: IAutoEnergy[] = [
  {
    name: `Dori's Burst`,
    source: '10000068',
    getEnergy: (props) => {
      const base = 1.5 + 0.1 * _.min([props.char.talents.burst + (props.char.cons >= 3 ? 3 : 0), 10])
      const uptime = _.min([20, props.totalRotation])
      const energy = ((base / 2) * uptime) / (props.totalRotation * _.max([1, props.generator.rpb]))
      return energy * props.receiver.fieldTime * _.max([1, props.receiver.rpb])
    },
  },
  {
    name: `Dori's A4`,
    source: '10000068',
    getEnergy: (props) => {
      if (props.receiver.cId !== '10000068' || props.char.ascension < 4) return 0
      return 5 * props.receiver.skill[0].proc * _.max([1, props.receiver.rpb])
    },
  },
  {
    name: `Albedo's C1`,
    source: '10000038',
    getEnergy: (props) => {
      if (props.receiver.cId !== '10000038' || props.char.cons < 1) return 0
      const base = 1.2
      const uptime = _.min([30 * props.generator.skill[0].proc, props.totalRotation]) * _.max([1, props.generator.rpb])
      const energy = (base / 2) * uptime
      return energy
    },
  },
  {
    name: `Barbara's C1`,
    source: '10000014',
    getEnergy: (props) => {
      if (props.receiver.cId !== '10000014' || props.char.cons < 1) return 0
      return _.floor((props.totalRotation * _.max([1, props.generator.rpb])) / 10)
    },
  },
  {
    name: `Dendro Traveler's C1`,
    source: '10000005-508',
    getEnergy: (props) => {
      if (props.receiver.cId !== '10000005-508' || props.char.cons < 1) return 0
      return props.generator.skill[0].proc * _.max([1, props.generator.rpb]) * 3.5
    },
  },
  {
    name: `Diona's C1`,
    source: '10000039',
    getEnergy: (props) => {
      if (props.receiver.cId !== '10000039' || props.char.cons < 1) return 0
      return 15
    },
  },
  {
    name: `Dehya's C4`,
    source: '10000079',
    getEnergy: (props) => {
      if (props.receiver.cId !== '10000079' || props.char.cons < 4) return 0
      return 15
    },
  },
  {
    name: `Venti's A4`,
    source: '10000022',
    getEnergy: (props) => {
      if (props.receiver.cId !== '10000022' || props.char.ascension < 4) return 0
      return 15
    },
  },
  {
    name: `Kaeya's C6`,
    source: '10000015',
    getEnergy: (props) => {
      if (props.receiver.cId !== '10000015' || props.char.cons < 6) return 0
      return 15
    },
  },
  {
    name: `Jean's A4`,
    source: '10000003',
    getEnergy: (props) => {
      if (props.receiver.cId !== '10000003' || props.char.ascension < 4) return 0
      return 16
    },
  },
  {
    name: `Furina's C4`,
    source: '10000089',
    getEnergy: (props) => {
      if (props.receiver.cId !== '10000089' || props.char.cons < 4) return 0
      const uptime = _.min([30 * props.generator.skill[0].proc, props.totalRotation]) * _.max([1, props.generator.rpb])
      return 0.8 * uptime
    },
  },
  {
    name: `Nilou's C4`,
    source: '10000070',
    getEnergy: (props) => {
      if (props.receiver.cId !== '10000070' || props.char.cons < 4) return 0
      return 15 * props.generator.skill[0].proc * _.max([1, props.generator.rpb])
    },
  },
  {
    name: `Razor's Sigil`,
    source: '10000020',
    getEnergy: (props) => {
      if (props.receiver.cId !== '10000020') return 0
      return 5 * props.generator.skill[0].proc * _.max([1, props.generator.rpb])
    },
  },
  {
    name: `Sethos's Charged Shot`,
    source: '10000097',
    getEnergy: (props) => {
      if (props.receiver.cId !== '10000097') return 0
      const full = -20 * props.generator.skill[1].proc * _.max([1, props.generator.rpb])
      const half = -10 * props.generator.skill[2].proc * _.max([1, props.generator.rpb])
      return full + half
    },
  },
  {
    name: `Thoma's C4`,
    source: '10000050',
    getEnergy: (props) => {
      if (props.receiver.cId !== '10000050' || props.char.cons < 4) return 0
      return 15
    },
  },
]

export const TriggerEnergy: ITriggerEnergy[] = [
  {
    name: `Amenoma Kageuchi`,
    detail: (
      <p>
        Gains <span className="text-desc">6/7.5/9/10.5/12</span> Energy per Skill use when Burst
      </p>
    ),
    source: '11414',
    type: 'self',
    show: () => true,
  },
  {
    name: `Crane's Echoing Call`,
    detail: (
      <p>
        Gains <span className="text-desc">2.5/2.75/3/3.25/3.5</span> Energy when allies uses a Plunging Attack, once
        every <span className="text-desc">0.7</span>s
      </p>
    ),
    source: '14515',
    type: 'self',
    show: () => true,
  },
  {
    name: `Dialogues of the Desert Sages`,
    detail: (
      <p>
        Gains <span className="text-desc">8/10/12/14/16</span> Energy after healing, once every{' '}
        <span className="text-desc">10</span>s
      </p>
    ),
    source: '13426',
    type: 'self',
    show: () => true,
  },
  {
    name: `Everlasting Moonglow`,
    detail: (
      <p>
        Gains <span className="text-desc">0.6</span> Energy per Normal Attack
      </p>
    ),
    source: '14506',
    type: 'self',
    show: () => true,
  },
  {
    name: `Jadefall's Splendor`,
    detail: (
      <p>
        Gains <span className="text-desc">4.5/5/5.5/6/6.5</span> Energy every <span className="text-desc">10</span>s
        after Burst or shielding
      </p>
    ),
    source: '14505',
    type: 'self',
    show: () => true,
  },
  {
    name: `Katsuragikiri Nagamasa`,
    detail: (
      <div>
        <p>
          Gains <span className="text-desc">6/7.5/9/10.5/12</span> Energy per trigger
        </p>
        <p>
          If there is no Energy to drain, add another <span className="text-desc">3</span> Energy per trigger
        </p>
      </div>
    ),
    source: '12414',
    type: 'self',
    show: () => true,
  },
  {
    name: `Kitain Cross Spear`,
    detail: (
      <div>
        <p>
          Gains <span className="text-desc">6/7.5/9/10.5/12</span> Energy per trigger
        </p>
        <p>
          If there is no Energy to drain, add another <span className="text-desc">3</span> Energy per trigger
        </p>
      </div>
    ),
    source: '13414',
    type: 'self',
    show: () => true,
  },
  {
    name: `Portable Power Saw`,
    detail: (
      <p>
        Gains <span className="text-desc">2/2.5/3/3.5/4</span> Energy per <b>Stoic</b> consumed, up to{' '}
        <span className="text-desc">6/7.5/9/10.5/12</span>
      </p>
    ),
    source: '12427',
    type: 'self',
    show: () => true,
  },
  {
    name: `Prototype Amber`,
    detail: (
      <p>
        Gains <span className="text-desc">12/13.5/15/16.5/18</span> Energy after Burst
      </p>
    ),
    source: '14406',
    type: 'self',
    show: () => true,
  },
  {
    name: `Rightful Reward`,
    detail: (
      <p>
        Gains <span className="text-desc">8/10/12/14/16</span> Energy when healed, once every{' '}
        <span className="text-desc">10</span>s
      </p>
    ),
    source: '13425',
    type: 'self',
    show: () => true,
  },
  {
    name: `The Dockhand's Assistant`,
    detail: (
      <p>
        Gains <span className="text-desc">2/2.5/3/3.5/4</span> Energy per <b>Stoic</b> consumed, up to{' '}
        <span className="text-desc">6/7.5/9/10.5/12</span>
      </p>
    ),
    source: '11427',
    type: 'self',
    show: () => true,
  },
  {
    name: `Tome of the Eternal Flow`,
    detail: (
      <p>
        Gains <span className="text-desc">8/9/10/11/12</span> Energy when reaching <span className="text-desc">3</span>{' '}
        stacks
      </p>
    ),
    source: '14514',
    type: 'self',
    show: () => true,
  },
  {
    name: `Arlecchino's C4`,
    detail: (
      <p>
        Gains <span className="text-desc">15</span> Energy when consuming{' '}
        <b className="text-genshin-pyro">Blood-Debt Directive</b>, once every <span className="text-desc">10</span>s
      </p>
    ),
    source: '10000096',
    type: 'self',
    show: (c) => c >= 4,
  },
  {
    name: `Ayato's A4`,
    detail: (
      <p>
        Gains <span className="text-desc">2</span> Energy per second while off-field and below{' '}
        <span className="text-desc">40</span> Energy
      </p>
    ),
    source: '10000066',
    type: 'self',
    show: (_c, a) => a >= 4,
  },
  {
    name: `Barbara's C4`,
    detail: (
      <p>
        Gains <span className="text-desc">1</span> Energy per target hit, up to <span className="text-desc">5</span> per
        attack
      </p>
    ),
    source: '10000014',
    type: 'self',
    show: (c) => c >= 1,
  },
  {
    name: `Charlette's C2`,
    detail: (
      <p>
        Gains <span className="text-desc">2</span> Energy per marked target hit by Burst, up to{' '}
        <span className="text-desc">10</span> per cast
      </p>
    ),
    source: '10000088',
    type: 'self',
    show: (c) => c >= 2,
  },
  {
    name: `Chasca's C4`,
    detail: (
      <p>
        Gains <span className="text-desc">1.5</span> Energy when <b>Radiant Soulseeker Shells</b> hit, up to{' '}
        <span className="text-desc">0/3/6/9</span> per cast
      </p>
    ),
    source: '10000104',
    type: 'self',
    show: (c) => c >= 4,
  },
  {
    name: `Chevreuse's C1`,
    detail: (
      <p>
        Gives <span className="text-desc">6</span> Energy to <b className="text-blue">an ally</b> with{' '}
        <b>Coordinated Tactics</b> that triggers Overload, once every <span className="text-desc">10</span>s
      </p>
    ),
    source: '10000090',
    type: 'everyone',
    show: (c) => c >= 1,
  },
  {
    name: `Chongyun's C4`,
    detail: (
      <p>
        Gains <span className="text-desc">1</span> Energy when hitting an enemy affected by{' '}
        <b className="text-genshin-cryo">Cryo</b>, once every <span className="text-desc">2</span>s
      </p>
    ),
    source: '10000036',
    type: 'self',
    show: (c) => c >= 4,
  },
  {
    name: `Cyno's C4`,
    detail: (
      <p>
        Gives <span className="text-desc">3</span> Energy to <b className="text-blue">other allies</b> per Reaction
        during Burst, up to <span className="text-desc">15</span> per cast
      </p>
    ),
    source: '10000071',
    type: 'others',
    show: (c) => c >= 4,
  },
  {
    name: `Faruzan's C4`,
    detail: (
      <p>
        Gains <span className="text-desc">2</span> Energy when a <b className="text-genshin-anemo">Vortex</b> hits an
        enemy, <span className="text-desc">+0.5</span> for each additional enemy, up to{' '}
        <span className="text-desc">4</span> per use
      </p>
    ),
    source: '10000076',
    type: 'self',
    show: (c) => c >= 4,
  },
  {
    name: `Freminet's C2`,
    detail: (
      <p>
        Gains <span className="text-desc">2</span> Energy when using <b>Shattering Pressure</b>, increased to{' '}
        <span className="text-desc">3</span> at <b>Pressure Level</b> <span className="text-desc">4</span>
      </p>
    ),
    source: '10000085',
    type: 'self',
    show: (c) => c >= 2,
  },
  {
    name: `Gaming's C4`,
    detail: (
      <p>
        Gains <span className="text-desc">2</span> Energy when <b>Charmed Cloudstrider</b> hits an enemy, once every{' '}
        <span className="text-desc">0.2</span>s
      </p>
    ),
    source: '10000092',
    type: 'self',
    show: (c) => c >= 4,
  },
  {
    name: `Ganyu's C1`,
    detail: (
      <p>
        Gains <span className="text-desc">2</span> Energy when <b>Frostflake Arrow</b> hits an enemy, once per shot
      </p>
    ),
    source: '10000037',
    type: 'self',
    show: (c) => c >= 1,
  },
  {
    name: `Heizou's C4`,
    detail: (
      <p>
        Gains <span className="text-desc">9</span> Energy when the first <b>Iris</b> explodes,{' '}
        <span className="text-desc">+1.5</span> Energy from each additional explosion, up to{' '}
        <span className="text-desc">13.5</span> per cast
      </p>
    ),
    source: '10000059',
    type: 'self',
    show: (c) => c >= 4,
  },
  {
    name: `Kazuha's C4`,
    detail: (
      <p>
        Gains <span className="text-desc">3</span> Energy per Skill Press while below{' '}
        <span className="text-desc">45</span> Energy; gains <span className="text-desc">4</span> if Held
      </p>
    ),
    source: '10000047',
    type: 'self',
    show: (c) => c >= 4,
  },
  {
    name: `Kinich's C4`,
    detail: (
      <p>
        Gains <span className="text-desc">5</span> Energy when firing <b>Loop Shots</b> or <b>Scalespiker Cannon</b>,
        once every <span className="text-desc">2.8</span>s
      </p>
    ),
    source: '10000101',
    type: 'self',
    show: (c) => c >= 4,
  },
  {
    name: `Kokomi's C4`,
    detail: (
      <p>
        Gains <span className="text-desc">0.8</span> Energy per Normal Attacks during Burst, once every{' '}
        <span className="text-desc">0.2</span>s
      </p>
    ),
    source: '10000054',
    type: 'self',
    show: (c) => c >= 4,
  },
  {
    name: `Klee's A4`,
    detail: (
      <p>
        Gives <span className="text-desc">2</span> Energy to <b className="text-blue">everyone</b> when her Charged
        Attack crits
      </p>
    ),
    source: '10000029',
    type: 'everyone',
    show: (_c, a) => a >= 4,
  },
  {
    name: `Klee's C6`,
    detail: (
      <p>
        Gives <span className="text-desc">3</span> Energy to <b className="text-blue">other allies</b> every{' '}
        <span className="text-desc">3</span>s during Burst
      </p>
    ),
    source: '10000029',
    type: 'others',
    show: (c) => c >= 6,
  },
  {
    name: `Layla's C2`,
    detail: (
      <p>
        Gains <span className="text-desc">4</span> Energy per <b>Volley</b> hit
      </p>
    ),
    source: '10000074',
    type: 'self',
    show: (c) => c >= 2,
  },
  {
    name: `Lisa's C1`,
    detail: (
      <p>
        Gains <span className="text-desc">2</span> Energy per enemy hit by her Skill Hold
      </p>
    ),
    source: '10000006',
    type: 'self',
    show: (c) => c >= 1,
  },
  {
    name: `Lyney's A1`,
    detail: (
      <p>
        Gains <span className="text-desc">3</span> Energy when <b>Prop Arrow</b> hits after consuming HP
      </p>
    ),
    source: '10000084',
    type: 'self',
    show: (_c, a) => a >= 1,
  },
  {
    name: `Mika's C4`,
    detail: (
      <p>
        Gains <span className="text-desc">3</span> Energy when his Burst heals, up to{' '}
        <span className="text-desc">15</span> per use
      </p>
    ),
    source: '10000080',
    type: 'self',
    show: (c) => c >= 4,
  },
  {
    name: `Mualani's C4`,
    detail: (
      <p>
        Gains <span className="text-desc">8</span> Energy per <b>Puffer</b> caught, up to{' '}
        <span className="text-desc">16</span> per use
      </p>
    ),
    source: '10000102',
    type: 'self',
    show: (c) => c >= 4,
  },
  {
    name: `Navia's C1`,
    detail: (
      <p>
        Gains <span className="text-desc">3</span> Energy per <b>Crystal Shrapnel</b> consumed, up to{' '}
        <span className="text-desc">9</span> per cast
      </p>
    ),
    source: '10000091',
    type: 'self',
    show: (c) => c >= 1,
  },
  {
    name: `Ororon's A4`,
    detail: (
      <div>
        <p>
          Gives <span className="text-desc">3</span> Energy to <b className="text-blue">an active character</b> when
          their Normal Attack, Charged Attack or Plunge Attack hits during <b>Aspect Sigil</b>, once every{' '}
          <span className="text-desc">1</span>s, up to <span className="text-desc">9</span> per cast
        </p>
        <p>
          - If Ororon is off-field, also gains <span className="text-desc">3</span> Energy himself
        </p>
      </div>
    ),
    source: '10000105',
    type: 'everyone',
    show: (_c, a) => a >= 4,
  },
  {
    name: `Qiqi's C1`,
    detail: (
      <p>
        Gains <span className="text-desc">2</span> Energy per Skill hit against an enemy with Burst mark
      </p>
    ),
    source: '10000035',
    type: 'self',
    show: (c) => c >= 1,
  },
  {
    name: `Raiden's Burst`,
    detail: (
      <div>
        <p>
          Gives <span className="text-desc">1.6~2.5</span> Energy per attack to <b className="text-blue">everyone</b>{' '}
          during Burst, increased by <span className="text-desc">60%</span> of ER beyond the base{' '}
          <span className="text-desc">100%</span>, up to <span className="text-desc">5</span> times per use
        </p>
        <p>
          - <span className="text-desc">12.5</span> Energy at base ER
        </p>
        <p>
          - <span className="text-desc">20</span> Energy at <span className="text-desc">200%</span> ER
        </p>
        <p>
          - <span className="text-desc">25</span> Energy at <span className="text-desc">266.67%</span> ER
        </p>
      </div>
    ),
    source: '10000052',
    type: 'everyone',
    show: () => true,
  },
  {
    name: `Rosaria's C4`,
    detail: (
      <p>
        Gains <span className="text-desc">5</span> Energy when her Skill crits
      </p>
    ),
    source: '10000045',
    type: 'self',
    show: (c) => c >= 4,
  },
  {
    name: `Sara's A4`,
    detail: (
      <div>
        <p>
          Gives <span className="text-desc">1.2</span> Energy to <b className="text-blue">everyone</b> for every{' '}
          <span className="text-desc">100%</span> ER she has when her <b>Ambush</b> hits
        </p>
      </div>
    ),
    source: '10000056',
    type: 'everyone',
    show: (_c, a) => a >= 4,
  },
  {
    name: `Sayu's C4`,
    detail: (
      <div>
        <p>
          Gains <span className="text-desc">1.2</span> Energy when she Swirls, once every{' '}
          <span className="text-desc">2</span>s
        </p>
        <p className="italic font-semibold text-red">**ONLY TRIGGERS WHEN SAYU IS ON-FIELD**</p>
      </div>
    ),
    source: '10000053',
    type: 'self',
    show: (c) => c >= 4,
  },
  {
    name: `Sethos's Skill`,
    detail: (
      <p>
        Gains <span className="text-desc">12</span> Energy when his Skill triggers a Reaction
      </p>
    ),
    source: '10000097',
    type: 'self',
    show: () => true,
  },
  {
    name: `Sigewinne's Skill`,
    detail: (
      <p>
        Gains <span className="text-desc">1</span> Energy per <span className="text-desc">2,000</span>{' '}
        <b className="text-genshin-bol">Bond of Life</b> cleared, up to <span className="text-desc">5</span>
      </p>
    ),
    source: '10000095',
    type: 'self',
    show: () => true,
  },
  {
    name: `Tartaglia's Ranged Burst`,
    detail: (
      <p>
        Refunds <span className="text-desc">20</span> Energy if he uses Ranged Burst
      </p>
    ),
    source: '10000033',
    type: 'self',
    show: () => true,
  },
  {
    name: `Tartaglia's C2`,
    detail: (
      <div>
        <p>
          Gains <span className="text-desc">4</span> Energy when enemies affected by{' '}
          <b className="text-genshin-hydro">Riptide</b> are defeated
        </p>
        <p className="italic font-semibold text-red">**DIVIDE THE TOTAL AMOUNT BY ROTATION USED**</p>
      </div>
    ),
    source: '10000033',
    type: 'self',
    show: (c) => c >= 2,
  },
  {
    name: `Electro Traveler's Amulet`,
    detail: (
      <div>
        <p>
          Gives <span className="text-desc">3~4</span> Energy to whoever consumes an{' '}
          <b className="text-violet-300">Amulet</b>; Skill spawns <span className="text-desc">2</span>{' '}
          <b className="text-violet-300">Amulets</b>, increased to <span className="text-desc">3</span> at <b>C1</b>
        </p>
        <p>
          At <b>C4</b>, <b className="text-violet-300">Amulet</b> gives <span className="text-desc">double</span> Energy
          if the character's Energy is below <span className="text-desc">35%</span>
        </p>
      </div>
    ),
    source: '10000005-507',
    type: 'everyone',
    show: () => true,
  },
  {
    name: `Electro Traveler's Burst`,
    detail: (
      <div>
        <p>
          Gives <span className="text-desc">0.8~1</span> Energy per attack to{' '}
          <b className="text-blue">the active character</b> per NA/CA hit during his/her during Burst, once every{' '}
          <span className="text-desc">0.5</span>s
        </p>
        <p>
          At <b>C6</b>, every third attack recovers <span className="text-desc">1</span> extra Energy
        </p>
      </div>
    ),
    source: '10000005-507',
    type: 'everyone',
    show: () => true,
  },
  {
    name: `Geo Traveler's C4`,
    detail: (
      <p>
        Gains <span className="text-desc">5</span> Energy per enemy hit by Burst, up to{' '}
        <span className="text-desc">25</span> per use
      </p>
    ),
    source: '10000005-506',
    type: 'self',
    show: (c) => c >= 2,
  },
  {
    name: `Hydro Traveler's C1`,
    detail: (
      <p>
        Gains <span className="text-desc">2</span> Energy per <b className="text-blue">Droplet</b> consumed; Skill
        spawns up to <span className="text-desc">4</span> <b className="text-blue">Droplets</b> per use
      </p>
    ),
    source: '10000005-503',
    type: 'self',
    show: (c) => c >= 1,
  },
  {
    name: `Venti's A4`,
    detail: (
      <p>
        Gives <span className="text-desc">15</span> Energy to <b className="text-blue">anyone</b> of the{' '}
        <b>Elemental Type</b> absorbed by his Burst
      </p>
    ),
    source: '10000022',
    type: 'others',
    show: (_c, a) => a >= 4,
  },
  {
    name: `Wanderer's A1`,
    detail: (
      <p>
        Gains <span className="text-desc">0.8</span> Energy per NA/CA hit during{' '}
        <b className="text-genshin-electro">Electro</b>-infused Skill; usually gives{' '}
        <span className="text-desc">13</span> Energy per use
      </p>
    ),
    source: '10000075',
    type: 'self',
    show: (_c, a) => a >= 1,
  },
  {
    name: `Xingqiu's C6`,
    detail: (
      <p>
        Gains <span className="text-desc">3</span> Energy every third sword rain attack; usually gives{' '}
        <span className="text-desc">12</span> Energy per use
      </p>
    ),
    source: '10000025',
    type: 'self',
    show: (c) => c >= 6,
  },
  {
    name: `Yae's C1`,
    detail: (
      <p>
        Gains <span className="text-desc">8</span> Energy per Burst hit, up to <span className="text-desc">24</span> at{' '}
        <span className="text-desc">3</span> <b className="text-genshin-electro">Sakura</b> consumed
      </p>
    ),
    source: '10000058',
    type: 'self',
    show: (c) => c >= 1,
  },
  {
    name: `Yaoyao's C2`,
    detail: (
      <p>
        Gains <span className="text-desc">3</span> Energy per <b>Radish</b> hit during Burst, once every{' '}
        <span className="text-desc">0.8</span>s, up to <span className="text-desc">18</span> per cast
      </p>
    ),
    source: '10000077',
    type: 'self',
    show: (c) => c >= 2,
  },
  {
    name: `Scholar`,
    detail: (
      <div>
        <p>
          Gains <span className="text-desc">3</span> Energy when the equipping character gains a Particle, once every{' '}
          <span className="text-red">3</span>s
        </p>
        <p className="italic font-semibold text-red">**ONLY BOW AND CATALYST USERS GAIN ENERGY**</p>
      </div>
    ),
    source: '3618167299_4',
    type: 'everyone',
    show: () => true,
  },
  {
    name: `Scroll of the Hero of Cinder City`,
    detail: (
      <div>
        <p>
          Gains <span className="text-desc">6</span> Energy per <b>Nightsoul Burst</b>
        </p>
        <p>
          - Xilonen's <b>A4</b> can trigger an additional <b>Nightsoul Burst</b>
        </p>
        <p className="italic font-semibold text-red">**REQUIRES A NATLAN CHARACTER IN A TEAM**</p>
      </div>
    ),
    source: '2949388203_2',
    type: 'self',
    show: () => true,
  },
  {
    name: `Shimenawa's Reminiscence`,
    detail: (
      <p>
        Loses <span className="text-red">15</span> Energy per trigger
      </p>
    ),
    source: '4144069251_4',
    type: 'self',
    show: () => true,
  },
  {
    name: `The Exile`,
    detail: (
      <div>
        <p>
          Gives <span className="text-desc">6</span> Energy to <b className="text-blue">other allies</b> when Burst
        </p>
      </div>
    ),
    source: '2764598579_4',
    type: 'others',
    show: () => true,
  },
]
