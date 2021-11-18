import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import cx from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'

import { MenuTree } from '../utils/documentation-indexer'

type Props = {
  group: Partial<MenuTree>
}

const MenuGroup = ({ children, group }: React.PropsWithChildren<Props>) => {
  const router = useRouter()
  const isActive =
    group.relativePath && router.asPath.includes(group.relativePath)
  if (group.skipDir) {
    return children
  }

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={cx(
              'flex justify-between w-full px-2 py-2 text-sm font-medium text-left rounded-lg focus:outline-none focus-visible:ring hover:bg-gray-50 hover:text-gray-900',
              {
                ['text-primary-500']: isActive,
                ['text-gray-600']: !isActive,
              },
            )}
          >
            <span>{group.name}</span>
            <ChevronRightIcon
              className={`${
                open ? 'transform rotate-90' : ''
              } w-5 h-5 text-gray-600`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pb-2 text-sm text-gray-500">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default MenuGroup
