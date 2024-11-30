import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { ArtifactBlock, SonataIcons } from '../artifact_block'
import classNames from 'classnames'
import { useStore } from '@src/data/providers/app_store_provider'
import { useParams } from '@src/core/hooks/useParams'
import { useMemo } from 'react'
import { SelectTextInput } from '@src/presentation/components/inputs/select_text_input'
import { TagSelectInput } from '@src/presentation/components/inputs/tag_select_input'
import { Echoes, Sonata } from '@src/data/db/artifacts'
import { MainStatOptions, SubStatOptions } from '@src/domain/constant'
import { isSubsetOf } from '@src/core/utils/finder'
import { getEchoImage } from '@src/core/utils/fetcher'

export type ArtifactSetterT = (index: number, type: number, aId: string) => void

export const ArtifactListModal = observer(
  ({ index, slot, setArtifact }: { index: number; slot: number; setArtifact?: ArtifactSetterT }) => {
    const { params, setParams } = useParams({
      main: [],
      subs: [],
      sonata: [],
      cost: [],
      set: null,
    })

    const { artifactStore, modalStore, teamStore } = useStore()

    const set = setArtifact || teamStore.setArtifact

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
      let result = _.cloneDeep(artifactStore.artifacts)
      if (params.set) result = _.filter(result, (artifact) => artifact.setId === params.set)
      if (params.main.length) result = _.filter(result, (artifact) => _.includes(params.main, artifact.main))
      if (params.sonata.length) result = _.filter(result, (artifact) => _.includes(params.sonata, artifact.sonata))
      if (params.cost.length) result = _.filter(result, (artifact) => _.includes(params.cost, artifact.cost))
      if (params.subs.length)
        result = _.filter(result, (artifact) => isSubsetOf(params.subs, _.map(artifact.subList, 'stat')))
      return result
    }, [params.set, params.subs, params.main, params.cost, params.sonata])

    return (
      <div className="w-[1010px] tablet:w-[1010px] mobile:w-[350px] p-4 text-white rounded-xl bg-primary-darker space-y-4">
        <div className="flex items-center justify-between w-full mobile:flex-col gap-y-2">
          <p className="text-lg font-bold">Choose an Echo</p>
          <div className="flex flex-wrap gap-3 mobile:flex-col max-w-[70%] mobile:max-w-[100%] mobile:items-center">
            <SelectTextInput
              value={params.set}
              options={_.map(_.orderBy(Echoes, 'name', 'asc'), (artifact) => ({
                name: artifact.name,
                value: artifact.id.toString(),
                img: getEchoImage(artifact?.icon),
              }))}
              placeholder="Echo Name"
              onChange={(value) => setParams({ set: value?.value })}
              style="w-[220px]"
            />
            <div className="flex items-center gap-3">
              <TagSelectInput
                values={params.sonata}
                options={_.map(Sonata, (s) => ({ name: s, value: s, img: SonataIcons[s] }))}
                onChange={(sonata) => setParams({ sonata })}
                placeholder="Sonata - Match All"
                onlyShowCount
                style="w-[220px] mobile:w-[150px]"
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
                style="w-[220px] mobile:w-[150px]"
              />
            </div>
            <div className="flex items-center gap-3">
              <TagSelectInput
                values={params.main}
                options={MainStatOptions}
                onChange={(main) => setParams({ main })}
                placeholder="Main Stat - Match All"
                renderAsText
                style="w-[220px] mobile:w-[150px]"
              />
              <TagSelectInput
                values={params.subs}
                options={SubStatOptions}
                onChange={(subs) => setParams({ subs })}
                placeholder="Sub Stats  - Includes All"
                renderAsText
                maxSelection={5}
                style="w-[220px] mobile:w-[150px]"
              />
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-4 mobile:grid-cols-1 gap-4 max-h-[60dvh] overflow-y-auto hideScrollbar rounded-lg">
          {_.map(filteredArtifacts, (artifact) => (
            <div
              key={artifact.id}
              className="hover:scale-[97%] duration-200 cursor-pointer flex justify-center w-full"
              onClick={() => {
                set(index, slot, artifact.id)
                modalStore.closeModal()
              }}
            >
              <ArtifactBlock slot={0} aId={artifact?.id} showWearer canEdit={false} />
            </div>
          ))}
        </div>
      </div>
    )
  }
)
