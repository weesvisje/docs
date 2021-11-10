import { GetStaticPaths, GetStaticProps } from "next";
import React, { ReactElement } from "react";
import path from "path";
import { bundleMDXFile } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import { ParsedUrlQuery } from "querystring";
import fg from "fast-glob";
import fs from "fs";
import Layout from "../components/Layout";

interface Props {
  code: string;
  frontmatter: { [key: string]: any };
}

interface Query extends ParsedUrlQuery {
  slug: string[];
}

export default function DocPage({ code, frontmatter }: Props): ReactElement {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <Layout>
      <Component />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props, Query> = async (context) => {
  const slug = context.params.slug || [];

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
      props: { code: "" },
    };
  }
};

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const filePaths = await fg(
    path.join(process.cwd(), "docs/**/*.mdx").replace(/\\/g, "/")
  );
  const paths: { params: { slug: string[] } }[] = filePaths.map((filePath) => {
    let slug: string[] = path
      .relative(path.join(process.cwd(), "docs"), filePath)
      .replace(".mdx", "")
      .split(path.sep);

    if (slug[slug.length - 1] === "index") {
      slug = slug.slice(0, -1);
    }
    return {
      params: { slug: slug },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
};
