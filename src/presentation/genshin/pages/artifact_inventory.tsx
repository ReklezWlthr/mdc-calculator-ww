import { useCallback, useEffect, useMemo } from 'react'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { ArtifactBlock, SonataColor, SonataIcons } from '../components/artifact_block'
import { useStore } from '@src/data/providers/app_store_provider'
import { useParams } from '@src/core/hooks/useParams'
import { SelectTextInput } from '@src/presentation/components/inputs/select_text_input'
import { ArtifactModal } from '../components/modals/artifact_modal'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import { Echoes, Sonata } from '@src/data/db/artifacts'
import { MainStatOptions, Stats, SubStatOptions } from '@src/domain/constant'
import { TagSelectInput } from '@src/presentation/components/inputs/tag_select_input'
import { isSubsetOf } from '@src/core/utils/finder'
import getConfig from 'next/config'
import { getEchoImage } from '@src/core/utils/fetcher'

const { publicRuntimeConfig } = getConfig()

export const ArtifactInventory = observer(() => {
  const { params, setParams } = useParams({
    cost: [],
    sonata: [],
    set: null,
    main: [],
    subs: [],
    page: 1,
    per_page: 10,
  })

  const { artifactStore, modalStore } = useStore()

  const TypeButton = ({
    field,
    children,
    value,
  }: {
    field: string
    children: React.ReactNode
    value: string | number
  }) => {
    const checked = _.includes(params[field], value)

    return (
      <div
        className={classNames(
          'w-8 h-8 flex items-center justify-center duration-200 rounded-full cursor-pointer hover:bg-primary-light',
          {
            'bg-primary-light': _.includes(params[field], value),
          }
        )}
        onClick={() => setParams({ [field]: checked ? _.without(params[field], value) : [...params[field], value] })}
      >
        {children}
      </div>
    )
  }

  const filteredArtifacts = useMemo(() => {
    let result = artifactStore.artifacts
    if (params.set) result = _.filter(result, (artifact) => artifact.setId === params.set)
    if (params.cost.length) result = _.filter(result, (artifact) => _.includes(params.cost, artifact.cost))
    if (params.sonata.length) result = _.filter(result, (artifact) => _.includes(params.sonata, artifact.sonata))
    if (params.main.length) result = _.filter(result, (artifact) => _.includes(params.main, artifact.main))
    if (params.subs.length)
      result = _.filter(result, (artifact) => isSubsetOf(params.subs, _.map(artifact.subList, 'stat')))
    return _.orderBy(result, ['cost', 'level', 'quality', 'setId'], ['desc', 'desc', 'desc', 'desc'])
  }, [params.set, params.cost, params.sonata, params.subs, params.main, artifactStore.artifacts])

  useEffect(() => {
    setParams({ page: 1 })
  }, [params.set, params.cost, params.subs, params.main])

  const maxPage = _.ceil(_.size(filteredArtifacts) / params.per_page)

  const onOpenModal = useCallback(() => {
    modalStore.openModal(<ArtifactModal />)
  }, [modalStore])

  return (
    <div className="w-full h-full overflow-y-auto mobile:overflow-visible">
      <div className="flex flex-col items-center w-full gap-5 p-5 max-w-[1240px] mx-auto h-full">
        <div className="flex items-center justify-between w-full">
          <p className="text-2xl font-bold text-white w-fit">Data Bank</p>
          <PrimaryButton title="Add New Echo" onClick={onOpenModal} />
        </div>
        <div className="w-full space-y-1">
          <div className="flex items-center w-full gap-3 mobile:flex-col">
            <div className="flex gap-2">
              {_.map(Sonata, (item) => (
                <TypeButton value={item} field="sonata">
                  <div
                    className={classNames(
                      'flex items-center justify-center text-xs bg-opacity-75 w-5 h-5 rounded-full bg-primary ring-2',
                      SonataColor[item]
                    )}
                  >
                    <img src={SonataIcons[item]} className="w-5 h-5" />
                  </div>
                </TypeButton>
              ))}
            </div>
            <div className="flex items-center w-full gap-3">
              <div className="flex gap-2">
                {_.map([4, 3, 1], (item) => (
                  <TypeButton value={item} field="cost">
                    <div className="flex items-center justify-center w-5 h-5 text-xs text-white bg-opacity-75 rounded-full bg-primary ring-2 ring-primary-light">
                      {item}
                    </div>
                  </TypeButton>
                ))}
              </div>
              <SelectTextInput
                value={params.set}
                options={_.map(_.orderBy(Echoes, 'name', 'asc'), (artifact) => ({
                  name: artifact.name,
                  value: artifact.id.toString(),
                  img: getEchoImage(artifact.icon),
                }))}
                placeholder="Echo Name"
                onChange={(value) => setParams({ set: value?.value })}
                style="w-full"
              />
            </div>
            <div className="grid items-center w-full grid-cols-2 gap-3">
              <TagSelectInput
                values={params.main}
                options={_.map(MainStatOptions, (item) => ({ ...item, img: publicRuntimeConfig.BASE_PATH + item.img }))}
                onChange={(main) => setParams({ main })}
                placeholder="Main Stat - Match Any"
                renderAsText
              />
              <TagSelectInput
                values={params.subs}
                options={_.map(SubStatOptions, (item) => ({ ...item, img: publicRuntimeConfig.BASE_PATH + item.img }))}
                onChange={(subs) => setParams({ subs })}
                placeholder="Sub Stats - Includes All"
                renderAsText
                maxSelection={5}
              />
            </div>
          </div>
        </div>
        {_.size(filteredArtifacts) ? (
          <>
            <div className="grid w-full grid-cols-5 gap-3 overflow-y-auto rounded-lg mobile:grid-cols-1 tablet:grid-cols-3 hideScrollbar mobile:h-max mobile:overflow-visible">
              {_.map(
                _.slice(filteredArtifacts, params.per_page * (params.page - 1), params.per_page * params.page),
                (artifact) => (
                  <div className="flex justify-center">
                    <ArtifactBlock key={artifact.id} slot={0} aId={artifact?.id} />
                  </div>
                )
              )}
            </div>
            {maxPage > 1 && (
              <div className="flex items-center gap-4 pb-4 text-gray">
                <i className="cursor-pointer fa-solid fa-angles-left" onClick={() => setParams({ page: 1 })} />
                <i
                  className="cursor-pointer fa-solid fa-angle-left"
                  onClick={() => setParams({ page: _.max([params.page - 1, 1]) })}
                />
                <p className="w-[120px] text-center">
                  {params.page} of {maxPage}
                </p>
                <i
                  className="cursor-pointer fa-solid fa-angle-right"
                  onClick={() => setParams({ page: _.min([params.page + 1, maxPage]) })}
                />
                <i className="cursor-pointer fa-solid fa-angles-right" onClick={() => setParams({ page: maxPage })} />
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-3xl font-semibold text-white rounded-lg bg-primary-darker">
            No Artifacts
          </div>
        )}
      </div>
    </div>
  )
})
