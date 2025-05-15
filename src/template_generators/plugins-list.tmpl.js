import { plugin } from "npm:postcss@8.4.31";

export const layout = "layouts/libraries.njk";
export const title = "Plugins";

export default function* ({ search, paginate }) {
  const posts = search.pages("category=resource", "date=desc");

  for (
    const data of paginate(posts, { url, size: 24 })
  ) {
      // Not my most finest work, but if it works... It works?
      for(const index in data.results) {
      const result = search.pages(`parent=${data.results[index].data.title}`, "date=desc");
      var page = data.results[index];
      page.data.plugins = [];
      for (const child of paginate(result, {url, size: 24})) {
        for (const pluginData of child.results) {
          page.data.plugins.push(pluginData);
        }
        child.url = `/${data.results[index].data.url}/${child.url}`
        child.title = `${data.results[index].data.title} Plugins`;
        yield child;
      }
    }
  }
}

function url(n) {
  if (n === 1) {
    return "/plugins/";
  }

  return `/plugins/${n}/`;
}
