import * as fs from 'fs'
import { MDXComponents } from 'mdx/types'
import { bundleMDXFile } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import path from 'path'
import React, { ReactElement } from 'react'

import CodeBlock from '../components/CodeBlock'
import Layout from '../components/Layout'
import {
  docsStaticPaths,
  indexMenuItems,
  MenuTree,
  Query,
} from '../utils/documentation-indexer'

interface Props {
  code: string
  frontmatter: { [key: string]: unknown }
  menuTree?: Partial<MenuTree>
}

const components: MDXComponents = {
  //@ts-ignore
  code: CodeBlock,
}

export default function DocPage({
  code,
  frontmatter,
  menuTree,
}: Props): ReactElement {
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <Layout title={frontmatter.title} menuTree={menuTree}>
      <Component components={components} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props, Query> = async (context) => {
  console.log(context)
  const slug = context.params.slug || []

  const menuTree = await indexMenuItems()

  async function checkFileExists(filePath: string): Promise<boolean> {
    try {
      await fs.promises.access(filePath, fs.constants.F_OK)
      return true
    } catch {
      return false
    }
  }

  const withOutIndexMd = path.join(process.cwd(), 'docs', ...slug) + '.md'
  const withOutIndexMdx = path.join(process.cwd(), 'docs', ...slug) + '.mdx'
  const withIndexMd = path.join(process.cwd(), 'docs', ...slug, 'index') + '.md'
  const withIndexMdx =
    path.join(process.cwd(), 'docs', ...slug, 'index') + '.mdx'

  const isWithOutIndexMd = await checkFileExists(withOutIndexMd)
  const isWithOutIndexMdx = await checkFileExists(withOutIndexMdx)
  const isWithIndexMd = await checkFileExists(withIndexMd)
  const isWithIndexMdx = await checkFileExists(withIndexMdx)

  const withOutIndex = isWithOutIndexMd
    ? withOutIndexMd
    : isWithOutIndexMdx
    ? withOutIndexMdx
    : null

  const withIndex = isWithIndexMd
    ? withIndexMd
    : isWithIndexMdx
    ? withIndexMdx
    : null

  if (!!withOutIndex) {
    const { code, frontmatter } = await bundleMDXFile(withOutIndex)
    return {
      props: {
        code: code,
        menuTree: menuTree,
        frontmatter: frontmatter,
      },
    }
  } else if (!!withIndex) {
    const { code, frontmatter } = await bundleMDXFile(withIndex)
    return {
      props: {
        code: code,
        menuTree: menuTree,
        frontmatter: frontmatter,
      },
    }
  } else {
    return {
      redirect: '/',
      props: { code: '', frontmatter: {} },
    }
  }
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const f = await docsStaticPaths()
  return {
    paths: f,
    fallback: false,
  }
}
