import { ParticleCount } from '@src/data/db/particles'
import { useStore } from '@src/data/providers/app_store_provider'
import { EnergyMeta, ExtraSkillProc } from '@src/data/stores/energy_store'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { findCharacter } from '../utils/finder'

export const useLocalUpdater = (game: string) => {
  const router = useRouter()
  const { teamStore, artifactStore, buildStore, charStore, settingStore, calculatorStore, setupStore, energyStore } =
    useStore()
  const [data, setData] = useState(null)
  const [hydrated, setHydrated] = useState(false)

  const key = `${game}_local_storage`
  const settingKey = 'mdc_settings'

  const updateData = (data: string) => {
    const json = JSON.parse(data)
    json?.team && teamStore.hydrateCharacters(json?.team)
    json?.artifacts && artifactStore.hydrateArtifacts(json?.artifacts)
    json?.builds && buildStore.hydrateBuilds(json?.builds)
    json?.characters && charStore.hydrateCharacters(json?.characters)
    json?.setup && setupStore.hydrateTeams(json?.setup)
    setData(data)
  }

  const updateSettings = (data: string) => {
    const json = JSON.parse(data)
    settingStore.setSettingValue(json)
    calculatorStore.setValue('level', json?.defaultEnemyLevel || 1)
    setupStore.setValue('level', json?.defaultEnemyLevel || 1)
  }

  useEffect(() => {
    window.onbeforeunload = function () {
      return 'Your changes may not be saved. You can turn on Auto Save in Settings'
    }
  }, [])

  useEffect(() => {
    // calculatorStore.setValue('team', _.cloneDeep(teamStore?.characters))
    const temp = _.cloneDeep(energyStore.meta)
    const result: EnergyMeta[] = Array(4).fill(null)

    _.forEach(teamStore.characters, (char, index) => {
      if (!char) return
      const oldData = _.find(temp, (item) => item?.cId === char.cId)
      result[index] = oldData || {
        cId: char.cId,
        element: findCharacter(char.cId)?.element,
        add: { 'Additional Energy': 0 },
        favProc: 0,
        feedFav: char.cId,
        fieldTime: index ? 3 : 11,
        rpb: _.includes(ExtraSkillProc, char.cId) ? 2 : 1,
        skill: _.map(ParticleCount(char.cId, char.cons), (item) => ({
          ...item,
          feed: char.cId,
          percentage: 100,
          proc: item.default,
          ratio: [25, 25, 25, 25],
          override: false,
        })),
      }
    })

    energyStore.setValue('meta', result)
  }, [...teamStore.characters])

  useEffect(() => {
    if (hydrated && settingStore.settings.storeData) {
      localStorage.setItem(
        key,
        JSON.stringify({
          team: teamStore.characters,
          artifacts: artifactStore.artifacts,
          builds: buildStore.builds,
          characters: charStore.characters,
          setup: setupStore.team,
          format: 'MDC',
        })
      )
    }
  }, [
    ...teamStore.characters,
    artifactStore.artifacts,
    buildStore.builds,
    charStore.characters,
    settingStore.settings.storeData,
    setupStore.team,
  ])

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(settingKey, JSON.stringify(settingStore.settings))
      calculatorStore.setValue('level', settingStore?.settings?.defaultEnemyLevel || 1)
      if (!settingStore.settings.storeData)
        localStorage.setItem(
          key,
          JSON.stringify({
            team: [],
            artifacts: [],
            builds: [],
            characters: [],
          })
        )
    }
  }, [settingStore.settings])

  useEffect(() => {
    const data = localStorage.getItem(key)
    const settings = localStorage.getItem(settingKey)

    if (JSON.parse(settings)?.storeData) updateData(data)
    updateSettings(settings)

    setHydrated(true)
  }, [router.asPath])

  return { data, updateData }
}
