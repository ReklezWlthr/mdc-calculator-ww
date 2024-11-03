import { observer } from 'mobx-react-lite'
import { TalentIcon } from '@src/presentation/genshin/components/tables/scaling_wrapper'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import _ from 'lodash'
import { CheckboxInput } from '@src/presentation/components/inputs/checkbox'
import { AscensionOptions, SequenceOptions, ITeamChar } from '@src/domain/constant'
import { findCharacter } from '@src/core/utils/finder'
import { SelectInput } from '@src/presentation/components/inputs/select_input'
import ConditionalsObject from '@src/data/lib/stats/conditionals/conditionals'
import { useStore } from '@src/data/providers/app_store_provider'
import { findBaseLevel, findMaxLevel } from '@src/core/utils/data_format'
import { useCallback, useMemo } from 'react'
import { CharacterModal } from '../modals/character_modal'
import { PillInput } from '@src/presentation/components/inputs/pill_input'
import { AbilityBlock } from '../ability_block'
import { ConsCircle } from '../cons_circle'

export const CompareTraceBlock = observer(({ char, team }: { char: ITeamChar; team: ITeamChar[][] }) => {
  const { setupStore, settingStore, modalStore } = useStore()

  const charData = findCharacter(char?.cId)
  const [setupIndex, charIndex] = setupStore.selected

  const talent = _.find(ConditionalsObject, ['id', char?.cId])?.conditionals(
    char?.cons,
    char?.ascension,
    char?.talents,
    setupIndex === 0 ? setupStore.main.char : setupStore.comparing[setupIndex - 1]?.char,
    settingStore.settings.travelerGender
  )

  const levels = useMemo(
    () =>
      char?.ascension
        ? _.map(
            Array(findMaxLevel(char.ascension) - findBaseLevel(char.ascension) + 1 || 1).fill(
              findBaseLevel(char.ascension)
            ),
            (item, index) => ({
              name: _.toString(item + index),
              value: _.toString(item + index),
            })
          ).reverse()
        : [{ name: '1', value: '1' }],
    [char?.ascension]
  )

  const onOpenModal = useCallback(() => {
    modalStore.openModal(<CharacterModal index={charIndex} setChar={(_i, value) => setupStore.setComparing(value)} />)
  }, [modalStore])

  return (
    <div className="w-full px-2 space-y-5">
      <div className="flex flex-col items-center py-3 gap-y-5">
        <p className="-mb-2 text-lg font-bold text-center text-white">Character Details</p>
        <div className="flex items-center w-3/4 gap-2">
          <p className="text-sm font-semibold text-white">Name</p>
          <PillInput
            onClick={onOpenModal}
            value={charData?.name}
            onClear={() => setupStore.clearComparing()}
            disabled={char?.cId === setupStore.mainChar}
            placeholder="Select a Character"
          />
        </div>
        <div className="flex items-center w-3/4 gap-2">
          <p className="text-sm font-semibold text-white">Level</p>
          <SelectInput
            onChange={(value) => setupStore.setComparing({ level: parseInt(value) || 0 })}
            options={levels}
            value={char?.level?.toString() || '1'}
            disabled={!char}
            style="w-full"
          />
          <SelectInput
            onChange={(value) => {
              const max = _.max([1, (parseInt(value) - 1) * 2])
              setupStore.setComparing({
                ascension: parseInt(value) || 0,
                level: findMaxLevel(parseInt(value) || 0),
              })
              const t = char.talents
              _.forEach(char.talents, (item, key: 'basic' | 'skill' | 'ult' | 'talent') => {
                const m = key === 'basic' ? parseInt(value) || 1 : max
                if (item >= m) t[key] = m
              })
              setupStore.setComparing({ talents: t })
            }}
            options={AscensionOptions}
            value={char?.ascension?.toString() || '0'}
            disabled={!char}
            style="w-fit"
          />
          <SelectInput
            onChange={(value) => setupStore.setComparing({ cons: parseInt(value) || 0 })}
            options={SequenceOptions}
            value={char?.cons?.toString() || '0'}
            disabled={!char}
            style="w-fit"
          />
        </div>
        {char && (
          <div className="flex flex-col items-center text-white gap-y-6">
            <p className="-mb-5 text-lg font-bold text-center">Talents</p>
            <AbilityBlock
              char={char}
              talents={talent?.talents}
              upgrade={talent?.upgrade}
              onChange={(key, value) => setupStore.setComparing({ talents: { ...char?.talents, [key]: value } })}
            />
            <ConsCircle
              codeName={charData?.codeName}
              cons={char?.cons}
              element={charData?.element}
              name={charData?.constellation}
              talents={talent?.talents}
            />
          </div>
        )}
      </div>
    </div>
  )
})
