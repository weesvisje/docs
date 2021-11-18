import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/outline'
import React, { useState } from 'react'

import { MenuTree } from '../utils/documentation-indexer'
import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'
import SearchBar from './SearchBar'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
]

interface Props extends React.PropsWithChildren<unknown> {
  title?: string | React.ReactNode | React.ReactElement | JSX.Element
  menuTree?: Partial<MenuTree>
}

export default function Layout({ menuTree, title, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <MobileSidebar
        menuTree={menuTree}
        isOpen={sidebarOpen}
        onToggleOpen={(isOpen) => setSidebarOpen(isOpen)}
      />

      <DesktopSidebar menuTree={menuTree} />
      <div className="md:pl-64 flex flex-col flex-1">
        <SearchBar onToggleOpen={setSidebarOpen} />
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Replace with your content */}
              <div className="py-4 prose lg:prose-sm">{children}</div>
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
