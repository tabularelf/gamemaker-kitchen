export const url = "/search.json";

export default function ({ search }, { url }) {
  const result = [];
  
  // Search tags from libraries
  for (const tag of search.tags("type=lib|tutorial|snippet|asset|tool|plugin")) {
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
      label: `Lib: ${lib.data.title}`,
      search: `${lib.data.title} ${lib.data.tags.join(" ")}`,
      value: url(lib.data.url),
      title: lib.data.title,
    });
  }
  
  // Search scripts
  for (const snippet of search.pages("type=snippet")) {
    result.push({
      label: `Snippet: ${snippet.data.title}`,
      search: `${snippet.data.title} ${snippet.data.tags.join(" ")}`,
      value: url(snippet.data.url),
      title: snippet.data.title,
    });
  }
  
  // Search assets
  for (const asset of search.pages("type=asset")) {
    result.push({
      label: `Asset: ${asset.data.title}`,
      search: `${asset.data.title} ${asset.data.tags.join(" ")}`,
      value: url(asset.data.url),
      title: asset.data.title,
    });
  }
  
  // Search tutorials
  for (const tutorial of search.pages("type=tutorial")) {
    result.push({
      label: `Tutorial: ${tutorial.data.title}`,
      search: `${tutorial.data.title} ${tutorial.data.tags.join(" ")}`,
      value: url(tutorial.data.url),
      title: tutorial.data.title,
    });
  }
  
  // Search authors
  for (const author of search.pages("type=author")) {
    result.push({
      label: `Author: ${author.data.name}`,
      search: `${author.data.title} ${author.data.tags.join(" ")}`,
      value: url(author.data.url),
    });
  }

  // Search tools
  for (const tool of search.pages("type=tool")) {
    result.push({
      label: `Tool: ${tool.data.title}`,
      search: `${tool.data.title} ${tool.data.tags.join(" ")}`,
      value: url(tool.data.url),
      title: tool.data.title,
    });
  }

  // Search plugins
  for (const plugin of search.pages("type=plugin")) {
    result.push({
      label: `Plugin: ${plugin.data.title}`,
      search: `${plugin.data.title} ${plugin.data.tags.join(" ")}`,
      value: url(plugin.data.url),
      title: plugin.data.title,
    });
  }

  // Search tags from posts
  for (const tag of search.tags("type=posts")) {
    result.push({
      label: `Tag: ${tag}`,
      search: tag,
      value: url(`/tags/${tag}/`),
      title: tag.data.title
    });
  }

  // Search posts
  for (const post of search.pages("type=posts")) {
    result.push({
	    label: `Post: ${post.data.title}`,
      search: `${post.data.title} ${post.data.tags.join(" ")}`,
      value: url(post.data.url),
      title: post.data.title,
    });
  }

 // Search Games
  for (const post of search.pages("type=game")) {
    result.push({
	    label: `Game: ${post.data.title}`,
      search: `${post.data.title} ${post.data.tags.join(" ")}`,
      value: url(post.data.url),
      title: post.data.title,
    });
  }

  return JSON.stringify(result);
}