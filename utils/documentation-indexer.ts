import fg from "fast-glob";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { ParsedUrlQuery } from "querystring";
import { scanAsync, Dree, parseTree } from "dree";
import exists from "./fileExistsAsync";

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

export interface MenuTree {
  name: string;
  href?: string;
  skipDir: boolean;
  ordinal: number;
  children?: MenuTree[];
}

export async function indexMenuItems(): Promise<MenuTree> {
  const tree: Dree = await scanAsync(
    path.join(process.cwd(), "docs"),
    {
      size: false,
      sizeInBytes: false,
      hash: false,
      extensions: ["mdx"],
      emptyDirectory: false,
    },
    async (file) => {
      const contents: string = await fs.readFile(file.path, {
        encoding: "utf-8",
      });
      const frontmatter = matter(contents);
      file.name = frontmatter.data.title;
      file["ordinal"] =
        frontmatter.data.ordinal ||
        frontmatter.data.position ||
        frontmatter.data.sidebar_position;
      file["href"] = path
        .relative(path.join(process.cwd(), "docs"), file.path)
        .replace(".mdx", "")
        .replace("index", "");
    },
    async (dirTreeItem) => {
      const categoryJSONPath = path.join(dirTreeItem.path, "_category_.json");
      const categoryJSONPathExists: boolean = await exists(categoryJSONPath);
      if (categoryJSONPathExists) {
        const contents: { [key: string]: any } = JSON.parse(
          await fs.readFile(categoryJSONPath, {
            encoding: "utf-8",
          })
        );
        dirTreeItem[""];
        dirTreeItem.name = contents.label || contents.title;
        dirTreeItem["ordinal"] =
          contents.ordinal || contents.position || contents.sidebar_position;
        dirTreeItem["skipDir"] = false;
      } else {
        dirTreeItem["skipDir"] = true;
      }
    }
  );

  const menuTree = tree as unknown as MenuTree;

  /**
   * Recursively sorts children
   * @param m a menuTree
   */
  function sort(m: MenuTree) {
    if (m.children) {
      m.children = m.children?.sort((a, b) => (a.ordinal > b.ordinal ? 1 : -1));
      m.children?.forEach((c) => sort(c));
    }
  }

  sort(menuTree);

  // serialize it
  return JSON.parse(JSON.stringify(menuTree));
}
