import { Dialog, Transition } from '@headlessui/react'
import { useParams } from '@src/core/hooks/useParams'
import { Echoes, Sonata } from '@src/data/db/artifacts'
import classNames from 'classnames'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { Fragment, useState } from 'react'
import { SonataColor, SonataIcons } from '../artifact_block'
import { getEchoImage } from '@src/core/utils/fetcher'
import { isSubsetOf } from '@src/core/utils/finder'

export const EchoFilterModal = observer(
  ({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (id: string) => void }) => {
    const { setParams, params } = useParams({
      sonata: [],
      cost: [],
    })

    const SonataIcon = ({ value }: { value: Sonata }) => {
      const checked = _.includes(params.sonata, value)
      return (
        <div
          className={classNames(
            'w-8 h-8 duration-200 rounded-full cursor-pointer hover:bg-primary-lighter flex items-center justify-center',
            {
              'bg-primary-lighter': checked,
            }
          )}
          onClick={() => setParams({ sonata: checked ? _.without(params.sonata, value) : [...params.sonata, value] })}
          title={value}
        >
          <div
            className={classNames(
              'flex items-center justify-center text-xs bg-opacity-75 w-5 h-5 rounded-full bg-primary ring-2',
              SonataColor[value]
            )}
          >
            <img src={SonataIcons[value]} className="w-5 h-5" />
          </div>
        </div>
      )
    }

    const CostIcon = ({ value }: { value: number }) => {
      const checked = _.includes(params.cost, value)
      return (
        <div
          className={classNames(
            'w-8 h-8 duration-200 rounded-full cursor-pointer hover:bg-primary-lighter flex items-center justify-center',
            {
              'bg-primary-lighter': checked,
            }
          )}
          onClick={() => setParams({ cost: checked ? _.without(params.cost, value) : [...params.cost, value] })}
          title={`${value} Cost`}
        >
          <div className="flex items-center justify-center w-5 h-5 text-xs bg-opacity-75 rounded-full bg-primary ring-2 ring-primary-light">
            {value}
          </div>
        </div>
      )
    }

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
              <div className="z-50 flex justify-center pt-[10dvh] pb-[6dvh] w-screen h-screen pointer-events-none overflow-y-auto hideScrollbar">
                <div className="pointer-events-auto h-fit">
                  {open && (
                    <div className="w-[1100px] mobile:w-[400px] max-h-[80dvh] p-4 space-y-4 font-semibold text-white rounded-xl bg-primary-dark relative">
                      <div className="flex items-center gap-3 mobile:flex-col">
                        <div className="flex items-center gap-x-3 mobile:flex-col">
                          <p className="shrink-0 text-primary-lighter">Sonata:</p>
                          <div className="flex gap-2">
                            <SonataIcon value={Sonata.ICE} />
                            <SonataIcon value={Sonata.FIRE} />
                            <SonataIcon value={Sonata.THUNDER} />
                            <SonataIcon value={Sonata.WIND} />
                            <SonataIcon value={Sonata.LIGHT} />
                            <SonataIcon value={Sonata.HAVOC} />
                            <SonataIcon value={Sonata.HEAL} />
                            <SonataIcon value={Sonata.REGEN} />
                            <SonataIcon value={Sonata.ATK} />
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="pl-4 shrink-0 text-primary-lighter">Cost:</p>
                          <div className="flex gap-2">
                            <CostIcon value={4} />
                            <CostIcon value={3} />
                            <CostIcon value={1} />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 mobile:grid-cols-1 gap-4 overflow-y-auto max-h-[450px] hideScrollbar rounded-lg py-1">
                        {_.map(filteredEchoes, (item) => (
                          <div
                            className="flex gap-4 p-3 duration-200 border-2 rounded-lg cursor-pointer border-primary-lighter hover:bg-primary bg-primary-darker"
                            onClick={() => onSelect(item?.id)}
                          >
                            <img
                              src={getEchoImage(item?.icon)}
                              className="rounded-full ring-2 ring-gray ring-offset-[3px] ring-offset-primary-dark w-11 h-11"
                            />
                            <div className="space-y-1">
                              <p className="text-sm">{item?.name}</p>
                              <div className="flex gap-2">
                                {_.map(item?.sonata, (s) => (
                                  <div
                                    className={classNames(
                                      'flex items-center justify-center text-xs bg-opacity-75 w-5 h-5 rounded-full bg-primary ring-2',
                                      SonataColor[s]
                                    )}
                                  >
                                    <img src={SonataIcons[s]} className="w-5 h-5" />
                                  </div>
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
