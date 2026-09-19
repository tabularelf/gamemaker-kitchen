export const url = "/resource.json";

export default async function ({ search }, { url }) {
  const result = [];

    const response = await fetch("https://gmpm.gamemakerkitchen.com/-/verdaccio/data/packages");
    const prefabsMap = {};
    
    var prefabs = await response.json();
    prefabs = prefabs.forEach((prefab) => {
      prefabsMap[prefab.gm.displayName] = {
        fullname: prefab.name,
        name: prefab.gm.displayName,
        author: prefab.name.match("^@([A-Za-z0-9_-]+)/([A-Za-z0-9_.-]+)$")[1],
        url: `https://gmpm.gamemakerkitchen.com/-/web/detail/${prefab.name}`,
        destination: prefab.gm.destination,
        dist: prefab.dist,
      };
    });

  // Search libraries
  for (const lib of search.pages("type=lib")) {
    result.push({
      label: `Lib: ${lib.title}`,
      path: url(lib.url),
      title: lib.title,
      description: lib.description,
      link: lib.link,
      paid: lib.paid,
      threadLink: lib.threadLink,
      supportLink: lib.supportLink,
      docs: lib.docs,
      logo: lib.logo ?? lib.banner,
      tags: lib.tags,
      author: lib.authors,
      authorsSafe: lib.authorsSafe,
      date: lib.date,
      prefab: prefabsMap[lib.title],
	    type: 'library',
    });
  }
  
  // Search scripts
  for (const snippet of search.pages("type=snippet")) {
    result.push({
      label: `Snippet: ${snippet.title}`,
      path: url(snippet.url),
      title: snippet.title,
      link: snippet.link,
      description: snippet.description,
      paid: snippet.paid,
      threadLink: snippet.threadLink,
      supportLink: snippet.supportLink,
      docs: snippet.docs,
      logo: snippet.logo ?? snippet.banner,
      tags: snippet.tags,
      author: snippet.authors,
      authorsSafe: snippet.authorsSafe,
      date: snippet.date,
      prefab: prefabsMap[snippet.title],
	  type: 'snippet',
    });
  }
  
  // Search assets
  for (const asset of search.pages("type=asset")) {
    result.push({
      label: `Asset: ${asset.title}`,
      path: url(asset.url),
      title: asset.title,
      link: asset.link,
      description: asset.description,
      paid: asset.paid,
      threadLink: asset.threadLink,
      supportLink: asset.supportLink,
      docs: asset.docs,
      logo: asset.logo ?? asset.banner,
      tags: asset.tags,
      author: asset.authors,
      authorsSafe: asset.authorsSafe,
      date: asset.date,
      prefab: prefabsMap[asset.title],
	  type: 'asset',
    });
  }
  
  // Search tutorials
  for (const tutorial of search.pages("type=tutorial")) {
    result.push({
      label: `Tutorial: ${tutorial.title}`,
      path: url(tutorial.url),
      title: tutorial.title,
      description: tutorial.description,
      link: tutorial.link,
      threadLink: tutorial.threadLink,
      supportLink: tutorial.supportLink,
      logo: tutorial.logo ?? tutorial.banner,
      tags: tutorial.tags,
      author: tutorial.authors,
      authorsSafe: tutorial.authorsSafe,
      date: tutorial.date,
	  type: 'tutorial',
	});
  }

  // Search tools
  for (const tool of search.pages("type=tool")) {
    result.push({
      label: `Tool: ${tool.title}`,
      path: url(tool.url),
      title: tool.title,
      link: tool.link,
      description: tool.description,
      paid: tool.paid,
      threadLink: tool.threadLink,
      supportLink: tool.supportLink,
      docs: tool.docs,
      logo: tool.logo ?? tool.banner,
      tags: tool.tags,
      author: tool.authors,
      authorsSafe: tool.authorsSafe,
      date: tool.date,
      prefab: prefabsMap[tool.title],
	  type: 'tool',
    });
  }

  // Search plugins
  for (const plugin of search.pages("type=plugin")) {
    result.push({
      label: `Plugin: ${plugin.title}`,
      path: url(plugin.url),
      title: plugin.title,
      description: plugin.description,
      link: plugin.link,
      threadLink: plugin.threadLink,
      supportLink: plugin.supportLink,
      docs: plugin.docs,
      logo: plugin.logo ?? plugin.banner,
      tags: plugin.tags,
      author: plugin.authors,
      authorsSafe: plugin.authorsSafe,
      date: plugin.date,
      prefab: prefabsMap[plugin.title],
	  type: 'plugin',
    });
  }

  return JSON.stringify(result);
}