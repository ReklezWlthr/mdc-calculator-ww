import { BulletPoint, Collapsible } from '@src/presentation/components/collapsible'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import changelog from '@src/data/db/changelog.json'

export const IntroModal = observer(() => {
  return (
    <div className="w-[50vw] bg-primary-dark rounded-lg p-3 space-y-2">
      <p className="text-lg font-bold text-white">About</p>
      <Collapsible
        label="Changelogs"
        childRight={<div className="px-2 py-1 font-bold rounded-md bg-primary">v{_.head(changelog).version}</div>}
      >
        <div className="space-y-2">
          {_.map(_.slice(changelog, 0, 7), (item) => (
            <div className="space-y-1" key={item.version}>
              <p className="ml-3 text-amber-200">
                <b className="text-desc">v{item.version}</b> - {item.date}
              </p>
              {_.map(item.desc, (desc) => (
                <BulletPoint key={desc}>
                  <span dangerouslySetInnerHTML={{ __html: desc }} />
                </BulletPoint>
              ))}
            </div>
          ))}
        </div>
      </Collapsible>
      <Collapsible label="Notes & Limitations">
        <BulletPoint>
          UX Design is really not my forte. If you find some parts that is confusing or counterintuitive and should be
          improved, please let me know.
        </BulletPoint>
        <BulletPoint>
          The resulting stats may be slightly off due to hidden decimals and some mathematical wizardry, but the
          differences should be negligible. Sub stat rolls may also become inaccurate when the roll quality is too high.
        </BulletPoint>
        <BulletPoint>
          It is not recommended to use this app on mobiles or vertical screens. This is partly due to most information
          being presented in tooltips.
        </BulletPoint>
        <BulletPoint>
          I also work full-time as a programmer, and usually develop this app in my free time. As a result, updates may
          be slow at times.
        </BulletPoint>
        <BulletPoint>
          As of now, the calculator sadly does not support comparing builds since it calculates every character's stats
          at once. This makes comparing builds quite hard. I will try to find a workaround soon.
        </BulletPoint>
      </Collapsible>
      <div className="p-3 space-y-1 text-sm transition-all duration-200 rounded-lg bg-primary-darker text-gray">
        <p className="text-sm font-bold text-white">
          Hi, <span className="text-desc">MourningDew</span> Here...
        </p>
        <div className="space-y-1 overflow-hidden transition-all duration-200">
          <BulletPoint>
            Welcome to my little calculator project! As the name suggests, this calculator allows you to calculate the
            damage of each character in your team.
          </BulletPoint>
          <BulletPoint>
            If you encounter bugs, or have questions or suggestions, do not hesitate to contact me via:
          </BulletPoint>
          <div className="pt-1 space-y-2">
            <div className="flex items-center gap-2 pl-4">
              <i className="w-5 fa-brands fa-discord" />
              <a>mourningdew</a>
            </div>
            <div className="flex items-center gap-2 pl-4">
              <i className="w-5 fa-brands fa-reddit-alien" />
              <a
                className="cursor-pointer focus:outline-none text-blue"
                href="https://www.reddit.com/user/ReklezWLTHR/"
                target="_blank"
              >
                u/ReklezWLTHR
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 space-y-1 text-sm transition-all duration-200 rounded-lg bg-primary-darker text-gray">
        <p className="text-sm font-bold text-white">Credits</p>
        <div className="space-y-1 overflow-hidden transition-all duration-200">
          <BulletPoint color="text-desc">
            <a
              className="cursor-pointer focus:outline-none text-blue"
              href="https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki"
              target="_blank"
            >
              Genshin Impact Wiki
            </a>{' '}
            for formulas, descriptions and constellation images.
          </BulletPoint>
          <BulletPoint color="text-desc">
            <a className="cursor-pointer focus:outline-none text-blue" href="https://enka.network" target="_blank">
              Enka.Network
            </a>{' '}
            for the in-game data import API.
          </BulletPoint>
          <BulletPoint color="text-desc">
            <a className="cursor-pointer focus:outline-none text-blue" href="https://gi18.hakush.in" target="_blank">
              Hakushi.in
            </a>{' '}
            and{' '}
            <a
              className="cursor-pointer focus:outline-none text-blue"
              href="https://homdgcat.wiki/gi/char"
              target="_blank"
            >
              HomDGCat Wiki
            </a>{' '}
            for character and weapon details.
          </BulletPoint>
          <BulletPoint color="text-desc">
            <a className="cursor-pointer focus:outline-none text-blue" href="https://wanderer.moe" target="_blank">
              Wanderer.moe
            </a>{' '}
            for images of elements and emotes.
          </BulletPoint>
        </div>
      </div>
      <div className="p-3 space-y-1 text-sm transition-all duration-200 rounded-lg bg-primary-darker text-gray">
        <p className="text-sm font-bold text-white">You may also like:</p>
        <BulletPoint color="text-desc">
          <a
            className="cursor-pointer focus:outline-none text-blue"
            href="https://mdc-calculator-hsr.vercel.app"
            target="_blank"
          >
            MDC Calculator for HSR
          </a>
          : Damage Calculator for <b>Honkai: Star Rail</b> (also by me!)
        </BulletPoint>
      </div>
    </div>
  )
})
