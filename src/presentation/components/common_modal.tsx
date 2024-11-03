import { observer } from 'mobx-react-lite'
import { GhostButton } from './ghost.button'
import { PrimaryButton } from './primary.button'
import { useStore } from '@src/data/providers/app_store_provider'
import classNames from 'classnames'

interface CommonModalProps {
  title: string
  desc: string
  icon?: string
  onCancel?: () => void
  onConfirm: () => void
}

export const CommonModal = observer(({ title, desc, onCancel, onConfirm, icon }: CommonModalProps) => {
  const { modalStore } = useStore()

  return (
    <div className="w-[400px] p-4 text-white rounded-xl bg-primary-dark space-y-3 font-semibold">
      <div className="flex items-center gap-x-1">
        <i className={classNames('w-8 h-8 flex items-center justify-center text-xl', icon)} />
        <p className="text-lg">{title}</p>
      </div>
      <p className="text-sm font-normal whitespace-pre-wrap">{desc}</p>
      <div className="flex justify-end gap-x-2">
        <GhostButton
          title="Cancel"
          onClick={() => {
            onCancel?.()
            modalStore.closeModal()
          }}
        />
        <PrimaryButton
          title="Confirm"
          onClick={() => {
            onConfirm()
            modalStore.closeModal()
          }}
        />
      </div>
    </div>
  )
})
