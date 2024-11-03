import { useStore } from '@src/data/providers/app_store_provider'
import { GhostButton } from '@src/presentation/components/ghost.button'
import { CheckboxInput } from '@src/presentation/components/inputs/checkbox'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { useCallback, useMemo, useState } from 'react'
import { BuildModalBlock } from './build_modal'

export const SaveBuildModal = observer(({ index }: { index: number }) => {
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [isDefault, setDefault] = useState(true)

  const { modalStore, teamStore, buildStore, toastStore } = useStore()

  const char = teamStore.characters[index]
  const filteredBuilds = useMemo(
    () =>
      _.orderBy(
        _.filter(buildStore.builds, (build) => build.cId === char?.cId),
        'isDefault',
        'desc'
      ),
    [buildStore.builds, char]
  )

  const onSaveBuild = useCallback(() => {
    const id = crypto.randomUUID()

    if (name) {
      const pass = buildStore.saveBuild({
        id,
        name,
        note,
        cId: char?.cId,
        isDefault: false,
        ..._.cloneDeep(char?.equipments),
      })
      if (pass) {
        isDefault && buildStore.setDefault(id)
        modalStore.closeModal()
        toastStore.openNotification({
          title: 'Build Saved Successfully',
          icon: 'fa-solid fa-circle-check',
          color: 'green',
        })
      }
    }
  }, [index, name, note, isDefault])

  return (
    <div className="space-y-4">
      <div className="px-5 py-3 space-y-3 text-white rounded-lg bg-primary-dark w-[400px]">
        <div className="space-y-2">
          <p className="font-semibold">Create New Build</p>
          <div className="flex items-center gap-2">
            <p className="text-sm shrink-0 w-[85px]">
              Build Name <span className="text-red">*</span>
            </p>
            <TextInput onChange={setName} value={name} placeholder="Enter Build Name" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm shrink-0 w-[85px]">Build Note</p>
            <TextInput onChange={setNote} value={note} placeholder="Enter Build Note" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-2">
          <p className="text-xs text-gray">Set Build as Default</p>
          <CheckboxInput checked={isDefault} onClick={(v) => setDefault(v)} />
        </div>
        <div className="flex justify-end gap-2">
          <GhostButton title="Cancel" onClick={() => modalStore.closeModal()} />
          <PrimaryButton title="Confirm" onClick={onSaveBuild} disabled={!name} />
        </div>
      </div>
      {_.size(filteredBuilds) > 0 && (
        <div className="px-5 py-3 space-y-3 text-white rounded-lg bg-primary-dark w-[400px]">
          <p className="font-semibold">Or Update An Existing Build</p>
          <div className="space-y-2 dropdownScrollbar max-h-[30vh]">
            {_.map(filteredBuilds, (build) => {
              return (
                <BuildModalBlock
                  build={build}
                  button={
                    <PrimaryButton
                      title="Update"
                      onClick={() => {
                        buildStore.editBuild(build.id, char?.equipments)
                        toastStore.openNotification({
                          title: 'Update Build Successfully',
                          icon: 'fa-solid fa-circle-check',
                          color: 'green',
                        })
                        modalStore.closeModal()
                      }}
                    />
                  }
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
})
