import { AutoEnergy } from '@src/data/db/energy'
import { useStore } from '@src/data/providers/app_store_provider'
import _ from 'lodash'
import { useEffect } from 'react'
import { findCharacter } from '../utils/finder'
import { IFixedEnergy } from '@src/data/stores/energy_store'

export const useFixedEnergy = () => {
  const { energyStore, teamStore } = useStore()

  const ids = _.flatMap(teamStore.characters, (item) => [item.cId, item.equipments.weapon])
  const ae = _.filter(AutoEnergy, (item) => _.includes(ids, item.source))

  const totalRotation = _.sumBy(energyStore.meta, (item) => item.fieldTime)

  useEffect(() => {
    const arr: IFixedEnergy[] = []
    _.forEach(ae, (item) =>
      _.forEach(energyStore.meta, (c, i) => {
        const genIndex = _.findIndex(teamStore.characters, (tc) => tc.cId === item.source)
        // const receiverData = findCharacter(c.cId)
        const energy = item.getEnergy({
          char: teamStore.characters[genIndex],
          generator: energyStore.meta[genIndex],
          receiver: c,
          totalRotation,
          stats: null,
        })
        if (energy)
          arr.push({
            generator: energyStore.meta[genIndex]?.cId,
            receiver: c?.cId,
            name: item.name,
            value: energy,
          })
      })
    )

    energyStore.setValue('fixedEnergy', arr)
  }, [energyStore.meta])
}
