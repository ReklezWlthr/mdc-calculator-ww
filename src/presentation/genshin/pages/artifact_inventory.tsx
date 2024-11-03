import { useCallback, useEffect, useMemo } from 'react'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { ArtifactBlock } from '../components/artifact_block'
import { useStore } from '@src/data/providers/app_store_provider'
import { useParams } from '@src/core/hooks/useParams'
import { SelectTextInput } from '@src/presentation/components/inputs/select_text_input'
import { ArtifactModal } from '../components/modals/artifact_modal'
import { PrimaryButton } from '@src/presentation/components/primary.button'
import { ArtifactSets } from '@src/data/db/artifacts'
import { MainStatOptions, Stats, SubStatOptions } from '@src/domain/constant'
import { TagSelectInput } from '@src/presentation/components/inputs/tag_select_input'
import { isSubsetOf } from '@src/core/utils/finder'
import getConfig from 'next/config'
import { getArtifactImage } from '@src/core/utils/fetcher'

const { publicRuntimeConfig } = getConfig()

export const ArtifactInventory = observer(() => {
  const { params, setParams } = useParams({
    types: [],
    set: null,
    main: [],
    subs: [],
    page: 1,
    per_page: 10,
  })

  const { artifactStore, modalStore } = useStore()

  const TypeButton = ({ field, icon, value }: { field: string; icon: string; value: string | number }) => {
    const checked = _.includes(params[field], value)

    return (
      <div
        className={classNames('w-10 h-10 p-2 duration-200 rounded-full cursor-pointer hover:bg-primary-light', {
          'bg-primary-light': _.includes(params[field], value),
        })}
        onClick={() => setParams({ [field]: checked ? _.without(params[field], value) : [...params[field], value] })}
      >
        <img src={icon} />
      </div>
    )
  }

  const filteredArtifacts = useMemo(() => {
    let result = artifactStore.artifacts
    if (params.set) result = _.filter(result, (artifact) => artifact.setId === params.set)
    if (params.types.length) result = _.filter(result, (artifact) => _.includes(params.types, artifact.type))
    if (params.main.length) result = _.filter(result, (artifact) => _.includes(params.main, artifact.main))
    if (params.subs.length)
      result = _.filter(result, (artifact) => isSubsetOf(params.subs, _.map(artifact.subList, 'stat')))
    return _.orderBy(result, ['level', 'quality', 'type'], ['desc', 'desc', 'desc']).sort((a, b) => {
      const ai = _.findIndex(ArtifactSets, (item) => item.id === a.setId)
      const bi = _.findIndex(ArtifactSets, (item) => item.id === b.setId)
      return bi - ai
    })
  }, [params.set, params.types, params.subs, params.main, artifactStore.artifacts])

  useEffect(() => {
    setParams({ page: 1 })
  }, [params.set, params.types, params.subs, params.main])

  const maxPage = _.ceil(_.size(filteredArtifacts) / params.per_page)

  const onOpenModal = useCallback(() => {
    modalStore.openModal(<ArtifactModal type={4} />)
  }, [modalStore])

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="flex flex-col items-center w-full gap-5 p-5 max-w-[1200px] mx-auto h-full">
        <div className="flex items-center justify-between w-full">
          <p className="text-2xl font-bold text-white w-fit">Artifact Inventory</p>
          <PrimaryButton title="Add New Artifact" onClick={onOpenModal} />
        </div>
        <div className="w-full space-y-1">
          <div className="flex items-center w-full gap-3">
            <div className="flex justify-center gap-2">
              <TypeButton
                field="types"
                icon={`${publicRuntimeConfig.BASE_PATH}/asset/icons/flower_of_life.png`}
                value={4}
              />
              <TypeButton
                field="types"
                icon={`${publicRuntimeConfig.BASE_PATH}/asset/icons/plume_of_death.png`}
                value={2}
              />
              <TypeButton
                field="types"
                icon={`${publicRuntimeConfig.BASE_PATH}/asset/icons/sands_of_eon.png`}
                value={5}
              />
              <TypeButton
                field="types"
                icon={`${publicRuntimeConfig.BASE_PATH}/asset/icons/goblet_of_eonothem.png`}
                value={1}
              />
              <TypeButton
                field="types"
                icon={`${publicRuntimeConfig.BASE_PATH}/asset/icons/circlet_of_logos.png`}
                value={3}
              />
            </div>
            <SelectTextInput
              value={params.set}
              options={_.map(ArtifactSets, (artifact) => ({
                name: artifact.name,
                value: artifact.id.toString(),
                img: getArtifactImage(artifact.icon, 4),
              }))}
              placeholder="Artifact Set"
              onChange={(value) => setParams({ set: value?.value })}
              style="w-[300px]"
            />
            <TagSelectInput
              values={params.main}
              options={_.map(MainStatOptions, (item) => ({ ...item, img: publicRuntimeConfig.BASE_PATH + item.img }))}
              onChange={(main) => setParams({ main })}
              placeholder="Main Stat"
              renderAsText
              style="w-[300px]"
            />
            <TagSelectInput
              values={params.subs}
              options={_.map(SubStatOptions, (item) => ({ ...item, img: publicRuntimeConfig.BASE_PATH + item.img }))}
              onChange={(subs) => setParams({ subs })}
              placeholder="Sub Stats"
              renderAsText
              maxSelection={4}
              style="w-[300px]"
            />
          </div>
        </div>
        {_.size(filteredArtifacts) ? (
          <>
            <div className="grid w-full grid-cols-5 gap-4 overflow-y-auto rounded-lg hideScrollbar">
              {_.map(
                _.slice(filteredArtifacts, params.per_page * (params.page - 1), params.per_page * params.page),
                (artifact) => (
                  <ArtifactBlock key={artifact.id} piece={artifact?.type} aId={artifact?.id} />
                )
              )}
            </div>
            <div className="flex items-center gap-4 text-gray">
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
