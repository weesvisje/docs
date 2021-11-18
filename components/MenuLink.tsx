import cx from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export type MenuLinkProp = {
  href: string
  name: string
}

type Props = {
  link: MenuLinkProp
}

/** Renders a menu link on any of the sidebar components.*/
const MenuLink: React.FC<Props> = ({ link }) => {
  const router = useRouter()
  const isActiveLink = router.asPath.substr(1) === link.href
  return (
    <Link href={link.href}>
      <a
        key={link.name}
        href={link.href}
        className={cx(
          isActiveLink
            ? 'bg-gray-100 text-primary-500'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
          'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
        )}
      >
        {link.name}
      </a>
    </Link>
  )
}

export default MenuLink
