import { findCharacter } from '@src/core/utils/finder'
import { StatsObject } from '@src/data/lib/stats/baseConstant'
import { useStore } from '@src/data/providers/app_store_provider'
import { IContent } from '@src/domain/conditional'
import { Element, ITeamChar } from '@src/domain/constant'
import { CheckboxInput } from '@src/presentation/components/inputs/checkbox'
import { SelectInput } from '@src/presentation/components/inputs/select_input'
import { TagSelectInput } from '@src/presentation/components/inputs/tag_select_input'
import { TextInput } from '@src/presentation/components/inputs/text_input'
import { Tooltip } from '@src/presentation/components/tooltip'
import classNames from 'classnames'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'

export interface IContentIndex extends IContent {
  index: number
  owner?: number
}

export type FormSetterT = (index: number, key: string, value: any, sync?: boolean) => void

interface ConditionalBlockProps {
  title: string
  contents: IContentIndex[]
  tooltipStyle?: string
  formOverride?: Record<string, any>[]
  teamOverride?: ITeamChar[]
  setForm?: FormSetterT
}

export const ConditionalBlock = observer(
  ({ title, contents, tooltipStyle = 'w-[40vw]', setForm, formOverride, teamOverride }: ConditionalBlockProps) => {
    const [open, setOpen] = useState(true)

    const { calculatorStore, teamStore, setupStore } = useStore()
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
          {title}
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
                  <div className="grid items-center grid-cols-12 text-xs gap-x-1" key={content.id}>
                    <div className="col-span-6">
                      <Tooltip
                        title={
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <p className="text-xs font-normal opacity-75 text-gray">
                                {findCharacter(team[content.owner || content.index]?.cId)?.name} -{' '}
                                {content.trace || 'Artifact'}
                              </p>
                              <p>{content.title}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              {!!content.level && (
                                <p className="text-xs font-normal text-gray">
                                  Level: <span className="text-desc">{content.level}</span>
                                </p>
                              )}
                            </div>
                          </div>
                        }
                        body={<p dangerouslySetInnerHTML={{ __html: content.content }} />}
                        key={content.id}
                        style={tooltipStyle}
                        position="left"
                      >
                        <p className="w-full text-xs text-center text-white truncate">{content.text}</p>
                      </Tooltip>
                    </div>
                    <div className={classNames('col-span-2 text-center', content.debuff ? 'text-red' : 'text-blue')}>
                      {content.debuff ? 'Debuff' : 'Buff'}
                    </div>
                    {content.type === 'number' && (
                      <>
                        <TextInput
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
                          checked={form[content.index]?.[content.id]}
                          onClick={(v) => {
                            set(content.index, content.id, v)
                            if (content.id === 'melt_forward') set(content.index, 'vape_reverse', false)
                            if (content.id === 'vape_reverse') set(content.index, 'melt_forward', false)
                          }}
                        />
                      </div>
                    )}
                    {content.type === 'element' && (
                      <div className="flex items-center justify-center col-span-4">
                        <SelectInput
                          value={form[content.index]?.[content.id]}
                          options={
                            content.options || [
                              { name: Element.PYRO, value: Element.PYRO },
                              { name: Element.HYDRO, value: Element.HYDRO },
                              { name: Element.CRYO, value: Element.CRYO },
                              { name: Element.ELECTRO, value: Element.ELECTRO },
                            ]
                          }
                          onChange={(value) => set(content.index, content.id, value)}
                          placeholder='None'
                          small
                        />
                      </div>
                    )}
                    {content.type === 'multiple' && (
                      <div className="flex items-center justify-center col-span-4">
                        <div className="w-full">
                          <TagSelectInput
                            values={form[content.index]?.[content.id]}
                            options={
                              content.options || [
                                { name: Element.PYRO, value: Element.PYRO },
                                { name: Element.HYDRO, value: Element.HYDRO },
                                { name: Element.CRYO, value: Element.CRYO },
                                { name: Element.ELECTRO, value: Element.ELECTRO },
                              ]
                            }
                            onChange={(value) => set(content.index, content.id, value)}
                            placeholder="None"
                            renderAsText
                            small
                          />
                        </div>
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
