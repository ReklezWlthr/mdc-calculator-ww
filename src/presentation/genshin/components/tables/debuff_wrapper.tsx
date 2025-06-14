import { debuffStringConstruct } from '@src/core/utils/debuffStringConstruct'
import { useStore } from '@src/data/providers/app_store_provider'
import { ITalentDisplay } from '@src/domain/conditional'
import { Element } from '@src/domain/constant'
import { observer } from 'mobx-react-lite'
import { TalentIcon } from './scaling_wrapper'
import classNames from 'classnames'
import { ElementColor } from '@src/core/utils/damageStringConstruct'
import { Tooltip } from '@src/presentation/components/tooltip'
import _ from 'lodash'
import { TextInput } from '@src/presentation/components/inputs/text_input'

export const DOT_NAME = 'Elemental Debuff'

interface DoTWrapperProps {
  element: Element
  level?: number
}

export const DoTWrapper = observer(({ element, level }: DoTWrapperProps) => {
  const { calculatorStore } = useStore()
  const index = calculatorStore.selected
  const stats = calculatorStore.computedStats[index]
  const stacks = calculatorStore.stacks[element]

  const { component, number } = debuffStringConstruct(
    calculatorStore,
    element,
    stats,
    // teamStore.characters[index].level,
    90, // Bypass level for now
    stacks
  )

  const DoTList: Record<string, ITalentDisplay & { max: number }> = {
    [Element.SPECTRO]: {
      title: 'Spectro Frazzle',
      trace: DOT_NAME,
      content: `While <b class="text-wuwa-spectro">Spectro Frazzle</b> lasts, the number of its stacks is periodically reduced by <span class="text-wuwa-spectro">1</span> to deal <b class="text-wuwa-spectro">Spectro DMG</b> to the target.
      <br />The building up of <b class="text-wuwa-spectro">Spectro Frazzle</b> greatly increases the DMG it deals, up to <span class="text-wuwa-spectro">10</span> times.
      <br /><b class="text-wuwa-spectro">Spectro Frazzle</b>'s DMG scales with the level of the last Resonator that apply the stack(s).`,
      image: '/asset/icons/SP_RoleLabelE4.webp',
      max: 10,
    },
    [Element.AERO]: {
      title: 'Aero Erosion',
      trace: DOT_NAME,
      content: `While <b class="text-wuwa-aero">Aero Erosion</b> lasts, it deals periodic <b class="text-wuwa-aero">Aero DMG</b> to the target.
      <br />The damage of <b class="text-wuwa-aero">Aero Erosion</b> scales with its stacks, up to <span class="text-wuwa-spectro">3</span> times.
      <br /><b class="text-wuwa-aero">Aero Erosion</b>'s DMG scales with the level of the last Resonator that apply the stack(s).
      <br />
      <br />- Aero Rover's Outro Skill <b>Aeolian Realm</b> increases <b class="text-wuwa-aero">Aero Erosion</b>'s maximum stack count by <span class="text-wuwa-spectro">3</span>.
      <br />- Cartethyia's S2 increases <b class="text-wuwa-aero">Aero Erosion</b>'s maximum stack count by <span class="text-wuwa-spectro">3</span> during her Resonance Liberation.
      `,
      image: '/asset/icons/SP_RoleLabelE3.webp',
      max: 9,
    },
  }
  const type = DoTList[element]

  return (
    <div className="flex w-full mobile:flex-col">
      <div className="flex flex-col items-center justify-center w-1/5 px-2 py-5 mobile:w-full mobile:flex-row mobile:justify-center gap-y-3 gap-x-4 mobile:px-5 mobile:py-3">
        <TalentIcon talent={type} element={element} level={level} type={type?.trace} modal />
        <div className="flex flex-col items-center w-full">
          <p className="text-[11px] leading-[14px] text-gray">{type?.trace}</p>
          <p className="w-full font-bold text-center mobile:w-2/3">{type?.title}</p>
          <p className="text-xs text-gray">
            <span className="text-desc">{stacks}</span> Stack(s)
          </p>
        </div>
      </div>
      <div className="w-4/5 mobile:w-full space-y-0.5">
        <div className="flex gap-x-1 mobile:flex-col items-center justify-center py-0.5 text-xs bg-rose-700 mx-2 mb-2 rounded-md border border-rose-300 mobile:px-2 mobile:text-center">
          <div className="flex items-center justify-center">
            <i className="mr-1 fa-solid fa-warning" />
            <span className="font-bold">Note: </span>
          </div>
          Until further tests are done, this section will only assume Resonator level 90.
        </div>
        <div className="items-center hidden grid-cols-5 gap-2 py-1 pr-2 text-xs font-bold mobile:grid bg-primary-dark">
          <p className="text-center">Base</p>
          <p className="text-center">Crit</p>
          <p className="text-center">Average</p>
          <p className="col-span-2 text-center">Stacks</p>
        </div>
        <div className="grid items-center grid-cols-8 gap-2 pr-2 mobile:grid-cols-5 mobile:py-0.5">
          <p className="col-span-2 text-center mobile:hidden">{DOT_NAME}</p>
          <p className={classNames('col-span-1 text-center mobile:hidden', ElementColor[element])}>{element}</p>
          <p className="hidden col-span-2 pl-4 text-xs truncate" title={type?.title}>
            {type?.title}
          </p>
          <Tooltip
            title={
              <div className="flex items-center justify-between">
                <p>{type?.title}</p>
                <p className="text-xs font-normal text-gray">
                  {DOT_NAME} - <span className={ElementColor[element]}>{element}</span>
                </p>
              </div>
            }
            body={component}
            style="w-[400px]"
          >
            <p className="col-span-1 text-center text-gray">{_.round(number).toLocaleString()}</p>
          </Tooltip>
          <p className="col-span-1 text-center text-gray">-</p>
          <Tooltip title={type?.title} body={component} style="w-[400px]">
            <p className="col-span-1 font-bold text-center text-red">{_.round(number).toLocaleString()}</p>
          </Tooltip>
          <TextInput
            type="number"
            value={stacks.toString()}
            onChange={(value) => calculatorStore.setValue('stacks', { ...calculatorStore.stacks, [element]: +value })}
            max={type?.max}
            min={1}
            style="col-span-1"
            small
          />
          <p className="col-span-1 px-1 text-xs text-center text-gray">Max: {type?.max?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
})
