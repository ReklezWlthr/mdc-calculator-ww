import classNames from 'classnames'
import { SonataIcons } from './artifact_block'
import { Element } from '@src/domain/constant'

export const ElementIcon = ({
  element,
  size,
  transparent,
}: {
  element: Element
  size?: string
  transparent?: boolean
}) => {
  const elementMap = {
    [Element.FUSION]: '/asset/icons/T_IconElementFire1.webp',
    [Element.GLACIO]: '/asset/icons/T_IconElementIce1.webp',
    [Element.ELECTRO]: '/asset/icons/T_IconElementThunder1.webp',
    [Element.AERO]: '/asset/icons/T_IconElementWind1.webp',
    [Element.SPECTRO]: '/asset/icons/T_IconElementLight1.webp',
    [Element.HAVOC]: '/asset/icons/T_IconElementDark1.webp',
  }

  const elementColor = {
    [Element.FUSION]: 'ring-wuwa-fusion',
    [Element.GLACIO]: 'ring-wuwa-glacio',
    [Element.ELECTRO]: 'ring-wuwa-electro',
    [Element.AERO]: 'ring-wuwa-aero',
    [Element.SPECTRO]: 'ring-wuwa-spectro',
    [Element.HAVOC]: 'ring-wuwa-havoc',
  }

  return (
    <div
      className={classNames(
        'flex items-center justify-center bg-opacity-75 rounded-full ring-2',
        elementColor[element],
        transparent ? 'bg-transparent' : 'bg-primary'
      )}
    >
      <img src={elementMap[element]} className={size || 'w-5 h-5'} />
    </div>
  )
}
