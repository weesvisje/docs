import fg from "fast-glob";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ParsedUrlQuery } from "querystring";
import { scanAsync, Dree } from "dree";

export interface MenuItem {
  key: string;
  href?: string;
  label: string;
  items?: MenuItem[];
}

export interface Query extends ParsedUrlQuery {
  slug: string[];
}

export async function docsStaticPaths() {
  const filePaths = (
    await fg(path.join(process.cwd(), "docs/**/*.mdx").replace(/\\/g, "/"))
  ).map((filePath) => {
    let relativeFilePath = path
      .relative(path.join(process.cwd(), "docs"), filePath)
      .replace(".mdx", "");
    let parts = relativeFilePath.split(path.sep);
    if (parts[parts.length - 1] === "index") {
      parts = parts.slice(0, -1);
    }
    return {
      params: {
        slug: parts,
      },
    };
  });
  return filePaths;
}

export async function indexMenuItems() {
  const tree: Dree = await scanAsync(path.join(process.cwd(), "docs"), {
    extensions: ["mdx"],
  });
  console.log(tree);
}
