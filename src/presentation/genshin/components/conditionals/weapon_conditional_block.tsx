import { useStore } from '@src/data/providers/app_store_provider'
import { IContent } from '@src/domain/conditional'
import { Element, ITeamChar } from '@src/domain/constant'
import { SelectInput } from '@src/presentation/components/inputs/select_input'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { Tooltip } from '@src/presentation/components/tooltip'
import classNames from 'classnames'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { Dispatch, SetStateAction, useState } from 'react'
import { WeaponTooltip } from '../weapon_block'
import { findCharacter } from '@src/core/utils/finder'
import { CheckboxInput } from '@src/presentation/components/inputs/checkbox'
import { TagSelectInput } from '@src/presentation/components/inputs/tag_select_input'
import { FormSetterT } from './conditional_block'

interface IContentIndexOwner extends IContent {
  index: number
  owner?: number
}

interface ConditionalBlockProps {
  contents: IContentIndexOwner[]
  tooltipStyle?: string
  formOverride?: Record<string, any>[]
  teamOverride?: ITeamChar[]
  setForm?: FormSetterT
}

export const WeaponConditionalBlock = observer(
  ({ contents, formOverride, teamOverride, setForm }: ConditionalBlockProps) => {
    const [open, setOpen] = useState(true)

    const { calculatorStore, teamStore } = useStore()
    const form = formOverride || calculatorStore.form
    const set = setForm || calculatorStore.setFormValue
    const team = teamOverride || teamStore.characters

    return (
      <div className="w-full rounded-lg bg-primary-darker h-fit">
        <p
          className={classNames(
            'px-2 py-1 text-lg font-bold text-center duration-300 cursor-pointer bg-primary-light',
            open ? 'rounded-t-lg' : 'rounded-lg'
          )}
          onClick={() => setOpen((prev) => !prev)}
        >
          Weapon Modifiers
          <i
            className={classNames(
              'ml-2 text-base align-top fa-solid fa-caret-down duration-300',
              open && '-rotate-180'
            )}
          />
        </p>
        <div
          className={classNames(
            'space-y-3 duration-300 ease-out px-4',
            open ? 'h-fit overflow-visible py-3' : 'h-0 overflow-hidden'
          )}
        >
          {_.size(_.filter(contents, 'show')) ? (
            _.map(
              contents,
              (content) =>
                content.show && (
                  <div
                    className="grid items-center grid-cols-12 text-xs cursor-pointer gap-x-1"
                    onClick={() => {
                      if (content.type === 'toggle') document.getElementById(content.id)?.click()
                      if (content.type === 'number') document.getElementById(content.id)?.focus()
                    }}
                    key={content.id + (content.owner >= 0 ? content.owner : content.index)}
                  >
                    <div className="col-span-6">
                      <WeaponTooltip
                        wId={_.split(content.id, '_')[0]}
                        refinement={
                          team[content.owner >= 0 ? content.owner : content.index]?.equipments?.weapon?.refinement
                        }
                        position="left"
                      >
                        <p className="w-full text-xs text-center text-white truncate">
                          {content.owner >= 0 && `${findCharacter(team[content.owner]?.cId)?.name}'s `}
                          {content.text}
                        </p>
                      </WeaponTooltip>
                    </div>
                    <div className={classNames('col-span-2 text-center', content.debuff ? 'text-red' : 'text-blue')}>
                      {content.debuff ? 'Debuff' : 'Buff'}
                    </div>
                    {content.type === 'number' && (
                      <>
                        <TextInput
                          id={content.id}
                          type="number"
                          value={form[content.index]?.[content.id]}
                          onChange={(value) => set(content.index, content.id, parseFloat(value) ?? '')}
                          max={content.max}
                          min={content.min}
                          style="col-span-2"
                          small
                        />
                        <p className="col-span-2 px-1 text-center text-gray">Max: {content.max.toLocaleString()}</p>
                      </>
                    )}
                    {content.type === 'toggle' && (
                      <div className="flex items-center justify-center col-span-2">
                        <CheckboxInput
                          id={content.id}
                          checked={form[content.index]?.[content.id]}
                          onClick={(v) => set(content.index, content.id, v)}
                        />
                      </div>
                    )}
                  </div>
                )
            )
          ) : (
            <div className="text-center text-gray">None</div>
          )}
        </div>
      </div>
    )
  }
)
