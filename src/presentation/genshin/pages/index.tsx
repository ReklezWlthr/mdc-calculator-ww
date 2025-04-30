import { useEffect, useState } from 'react'
import { Sidebar } from '../components/sidebar'
import { TeamSetup } from './team_setup'
import { GenshinPage } from '@src/domain/constant'
import { useLocalUpdater } from '@src/core/hooks/useLocalUpdater'
import { observer } from 'mobx-react-lite'
import { ArtifactInventory } from './artifact_inventory'
import { MyBuilds } from './my_builds'
import { ImportExport } from './import'
import { Calculator } from './calc'
import { MyCharacters } from './my_chars'
import { useStore } from '@src/data/providers/app_store_provider'
import { IntroModal } from '../components/modals/intro_modal'
import { ComparePage } from './compare'
import { Rotation } from './rotation'

const InternalPage = ({ page }: { page: GenshinPage }) => {
  switch (page) {
    case GenshinPage.TEAM:
      return <TeamSetup />
    case GenshinPage.INVENTORY:
      return <ArtifactInventory />
    case GenshinPage.BUILD:
      return <MyBuilds />
    case GenshinPage.IMPORT:
      return <ImportExport />
    case GenshinPage.DMG:
      return <Calculator />
    case GenshinPage.CHAR:
      return <MyCharacters />
    case GenshinPage.COMPARE:
      return <ComparePage />
    case GenshinPage.ROTATION:
      return <Rotation />
    default:
      return
  }
}

export const GenshinHome = observer(() => {
  const [page, setPage] = useState<GenshinPage>(GenshinPage.TEAM)

  const { modalStore } = useStore()
  useLocalUpdater('wuwa')

  return (
    <div className="flex flex-col flex-shrink w-full h-full overflow-y-auto desktop:flex-row">
      <Sidebar onChange={setPage} currentPage={page} />
      <InternalPage page={page} />
    </div>
  )
})
