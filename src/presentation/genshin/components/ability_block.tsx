import { observer } from 'mobx-react-lite'
import { TalentIcon } from './tables/scaling_wrapper'
import _ from 'lodash'
import { ITeamChar, StatIcons } from '@src/domain/constant'
import { ITalent } from '@src/domain/conditional'
import { SelectInput } from '@src/presentation/components/inputs/select_input'
import { findCharacter } from '@src/core/utils/finder'
import { CheckboxInput } from '@src/presentation/components/inputs/checkbox'
import { StatBonusValue } from '@src/domain/scaling'
import { toPercentage } from '@src/core/utils/converter'

export interface AbilityBlockProps {
  char: ITeamChar
  talents: ITalent
  onChange: (key: string, value: number) => void
  onChangeInherent: (key: string, value: boolean) => void
  onChangeStats: (index: number, value: boolean) => void
  disabled?: boolean
}

export const AbilityBlock = observer(
  ({ char, onChange, talents, onChangeInherent, onChangeStats }: AbilityBlockProps) => {
    const maxTalentLevel = _.max([1, (char.ascension - 1) * 2])
    const talentLevels = _.map(Array(maxTalentLevel), (_, index) => ({
      name: (index + 1).toString(),
      value: (index + 1).toString(),
    })).reverse()

    const charData = findCharacter(char.cId)

    return (
      <div className="flex flex-col items-center">
        <p className="text-xl font-bold text-center text-white">
          <span className="mr-2 text-desc">✦</span>Forte<span className="ml-2 text-desc">✦</span>
        </p>
        <div className="flex items-center justify-center gap-3 py-2">
          <TalentIcon talent={talents?.normal} element={charData?.element} size="w-9 h-9" modal />
          <div className="space-y-1">
            <p className="text-xs text-primary-lighter">Normal ATK</p>
            <SelectInput
              value={char?.talents?.normal?.toString()}
              onChange={(value) => onChange('normal', parseInt(value))}
              options={talentLevels}
              style="w-14 mr-2"
            />
          </div>
          <TalentIcon talent={talents?.skill} element={charData?.element} size="w-9 h-9" modal />
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
          <TalentIcon talent={talents?.forte} element={charData?.element} size="w-9 h-9" modal />
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
          <TalentIcon talent={talents?.lib} element={charData?.element} size="w-9 h-9" modal />
          <div className="space-y-1">
            <p className="text-xs text-primary-lighter">Liberation</p>
            <SelectInput
              value={char?.talents?.lib?.toString()}
              onChange={(value) => onChange('lib', parseInt(value))}
              options={talentLevels}
              style="w-14 mr-2"
            />
          </div>
          <TalentIcon talent={talents?.intro} element={charData?.element} size="w-9 h-9" modal />
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
          <TalentIcon talent={talents?.i1} element={charData?.element} size="w-9 h-9" modal />
          <div className="flex flex-col gap-1.5 whitespace-nowrap">
            <p className="text-xs text-primary-lighter">Inherent 1</p>
            <CheckboxInput checked={char?.i?.i1} onClick={(value) => onChangeInherent('i1', value)} />
          </div>
          <TalentIcon talent={talents?.i2} element={charData?.element} size="w-9 h-9" modal />
          <div className="flex flex-col gap-1.5 whitespace-nowrap">
            <p className="text-xs text-primary-lighter">Inherent 2</p>
            <CheckboxInput checked={char?.i?.i2} onClick={(value) => onChangeInherent('i2', value)} />
          </div>
        </div>
        <p className="py-3 text-xl font-bold text-center text-white">
          <span className="mr-2 text-desc">✦</span>Stat Bonus<span className="ml-2 text-desc">✦</span>
        </p>
        <div className="px-2 space-y-8 max-w-[250px]">
          {_.size(charData?.growth) ? (
            _.map(charData?.growth, (item, index) => (
              <div className="relative grid items-center h-12 grid-cols-5 gap-3 text-gray">
                {/* <div className="absolute w-[75%] border-t-4 border-primary left-1/2 -translate-x-1/2 bottom-2 -z-10" />
            <div className="absolute w-[75%] border-t-4 border-primary left-1/2 -translate-x-1/2 top-8 -z-10" /> */}
                <div className="flex flex-col items-center">
                  <p className="text-xs font-bold text-center text-white">{item}</p>
                  <p className="text-xs">{toPercentage(StatBonusValue[item][0])}</p>
                </div>
                <div className="flex flex-col items-center justify-between h-full">
                  <CheckboxInput
                    checked={char?.growth?.[0 + index * 4]}
                    onClick={(v) => onChangeStats(0 + index * 4, v)}
                  />
                  <CheckboxInput
                    checked={char?.growth?.[1 + index * 4]}
                    onClick={(v) => onChangeStats(1 + index * 4, v)}
                  />
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary ring ring-primary-light ring-offset-2 ring-offset-primary-bg shrink-0">
                    <img src={StatIcons[item]} className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between h-full">
                  <CheckboxInput
                    checked={char?.growth?.[2 + index * 4]}
                    onClick={(v) => onChangeStats(2 + index * 4, v)}
                  />
                  <CheckboxInput
                    checked={char?.growth?.[3 + index * 4]}
                    onClick={(v) => onChangeStats(3 + index * 4, v)}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-xs font-bold text-center text-white">{item}</p>
                  <p className="text-xs">{toPercentage(StatBonusValue[item][1])}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="w-[250px] text-center px-4 py-3 rounded-lg bg-primary-dark text-gray">No Data</div>
          )}
        </div>
      </div>
    )
  }
)
