import { useStore } from '@src/data/providers/app_store_provider'
import { GhostButton } from '@src/presentation/components/ghost.button'
import { CheckboxInput } from '@src/presentation/components/inputs/checkbox'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { useCallback, useMemo, useState } from 'react'
import { TeamModalBlock } from './team_modal'

export const SaveTeamModal = observer(() => {
  const [name, setName] = useState('')
  const [search, setSearch] = useState('')

  const { modalStore, teamStore, setupStore, toastStore } = useStore()

  const filteredTeam = search
    ? _.filter(setupStore.team, (item) => !!item.name.match(new RegExp(search, 'gi')))
    : setupStore.team

  const onSaveBuild = useCallback(() => {
    const id = crypto.randomUUID()

    if (name) {
      const pass = setupStore.saveTeam({
        id,
        name,
        char: _.cloneDeep(teamStore.characters),
      })
      if (pass) {
        modalStore.closeModal()
        toastStore.openNotification({
          title: 'Team Saved Successfully',
          icon: 'fa-solid fa-circle-check',
          color: 'green',
        })
      }
    }
  }, [name])

  return (
    <div className="space-y-4">
      <div className="px-5 py-3 space-y-3 text-white rounded-lg bg-primary-dark w-[410px]">
        <div className="space-y-1">
          <p className="font-semibold">
            Create New Team <span className="text-red">*</span>
          </p>
          <TextInput onChange={setName} value={name} placeholder="Enter Team Name" />
        </div>
        <div className="flex justify-end gap-2">
          <GhostButton title="Cancel" onClick={() => modalStore.closeModal()} />
          <PrimaryButton title="Confirm" onClick={onSaveBuild} disabled={!name} />
        </div>
      </div>
      {_.size(filteredTeam) > 0 && (
        <div className="px-5 py-3 space-y-3 text-white rounded-lg bg-primary-dark w-[410px]">
          <div className="flex items-center gap-3">
            <p className="font-semibold shrink-0">Or Update An Existing Team</p>
            <TextInput value={search} onChange={setSearch} placeholder="Search Setup Name" />
          </div>
          <div className="space-y-2 dropdownScrollbar max-h-[35vh]">
            {_.map(filteredTeam, (team) => {
              return (
                <TeamModalBlock
                  key={team.id}
                  team={team}
                  button={
                    <PrimaryButton
                      title="Update"
                      onClick={() => {
                        setupStore.editTeam(team.id, { char: _.cloneDeep(teamStore.characters) })
                        toastStore.openNotification({
                          title: 'Update Team Successfully',
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
