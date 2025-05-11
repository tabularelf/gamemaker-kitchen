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
      docs: lib.data.docs,
      logo: lib.data.logo ?? lib.data.banner,
      tags: lib.data.tags,
      author: lib.data.authors,
      date: lib.data.date,
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
      docs: snippet.data.docs,
      logo: snippet.data.logo ?? snippet.data.banner,
      tags: snippet.data.tags,
      author: snippet.data.authors,
      date: snippet.data.date,
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
      docs: asset.data.docs,
      logo: asset.data.logo ?? asset.data.banner,
      tags: asset.data.tags,
      author: asset.data.authors,
      date: asset.data.date,
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
      tags: tutorial.data.tags,
      author: tutorial.data.authors,
      date: tutorial.data.date,
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
      docs: tool.data.docs,
      logo: tool.data.logo ?? tool.data.banner,
      tags: tool.data.tags,
      author: tool.data.authors,
      date: tool.data.date,
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
      docs: plugin.data.docs,
      logo: plugin.data.logo ?? plugin.data.banner,
      tags: plugin.data.tags,
      author: plugin.data.authors,
      date: plugin.data.date,
    });
  }

  return JSON.stringify(result);
}