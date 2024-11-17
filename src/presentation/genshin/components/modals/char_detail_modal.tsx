import { useParams } from '@src/core/hooks/useParams'
import { findBaseLevel, findMaxLevel } from '@src/core/utils/data_format'
import { findCharacter } from '@src/core/utils/finder'
import { DefaultCharacterStore } from '@src/data/stores/character_store'
import { AscensionOptions, SequenceOptions, ICharStore, StatIcons } from '@src/domain/constant'
import { SelectInput } from '@src/presentation/components/inputs/select_input'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { useCallback, useMemo } from 'react'
import { TalentIcon } from '@src/presentation/genshin/components/tables/scaling_wrapper'
import ConditionalsObject from '@src/data/lib/stats/conditionals/conditionals'
import { CheckboxInput } from '@src/presentation/components/inputs/checkbox'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import { useStore } from '@src/data/providers/app_store_provider'
import { CommonModal } from '@src/presentation/components/common_modal'
import { toPercentage } from '@src/core/utils/converter'
import { StatBonusValue } from '@src/domain/scaling'

export const CharDetailModal = observer(({ char, cId }: { char: ICharStore; cId: string }) => {
  const { charStore, toastStore, modalStore, settingStore } = useStore()

  const { params, setParams } = useParams(
    char || {
      ...DefaultCharacterStore,
      cId,
    }
  )

  const charData = findCharacter(cId)
  const levels = useMemo(
    () =>
      _.map(
        Array(findMaxLevel(params.ascension) - findBaseLevel(params.ascension) + 1 || 1).fill(
          findBaseLevel(params.ascension)
        ),
        (item, index) => ({
          name: _.toString(item + index),
          value: _.toString(item + index),
        })
      ).reverse(),
    [params.ascension]
  )

  const talent = _.find(ConditionalsObject, ['id', cId])?.conditionals(params?.cons, params?.i, params?.talents, [])

  const maxTalentLevel = (asc: number) => _.max([1, (asc - 1) * 2])
  const talentLevels = _.map(Array(maxTalentLevel(params.ascension)), (_, index) => ({
    name: (index + 1).toString(),
    value: (index + 1).toString(),
  })).reverse()

  const onDelete = useCallback(() => {
    modalStore.openModal(
      <CommonModal
        title="Remove Character"
        desc="Are you sure you want to remove this character from you account?"
        icon="fa-solid fa-exclamation-circle text-red"
        onConfirm={() => {
          const pass = charStore.deleteChar(cId)
          if (pass) {
            toastStore.openNotification({
              title: 'Character Removed Successfully',
              icon: 'fa-solid fa-circle-check',
              color: 'green',
            })
            modalStore.closeModal()
          } else {
            toastStore.openNotification({
              title: 'Something Went Wrong',
              icon: 'fa-solid fa-exclamation-circle',
              color: 'red',
            })
          }
        }}
        onCancel={() => {
          modalStore.openModal(<CharDetailModal char={char} cId={cId} />)
        }}
      />
    )
  }, [char, cId])

  const onSave = useCallback(() => {
    let pass = false
    if (_.find(charStore.characters, (item) => item.cId === cId)) {
      pass = charStore.editChar(cId, params)
    } else {
      pass = charStore.addChar(params)
    }
    if (pass) {
      toastStore.openNotification({
        title: 'Data Edited Successfully',
        icon: 'fa-solid fa-circle-check',
        color: 'green',
      })
      modalStore.closeModal()
    } else {
      toastStore.openNotification({
        title: 'Something Went Wrong',
        icon: 'fa-solid fa-exclamation-circle',
        color: 'red',
      })
    }
  }, [params, cId])

  return (
    <div className="w-[600px] mobile:w-[400px] mobile:max-h-[80dvh] p-4 text-white rounded-xl bg-primary-dark space-y-5 font-semibold">
      <div className="flex justify-between gap-x-4">
        <div className="grid w-full grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray">Edit Account Data</p>
            <p className="text-lg">{charData?.name}</p>
          </div>
          <div className="flex items-center w-full gap-2">
            <p className="text-sm font-semibold">Level</p>
            <SelectInput
              onChange={(value) => setParams({ level: parseInt(value) || 0 })}
              options={levels}
              value={params.level?.toString()}
            />
            <SelectInput
              onChange={(value) => {
                const max = maxTalentLevel(parseInt(value))
                setParams({
                  ascension: parseInt(value) || 0,
                  level: findMaxLevel(parseInt(value) || 0),
                })
                const t = params.talents
                _.forEach(params.talents, (item, key) => {
                  if (item >= max) t[key] = max
                })
                setParams({ talents: t })
              }}
              options={AscensionOptions}
              value={params.ascension?.toString()}
              style="w-fit shrink-0"
            />
            <SelectInput
              onChange={(value) => setParams({ cons: parseInt(value) || 0 })}
              options={SequenceOptions}
              value={params.cons?.toString()}
              style="w-fit shrink-0"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 -mb-2">
        <div className="w-full border-t border-primary-border" />
        <p className="text-lg font-bold text-center text-white">Forte</p>
        <div className="w-full border-t border-primary-border" />
      </div>
      <div className="grid grid-cols-2 gap-5 mobile:gap-3 mobile:grid-cols-1">
        <div className="space-y-5">
          <div className="flex items-center justify-center gap-5">
            <div className="flex items-center justify-center gap-4">
              <TalentIcon
                talent={talent?.talents?.normal}
                element={charData?.element}
                size="w-9 h-9"
                showUpgrade
                hideTip
                type={talent?.talents?.basic?.trace}
              />
              <div>
                <p className="text-xs text-primary-lighter">Normal Attack</p>
                <SelectInput
                  value={params?.talents?.normal?.toString()}
                  onChange={(value) => setParams({ talents: { ...params.talents, normal: parseInt(value) } })}
                  options={talentLevels}
                  style="w-14"
                  disabled={!charData}
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <TalentIcon
                talent={talent?.talents?.skill}
                element={charData?.element}
                size="w-9 h-9"
                level={char?.talents?.skill}
                showUpgrade
                hideTip
                type={talent?.talents?.skill?.trace}
              />
              <div>
                <p className="text-xs text-primary-lighter">Res. Skill</p>
                <SelectInput
                  value={params?.talents?.skill?.toString()}
                  onChange={(value) => setParams({ talents: { ...params.talents, skill: parseInt(value) } })}
                  options={talentLevels}
                  style="w-14"
                  disabled={!charData}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-5">
            <div className="flex items-center justify-center gap-4">
              <TalentIcon
                talent={talent?.talents?.forte}
                element={charData?.element}
                size="w-9 h-9"
                level={char?.talents?.forte}
                showUpgrade
                hideTip
                type={talent?.talents?.forte?.trace}
              />
              <div>
                <p className="text-xs text-primary-lighter">Forte Circuit</p>
                <SelectInput
                  value={params?.talents?.forte?.toString()}
                  onChange={(value) => setParams({ talents: { ...params.talents, forte: parseInt(value) } })}
                  options={talentLevels}
                  style="w-14"
                  disabled={!charData}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-5">
            <div className="flex items-center justify-center gap-4">
              <TalentIcon
                talent={talent?.talents?.lib}
                element={charData?.element}
                size="w-9 h-9"
                level={char?.talents?.lib}
                showUpgrade
                hideTip
                type={talent?.talents?.lib?.trace}
              />
              <div>
                <p className="text-xs text-primary-lighter">Liberation</p>
                <SelectInput
                  value={params?.talents?.lib?.toString()}
                  onChange={(value) => setParams({ talents: { ...params.talents, lib: parseInt(value) } })}
                  options={talentLevels}
                  style="w-14"
                  disabled={!charData}
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <TalentIcon
                talent={talent?.talents?.intro}
                element={charData?.element}
                size="w-9 h-9"
                level={char?.talents?.intro}
                showUpgrade
                hideTip
                type={talent?.talents?.intro?.trace}
              />
              <div>
                <p className="text-xs text-primary-lighter">Intro Skill</p>
                <SelectInput
                  value={params?.talents?.intro?.toString()}
                  onChange={(value) => setParams({ talents: { ...params.talents, intro: parseInt(value) } })}
                  options={talentLevels}
                  style="w-14"
                  disabled={!charData}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden w-full border-t border-primary-border mobile:block" />
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-4 py-2">
            <TalentIcon talent={talent?.talents?.i1} element={charData?.element} size="w-9 h-9" hideTip />
            <div className="flex flex-col gap-1.5 whitespace-nowrap">
              <p className="text-xs text-primary-lighter">Inherent 1</p>
              <CheckboxInput
                checked={params?.i?.i1}
                onClick={(value) => setParams({ i: { ...params.i, i1: value } })}
              />
            </div>
            <TalentIcon talent={talent?.talents?.i2} element={charData?.element} size="w-9 h-9" hideTip />
            <div className="flex flex-col gap-1.5 whitespace-nowrap">
              <p className="text-xs text-primary-lighter">Inherent 2</p>
              <CheckboxInput
                checked={params?.i?.i2}
                onClick={(value) => setParams({ i: { ...params.i, i2: value } })}
              />
            </div>
          </div>
          <div className="w-full border-t border-primary-border" />
          <div className="px-2 space-y-8 mobile:w-[250px] mobile:mx-auto">
            {_.map(charData?.growth, (item, index) => (
              <div className="relative grid items-center h-12 grid-cols-5 gap-3 text-gray">
                <div className="flex flex-col items-center">
                  <p className="text-xs font-bold text-center text-white">{item}</p>
                  <p className="text-xs">{toPercentage(StatBonusValue[item][0])}</p>
                </div>
                <div className="flex flex-col items-center justify-between h-full">
                  <CheckboxInput
                    checked={params?.growth?.[0 + index * 4]}
                    onClick={(v) => {
                      const g = _.cloneDeep(params.growth)
                      g.splice(0 + index * 4, 1, v)
                      setParams({ growth: g })
                    }}
                  />
                  <CheckboxInput
                    checked={params?.growth?.[1 + index * 4]}
                    onClick={(v) => {
                      const g = _.cloneDeep(params.growth)
                      g.splice(1 + index * 4, 1, v)
                      setParams({ growth: g })
                    }}
                  />
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary ring ring-primary-light ring-offset-2 ring-offset-primary-bg shrink-0">
                    <img src={StatIcons[item]} className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between h-full">
                  <CheckboxInput
                    checked={params?.growth?.[2 + index * 4]}
                    onClick={(v) => {
                      const g = _.cloneDeep(params.growth)
                      g.splice(2 + index * 4, 1, v)
                      setParams({ growth: g })
                    }}
                  />
                  <CheckboxInput
                    checked={params?.growth?.[3 + index * 4]}
                    onClick={(v) => {
                      const g = _.cloneDeep(params.growth)
                      g.splice(3 + index * 4, 1, v)
                      setParams({ growth: g })
                    }}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-xs font-bold text-center text-white">{item}</p>
                  <p className="text-xs">{toPercentage(StatBonusValue[item][1])}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full border-t border-primary-border" />
      <div className="flex justify-between">
        {_.find(charStore.characters, (item) => item.cId === cId) ? (
          <PrimaryButton title="Remove" onClick={onDelete} />
        ) : (
          <div />
        )}
        <PrimaryButton title="Save" onClick={onSave} />
      </div>
    </div>
  )
})
