import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import postcss from "lume/plugins/postcss.ts";
import terser from "lume/plugins/terser.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import netlifyCMS from "lume/plugins/netlify_cms.ts";
import gpm from "https://deno.land/x/gpm@v0.4.1/mod.ts";
import {existsSync} from "https://deno.land/std/fs/mod.ts";

// Languages
import lang_javascript from "npm:highlight.js/lib/languages/javascript";
import lang_bash from "npm:highlight.js/lib/languages/bash";
import lang_gml from "npm:highlight.js/lib/languages/gml";
import lang_glsl from "npm:highlight.js/lib/languages/glsl";
import lang_json from "npm:highlight.js/lib/languages/json";
import lang_markdown from "npm:highlight.js/lib/languages/markdown";
import lang_yaml from "npm:highlight.js/lib/languages/yaml";

const site = lume({
  location: new URL("https://gamemakerkitchen.com"),
  src: "./src",
});


site
  .ignore("README.md")
  .ignore("run_submission_library.js")
  .copy("site-assets/")
  .copy("CNAME")
  .use(resolveUrls())
  .use(postcss())
  .use(terser())
  .use(date())
  .use(codeHighlight({
    languages: {
      javascript: lang_javascript,
      bash: lang_bash,
      gml: lang_gml,
      glsl: lang_glsl,
      json: lang_json,
      md: lang_markdown,
      yaml: lang_yaml
    },
  }))
  .use(basePath())
  .use(slugifyUrls({ alphanumeric: false }))
  .addEventListener(
    "beforeBuild",
    () => gpm(["oom-components/searcher"], "js/vendor"),
  );

// _config.ts

// Filter to convert a string to uppercase
site.filter("uppercase", (value) => value.toUpperCase());

// Filter to convert a string to uppercase
site.filter("lowercase", (value) => value.toLowerCase());

site.data("getAuthors", function authors(): string[] {
  const authors = new Set();

  site.pages.forEach((page) =>
    page.data.authors?.forEach((author: string) => authors.add(author))
  );

  return Array.from(authors);
});

site.data("getAuthorsPage", function authors(myAuthor): string[] {
  const authors = new Set();

  site.pages.forEach((page) =>
    page.data.authors?.forEach((author: string) => {
		if (page.data.authors.includes(myAuthor)) {
			authors.add(page);
		}
		//authors.add({author, page})
	})
  );

  return Array.from(authors);
});

// Define a custom filter to get a random page
site.filter("getRandomPage", (pages) => {
  let randomIndex = Math.floor(Math.random() * pages.length);
  return pages[randomIndex];
});

export default site;
