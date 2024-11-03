import { StatsObject } from '@src/data/lib/stats/baseConstant'
import { ITalent } from '@src/domain/conditional'
import { Element } from '@src/domain/constant'
import { TalentIcon } from './tables/scaling_wrapper'

interface AscensionProps {
  talents: ITalent
  stats?: StatsObject
  ascension: number
  codeName: string
  element: Element
}

export const AscensionIcons = (props: AscensionProps) => {
  return (
    <div className="flex items-center justify-around w-full gap-3">
      <TalentIcon
        talent={props.talents?.a1}
        element={props.element}
        active={props.ascension >= 1}
        tooltipSize="w-[30vw]"
        type={props.talents?.a1?.trace}
      />
      <p className="text-sm font-bold">Ascension Passives</p>
      <TalentIcon
        talent={props.talents?.a4}
        element={props.element}
        active={props.ascension >= 4}
        tooltipSize="w-[30vw]"
        type={props.talents?.a4?.trace}
      />
    </div>
  )
}
