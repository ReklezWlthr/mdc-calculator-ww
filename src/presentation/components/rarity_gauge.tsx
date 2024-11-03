import classNames from 'classnames'
import _ from 'lodash'

export const RarityGauge = ({
  rarity,
  textSize = 'text-xs',
  isSpecial,
}: {
  rarity: number
  textSize?: string
  isSpecial?: boolean
}) => {
  return (
    <div
      className={classNames('w-full flex justify-center', textSize, {
        'text-genshin-dendro': rarity === 2,
        'text-blue': rarity === 3,
        'text-purple': rarity === 4,
        'text-yellow': !isSpecial && rarity === 5,
        'text-red': isSpecial && rarity === 5,
        'text-primary-lighter': rarity < 2,
      })}
    >
      {_.repeat('✦', rarity || 1)}
    </div>
  )
}
