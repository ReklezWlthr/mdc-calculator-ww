import { useStore } from '@src/data/providers/app_store_provider'
import { GhostButton } from '@src/presentation/components/ghost.button'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

export const RenameModal = observer(({ onSave }: { onSave: (name: string) => void }) => {
  const [name, setName] = useState('')

  const { modalStore } = useStore()

  return (
    <div className="px-5 py-3 space-y-3 text-white rounded-lg bg-primary-dark w-[350px]">
      <div className="space-y-2">
        <div>
          <p className="font-semibold">Rename Setup</p>
          <p className="text-xs italic text-red">* Only applies to this comparing session *</p>
        </div>
        <TextInput onChange={setName} value={name} placeholder="Enter New Setup Name" />
      </div>
      <div className="flex justify-end gap-2">
        <GhostButton title="Cancel" onClick={() => modalStore.closeModal()} />
        <PrimaryButton
          title="Confirm"
          onClick={() => {
            onSave(name)
            modalStore.closeModal()
          }}
          disabled={!name}
        />
      </div>
    </div>
  )
})
