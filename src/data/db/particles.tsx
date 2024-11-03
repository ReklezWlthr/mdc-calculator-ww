// PPS is calculated by (Particle per trigger x (Duration / CD) rounded down) / Duration
// Variance (Modifier on the chance of gaining extra particle) is Particle's decimal / Total Particle

import { BulletPoint } from '@src/presentation/components/collapsible'

export interface IParticle {
  name: string
  default: number
  value: number
  variance: number
  pps?: number
  duration?: number
  tips?: React.ReactNode
}

export const ParticleCount: (id: string, c: number) => IParticle[] = (id, c) =>
  ({
    '10000005-504': [
      { name: 'Skill Press', default: 1, value: 2, variance: 0 },
      { name: 'Skill Hold', default: 1, value: 10 / 3, variance: 0.1 },
    ],
    '10000005-508': [{ name: 'Skill Cast', default: 1, value: 2.5, variance: 0.2 }],
    '10000005-507': [{ name: 'Skill Cast', default: 1, value: 1, variance: 0 }],
    '10000005-506': [{ name: 'Skill Cast', default: 1, value: 10 / 3, variance: 0.1 }],
    '10000005-503': [{ name: 'Skill Cast', default: 1, value: 10 / 3, variance: 0.1 }],
    '10000038': [{ name: 'Skill Cast', default: 1, value: 0, variance: 0.5, pps: 0.3, duration: 30 }],
    '10000078': [
      {
        name: 'Projection Attack',
        default: 0,
        value: 1,
        variance: 0,
        tips: (
          <div>
            <b>Alhaitham</b>'s <b className="text-genshin-dendro">Projection Attacks</b> have{' '}
            <span className="text-desc">1.6</span>s ICD, generating up to <span className="text-desc">3/5/8</span>{' '}
            Particles over <span className="text-desc">4/8/12</span>s.
          </div>
        ),
      },
      { name: '3-Mirror Full Uptime', default: 1, value: 8, variance: 0 },
    ],
    '10000057': [{ name: 'Skill Cast', default: 1, value: 3.5, variance: 0.5 / 3.5 }],
    '10000082': [{ name: 'Skill Cast', default: 1, value: 3.5, variance: 0.5 / 3.5 }],
    '10000021': [
      {
        name: 'Skill Cast',
        default: 1,
        value: 4,
        variance: 0,
        tips: (
          <div>
            <b>Amber</b> generate Particles when their Skill expires/detonates; feed their Particles to whoever is
            on-field at the time.
          </div>
        ),
      },
    ],
    '10000024': [
      { name: 'No Charge', default: 1, value: 2, variance: 0 },
      { name: '1 Charge', default: 0, value: 3, variance: 0 },
      { name: 'Full Charge', default: 0, value: 4, variance: 0 },
    ],
    '10000032': [
      { name: 'Skill Press', default: 1, value: 2.25, variance: 0.25 / 2.25 },
      { name: 'Skill Hold', default: 0, value: 3, variance: 0 },
    ],
    '10000072': [
      { name: 'Skill Press', default: 1, value: 2, variance: 0 },
      { name: 'Skill Hold', default: 0, value: 3, variance: 0 },
    ],
    '10000088': [
      { name: 'Skill Press', default: 1, value: 3, variance: 0 },
      { name: 'Skill Hold', default: 0, value: 5, variance: 0 },
    ],
    '10000090': [
      {
        name: 'Skill Cast',
        default: 1,
        value: 4,
        variance: 0,
        tips: (
          <div>
            <b>Chevreuse</b>'s <b className="text-genshin-pyro">Skill</b> has <span className="text-desc">10</span>s
            ICD.
            <div className="mt-1 ml-1">
              <BulletPoint color="text-desc">
                <b>Constellation 4</b> resets CD.
              </BulletPoint>
            </div>
          </div>
        ),
      },
    ],
    '10000094': [
      {
        name: 'Skill Cast',
        default: 1,
        value: 0,
        variance: 0.2,
        pps: 0.33,
        duration: 17,
        tips: (
          <div>
            <b>Chiori</b>'s <b className="text-genshin-geo">Extra Tamoto</b> does <b className="text-red">NOT</b>{' '}
            generate any Particles. You will not generate any Particle if the main{' '}
            <b className="text-genshin-geo">Tamoto</b> cannot land any hit.
          </div>
        ),
      },
    ],
    '10000036': [{ name: 'Skill Cast', default: 1, value: 4, variance: 0 }],
    '10000067': [{ name: 'Skill Cast', default: 1, value: 3, variance: 0 }],
    '10000071': [
      { name: 'Skill Cast', default: 1, value: 3, variance: 0 },
      { name: 'Skill Cast [Burst]', default: 0, value: 4 / 3, variance: 0.25 },
    ],
    '10000079': [
      {
        name: 'Skill Cast',
        default: 1,
        value: 0,
        variance: 0.5,
        pps: 0.33,
        duration: c >= 2 ? 18 : 12,
        tips: (
          <div>
            During <b>Dehya</b>'s Burst, her <b className="text-genshin-pyro">Fiery Sanctum</b> will not generate
            Particles.
          </div>
        ),
      },
    ],
    '10000016': [
      { name: 'Skill Cast', default: 0, value: 4 / 3, variance: 1 / 4 },
      { name: '3-Cast Combo', default: 1, value: 3.75, variance: 1 / 5 },
    ],
    '10000039': [
      { name: 'Skill Press', default: 1, value: 1.6, variance: 0.6 / 1.6 },
      { name: 'Skill Hold', default: 0, value: 4, variance: 0.25 },
    ],
    '10000068': [{ name: 'Skill Cast', default: 1, value: 2, variance: 0 }],
    '10000051': [
      { name: 'Skill Press', default: 1, value: 1.5, variance: 0.5 / 1.5 },
      { name: 'Skill Hold', default: 0, value: 2.5, variance: 0.5 / 2.5 },
    ],
    '10000076': [
      {
        name: 'Vortex',
        default: 1,
        value: 2,
        variance: 0,
        tips: (
          <div>
            <b>Faruzan</b>'s <b className="text-genshin-anemo">Pressurized Collapses</b> have
            <span className="text-desc">5.5</span>s ICD; shared with her C6.
          </div>
        ),
      },
    ],
    '10000031': [
      {
        name: 'Skill Cast',
        default: 0.5,
        value: 0,
        variance: 0.5,
        pps: 2 / 3,
        duration: c >= 6 ? 12 : 10,
        tips: (
          <div>
            <b>Fischl</b>'s' Burst also summons <b className="text-genshin-electro">Oz</b> which acts as an extra Skill
            cast but is not counted towards one. Her default preset is <span className="text-desc">0.5</span>{' '}
            <b>Skill Cast</b> and <span className="text-desc">2</span> <b>Rotations per Burst</b> which means she will
            alternate Skill and Burst every rotation.
          </div>
        ),
      },
    ],
    '10000085': [
      { name: 'Skill Cast', default: 1, value: 2, variance: 0 },
      { name: 'Skill Cast [Burst]', default: 0, value: 1, variance: 0 },
      { name: 'Pressure Level 4', default: 1, value: 1, variance: 0 },
    ],
    '10000089': [{ name: 'Skill Cast', default: 1, value: 0, variance: 0.5, pps: 0.3, duration: 30 }],
    '10000092': [
      {
        name: 'Charmed Cloudstrider',
        default: 1,
        value: 2,
        variance: 0,
        tips: (
          <div>
            <b>Gaming</b>'s <b className="text-genshin-pyro">Charmed Cloudstrider</b> has{' '}
            <span className="text-desc">3</span>s ICD.
          </div>
        ),
      },
    ],
    '10000037': [
      {
        name: 'Skill Cast',
        default: 1,
        value: 4,
        variance: 0,
        tips: (
          <div>
            <b>Ganyu</b>'s <b className="text-genshin-cryo">Lotus</b> generates Particles twice - once on initial hit
            and again upon its explosion; feed <span className="text-desc">half</span> the Particles to whoever is
            on-field at the time of the explosion.
          </div>
        ),
      },
    ],
    '10000055': [{ name: 'Skill Cast', default: 1, value: 2, variance: 0 }],
    '10000046': [
      {
        name: 'Converted Attack',
        default: 0,
        value: 2.5,
        variance: 1 / 5,
        tips: (
          <div>
            <b>Hu Tao</b>'s <b className="text-genshin-pyro">Converted Attacks</b> have{' '}
            <span className="text-desc">5</span>s ICD, generating up to <span className="text-desc">2</span> Particles
            over <span className="text-desc">9</span>s.
          </div>
        ),
      },
      { name: 'Full Uptime', default: 1, value: 4.8, variance: 1 / 6 },
    ],
    '10000003': [{ name: 'Skill Cast', default: 1, value: 8 / 3, variance: 0.25 }],
    '10000047': [
      { name: 'Skill Press', default: 1, value: 3, variance: 0 },
      { name: 'Skill Hold', default: 0, value: 4, variance: 0 },
    ],
    '10000015': [
      { name: 'No Freeze', default: 1, value: 8 / 3, variance: 0.25 },
      { name: '1 Freeze', default: 0, value: 11 / 3, variance: 2 / 11 },
      { name: '2 Freeze', default: 0, value: 14 / 3, variance: 1 / 7 },
    ],
    '10000002': [{ name: 'Skill Cast', default: 1, value: 4.5, variance: 1 / 9 }],
    '10000066': [
      {
        name: 'Shunsuiken Hit',
        default: 0,
        value: 1.5,
        variance: 1 / 3,
        tips: (
          <div>
            <b>Ayato</b>'s <b className="text-genshin-hydro">Shunsuiken</b> has <span className="text-desc">2.5</span>s
            ICD, generating up to <span className="text-desc">3</span> Particles over{' '}
            <span className="text-desc">6</span>s.
          </div>
        ),
      },
      { name: 'Full Uptime', default: 1, value: 4.5, variance: 1 / 9 },
    ],
    '10000081': [{ name: 'Skill Cast', default: 1, value: 2, variance: 0 }],
    '10000042': [
      { name: 'Skill Recast', default: 1, value: 2.5, variance: 1 / 5 },
      {
        name: 'C2 Proc',
        default: 0,
        value: 1,
        variance: 0,
        tips: (
          <div>
            <b>Keqing</b>'s <b>Constellation 2</b> has <span className="text-desc">5</span>s CD between triggers.
          </div>
        ),
      },
    ],
    '10000061': [
      { name: 'Flipclaw Hit', default: 1, value: 3, variance: 0 },
      {
        name: 'Neko Parcel Hit',
        default: 0,
        value: 1,
        variance: 0,
        tips: (
          <div>
            <b>Kirara</b>'s <b className="text-genshin-dendro">Neko Parcel Hit</b> has{' '}
            <span className="text-desc">4</span>s ICD, generating up to <span className="text-desc">3</span> Particles.
          </div>
        ),
      },
    ],
    '10000029': [{ name: 'Skill Cast', default: 1, value: 4, variance: 0 }],
    '10000056': [{ name: 'Skill Cast', default: 1, value: 3, variance: 0 }],
    '10000065': [
      { name: 'Skill Cast', default: 1, value: 0, variance: 0.5, pps: c >= 4 ? 0.39 : 0.3, duration: c >= 2 ? 15 : 12 },
    ],
    '10000074': [
      { name: '1 Volleys', default: 0, value: 0, variance: 0.5, pps: 1 / 9, duration: 12 },
      { name: '2 Volleys', default: 0, value: 0, variance: 0.5, pps: 2 / 9, duration: 12 },
      { name: '3 Volleys', default: 1, value: 0, variance: 0.5, pps: 1 / 3, duration: 12 },
    ],
    '10000006': [{ name: 'Skill Hold', default: 1, value: 5, variance: 0 }],
    '10000083': [{ name: 'Skill Cast', default: 1, value: 4, variance: 0 }],
    '10000084': [{ name: 'Skill Cast', default: 1, value: 5, variance: 0 }],
    '10000080': [{ name: 'Skill Cast', default: 1, value: 4, variance: 0 }],
    '10000041': [
      {
        name: 'Skill Cast',
        default: 1,
        value: 10 / 3,
        variance: 0.1,
        tips: (
          <div>
            <b>Mona</b> generate Particles when their Skill expires/detonates; feed their Particles to whoever is
            on-field at the time.
          </div>
        ),
      },
    ],
    // Nahida's TKP always generate 3 Particles = 0 Variance
    '10000073': [{ name: 'Skill Cast', default: 1, value: 0, variance: 0, pps: 0.36, duration: 25 }],
    '10000091': [{ name: 'Skill Cast', default: 2, value: 3.5, variance: 1 / 7 }],
    '10000087': [{ name: 'Skill Cast', default: 1, value: 4, variance: 0 }],
    '10000070': [
      { name: 'Skill Hit', default: 0, value: 1.5, variance: 1 / 3 },
      { name: 'Full Dance', default: 1, value: 4.5, variance: 1 / 9 },
    ],
    '10000027': [
      {
        name: 'Skill Cast',
        default: 1,
        value: 10 / 3,
        variance: 0.1,
        tips: (
          <div>
            <b>Ningguang</b>'s <b className="text-genshin-geo">Skill</b> has <span className="text-desc">6</span>s ICD.
            <div className="mt-1 ml-1">
              <BulletPoint color="text-desc">
                <b>Constellation 2</b> resets CD.
              </BulletPoint>
            </div>
          </div>
        ),
      },
    ],
    '10000052': [{ name: 'Skill Cast', default: 1, value: 0, variance: 0.5, pps: 0.45, duration: 25 }],
    '10000020': [
      {
        name: 'Skill Press',
        default: 1,
        value: 3,
        variance: 0,
        tips: (
          <div>
            During <b>Razor</b>'s Burst, his Skill will not generate Particles.
          </div>
        ),
      },
      { name: 'Skill Hold', default: 0, value: 4, variance: 0 },
    ],
    '10000045': [{ name: 'Skill Cast', default: 1, value: 3, variance: 0 }],
    '10000054': [
      { name: 'No Refresh', default: 0, value: 0, variance: 0.5, pps: 1 / 3, duration: 12 },
      {
        name: 'With Refresh',
        default: 1,
        value: 0,
        variance: 0.5,
        pps: 1 / 3,
        duration: 24,
        tips: (
          <div>
            <b>Kokomi</b>'s <b>A4 Passive</b> allows her Burst to refresh her{' '}
            <b className="text-genshin-hydro">Kurage</b>
            's duration, effectively doubling her skill uptime when timed correctly.
          </div>
        ),
      },
    ],
    '10000053': [
      { name: 'Skill Cast', default: 1, value: 2, variance: 0 },
      {
        name: 'Fuufuu Whirldwind',
        default: 0,
        value: 1,
        variance: 0,
        tips: (
          <div>
            <b>Sayu</b>'s <b className="text-genshin-anemo">Fuufuu Whirldwind Hit</b> has{' '}
            <span className="text-desc">3</span>s ICD, generating up to <span className="text-desc">4</span> Particles.
          </div>
        ),
      },
    ],
    '10000063': [
      { name: 'Skill Press', default: 1, value: 3, variance: 0 },
      { name: 'Skill Hold', default: 0, value: 4, variance: 0 },
    ],
    '10000059': [
      { name: '0~1 Stack', default: 0, value: 2, variance: 0 },
      { name: '2~3 Stacks', default: 0, value: 2.5, variance: 1 / 5 },
      { name: 'Full Stacks', default: 1, value: 3, variance: 0 },
    ],
    '10000043': [{ name: 'Skill Cast', default: 1, value: 4, variance: 0 }],
    '10000033': [
      {
        name: 'Riptide Flash/Slash',
        default: 0,
        value: 1,
        variance: 0,
        tips: (
          <div>
            <b>Tartaglia</b>'s <b className="text-genshin-hydro">Riptide Flash/Slash</b> has{' '}
            <span className="text-desc">2</span>s shared ICD.
          </div>
        ),
      },
      { name: '7~9s Melee', default: 0, value: 3, variance: 0 },
      { name: '11s Melee', default: 1, value: 4, variance: 0 },
    ],
    '10000050': [{ name: 'Skill Cast', default: 1, value: 3.5, variance: 1 / 7 }],
    '10000069': [{ name: 'Skill Cast', default: 1, value: 3.5, variance: 1 / 7 }],
    '10000022': [
      { name: 'Skill Press', default: 1, value: 3, variance: 0 },
      { name: 'Skill Hold', default: 0, value: 4, variance: 0 },
    ],
    '10000075': [
      {
        name: 'Enhanced NA/CA',
        default: 0,
        value: 1,
        variance: 0,
        tips: (
          <div>
            <b>Wanderer</b>'s <b className="text-genshin-anemo">Enhanced NA/CA</b> has{' '}
            <span className="text-desc">2</span>s shared ICD.
            <div className="mt-1 ml-1">
              <BulletPoint color="text-desc">
                <span className="text-desc">10</span> seconds base uptime without moving; can be increased with{' '}
                <b className="text-genshin-hydro">Hydro</b> <b>Absorption</b> and <b>C6</b>, up to{' '}
                <span className="text-desc">~14</span> seconds.
              </BulletPoint>
            </div>
          </div>
        ),
      },
      { name: '6~8s Uptime', default: 0, value: 3, variance: 0 },
      { name: '8~10s Uptime', default: 1, value: 4, variance: 0 },
    ],
    '10000086': [
      {
        name: 'Enhanced NA/CA',
        default: 1,
        value: 1,
        variance: 0,
        tips: (
          <div>
            <b>Wriothesley</b>'s <b className="text-genshin-cryo">Enhanced NA/CA</b> has{' '}
            <span className="text-desc">2</span>s shared ICD.
            <div className="mt-1 ml-1">
              <BulletPoint color="text-desc">
                Only generate Particles if current HP <span className="text-desc">&#x3e;=50%</span>.
              </BulletPoint>
            </div>
          </div>
        ),
      },
    ],
    '10000023': [{ name: 'Skill Cast', default: 1, value: 0, variance: 0, pps: 0.5, duration: 7 }],
    '10000093': [{ name: 'Skill Cast', default: 1, value: 5, variance: 0 }],
    '10000026': [{ name: 'Skill Cast', default: 1, value: 3, variance: 0 }],
    '10000025': [{ name: 'Skill Cast', default: 1, value: 5, variance: 0 }],
    '10000044': [{ name: 'Skill Cast', default: 1, value: 4, variance: 0 }],
    '10000058': [
      {
        name: '3-Cast Combo',
        default: 1,
        value: 0,
        variance: 0,
        pps: 5 / 14,
        duration: 14,
        tips: (
          <div>
            Only one of <b>Yae Miko</b>'s <b className="text-genshin-electro">Sesshou Sakura</b> can generate Particles.
          </div>
        ),
      },
    ],
    '10000048': [{ name: 'Skill Cast', default: 1, value: 3, variance: 0 }],
    '10000077': [{ name: 'Skill Cast', default: 1, value: 0, variance: 0, pps: 0.5, duration: 10 }],
    '10000060': [{ name: 'Skill Cast', default: 1, value: 4, variance: 0 }],
    '10000049': [
      {
        name: 'Enhanced NA',
        default: 0,
        value: 1,
        variance: 0,
        tips: (
          <div>
            <b>Yoimiya</b>'s <b className="text-genshin-pyro">Converted Attacks</b> have{' '}
            <span className="text-desc">2</span>s ICD, generating up to <span className="text-desc">4</span> Particles
            over <span className="text-desc">10</span>s.
            <div className="mt-1 ml-1">
              <BulletPoint color="text-desc">
                Her Skill may generate an extra Particle. To account for this, add{' '}
                <span className="text-desc">0.25</span> in <b>Full Uptime</b> or <span className="text-desc">1</span> in{' '}
                <b>Enhanced NA</b>.
              </BulletPoint>
            </div>
          </div>
        ),
      },
      { name: 'Full Uptime', default: 1, value: 4, variance: 0 },
    ],
    '10000064': [
      { name: 'Skill Press', default: 1, value: 2, variance: 0 },
      { name: 'Hold Level 1', default: 0, value: 2.5, variance: 1 / 5 },
      { name: 'Hold Level 2', default: 0, value: 3, variance: 0 },
    ],
    '10000030': [
      {
        name: 'Skill (Hit)',
        default: 1,
        value: 0,
        variance: 0.5,
        pps: 0.25,
        duration: 30,
        tips: (
          <div>
            <b>Zhongli</b>'s <b className="text-genshin-geo">Stone Steles</b> share a{' '}
            <span className="text-desc">1.5</span>s ICD with one another.
          </div>
        ),
      },
    ],
    '10000096': [{ name: 'Skill Cast', default: 1, value: 5, variance: 0 }],
    '10000097': [
      { name: 'Skill Cast', default: 1, value: 2, variance: 0 },
      { name: 'Charged Shot', default: 1, value: 0, variance: 0 },
      { name: 'Partial Charged Shot', default: 0, value: 0, variance: 0 },
    ],
    '10000095': [{ name: 'Skill Cast', default: 1, value: 4, variance: 0 }],
    '10000098': [
      {
        name: 'Shot/Lunge Hit',
        default: 0,
        value: 1,
        variance: 0,
        tips: (
          <div>
            <b>Clorinde</b>'s <b className="text-genshin-electro">Swift Hunt</b>,{' '}
            <b className="text-genshin-electro">Impale the Night</b>,{' '}
            <b className="text-genshin-electro">Nightvigil Shade</b> (C1), and{' '}
            <b className="text-genshin-electro">Glimbright Shade</b> (C6) have <span className="text-desc">2</span>s
            shared ICD.
          </div>
        ),
      },
      { name: 'Full Uptime', default: 1, value: 4, variance: 0 },
    ],
    '10000099': [
      { name: 'Skill Cast', default: 1, value: 0, variance: 0, pps: 7 / 22, duration: 22 },
      {
        name: 'Burst Cast',
        default: 1,
        value: -1,
        variance: 0,
        tips: (
          <div>
            <b>Emilie</b>'s Burst briefly replaces her <b className="text-genshin-dendro">Case</b> with a Level-3 one,
            causing her to miss <span className="text-desc">1</span> Particle.
          </div>
        ),
      },
    ],
    '10000100': [
      { name: 'Skill Hit', default: 0, value: 2 / 3, variance: 2 / 3 },
      { name: 'Unmount', default: 1, value: 0, variance: 0.5, pps: 1 / 3, duration: c >= 2 ? 16 : 12 },
      { name: 'Mounted Full Uptime', default: 0, value: c >= 2 ? 16 / 3 : 4, variance: 0.5 },
    ],
    '10000102': [{ name: `Skill Cast`, default: 1, value: 4.5, variance: 1 / 9 }],
    '10000101': [{ name: `Skill Cast`, default: 1, value: 5, variance: 0 }],
    '10000103': [{ name: `Skill Cast`, default: 1, value: 4, variance: 0 }],
    '10000104': [{ name: `Skill Cast`, default: 1, value: 5, variance: 0 }],
    '10000105': [{ name: `Skill Cast`, default: 1, value: 3, variance: 0 }],
  }[id])
