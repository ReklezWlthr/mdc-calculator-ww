import React from 'react'
import { useStore } from '@src/data/providers/app_store_provider'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'

export const FixedEnergyModal = observer(({ index }: { index: number }) => {
  const { energyStore } = useStore()

  const energyArr = energyStore.fixedEnergy[index]

  return (
    <div className="w-[30dvw] mobile:w-[350px] bg-primary-dark rounded-lg py-3 px-4 space-y-2 text-white">
      <div>
        <p className="font-bold">Fixed Energy Gain per Rotation</p>
        <p className="text-xs text-gray">
          Put Energy gained in each boxes. Refer to the <span className="text-desc">help text</span> for trigger
          conditions.
        </p>
      </div>
      <div className="border-t-2 border-primary-border col-span-full" />
      <div className="grid items-center grid-cols-6 gap-x-6 gap-y-3">
        {_.map(energyArr, (item) => (
          <>
            <div className="col-span-5 text-sm">
              <p className="font-semibold">
                <span className="mr-1 text-blue">✦</span>
                {item.name}
              </p>
              <p className="text-xs text-gray" dangerouslySetInnerHTML={{ __html: item.note }} />
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
        <p className="col-span-5 text-sm font-semibold">Additional Energy</p>
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
