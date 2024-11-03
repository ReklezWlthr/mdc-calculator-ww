import { useStore } from '@src/data/providers/app_store_provider'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { TSetup } from '@src/data/stores/setup_store'
import classNames from 'classnames'
import { ElementIconColor } from '../cons_circle'
import { findCharacter } from '@src/core/utils/finder'
import { useCallback, useMemo, useState } from 'react'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { CommonModal } from '@src/presentation/components/common_modal'
import { getAvatar } from '@src/core/utils/fetcher'

export interface TeamModalProps {
  onSelect: (team: TSetup) => void
  filterId?: string
  hideCurrent?: boolean
}

export const TeamModalBlock = ({ team, button }: { team: TSetup; button: React.ReactNode }) => {
  const { settingStore, setupStore, toastStore } = useStore()

  const codeName = (id: string) => {
    const c = findCharacter(id)?.codeName
    return c === 'Player' ? settingStore.settings.travelerGender : c || ''
  }

  const [edit, setEdit] = useState(false)
  const [name, setName] = useState(team.name || '')

  return (
    <div
      className="flex items-center justify-between w-full px-3 py-2 text-white rounded-lg bg-primary-darker"
      key={team.id}
    >
      <div className="w-full space-y-1">
        <div className="flex items-center justify-between w-[247px] gap-x-2">
          {edit && team.id ? (
            <>
              <TextInput small placeholder="Enter Setup Name" value={name} onChange={setName} />
              <i
                className="flex items-center justify-center w-5 h-5 text-xs rounded-sm cursor-pointer fa-solid fa-times text-red bg-primary shrink-0"
                onClick={() => {
                  setEdit(false)
                  setName(team.name || '')
                }}
              />
              <i
                className={classNames(
                  'flex items-center justify-center w-5 h-5 text-xs rounded-sm cursor-pointer fa-solid fa-check shrink-0 duration-200',
                  name ? 'text-heal bg-primary' : 'text-primary bg-primary-dark'
                )}
                onClick={() => {
                  if (name) {
                    setupStore.editTeam(team.id, { name })
                    setEdit(false)
                    toastStore.openNotification({
                      title: 'Update Team Successfully',
                      icon: 'fa-solid fa-circle-check',
                      color: 'green',
                    })
                  }
                }}
              />
            </>
          ) : (
            <>
              <p className="truncate w-fit">{team.name}</p>
              {!!team.id && (
                <i
                  className="flex items-center justify-center w-5 h-5 text-xs rounded-md cursor-pointer text-gray bg-primary-light fa-regular fa-pen-to-square shrink-0"
                  onClick={() => setEdit(true)}
                />
              )}
            </>
          )}
        </div>
        <div className="flex gap-2">
          {_.map(team.char, (item) => (
            <div
              className={classNames(
                'relative overflow-hidden rounded-lg w-14 h-7 bg-opacity-25',
                ElementIconColor[findCharacter(item.cId)?.element] || 'bg-primary'
              )}
              key={item.cId}
            >
              {!!item.cId && (
                <img src={getAvatar(codeName(item.cId))} className="absolute object-cover scale-[1.75] -mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-x-2">{button}</div>
    </div>
  )
}

export const TeamModal = observer(({ onSelect, filterId, hideCurrent }: TeamModalProps) => {
  const { modalStore, teamStore, setupStore, toastStore } = useStore()

  const [search, setSearch] = useState('')

  const team = useMemo(
    () => [
      ...(hideCurrent || _.every(teamStore.characters, (item) => !item.cId)
        ? []
        : [{ id: '', char: teamStore.characters, name: 'Current Team Setup' }]),
      ...(search
        ? _.filter(setupStore.team, (item) =>
            _.some([..._.map(item.char, (c) => findCharacter(c?.cId)?.name), item.name], (q) =>
              _.includes(q?.toLowerCase(), search?.toLowerCase())
            )
          )
        : setupStore.team),
    ],
    [setupStore.team, teamStore.characters, search]
  )

  const onOpenConfirmModal = useCallback(
    (tId: string) => {
      modalStore.closeModal()
      modalStore.openModal(
        <CommonModal
          icon="fa-solid fa-exclamation-circle text-red"
          title="Delete Setup"
          desc="Are you sure you want to delete this setup?"
          onConfirm={() => {
            const pass = setupStore.deleteTeam(tId)
            if (pass) {
              toastStore.openNotification({
                title: 'Setup Deleted Successfully',
                icon: 'fa-solid fa-circle-check',
                color: 'green',
              })
            } else {
              toastStore.openNotification({
                title: 'Something Went Wrong',
                icon: 'fa-solid fa-exclamation-circle',
                color: 'red',
              })
            }
          }}
          onCancel={() => {
            modalStore.closeModal()
            modalStore.openModal(<TeamModal onSelect={onSelect} filterId={filterId} hideCurrent={hideCurrent} />)
          }}
        />
      )
    },
    [onSelect, filterId, hideCurrent]
  )

  return (
    <div className="px-5 py-3 space-y-3 text-white rounded-lg bg-primary-dark w-[400px]">
      <div className="flex items-center justify-between w-full gap-3">
        <p className="font-semibold shrink-0">Select a Setup</p>
        <TextInput value={search} onChange={setSearch} placeholder="Search Setup Name or Members" />
      </div>
      <div className="space-y-2 dropdownScrollbar max-h-[70vh]">
        {_.map(
          filterId
            ? _.filter(team, (item) =>
                _.includes(
                  _.map(item.char, (c) => c.cId),
                  filterId
                )
              )
            : team,
          (team) => {
            return (
              <TeamModalBlock
                team={team}
                button={
                  <div className="flex flex-col items-center gap-1">
                    <PrimaryButton
                      title="Select"
                      small
                      onClick={() => {
                        modalStore.closeModal()
                        onSelect(_.cloneDeep(team))
                      }}
                      style="w-[55px]"
                    />
                    {team.id && (
                      <PrimaryButton
                        title="Delete"
                        small
                        onClick={() => onOpenConfirmModal(team.id)}
                        style="w-[55px]"
                      />
                    )}
                  </div>
                }
              />
            )
          }
        )}
      </div>
    </div>
  )
})
