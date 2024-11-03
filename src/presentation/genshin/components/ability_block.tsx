import { observer } from 'mobx-react-lite'
import { TalentIcon } from './tables/scaling_wrapper'
import _ from 'lodash'
import { ITeamChar } from '@src/domain/constant'
import { ITalent } from '@src/domain/conditional'
import { SelectInput } from '@src/presentation/components/inputs/select_input'
import { findCharacter } from '@src/core/utils/finder'

export interface AbilityBlockProps {
  char: ITeamChar
  talents: ITalent
  onChange: (key: string, value: number) => void
  disabled?: boolean
}

export const AbilityBlock = observer(({ char, onChange, talents, disabled }: AbilityBlockProps) => {
  const maxTalentLevel = _.max([1, (char.ascension - 1) * 2])
  const talentLevels = _.map(Array(maxTalentLevel), (_, index) => ({
    name: (index + 1).toString(),
    value: (index + 1).toString(),
  })).reverse()

  const charData = findCharacter(char.cId)

  return (
    <div>
      <div className="flex items-center justify-center gap-3 py-3">
        <TalentIcon talent={talents?.normal} element={charData?.element} size="w-9 h-9" showUpgrade />
        <SelectInput
          value={char?.talents?.normal?.toString()}
          onChange={(value) => onChange('normal', parseInt(value))}
          options={talentLevels}
          style="w-14 mr-2"
        />
        <TalentIcon talent={talents?.skill} element={charData?.element} size="w-9 h-9" showUpgrade />
        <SelectInput
          value={char?.talents?.skill?.toString()}
          onChange={(value) => onChange('skill', parseInt(value))}
          options={talentLevels}
          style="w-14"
        />
      </div>
      <div className="flex items-center justify-center gap-3 py-3">
        <TalentIcon talent={talents?.forte} element={charData?.element} size="w-9 h-9" showUpgrade />
        <SelectInput
          value={char?.talents?.forte?.toString()}
          onChange={(value) => onChange('forte', parseInt(value))}
          options={talentLevels}
          style="w-14"
        />
      </div>
      <div className="flex items-center justify-center gap-3 py-3">
        <TalentIcon talent={talents?.lib} element={charData?.element} size="w-9 h-9" showUpgrade />
        <SelectInput
          value={char?.talents?.lib?.toString()}
          onChange={(value) => onChange('lib', parseInt(value))}
          options={talentLevels}
          style="w-14 mr-2"
        />
        <TalentIcon talent={talents?.intro} element={charData?.element} size="w-9 h-9" showUpgrade />
        <SelectInput
          value={char?.talents?.intro?.toString()}
          onChange={(value) => onChange('intro', parseInt(value))}
          options={talentLevels}
          style="w-14"
        />
      </div>
    </div>
  )
})
