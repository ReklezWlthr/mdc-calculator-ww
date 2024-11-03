import Link from 'next/link'
import getConfig from 'next/config'
import { observer } from 'mobx-react-lite'

const { publicRuntimeConfig } = getConfig()

export const NavBar = observer(() => {
  return (
    <div className="flex items-center justify-between w-full gap-10 px-5 py-4 font-bold text-white bg-primary">
      <Link href="/" className="flex gap-x-2">
        <p className="flex items-center text-3xl">
          MD<span className="text-base text-desc">✦</span>C Calculator
        </p>
        <p className="text-sm font-normal text-gray">Genshin Impact</p>
      </Link>
      {/* <div className="flex items-center gap-5">
        <p className='font-normal text-gray'>Also Check Out</p>
        <Link href={publicRuntimeConfig.HSR_URL}>Honkai: Star Rail</Link>
      </div> */}
    </div>
  )
})
