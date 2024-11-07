import { observer } from 'mobx-react-lite'
import { TalentIcon } from './tables/scaling_wrapper'
import _ from 'lodash'
import { ITeamChar } from '@src/domain/constant'
import { ITalent } from '@src/domain/conditional'
import { SelectInput } from '@src/presentation/components/inputs/select_input'
import { findCharacter } from '@src/core/utils/finder'
import { CheckboxInput } from '@src/presentation/components/inputs/checkbox'

export interface AbilityBlockProps {
  char: ITeamChar
  talents: ITalent
  onChange: (key: string, value: number) => void
  onChangeInherent: (key: string, value: boolean) => void
  disabled?: boolean
}

export const AbilityBlock = observer(({ char, onChange, talents, onChangeInherent }: AbilityBlockProps) => {
  const maxTalentLevel = _.max([1, (char.ascension - 1) * 2])
  const talentLevels = _.map(Array(maxTalentLevel), (_, index) => ({
    name: (index + 1).toString(),
    value: (index + 1).toString(),
  })).reverse()

  const charData = findCharacter(char.cId)

  return (
    <div>
      <p className="text-xl font-bold text-center text-white">
        <span className="mr-2 text-desc">✦</span>Forte<span className="ml-2 text-desc">✦</span>
      </p>
      <div className="flex items-center justify-center gap-3 py-2">
        <TalentIcon talent={talents?.normal} element={charData?.element} size="w-9 h-9" hideTip />
        <div className="space-y-1">
          <p className="text-xs text-primary-lighter">Normal ATK</p>
          <SelectInput
            value={char?.talents?.normal?.toString()}
            onChange={(value) => onChange('normal', parseInt(value))}
            options={talentLevels}
            style="w-14 mr-2"
          />
        </div>
        <TalentIcon talent={talents?.skill} element={charData?.element} size="w-9 h-9" hideTip />
        <div className="space-y-1">
          <p className="text-xs text-primary-lighter">Res. Skill</p>
          <SelectInput
            value={char?.talents?.skill?.toString()}
            onChange={(value) => onChange('skill', parseInt(value))}
            options={talentLevels}
            style="w-14"
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 py-2">
        <TalentIcon talent={talents?.forte} element={charData?.element} size="w-9 h-9" hideTip />
        <div className="space-y-1">
          <p className="text-xs text-primary-lighter">Forte Circuit</p>
          <SelectInput
            value={char?.talents?.forte?.toString()}
            onChange={(value) => onChange('forte', parseInt(value))}
            options={talentLevels}
            style="w-14"
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 py-2">
        <TalentIcon talent={talents?.lib} element={charData?.element} size="w-9 h-9" hideTip />
        <div className="space-y-1">
          <p className="text-xs text-primary-lighter">Liberation</p>
          <SelectInput
            value={char?.talents?.lib?.toString()}
            onChange={(value) => onChange('lib', parseInt(value))}
            options={talentLevels}
            style="w-14 mr-2"
          />
        </div>
        <TalentIcon talent={talents?.intro} element={charData?.element} size="w-9 h-9" hideTip />
        <div className="space-y-1">
          <p className="text-xs text-primary-lighter">Intro Skill</p>
          <SelectInput
            value={char?.talents?.intro?.toString()}
            onChange={(value) => onChange('intro', parseInt(value))}
            options={talentLevels}
            style="w-14"
          />
        </div>
      </div>
      <p className="py-3 text-xl font-bold text-center text-white">
        <span className="mr-2 text-desc">✦</span>Inherent Skills<span className="ml-2 text-desc">✦</span>
      </p>
      <div className="flex items-center justify-center gap-4 py-2">
        <TalentIcon talent={talents?.i1} element={charData?.element} size="w-9 h-9" hideTip />
        <div className="flex flex-col gap-1">
          <p className="text-xs text-primary-lighter">Inherent 1</p>
          <CheckboxInput checked={char?.i?.i1} onClick={(value) => onChangeInherent('i1', value)} />
        </div>
        <TalentIcon talent={talents?.i2} element={charData?.element} size="w-9 h-9" hideTip />
        <div className="flex flex-col gap-1">
          <p className="text-xs text-primary-lighter">Inherent 2</p>
          <CheckboxInput checked={char?.i?.i2} onClick={(value) => onChangeInherent('i2', value)} />
        </div>
      </div>
    </div>
  )
})
