import React from 'react'

import { MenuTree } from '../utils/documentation-indexer'
import MenuGroup from './MenuGroup'
import MenuLink, { MenuLinkProp } from './MenuLink'

type Props = {
  tree: Partial<MenuTree>
}

/** Component used to render a MenuTree */
const LinksTree: React.FC<Props> = ({ tree }) => {
  const renderTree = (element: Partial<MenuTree>) => {
    if (element.type === 'file') {
      return <MenuLink link={element as MenuLinkProp} key={element.name} />
    }

    if (element.type === 'directory') {
      return (
        <MenuGroup group={element} key={element.name}>
          {element.children?.map((groupChild) => renderTree(groupChild))}
        </MenuGroup>
      )
    }
  }

  return renderTree(tree)
}

export default LinksTree
