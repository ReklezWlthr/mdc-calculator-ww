import classNames from 'classnames'
import { SonataColor, SonataIcons } from './artifact_block'
import { Element } from '@src/domain/constant'
import { Sonata } from '@src/data/db/artifacts'

export const ElementIcon = ({ element, size, transparent }: { element: Element; size?: string; transparent?: boolean }) => {
  const elementMap = {
    [Element.FUSION]: [Sonata.FIRE],
    [Element.GLACIO]: [Sonata.ICE],
    [Element.ELECTRO]: [Sonata.THUNDER],
    [Element.AERO]: [Sonata.WIND],
    [Element.SPECTRO]: [Sonata.LIGHT],
    [Element.HAVOC]: [Sonata.HAVOC],
  }

  return (
    <div
      className={classNames(
        'flex items-center justify-center bg-opacity-75 rounded-full ring-2',
        SonataColor[elementMap[element]],
        transparent ? 'bg-transparent' : 'bg-primary'
      )}
    >
      <img src={SonataIcons[elementMap[element]]} className={size || 'w-5 h-5'} />
    </div>
  )
}
