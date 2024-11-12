import {
  findBaseLevel,
  findMaxLevel,
  formatWeaponString,
  getWeaponBase,
  getWeaponBonus,
} from '@src/core/utils/data_format'
import { useStore } from '@src/data/providers/app_store_provider'
import {
  AscensionOptions,
  DefaultWeaponImage,
  DefaultWeaponName,
  ITeamChar,
  IWeaponEquip,
  RefinementOptions,
  StatIcons,
  Stats,
  WeaponType,
} from '@src/domain/constant'
import { PillInput } from '@src/presentation/components/inputs/pill_input'
import { SelectInput } from '@src/presentation/components/inputs/select_input'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { WeaponModal } from './modals/weapon_modal'
import { RarityGauge } from '@src/presentation/components/rarity_gauge'
import { findCharacter, findWeapon } from '@src/core/utils/finder'
import { toPercentage } from '@src/core/utils/converter'
import { Tooltip, TooltipPositionT } from '@src/presentation/components/tooltip'
import getConfig from 'next/config'
import { getWeaponImage } from '@src/core/utils/fetcher'

const { publicRuntimeConfig } = getConfig()

export const staticWeapons = ['11412', '11416', '15415']

export const WeaponTooltip = ({
  wId,
  refinement,
  children,
  position = 'right',
}: {
  wId: string
  refinement: number
  children: React.ReactElement
  position?: TooltipPositionT
}) => {
  const data = findWeapon(wId)
  const properties = data?.desc?.properties
  const formattedString = formatWeaponString(data?.desc?.detail, properties, refinement)

  return (
    <Tooltip
      title={data?.desc?.name}
      body={
        <div
          className="font-normal"
          dangerouslySetInnerHTML={{
            __html: formattedString,
          }}
        />
      }
      position={position}
      style="w-[450px]"
    >
      {children}
    </Tooltip>
  )
}

interface StatBlockProps {
  index?: number
  wId: string
  level: number
  ascension: number
  refinement: number
  teamOverride?: ITeamChar[]
  setWeapon?: (index: number, info: Partial<IWeaponEquip>) => void
  disabled?: boolean
  noClear?: boolean
}

export const WeaponBlock = observer(
  ({
    index = -1,
    wId,
    level = 1,
    ascension = 0,
    refinement = 1,
    teamOverride,
    setWeapon,
    disabled,
    noClear,
  }: StatBlockProps) => {
    const { modalStore, teamStore } = useStore()

    const team = teamOverride || teamStore.characters
    const set = setWeapon || teamStore.setWeapon

    const char = team[index]?.cId

    const weaponData = findWeapon(wId)
    const weaponType = findCharacter(char)?.weapon
    const rarity = weaponData?.rarity

    const weaponBaseAtk = getWeaponBase(weaponData?.baseAtk, level, ascension)
    const weaponSecondary = getWeaponBonus(weaponData?.baseStat, level)

    const canEdit = index >= 0 || disabled

    const levels = useMemo(
      () =>
        _.map(
          Array(findMaxLevel(ascension) - findBaseLevel(ascension) + 1 || 1).fill(findBaseLevel(ascension)),
          (item, index) => ({
            name: _.toString(item + index),
            value: _.toString(item + index),
          })
        ).reverse(),
      [ascension]
    )

    const onOpenModal = useCallback(() => {
      char &&
        canEdit &&
        team[index]?.cId &&
        modalStore.openModal(
          <WeaponModal index={index} setWeapon={setWeapon} pathOverride={findCharacter(char)?.weapon} />
        )
    }, [modalStore, index, char, setWeapon])

    return (
      <div className="w-[230px] font-bold text-white rounded-lg bg-primary-dark h-[250px]">
        <div className="flex justify-center px-5 py-1 text-sm rounded-t-lg bg-primary-light">Weapon</div>
        <div className="flex flex-col p-3 gap-y-3">
          <div className="flex items-center gap-2">
            <PillInput
              onClick={onOpenModal}
              onClear={noClear ? null : () => set(index, { wId: null, refinement: 1 })}
              value={weaponData?.name}
              disabled={!canEdit || !team[index]?.cId}
              placeholder="Select a Weapon"
            />
            <SelectInput
              onChange={(value) =>
                set(index, {
                  refinement: parseInt(value) || 1,
                })
              }
              options={RefinementOptions}
              value={refinement?.toString()}
              style="w-fit"
              disabled={!canEdit || !weaponData || _.includes(staticWeapons, weaponData?.id)}
            />
          </div>
          <div className="flex gap-2">
            <div className="relative flex flex-col justify-between w-1/2 gap-1">
              <div
                className="w-full duration-200 border rounded-lg cursor-pointer bg-primary-darker border-primary-border aspect-square hover:border-primary-light"
                onClick={onOpenModal}
              >
                <img src={getWeaponImage(weaponData?.image)} />
              </div>
              {rarity && (
                <div className="absolute px-1 rounded-md pointer-events-none bottom-1 right-1 bg-primary-bg">
                  <RarityGauge rarity={rarity} />
                </div>
              )}
            </div>
            <div className="w-1/2 space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold">Level</p>
                <div className="flex items-center w-full gap-2">
                  <SelectInput
                    onChange={(value) => set(index, { level: parseInt(value) || 0 })}
                    options={levels}
                    value={level?.toString()}
                    disabled={!canEdit || !weaponData}
                  />
                  <SelectInput
                    onChange={(value) =>
                      set(index, {
                        ascension: parseInt(value) || 0,
                        level: findMaxLevel(parseInt(value) || 0),
                      })
                    }
                    options={AscensionOptions}
                    value={ascension?.toString()}
                    style="w-fit"
                    disabled={!canEdit || !weaponData}
                  />
                </div>
              </div>
              {weaponData && (
                <div className="flex items-center w-full gap-x-2">
                  <p className="text-sm">Syntonize</p>
                  <WeaponTooltip wId={wId} refinement={refinement}>
                    <i className="text-lg fa-regular fa-question-circle" />
                  </WeaponTooltip>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 shrink-0">
                <img className="w-4 h-4" src={StatIcons[Stats.ATK]} />
                <p>Base ATK</p>
              </div>
              <hr className="w-full border border-primary-border" />
              <p className="font-normal text-gray">{_.floor(weaponBaseAtk)}</p>
            </div>
            {weaponData && (
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1.5 shrink-0">
                  <img className="w-4 h-4" src={StatIcons[weaponData?.ascStat]} />
                  {weaponData?.ascStat || 'N/A'}
                </div>
                <hr className="w-full border border-primary-border" />
                <p className="font-normal text-gray">{toPercentage(weaponSecondary || 0)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)
