import { ElementColor } from '@src/core/utils/damageStringConstruct'
import { findCharacter } from '@src/core/utils/finder'
import { AutoEnergy } from '@src/data/db/energy'
import { useStore } from '@src/data/providers/app_store_provider'
import { BulletPoint } from '@src/presentation/components/collapsible'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'

const ArrowRow = ({ name, value, color }: { name: string; value: number; color: string }) => (
  <BulletPoint color={color}>
    <span className="text-xs text-gray">
      <span className="font-semibold">
        {name}
        <i className="fa-solid fa-arrow-right mx-1.5" />
      </span>
      <span className="text-desc">{_.round(value, 1).toLocaleString()}</span>
    </span>
  </BulletPoint>
)

export const EnergySourceModal = observer(() => {
  const { energyStore, teamStore } = useStore()

  return (
    <div className="w-[600px] bg-primary-dark rounded-lg py-3 px-4 space-y-2 text-white">
      <p className="text-lg font-bold col-span-full">Energy Source List</p>
      <div className="grid grid-cols-2 gap-4">
        {_.map(teamStore.characters, (item, index) => {
          const { additional, electro } = energyStore.getAdditionalPersonal(index)
          if (!item.cId) return <></>
          return (
            <div>
              <p className="text-sm font-bold">{findCharacter(item.cId)?.name}</p>
              {_.map(teamStore.characters, (c, i) =>
                c.cId ? (
                  <ArrowRow
                    name={`${findCharacter(c?.cId)?.name}'s Particles`}
                    value={energyStore.getEnergyFrom(i, index)}
                    color={ElementColor[findCharacter(c?.cId)?.element]}
                  />
                ) : (
                  <></>
                )
              )}
              {!!electro && (
                <ArrowRow name="Electro Resonance Particles" value={electro} color="text-genshin-electro" />
              )}
              <ArrowRow name="HP Drops" value={additional} color="text-red" />
              {_.map(
                _.filter(energyStore.fixedEnergy, (fe) => fe.receiver === item.cId),
                (sub) => (
                  <ArrowRow name={sub.name} value={sub.value} color="text-blue" />
                )
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
})
