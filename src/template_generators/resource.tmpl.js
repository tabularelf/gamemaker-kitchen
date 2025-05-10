export const url = "/resource.json";

export default function ({ search }, { url }) {
  const result = [];

  // Search libraries
  for (const lib of search.pages("type=lib")) {
    result.push({
      label: `Lib: ${lib.data.title}`,
      path: url(lib.data.url),
      title: lib.data.title,
      description: lib.data.description,
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
      path: url(snippet.data.url),
      title: snippet.data.title,
      link: snippet.data.link,
      description: snippet.data.description,
      paid: snippet.data.paid,
      threadLink: snippet.data.threadLink,
      logo: snippet.data.logo ?? snippet.data.banner,
    });
  }
  
  // Search assets
  for (const asset of search.pages("type=asset")) {
    result.push({
      label: `Asset: ${asset.data.title}`,
      path: url(asset.data.url),
      title: asset.data.title,
      link: asset.data.link,
      description: asset.data.description,
      paid: asset.data.paid,
      threadLink: asset.data.threadLink,
      logo: asset.data.logo ?? asset.data.banner,
    });
  }
  
  // Search tutorials
  for (const tutorial of search.pages("type=tutorial")) {
    result.push({
      label: `Tutorial: ${tutorial.data.title}`,
      path: url(tutorial.data.url),
      title: tutorial.data.title,
      description: tutorial.data.description,
      link: tutorial.data.link,
      threadLink: tutorial.data.threadLink,
      logo: tutorial.data.logo ?? tutorial.data.banner,
    });
  }

  // Search tools
  for (const tool of search.pages("type=tool")) {
    result.push({
      label: `Tool: ${tool.data.title}`,
      path: url(tool.data.url),
      title: tool.data.title,
      link: tool.data.link,
      description: tool.data.description,
      paid: tool.data.paid,
      threadLink: tool.data.threadLink,
      logo: tool.data.logo ?? tool.data.banner,
    });
  }

  // Search plugins
  for (const plugin of search.pages("type=plugin")) {
    result.push({
      label: `Plugin: ${plugin.data.title}`,
      path: url(plugin.data.url),
      title: plugin.data.title,
      description: plugin.data.description,
      link: plugin.data.link,
      threadLink: plugin.data.threadLink,
      logo: plugin.data.logo ?? plugin.data.banner,
    });
  }

  return JSON.stringify(result);
}