import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import { MenuTree } from '../utils/documentation-indexer'

type Props = {
  menuTree: Partial<MenuTree>
}

const DesktopSidebar: React.FC<Props> = ({ menuTree }) => {
  const renderMenuLinks = () => {
    return menuTree?.children?.map((tree) => {
      if (tree.href !== undefined) {
        return (
          <Link key={tree.name} href={tree.href}>
            <a
              key={tree.name}
              href={tree.href}
              className={classNames(
                true
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              )}
            >
              {tree.name}
            </a>
          </Link>
        )
      }
      return (
        <div key={tree.name}>
          {tree.name} {tree.href}
        </div>
      )
    })
  }
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
            alt="Workflow"
          />
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">{renderMenuLinks()}</nav>
        </div>
      </div>
    </div>
  )
}

export default DesktopSidebar
