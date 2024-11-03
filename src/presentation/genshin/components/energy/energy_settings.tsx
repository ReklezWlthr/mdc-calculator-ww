import { ElementColor } from '@src/core/utils/damageStringConstruct'
import { findCharacter } from '@src/core/utils/finder'
import { useStore } from '@src/data/providers/app_store_provider'
import { Element } from '@src/domain/constant'
import { SelectInput } from '@src/presentation/components/inputs/select_input'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { Tooltip } from '@src/presentation/components/tooltip'
import classNames from 'classnames'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'

export const EnergySettings = observer(() => {
  const { teamStore, energyStore } = useStore()
  const { setMetaData, meta } = energyStore

  return (
    <div className="grid grid-cols-12 gap-4 mt-5">
      <div className="col-span-3">
        <div className="py-1 text-base font-bold text-center rounded-t-lg bg-primary-light">Rotation Settings</div>
        <div className="flex text-xs divide-x-2 divide-primary-border">
          <p className="w-full py-1 text-center bg-primary-dark">Total Rotation Length</p>
          <p className="w-full py-1 text-center bg-primary-darker text-desc">
            {_.sumBy(meta, (item) => item.fieldTime)}s
          </p>
        </div>
        <div className="overflow-hidden rounded-b-lg">
          {_.map(teamStore.characters, (item, index) => (
            <div className="grid grid-cols-6 divide-y-2 divide-primary-border">
              <p className="flex items-center justify-center col-span-2 px-2 font-semibold bg-primary text-center">
                {findCharacter(item.cId)?.name}
              </p>
              <div className="grid grid-cols-6 col-span-4 gap-1.5 px-2 py-1.5 text-xs bg-primary-dark">
                <p className="col-span-4 py-1 text-center">Time on Field (s)</p>
                <TextInput
                  onChange={(v) => setMetaData(index, `fieldTime`, parseFloat(v))}
                  value={meta?.[index]?.fieldTime?.toString()}
                  small
                  style="col-span-2"
                  type="number"
                  min={0}
                />
                <p className="col-span-4 py-1 text-center">Rotation per Burst</p>
                <TextInput
                  onChange={(v) => setMetaData(index, `rpb`, parseFloat(v))}
                  value={meta?.[index]?.rpb?.toString()}
                  small
                  style="col-span-2"
                  type="number"
                  min={0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-3">
        <div className="py-1 text-base font-bold text-center rounded-t-lg bg-primary-light">Additional Settings</div>
        <div className="rounded-b-lg bg-primary-dark">
          <div className="grid grid-cols-6 col-span-4 gap-1.5 px-2 py-1.5 text-xs">
            <div className="flex items-center justify-center col-span-4 gap-2 py-1">
              <p>Particle RNG</p>
              <Tooltip
                title="Particle RNG"
                body={
                  <div className="space-y-1 font-normal">
                    <p>
                      Some Skills has a chance to generate an extra Particle. This setting modifies the chance of that
                      Particle spawning.
                    </p>
                    <p>
                      - <b>Average</b>: Assume Skills have <span className="text-desc">average</span> rolls and turrets
                      produce an <span className="text-desc">average</span> amount of Particles.
                    </p>
                    <p>
                      - <b>Low</b>: Assume Skills will <span className="text-desc">most likely</span> low-roll and
                      turrets produce only <span className="text-desc">75%</span> of the expected Particles.
                    </p>
                    <p>
                      - <b>Worst</b>: Assume Skills <span className="text-desc">always</span> low-roll and turrets
                      produce only <span className="text-desc">half</span> of the expected Particles.
                    </p>
                  </div>
                }
                position="right"
                style="w-[450px]"
              >
                <i className="fa-regular fa-question-circle" />
              </Tooltip>
            </div>
            <SelectInput
              options={[
                { name: 'Average', value: 'average' },
                { name: 'Low', value: 'low' },
                { name: 'Worst', value: 'worst' },
              ]}
              onChange={(v) => energyStore.setValue('mode', v)}
              value={energyStore.mode}
              small
              style="col-span-2"
            />
            <p className="col-span-4 py-1 text-center">Electro Reaction Interval</p>
            <TextInput
              onChange={(v) => energyStore.setValue('electroInterval', parseFloat(v))}
              value={energyStore.electroInterval?.toString()}
              small
              style="col-span-2"
              type="number"
              min={5}
              disabled={
                _.size(_.filter(teamStore.characters, (item) => findCharacter(item.cId)?.element === Element.ELECTRO)) <
                2
              }
            />
            <div className="flex items-center justify-center col-span-4 gap-2 py-1">
              <p>HP Drops Mode</p>
              <Tooltip
                title="HP Drops Mode"
                body={
                  <div className="space-y-1 font-normal">
                    <p>Determines the total span of time all additional HP Particles/Orbs are caught.</p>
                    <p>
                      - <b>Chamber</b>: Particles/Orbs are caught over the course of the entire Abyss Chamber clear
                      time. You may adjust your clear time below. The default value is{' '}
                      <span className="text-desc">90s</span> which is half of the time you need to 3-star each Floor-12
                      Chamber.
                    </p>
                    <p>
                      - <b>Rotation</b>: Particles/Orbs are caught over the course of a single rotation.
                    </p>
                  </div>
                }
                position="right"
                style="w-[450px]"
              >
                <i className="fa-regular fa-question-circle" />
              </Tooltip>
            </div>
            <SelectInput
              options={[
                { name: 'Chamber', value: 'chamber' },
                { name: 'Rotation', value: 'rotation' },
              ]}
              onChange={(v) => energyStore.setValue('particleMode', v)}
              value={energyStore.particleMode}
              small
              style="col-span-2"
            />
            <p className="col-span-4 py-1 text-center">Chamber Clear Time (s)</p>
            <TextInput
              onChange={(v) => energyStore.setValue('clearTime', parseFloat(v))}
              value={energyStore.clearTime?.toString()}
              small
              style="col-span-2"
              type="number"
              min={1}
              disabled={energyStore.particleMode !== 'chamber'}
            />
          </div>
        </div>
      </div>
      <div className="col-span-6">
        <div className="py-1 text-base font-bold text-center rounded-t-lg bg-primary-light">HP Particle/Orb Drops</div>
        <div className="grid grid-cols-9 gap-1 bg-primary-dark">
          <div />
          {_.map(Element, (item) => (
            <div className={classNames('text-center text-xs py-1 font-semibold', ElementColor[item])}>
              {item === Element.PHYSICAL ? 'Clear' : item}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-9 gap-1 border-t-2 bg-primary-dark border-primary-border">
          <p className="flex items-center justify-center text-xs font-semibold">Particle</p>
          {_.map(Element, (item) => (
            <div className={classNames('text-center text-xs p-1 font-semibold', ElementColor[item])}>
              <TextInput
                value={energyStore.particles[item]?.toString()}
                onChange={(v) => energyStore.setParticle('particles', item, parseInt(v))}
                small
                type="number"
                min={0}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-9 gap-1 bg-primary-dark">
          <p className="flex items-center justify-center text-xs font-semibold">Orb</p>
          {_.map(Element, (item) => (
            <div className={classNames('text-center text-xs p-1 font-semibold', ElementColor[item])}>
              <TextInput
                value={energyStore.orbs[item]?.toString()}
                onChange={(v) => energyStore.setParticle('orbs', item, parseInt(v))}
                small
                type="number"
                min={0}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-9 gap-1 border-t-2 rounded-b-lg bg-primary-dark border-primary-border">
          <p className="flex items-center justify-center col-span-2 py-2 text-xs font-semibold">Energy Gained</p>
          {_.map(
            _.filter(Element, (item) => item !== Element.PHYSICAL),
            (item) => (
              <div className="py-2 text-xs font-semibold text-center text-gray">
                {energyStore.getAdditionalEnergy(item)}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
})
