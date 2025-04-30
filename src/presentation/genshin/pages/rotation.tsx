import { findCharacter } from '@src/core/utils/finder'
import { useStore } from '@src/data/providers/app_store_provider'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useState } from 'react'
import { CharacterSelect } from '../components/character_select'
import classNames from 'classnames'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import { CharacterEnergyNote, EnergyData, FlatEnergy } from '@src/data/db/energy'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { Tooltip } from '@src/presentation/components/tooltip'
import { toPercentage } from '@src/core/utils/converter'
import { FixedEnergyModal } from '../components/modals/fixed_energy_modal'
import { getSetCount } from '@src/core/utils/data_format'
import { BulletPoint } from '@src/presentation/components/collapsible'

export const Rotation = observer(({}: {}) => {
  const { teamStore, modalStore, settingStore, energyStore, artifactStore } = useStore()

  const onOpenFixedEnergyModal = useCallback(
    (index: number) => modalStore.openModal(<FixedEnergyModal index={index} />),
    []
  )

  useEffect(() => {
    const fixedEnergyList = _.map(teamStore.characters, (current) =>
      _.filter(FlatEnergy, (fe) => {
        const others = _.without(
          _.map(teamStore.characters, (item) => item.cId),
          current.cId
        )
        const otherWeapons = _.without(
          _.map(teamStore.characters, (item) => item.equipments?.weapon?.wId),
          current.cId
        )
        const artifact = getSetCount(
          _.map(current.equipments?.artifacts, (item) => _.find(artifactStore.artifacts, (a) => a.id === item))
        )

        const [setId, count] = fe.source.split('_')
        const artifactMatch = count ? artifact[setId] >= +count : false
        const own =
          (fe.source === current.cId || fe.source === current.equipments?.weapon?.wId || artifactMatch) &&
          (fe.type === 'self' || fe.type === 'everyone')
        const notOwn =
          _.includes(_.concat(others, otherWeapons), fe.source) && (fe.type === 'others' || fe.type === 'everyone')
        const owner = _.find(teamStore.characters, (item) => item.cId === fe.source)
        const shown = fe.show(owner?.cons, owner?.i)

        return (own || notOwn) && shown
      })
    )
    energyStore.setValue('fixedEnergy', fixedEnergyList)

    _.forEach(energyStore.meta, (meta, index) => {
      energyStore.setMetaData(
        index,
        'add',
        _.reduce(
          fixedEnergyList[index],
          (acc, curr) => {
            acc[curr.name] = meta.add[curr.name] || curr.default
            return acc
          },
          { 'Additional Energy': 0 }
        )
      )
    })
  }, [teamStore.characters, artifactStore.artifacts])

  return (
    <div className="w-full overflow-y-auto customScrollbar mobile:overflow-visible">
      <div className="grid w-full grid-cols-3 mobile:grid-cols-1 gap-5 p-5 text-white max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between col-span-full">
          <p className="text-2xl font-bold">ER Requirement Calculator</p>
          <PrimaryButton
            title="More About Energy"
            onClick={() =>
              modalStore.openModal(
                <div className="w-[30dvw] mobile:max-w-[400px] bg-primary-dark rounded-lg p-3 text-sm text-gray">
                  <p className="pb-1 mb-2 text-lg font-bold text-white border-b-2 border-primary-border">
                    About Energy
                  </p>
                  <BulletPoint>Resonators' attacks grants Resonance Energy for each hit landed.</BulletPoint>
                  <BulletPoint>
                    On-field Resonators gain <span className="text-desc">100%</span> of the Energy generated while the
                    off-field Resonators gain <span className="text-desc">50%</span> each. The generated Energy will
                    then be increased by each Resonator's <b>own</b> Energy Regen.
                  </BulletPoint>
                  <BulletPoint>
                    Resonance Liberation <i>(except Liberation-modified attacks)</i> and Coordinated Attacks cannot
                    generate Energy.
                  </BulletPoint>
                  <BulletPoint>
                    Flat Energy gain (e.g. Weapons and Sequence Node effects) is not affected by Energy Regen.
                  </BulletPoint>
                  <BulletPoint>This calculator assume every hit from each Skill lands.</BulletPoint>
                  <BulletPoint>
                    Some Resonator and attack has a note attached to them. You can read it for more information on them.
                  </BulletPoint>
                  <BulletPoint color="text-red">
                    Only take this calculation with a grain of salt. There are a lot of unpredictable variables in a
                    fight. This only serves as a rough estimate on how you should build your team.
                  </BulletPoint>
                </div>
              )
            }
          />
        </div>
        {_.map(teamStore?.characters, (item, index) => {
          const currentChar = findCharacter(item.cId)

          if (!currentChar) return <></>

          const cost = currentChar.stat.energy
          const energy = energyStore.getTotalEnergy(index)
          const note = CharacterEnergyNote[item.cId]
          return (
            <div className="space-y-2" key={`char_select_${index}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center p-0.5 pr-4 gap-x-2 rounded-full bg-primary-light w-fit min-w-[20%]">
                  <CharacterSelect
                    isSelected={false}
                    order={
                      currentChar?.order === '4' && settingStore.settings?.travelerGender === 'zhujue'
                        ? '5'
                        : currentChar?.order
                    }
                  />
                  <p className="w-full font-bold text-center">{currentChar?.name}</p>
                  {note && (
                    <Tooltip
                      title="Additional Note"
                      body={<p dangerouslySetInnerHTML={{ __html: note }} />}
                      style="w-[450px]"
                      position="right"
                    >
                      <i className="text-lg fa-solid fa-triangle-exclamation text-red" />
                    </Tooltip>
                  )}
                </div>
                <PrimaryButton
                  title={`Fixed Energy (${_.size(energyStore.fixedEnergy[index])})`}
                  onClick={() => onOpenFixedEnergyModal(index)}
                />
              </div>
              <div className="pb-1 rounded-md bg-primary">
                <div className="flex items-center justify-between px-3 py-0.5 mb-1 text-sm font-bold gap-x-3 bg-primary-lighter rounded-t-md">
                  <p className="w-full text-center">Attacks</p>
                  <p className="w-[70px] shrink-0 text-center">Count</p>
                </div>
                {_.map(EnergyData[item.cId], (data, i: number) => (
                  <div
                    className={classNames('flex items-center justify-between px-1.5 py-0.5 gap-x-3 mx-2', {
                      'bg-primary-dark rounded-md': i % 2,
                    })}
                    key={i}
                  >
                    <div>
                      <p className="text-xs font-light shrink-0 text-gray">
                        {data.type} - <span className="text-violet-200">{_.round(data.energy, 2)} Energy</span>
                      </p>
                      <div className="flex items-center text-sm gap-x-2">
                        <p className="line-clamp-1">{data.name}</p>
                        {data.note && (
                          <Tooltip
                            title={data.name}
                            body={<p dangerouslySetInnerHTML={{ __html: data.note }} />}
                            style="w-[400px]"
                            position="right"
                          >
                            <i className="fa-regular fa-question-circle text-desc" />
                          </Tooltip>
                        )}
                      </div>
                    </div>
                    <TextInput
                      type="number"
                      value={energyStore.meta[index].skill[i]?.proc?.toString()}
                      onChange={(v) => energyStore.setMetaData(index, `skill.${i}.proc`, v)}
                      style="!w-[70px] shrink-0"
                      min={0}
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-x-5">
                <div className="flex flex-col items-center justify-between px-1 py-0.5 gap-x-3 rounded-md bg-primary">
                  <p className="w-full text-sm text-center">Total Energy Gain</p>
                  <div className="flex items-center gap-x-1">
                    <p>{_.round(energy, 2).toLocaleString()}</p>
                    <p className="text-xs text-desc">(+{energyStore.getFixedEnergy(index)})</p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between px-1 py-0.5 gap-x-3 rounded-md bg-primary">
                  <p className="w-full text-sm text-center">ER Required</p>
                  <p>{toPercentage(_.max([energyStore.getRequiredER(index, cost), 1]))}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
