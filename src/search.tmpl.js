export const url = "/search.json";

export default function ({ search }, { url }) {
  const result = [];
  
  // Search tags from libraries
  for (const tag of search.tags("type=lib|tutorial|snippet|asset|tool")) {
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
      link: lib.data.link,
      paid: lib.data.paid,
      logo: lib.data.logo ?? lib.data.banner,
    });
  }
  
  // Search scripts
  for (const snippet of search.pages("type=snippet")) {
    result.push({
      label: `Snippet: ${snippet.data.title}`,
      search: `${snippet.data.title} ${snippet.data.tags.join(" ")}`,
      value: url(snippet.data.url),
      title: snippet.data.title,
      link: snippet.data.link,
      paid: snippet.data.paid,
      logo: snippet.data.logo ?? snippet.data.banner,
    });
  }
  
  // Search assets
  for (const asset of search.pages("type=asset")) {
    result.push({
      label: `Asset: ${asset.data.title}`,
      search: `${asset.data.title} ${asset.data.tags.join(" ")}`,
      value: url(asset.data.url),
      title: asset.data.title,
      link: asset.data.link,
      paid: asset.data.paid,
      logo: asset.data.logo ?? asset.data.banner,
    });
  }
  
  // Search tutorials
  for (const tutorial of search.pages("type=tutorial")) {
    result.push({
      label: `Tutorial: ${tutorial.data.title}`,
      search: `${tutorial.data.title} ${tutorial.data.tags.join(" ")}`,
      value: url(tutorial.data.url),
      title: tutorial.data.title,
      link: tutorial.data.link,
      logo: tutorial.data.logo ?? tutorial.data.banner,
    });
  }
  
  // Search authors
  for (const author of search.pages("type=author")) {
    result.push({
      label: `Author: ${author.data.name}`,
      search: `${author.data.title} ${author.data.tags.join(" ")}`,
      value: url(author.data.url),
      title: author.data.title,
      link: author.data.link,
    });
  }

  // Search tools
  for (const tool of search.pages("type=tool")) {
    result.push({
      label: `Tool: ${tool.data.title}`,
      search: `${tool.data.title} ${tool.data.tags.join(" ")}`,
      value: url(tool.data.url),
      title: tool.data.title,
      link: tool.data.link,
      paid: tool.data.paid,
      logo: tool.data.logo ?? tool.data.banner,
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
      link: post.data.link,
    });
  }

  return JSON.stringify(result);
}



  // Search authors 
  /*for (const author of { site }.site.getAuthors()) {
	for (const page of getAuthorPages(author)) {
	result.push({
      label: `Author: ${author}`,
      search: author,
      value: url(`/authors/${author}/`),
    });
	}
  }*/