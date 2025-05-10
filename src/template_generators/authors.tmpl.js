export const layout = "layouts/author.njk";

export default function* (site) {
  for (const author of { site }.site.getAuthors()) {
    let content = undefined;
    let authorPage = site.search.page(`type=authors title=${author.replace(/\s+/g, '-')}`);
    if (authorPage != undefined) {
      content = authorPage.data.content;
    }
    yield {
      url: (`/authors/${author.replace(/\s+/g, '-')}/`),
      title: `Author “${author}”`,
      content: content,
	  name: author,
      type: "author",
      author,
    };
  }
}