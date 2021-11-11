import { GetStaticPaths, GetStaticProps } from "next";
import React, { ReactElement } from "react";
import path from "path";
import { bundleMDXFile } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import fg from "fast-glob";
import fs from "fs";
import Layout from "../components/Layout";
import CodeBlock from "../components/CodeBlock";
import { MDXComponents } from "mdx/types";
import {
  docsStaticPaths,
  indexMenuItems,
  Query,
} from "../utils/documentation-indexer";

interface Props {
  code: string;
  frontmatter: { [key: string]: any };
}

const components: MDXComponents = {
  code: CodeBlock,
};

export default function DocPage({ code, frontmatter }: Props): ReactElement {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <Layout>
      <Component components={components} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props, Query> = async (context) => {
  const slug = context.params.slug || [];

  console.log(await indexMenuItems());

  async function checkFileExists(filePath: string): Promise<boolean> {
    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  const withOutIndex = path.join(process.cwd(), "docs", ...slug) + ".mdx";
  const withIndex = path.join(process.cwd(), "docs", ...slug, "index") + ".mdx";

  const isWithOutIndex = await checkFileExists(withOutIndex);
  const isWithIndex = await checkFileExists(withIndex);

  if (isWithOutIndex) {
    const { code, frontmatter } = await bundleMDXFile(withOutIndex);
    return {
      props: {
        code: code,
        frontmatter: frontmatter,
      },
    };
  } else if (isWithIndex) {
    const { code, frontmatter } = await bundleMDXFile(withIndex);
    return {
      props: {
        code: code,
        frontmatter: frontmatter,
      },
    };
  } else {
    return {
      redirect: "/",
      props: { code: "", frontmatter: {} },
    };
  }
};

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const f = await docsStaticPaths();
  return {
    paths: f,
    fallback: false,
  };
};
