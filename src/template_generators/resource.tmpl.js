export const url = "/resource.json";

export default function ({ search }, { url }) {
  const result = [];

  // Search libraries
  for (const lib of search.pages("type=lib")) {
    result.push({
      label: `Lib: ${lib.data.title}`,
      search: `${lib.data.title} ${lib.data.tags.join(" ")}`,
      path: url(lib.data.url),
      title: lib.data.title,
      link: lib.data.link,
      paid: lib.data.paid,
      threadLink: lib.data.threadLink,
      logo: lib.data.logo ?? lib.data.banner,
    });
  }
  
  // Search scripts
  for (const snippet of search.pages("type=snippet")) {
    result.push({
      label: `Snippet: ${snippet.data.title}`,
      search: `${snippet.data.title} ${snippet.data.tags.join(" ")}`,
      path: url(snippet.data.url),
      title: snippet.data.title,
      link: snippet.data.link,
      paid: snippet.data.paid,
      threadLink: snippet.data.threadLink,
      logo: snippet.data.logo ?? snippet.data.banner,
    });
  }
  
  // Search assets
  for (const asset of search.pages("type=asset")) {
    result.push({
      label: `Asset: ${asset.data.title}`,
      search: `${asset.data.title} ${asset.data.tags.join(" ")}`,
      path: url(asset.data.url),
      title: asset.data.title,
      link: asset.data.link,
      paid: asset.data.paid,
      threadLink: asset.data.threadLink,
      logo: asset.data.logo ?? asset.data.banner,
    });
  }
  
  // Search tutorials
  for (const tutorial of search.pages("type=tutorial")) {
    result.push({
      label: `Tutorial: ${tutorial.data.title}`,
      search: `${tutorial.data.title} ${tutorial.data.tags.join(" ")}`,
      path: url(tutorial.data.url),
      title: tutorial.data.title,
      link: tutorial.data.link,
      threadLink: tutorial.data.threadLink,
      logo: tutorial.data.logo ?? tutorial.data.banner,
    });
  }

  // Search tools
  for (const tool of search.pages("type=tool")) {
    result.push({
      label: `Tool: ${tool.data.title}`,
      search: `${tool.data.title} ${tool.data.tags.join(" ")}`,
      path: url(tool.data.url),
      title: tool.data.title,
      link: tool.data.link,
      paid: tool.data.paid,
      threadLink: tool.data.threadLink,
      logo: tool.data.logo ?? tool.data.banner,
    });
  }

  // Search plugins
  for (const plugin of search.pages("type=plugin")) {
    result.push({
      label: `Plugin: ${plugin.data.title}`,
      search: `${plugin.data.title} ${plugin.data.tags.join(" ")}`,
      path: url(plugin.data.url),
      title: plugin.data.title,
      link: plugin.data.link,
      threadLink: plugin.data.threadLink,
      logo: plugin.data.logo ?? plugin.data.banner,
    });
  }

  return JSON.stringify(result);
}