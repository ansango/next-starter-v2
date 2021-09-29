import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";
import RSS from "rss";
import matter from "gray-matter";

const TITLE = "Next.js Starter";

const URL = "https://nextstarter.js";

const BASE = {
  title: TITLE,
  site_url: `${URL}`,
  feed_url: `${URL}/feed.xml`,
};

async function generate() {
  const feed = new RSS(BASE);

  const posts = readdirSync(join(process.cwd(), "data", "blog"));
  posts.map((name) => {
    const content = readFileSync(join(process.cwd(), "data", "blog", name));
    const frontmatter = matter(content);

    feed.item({
      title: frontmatter.data.title,
      url: `${URL}/blog/` + name.replace(/\.mdx?/, ""),
      date: frontmatter.data.publishedAt,
      description: frontmatter.data.summary,
    });
  });

  writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
}

generate();
