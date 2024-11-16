import { StatsObject } from '@src/data/lib/stats/baseConstant'
import { ITalent } from '@src/domain/conditional'
import { Element } from '@src/domain/constant'
import { TalentIcon } from './tables/scaling_wrapper'

interface AscensionProps {
  talents: ITalent
  stats?: StatsObject
  i: { i1: boolean; i2: boolean }
  element: Element
}

export const AscensionIcons = (props: AscensionProps) => {
  return (
    <div className="flex items-center justify-around w-full gap-3">
      <TalentIcon
        talent={props.talents?.i1}
        element={props.element}
        active={props.i.i1}
        tooltipSize="w-[30vw] mobile:w-[400px]"
        type={props.talents?.i1?.trace}
      />
      <p className="text-sm font-bold">Inherent Skills</p>
      <TalentIcon
        talent={props.talents?.i2}
        element={props.element}
        active={props.i.i2}
        tooltipSize="w-[30vw] mobile:w-[400px]"
        type={props.talents?.i2?.trace}
      />
    </div>
  )
}
