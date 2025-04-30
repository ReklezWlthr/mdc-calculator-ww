import { useStore } from '@src/data/providers/app_store_provider'
import { GenshinPage } from '@src/domain/constant'
import classNames from 'classnames'
import { Fragment, useCallback, useState } from 'react'
import Link from 'next/link'
import { SettingModal } from './modals/setting_modal'
import { HelpModal } from './modals/help_modal'
import { IntroModal } from './modals/intro_modal'
import { Transition } from '@headlessui/react'

export const Sidebar = ({
  currentPage,
  onChange,
}: {
  currentPage: GenshinPage
  onChange: (page: GenshinPage) => void
}) => {
  const { modalStore } = useStore()

  const [menuOpen, setMenuOpen] = useState(false)

  const Pill = ({
    name,
    page,
    icon,
    closeMenu,
  }: {
    name: string
    page: GenshinPage
    icon: string
    closeMenu?: boolean
  }) => {
    return (
      <div
        className={classNames(
          'flex items-center gap-2 px-3 py-2 text-sm font-normal duration-200 rounded-lg cursor-pointer text-gray',
          page === currentPage ? 'bg-primary' : 'hover:bg-primary-dark'
        )}
        onClick={() => {
          closeMenu && setMenuOpen(false)
          onChange(page)
        }}
      >
        <i className={classNames(icon, 'w-5 flex items-center justify-center text-white')} />
        <p className="">{name}</p>
      </div>
    )
  }

  const onOpenSettingModal = useCallback(() => modalStore.openModal(<SettingModal />), [])
  const onOpenHelpModal = useCallback(() => modalStore.openModal(<HelpModal />), [])
  const onOpenIntroModal = useCallback(() => modalStore.openModal(<IntroModal />), [])

  return (
    <>
      <div className="flex items-center justify-between p-2 px-5 desktop:hidden bg-primary-darker">
        <div className="flex items-center gap-2">
          <div
            className={classNames(
              'absolute top-0 left-0 w-screen h-screen z-20',
              menuOpen ? 'block' : 'hidden pointer-events-none'
            )}
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative">
            <div
              className="flex items-center gap-3 cursor-pointer text-gray"
              onClick={() => !menuOpen && setMenuOpen(true)}
            >
              <i className="text-2xl fa-solid fa-bars" />
            </div>
            <Transition
              show={menuOpen}
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="absolute top-10 left-0 w-[300px] z-30 bg-primary-dark border border-primary-border rounded-lg px-3 py-1">
                <p className="p-2 font-bold text-white">Calculator</p>
                <Pill name="Team Setup" page={GenshinPage.TEAM} icon="fa-solid fa-user" closeMenu />
                <Pill name="Damage Calculator" page={GenshinPage.DMG} icon="fa-solid fa-chart-simple" closeMenu />
                <Pill name="ER Requirement" page={GenshinPage.ROTATION} icon="fa-solid fa-refresh" closeMenu />
                <Pill name="Compare" page={GenshinPage.COMPARE} icon="fa-solid fa-arrow-right-arrow-left" closeMenu />
                {/* <Pill name="ER Requirement" page={GenshinPage.ER} icon="fa-solid fa-rotate-right -rotate-90" /> */}
                <Pill name="Import / Export" page={GenshinPage.IMPORT} icon="fa-solid fa-file-import" closeMenu />
                <p className="p-2 font-bold text-white">Account</p>
                <Pill name="My Resonators" page={GenshinPage.CHAR} icon="fa-solid fa-user-group" closeMenu />
                <Pill name="My Builds" page={GenshinPage.BUILD} icon="fa-solid fa-screwdriver-wrench" closeMenu />
                <Pill name="Data Bank" page={GenshinPage.INVENTORY} icon="fa-solid fa-briefcase" closeMenu />
              </div>
            </Transition>
          </div>
          <Link href="/" className="flex flex-col items-end py-2 mx-3 text-white">
            <p className="flex items-center w-full text-2xl mobile:text-lg">
              MD<span className="text-base text-desc">✦</span>C Calculator
            </p>
            <p className="text-xs mobile:text-[10px] font-normal text-gray">Wuthering Waves</p>
          </Link>
        </div>
        <div className="flex items-end justify-between tablet:gap-8 mobile:gap-5">
          <div className="flex items-center gap-3 cursor-pointer text-gray" onClick={onOpenIntroModal}>
            <i className="text-xl fa-solid fa-circle-info" />
          </div>
          <div className="flex items-center gap-3 cursor-pointer text-gray" onClick={onOpenHelpModal}>
            <i className="text-xl fa-solid fa-question-circle" />
          </div>
          <div className="flex items-center gap-3 cursor-pointer text-gray" onClick={onOpenSettingModal}>
            <i className="text-xl fa-solid fa-cog" />
          </div>
        </div>
      </div>
      <div className="flex-col justify-between hidden w-1/6 p-2 bg-primary-darker shrink-0 desktop:flex">
        <div className="space-y-2">
          <Link href="/" className="flex flex-col items-end py-2 mx-3 text-white gap-x-2">
            <p className="flex items-center w-full text-2xl">
              MD<span className="text-base text-desc">✦</span>C Calculator
            </p>
            <p className="text-xs font-normal text-gray">Wuthering Waves</p>
          </Link>
          <div className="border-t border-primary-light" />
          <p className="p-2 font-bold text-white">Calculator</p>
          <Pill name="Team Setup" page={GenshinPage.TEAM} icon="fa-solid fa-user" />
          <Pill name="Damage Calculator" page={GenshinPage.DMG} icon="fa-solid fa-chart-simple" />
          <Pill name="ER Requirement" page={GenshinPage.ROTATION} icon="fa-solid fa-refresh" closeMenu />
          <Pill name="Compare" page={GenshinPage.COMPARE} icon="fa-solid fa-arrow-right-arrow-left" />
          {/* <Pill name="ER Requirement" page={GenshinPage.ER} icon="fa-solid fa-rotate-right -rotate-90" /> */}
          <Pill name="Import / Export" page={GenshinPage.IMPORT} icon="fa-solid fa-file-import" />
          <p className="p-2 font-bold text-white">Account</p>
          <Pill name="My Resonators" page={GenshinPage.CHAR} icon="fa-solid fa-user-group" />
          <Pill name="My Builds" page={GenshinPage.BUILD} icon="fa-solid fa-screwdriver-wrench" />
          <Pill name="Data Bank" page={GenshinPage.INVENTORY} icon="fa-solid fa-briefcase" />
        </div>
        <div className="flex items-end justify-between px-3">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 cursor-pointer text-gray" onClick={onOpenIntroModal}>
              <i className="text-xl fa-solid fa-circle-info" />
              <p>About</p>
            </div>
            <div className="flex items-center gap-3 cursor-pointer text-gray" onClick={onOpenHelpModal}>
              <i className="text-xl fa-solid fa-question-circle" />
              <p>Guides</p>
            </div>
            <div className="flex items-center gap-3 cursor-pointer text-gray" onClick={onOpenSettingModal}>
              <i className="text-xl fa-solid fa-cog" />
              <p>Settings</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
