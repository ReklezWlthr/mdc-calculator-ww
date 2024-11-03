import { useParams } from '@src/core/hooks/useParams'
import { findCharacter } from '@src/core/utils/finder'
import { useStore } from '@src/data/providers/app_store_provider'
import { IArtifactEquip, ITeamChar } from '@src/domain/constant'
import { CheckboxInput } from '@src/presentation/components/inputs/checkbox'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'

export const ImportModal = observer(({ char, artifacts }: { char: ITeamChar; artifacts: IArtifactEquip[] }) => {
  const { artifactStore, charStore, buildStore, modalStore, toastStore } = useStore()

  const { params, setParams } = useParams({
    character: true,
    artifacts: true,
    build: true,
    buildName: `${findCharacter(char?.cId)?.name}'s Build`,
    default: true,
  })

  const onSubmit = useCallback(() => {
    if (params.character && char) {
      const exist = _.find(charStore.characters, ['id', char.cId])
      const data = {
        cId: char.cId,
        ascension: char.ascension,
        talents: char.talents,
        cons: char.cons,
        level: char.level,
      }
      if (exist) {
        charStore.editChar(char.cId, data)
      } else {
        charStore.addChar(data)
      }
    }
    if (params.artifacts && artifacts) {
      _.forEach(artifacts, (a) => artifactStore.addArtifact(a))
    }
    if (params.build && char && artifacts) {
      const id = crypto.randomUUID()
      const a = char.equipments.artifacts
      buildStore.saveBuild({
        artifacts: [a[3], a[1], a[4], a[0], a[2]],
        isDefault: false,
        cId: char.cId,
        name: params.buildName,
        id,
        weapon: char.equipments.weapon,
      })
      if (params.default) buildStore.setDefault(id)
      toastStore.openNotification({
        title: 'Data Imported Successfully',
        icon: 'fa-solid fa-circle-check',
        color: 'green',
      })
    }
    modalStore.closeModal()
  }, [params])

  return (
    <div className="w-[25vw] bg-primary-dark rounded-lg p-3 space-y-2">
      <p className="text-lg font-bold text-white">Choose What to Import</p>
      <div className="p-3 space-y-2 rounded-lg bg-primary-darker">
        <p className="font-bold text-white">Import Character</p>
        <div className="border-t border-primary-border" />
        <div className="flex items-center justify-between gap-x-2">
          <div>
            <p className="text-sm text-gray">✦ Level, Talents and Constellations</p>
            <p className="text-xs italic text-red">✦ This will overwrite the current character data in the storage.</p>
          </div>
          <CheckboxInput checked={params.character} onClick={(v) => setParams({ character: v })} />
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <p className="text-sm text-gray">✦ Equipped Artifacts</p>
          <CheckboxInput checked={params.artifacts} onClick={(v) => setParams({ artifacts: v })} />
        </div>
      </div>
      <div className="p-3 space-y-2 rounded-lg bg-primary-darker">
        <div className="flex items-center justify-between gap-x-2">
          <p className="font-bold text-white">Save Build</p>
          <CheckboxInput checked={params.build} onClick={(v) => setParams({ build: v })} />
        </div>
        <div className="border-t border-primary-border" />
        <div className="flex items-center justify-between gap-x-2">
          <p className="text-sm text-gray">✦ Build Name</p>
          <TextInput
            value={params.buildName}
            onChange={(v) => setParams({ buildName: v })}
            disabled={!params.build}
            style="!w-1/2"
          />
        </div>
        <div className="flex items-center justify-end gap-x-2">
          <p className="text-xs text-gray">Set Build as Default</p>
          <CheckboxInput checked={params.default} onClick={(v) => setParams({ default: v })} disabled={!params.build} />
        </div>
      </div>
      <div className="flex justify-end">
        <PrimaryButton title="Import" onClick={onSubmit} disabled={params.build && !params.buildName} />
      </div>
    </div>
  )
})
