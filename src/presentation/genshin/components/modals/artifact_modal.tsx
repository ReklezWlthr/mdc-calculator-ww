import { toPercentage } from '@src/core/utils/converter'
import { getMainStat } from '@src/core/utils/data_format'
import { findEcho } from '@src/core/utils/finder'
import { Echoes } from '@src/data/db/artifacts'
import { useStore } from '@src/data/providers/app_store_provider'
import { MainStat, SubStat, SubStatRange } from '@src/domain/artifact'
import { Stats } from '@src/domain/constant'
import { SelectInput } from '@src/presentation/components/inputs/select_input'
import { SelectTextInput } from '@src/presentation/components/inputs/select_text_input'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import { RarityGauge } from '@src/presentation/components/rarity_gauge'
import classNames from 'classnames'
import _ from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { getEchoImage } from '@src/core/utils/fetcher'
import { ArtifactSetterT } from './artifact_list_modal'
import { SonataColor, SonataIcons } from '../artifact_block'
import { observer } from 'mobx-react-lite'
import { EchoFilterModal } from './echo_filter_modal'

const EchoSlider = observer(
  ({ id, stat, value, onChange }: { id: string; stat: Stats; value: number; onChange: (v: number) => void }) => {
    const onCalcSlider = useCallback(() => {
      const range = document.getElementById(id) as HTMLInputElement
      if (range) {
        const bg = getComputedStyle(range).getPropertyValue('--tw-gradient-to')
        const slider = getComputedStyle(range).getPropertyValue('--tw-gradient-from')
        const min = Number(range.min)
        const max = Number(range.max) - min
        const v = ((Number(range.value) - min) / max) * 100
        range.setAttribute('style', `background:linear-gradient(to right,${slider},${slider} ${v}%,${bg} ${v}%)`)
      }
    }, [id])

    useEffect(() => {
      onCalcSlider()
    }, [value])

    return (
      <input
        id={id}
        type="range"
        className="col-span-10 echo-slider bg-gradient-to-r from-primary-lighter to-gray shrink-0"
        step={1}
        min="0"
        max={_.size(SubStatRange[stat]) - 1}
        value={_.findIndex(SubStatRange[stat], (item) => item === value)}
        onChange={(e) => onChange(+e.target.value)}
      />
    )
  }
)

export const ArtifactModal = ({
  index,
  slot,
  aId,
  setArtifact,
}: {
  index?: number
  slot?: number
  aId?: string
  setArtifact?: ArtifactSetterT
}) => {
  const { teamStore, artifactStore, modalStore, toastStore } = useStore()
  const [error, setError] = useState('')

  const set = setArtifact || teamStore.setArtifact

  const { watch, control, setValue, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      setId: null,
      quality: 5,
      level: 25,
      main: null,
      cost: 0,
      sonata: null,
      subList: Array(5).fill({ stat: null, value: null }),
    },
  })
  const values = watch()
  const mainStat = getMainStat(values.main, values.quality, values.level, values.cost)
  const maxLevel = 25 - (5 - values.quality) * 5

  const setData = useMemo(() => findEcho(values.setId), [values.setId])

  const subList = useFieldArray({ control, name: 'subList' })

  useEffect(() => {
    if (aId) {
      const { setId, subList, ...rest } = _.find(artifactStore.artifacts, ['id', aId])

      if (setId) {
        reset({
          ...rest,
          setId,
          subList: [...subList, ...Array(5 - subList.length).fill({ stat: null, value: null })],
        })
      }
    }
  }, [aId])

  const onChange = (v: string) => {
    setValue('setId', v)
    setValue('cost', findEcho(v)?.cost)
    if (!_.includes(MainStat[findEcho(v)?.cost], values.main)) {
      setValue('main', v ? Stats.P_HP : null)
    }
    setValue('sonata', v ? _.head(findEcho(v)?.sonata) : null)
  }

  const onSubmit = handleSubmit(({ subList, ...rest }) => {
    if (rest.cost === 0) return setError('Invalid Echo Cost')

    const id = aId || crypto.randomUUID()

    const trimmedSub = _.map(
      _.filter(subList, (item) => item.stat && item.value),
      (item) => ({ ...item, value: parseFloat(item.value) })
    )
    const unique = _.uniqBy(trimmedSub, 'stat')
    if (unique.length !== trimmedSub.length) return setError('Duplicated Sub Stats')
    const data = { id, ...rest, subList: trimmedSub }

    const pass = aId ? artifactStore.editArtifact(aId, data) : artifactStore.addArtifact(data)
    toastStore.openNotification({
      title: aId ? 'Artifact Edited Successfully' : 'Artifact Created Successfully',
      icon: 'fa-solid fa-circle-check',
      color: 'green',
    })
    if (pass && index >= 0 && slot >= 0) {
      set(index, slot, id)
    }
    modalStore.closeModal()
  })

  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <div className="w-[300px] p-4 space-y-4 font-semibold text-white rounded-xl bg-primary-dark relative">
      <EchoFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onSelect={(v) => {
          onChange(v)
          setFilterOpen(false)
        }}
      />
      <div className="flex items-center gap-2">
        <div className="overflow-hidden border rounded-full w-9 h-9 bg-primary-darker border-primary-light shrink-0">
          {setData?.icon && <img src={getEchoImage(setData?.icon)} className="scale-105" />}
        </div>
        <Controller
          name="setId"
          control={control}
          rules={{ required: { value: true, message: 'Artifact set is required.' } }}
          render={({ field }) => (
            <SelectTextInput
              value={field.value}
              options={_.orderBy(
                _.map(Echoes, (artifact) => ({
                  name: artifact.name,
                  value: artifact.id.toString(),
                  img: getEchoImage(artifact?.icon),
                })),
                ['name'],
                ['asc']
              )}
              placeholder="Echo Name"
              onChange={(value) => onChange(value?.value)}
            />
          )}
        />
        <i
          className="flex items-center justify-center text-xs transition duration-200 rounded-full cursor-pointer w-7 h-7 fa-solid fa-filter bg-primary-light shrink-0 hover:bg-primary"
          onClick={() => setFilterOpen(true)}
        />
      </div>
      <div className="flex items-center justify-center gap-3">
        <p className="text-sm">Level</p>
        <Controller
          name="level"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectInput
              value={field.value.toString()}
              options={_.map(Array(maxLevel + 1), (_, index) => ({
                name: '+' + (maxLevel - index),
                value: (maxLevel - index).toString(),
              }))}
              style="w-16"
              onChange={(value) => field.onChange(_.parseInt(value))}
            />
          )}
        />
        <p className="text-sm">Grade</p>
        <Controller
          name="quality"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectInput
              value={field.value.toString()}
              options={_.map(Array(4).fill(2), (item, index) => ({
                name: <RarityGauge rarity={item + index} />,
                value: (item + index).toString(),
              })).reverse()}
              style="w-[70px]"
              onChange={(value) => {
                const quality = _.parseInt(value)
                field.onChange(quality)
                if (values.level > 20 - (5 - quality) * 4) setValue('level', 20 - (5 - quality) * 4)
              }}
            />
          )}
        />
      </div>
      <div className="space-y-1">
        <p className="text-xs">Sonata</p>
        <Controller
          name="sonata"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectInput
              value={field.value}
              options={_.map(findEcho(values?.setId)?.sonata, (item) => ({
                name: (
                  <div className="flex items-center gap-2 py-1 ml-1">
                    <div
                      className={classNames(
                        'flex items-center justify-center text-xs bg-opacity-75 rounded-full bg-primary ring-2',
                        SonataColor[item]
                      )}
                    >
                      <img src={SonataIcons[item]} className="w-4 h-4" />
                    </div>
                    <p>{item}</p>
                  </div>
                ),
                value: item,
              }))}
              onChange={field.onChange}
              placeholder="None"
              disabled={!values.setId}
            />
          )}
        />
      </div>
      <div className="space-y-1">
        <p className="text-xs">Main Stat</p>
        <div className="flex items-center justify-center gap-3">
          <Controller
            name="main"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SelectInput
                value={field.value}
                options={_.map(MainStat[values.cost], (item) => ({
                  name: item,
                  value: item,
                }))}
                style="w-3/4"
                onChange={field.onChange}
                placeholder="None"
                disabled={!values.setId}
              />
            )}
          />
          <div className="w-1/4 px-3 py-1 text-sm border rounded-lg text-gray border-primary-light bg-primary-darker">
            {values.setId
              ? _.includes([Stats.HP, Stats.ATK], values?.main)
                ? _.round(mainStat).toLocaleString()
                : toPercentage(mainStat, 1)
              : '-'}
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs">Sub Stats</p>
        <div className="space-y-3">
          {_.map(subList.fields, (field, index) => (
            <div className="space-y-1.5" key={index}>
              <div className="grid items-center grid-cols-7 gap-3">
                <SelectTextInput
                  value={subList.fields[index]?.stat}
                  options={_.map(SubStat, (item) => ({
                    name: item,
                    value: item,
                  }))}
                  style="col-span-5"
                  onChange={(value) =>
                    subList.update(index, {
                      ...subList.fields[index],
                      stat: value?.name,
                      value: SubStatRange[value?.name]?.[0],
                    })
                  }
                  placeholder={`Sub Stat ${index + 1}`}
                  disabled={_.floor(values.level / 5) < index + 1}
                />
                <div className="col-span-2 px-3 py-1 text-sm border rounded-lg text-gray border-primary-light bg-primary-darker">
                  {subList.fields[index]?.stat
                    ? _.includes([Stats.HP, Stats.ATK, Stats.DEF], subList.fields[index]?.stat)
                      ? _.round(subList.fields[index]?.value).toLocaleString()
                      : toPercentage(subList.fields[index]?.value, 1)
                    : '-'}
                </div>
              </div>
              <div className="grid items-center grid-cols-12 gap-2">
                <p className="col-span-2 text-[11px] font-normal text-center text-gray">Value:</p>
                <EchoSlider
                  id={`slider_${index}`}
                  stat={subList.fields[index]?.stat}
                  value={subList.fields[index]?.value}
                  onChange={(v) =>
                    subList.update(index, {
                      ...subList.fields[index],
                      value: SubStatRange[subList.fields[index]?.stat]?.[v],
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-normal text-center text-red">
          {formState.errors?.setId?.message?.toString() || error}
        </p>
        <PrimaryButton title="Confirm" onClick={onSubmit} />
      </div>
    </div>
  )
}
