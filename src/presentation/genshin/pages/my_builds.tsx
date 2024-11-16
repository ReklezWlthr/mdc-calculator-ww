import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { useStore } from '@src/data/providers/app_store_provider'
import { useParams } from '@src/core/hooks/useParams'
import { BuildBlock } from '../components/build_block'
import React, { useEffect, useState } from 'react'
import { findCharacter } from '@src/core/utils/finder'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { BuildDetail } from '../components/build_detail'

export const MyBuilds = observer(() => {
  const { buildStore, modalStore } = useStore()
  const { params, setParams } = useParams({
    searchWord: '',
  })

  const [selected, setSelected] = useState('')

  const builds = params.searchWord
    ? _.filter(
        buildStore.builds,
        (item) =>
          _.includes(findCharacter(item.cId)?.name?.toLowerCase(), params.searchWord.toLowerCase()) ||
          _.includes(item.name.toLowerCase(), params.searchWord.toLowerCase())
      )
    : buildStore.builds
  const groupedBuild = _.groupBy(builds, 'cId')

  useEffect(() => {
    const close = () => {
      if (window.innerWidth < 430) {
        modalStore.closeModal()
      }
    }
    window.addEventListener('resize', close)
    window.addEventListener('orientationchange', close)

    return () => {
      window.removeEventListener('resize', close)
      window.removeEventListener('orientationchange', close)
    }
  }, [])

  return (
    <div className="flex flex-col items-center w-full gap-5 p-5 max-w-[1200px] mx-auto">
      <div className="flex w-full h-full gap-x-5">
        <div className="flex flex-col w-1/3 h-full gap-2 mobile:w-full shrink-0">
          <div className="flex items-center gap-6 mr-4">
            <p className="text-2xl font-bold text-white shrink-0">My Builds</p>
            <TextInput
              value={params.searchWord}
              onChange={(v) => setParams({ searchWord: v })}
              placeholder={`Search for Build's Name or Owner`}
            />
          </div>
          <div className="flex flex-col w-full h-full gap-2 pr-1 overflow-y-auto rounded-lg mobile:pr-0 customScrollbar mobile:hideScrollbar">
            {_.size(buildStore.builds) ? (
              _.map(groupedBuild, (build, owner) => (
                <BuildBlock
                  key={_.join(_.map(build, 'id'), '_')}
                  owner={owner}
                  build={build}
                  onClick={(value) => {
                    if (window.innerWidth <= 430) {
                      modalStore.openModal(<BuildDetail selected={value} setSelected={setSelected} />)
                    } else {
                      setSelected(value)
                    }
                  }}
                  selected={selected}
                />
              )).sort((a, b) => findCharacter(a.props.owner)?.name?.localeCompare(findCharacter(b.props.owner)?.name))
            ) : (
              <div className="flex items-center justify-center w-full h-full rounded-lg bg-primary-darker text-gray">
                No Saved Build
              </div>
            )}
          </div>
        </div>
        <div className="w-full mobile:hidden">
          <BuildDetail selected={selected} setSelected={setSelected} />
        </div>
      </div>
    </div>
  )
})
