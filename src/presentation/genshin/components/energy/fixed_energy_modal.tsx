import React from 'react'
import { TriggerEnergy } from '@src/data/db/energy'
import { useStore } from '@src/data/providers/app_store_provider'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { getSetCount } from '@src/core/utils/data_format'

export const FixedEnergyModal = observer(({ index }: { index: number }) => {
  const { energyStore, teamStore, artifactStore } = useStore()

  const energyArr = _.filter(TriggerEnergy, (fe) => {
    const current = teamStore.characters[index]
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
    const shown = fe.show(owner?.cons, owner?.ascension)

    return (own || notOwn) && shown
  })

  return (
    <div className="w-[500px] bg-primary-dark rounded-lg py-3 px-4 space-y-2 text-white">
      <div>
        <p className="font-bold">Non-Particle Energy Gain per Rotation</p>
        <p className="text-xs text-gray">
          Put Energy gained in each boxes. Refer to the <span className="text-desc">help text</span> for trigger
          conditions.
        </p>
      </div>
      <div className="border-t-2 border-primary-border col-span-full" />
      <div className="grid grid-cols-6 gap-x-6 gap-y-3 items-center">
        {_.map(energyArr, (item) => (
          <>
            <div className="text-sm col-span-5">
              <p className="font-semibold">
                <span className="text-blue mr-1">✦</span>
                {item.name}
              </p>
              <p className="text-xs text-gray ml-4">{item.detail}</p>
            </div>
            <TextInput
              onChange={(v) =>
                energyStore.setMetaData(index, `add`, {
                  ...energyStore.meta?.[index]?.add,
                  [item.name]: parseFloat(v),
                })
              }
              value={energyStore.meta?.[index]?.add?.[item.name]?.toString() || '0'}
              type="number"
              style="h-fit shrink-0"
            />
          </>
        ))}
        {!!_.size(energyArr) && <div className="border-t-2 border-primary-border col-span-full" />}
        <p className="text-sm col-span-5 font-semibold">Additional Energy</p>
        <TextInput
          onChange={(v) =>
            energyStore.setMetaData(index, `add`, {
              ...energyStore.meta?.[index]?.add,
              'Additional Energy': parseFloat(v),
            })
          }
          value={energyStore.meta?.[index]?.add?.['Additional Energy']?.toString() || '0'}
          type="number"
          style="h-fit shrink-0"
        />
      </div>
    </div>
  )
})
