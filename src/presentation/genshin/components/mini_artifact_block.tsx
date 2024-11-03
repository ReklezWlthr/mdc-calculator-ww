import { toPercentage } from '@src/core/utils/converter'
import { getMainStat, getRolls } from '@src/core/utils/data_format'
import { findArtifactSet } from '@src/core/utils/finder'
import { useStore } from '@src/data/providers/app_store_provider'
import { ArtifactPiece, MainStatOptions, StatIcons, Stats } from '@src/domain/constant'
import { RarityGauge } from '@src/presentation/components/rarity_gauge'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { useCallback, useMemo } from 'react'
import { ArtifactListModal, ArtifactSetterT } from '@src/presentation/genshin/components/modals/artifact_list_modal'
import classNames from 'classnames'
import getConfig from 'next/config'
import { getArtifactImage } from '@src/core/utils/fetcher'

const { publicRuntimeConfig } = getConfig()

export const MiniArtifactBlock = observer(
  ({ aId, index, setArtifact, type }: { aId: string; index?: number; setArtifact?: ArtifactSetterT; type: number }) => {
    const { artifactStore, modalStore } = useStore()

    const artifact = _.find(artifactStore.artifacts, ['id', aId])
    const setData = findArtifactSet(artifact?.setId)

    const mainStat = getMainStat(artifact?.main, artifact?.quality, artifact?.level)

    const subListWithRolls = useMemo(() => {
      const rolls = _.map(artifact?.subList, (item) => _.sum(_.map(getRolls(item.stat, item.value))))
      const sum = _.sum(rolls)
      if (sum > 9) {
        const max = _.max(rolls)
        const index = _.findIndex(rolls, (item) => item === max)
        rolls[index] -= 1
      }
      return _.map(artifact?.subList, (item, index) => ({ ...item, roll: rolls[index] }))
    }, [artifact])

    const onOpenSwapModal = useCallback(() => {
      if (setArtifact) modalStore.openModal(<ArtifactListModal index={index} type={type} setArtifact={setArtifact} />)
    }, [index, aId, setArtifact, artifact, type])

    return (
      <div
        className={classNames('px-3 py-1.5 min-h-24 h-24 rounded-lg bg-primary-dark duration-200 text-white', {
          'hover:scale-[97%] hover:ring-2 ring-primary-light cursor-pointer': setArtifact,
        })}
        onClick={onOpenSwapModal}
      >
        {aId ? (
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex flex-col items-center w-1/3 gap-1">
              <img src={getArtifactImage(setData?.icon, artifact?.type)} className="w-11 h-11" />
              <RarityGauge rarity={artifact?.quality} textSize="text-xs" />
              <div className="flex items-center justify-between w-full gap-2 text-xs">
                <img className="w-3.5" src={_.find(MainStatOptions, (item) => item.value === artifact?.main)?.img} />
                <p className="font-bold text-gray">
                  {_.includes([Stats.HP, Stats.ATK, Stats.EM], artifact?.main)
                    ? _.round(mainStat).toLocaleString()
                    : toPercentage(mainStat)}
                </p>
              </div>
              <div className="absolute flex items-center justify-center px-1.5 py-0.5 text-xs bg-opacity-75 rounded-full top-6 -right-2 bg-primary-light">
                +{artifact?.level}
              </div>
            </div>
            <div className="grid w-7/12 grid-cols-1 gap-1">
              {_.map(subListWithRolls, (item) => (
                <div className="flex items-center w-full gap-1.5 text-xs" key={item.stat}>
                  <img className="w-3.5" src={`${publicRuntimeConfig.BASE_PATH}/asset/icons/${StatIcons[item.stat]}`} />
                  <div className="text-primary-lighter">{_.repeat('\u{2771}', item.roll)}</div>
                  <hr className="w-full border border-primary-border" />
                  <p className="font-normal text-gray">
                    {_.includes([Stats.HP, Stats.ATK, Stats.DEF, Stats.EM], item.stat)
                      ? _.round(item.value, 0).toLocaleString()
                      : toPercentage(item.value / 100)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray">No Artifact</div>
        )}
      </div>
    )
  }
)
