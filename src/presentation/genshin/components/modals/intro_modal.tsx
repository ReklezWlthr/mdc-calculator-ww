import { BulletPoint, Collapsible } from '@src/presentation/components/collapsible'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import changelog from '@src/data/db/changelog.json'

export const IntroModal = observer(() => {
  return (
    <div className="w-[50dvw] mobile:w-[400px] bg-primary-dark rounded-lg p-3 space-y-2 mobile:max-h-[80dvh] mobile:overflow-y-auto">
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
          While I tried to make the calculator work on mobile, I still highly recommend using it on desktop.
        </BulletPoint>
        <BulletPoint>
          I also work full-time as a programmer, and usually develop this app in my free time. As a result, updates may
          be slow at times.
        </BulletPoint>
      </Collapsible>
      <div className="p-3 space-y-1 text-sm transition-all duration-200 rounded-lg bg-primary-darker text-gray">
        <p className="text-sm font-bold text-white">
          Hi, <span className="text-desc">MourningDew</span> Here...
        </p>
        <div className="space-y-1 overflow-hidden transition-all duration-200">
          <BulletPoint>
            Welcome to my little calculator project! As the name suggests, this calculator allows you to calculate the
            damage of each resonator in your team.
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
              href="https://wutheringwaves.fandom.com/wiki/Wuthering_Waves_Wiki"
              target="_blank"
            >
              Wuthering Waves Wiki
            </a>{' '}
            for the damage formula.
          </BulletPoint>
          {/* <BulletPoint color="text-desc">
            <a className="cursor-pointer focus:outline-none text-blue" href="https://ww.hakush.in/" target="_blank">
              Hakushi.in
            </a>{' '}
            for resonator and weapon details.
          </BulletPoint> */}
        </div>
      </div>
      <div className="p-3 space-y-1 text-sm transition-all duration-200 rounded-lg bg-primary-darker text-gray">
        <p className="text-sm font-bold text-white">You may also like:</p>
        <BulletPoint color="text-desc">
          <a
            className="cursor-pointer focus:outline-none text-blue"
            href="https://gi-mdc.vercel.app"
            target="_blank"
          >
            MDC Calculator for Genshin Impact
          </a>
          : Damage Calculator for <b>Genshin Impact</b>
        </BulletPoint>
        <BulletPoint color="text-desc">
          <a
            className="cursor-pointer focus:outline-none text-blue"
            href="https://hsr-mdc.vercel.app"
            target="_blank"
          >
            MDC Calculator for HSR
          </a>
          : Damage Calculator for <b>Honkai: Star Rail</b>
        </BulletPoint>
      </div>
    </div>
  )
})
