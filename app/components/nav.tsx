import Link from 'next/link'

const navItems = {
  '/learn': {
    name: 'Learn',
  },
  '/test': {
    name: 'Test',
  },
  '/about': {
    name: 'About',
  },
  '/': {
    name: 'Home',
  },
}



export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative pt-4"
          id="nav"
        >
          <p className="flex align-middle relative py-1 px-2 m-1">NashWRLD</p>

          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
