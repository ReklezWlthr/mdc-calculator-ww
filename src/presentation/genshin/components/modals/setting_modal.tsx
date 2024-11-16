import { useStore } from '@src/data/providers/app_store_provider'
import { CommonModal } from '@src/presentation/components/common_modal'
import { CheckboxInput } from '@src/presentation/components/inputs/checkbox'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { ToggleSwitch } from '@src/presentation/components/inputs/toggle'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'

export const SettingModal = observer(() => {
  const { settingStore } = useStore()

  return (
    <div className="w-[400px] bg-primary-dark rounded-lg p-3 space-y-2">
      <p className="text-lg font-bold text-white">Settings</p>
      <div className="p-3 space-y-1 rounded-lg bg-primary-darker">
        <div className="flex items-center justify-between gap-x-2">
          <p className="text-sm text-gray">Choose Your Rover</p>
          <div className="flex items-center gap-2 text-xs text-desc">
            <p>Male</p>
            <ToggleSwitch
              enabled={settingStore.settings.travelerGender === 'zhujue'}
              onClick={(v) => settingStore.setSettingValue({ travelerGender: v ? 'zhujue' : 'zhujuenan' })}
            />
            <p>Female</p>
          </div>
        </div>
      </div>
      <div className="p-3 space-y-1 rounded-lg bg-primary-darker">
        <p className="text-white">Default Data</p>
        <div className="flex items-center justify-between gap-x-2">
          <p className="text-sm text-gray">Default Enemy Level</p>
          <TextInput
            value={settingStore.settings?.defaultEnemyLevel?.toString()}
            onChange={(v) => settingStore.setSettingValue({ defaultEnemyLevel: parseInt(v) })}
            style="!w-1/4"
          />
        </div>
      </div>
      <div className="p-3 space-y-1 rounded-lg bg-primary-darker">
        <p className="text-white">Account Data</p>
        <div className="flex gap-x-2">
          <p className="text-sm text-gray">Automatically save my account data to the browser's local storage</p>
          <CheckboxInput
            checked={settingStore.settings.storeData}
            onClick={(v) => settingStore.setSettingValue({ storeData: v })}
          />
        </div>
        <p className="text-xs italic text-desc">✦ The saved data will only be available in this browser.</p>
        <p className="text-xs italic text-red">
          ✦ Turning this setting off will potentially remove all your data on the site.
        </p>
      </div>
    </div>
  )
})
