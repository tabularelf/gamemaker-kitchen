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
//import minifyHTML from "lume/plugins/minify_html.ts";
import readInfo from "lume/plugins/reading_info.ts";
import favicon from "lume/plugins/favicon.ts";


// Languages
import lang_javascript from "npm:highlight.js/lib/languages/javascript";
import lang_bash from "npm:highlight.js/lib/languages/bash";
import lang_gml from "npm:highlight.js/lib/languages/gml";
import lang_glsl from "npm:highlight.js/lib/languages/glsl";
import lang_json from "npm:highlight.js/lib/languages/json";
import lang_markdown from "npm:highlight.js/lib/languages/markdown";
import lang_yaml from "npm:highlight.js/lib/languages/yaml";
import search from "lume/plugins/search.ts";

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
  )
  .use(readInfo())
  .use(favicon({
    input: "/favicon_source.png",
    cache: false,
  }))
  /*.use(minifyHTML({
    options: {
      minify_js: true, 
      minify_css: true,
      keep_comments: false,
    }
  }));*/

// _config.ts

// Filter to convert a string to uppercase
site.filter("uppercase", (value) => value.toUpperCase());

// Filter to convert a string to uppercase
site.filter("lowercase", (value) => value.toLowerCase());

// Filter to stripping the first character from a string
site.filter("trimStartSlash", (value) => value.substring(1));

site.filter("safeURL", (str: string) => str.toLowerCase().trim().replaceAll(/\s+/g, '-').replaceAll("_", "-").replaceAll(" ", "-"));

site.data("getAuthors", function authors(): string[] {
  const authors = new Set();

  site.pages.forEach((page) =>
    page.data.authors?.forEach((author: string) => authors.add(author))
  );

  let newAuthors = Array.from(authors);
  let newAuthorsLowerCased = newAuthors.map(author => author.toLowerCase());
  let authorsFinal = [];
  ///newAuthorsLowerCased = newAuthors.filter(author => newAuthorsLowerCased.includes(author));
  newAuthors.forEach(author => {
    if ((!(authorsFinal.includes(author))) && (!(authorsFinal.map(author => author.toLowerCase()).includes(author.toLowerCase())))) {
      authorsFinal.push(author);
    }
  });
  return authorsFinal.map((author) => {return {
    author,
    authorSafe: author.toLowerCase().trim().replaceAll(/\s+/g, '-').replaceAll("_", "-").replaceAll(" ", "-")
  }});
});

site.data("getAuthorsPage", function authors(myAuthor): string[] {
  const authors = new Set();

  site.pages.forEach((page) =>
    page.data.authors?.forEach((author: string) => {
		if (page.data.authors.includes(myAuthor)) {
			authors.add(page);
		}
	})
  );

  return Array.from(authors);
});

// Define a custom filter to get a random page
site.filter("getRandomPage", (pages) => {
  let randomIndex = Math.floor(Math.random() * pages.length);
  return pages[randomIndex];
});

site.preprocess([".md"], (page) => {
  let tags = page.data.tags;

  // We actually have this here so I don't gotta refactor a bunch of potential files
  const dbMatch = {
    "localisation":   "localization",
    "sprite":        "sprites",
    "array":         "arrays",
    "string":        "strings",
    "vector":        "vectors",
    "buffer":        "buffers",
  };
  
  // Normalize tags
  if (tags != undefined) {
	  tags = [...new Set(tags)];
	  tags = tags.map((tag) => {
	  	tag = tag.toLowerCase().trim();
	  	if (Object.hasOwn(dbMatch, tag)) {
	  		tag = dbMatch[tag];
	  	}
    
	  	return tag;
	  });
  
	  // Save the normalized tags 
	  page.data.tags = tags;
  }
  
  let authors = page.data.authors;
  if (authors != undefined) {
	   page.data.authorsSafe = authors.map((author) => author.toLowerCase().trim().replaceAll(/\s+/g, '-').replaceAll("_", "-").replaceAll(" ", "-"));
     page.data.authorsMetadata = authors.map((author) => {
      return {
        name: author,
        safe: author.toLowerCase().trim().replaceAll(/\s+/g, '-').replaceAll("_", "-").replaceAll(" ", "-")
      }
     });
	  //console.log(authors);
  }

});

export default site;
