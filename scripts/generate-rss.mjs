import { readFileSync, readdirSync, writeFile } from "fs";
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
  // eslint-disable-next-line array-callback-return
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

  console.log("-> ! Writing RSS...\n");
  writeFile("./public/feed.xml", feed.xml({ indent: true }), (err) => {
    if (err) {
      console.error(`-> ! ${err}`);
    } else {
      console.log("-> ! RSS generated.");
    }
  });
}

generate();
