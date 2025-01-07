import { Dialog, Transition } from '@headlessui/react'
import { useParams } from '@src/core/hooks/useParams'
import { Echoes, Sonata } from '@src/data/db/artifacts'
import classNames from 'classnames'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { Fragment, useState } from 'react'
import { SonataIcons } from '../artifact_block'
import { getEchoImage } from '@src/core/utils/fetcher'
import { isSubsetOf } from '@src/core/utils/finder'
import { TagSelectInput } from '@src/presentation/components/inputs/tag_select_input'

export const EchoFilterModal = observer(
  ({
    open,
    onClose,
    onSelect,
  }: {
    open: boolean
    onClose: () => void
    onSelect: (id: string, sonata: Sonata) => void
  }) => {
    const { setParams, params } = useParams({
      sonata: [],
      cost: [],
    })

    const filteredEchoes = _.orderBy(
      _.filter(Echoes, (item) => {
        const sonataMatch = !_.size(params.sonata) || isSubsetOf(params.sonata, item?.sonata)
        const costMatch = !_.size(params.cost) || _.includes(params.cost, item?.cost)
        return sonataMatch && costMatch
      }),
      ['cost', 'name'],
      ['desc', 'asc']
    )

    return (
      <Transition show={open} as={Fragment}>
        <Dialog onClose={() => onClose()} className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 "
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 pt-14 bg-primary-bg/80" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="z-50 flex justify-center desktop:pt-[10dvh] desktop:pb-[6dvh] pt-0 pb-0 items-center desktop:items-start w-screen h-screen pointer-events-none overflow-y-auto hideScrollbar">
                <div className="pointer-events-auto h-fit">
                  {open && (
                    <div className="w-[1100px] mobile:w-[400px] p-4 space-y-4 font-semibold text-white rounded-xl bg-primary-dark relative">
                      <div className="flex items-center gap-4 mobile:w-full mobile:flex-col">
                        <p>Select an Echo</p>
                        <div className="grid items-center w-1/2 grid-cols-2 gap-4 mobile:w-full">
                          <TagSelectInput
                            values={params.sonata}
                            options={_.map(Sonata, (s) => ({ name: s, value: s, img: SonataIcons[s] }))}
                            onChange={(sonata) => setParams({ sonata })}
                            placeholder="Sonata - Match All"
                            onlyShowCount
                          />
                          <TagSelectInput
                            values={params.cost}
                            options={[
                              { name: 'Overlord/Calamity (4 Cost)', value: 4 as any },
                              { name: 'Elite (3 Cost)', value: 3 as any },
                              { name: 'Common (1 Cost)', value: 1 as any },
                            ]}
                            onChange={(cost) => setParams({ cost })}
                            placeholder="Cost - Match All"
                            onlyShowCount
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 mobile:grid-cols-1 gap-4 overflow-y-auto max-h-[450px] hideScrollbar rounded-lg py-1">
                        {_.map(filteredEchoes, (item) => (
                          <div
                            className="flex w-full gap-4 p-3 duration-200 border-2 rounded-lg cursor-pointer border-primary-lighter hover:bg-primary bg-primary-darker"
                            onClick={() => onSelect(item?.id, _.head(params.sonata) || null)}
                            key={item?.id}
                          >
                            <img
                              src={getEchoImage(item?.icon)}
                              className="rounded-full ring-2 ring-gray ring-offset-[3px] ring-offset-primary-dark w-11 h-11"
                            />
                            <div className="w-full space-y-1">
                              <p className="w-full text-sm break-all line-clamp-1">{item?.name}</p>
                              <div className="flex flex-wrap gap-2">
                                {_.map(item?.sonata, (s) => (
                                  <img src={SonataIcons[s]} className="w-6 h-6" key={s} />
                                ))}
                                <div className="text-xs bg-primary-light px-1.5 py-0.5 rounded-md">
                                  {item?.cost} Cost
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    )
  }
)
