import { observer } from 'mobx-react-lite'
import { ConditionalBlock, IContentIndex } from '@src/presentation/genshin/components/conditionals/conditional_block'
import { WeaponConditionalBlock } from '@src/presentation/genshin/components/conditionals/weapon_conditional_block'
import { CustomConditionalBlock } from '@src/presentation/genshin/components/conditionals/custom_conditional_block'
import _ from 'lodash'
import { IContent, IWeaponContent } from '@src/domain/conditional'
import { useStore } from '@src/data/providers/app_store_provider'
import { StatsObject } from '@src/data/lib/stats/baseConstant'
import { ITeamChar } from '@src/domain/constant'

interface CompareConditionalBlockProps {
  team: ITeamChar[]
  stats: StatsObject[]
  content: {
    main: IContentIndex[]
    team: IContentIndex[]
    reaction: IContentIndex[]
    weapon: (i: number) => IContentIndex[]
    artifact: (i: number) => IContentIndex[]
    customMain: (selected: number) => IContentIndex[]
    customTeam: (selected: number) => IContentIndex[]
  }
}

export const CompareConditionalBlock = observer(({ team, stats, content }: CompareConditionalBlockProps) => {
  const { setupStore } = useStore()
  const [setupIndex, charIndex] = setupStore.selected

  return (
    <div className="w-full space-y-3 text-white">
      <ConditionalBlock
        title="Elemental Reactions"
        contents={_.filter(content.reaction, 'show')}
        tooltipStyle="w-[20vw]"
        formOverride={setupStore.forms[setupIndex]}
        teamOverride={team}
        setForm={(...params) => setupStore.setFormValue(setupIndex, ...params)}
      />
      <ConditionalBlock
        title="Self Modifiers"
        contents={_.filter(content.customMain(charIndex), 'show')}
        formOverride={setupStore.forms[setupIndex]}
        teamOverride={team}
        setForm={(...params) => setupStore.setFormValue(setupIndex, ...params)}
      />
      <ConditionalBlock
        title="Team Modifiers"
        contents={_.filter(content.customTeam(charIndex), 'show')}
        formOverride={setupStore.forms[setupIndex]}
        teamOverride={team}
        setForm={(...params) => setupStore.setFormValue(setupIndex, ...params)}
      />
      <WeaponConditionalBlock
        contents={content.weapon(charIndex)}
        formOverride={setupStore.forms[setupIndex]}
        teamOverride={team}
        setForm={(...params) => setupStore.setFormValue(setupIndex, ...params)}
      />
      <ConditionalBlock
        title="Relic Modifiers"
        contents={content.artifact(charIndex)}
        formOverride={setupStore.forms[setupIndex]}
        teamOverride={team}
        setForm={(...params) => setupStore.setFormValue(setupIndex, ...params)}
      />
      <CustomConditionalBlock
        index={setupStore.selected[1]}
        customOverride={setupStore.custom[setupIndex][charIndex]}
        setValue={setupStore.setCustomValue}
        removeValue={setupStore.removeCustomValue}
      />
    </div>
  )
})
