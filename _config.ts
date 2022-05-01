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

const site = lume({
  location: new URL("https://tabularelf.github.io/"),
});


site
  .ignore("README.md")
  .ignore("run_submission_library.js")
  .copy("assets/")
  .copy("CNAME")
  .use(postcss())
  .use(terser())
  .use(date())
  .use(codeHighlight())
  .use(basePath())
  .use(slugifyUrls({ alphanumeric: false }))
  .use(resolveUrls())
  //.use(netlifyCMS({ netlifyIdentity: true }))
  .addEventListener(
    "beforeBuild",
    () => gpm(["oom-components/searcher"], "js/vendor"),
  );

// _config.ts

// Filter to convert a string to uppercase
site.filter("uppercase", (value) => value.toUpperCase());

// Filter to convert a string to uppercase
site.filter("lowercase", (value) => value.toLowerCase());

// Set a function
site.data("randomNumber", function () {
  return Math.random();
});

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

export default site;
