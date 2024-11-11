import { useStore } from '@src/data/providers/app_store_provider'
import { compareWeight, findCharacter, findEcho } from '../utils/finder'
import { useEffect, useMemo, useState } from 'react'
import { getTeamOutOfCombat } from '../utils/calculator'
import ConditionalsObject from '@src/data/lib/stats/conditionals/conditionals'
import _ from 'lodash'
import {
  calculateArtifact,
  calculateTeamArtifact,
  getArtifactConditionals,
} from '@src/data/lib/stats/conditionals/artifacts/calculate_artifact'
import {
  WeaponAllyConditionals,
  WeaponConditionals,
  WeaponTeamConditionals,
} from '@src/data/lib/stats/conditionals/weapons/weapon_conditionals'
import { Element, ITeamChar, Stats } from '@src/domain/constant'
import { getSetCount } from '../utils/data_format'
import { isFlat } from '@src/presentation/genshin/components/modals/custom_modal'
import { StatsObject, StatsObjectKeysT } from '@src/data/lib/stats/baseConstant'
import { Echoes } from '@src/data/db/artifacts'

interface CalculatorOptions {
  enabled?: boolean
  teamOverride?: ITeamChar[]
  formOverride?: Record<string, any>[]
  customOverride?: {
    name: StatsObjectKeysT
    value: number
    debuff: boolean
    toggled: boolean
  }[][]
  doNotSaveStats?: boolean
  indexOverride?: number
  initFormFunction?: (f: Record<string, any>[]) => void
}

export const useCalculator = ({
  enabled = true,
  teamOverride,
  formOverride,
  customOverride,
  indexOverride,
  doNotSaveStats,
  initFormFunction,
}: CalculatorOptions) => {
  const { teamStore, artifactStore, calculatorStore, settingStore } = useStore()

  const selected = indexOverride ?? calculatorStore?.selected
  const forms = formOverride || calculatorStore.form
  const team = teamOverride || teamStore.characters
  const custom = customOverride || calculatorStore.custom

  const [finalStats, setFinalStats] = useState<StatsObject[]>(null)

  const mainComputed = finalStats?.[selected]

  const baseStats = useMemo(() => getTeamOutOfCombat(team, artifactStore.artifacts), [team, artifactStore.artifacts])

  // Conditional objects include talent descriptions, conditional contents and a calculator
  const conditionals = useMemo(
    () =>
      _.map(team, (item) =>
        _.find(ConditionalsObject, (c) => c?.id === item?.cId)?.conditionals(item.cons, item.i, item.talents, team)
      ),
    [team, settingStore.settings.travelerGender]
  )
  const main = conditionals[selected]

  const artifactConditionals = useMemo(
    () =>
      _.map(team, (item) => {
        const artifacts = _.map(item.equipments.artifacts, (a) => _.find(artifactStore.artifacts, (b) => b.id === a))
        return getArtifactConditionals(artifacts)
      }),
    [team, artifactStore.artifacts]
  )
  const artifactAllyConditionals = _.map(team, (item, index) =>
    _.map(_.flatten(_.filter(_.map(artifactConditionals, 'allyContent'), (_i, i) => i !== index)), (cond) => ({
      ...cond,
      id: `${cond.id}_${index}`,
      index: selected,
      owner: index,
    }))
  )
  const weaponConditionals = _.map(team, (item, index) =>
    item?.equipments?.weapon?.wId
      ? _.map(
          _.filter(WeaponConditionals, (weapon) => _.includes(weapon.id, item?.equipments?.weapon?.wId)),
          (cond) => ({ ...cond, title: '', content: '', index })
        )
      : []
  )
  const weaponTeamConditionals = _.map(team, (item, index) =>
    item?.equipments?.weapon?.wId
      ? _.map(
          _.filter(WeaponTeamConditionals, (weapon) => _.includes(weapon.id, item?.equipments?.weapon?.wId)),
          (cond) => ({ ...cond, title: '', content: '', index })
        )
      : []
  )
  const weaponAllyConditionals = _.map(team, (item, index) =>
    item?.equipments?.weapon?.wId
      ? _.map(
          _.filter(WeaponAllyConditionals, (weapon) => _.includes(weapon.id, item?.equipments?.weapon?.wId)),
          (cond) => ({ ...cond, id: `${cond.id}_${index}`, title: '', content: '', index: selected, owner: index })
        )
      : []
  )
  const weaponAllySelectable = (i: number) => _.flatten(_.filter(weaponAllyConditionals, (_, i2) => i !== i2))
  const weaponEligible = (i: number) => [...weaponConditionals[i], ..._.flatten(weaponTeamConditionals)]
  const weaponSelectable = (i: number) => [...weaponEligible(i), ...weaponAllySelectable(i)]

  const allyContents = (i: number, inverse?: boolean) =>
    _.flatten(
      _.filter(
        _.map(conditionals, (item) => _.map(item?.allyContent, (content) => ({ ...content }))),
        (_, index) => (inverse ? index === i : index !== i)
      )
    )

  useEffect(() => {
    if (enabled) {
      const f = _.map(conditionals, (item, index) =>
        _.reduce(
          _.concat(
            item?.content,
            item?.teammateContent,
            allyContents(index),
            artifactConditionals[index]?.content,
            artifactConditionals[index]?.teamContent,
            artifactAllyConditionals[index],
            ...weaponSelectable(index)
          ),
          (acc, curr) => {
            if (curr?.show) acc[curr.id] = curr.default
            return acc
          },
          {}
        )
      )
      if (initFormFunction) initFormFunction(f)
      else calculatorStore.initForm(f)
    }
  }, [team])

  // =================
  //
  // Main Calculator
  //
  // =================

  // Calculate normal stats first, then ones from allies, then ones from artifacts
  // Those above does not rely on character's own stat (except EoSF) so they are placed first
  // Some weapon buffs scale off character's stat so we have to calculate ones above first
  // Reactions are placed last because they only provide damage buff, not stat buffs, and heavily relies on stats
  useEffect(() => {
    if (!_.some(forms)) return
    if (!enabled) return
    const preCompute = _.map(
      conditionals,
      (base, index) => base?.preCompute(baseStats[index], forms[index]) || baseStats[index]
    ) // Compute all self conditionals, return stats of each char
    const preComputeShared = _.map(preCompute, (base, index) => {
      // Compute all shared conditionals, call function for every char except the owner
      let x = base
      _.forEach(conditionals, (item, i) => {
        // Loop characters, exclude index of the current parent iteration
        if (i !== index)
          x =
            item?.preComputeShared(
              preCompute[i],
              x,
              {
                ...forms[i],
                weapon: findCharacter(team[index]?.cId)?.weapon,
                element: findCharacter(team[index]?.cId)?.element,
              },
              forms[index]
            ) || x
      })
      return x
    })
    const postCustom = _.map(preComputeShared, (base, index) => {
      let x = base
      _.forEach(custom[index], (v) => {
        if (v.toggled)
          x[v.name as any].push({ value: v.value / (isFlat(v.name) ? 1 : 100), name: 'Manual', source: 'Custom' })
      })
      return x
    })

    // Always loop; artifact buffs are either self or team-wide so everything is in each character's own form
    const postArtifact = _.map(postCustom, (base, index) => {
      let x = base
      _.forEach(forms, (form, i) => {
        x = i === index ? calculateArtifact(x, form, team, index) : calculateTeamArtifact(x, form, index)
      })
      return x
    })
    const postWeapon = _.map(postArtifact, (base, index) => {
      let x = base
      // Apply self self buff then loop for team-wide buff that is in each character's own form
      _.forEach(forms, (form, i) => {
        _.forEach(
          _.filter(
            i === index ? [...weaponConditionals[i], ...weaponTeamConditionals[i]] : weaponTeamConditionals[i],
            (c) => _.includes(_.keys(form), c.id)
          ),
          (c) => {
            x = c.scaling(x, form, team[i]?.equipments?.weapon?.refinement, {
              team: team,
              element: findCharacter(team[i]?.cId)?.element,
              own: postArtifact[i],
              totalEnergy: _.sumBy(postArtifact, (pa) => pa.MAX_ENERGY),
              index: i,
            })
          }
        )
      })
      // Targeted buffs are in each team member form aside from the giver so no need to loop
      _.forEach(
        _.filter(weaponAllySelectable(index), (c) => _.includes(_.keys(forms[index]), c.id)),
        (c) => {
          x = c.scaling(x, forms[index], team[c.owner]?.equipments?.weapon?.refinement, {
            team: team,
            element: findCharacter(team[c.owner]?.cId)?.element,
            own: postArtifact[c.owner],
            totalEnergy: _.sumBy(postArtifact, (pa) => pa.MAX_ENERGY),
            index,
            owner: c.owner,
          })
        }
      )
      return x
    })
    const postCompute = _.map(
      conditionals,
      (base, index) => base?.postCompute(postWeapon[index], forms[index], postWeapon, forms) || postWeapon[index]
    )
    const postArtifactCallback = _.map(postCompute, (base, index) => {
      let x = base
      const mainEcho = team[index]?.equipments?.artifacts?.[0]
      const echoData = _.find(artifactStore.artifacts, ['id', mainEcho])
      const bonus = findEcho(echoData?.setId)?.bonus
      if (bonus) {
        x = bonus(x, echoData?.quality - 1)
      }
      return x
    })
    // Cleanup callbacks for buffs that should be applied last
    const final = _.map(postArtifactCallback, (base, index) => {
      let x = base
      const cbs = base.CALLBACK.sort((a, b) => compareWeight(a.name, b.name))
      _.forEach(cbs, (cb) => {
        x = cb(x, postArtifactCallback)
      })
      return x
    })
    if (!doNotSaveStats) {
      calculatorStore.setValue('computedStats', final)
    }
    setFinalStats(final)
  }, [baseStats, forms, custom, team, settingStore.settings.travelerGender])

  // =================
  //
  // Mapped Contents
  //
  // =================

  // Mapped conditional contents that the selected character can toggle (Self + all team buffs from allies)
  // Soon might have to implement single target buff
  const customMapped = (selected: number) =>
    _.flatMap(
      _.map(conditionals, (item, index) => (index === selected ? item?.content : item?.teammateContent)),
      (item, index) => _.map(item, (inner) => ({ ...inner, index }))
    )
  const mapped = customMapped(selected)
  const allyMapped = _.map(allyContents(selected), (item) => ({ ...item, index: selected }))
  // Index is embedded into each conditional for the block to call back to
  // Because each of the form with represent ALL the buffs that each character has (including team buffs); not the value that we can change in their page
  // This helps separate buffs trigger of each character and prevent buff stacking
  // Update: This is with the exception of single target buffs that will be put in allies' form instead of the giver so that the buff will not activate all at once
  const mainContent = _.filter(mapped, ['index', selected])
  const teamContent = [..._.filter(mapped, (item) => selected !== item.index), ...allyMapped]
  const allyArtifact = _.map(artifactAllyConditionals[selected], (item) => ({ ...item, index: selected }))
  const artifactContents = (selected: number) =>
    _.uniqBy(
      _.flatMap(
        _.map(conditionals, (_i, index) =>
          index === selected
            ? artifactConditionals[index]?.content
            : [...artifactConditionals[index]?.teamContent, ...allyArtifact]
        ),
        (item, index) => _.map(item, (inner) => ({ ...inner, index: inner.single ? selected : index }))
      ),
      (item) => item.id
    )

  return {
    main,
    mainComputed,
    finalStats,
    contents: {
      main: mainContent,
      team: teamContent,
      weapon: weaponSelectable,
      artifact: artifactContents,
      customMain: (selected: number) => _.filter(customMapped(selected), ['index', selected]),
      customTeam: (selected: number) => [
        ..._.filter(customMapped(selected), (item) => selected !== item.index),
        ..._.map(allyContents(selected), (item) => ({ ...item, index: selected })),
      ],
    },
  }
}

export type CalculatorT = ReturnType<typeof useCalculator>
