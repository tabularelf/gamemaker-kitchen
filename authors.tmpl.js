export const layout = "layouts/author.njk";

export default function* (site) {
  for (const author of { site }.site.getAuthors()) {
    yield {
      url: (`/authors/${author}/`).replace(/\s+/g, '-'),
      title: `Author “${author}”`,
	  name: author,
      type: "author",
      author,
    };
  }
}