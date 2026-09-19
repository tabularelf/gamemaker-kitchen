export const url = "/search.json";

export default function ({ search }, { url }) {
  const result = [];
  
  // Search tags from libraries
  for (const tag of search.values("type=lib|tutorial|snippet|asset|tool|plugin")) {
    console.log(tag)
    result.push({
      label: `Tag: ${tag}`,
      search: tag,
      value: url(`/tags/${tag}/`),
      title: tag
    });
  }
  
  // Search libraries
  for (const lib of search.pages("type=lib")) {
    result.push({
      label: `Lib: ${lib.title}`,
      search: `${lib.title} ${lib.tags.join(" ")}`,
      value: url(lib.url),
      title: lib.title,
    });
  }
  
  // Search scripts
  for (const snippet of search.pages("type=snippet")) {
    result.push({
      label: `Snippet: ${snippet.title}`,
      search: `${snippet.title} ${snippet.tags.join(" ")}`,
      value: url(snippet.url),
      title: snippet.title,
    });
  }
  
  // Search assets
  for (const asset of search.pages("type=asset")) {
    result.push({
      label: `Asset: ${asset.title}`,
      search: `${asset.title} ${asset.tags.join(" ")}`,
      value: url(asset.url),
      title: asset.title,
    });
  }
  
  // Search tutorials
  for (const tutorial of search.pages("type=tutorial")) {
    result.push({
      label: `Tutorial: ${tutorial.title}`,
      search: `${tutorial.title} ${tutorial.tags.join(" ")}`,
      value: url(tutorial.url),
      title: tutorial.title,
    });
  }
  
  // Search authors
  for (const author of search.pages("type=author")) {
    result.push({
      label: `Author: ${author.name}`,
      search: `${author.title} ${author.tags.join(" ")}`,
      value: url(author.url),
    });
  }

  // Search tools
  for (const tool of search.pages("type=tool")) {
    result.push({
      label: `Tool: ${tool.title}`,
      search: `${tool.title} ${tool.tags.join(" ")}`,
      value: url(tool.url),
      title: tool.title,
    });
  }

  // Search plugins
  for (const plugin of search.pages("type=plugin")) {
    result.push({
      label: `Plugin: ${plugin.title}`,
      search: `${plugin.title} ${plugin.tags.join(" ")}`,
      value: url(plugin.url),
      title: plugin.title,
    });
  }

  // Search tags from posts
  for (const tag of search.values("type=posts")) {
    result.push({
      label: `Tag: ${tag}`,
      search: tag,
      value: url(`/tags/${tag}/`),
      title: tag.title
    });
  }

  // Search posts
  for (const post of search.pages("type=posts")) {
    result.push({
	    label: `Post: ${post.title}`,
      search: `${post.title} ${post.tags.join(" ")}`,
      value: url(post.url),
      title: post.title,
    });
  }

 // Search Games
  for (const post of search.pages("type=game")) {
    result.push({
	    label: `Game: ${post.title}`,
      search: `${post.title} ${post.tags.join(" ")}`,
      value: url(post.url),
      title: post.title,
    });
  }

  return JSON.stringify(result);
}