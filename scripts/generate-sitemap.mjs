import { writeFile } from "fs";
import { globby } from "globby";
import prettier from "prettier";

const BASE = "https://nextstarter.js";

async function generate() {
  console.log("-> ! Generating sitemap...\n");
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  console.log("-> ! Getting files...\n");
  const pages = await globby([
    "pages/*.tsx",
    "data/**/*.mdx",
    "!data/*.mdx",
    "!pages/_*.tsx",
    "!pages/api",
    "!pages/404.tsx",
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace("pages", "")
              .replace("data", "")
              .replace(".tsx", "")
              .replace(".mdx", "");
            const route = path === "/index" ? "" : path;

            return `
              <url>
                  <loc>${`${BASE}${route}`}</loc>
              </url>
            `;
          })
          .join("")}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });
  console.log("-> ! Sitemap formatted: \n", formatted);
  console.log("-> ! Writing sitemap.xml...\n");
  // eslint-disable-next-line no-sync
  writeFile("public/sitemap.xml", formatted, (err) => {
    if (err) {
      console.error(`-> ! ${err}`);
    } else {
      console.log("-> ! Sitemap generated.");
    }
  });
}

generate();
